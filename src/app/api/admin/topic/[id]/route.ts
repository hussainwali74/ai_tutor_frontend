import { NextRequest, NextResponse } from "next/server";
import { deleteTopic, getTopicById, getTopics, updateTopic } from "@/db/queries/topic.queries";

// app/api/topices/[id]/route.ts

export async function GET(req: NextRequest) {
  try {
    const idStr = req.nextUrl.searchParams.get("id");
    let id;
    if (idStr) {
      id = parseInt(idStr);
      const topic = await getTopicById(id);
      if (!topic) {
        return NextResponse.json({ error: "Topic not found" }, { status: 404 });
      }
      return NextResponse.json(topic);
    }
    const topics = await getTopics();
    if (!topics) {
      return NextResponse.json({ error: "Topic not found" }, { status: 404 });
    }
    return NextResponse.json(topics);
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to fetch topic" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

  try {

    let idstr = params.id ;
    if (idstr) {
      const id = parseInt(idstr, 10); // Convert string to number
      const data = await req.json();
      console.log('-----------------------------------------------------');
      console.log('data in put',data);
      console.log('-----------------------------------------------------');
      delete data['createdAt']
      const updatedTopic = await updateTopic(id, data);
      console.log('-----------------------------------------------------');
      console.log('updatedTopic',updatedTopic);
      console.log('-----------------------------------------------------');
      
      return NextResponse.json(updatedTopic);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to update topic" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {

  try {
    
    let id = parseInt(params.id)
    if (id) {
      const deletedTopic = await deleteTopic(id);

      console.log('-----------------------------------------------------');
      console.log('deletedTopic',deletedTopic);
      console.log('-----------------------------------------------------');
      
      return NextResponse.json(deletedTopic);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to delete topic" }, { status: 500 });
  }
}
