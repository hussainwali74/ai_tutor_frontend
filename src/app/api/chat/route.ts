// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req:Request){
  // req.headers.get('referer')
  // const referer = req.headers.get('referer') || req.headers.get('referrer'); // get the referer from the request headers
  console.log('=========================================================')
  console.log('process.env.OPENAI_API_KEY',process.env.OPENAI_API_KEY);
  console.log('=========================================================')

  try {
    const  body  = await req.json();
    console.log('=========================================================')
    console.log('body',body);
    console.log('=========================================================')
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    };

    const response = await axios.post(url, body, { headers: headers })

    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error);
    return new NextResponse("something went wrong",{status:500})
    
  }
}
