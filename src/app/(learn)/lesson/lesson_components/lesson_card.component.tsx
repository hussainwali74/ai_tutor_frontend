import React from "react";
import Image from "next/image";
import { LessonInterface } from "@/app/models/lesson";

type Props = {
  lesson: LessonInterface;
  startLesson: (id?: number) => void;
  i: number;
};

export default function LessonCardComponent({ lesson, startLesson, i }: Props) {
  return (
    <div className="w-full p-6 relative place-items-center object-center content-center items-center py-10 mt-10 flex flex-col bg-white border border-gray-200 rounded-lg  shadow-md ">
      <div className="absolute leading-6 -top-8 text-center justify-center bg-[#FF9800] rounded-full h-16 w-16">
        <p className="text-white font-[400] text-[12px] pt-2">Lesson</p>
        <p className="text-white font-[400] text-[26px]">{i + 1}</p>
      </div>
      <p className=" text-gray-700 h-14 font-[400] text-center  pt-2   text-[12px] lg:text-[16px]">
        {lesson.title}
      </p>
      <div className="py-5 space-y-3">
        <span className="text-[#7160A8]">Top Students</span>
        <div className="flex">
          <Image src={"/Avatars/1.png"} width={40} height={40} alt="new" />
          <Image src={"/Avatars/2.png"} width={40} height={40} alt="new" />
          <Image src={"/Avatars/3.png"} width={40} height={40} alt="new" />
        </div>
      </div>
      <button
        onClick={() => startLesson(lesson.id)}
        type={"button"}
        className="inline-flex w-full  justify-center  px-3 py-2 text-sm font-medium  rounded-2xl text-white bg-gradient-to-r from-[#FFCB17] to-[#FBB21A]  focus:ring-4 focus:outline-none focus:ring-blue-300 "
      >
        Start Lesson
      </button>
    </div>
  );
}
