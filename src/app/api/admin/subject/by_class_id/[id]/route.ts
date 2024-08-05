import { getSubjectByClassId } from "@/db/queries/subject.queries";
import { NextRequest, NextResponse } from "next/server";

// app/api/subject/[id]/route.ts

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const idStr = params.id;
    let id;
    if (idStr) {
      id = parseInt(idStr);
      const subjects = await getSubjectByClassId(id);
      console.log('-----------------------------------------------------');
      console.log('subjects',subjects);
      console.log('-----------------------------------------------------');
      
      if (!subjects) {
        return NextResponse.json({ error: "Subjects of the class id: "+id+" not found" }, { status: 404 });
      }
      return NextResponse.json(subjects);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to fetch Subject by class" }, { status: 500 });
  }
}

