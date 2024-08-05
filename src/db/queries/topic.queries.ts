import { cache } from "react";
import db from "../drizzle";
import { topic } from "../schema";
import { eq } from "drizzle-orm";

// Topic CRUD
export const createTopic = cache(async (data: typeof topic.$inferInsert) => {
  return await db.insert(topic).values(data).returning();
});

export const getTopics = cache(async () => {
  return await db.select().from(topic);
});

export const getTopicById = cache(async (id: number) => {
  const data = await db.query.topic.findFirst({ where: eq(topic.id, id) });
  return data;
});
export const getTopicBySubjectId = cache(async (id: number) => {
  const data = await db.query.topic.findMany({ where: eq(topic.subject_id, id) });
  return data;
});

export const updateTopic = cache(async (id: number, data: Partial<typeof topic.$inferInsert>) => {
  return await db.update(topic).set(data).where(eq(topic.id, id)).returning();
});

export const deleteTopic = cache(async (id: number) => {
  return await db.delete(topic).where(eq(topic.id, id)).returning();
});
