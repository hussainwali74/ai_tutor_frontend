import { createPrompt, getPrompts } from '@/db/queries/prompt.queries';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();    
    const newClass = await createPrompt(data);

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.log('-----------------------------------------------------');
    console.log('error',error);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json({ error: 'Failed to create prompt' }, { status: 500 });
  }
}

// app/api/promptes/route.ts
export async function GET(req: NextRequest) {
  try {
      const prompt_ = await getPrompts();
      if (!prompt_) {
        return NextResponse.json({ error: 'Prompt not found' }, { status: 404 });
      }
      return NextResponse.json(prompt_);
    
  } catch (error) {
    console.log('-----------------------------------------------------');
    console.log('error',error);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json({ error: 'Failed to fetch prompt' }, { status: 500 });
  }
}
