import { cache } from "react";
import db from "../drizzle";
import { lesson, student, student_bot_chat, user } from "../schema";
import { and, eq } from "drizzle-orm";
import { Student } from "../model";

// Lesson CRUD
export const createLesson = cache(async (data: typeof lesson.$inferInsert) => {
    return await db.insert(lesson).values(data).returning();
  });
  
  export const getLessons = cache(async () => {
    try {
      const data = await db.select().from(lesson);
      console.log('-----------------------------------------------------');
      console.log('data',data);
      console.log('-----------------------------------------------------');
      
      return data
      
    } catch (error) {
     console.log('-----------------------------------------------------');
     console.log('lesson.queries error 23',error);
     console.log('-----------------------------------------------------');
     
    }
  });
  
  export const getLessonById = cache(async (id: number) => {
    const data = await db.query.lesson.findFirst({ where: eq(lesson.id, id) });
    return data;
  });
  
  export const updateLesson = cache(async (id: number, data: Partial<typeof lesson.$inferInsert>) => {
    return await db.update(lesson).set(data).where(eq(lesson.id, id)).returning();
  });
  
  export const deleteLesson = cache(async (id: number) => {
    return await db.delete(lesson).where(eq(lesson.id, id)).returning();
  });
  