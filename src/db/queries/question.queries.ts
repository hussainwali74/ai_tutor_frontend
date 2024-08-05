import { cache } from "react";
import db from "../drizzle";
import { question, student, student_bot_chat, test, user } from "../schema";
import { and, eq } from "drizzle-orm";
import { Student } from "../model";


// Question CRUD
export const createQuestion = cache(async (data: typeof question.$inferInsert) => {
  return await db.insert(question).values(data).returning();
});

export const getQuestions = cache(async () => {
  return await db.select().from(question);
});

export const updateQuestion = cache(async (id: number, data: Partial<typeof question.$inferInsert>) => {
  return await db.update(question).set(data).where(eq(question.id, id)).returning();
});

export const deleteQuestion = cache(async (id: number) => {
  return await db.delete(question).where(eq(question.id, id)).returning();
});