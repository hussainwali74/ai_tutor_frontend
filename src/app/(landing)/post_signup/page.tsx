import { User } from "@/db/model";
import { getStudentByUserId, getUserByClerkId, insertStudent, insertUser } from "@/db/queries";
import { currentUser } from "@clerk/nextjs/server";
import { redirect, useRouter } from "next/navigation";
import React from "react";

export default async function PostAuthPage() {
  const curr_user = await currentUser();
  if (curr_user) {

    let user_id:number;
    let existing_user = await getUserByClerkId(curr_user.id);

    if (!existing_user) {
      const inserted_user = await insertUser(
        curr_user?.id,
        curr_user?.fullName || "-",
        curr_user?.emailAddresses[0]?.emailAddress || "-",
        curr_user?.phoneNumbers[0]?.phoneNumber || "-",
        "-",
        curr_user?.imageUrl || "-"
      );
      console.log('-----------------------------------------------------');
      console.log('inserted_user',inserted_user);
      console.log('-----------------------------------------------------'); 
      user_id  = inserted_user[0]?.insertedId
    }else{
        user_id  = existing_user.id
    }
    let existing_student = await getStudentByUserId(user_id)
    if (!existing_student){
        const student_id = await insertStudent(user_id)
    }
    redirect('/learn')
    
  }

  return <div></div>;
}
