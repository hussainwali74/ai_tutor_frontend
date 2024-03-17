"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterInterface } from "../model/filter";
import Modal from "../components/modal";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { LessonInterface } from "../model/lesson";

export default function Page() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterInterface[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [lessons, setLessons] = useState<LessonInterface[]>([]);

  const [sub_topics, setSubTopics] = useState<any[]>([]);
  const [chatLog, setChatLog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [startedLessonId, setStartedLessonId] = useState<string | undefined>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function getAllLessons() {
      try {
        const response = await axios.get("/api/admin/lesson");
        setLessons(response.data.data);
      } catch (error) {
        console.log("error 45", error);
        console.log(
          "========================================================="
        );
      }
    }
    getAllLessons();
  }, []);

  // useEffect(() => {
  //   async function testing123() {
  //       const response = await axios.get("/api/audio");

  //       console.log('----------------------------------------');
  //       console.log('response',response);
  //       console.log('----------------------------------------');
  //   }

  //   testing123()
  // },[])
  
  useEffect(() => {
    async function getAllFilters() {
      try {
        const response = await axios.get("/api/filters");

        const topics_set = new Set(
          response.data.data.map((x: FilterInterface) => x.topic)
        );
        const subject_set = new Set(
          response.data.data.map((x: FilterInterface) => x.subject)
        );
        const subject_: any[] = Array.from(subject_set);
        setSubjects(subject_);
        const topics_: any[] = Array.from(topics_set);
        setTopics(topics_);
        const sub_topic_set = new Set(
          response.data.data.map((x: FilterInterface) => x.sub_topic)
        );
        const sub_topic_: any[] = Array.from(sub_topic_set);
        setSubTopics(sub_topic_);

        setFilters(response.data.data);
      } catch (error) {
        console.log("error getting filters lessons page.tsx 45", error);
      }
    }
    getAllFilters();
  }, []);

  const bgContainerStyle = {
    backgroundImage: `url('/lessons_bg.png')`,
    backgroundSize: "cover",
    height: "68%", // Set the height as needed
  };

  const startLesson = (id: string | undefined) => {
    setStartedLessonId(id);
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="flex bg-white container px-32 py-10 h-screen "
        style={bgContainerStyle}
      >
        <div className="flex flex-col">
          <div className="flex justify-evenly space-x-64">
            <div className="flex flex-col space-y-10">
              <div className="flex flex-row space-x-5">
                <Image
                  src="/user_avatar.png"
                  alt="Large Image"
                  width={64}
                  height={64}
                />
                <div className="text-white pt-1">
                  <span>Welcome back</span>
                  <h3 className="text-[20px] font-[600]">Douglas Tan</h3>
                </div>
              </div>
              <div className="flex text-black p-2 rounded-md space-x-5 px-6 bg-white justify-between text-center">
                <div className="flex flex-col text-center">
                  <h3 className="text-[#FF9F00] font-[400] text-[24px]">745</h3>
                  <span>Points</span>
                </div>
                <div className="flex flex-col text-center">
                  <h3 className="  text-gray-600  text-[24px] font-[400]">1</h3>
                  <span>Level</span>
                </div>
                <div className="flex flex-col text-center">
                  <h3 className="text-[#55A341] text-[24px] font-[400]">95%</h3>
                  <span>Proficiency</span>
                </div>
              </div>
            </div>
            {/* classmates */}
            <div className="flex flex-col items-center">
              <h3 className="text-[20px] font-[800] leading-[40.85px]">
                Classmates
              </h3>
              <Image
                className="py-5 "
                src="/algebra.png"
                alt="algebra Image"
                width={64}
                height={64}
              />
              <h3 className="text-[20px] font-[800] leading-[40.85px]">
                Algebra
              </h3>
              <span>AI Tutor - Primary 6</span>
            </div>
            <div>
              <Image
                src="/right_top.png"
                alt="right top Image"
                width={271}
                height={67}
              />
            </div>
          </div>

          <div className="flex flex-wrap space-x-4">
            {lessons.length
              ? lessons?.map((lesson, i) => (
                  <div
                    key={i}
                    className=" w-1/4 p-6 relative place-items-center object-center content-center items-center py-10 mt-10 flex flex-col bg-white border border-gray-200 rounded-lg  shadow-md "
                  >
                    <div className="absolute leading-6 -top-8 text-center  justify-center bg-[#FF9800] rounded-full h-16 w-16">
                      <p className="text-white font-[400] text-[12px] pt-2 ">
                        Lesson
                      </p>
                      <p className="text-white font-[400] text-[26px]">
                        {i + 1}
                      </p>
                    </div>
                    <p className="mb-3  text-gray-700  font-[400] text-[16px]">
                      {lesson.title}
                    </p>
                    <div className="py-5 space-y-3">
                      <span className="text-[#7160A8]">Top Students</span>
                      <div className="flex">
                        <Image
                          src={"/Avatars/1.png"}
                          width={40}
                          height={40}
                          alt="new"
                        />
                        <Image
                          src={"/Avatars/2.png"}
                          width={40}
                          height={40}
                          alt="new"
                        />
                        <Image
                          src={"/Avatars/3.png"}
                          width={40}
                          height={40}
                          alt="new"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => startLesson(lesson._id)}
                      type={"button"}
                      className="inline-flex w-full  justify-center  px-3 py-2 text-sm font-medium  rounded-2xl text-white bg-gradient-to-r from-[#FFCB17] to-[#FBB21A]  focus:ring-4 focus:outline-none focus:ring-blue-300 "
                    >
                      Start Lesson
                    </button>
                  </div>
                ))
              : null}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(!isModalOpen)}
        >
          <div className="flex flex-col  h-full w-full">
            <Image
              src={"/lesson_modal_heading.png"}
              width={300}
              height={200}
              onClick={() => setIsModalOpen(!isModalOpen)}
              alt={"ehadin"}
            />
            <div className="flex flex-col bg-white px-10  rounded-b text-center  items-center">
              <h3 className="py-4 font-bold">Lesson Summary</h3>
              <div className=" w-full ">
                {/* {changger(lessons.find((e)=>e._id===startedLessonId)?.summary)} */}
                {lessons.find((e) => e._id === startedLessonId)?.summary}
                {/* <span>
                  Are you sure
                  <ul>
                    <li>addtion that the quic</li>
                    <li>addtion that the quic</li>
                    <li>addtion that the quic</li>
                    <li>addtion that the quic</li>
                    <li>addtion that the quic</li>
                  </ul>
                </span> */}
                <div className="flex flex-col py-4 bg-full sm:flex-row justify-center gap-8  align-center">
                  {/* <button
              onClick={()=>setIsModalOpen(true)}
                type={"button"}
                > */}
                  <Link
                    href={
                      "/home?id=" +
                      lessons.find((e) => e._id === startedLessonId)?._id
                    }
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
