import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    subscriptionTier: "professional",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("projects", () => {
  it("creates a project with valid input", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const project = await caller.projects.create({
      businessName: "Test SaaS Company",
      website: "https://test.com",
      industry: "SaaS",
      targetCustomer: "Small business owners who need project management tools",
      offerPricing: "SaaS product at $29/month with 14-day free trial",
      growthGoal: "Increase Leads",
      currentChannels: "Social media and content marketing",
      budget: "$5,000 - $10,000/month",
      constraints: "Small team of 3 people",
    });

    expect(project).toBeDefined();
    expect(project.businessName).toBe("Test SaaS Company");
    expect(project.industry).toBe("SaaS");
    expect(project.userId).toBe(1);
  });

  it("lists projects for authenticated user", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a project first
    await caller.projects.create({
      businessName: "Test Company",
      industry: "E-commerce",
      targetCustomer: "Online shoppers",
      offerPricing: "Products from $10-$100",
      growthGoal: "Boost Sales",
    });

    const projects = await caller.projects.list();

    expect(projects).toBeDefined();
    expect(Array.isArray(projects)).toBe(true);
    expect(projects.length).toBeGreaterThan(0);
  });

  it("retrieves a specific project by id", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const created = await caller.projects.create({
      businessName: "Specific Test Company",
      industry: "Healthcare",
      targetCustomer: "Healthcare providers",
      offerPricing: "Software subscription at $99/month",
      growthGoal: "Improve Brand Awareness",
    });

    const retrieved = await caller.projects.get({ id: created.id });

    expect(retrieved).toBeDefined();
    expect(retrieved?.id).toBe(created.id);
    expect(retrieved?.businessName).toBe("Specific Test Company");
  });

  it("enforces subscription tier limits for project creation", async () => {
    const { ctx } = createAuthContext();
    // Override to starter tier
    if (ctx.user) {
      ctx.user.subscriptionTier = "starter";
    }
    const caller = appRouter.createCaller(ctx);

    // Create first project (should succeed)
    await caller.projects.create({
      businessName: "First Project",
      industry: "SaaS",
      targetCustomer: "Developers",
      offerPricing: "$10/month",
      growthGoal: "Increase Leads",
    });

    // Try to create second project (should fail for starter tier)
    try {
      await caller.projects.create({
        businessName: "Second Project",
        industry: "E-commerce",
        targetCustomer: "Shoppers",
        offerPricing: "$20/month",
        growthGoal: "Boost Sales",
      });
      // If we get here, the test should fail
      expect(true).toBe(false);
    } catch (error: any) {
      // Expect the error message to contain the tier limit message
      expect(error.message).toContain("allows 1 active project");
    }
  });
});

describe("usage tracking", () => {
  it("returns current usage and limits", async () => {
    const { ctx } = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const usage = await caller.usage.current();

    expect(usage).toBeDefined();
    expect(usage.tier).toBe("professional");
    expect(usage.limits).toBeDefined();
    expect(usage.limits.projectsPerMonth).toBe(3);
    expect(usage.usage).toBeDefined();
  });
});
