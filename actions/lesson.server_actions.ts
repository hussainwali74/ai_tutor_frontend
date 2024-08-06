"use server";

import { getClass_es } from "@/db/queries/class.queries";
import { getLessons } from "@/db/queries/lesson.queries";
import { getTopics } from "@/db/queries/topic.queries";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";


export const getAllLessonsAction = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const lessons = await getLessons();
  if (!lessons) {
    throw new Error("lessons not found");
  }
  revalidatePath("/lesson");
  return lessons;
};

export const getAllTopicsAction = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const topics = await getTopics();
  if (!topics) {
    throw new Error("topics not found");
  }
  revalidatePath("/learn");
  return topics;
};

export const getAllClassesAction = async () => {
  const { userId } = auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const classes = await getClass_es();
  if (!classes) {
    throw new Error("classes not found");
  }
  revalidatePath("/learn");
  return classes;
};
