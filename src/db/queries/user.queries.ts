import { cache } from "react";
import db from "../drizzle";
import { user } from "../schema";
import { eq } from "drizzle-orm";

export const insertUser = cache(async (data: typeof user.$inferInsert) => {
  const result = await db.insert(user).values(data).returning({insertedId: user.id})
  return result;
});

export const getUsers = cache(async () => {
  const result = await db.select().from(user);
  return result;
});

export const getUserByClerkId = cache(async (clerk_id: string) => {
  const data = await db.query.user.findFirst({
    where: eq(user.clerk_id, clerk_id),
  });
  return data;
});
export const getUserById = cache(async (id: number) => {
  const data = await db.query.user.findFirst({
    where: eq(user.id, id),
  });
  return data;
});

export const updateUser = cache(async (id: number, data: Partial<typeof user.$inferInsert>) => {
    return await db.update(user).set(data).where(eq(user.id, id)).returning();
  });
  

  export const deleteUser = cache(async (id: number) => {
    return await db.delete(user).where(eq(user.id, id)).returning();
  });
  