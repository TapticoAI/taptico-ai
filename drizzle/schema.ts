import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with subscription tier for feature gating.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  subscriptionTier: mysqlEnum("subscriptionTier", ["starter", "professional", "enterprise"]).default("professional").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Projects represent individual businesses or products that users create strategies for.
 */
export const projects = mysqlTable("projects", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  businessName: varchar("businessName", { length: 255 }).notNull(),
  website: varchar("website", { length: 500 }),
  industry: varchar("industry", { length: 100 }).notNull(),
  targetCustomer: text("targetCustomer").notNull(),
  offerPricing: text("offerPricing").notNull(),
  growthGoal: varchar("growthGoal", { length: 255 }).notNull(),
  currentChannels: text("currentChannels"),
  budget: varchar("budget", { length: 100 }),
  constraints: text("constraints"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Project = typeof projects.$inferSelect;
export type InsertProject = typeof projects.$inferInsert;

/**
 * Strategies are generated marketing plans for a project.
 * Each strategy contains a diagnosis and seven modules.
 */
export const strategies = mysqlTable("strategies", {
  id: int("id").autoincrement().primaryKey(),
  projectId: int("projectId").notNull(),
  version: int("version").notNull().default(1),
  diagnosisJson: json("diagnosisJson").$type<{
    diagnosis: string;
    bottleneck: string;
    opportunity: string;
    ignore: string;
  }>(),
  executiveBrief: text("executiveBrief"),
  marketPositioning: text("marketPositioning"),
  growthStrategy: text("growthStrategy"),
  funnelArchitecture: text("funnelArchitecture"),
  contentMessaging: text("contentMessaging"),
  executionRoadmap: text("executionRoadmap"),
  toolRecommendations: text("toolRecommendations"),
  isComplete: boolean("isComplete").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Strategy = typeof strategies.$inferSelect;
export type InsertStrategy = typeof strategies.$inferInsert;

/**
 * Exports track generated PDF, PPTX, and shareable links for strategies.
 */
export const exports = mysqlTable("exports", {
  id: int("id").autoincrement().primaryKey(),
  strategyId: int("strategyId").notNull(),
  format: mysqlEnum("format", ["pdf", "pptx", "link"]).notNull(),
  fileUrl: varchar("fileUrl", { length: 1000 }),
  shareToken: varchar("shareToken", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Export = typeof exports.$inferSelect;
export type InsertExport = typeof exports.$inferInsert;

/**
 * Usage tracking for subscription tier limits.
 */
export const usageTracking = mysqlTable("usageTracking", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  month: varchar("month", { length: 7 }).notNull(), // Format: YYYY-MM
  generationCount: int("generationCount").default(0).notNull(),
  regenerationCount: int("regenerationCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type UsageTracking = typeof usageTracking.$inferSelect;
export type InsertUsageTracking = typeof usageTracking.$inferInsert;
