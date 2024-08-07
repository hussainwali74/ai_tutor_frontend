"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { getAudio, playAudio } from "@/lib/audio_utils";
import TypingAnimation from "@/components/TypingAnimation";
import { ChatMessage } from "@/components/chat-message";
import { Separator } from "@radix-ui/react-separator";
import { HomeFormComponent } from "@/components/home/form";
import { HomeRightSectionComponent } from "@/components/home/right_section";
import HomeHeaderComponent from "./home.header.component";
import { useAuth } from "@clerk/nextjs";
import { getStudentByClerkId } from "@/db/queries/student.queries";
import { getLessonById } from "@/db/queries/lesson.queries";
import { getChatByClerkIdAction } from "../../../actions/lesson.server_actions";

interface AudioQueueItem {
  audio_path: string;
  chunk: string;
}

interface ChatLogItem {
  role: "user" | "assistant" | "system";
  content: string;
}

// Update this interface to match the actual structure of your lesson data
interface LessonInterface {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
  title: string;
  imageSrc: string | null;
  subject: string | null;
  summary: string | null;
  topic: string | null;
  context: string | null;
  topic_id: number | null;
}

export default function Page() {
  const [audioQueue, setAudioQueue] = useState<AudioQueueItem[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [chatLog, setChatLog] = useState<ChatLogItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [audioLessonEnabled, setAudioLessonEnabled] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const params = useSearchParams();

  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatLog]);

  const auth = useAuth();
  useEffect(() => {
    const beginLesson = async () => {
      let adjustedChats: ChatLogItem[] = [];
      setIsLoading(true);
      const id = params.get("id");
      if (id) {
        try {
          let lessonData: LessonInterface | null = JSON.parse(localStorage.getItem("lesson_data") || "null");
          const student_data = await getStudentByClerkId(auth?.userId!);
          if (student_data) {
            // let convo = (await getChatByStudentId(student_data[0].student.id, parseInt(id), )) || [];
            let convo: any[] = (await getChatByClerkIdAction(auth.userId!, parseInt(id))) || [];
            if (convo) {
              adjustedChats = convo
                .map((chat, i) => {
                  if (i > 0) {
                    return {
                      role: chat.chat?.role as "user" | "assistant" | "system",
                      content: chat.chat?.content ?? "",
                    };
                  }
                })
                .filter((chat): chat is ChatLogItem => chat !== undefined); // Filter out undefined values
              if (adjustedChats) {
                setChatLog(adjustedChats);
              }
            }
          }
          if (!lessonData) {
            const fetchedLesson = await getLessonById(parseInt(id));
            if (fetchedLesson) {
              lessonData = fetchedLesson;
              localStorage.setItem("lesson_data", JSON.stringify(lessonData));
            }
          }

          if (lessonData && !chatLog.length && !adjustedChats.length) {
            const { createdAt, updatedAt, deletedAt, ...cleanLessonData } = lessonData;
            await sendChat(null, JSON.stringify(cleanLessonData));
          }
        } catch (error) {
          console.error("Error fetching lesson data:", error);
          // Handle the error appropriately
        }
      }
      setIsLoading(false);
    };
    beginLesson();
  }, []);

  const sendChat = useCallback(
    async (message?: string | null, lessonData?: string) => {
      setIsLoading(true);
      try {
        const body = { message, lesson_id: params.get("id"), lesson_data: lessonData };
        const res = await axios.post("api/chat", body, { headers });
        if (res?.data) {
          await handleAudio(res.data);
        }
      } catch (error) {
        console.error("Chat error:", error);
        // Handle the error appropriately, perhaps by showing an error message to the user
      } finally {
        setIsLoading(false);
      }
    },
    [params]
  );

  const handleAudio = useCallback(
    async (text: string) => {
      if (audioLessonEnabled) {
        const sentences = text.split(/(?<=[.!?])\s+/);
        for (let i = 0; i < sentences.length; i += 2) {
          const chunk = sentences.slice(i, i + 2).join(" ");
          if (chunk) {
            const audio_path = (await getAudio(chunk)) || "";
            setAudioQueue((prevQueue) => [...prevQueue, { chunk, audio_path }]);
          }
        }
      }
      setChatLog((prev) => [...prev, { role: "assistant", content: text }]);
    },
    [audioLessonEnabled]
  );

  useEffect(() => {
    const playNextAudio = async () => {
      if (audioQueue.length > 0 && !isAudioPlaying) {
        setIsAudioPlaying(true);
        const nextAudio = audioQueue[0];
        await playAudio(nextAudio.audio_path);
        setAudioQueue((prevQueue) => prevQueue.slice(1));
        setIsAudioPlaying(false);
      }
    };
    playNextAudio();
  }, [audioQueue, isAudioPlaying]);

  const handleAudioLesson = useCallback(() => {
    setAudioLessonEnabled((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(() => {
    if (inputValue.trim()) {
      setChatLog((prevChatLog) => [...prevChatLog, { role: "user", content: inputValue }]);
      sendChat(inputValue);
      setInputValue("");
    }
  }, [inputValue, sendChat]);

  return (
    <div className="flex flex-col">
      <HomeHeaderComponent />
      <div className="flex flex-row mt-16 bg-gray-100">
        <div
          className="w-full h-screen px-2 space-y-2 overflow-hidden lg:mt-[6px] lg:w-3/4"
          style={{
            backgroundImage: `url('/chat_bg.png')`,
            height: "100vh",
            width: "100%",
          }}
        >
          <div className="flex flex-col w-full h-full pt-2 space-y-2 ">
            {isLoading && !chatLog.length ? (
              <div className="relative left-[2rem] top-[2rem] -bottom-[38rem]">
                <div className="bg-gray-300 rounded-lg p-4 text-white w-[4rem]">
                  <TypingAnimation />
                </div>
              </div>
            ) : chatLog.length ? (
              <div className="flex-grow  lg:pl-6 lg:pr-1 px-0  lg:mb-20 lg:h-[78%] h-[50%]  w-full ">
                <div className="flex flex-col h-[43rem] lg:h-[46rem] px-0 space-y-4 pt-2 overflow-scroll lg:px-12 overflow-x-hidden">
                  {chatLog.map((message, index) => (
                    <div key={index} ref={index === chatLog.length - 1 ? lastMessageRef : null}>
                      <ChatMessage message={message} />
                      {index < chatLog.length - 1 && <Separator className="my-4 md:my-8" />}
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
            <div className="flex h-[8%] bottom-2 fixed z-10 lg:w-full">
              <HomeFormComponent
                audioLessonEnabled={audioLessonEnabled}
                disabled={isLoading}
                handleSubmit={handleSubmit}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
              <div className="w-full h-12 lg:hidden">
              <HomeRightSectionComponent
            speaking={isAudioPlaying}
            audioLessonEnabled={audioLessonEnabled}
            onDisableSpeech={handleAudioLesson}
          />

              </div>
            </div>
          </div>
        </div>
        <div className="hidden lg:w-1/4 lg:flex bg-orange-50">
          <HomeRightSectionComponent
            speaking={isAudioPlaying}
            audioLessonEnabled={audioLessonEnabled}
            onDisableSpeech={handleAudioLesson}
          />
        </div>
      </div>
    </div>
  );
}
