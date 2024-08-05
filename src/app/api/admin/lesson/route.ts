import { createLesson, getLessons } from '@/db/queries/lesson.queries';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('-----------------------------------------------------');
    console.log('data',data);
    console.log('-----------------------------------------------------');
    
    const newLesson = await createLesson(data);

    console.log('-----------------------------------------------------');
    console.log('newLesson',newLesson);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json(newLesson, { status: 201 });
  } catch (error) {
    console.log('-----------------------------------------------------');
    console.log('error',error);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json({ error: 'Failed to create topic' }, { status: 500 });
  }
}

// app/api/topices/route.ts
export async function GET(req: NextRequest) {
  try {
      const topics = await getLessons();
      if (!topics) {
        return NextResponse.json({ error: 'Lesson not found' }, { status: 404 });
      }
      return NextResponse.json(topics);
    
  } catch (error) {
    console.log('-----------------------------------------------------');
    console.log('error',error);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}
