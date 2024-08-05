import { cache } from "react";
import db from "../drizzle";
import { student, student_bot_chat, user } from "../schema";
import { and, eq } from "drizzle-orm";
import { Student } from "../model";


export const getStudentByClerkId = cache(async (clerk_id: string) => {
    const data = await db
      .select()
      .from(student)
      .innerJoin(user, eq(student.user_id, user.id))
      .where(eq(user.clerk_id, clerk_id));
    return data;
  }); // chat
  
  export const insertStudentChat = cache(
    async (student_id: number, lesson_id: number, role: string, content: string) => {
      const data = await db
        .insert(student_bot_chat)
        .values({ student_id, role: role.trim(), content, lesson_id });
      return data;
    }
  );
  

  export const insertStudent = cache(async (user_id: number, admin_id:number,subject_id?: number) => {
console.log('-----------------------------------------------------');
console.log('admin_id',admin_id);
console.log('-----------------------------------------------------');

    const values: Student = {
      ...(user_id && { user_id }),
      ...(admin_id && { admin_id }),
      ...(subject_id && { subject_id }),
    };
    console.log("-----------------------------------------------------");
    console.log("values studnet inserting", values);
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

  export const getChatByStudentId = cache(async (student_id: number, lesson_id: number, limit: number = 10) => {
    // get chats by student id
    const data = await db.query.student_bot_chat.findMany({
      where: and(eq(student_bot_chat.student_id, student_id), eq(student_bot_chat.lesson_id, lesson_id)),
      limit: limit,
    });
    return data;
  });
  