import { createSubject, getSubjects } from '@/db/queries/subject.queries';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('-----------------------------------------------------');
    console.log('data',data);
    console.log('-----------------------------------------------------');
    
    const newClass = await createSubject(data);
    console.log('-----------------------------------------------------');
    console.log('newClass',newClass);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json("newClass", { status: 201 });
  } catch (error) {
    console.log('-----------------------------------------------------');
    console.log('error',error);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 });
  }
}

// app/api/subject/route.ts
export async function GET(req: NextRequest) {
  try {
      const class_ = await getSubjects();
      if (!class_) {
        return NextResponse.json({ error: 'Class not found' }, { status: 404 });
      }
      return NextResponse.json(class_);
    
  } catch (error) {
    console.log('-----------------------------------------------------');
    console.log('error',error);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json({ error: 'Failed to fetch class' }, { status: 500 });
  }
}
