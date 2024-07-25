import { cache } from "react";
import db from "./drizzle";
import { eq } from "drizzle-orm";
import { user, lesson, student, student_bot_chat } from "./schema";
import { Student, User } from "./model";

export const getLessons = cache(async () => {
  const data = await db.query.lesson.findMany();
  return data;
});
export const getLessonById = cache(async (id: number) => {
  const data = await db.query.lesson.findFirst({ where: eq(lesson.id, id) });
  return data;
});
export const getPromptByType = cache(async () => {
  const data = await db.query.prompt.findFirst();
  return data;
});

export const insertUser = cache(
  async (
    clerk_id: string,
    contact: string,
    address: string,
    imageSrc: string,
    name: string,
    email: string
  ) => {
    const values: User = {
      ...(clerk_id && { clerk_id }),
      ...{ name: name || "-" },
      ...{ email: email || "-" },
      ...(contact && { contact }),
      ...(address && { address }),
      ...(imageSrc && { imageSrc }),
    };
    const data = await db
      .insert(user)
      .values(values)
      .returning({ insertedId: user.id });
    console.log("-----------------------------------------------------");
    console.log("data", data);
    console.log("-----------------------------------------------------");

    return data;
  }
);

export const insertStudent = cache(
  async (user_id: number, subject_id?: number) => {
    const values: Student = {
      ...(user_id && { user_id }),
      ...(subject_id && { subject_id }),
    };
    console.log("-----------------------------------------------------");
    console.log("values studnet inserting", values);
    console.log("-----------------------------------------------------");
    const data = await db
      .insert(student)
      .values(values)
      .returning({ insertedId: student.id });
    console.log("-----------------------------------------------------");
    console.log("data", data);
    console.log("-----------------------------------------------------");
    return data;
  }
);

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
// chat

export const getStudentByClerkId = cache(async (clerk_id: string) => {
    // const data = await db.query.student.findFirst({
    //   join: {
    //     user: {
    //       on: eq(student.user_id, user.id),
    //     },
    //   },
    //   where: eq(user.clerk_id, clerk_id),
    //   select: {
    //     student: true,
    //     user: {
    //       select: {
    //         clerk_id: true,
    //         name: true,
    //         email: true,
    //         contact: true,
    //         address: true,
    //         imageSrc: true,
    //         createdAt: true,
    //         updatedAt: true,
    //         deletedAt: true,
    //       },
    //     },
    //   },
    // });
  
    const data = await db.select().from(student).innerJoin(user, eq(student.user_id,user.id)).where(eq(user.clerk_id,clerk_id))
    return data;
  });// chat

export const insertStudentChat = cache(
  async (
    student_id: number,
    lesson_id: number,
    role: string,
    content: string
  ) => {
    const data = await db
      .insert(student_bot_chat)
      .values({ student_id, role:role.trim(), content, lesson_id });
    return data;
  }
);

export const getChatByStudentId = cache(async (student_id: number) => {
  // get chats by student id
  const data = await db.query.student_bot_chat.findMany({
    where: eq(student_bot_chat.student_id, student_id),
  });
  return data;
});
