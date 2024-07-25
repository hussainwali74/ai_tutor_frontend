// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import  {GPTLLm}  from "@/lib/gpt";
import { getChatByStudentId, getStudentByClerkId, insertStudentChat } from "@/db/queries";
import { ChatCompletionMessageParam, getGpt } from "@/lib/gpt";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
const gpt = getGpt()
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const message = body.message
    console.log('-----------------------------------------------------');
    console.log('message',message);
    console.log('-----------------------------------------------------');
    let res = "there is some issue on the backend"
    const userId= auth()
    if (userId?.userId){
      const data = await getStudentByClerkId(userId.userId)
      if (data){
        const student_id = data[0].student.id
        let inserted_chat = await insertStudentChat(student_id,body.lesson_id, 'user' ,body.message)
        const chat_data = await getChatByStudentId(student_id)
        // @ts-ignore
        const conversation_history:ChatCompletionMessageParam[] = chat_data.map((chat)=>{
          return {role:chat?.role, content:chat?.content}
        })
        console.log('-----------------------------------------------------');
        console.log('conversation_history',conversation_history);
        console.log('-----------------------------------------------------');
        gpt.conversation_history = conversation_history 
        
        
        console.log('-----------------------------------------------------');
        console.log('gpt.conversation_history',gpt.conversation_history);
        console.log('-----------------------------------------------------');
        
        res = await gpt.chatCompletion() || '-'
        inserted_chat = await insertStudentChat(student_id,body.lesson_id, 'assistant' ,res!)
      }
    }
    
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse("something went wrong", { status: 500 });
  }
}
