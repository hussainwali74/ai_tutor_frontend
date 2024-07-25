import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/index.mjs';
import { getSystemPrompt } from './ai/prompt';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

export async function GPTLLmtest() {
  const chatCompletion = await client.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: "gpt-4o-mini",

    // model: 'gpt-3.5-turbo',
  });
  console.log('-----------------------------------------------------');
  console.log('chatCompletion',chatCompletion.choices);
  console.log('-----------------------------------------------------');
  console.log('chatCompletion',chatCompletion.choices[0]);
  console.log('-----------------------------------------------------');
  return chatCompletion.choices[0].message.content
}

export type ChatCompletionMessageParam = {
    role: 'user' | 'system' | 'assistant';
    content: string;
};

class GPTLLm {
    conversation_history: ChatCompletionMessageParam[] = [];

    constructor() {        
        // this.conversation_history = [{ role: 'system', content: 'you are an angry young kid' }];
    }

    public addMessage(role: 'user' | 'system' | 'assistant', message: string) {
        this.conversation_history.push({ role, content: message });
    }

    public async chatCompletion() {
        const chatCompletion = await client.chat.completions.create({
            messages: this.conversation_history,
            model: "gpt-4o-mini",
        });

        return chatCompletion.choices[0].message.content;
    }
}

const gpt = new GPTLLm()
export function getGpt() {
    return gpt
}
