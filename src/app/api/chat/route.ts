// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request) {


  try {
    const body = await req.json();
    const url = "https://api.openai.com/v1/chat/completions";
    const headers = {
      "Content-type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    };

    const response = await axios.post(url, body, { headers: headers });

    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error);
    return new NextResponse("something went wrong", { status: 500 });
  }
}
