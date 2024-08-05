import { deleteSubject, getSubjectById, getSubjects, updateSubject } from "@/db/queries/subject.queries";
import { NextRequest, NextResponse } from "next/server";

// app/api/subject/[id]/route.ts

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const idStr = params.id;
    let id;
    if (idStr) {
      id = parseInt(idStr);
      const subject = await getSubjectById(id);
      if (!subject) {
        return NextResponse.json({ error: "Class not found" }, { status: 404 });
      }
      return NextResponse.json(subject);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to fetch class" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

  try {

    let idstr = params.id ;
    if (idstr) {
      const id = parseInt(idstr, 10); // Convert string to number
      const data = await req.json();
      console.log('-----------------------------------------------------');
      console.log('data',data);
      console.log('-----------------------------------------------------');
      
      const updatedClass = await updateSubject(id, data);
      return NextResponse.json(updatedClass);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to update class" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {

  try {
    
    let id = parseInt(params.id)
    if (id) {
      const deletedClass = await deleteSubject(id);

      console.log('-----------------------------------------------------');
      console.log('deletedClass',deletedClass);
      console.log('-----------------------------------------------------');
      
      return NextResponse.json(deletedClass);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to delete class" }, { status: 500 });
  }
}
