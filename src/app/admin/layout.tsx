import React from "react";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import "../globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <div className="bg-[#eae8e8] flex text-gray-900 space-x-4  h-screen ">
          <div className="flex flex-col w-1/4 justify-center h-screen space-y-2 pl-3 text-gray-900 align-middle">
            <Link
              className="items-center p-3 border border-gray-400 rounded-md hover:bg-gray-300"
              href="/admin"
            >
              Admin
            </Link>
          
            <Link
              className="items-center p-3 border border-gray-400 rounded-md hover:bg-gray-300"
              href="/admin/create-subject-topic"
            >
              Create Subject/Topic
            </Link>
            <Link
              className="items-center p-3 border border-gray-400 rounded-md hover:bg-gray-300"
              href="/admin/create-lesson"
            >
              Create Lesson
            </Link>
            <Link
              className="items-center p-3 border border-gray-400 rounded-md hover:bg-gray-300"
              href="/admin/general-prompt"
            >
              General Prompt
            </Link>
              <Link
                  className="items-center p-3 border border-gray-400 rounded-md hover:bg-gray-300"
                  href="/admin/config"
              >
                  Model Config
              </Link>
          </div>
          <div className="flex flex-col w-full  h-screen text-gray-900 ">
            {children}
          </div>
        </div>

  );
}
