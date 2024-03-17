import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";
import { get_cloud_storage_object, get_service_account_key } from "@/app/lib/gcloud_utils";
import {v4 as uuidv4 } from 'uuid'

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;
    const apiKey = process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY || "";
    const model = "aura-asteria-en";
    const deepgram = createClient(apiKey);
    const response = await deepgram.speak.request(
      { text },
      {
        model,
        encoding: "linear16",
        container: "wav",
      }
    );
    
    // STEP 3: Get the audio stream and headers from the response
    const stream = await response.getStream();
    if (stream) {
      // STEP 4: Convert the stream to an audio buffer
      const audioBuffer = await getAudioBuffer(stream);
      const audioFilePath = await gcloud_store_audio(audioBuffer);
  
      return NextResponse.json({
        success: true,
        message: "Audio fetched successfully",
        audioFilePath,
      });
    } else {
      console.error("Error generating audio:", stream);
      return NextResponse.json(
        { error: "Error generating audio" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.log("----------------------------------------");
    console.log("error 45 in audio route", error);
    console.log("----------------------------------------");
    return new NextResponse("something went wrong", { status: 500 });
  }
}

// helper function to convert stream to audio buffer
const getAudioBuffer = async (response: any) => {
  const reader = response.getReader();
  const chunks = [];

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    chunks.push(value);
  }

  const dataArray = chunks.reduce(
    (acc, chunk) => Uint8Array.from([...acc, ...chunk]),
    new Uint8Array(0)
  );

  return Buffer.from(dataArray.buffer);
};

const gcloud_store_audio = async (audioBuffer: Buffer | undefined) => {
  const keyFilename = get_service_account_key();
  if (keyFilename && audioBuffer) {
    const bucketName = "ai-tutor-storage";
    const bucket  = get_cloud_storage_object(keyFilename,bucketName)
    const filename = `output_${uuidv4()}.mp3`; // Destination path in the bucket
    const file = bucket.file(filename);
    console.log("saving audio file");
    await file.save(audioBuffer);
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
  } else {
    console.error("did not store the file");
  }
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url||'')
  const searchParam = new URLSearchParams(url.searchParams)
  const fileName = searchParam.get('fileName')
  const keyFilename = get_service_account_key();
  if (keyFilename && fileName ) {
    const bucketName = "ai-tutor-storage";
    const bucket  = get_cloud_storage_object(keyFilename,bucketName)
    const file = bucket.file(fileName)
    const x = await file.delete()
  }

  return NextResponse.json({
    success: true,
    message: "Audio delete successfully",
  });
}
