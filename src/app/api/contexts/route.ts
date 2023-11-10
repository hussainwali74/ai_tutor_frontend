import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import ContextModel, {
    contextSchema,
    ContextInterface,
} from "../../model/context";
import { model, connect } from "mongoose";
import { Context } from "vm";


export async function POST(req: Request) {
    try {
        const body: Context = await req.json();
        if (!body) {
            return new NextResponse("data is required required", { status: 400 });
        }

        await connect(process.env.MONGO_ATLAS_URL + "/newdb");
        let q: ContextInterface = {
            subject: body.subject,
            context: body.context,
            topic: body.topic,
            sub_topic: body.sub_topic
        };

        let newFilter = new ContextModel(q);
        await newFilter.save();

        const all: ContextInterface[] = await ContextModel.find({});
        return NextResponse.json({ data: all, status: 200 });

    } catch (error) {
        console.log("[FILTER_CREATION_ERROR]", error);
        return new NextResponse("Internal error", { status: 500 });
    }
}

export async function GET(req: Request) {
    try {
        await connect(process.env.MONGO_ATLAS_URL + "/newdb");
        const all: ContextInterface[] = await ContextModel.find({});

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
        await connect(process.env.MONGO_ATLAS_URL + "/newdb");
        const resp = await ContextModel.findByIdAndDelete(
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
