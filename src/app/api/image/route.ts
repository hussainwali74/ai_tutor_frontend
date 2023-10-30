import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import image from "../../model/image";
// const mongoose = require("mongoose");

import QuestionModel, {
  questionSchema,
  QuestionInterface,
} from "../../model/question";
import { model, connect } from "mongoose";
import { ImageInterface } from "@/app/model/image";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  console.log('=========================================================')
  console.log('creatingn image now',);
  console.log('=========================================================')
  try {
    const body = await req.json();
    const { prompt } = body;
    if (!configuration.apiKey) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!prompt) {
      return new NextResponse("prompt required", { status: 400 });
    }
    const response = await openai.createImage({
      prompt,
      n:1,
      size:`512x512`,
    });
console.log('=========================================================')
console.log('response',response);
console.log('=========================================================')
    // const resp = JSON.parse(response.data.choices[0].message?.content as string)
    await connect(process.env.MONGODB_URL+"/newdb")
    let q: ImageInterface = {
      prompt,
      image_url: response.data.data[0].url || "no response from gpt",
    };
    let newImage = new image(q)
    await newImage.save();

    return NextResponse.json(response.data.data[0]?.url);

  } catch (error) {
    console.log("[IMAGE_GEN_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connect(process.env.MONGODB_URL+"/newdb");
    const all = await QuestionModel.find({});
    return NextResponse.json({ data: all, status: 200 });
  } catch (error) {
    console.log("=========================================================");
    console.log("error GET routes.ts 62", error);
    console.log("=========================================================");
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    await connect(process.env.MONGODB_URL+"/newdb");
    const resp = await QuestionModel.findByIdAndDelete(
      req.nextUrl.searchParams.get("id")
    );
    console.log("=========================================================");
    console.log("resp", resp);
    console.log("=========================================================");
    return NextResponse.json({ data: " all", status: 200 });
  } catch (error) {
    console.log("=========================================================");
    console.log("error GET routes.ts 62", error);
    console.log("=========================================================");
    return new NextResponse("Internal error", { status: 500 });
  }
}
