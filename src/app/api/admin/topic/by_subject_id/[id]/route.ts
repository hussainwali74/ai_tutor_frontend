import { getTopicById, getTopicBySubjectId } from "@/db/queries/topic.queries";
import { NextRequest, NextResponse } from "next/server";

// app/api/topic/[id]/route.ts

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const idStr = params.id;
    let id;
    if (idStr) {
      id = parseInt(idStr);
      const topics = await getTopicBySubjectId(id);
      console.log('-----------------------------------------------------');
      console.log('topics',topics);
      console.log('-----------------------------------------------------');
      
      if (!topics) {
        return NextResponse.json({ error: "Topics of the subject id: "+id+" not found" }, { status: 404 });
      }
      return NextResponse.json(topics);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to fetch Subject by subject" }, { status: 500 });
  }
}

