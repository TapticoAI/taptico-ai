import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  projects, 
  strategies, 
  exports, 
  usageTracking,
  type Project,
  type InsertProject,
  type Strategy,
  type InsertStrategy,
  type Export,
  type InsertExport,
  type UsageTracking,
  type InsertUsageTracking
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ========== Project Functions ==========

export async function createProject(projectData: InsertProject): Promise<Project> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(projects).values(projectData);
  const insertId = Number(result[0].insertId);

  const newProject = await db.select().from(projects).where(eq(projects.id, insertId)).limit(1);
  if (!newProject[0]) throw new Error("Failed to retrieve created project");

  return newProject[0];
}

export async function getUserProjects(userId: number): Promise<Project[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(projects).where(eq(projects.userId, userId)).orderBy(desc(projects.updatedAt));
}

export async function getProjectById(projectId: number, userId?: number): Promise<Project | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const conditions = userId !== undefined 
    ? and(eq(projects.id, projectId), eq(projects.userId, userId))
    : eq(projects.id, projectId);

  const result = await db.select().from(projects).where(conditions).limit(1);

  return result[0];
}

export async function updateProject(projectId: number, userId: number, updates: Partial<InsertProject>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(projects).set(updates).where(
    and(eq(projects.id, projectId), eq(projects.userId, userId))
  );
}

export async function deleteProject(projectId: number, userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  // Delete associated strategies and exports first
  const projectStrategies = await db.select().from(strategies).where(eq(strategies.projectId, projectId));
  
  for (const strategy of projectStrategies) {
    await db.delete(exports).where(eq(exports.strategyId, strategy.id));
  }
  
  await db.delete(strategies).where(eq(strategies.projectId, projectId));
  await db.delete(projects).where(and(eq(projects.id, projectId), eq(projects.userId, userId)));
}

// ========== Strategy Functions ==========

export async function createStrategy(strategyData: InsertStrategy): Promise<Strategy> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(strategies).values(strategyData);
  const insertId = Number(result[0].insertId);

  const newStrategy = await db.select().from(strategies).where(eq(strategies.id, insertId)).limit(1);
  if (!newStrategy[0]) throw new Error("Failed to retrieve created strategy");

  return newStrategy[0];
}

export async function getProjectStrategies(projectId: number): Promise<Strategy[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(strategies).where(eq(strategies.projectId, projectId)).orderBy(desc(strategies.version));
}

export async function getStrategyById(strategyId: number): Promise<Strategy | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(strategies).where(eq(strategies.id, strategyId)).limit(1);
  return result[0];
}

export async function updateStrategy(strategyId: number, updates: Partial<InsertStrategy>): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(strategies).set(updates).where(eq(strategies.id, strategyId));
}

// ========== Export Functions ==========

export async function createExport(exportData: InsertExport): Promise<Export> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(exports).values(exportData);
  const insertId = Number(result[0].insertId);

  const newExport = await db.select().from(exports).where(eq(exports.id, insertId)).limit(1);
  if (!newExport[0]) throw new Error("Failed to retrieve created export");

  return newExport[0];
}

export async function getStrategyExports(strategyId: number): Promise<Export[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(exports).where(eq(exports.strategyId, strategyId)).orderBy(desc(exports.createdAt));
}

export async function getExportByToken(shareToken: string): Promise<Export | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(exports).where(eq(exports.shareToken, shareToken)).limit(1);
  return result[0];
}

// ========== Usage Tracking Functions ==========

export async function getOrCreateUsageTracking(userId: number, month: string): Promise<UsageTracking> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const existing = await db.select().from(usageTracking).where(
    and(eq(usageTracking.userId, userId), eq(usageTracking.month, month))
  ).limit(1);

  if (existing[0]) return existing[0];

  const result = await db.insert(usageTracking).values({
    userId,
    month,
    generationCount: 0,
    regenerationCount: 0,
  });

  const insertId = Number(result[0].insertId);
  const newTracking = await db.select().from(usageTracking).where(eq(usageTracking.id, insertId)).limit(1);
  if (!newTracking[0]) throw new Error("Failed to retrieve created usage tracking");

  return newTracking[0];
}

export async function incrementGenerationCount(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  const tracking = await getOrCreateUsageTracking(userId, month);

  await db.update(usageTracking).set({
    generationCount: tracking.generationCount + 1,
  }).where(eq(usageTracking.id, tracking.id));
}

export async function incrementRegenerationCount(userId: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  const tracking = await getOrCreateUsageTracking(userId, month);

  await db.update(usageTracking).set({
    regenerationCount: tracking.regenerationCount + 1,
  }).where(eq(usageTracking.id, tracking.id));
}

export async function getCurrentMonthUsage(userId: number): Promise<UsageTracking> {
  const month = new Date().toISOString().slice(0, 7); // YYYY-MM
  return getOrCreateUsageTracking(userId, month);
}
