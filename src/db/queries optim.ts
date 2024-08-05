import { user, lesson, student, student_bot_chat } from "./schema";
import {pgTable} from 'drizzle-orm/pg-core'
import { Student, User } from "./model";
import { cache } from "react";
import db from "./drizzle";
import { eq, and } from "drizzle-orm";
import { prompt, Class_, subject, topic, test, question, student_test, student_question, student_class, student_topic, student_lesson } from "./schema";

const createCRUD = (table: any) => {
  return {
    create: cache(async (data: typeof table.$inferInsert) => {
      return await db.insert(table).values(data).returning();
    }),
    getAll: cache(async () => {
      return await db.select().from(table);
    }),
    getById: cache(async (id: number) => {
      //@ts-ignore
      const data = await db.query[table._name].findFirst({ where: eq(table.id, id) });
      return data;
    }),
    update: cache(async (id: number, data: Partial<typeof table.$inferInsert>) => {
      return await db.update(table).set(data).where(eq(table.id, id)).returning();
    }),
    delete: cache(async (id: number) => {
      return await db.delete(table).where(eq(table.id, id)).returning();
    }),
  };
};

export const promptCRUD = createCRUD(prompt);
export const classCRUD = createCRUD(Class_);
export const subjectCRUD = createCRUD(subject);
export const topicCRUD = createCRUD(topic);
export const lessonCRUD = createCRUD(lesson);
export const testCRUD = createCRUD(test);
export const questionCRUD = createCRUD(question);
export const studentTestCRUD = createCRUD(student_test);
export const studentQuestionCRUD = createCRUD(student_question);
export const studentClassCRUD = createCRUD(student_class);
export const studentTopicCRUD = createCRUD(student_topic);
export const studentLessonCRUD = createCRUD(student_lesson);

// Additional specific functions
export const insertUser = cache(
  async (clerk_id: string, contact: string, address: string, imageSrc: string, name: string, email: string) => {
    const values: User = {
      ...(clerk_id && { clerk_id }),
      name: name || "-",
      email: email || "-",
      ...(contact && { contact }),
      ...(address && { address }),
      ...(imageSrc && { imageSrc }),
    };
    const data = await db.insert(user).values(values).returning({ insertedId: user.id });
    console.log("-----------------------------------------------------");
    console.log("data", data);
    console.log("-----------------------------------------------------");
    return data;
  }
);

export const insertStudent = cache(async (user_id: number, subject_id?: number) => {
  const values: Student = {
    ...(user_id && { user_id }),
    ...(subject_id && { subject_id }),
  };
  console.log("-----------------------------------------------------");
  console.log("values student inserting", values);
  console.log("-----------------------------------------------------");
  const data = await db.insert(student).values(values).returning({ insertedId: student.id });
  console.log("-----------------------------------------------------");
  console.log("data", data);
  console.log("-----------------------------------------------------");
  return data;
});

export const getStudentByUserId = cache(async (user_id: number) => {
  const data = await db.query.student.findFirst({
    where: eq(student.user_id, user_id),
  });
  return data;
});

export const getUserByClerkId = cache(async (clerk_id: string) => {
  const data = await db.query.user.findFirst({
    where: eq(user.clerk_id, clerk_id),
  });
  return data;
});

export const getStudentByClerkId = cache(async (clerk_id: string) => {
  const data = await db
    .select()
    .from(student)
    .innerJoin(user, eq(student.user_id, user.id))
    .where(eq(user.clerk_id, clerk_id));
  return data;
});

export const insertStudentChat = cache(
  async (student_id: number, lesson_id: number, role: string, content: string) => {
    const data = await db
      .insert(student_bot_chat)
      .values({ student_id, role: role.trim(), content, lesson_id });
    return data;
  }
);

export const getChatByStudentId = cache(async (student_id: number, lesson_id: number, limit: number = 10) => {
  const data = await db.query.student_bot_chat.findMany({
    where: and(eq(student_bot_chat.student_id, student_id), eq(student_bot_chat.lesson_id, lesson_id)),
    limit: limit,
  });
  return data;
});

export const getChatByClerkId = cache(async (clerk_id: string, lesson_id: number, limit: number = 10) => {
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
