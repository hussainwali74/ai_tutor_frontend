"use client";
import { useEffect,  useState } from "react";
import React from "react";

interface File {
  name: string;
  isDirectory: boolean;
}
function renderFiles(files: any, j: number) {
  let p = 5 ;
  if (j == 0) {
    p = 0;
  }
  p+=j
  return (
    <ul>
      {files.map((file: any, i: number) => (
        <li key={file.name} className={`pl-${p}`}>
          {file.isDirectory ? "📁" : "📄"} {file.name} - {j}
          {file.isDirectory && file.children && renderFiles(file.children, j+1)}
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    fetch("/api/listdir", { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setFiles(data.filesList);
        }
      })
      .catch((error) =>
        console.error("Error fetching public folder structure:", error)
      );
  }, []);

  return (
    <>
      <div className="flex  flex-col">
        <div className="flex flex-row bg-gray-100 text-gray-950">
          <div>
            <h2>Public Folder Structure</h2>
            {renderFiles(files, 0)}
          </div>
        </div>
      </div>
    </>
  );
}
