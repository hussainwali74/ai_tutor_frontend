import { model, connect } from "mongoose";
import mime from "mime";
import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import * as dateFn from "date-fns";
import { NextRequest, NextResponse } from "next/server";
import ImageModel, { ImageInterface } from "@/app/model/image";
import QuestionModel from "@/app/model/question";

export async function PUT(request: NextRequest) {
  const formData = await request.formData();

  const file = formData.get("image") as Blob | null;
  if (!file) {
    return NextResponse.json(
      { error: "File blob is required." },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const relativeUploadDir = `/uploads/${dateFn.format(Date.now(), "dd-MM-Y")}`;
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error(
        "Error while trying to create directory when uploading a file\n",
        e
      );
      return NextResponse.json(
        { error: "Something went wrong." },
        { status: 500 }
      );
    }
  }

  try {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${file.name.replace(
      /\.[^/.]+$/,
      ""
    )}-${uniqueSuffix}.${mime.getExtension(file.type)}`;
    await writeFile(`${uploadDir}/${filename}`, buffer);
    await connect(process.env.MONGO_DB_HOST+"/newdb");

    const newQ = await QuestionModel.findByIdAndUpdate(formData.get('id'),{
        image_url: `${relativeUploadDir}/${filename}`
    })
    console.log('=========================================================')
    console.log('newQ after saving image',newQ);
    console.log('=========================================================')
    // const image:ImageInterface = {
    //     image_url: `${relativeUploadDir}/${filename}`,
    //     prompt:'manual',
    //     question_id:formData.get('id') as string|'none'
    // }
    // const img = new ImageModel(image)
    // const res = await img.save()
    // console.log('=========================================================')
    // console.log('res of saving image model',res);
    // console.log('=========================================================')

    return NextResponse.json({ fileUrl: `${relativeUploadDir}/${filename}` });
  } catch (e) {
    console.error("Error while trying to upload a file\n", e);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
