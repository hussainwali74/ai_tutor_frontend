import { deletePrompt, getPromptByType, getPrompts, updatePrompt } from "@/db/queries/prompt.queries";
import { NextRequest, NextResponse } from "next/server";

// app/api/promptes/[id]/route.ts

export async function GET(req: NextRequest) {
  try {
    const idStr = req.nextUrl.searchParams.get("id");
    let id;
    if (idStr) {
      id = parseInt(idStr);
      const prompt_ = await getPrompts();
      if (!prompt_) {
        return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
      }
      return NextResponse.json(prompt_);
    }
    const prompt_ = await getPrompts();
    if (!prompt_) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }
    return NextResponse.json(prompt_);
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to fetch prompt" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

  try {

    let idstr = params.id ;
    if (idstr) {
      const id = parseInt(idstr, 10); // Convert string to number
      const data = await req.json();
      
      const updatedPrompt = await updatePrompt(id, data);
      return NextResponse.json(updatedPrompt);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to update prompt" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string }}) {

  try {
    
    let id = parseInt(params.id)
    if (id) {
      const deletedPrompt = await deletePrompt(id);
      
      return NextResponse.json(deletedPrompt);
    }
  } catch (error) {
    console.log("-----------------------------------------------------");
    console.log("error", error);
    console.log("-----------------------------------------------------");

    return NextResponse.json({ error: "Failed to delete prompt" }, { status: 500 });
  }
}
