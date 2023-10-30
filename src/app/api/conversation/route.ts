import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";
import question, { SingleQuestionModel } from "../../model/question";
// const mongoose = require("mongoose");

import QuestionModel, {
  questionSchema,
  QuestionInterface,
  SingleQuestionInterface,
} from "../../model/question";
import { model, connect } from "mongoose";
import ImageModel, { ImageInterface } from "@/app/model/image";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    const messages_for_api = messages["messages"];
    const prompt = messages_for_api["messages"][0]["content"];
    if (!configuration.apiKey) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!messages) {
      return new NextResponse("messages required", { status: 400 });
    }
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo-0613",
      messages: messages_for_api["messages"],
    });

    try {
      const resp = JSON.parse(
        response.data.choices[0].message?.content as string
      );
      console.log("=========================================================");
      console.log("resp", resp);
      console.log("=========================================================");
      const qs: {
        question: string;
        solution: string;
        correct_answer: string;
      }[] = Object.values(resp);

      await connect(process.env.MONGO_DB_HOST+"/newdb");
      for (let i = 0; i < qs.length; i++) {
        const single_q: SingleQuestionInterface = {
          question: qs[i].question,
          solution: qs[i].solution,
          correct_answer: qs[i].correct_answer,
          prompt,
          topic: messages.topic,
          grade: messages.grade,
          sub_topic: messages.sub_topic,
        };
        let new_singleQ = new SingleQuestionModel(single_q);
        await new_singleQ.save();
      }

      let q: QuestionInterface = {
        prompt,
        response:
          response.data.choices[0].message?.content || "no response from gpt",
        topic: messages.topic,
        sub_topic: messages.sub_topic,
        grade: messages.grade,
      };
      let newQ = new question(q);
      await newQ.save();
    } catch (error) {
      console.log("=========================================================");
      console.log("error POST question: 73", error);
      console.log("=========================================================");
      return new NextResponse("Internal error", { status: 500 });
    }
    return NextResponse.json(response.data.choices[0].message);

    // return NextResponse.json([]);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connect(process.env.MONGO_DB_HOST+"/newdb");
    const all: QuestionInterface[] = await QuestionModel.find({});
    // console.log('=========================================================')
    // console.log('all',all);
    for (let i = 0; i < all.length; i++) {
      if (all[i]._id) {
        const image = await ImageModel.findById(all[i]._id);
        // console.log('=========================================================')
        // console.log('image',image);
        // console.log('=========================================================')
        // all[i].image_url = image.image_url
      }
    }
    console.log("=========================================================");
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
    await connect(process.env.MONGO_DB_HOST+"/newdb");
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
