import { NextResponse } from "next/server";
import { createClient } from "@deepgram/sdk";
import fs from "fs";
import path from "path";
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

      // STEP 5: Write the audio buffer to a file
      let audioFilePath = "public/audio";
  
      // Ensure the directory exists
      const dir = path.dirname(audioFilePath);
      if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir, { recursive: true });
      }
      audioFilePath = path.join(audioFilePath,'output.mp3')
      fs.writeFileSync(audioFilePath, audioBuffer);
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
