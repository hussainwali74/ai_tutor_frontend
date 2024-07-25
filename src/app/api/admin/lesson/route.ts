import { NextRequest, NextResponse } from "next/server";
import { connect, Types } from "mongoose";
import { mongo_atlas_connection_str } from "@/lib/db";
import LessonModel, { LessonInterface } from "@/app/models/lesson";
import SubjectModel, { SubjectInterface } from "@/app/models/subject";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { payload } = body;
    if (!payload) {
      return new NextResponse("messages required", { status: 400 });
    }
    await connect(mongo_atlas_connection_str);

    let q: LessonInterface = {
      title: payload.title,
      subject: payload.subject,
      summary: payload.summary,
      context: payload.context,
      topic: payload.topic,
    };
    let newLesson = new LessonModel(q);
    await newLesson.save();

    const all: LessonInterface[] = await LessonModel.find();
    return NextResponse.json({ data: all, status: 200 });
  } catch (error) {
    console.log("[FILTER_CREATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
	try {

		await connect(mongo_atlas_connection_str);

		const id = req.nextUrl.searchParams.get("id");
    console.log('-----------------------------------------------------');
    console.log('id',id);
    console.log('-----------------------------------------------------');
    
    if (id && Types.ObjectId.isValid(id)) {
      let lesson: LessonInterface | null = await LessonModel.findById(id).lean();
      if(lesson){
          const subject:SubjectInterface| null = await SubjectModel.findById(lesson.subject)
          lesson['subject'] = subject?subject.title:lesson.subject
      }
      return NextResponse.json({ data: lesson, status: 200 });
    } else {
      const lessons: LessonInterface[] = await LessonModel.find();
      return NextResponse.json({ data: lessons, status: 200 });
    }
  } catch (error) {
    console.log('----------------------------------------');
    console.log('admin/lesson error',error);
    console.log('----------------------------------------');
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id && Types.ObjectId.isValid(id)) {
      const resp = await LessonModel.findByIdAndDelete(req.nextUrl.searchParams.get("id"));
      return NextResponse.json({ data: " all", status: 200 });
    } else {
      return new NextResponse("Invalid id provided", { status: 400 });
    }
  } catch (error) {
    console.log("=========================================================");
    console.log("error lesson delete  routes.ts 80", error);
    console.log("=========================================================");
    return new NextResponse("Internal error", { status: 500 });
  }
}
