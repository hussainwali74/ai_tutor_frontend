import { NextRequest, NextResponse } from 'next/server';
import { createTopic, getTopics } from '@/db/queries/topic.queries';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('-----------------------------------------------------');
    console.log('data',data);
    console.log('-----------------------------------------------------');
    
    const newTopic = await createTopic(data);
    console.log('-----------------------------------------------------');
    console.log('newTopic',newTopic);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json(newTopic, { status: 201 });
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
      const topics = await getTopics();
      if (!topics) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
      }
      return NextResponse.json(topics);
    
  } catch (error) {
    console.log('-----------------------------------------------------');
    console.log('error',error);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json({ error: 'Failed to fetch topic' }, { status: 500 });
  }
}
