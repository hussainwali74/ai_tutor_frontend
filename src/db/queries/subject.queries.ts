import { cache } from "react";
import db from "../drizzle";
import { subject } from "../schema";
import { eq } from "drizzle-orm";

// Subject CRUD
export const createSubject = cache(async (data: typeof subject.$inferInsert) => {
  return await db.insert(subject).values(data).returning();
});

export const getSubjects = cache(async () => {
  return await db.select().from(subject);
});

export const getSubjectById = cache(async (id: number) => {
  const data = await db.query.subject.findFirst({ where: eq(subject.id, id) });
  return data;
});
export const getSubjectByClassId = cache(async (id: number) => {
  const data = await db.query.subject.findMany({ where: eq(subject.class_id, id) });
  return data;
});

export const updateSubject = cache(async (id: number, data: Partial<typeof subject.$inferInsert>) => {
  return await db.update(subject).set(data).where(eq(subject.id, id)).returning();
});

export const deleteSubject = cache(async (id: number) => {
  return await db.delete(subject).where(eq(subject.id, id)).returning();
});
