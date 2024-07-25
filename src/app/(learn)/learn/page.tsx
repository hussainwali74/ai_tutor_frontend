import { cn } from "@/lib/utils";
import { BarChart3, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function LearnPage() {
  const topics = [
    {
      link:'/lesson',
    title: 'Algebra',
    started:true,
    completion_status:100,
    icon:'a + b +c'
  },
    {
      link:'/lesson',
    title: 'Fraction',
    started:true,
    completion_status:80,
    icon:'a / b'
  },
    {
      link:'/lesson',
    title: 'Ratio',
    started:false,
    completion_status:0,
    icon:'a:b'
  },
    {
      link:'/lesson',
    title: 'Percentage',
    started:false,
    completion_status:0,
    icon:'%'
  },
]
  return (
    <>
      <div className="flex items-center lg:flex-row flex-col">
        <div className="flex shadow-sm text-muted-foreground lg:w-1/5 w-full justify-between bg-white rounded-sm px-4 py-2">
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
        <div className=" w-3/5 lg:pt-0 pt-10  text-xl">
          <div className=" items-center text-white flex flex-col w-full">
            <h2 className="font-bold tracking-wider text-xl">AI Tutor</h2>
            <h3 className="font-light">Primary 6</h3>
          </div>
        </div>
      </div>
      {/* proficiency */}
      <div className="pt-40 grid w-full lg:grid-cols-4  grid-cols-2 gap-3 items-start space-x-4">
        
        {topics.map((topic,i)=>(

          <Link key={i} href={topic.link} className="flex flex-col items-center font-bold">
          <div className={`w-32 h-32 rounded-full bg-orange-400 border-4 border-solid text-white flex flex-col bg-center justify-center items-center  ${topic.started?'border-lime-400':'border-gray-200'}` }>
            <h3 className="">{topic.icon}</h3>
            {/* <h3 className="text-lime-500">100%</h3> */}
          </div>
          <h3 className="text-gray-800">{topic.title}</h3>
          <h3 className="text-lime-500">{topic.completion_status}%</h3>
        </Link>
        ))}
      </div>
      <div className="pt-4">
        
      </div>
      {/* Class info */}
      {/* Subjects list */}
      {/* footer images */}
    </>
  );
}
