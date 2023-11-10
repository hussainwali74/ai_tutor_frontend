import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { model, connect, Types } from "mongoose";
import TopicModel, { TopicInterface, } from "@/app/model/topic";


export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('==========================================================')
        console.log('body', body);
        console.log('=========================================================')

        const { payload } = body
        if (!payload) {
            return new NextResponse("messages required", { status: 400 });
        }

        await connect(process.env.MONGO_ATLAS_URL + "/newdb");
        const topic: any = await TopicModel.find({ id: payload.topic })
        console.log('=========================================================')
        console.log('topic', topic);
        console.log('=========================================================')
        let q: TopicInterface = {
            title: payload.title,
            subject_id: payload.subject_id,
            subject: payload.subject,
            detail: payload.summary,
            // topic:payload.topic,
        };

        let newTopic = new TopicModel(q);
        await newTopic.save();

        const all: TopicInterface[] = await TopicModel.find({});
        console.log('=========================================================')
        console.log('all', all);
        console.log('=========================================================')
        return NextResponse.json({ data: all, status: 200 });

    } catch (error) {
        console.log("[FILTER_CREATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: NextRequest) {

    try {
        console.log('=========================================================')
        console.log('js', 'x');
        console.log('=========================================================')
        // const {topic}:Partial<TopicInterface> = await  req.json();

        await connect(process.env.MONGO_ATLAS_URL + "/newdb");

        // if (topic && Types.ObjectId.isValid(topic)){
        const lessons: TopicInterface[] = await TopicModel.find();
        console.log('=========================================================')
        console.log('lessons', lessons);
        console.log('=========================================================')
        return NextResponse.json({ data: lessons, status: 200 });
        // }else {
        //     return new NextResponse('Invalid topic provided', { status: 400 });
        //   }
        return NextResponse.json({ data: "lessons", status: 200 });

    } catch (error) {
        console.log("=========================================================");
        console.log("error GET routes.ts 62", error);
        console.log("=========================================================");
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const _id = req.nextUrl.searchParams.get("id");
        if (_id && Types.ObjectId.isValid(_id)) {
            const topic: TopicInterface | null = await TopicModel.findById(_id)
            const subject_id = topic?.subject_id
            const resp = await TopicModel.findByIdAndDelete(req.nextUrl.searchParams.get("id"));
            const all = await TopicModel.find({ subject_id: subject_id })
            return NextResponse.json({ data: all, status: 200 });
        } else {
            return new NextResponse('Invalid _id provided', { status: 400 });
        }
    } catch (error) {
        console.log("=========================================================");
        console.log("error GET routes.ts 62", error);
        console.log("=========================================================");
        return new NextResponse("Internal error", { status: 500 });
    }
}
