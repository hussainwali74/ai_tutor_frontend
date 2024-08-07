import { getStudentByUserId, insertStudent } from "@/db/queries/student.queries";
import { getUserByClerkId, insertUser } from "@/db/queries/user.queries";
import { user } from "@/db/schema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function PostAuthPage() {
  const curr_user = await currentUser().catch((e) => {
    console.log("-----------------------------------------------------");
    console.log("error in getting currentUser in post_signup 12:", e);
    console.log("-----------------------------------------------------");
  });
  if (curr_user) {
    let user_id: number;
    let existing_user = await getUserByClerkId(curr_user.id);
    if (!existing_user) {
      const usser: typeof user.$inferInsert = {
        clerk_id: curr_user.id,
        email: curr_user.emailAddresses[0].emailAddress,
        contact: curr_user.phoneNumbers[0]?.phoneNumber || "-",
        name: curr_user.fullName || "-",
        admin_id: 1,
        role: "student",
      };
      const inserted_user = await insertUser(usser);

      user_id = inserted_user[0].insertedId!;
    } else {
      user_id = existing_user.id;
    }

    let existing_student = await getStudentByUserId(user_id);

    if (!existing_student && user_id) {
      const admin_id = 1;
      const student_id = await insertStudent(user_id, admin_id);
    }
    redirect("/learn");
  }

  return <div></div>;
}
