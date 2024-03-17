"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TypingAnimation from "../components/TypingAnimation";
import React from "react";
import { ChatMessage } from "../components/chat-message";
import { Separator } from "../components/ui/separator";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { getAudio } from "../lib/audio_utils";

export default function Page() {
  const [chatLog, setChatLog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [begunLesson, setBegunLesson] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLog]);

  const params = useSearchParams();
  
  const begin_lesson = () => {
    setBegunLesson(true)
    setIsLoading(true);
    const url = "/api/admin/lesson";
    setIsLoading(true);
    axios
      .get(url, { params: { id: params.get("id") } })
      .then((response) => {
        if (response.data.data) {
          setIsLoading(false);
          const data = {
            subject: response.data.data?.subject,
            topic: response.data.data?.topic,
            lesson_title: response.data.data?.title,
            summary: response.data.data?.summary,
            context: response.data.data?.context,
          };
          beginChat(data);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log("error 57", error);
        console.log(
          "========================================================="
        );
      });
  }

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  const beginChat = (data: any) => {
    const url = "api/admin/begin_chat";
    setIsLoading(true);
    axios
      .post(url, data, { headers: headers })
      .then(async (response) => {
        // await getAudio(response.data.data.message);
        setChatLog((prevChatLog) => {
          return [
            ...prevChatLog,
            { type: "bot", message: response.data.data.message },
          ];
        });

        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(
          "========================================================="
        );
        console.log("error 57", error);
        console.log(
          "========================================================="
        );
      });
  };

  const sendChat = (message: any) => {
    const url = "api/admin/chat?message=" + message;
    setIsLoading(true);
    axios
      .post(url, { headers: headers })
      .then(async (response) => {
        if (response?.data) {
          await getAudio(response.data.data.message);
          setChatLog((prevChatLog) => {
            return [
              ...prevChatLog,
              { type: "bot", message: response.data.data.message },
            ];
          });
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { type: "user", message: inputValue },
    ]);

    sendChat(inputValue);
    setInputValue("");
  };

  const containerStyle = {
    backgroundImage: `url('/chat_bg.png')`,
    height: "91vh", // Set the height as needed
    width: "100%",
  };

  return (
    <>
      <div className="flex  flex-col">
        <div className="flex justify-between p-3 bg-[#3D316F]">
          <h3 className="font-bold pt-3">Classmates</h3>
          <div className="flex space-x-8">
            <div className="flex-col ">
              <Image
                src={"/icons/Chat.png"}
                className="ml-3"
                height={24}
                width={24}
                alt={"af"}
              />
              <span className="text-[11px]">Feedback</span>
            </div>
            <div className="flex-col">
              <Image
                src={"/icons/Close.png"}
                height={23}
                width={23}
                alt={"af"}
              />
              <span className="text-[11px]">Exit</span>
            </div>
            <Image src={"/user_avatar.png"} height={41} width={45} alt={"af"} />
          </div>
        </div>

        <div className="flex flex-row bg-gray-100">
          <div
            className="w-[70%] px-2 space-y-2 h-screen overflow-hidden"
            style={containerStyle}
          >
          {begunLesson?(
            <div className="flex flex-col w-full">
              {isLoading && (
                <div className="relative left-[2rem] top-[2rem] -bottom-[38rem]">
                  <div className="bg-gray-300 rounded-lg p-4 text-white w-[4rem]">
                    <TypingAnimation />
                  </div>
                </div>
              )}

              {chatLog.length ? (
                <div className="flex-grow pl-6 pr-1 mt-5 fixed mb-20 h-[76%] w-[76%] overflow-y-scroll">
                  <div className="flex flex-col space-y-4 px-10  ">
                    {chatLog.map((message, index) => (
                      <div
                        key={index}
                        ref={
                          index === chatLog.length - 1 ? lastMessageRef : null
                        }
                      >
                        <ChatMessage message={message} />
                        {index < message.length - 1 && (
                          <Separator className="my-4 md:my-8" />
                        )}
                      </div>
                    ))}
                    {isLoading && (
                      <div className="relative left-[2rem] -top-[1rem] -bottom-[38rem]">
                        <div className="bg-gray-300 rounded-lg p-4 text-white w-[4rem]">
                          <TypingAnimation />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}

              <form
                onSubmit={handleSubmit}
                className="fixed bottom-1 w-[76%] flex-none p-6"
              >
                <div className="flex rounded-xl border">
                  <input
                    type="text"
                    className="flex-grow px-4 py-2 bg-white h-[72px] text-gray-600 focus:outline-none"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="rounded-lg px-4 py-2 bg-white "
                  >
                    <Image
                      src={"/icons/send.png"}
                      alt="heavy"
                      width={48}
                      height={48}
                    />
                  </button>
                </div>
              </form>
            </div>):(
              <button onClick={begin_lesson} className= " w-full mt-4 bg-blue-500 border rounded p-2 m-1 border-[#7160A8]">
              Begin Lesson
            </button>
            )}
          </div>
          <div className="w-[30%] h-full border-[1px] border-l-gray-300">
            <div className="p-3 flex-col flex space-y-4 text-[#7160A8]">
              <Image
                src={"/bot_avatar_lg.png"}
                height={282}
                width={379}
                alt="new"
              />
              <div className="bg-yellow-50 p-4 rounded-xl w-full">
                <span className="text-[16px] font-[600]">Try a Prompt</span>
                <div className="flex flex-wrap text-[12px] py-2 flex-row ">
                  <button className="bg-transparent border rounded p-2 m-1 border-[#7160A8]">
                    Repeat the question
                  </button>
                  <button className="bg-transparent border rounded p-2 m-1 border-[#7160A8]">
                    Solve with Modal
                  </button>
                  <button className="bg-transparent border rounded p-2 m-1 border-[#7160A8]">
                    Solve with Ratio
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
