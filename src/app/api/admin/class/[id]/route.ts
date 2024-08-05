import { NextRequest, NextResponse } from "next/server";
import {  getClass_es, getClass_ById, updateClass_, deleteClass_ } from "@/db/queries/class.queries";

// app/api/classes/[id]/route.ts

export async function GET(req: NextRequest) {
  try {
    const idStr = req.nextUrl.searchParams.get("id");
    let id;
    if (idStr) {
      id = parseInt(idStr);
      const class_ = await getClass_ById(id);
      if (!class_) {
        return NextResponse.json({ error: "Class not found" }, { status: 404 });
      }
      return NextResponse.json(class_);
    }
    const class_ = await getClass_es();
    if (!class_) {
      return NextResponse.json({ error: "Class not found" }, { status: 404 });
    }
    return NextResponse.json(class_);
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
      
      const updatedClass = await updateClass_(id, data);
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
      const deletedClass = await deleteClass_(id);

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
