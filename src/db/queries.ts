import { user, lesson, student, student_bot_chat } from "./schema";
import { Student, User } from "./model";

import { cache } from "react";
import db from "./drizzle";
import { eq, and } from "drizzle-orm";
import {
  prompt,
  Class_,
  subject,
  topic,
  test,
  question,
  student_test,
  student_question,
  student_class,
  student_topic,
  student_lesson,
} from "./schema";




// Student Test CRUD
export const createStudentTest = cache(async (data: typeof student_test.$inferInsert) => {
  return await db.insert(student_test).values(data).returning();
});

export const getStudentTests = cache(async () => {
  return await db.select().from(student_test);
});

export const updateStudentTest = cache(
  async (id: number, data: Partial<typeof student_test.$inferInsert>) => {
    return await db.update(student_test).set(data).where(eq(student_test.id, id)).returning();
  }
);

export const deleteStudentTest = cache(async (id: number) => {
  return await db.delete(student_test).where(eq(student_test.id, id)).returning();
});

// Student Question CRUD
export const createStudentQuestion = cache(async (data: typeof student_question.$inferInsert) => {
  return await db.insert(student_question).values(data).returning();
});

export const getStudentQuestions = cache(async () => {
  return await db.select().from(student_question);
});

export const updateStudentQuestion = cache(
  async (id: number, data: Partial<typeof student_question.$inferInsert>) => {
    return await db.update(student_question).set(data).where(eq(student_question.id, id)).returning();
  }
);

export const deleteStudentQuestion = cache(async (id: number) => {
  return await db.delete(student_question).where(eq(student_question.id, id)).returning();
});

// Student Class_ CRUD
export const createStudentClass_ = cache(async (data: typeof student_class.$inferInsert) => {
  return await db.insert(student_class).values(data).returning();
});

export const getStudentClass_es = cache(async () => {
  return await db.select().from(student_class);
});

export const updateStudentClass_ = cache(
  async (id: number, data: Partial<typeof student_class.$inferInsert>) => {
    return await db.update(student_class).set(data).where(eq(student_class.id, id)).returning();
  }
);

export const deleteStudentClass_ = cache(async (id: number) => {
  return await db.delete(student_class).where(eq(student_class.id, id)).returning();
});

// Student Topic CRUD
export const createStudentTopic = cache(async (data: typeof student_topic.$inferInsert) => {
  return await db.insert(student_topic).values(data).returning();
});

export const getStudentTopics = cache(async () => {
  return await db.select().from(student_topic);
});

export const updateStudentTopic = cache(
  async (id: number, data: Partial<typeof student_topic.$inferInsert>) => {
    return await db.update(student_topic).set(data).where(eq(student_topic.id, id)).returning();
  }
);

export const deleteStudentTopic = cache(async (id: number) => {
  return await db.delete(student_topic).where(eq(student_topic.id, id)).returning();
});

// Student Lesson CRUD
export const createStudentLesson = cache(async (data: typeof student_lesson.$inferInsert) => {
  return await db.insert(student_lesson).values(data).returning();
});

export const getStudentLessons = cache(async () => {
  return await db.select().from(student_lesson);
});

export const updateStudentLesson = cache(
  async (id: number, data: Partial<typeof student_lesson.$inferInsert>) => {
    return await db.update(student_lesson).set(data).where(eq(student_lesson.id, id)).returning();
  }
);

export const deleteStudentLesson = cache(async (id: number) => {
  return await db.delete(student_lesson).where(eq(student_lesson.id, id)).returning();
});



// chat


export const getChatByClerkId = cache(async (clerk_id: string, lesson_id: number, limit: number = 10) => {
  // Join student_bot_chat with student and user tables
  const data = await db
    .select({
      chat: student_bot_chat,
    })
    .from(student_bot_chat)
    .innerJoin(student, eq(student_bot_chat.student_id, student.id))
    .innerJoin(user, eq(student.user_id, user.id))
    .where(and(eq(student_bot_chat.lesson_id, lesson_id), eq(user.clerk_id, clerk_id)))
    .limit(limit);

  return data;
});
