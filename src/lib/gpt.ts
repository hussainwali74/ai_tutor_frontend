import { insertStudentChat } from "@/db/queries/student.queries";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "asu", // This is the default and can be omitted
});
console.log('-----------------------------------------------------');
console.log('process.env.OPENAI_API_KEY',process.env.OPENAI_API_KEY);
console.log("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)
console.log("CLERK_SECRET_KEY", process.env.CLERK_SECRET_KEY)
console.log("NEXT_PUBLIC_CLERK_SIGN_IN_URL", process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL)
console.log("NEXT_PUBLIC_CLERK_SIGN_UP_URL", process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL)
console.log("NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL", process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL)
console.log("NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL", process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL)
console.log('-----------------------------------------------------');


export type ChatCompletionMessageParam = {
  role: "user" | "system" | "assistant";
  content: string;
};

class GPTLLm {
  conversation_history: ChatCompletionMessageParam[] = [];

  constructor() {
    // this.conversation_history = [{ role: 'system', content: 'you are an angry young kid' }];
  }

  public addMessage(role: "user" | "system" | "assistant", message: string) {
    this.conversation_history.push({ role, content: message });
  }

  public async chatCompletion() {
    client.apiKey = 'asdfasdfasdfasd'
    const chatCompletion = await client.chat.completions.create({
      messages: this.conversation_history,
      // model: "gpt-4o-mini",
      model: "gpt-3.5-turbo",
    });

    return chatCompletion.choices[0].message.content;
  }
}

/**
 * store message in db, add to gpt's memory and send msg to LLM returns llm reponse
 * @param role
 * @param student_id
 * @param lesson_id
 * @param message
 * @returns response of the LLM
 */
export const sendMsg = async (
  role: "user" | "system",
  student_id: number,
  lesson_id: number,
  message: string,
  gpt: GPTLLm
) => {
  await insertStudentChat(student_id, lesson_id, role, message!);
  gpt.addMessage(role, message);
  const res = (await gpt.chatCompletion()) || "-";
  const inserted_chat = await insertStudentChat(student_id, lesson_id, "assistant", res!);
  return { res, gpt };
};

const gpt = new GPTLLm();
export function getGpt() {
  return gpt;
}
