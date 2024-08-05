import { NextRequest, NextResponse } from 'next/server';
import { getUsers, insertUser } from '@/db/queries/user.queries';


export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log('-----------------------------------------------------');
    console.log('data',data);
    console.log('-----------------------------------------------------');
    
    const newUser = await insertUser(data);
    console.log('-----------------------------------------------------');
    console.log('newUser',newUser);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.log('-----------------------------------------------------');
    console.log('error',error);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

// app/api/useres/route.ts
export async function GET(req: NextRequest) {
  try {
      const users = await getUsers();
      if (!users) {
        return NextResponse.json({ error: 'Topic not found' }, { status: 404 });
      }
      return NextResponse.json(users);
    
  } catch (error) {
    console.log('-----------------------------------------------------');
    console.log('error',error);
    console.log('-----------------------------------------------------');
    
    return NextResponse.json({ error: 'Failed to fetch user' }, { status: 500 });
  }
}
