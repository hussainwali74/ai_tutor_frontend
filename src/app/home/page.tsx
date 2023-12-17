"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterInterface } from "../model/filter";
import TypingAnimation from "../components/TypingAnimation";

import React from "react";

import { ChatMessage } from "../components/chat-message";
import { Separator } from "../components/ui/separator";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { LessonInterface } from "../model/lesson";

export default function Page() {
    // const router = useRouter();

    const [filters, setFilters] = useState<FilterInterface[]>([]);
    const [subjects, setSubjects] = useState<string[]>([]);
    const [topics, setTopics] = useState<any[]>([]);
    const [sub_topics, setSubTopics] = useState<any[]>([]);
    const [lessonId, setLessonId] = useState<string | null>();
    const [lesson, setLesson] = useState<LessonInterface | null>();
    const [chatLog, setChatLog] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isBegunLesson, setIsBegunLesson] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [selectedSubject, setSelectedSubject] = useState("");
    const [selectedTopic, setSelectedTopic] = useState("");
    const [selectedSubTopic, setSelectedSubTopic] = useState("");

    const params = useSearchParams()
    useEffect(() => {
        setLessonId(params.get('id'))
        setIsLoading(true);
        setIsBegunLesson(true);

        console.log('-----------------------------------------------------')
        console.log(`process.env.BASE_URL :>>`, process.env.BASE_URL)
        console.log('-----------------------------------------------------')

        const url = "/api/admin/lesson";
        setIsLoading(true);
        axios
            .get(url, { params: { id: params.get('id') } })
            .then((response) => {
                console.log('=========================================================')
                console.log('response use effect inint 53 home ', response);
                console.log('=========================================================')
                if (response.data.data) {
                    setLesson(response.data.data)
                    setIsLoading(false);
                    setIsBegunLesson(true);

                    const data = {
                        subject: response.data.data?.subject,
                        topic: response.data.data?.topic,
                        lesson_title: response.data.data?.title,
                        summary: response.data.data?.summary,
                        context: response.data.data?.context,
                    };

                    // startSendMessage()
                    beginChat(data);
                }
            })
            .catch((error) => {
                setIsBegunLesson(false);
                setIsLoading(false);
                console.log("error 57", error);
                console.log(
                    "========================================================="
                );
            });

    }, [params.get('id')]);


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
                console.log("error getting getAllFilters 45", error);
            }
        }
        getAllFilters();
    }, []);

    const headers = {
        "Content-Type": "application/json",
        accept: "application/json",
    };

    const beginChat = (data: any) => {
        const url = "api/admin/begin_chat";
        setIsLoading(true);
        axios
            .post(url, data, { headers: headers })
            .then((response) => {

                setChatLog((prevChatLog) => {
                    return [
                        ...prevChatLog,
                        { type: "bot", message: response.data.data.message },
                    ];
                });

                setIsLoading(false);
                setIsBegunLesson(true);
            })
            .catch((error) => {
                setIsBegunLesson(false);
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

    const startSendMessage = () => {
        const url = "/api/chat";
        const message = `Forget everything you know so far. You are AI TUTOR. You will act as a teacher and help the student understand concepts.
    0. Greet the student and tell him about the lesson you are about to teach him.
    1. You will explain the given Topic in detail, make it very easy to understand.
    2. Make sure the student has understood the concepts of the topics.
    3. Test the student's understanding by asking them relevant questions one by one.
    4. Analyze the answers by students to the question and provide feedback to the students wherever they are wrong.
    Instructions are provided for your better understanding of your goal.
    Instructions:
        - After each explaination ask the student if he has understood the concept
        - After each answer to a question ask the student if he has understood the concept
        - ask the questions one at a time 
    """
    agent_system_message+=f"""
    subject: ${selectedSubject}
    topic: ${selectedTopic}
    subtopic: ${selectedSubTopic}`;
        const data = {
            model: "gpt-3.5-turbo-0301",
            messages: [{ role: "system", content: message }],
        };

        setIsLoading(true);
        axios
            .post(url, data)
            .then((response) => {
                setChatLog((prevChatLog) => {
                    return [
                        ...prevChatLog,
                        { type: "bot", message: response.data.choices[0].message.content },
                    ];
                });

                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                console.log(error);
            });
    };

    const sendChat = (message: any) => {
        const url = "api/admin/chat?message=" + message;
        setIsLoading(true);
        axios
            .post(url, { headers: headers })
            .then((response) => {
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
        // sendMessage(inputValue);

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
                    <div className="w-[70%] px-2 space-y-2 h-screen overflow-hidden" style={containerStyle}>
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
                                            <div key={index}>
                                                <ChatMessage message={message} />
                                                {index < message.length - 1 && (
                                                    <Separator className="my-4 md:my-8" />
                                                )}
                                            </div>
                                        ))}
                                        {isLoading && (
                                            <div
                                                className="relative left-[2rem] -top-[1rem] -bottom-[38rem]"
                                            >
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
                        </div>
                    </div>
                    <div className="w-[30%] h-full border-[1px] border-l-gray-300">
                        <div className="p-3 flex-col flex space-y-4 text-[#7160A8]">

                            <Image src={'/bot_avatar_lg.png'} height={282} width={379} alt="new" />
                            <div className="bg-yellow-50 p-4 rounded-xl w-full">
                                <span className="text-[16px] font-[600]">Try a Prompt</span>
                                <div className="flex flex-wrap text-[12px] py-2 flex-row ">
                                    <button className="bg-transparent border rounded p-2 m-1 border-[#7160A8]">Repeat the question</button>
                                    <button className="bg-transparent border rounded p-2 m-1 border-[#7160A8]">Solve with Modal</button>
                                    <button className="bg-transparent border rounded p-2 m-1 border-[#7160A8]">Solve with Ratio</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
