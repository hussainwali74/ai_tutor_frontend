"use client";

import { useEffect, useState } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/modal";
import LessonCardComponent from "./lesson_components/lesson_card.component";
import { getAllLessonsAction } from "../../../../actions/lesson.server_actions";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [startedLessonId, setStartedLessonId] = useState<number | undefined>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchAllLessons() {
      try {
        setLoading(true);
        const r = await getAllLessonsAction();
        setLessons(r);
        setLoading(false);
      } catch (error) {
        console.log("lesson page: get all lessons error 30", error);
        console.log("=========================================================");
      }
    }
    fetchAllLessons();
  }, []);

  const bgContainerStyle = {
    backgroundImage: `url('/lessons_bg.png')`,
    backgroundSize: "cover",
    height: "100%", // Set the height as needed
  };

  const startLesson = (id: number | undefined) => {
    setStartedLessonId(id);
    setIsModalOpen(true);
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 text-white animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-6 ">
          {lessons?.length
            ? lessons?.map((lesson, i) => (
                <LessonCardComponent key={i} i={i} lesson={lesson} startLesson={startLesson} />
              ))
            : null}
        </div>
      )}

      {isModalOpen && (
        <Modal isOpen={isModalOpen} handleClose={() => setIsModalOpen(!isModalOpen)}>
          <div className="flex flex-col w-full h-full">
            <Image
              src={"/lesson_modal_heading.png"}
              width={300}
              height={200}
              onClick={() => setIsModalOpen(!isModalOpen)}
              alt={"ehadin"}
            />
            <div className="flex flex-col items-center px-10 text-center bg-white rounded-b">
              <h3 className="py-4 font-bold">Lesson Summary</h3>
              <div className="w-full ">
                {lessons.find((e) => e.id === startedLessonId)?.summary}

                <div className="flex flex-col justify-center gap-8 py-4 bg-full sm:flex-row align-center">
                  <Link
                    href={"/home?id=" + lessons.find((e) => e.id === startedLessonId)?.id}
                    className="inline-flex w-full  justify-center  px-3 py-2 text-sm font-medium  rounded-2xl text-white bg-gradient-to-r from-[#FFCB17] to-[#FBB21A]  focus:ring-4 focus:outline-none focus:ring-blue-300 "
                  >
                    Proceed to Lesson
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
