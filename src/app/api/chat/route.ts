import { ChatCompletionMessageParam, getGpt, sendMsg } from "@/lib/gpt";
import { NextRequest, NextResponse } from "next/server";
import { getSystemPrompt } from "@/lib/ai/prompt";
import { getChatByStudentId, getStudentByClerkId } from "@/db/queries/student.queries";

let gpt = getGpt();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let res = "there seems to be some issue please try again later";
    const userId = req.headers.get("clerk_id");
    if (userId) {
      const student_data = await getStudentByClerkId(userId);
      if (student_data.length) {
        const student_id = student_data[0]?.student.id;
        const chat_data = await getChatByStudentId(student_id, body.lesson_id);
        if (!chat_data.length) {
          const system_prompt1 = await getSystemPrompt(body.lesson_data);
          ({ res, gpt } = await sendMsg("system", student_id, body.lesson_id, system_prompt1, gpt));
          return NextResponse.json(res);
        }
        const last_msg = chat_data[chat_data.length - 1];
        res = last_msg.content!;

        if (body.message && chat_data.length) {
          // @ts-ignore
          const conversation_history: ChatCompletionMessageParam[] = chat_data.map((chat) => {
            return { role: chat?.role, content: chat?.content };
          });
          gpt.conversation_history = conversation_history;
          
          ({ res, gpt } = await sendMsg("user", student_id, body.lesson_id, body.message, gpt));
          // console.log('-----------------------------------------------------');
          // console.log('res in route chat',res);
          // console.log('-----------------------------------------------------');
          
        } else if (chat_data.length) {
        }
      }
    }
    return NextResponse.json(res);
  } catch (error) {
    console.log(error);
    return new NextResponse("something went wrong", { status: 500 });
  }
}
