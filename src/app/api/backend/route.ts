// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req:Request){

  try {
      // const url = "http://127.0.0.1:8000/begin_chat"
      const url = (process.env.BASE_URL + '/begin_chat')?.toString()

    const  body  = await req.json();
    // const data = {"subject": subject,"topic": topic,"subtopic": sub_topic}
  
    const headers = {'Content-Type': 'application/json','accept': 'application/json'};
      if (url) {

          const response = await axios.post(url, body, { headers: headers });
          return NextResponse.json(response.data);
      }
      return NextResponse.json("no data");
  } catch (error) {
    console.log(error);
    return new NextResponse("something went wrong",{status:500})
    
  }
}
