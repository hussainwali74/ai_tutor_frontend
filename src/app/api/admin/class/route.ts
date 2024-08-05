import { NextRequest, NextResponse } from 'next/server';
import { createClass_, getClass_es } from '@/db/queries/class.queries';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const newClass = await createClass_(data);

    return NextResponse.json(newClass, { status: 201 });
  } catch (error) {
    console.log('-----------------------------------------------------');
    console.log('error',error);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json({ error: 'Failed to create class' }, { status: 500 });
  }
}

// app/api/classes/route.ts
export async function GET(req: NextRequest) {
  try {
      const class_ = await getClass_es();
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
