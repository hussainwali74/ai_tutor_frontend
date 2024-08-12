import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;
    console.log("generating audio for text", text);
    console.log("----------------------------------------");
    const apiKey = process.env.DEEPGRAM_API_KEY || "";
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
      return new NextResponse(stream, {
        headers: {
          "Content-Type": "audio/wav",
          "Content-Disposition": 'attachment; filename="audio.wav"',
        },
      });
    } else {
      console.error("Error generating audio:", stream);
      return NextResponse.json({ error: "Error generating audio" }, { status: 500 });
    }
  } catch (error) {
    console.log("----------------------------------------");
    console.log("audio route error 40 in audio route", error);
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

  const dataArray = chunks.reduce((acc, chunk) => Uint8Array.from([...acc, ...chunk]), new Uint8Array(0));

  return Buffer.from(dataArray.buffer);
};

export async function GET(req: NextRequest) {
  const url = new URL(req.url || "");
  // const searchParam = new URLSearchParams(url.searchParams)

  return NextResponse.json({
    success: true,
    message: "Audio delete successfully",
  });
}
