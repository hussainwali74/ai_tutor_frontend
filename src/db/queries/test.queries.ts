import { cache } from "react";
import db from "../drizzle";
import { student, student_bot_chat, test, user } from "../schema";
import { and, eq } from "drizzle-orm";
import { Student } from "../model";

// Test CRUD
export const createTest = cache(async (data: typeof test.$inferInsert) => {
    return await db.insert(test).values(data).returning();
  });
  
  export const getTests = cache(async () => {
    return await db.select().from(test);
  });
  
  export const updateTest = cache(async (id: number, data: Partial<typeof test.$inferInsert>) => {
    return await db.update(test).set(data).where(eq(test.id, id)).returning();
  });
  
  export const deleteTest = cache(async (id: number) => {
    return await db.delete(test).where(eq(test.id, id)).returning();
  });