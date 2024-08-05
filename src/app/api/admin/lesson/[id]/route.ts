import { NextRequest, NextResponse } from "next/server";
import { deleteLesson, getLessonById, getLessons, updateLesson } from "@/db/queries/lesson.queries";

// app/api/lessons/[id]/route.ts

export async function GET(req: NextRequest) {
  try {
    const idStr = req.nextUrl.searchParams.get("id");
    let id;
    if (idStr) {
      id = parseInt(idStr);
      const lesson = await getLessonById(id);
      if (!lesson) {
        return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
      }
      return NextResponse.json(lesson);
    }
    const lessons = await getLessons();
    if (!lessons) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }
    return NextResponse.json(lessons);
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to fetch lesson" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

  try {

    let idstr = params.id ;
    if (idstr) {
      const id = parseInt(idstr, 10); // Convert string to number
      const data = await req.json();
      delete data['createdAt']
      console.log('-----------------------------------------------------');
      console.log('data in put',data);
      console.log('-----------------------------------------------------');
      const updatedLesson = await updateLesson(id, data);
      console.log('-----------------------------------------------------');
      console.log('updatedLesson',updatedLesson);
      console.log('-----------------------------------------------------');
      
      return NextResponse.json(updatedLesson);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to update lesson" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {

  try {
    
    let id = parseInt(params.id)
    if (id) {
      const deletedLesson = await deleteLesson(id);

      console.log('-----------------------------------------------------');
      console.log('deletedLesson',deletedLesson);
      console.log('-----------------------------------------------------');
      
      return NextResponse.json(deletedLesson);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to delete lesson" }, { status: 500 });
  }
}
