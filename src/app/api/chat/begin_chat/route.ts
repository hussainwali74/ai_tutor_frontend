// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getSystemPrompt } from "@/lib/ai/prompt";
import { getGpt } from "@/lib/gpt";
// import  {GPTLLm}  from "@/lib/gpt";
import { NextRequest, NextResponse } from "next/server";

const gpt = getGpt()
export async function POST(req: NextRequest) {
  try {
    // const message = req.nextUrl.searchParams.get("message");
    const message = await req.json();
    console.log('-----------------------------------------------------');
    console.log('message in chat route',(message));
    console.log('-----------------------------------------------------');
    
    // const res = await GPTLLm()
    const system_prompt = await getSystemPrompt(JSON.stringify(message))
    gpt.addMessage('system', system_prompt)
    const res = await gpt.chatCompletion()
    
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse("something went wrong", { status: 500 });
  }
}
