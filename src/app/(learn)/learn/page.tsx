import Link from "next/link";
import React from "react";
import { topic } from "@/db/schema";
import { getTopics } from "@/db/queries/topic.queries";

export default async function LearnPage() {
  const topics: (typeof topic.$inferSelect)[] = await getTopics();

  return (
    <>
      <div className="flex flex-col items-center lg:flex-row">
        <div className="flex justify-between w-full px-4 py-2 bg-white rounded-sm shadow-sm text-muted-foreground lg:w-1/5">
          <div className="flex flex-col items-center">
            <h3 className="text-orange-400">745</h3>
            <p>Points</p>
          </div>
          <div className="flex flex-col items-center">
            <h3>1</h3>
            <p>Level</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-p text-lime-500">95%</h3>
            <p>Proficiency</p>
          </div>
        </div>
        <div className="w-3/5 pt-10 text-xl lg:pt-0">
          <div className="flex flex-col items-center w-full text-white ">
            <h2 className="text-xl font-bold tracking-wider">AI Tutor</h2>
            <h3 className="font-light">Primary 6</h3>
          </div>
        </div>
      </div>
      {/* proficiency */}
      <div className="grid items-start w-full grid-cols-2 gap-3 pt-40 space-x-4 lg:grid-cols-4">
        {topics.length ? (
          topics?.map((topicc, i) => (
            <Link key={i} href={"/lesson"} className="flex flex-col items-center font-bold">
              <div
                className={`w-32 h-32 rounded-full bg-orange-400 border-4 border-solid text-white flex flex-col bg-center justify-center items-center  ${
                  topicc.id == 1 ? "border-lime-400" : "border-gray-200"
                }`}
              >
                <h3 className="">{topicc.title}</h3>
                {/* <h3 className="text-lime-500">100%</h3> */}
              </div>
              <h3 className="text-lime-300">{topicc.title}</h3>
              {/* <h3 className="text-lime-500">{topicc.summary}%</h3> */}
            </Link>
          ))
        ) : (
          <h3>No Topics yet</h3>
        )}
      </div>
      <div className="pt-4"></div>
      {/* Class info */}
      {/* Subjects list */}
      {/* footer images */}
    </>
  );
}
