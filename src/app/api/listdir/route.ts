import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
interface FileEntry {
    name: string;
    isDirectory: boolean;
    children?: FileEntry[];
}
export async function POST(req: Request) {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const filesList = await listFiles(publicDir);

    return NextResponse.json({
      success: true,
      message: "Audio fetched successfully",
      filesList,
    });
  } catch (error) {
    console.log("----------------------------------------");
    console.log("error in list dir route", error);
    console.log("----------------------------------------");
    return new NextResponse("something went wrong", { status: 500 });
  }
}

async function listFiles(dirPath: string): Promise<FileEntry[]> {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });
    const filesList: FileEntry[] = [];
   
    for (const entry of entries) {
       const fullPath = path.join(dirPath, entry.name);
       if (entry.isDirectory()) {
         filesList.push({
           name: entry.name,
           isDirectory: true,
           children: await listFiles(fullPath),
         });
       } else {
         filesList.push({
           name: entry.name,
           isDirectory: false,
         });
       }
    }
   
    return filesList;
   }
