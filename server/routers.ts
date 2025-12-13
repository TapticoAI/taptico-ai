import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  createProject,
  getUserProjects,
  getProjectById,
  updateProject,
  deleteProject,
  createStrategy,
  getProjectStrategies,
  getStrategyById,
  updateStrategy,
  getCurrentMonthUsage,
  incrementGenerationCount,
  incrementRegenerationCount,
} from "./db";
import {
  generateDiagnosis,
  generateExecutiveBrief,
  generateMarketPositioning,
  generateGrowthStrategy,
  generateFunnelArchitecture,
  generateContentMessaging,
  generateExecutionRoadmap,
  generateToolRecommendations,
  generateDeeperExplanation,
  regenerateModule,
} from "./aiService";
import { exportToPDF, generateShareToken } from "./exportService";
import { createExport, getStrategyExports, getExportByToken } from "./db";

// Subscription tier limits
const TIER_LIMITS = {
  starter: {
    projectsPerMonth: 1,
    generationsPerMonth: 1,
    canRegenerate: false,
    canGoDeeper: false,
  },
  professional: {
    projectsPerMonth: 3,
    generationsPerMonth: 999,
    canRegenerate: true,
    canGoDeeper: true,
  },
  enterprise: {
    projectsPerMonth: 999,
    generationsPerMonth: 999,
    canRegenerate: true,
    canGoDeeper: true,
  },
};

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  projects: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return getUserProjects(ctx.user.id);
    }),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ ctx, input }) => {
        return getProjectById(input.id, ctx.user.id);
      }),

    create: protectedProcedure
      .input(
        z.object({
          businessName: z.string().min(1),
          website: z.string().optional(),
          industry: z.string().min(1),
          targetCustomer: z.string().min(1),
          offerPricing: z.string().min(1),
          growthGoal: z.string().min(1),
          currentChannels: z.string().optional(),
          budget: z.string().optional(),
          constraints: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Check tier limits
        const usage = await getCurrentMonthUsage(ctx.user.id);
        const userProjects = await getUserProjects(ctx.user.id);
        const limits = TIER_LIMITS[ctx.user.subscriptionTier];

        if (userProjects.length >= limits.projectsPerMonth) {
          throw new Error(`Your ${ctx.user.subscriptionTier} plan allows ${limits.projectsPerMonth} active project(s). Please upgrade or delete an existing project.`);
        }

        return createProject({
          userId: ctx.user.id,
          ...input,
        });
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          businessName: z.string().min(1).optional(),
          website: z.string().optional(),
          industry: z.string().optional(),
          targetCustomer: z.string().optional(),
          offerPricing: z.string().optional(),
          growthGoal: z.string().optional(),
          currentChannels: z.string().optional(),
          budget: z.string().optional(),
          constraints: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const { id, ...updates } = input;
        await updateProject(id, ctx.user.id, updates);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        await deleteProject(input.id, ctx.user.id);
        return { success: true };
      }),
  }),

  strategies: router({
    list: protectedProcedure
      .input(z.object({ projectId: z.number() }))
      .query(async ({ input }) => {
        return getProjectStrategies(input.projectId);
      }),

    get: protectedProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getStrategyById(input.id);
      }),

    generate: protectedProcedure
      .input(z.object({ projectId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        // Check tier limits
        const usage = await getCurrentMonthUsage(ctx.user.id);
        const limits = TIER_LIMITS[ctx.user.subscriptionTier];

        if (usage.generationCount >= limits.generationsPerMonth) {
          throw new Error(`Your ${ctx.user.subscriptionTier} plan allows ${limits.generationsPerMonth} generation(s) per month. Please upgrade.`);
        }

        const project = await getProjectById(input.projectId, ctx.user.id);
        if (!project) {
          throw new Error("Project not found");
        }

        // Get existing strategies to determine version number
        const existingStrategies = await getProjectStrategies(input.projectId);
        const version = existingStrategies.length + 1;

        // Create strategy record
        const strategy = await createStrategy({
          projectId: input.projectId,
          version,
          isComplete: false,
        });

        // Increment usage counter
        await incrementGenerationCount(ctx.user.id);

        // Generate diagnosis (Stage 1)
        const diagnosis = await generateDiagnosis(project);
        await updateStrategy(strategy.id, { diagnosisJson: diagnosis });

        // Generate all modules (Stage 2) in parallel for speed
        const [
          executiveBrief,
          marketPositioning,
          growthStrategy,
          funnelArchitecture,
          contentMessaging,
          executionRoadmap,
          toolRecommendations,
        ] = await Promise.all([
          generateExecutiveBrief(project, diagnosis),
          generateMarketPositioning(project, diagnosis),
          generateGrowthStrategy(project, diagnosis),
          generateFunnelArchitecture(project, diagnosis),
          generateContentMessaging(project, diagnosis),
          generateExecutionRoadmap(project, diagnosis),
          generateToolRecommendations(project, diagnosis),
        ]);

        // Update strategy with all modules
        await updateStrategy(strategy.id, {
          executiveBrief,
          marketPositioning,
          growthStrategy,
          funnelArchitecture,
          contentMessaging,
          executionRoadmap,
          toolRecommendations,
          isComplete: true,
        });

        return getStrategyById(strategy.id);
      }),

    updateModule: protectedProcedure
      .input(
        z.object({
          strategyId: z.number(),
          moduleName: z.enum([
            "executiveBrief",
            "marketPositioning",
            "growthStrategy",
            "funnelArchitecture",
            "contentMessaging",
            "executionRoadmap",
            "toolRecommendations",
          ]),
          content: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        const { strategyId, moduleName, content } = input;
        await updateStrategy(strategyId, { [moduleName]: content });
        return { success: true };
      }),

    goDeeper: protectedProcedure
      .input(
        z.object({
          strategyId: z.number(),
          moduleName: z.string(),
          currentContent: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Check tier limits
        const limits = TIER_LIMITS[ctx.user.subscriptionTier];
        if (!limits.canGoDeeper) {
          throw new Error(`The "Go Deeper" feature requires a Professional or Enterprise plan.`);
        }

        const strategy = await getStrategyById(input.strategyId);
        if (!strategy) {
          throw new Error("Strategy not found");
        }

        const project = await getProjectById(strategy.projectId, ctx.user.id);
        if (!project) {
          throw new Error("Project not found");
        }

        const deeperExplanation = await generateDeeperExplanation(
          input.moduleName,
          input.currentContent,
          project
        );

        return { explanation: deeperExplanation };
      }),

    regenerate: protectedProcedure
      .input(
        z.object({
          strategyId: z.number(),
          moduleName: z.enum([
            "executiveBrief",
            "marketPositioning",
            "growthStrategy",
            "funnelArchitecture",
            "contentMessaging",
            "executionRoadmap",
            "toolRecommendations",
          ]),
          currentContent: z.string(),
          feedback: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Check tier limits
        const limits = TIER_LIMITS[ctx.user.subscriptionTier];
        if (!limits.canRegenerate) {
          throw new Error(`The "Regenerate" feature requires a Professional or Enterprise plan.`);
        }

        const strategy = await getStrategyById(input.strategyId);
        if (!strategy || !strategy.diagnosisJson) {
          throw new Error("Strategy not found or incomplete");
        }

        const project = await getProjectById(strategy.projectId, ctx.user.id);
        if (!project) {
          throw new Error("Project not found");
        }

        // Increment regeneration counter
        await incrementRegenerationCount(ctx.user.id);

        const newContent = await regenerateModule(
          input.moduleName,
          input.currentContent,
          input.feedback,
          project,
          strategy.diagnosisJson
        );

        // Update the module with new content
        await updateStrategy(input.strategyId, { [input.moduleName]: newContent });

        return { content: newContent };
      }),
  }),

  usage: router({
    current: protectedProcedure.query(async ({ ctx }) => {
      const usage = await getCurrentMonthUsage(ctx.user.id);
      const limits = TIER_LIMITS[ctx.user.subscriptionTier];
      return {
        usage,
        limits,
        tier: ctx.user.subscriptionTier,
      };
    }),
  }),

  exports: router({
    create: protectedProcedure
      .input(
        z.object({
          strategyId: z.number(),
          format: z.enum(["pdf", "link"]),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const strategy = await getStrategyById(input.strategyId);
        if (!strategy) {
          throw new Error("Strategy not found");
        }

        const project = await getProjectById(strategy.projectId, ctx.user.id);
        if (!project) {
          throw new Error("Project not found");
        }

        if (input.format === "pdf") {
          const fileUrl = await exportToPDF(strategy, project.businessName);
          return createExport({
            strategyId: input.strategyId,
            format: "pdf",
            fileUrl,
          });
        } else if (input.format === "link") {
          const shareToken = generateShareToken();
          return createExport({
            strategyId: input.strategyId,
            format: "link",
            shareToken,
          });
        }

        throw new Error("Invalid format");
      }),

    list: protectedProcedure
      .input(z.object({ strategyId: z.number() }))
      .query(async ({ input }) => {
        return getStrategyExports(input.strategyId);
      }),

    getShared: publicProcedure
      .input(z.object({ token: z.string() }))
      .query(async ({ input }) => {
        const exportRecord = await getExportByToken(input.token);
        if (!exportRecord) {
          throw new Error("Export not found");
        }

        const strategy = await getStrategyById(exportRecord.strategyId);
        if (!strategy) {
          throw new Error("Strategy not found");
        }

        const project = await getProjectById(strategy.projectId, 0); // No user check for shared links
        if (!project) {
          throw new Error("Project not found");
        }

        return {
          strategy,
          project,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
