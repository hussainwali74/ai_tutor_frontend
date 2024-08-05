import { cache } from "react";
import { Class_ } from "../schema";
import db from "../drizzle";
import { eq } from "drizzle-orm";

// Class_ CRUD
export const createClass_ = cache(async (data: typeof Class_.$inferInsert) => {
    return await db.insert(Class_).values(data).returning();
  });
  
  export const getClass_es = cache(async () => {
    return await db.select().from(Class_);
  });
  
  export const getClass_ById = cache(async (id: number) => {
    const data = await db.query.Class_.findFirst({ where: eq(Class_.id, id) });
    return data;
  });
  
  export const updateClass_ = cache(async (id: number, data: Partial<typeof Class_.$inferInsert>) => {
    return await db.update(Class_).set(data).where(eq(Class_.id, id)).returning();
  });
  
  export const deleteClass_ = cache(async (id: number) => {
    return await db.delete(Class_).where(eq(Class_.id, id)).returning();
  });