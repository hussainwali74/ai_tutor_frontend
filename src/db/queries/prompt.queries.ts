import { cache } from "react";
import db from "../drizzle";
import { prompt } from "../schema";
import { eq } from "drizzle-orm";

// Prompt CRUD
export const createPrompt = cache(async (data: typeof prompt.$inferInsert) => {
    return await db.insert(prompt).values(data).returning();
  });
  
  export const getPrompts = cache(async () => {
    return await db.select().from(prompt);
  });
  
  export const updatePrompt = cache(async (id: number, data: Partial<typeof prompt.$inferInsert>) => {
    return await db.update(prompt).set(data).where(eq(prompt.id, id)).returning();
  });
  
  export const deletePrompt = cache(async (id: number) => {
    return await db.delete(prompt).where(eq(prompt.id, id)).returning();
  });

  
export const getPromptByType = cache(async (type:string) => {
    const data = await db.query.prompt.findFirst({where:eq(prompt.type, type)});
    return data;
  });
  