import {  Class_,prompt, subject, topic, lesson, test, question, student_test, student_question, student_class, student_topic, student_lesson } from "./schema"; // adjust import path as needed

export type PromptType = typeof prompt.$inferInsert;
export type ClassType = typeof Class_.$inferInsert;
export type SubjectType = typeof subject.$inferInsert;
export type TopicType = typeof topic.$inferInsert;
export type LessonType = typeof lesson.$inferInsert;
export type TestType = typeof test.$inferInsert;
export type QuestionType = typeof question.$inferInsert;
export type StudentTestType = typeof student_test.$inferInsert;
export type StudentQuestionType = typeof student_question.$inferInsert;
export type StudentClassType = typeof student_class.$inferInsert;
export type StudentTopicType = typeof student_topic.$inferInsert;
export type StudentLessonType = typeof student_lesson.$inferInsert;
