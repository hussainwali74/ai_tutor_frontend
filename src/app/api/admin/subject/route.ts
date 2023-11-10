import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import { model, connect, Types } from "mongoose";
import SubjectModel, { SubjectInterface, } from "@/app/model/subject";
import { mongo_atlas_connection_str } from "@/app/lib/db";


export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { payload } = body
        if (!payload) {
            return new NextResponse("messages required", { status: 400 });
        }

        await connect(mongo_atlas_connection_str);

        let q: SubjectInterface = {
            title: payload.subject,
        };

        let newSubject = new SubjectModel(q);
        await newSubject.save();

        const all: SubjectInterface[] = await SubjectModel.find({});
        return NextResponse.json({ data: all, status: 200 });

    } catch (error) {
        console.log("[FILTER_CREATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request) {

    try {

        await connect(mongo_atlas_connection_str);

        const subjects: SubjectInterface[] = await SubjectModel.find();

        return NextResponse.json({ data: subjects, status: 200 });
    } catch (error) {
        console.log("=========================================================");
        console.log("error GET routes.ts 62", error);
        console.log("=========================================================");
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await connect(mongo_atlas_connection_str);
        const resp = await SubjectModel.findByIdAndDelete(req.nextUrl.searchParams.get("id"));
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
