"use client";
import {  useRouter } from "next/router";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterInterface } from "../model/filter";
import TypingAnimation from "../components/TypingAnimation";

import React from "react";

import ReactDom from "react-dom";
import Markdown from "react-markdown";
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
  const [lessonId, setLessonId] = useState<string|null>();
  const [lesson, setLesson] = useState<LessonInterface|null>();
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

    const url = process.env.BASE_URL_FRONTEND+"/api/admin/lesson";
    setIsLoading(true);
    axios
      .get(url, {  params: { id: params.get('id')} })
      .then((response) => {
        console.log('=========================================================')
        console.log('response',response);
        console.log('=========================================================')
        if (response.data.data){
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


  async function onSubmit(event: any) {
    event.preventDefault();
    console.log("=========================================================");
    console.log("topic", selectedTopic);
    console.log("=========================================================");
    // const subject = data.get("subject");
    // const topic = data.get("topic");
    // const sub_topic = data.get("sub_topic");
    if (selectedSubject == "Choose a Subject") {
      alert("please select a subject");
      return;
    }
    if (!selectedTopic || selectedTopic == "Choose a Topic") {
      alert("please select a selectedTopic");
      return;
    }
    if (!selectedSubTopic || selectedSubTopic == "Choose a sub selectedTopic") {
      alert("please select a sub_topic");
      return;
    }
    try {
      setIsLoading(true);
      setIsBegunLesson(true);

      const data = {
        subject: selectedSubject,
        topic: selectedTopic,
        subtopic: selectedSubTopic,
      };

      // startSendMessage()
      beginChat(data);
    } catch (error) {
      console.log("========== ", error);
    } finally {
      setIsLoading(true);
      // router.refresh();
    }
  }
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };
  useEffect(() => {
    // setChatLog(prevChatLog => {
    //   return [ { type: 'bot', message: "# Greeting and Introduction\n\nHello and welcome to your AI Tutor session on Linear Algebra! In this lesson, we will focus on Linear Equations, an important topic in Linear Algebra. Understanding linear equations is crucial as they form the foundation for solving systems of equations and can be used in various real-world applications. Let's dive in!\n\n# Topic Explanation: Linear Equations\n\nA linear equation is an equation of the form:\n\nax + by + cz + ... = d\n\nHere, x, y, z, and so on, represent the variables, and a, b, c, and so on, represent the coefficients. The variables may have different coefficients, but they are raised only to the first power (no exponents). The equation can have any number of variables.\n\nFor example, a simple linear equation in one variable (x) would be:\n\n2x + 3 = 7\n\nIn this case, the coefficient of x is 2, and the constant term is 3. Solving this equation involves finding the value of x that satisfies the equation.\n\n# Understanding Check\n\nNow that we have covered the basics of linear equations, let's make sure you understand the concept. Can you explain, in your own words, what a linear equation is? If you have any questions or need further clarification, please let me know before we proceed.\n\n# Testing Understanding: Question\n\n1. Solve the equation: 3x - 5 = 16\n\nTake your time to solve the equation. Once you have an answer, please let me know if you feel comfortable with solving linear equations.\n\n# Analysis and Feedback\n\nNow let's analyze the answer to question 1. The given equation is 3x - 5 = 16.\n\nSolution:\n```\n3x - 5 = 16\nAdd 5 to both sides:\n3x = 16 + 5 = 21\nDivide both sides by 3:\nx = 21/3 = 7\n```\n\nThe solution to the equation is x = 7.\n\nBased on your response, if you arrived at the correct answer, well done! You have a good understanding of solving linear equations. If you encountered any difficulties along the way or made any mistakes, don't worry! Solving linear equations takes practice, and we can work together to strengthen your skills.\n\nLet me know if you have any questions or need further clarification on the concept of solving linear equations.\n\n# Conclusion\n\nIn this lesson, we explored the concept of linear equations, which are fundamental to linear algebra. We learned that linear equations are equations in which the variables are raised only to the first power, and the coefficients determine the relationship between the variables. We also discussed solving linear equations by isolating the variable.\n\nI hope this lesson has helped you gain a better understanding of linear equations. If you have any more questions or would like to further explore this topic or any other topics in linear algebra, feel free to ask!" }];
    // })
  }, []);
  const beginChat = (data: any) => {
console.log('=========================================================')
console.log('begin chat data',data);
console.log('=========================================================')
    const url = process.env.BASE_URL+"/begin_chat";
    setIsLoading(true);
    axios
      .post(url, data, { headers: headers })
      .then((response) => {
        setChatLog((prevChatLog) => {
          return [
            ...prevChatLog,
            { type: "bot", message: response.data.message },
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
    const url = process.env.BASE_URL+"/chat?message=" + message;

    // const data = {messages:  message };
    console.log("=========================================================");
    console.log("message", message);
    console.log("=========================================================");
    setIsLoading(true);
    axios
      .post(url, { headers: headers })
      .then((response) => {
        console.log(
          "========================================================="
        );
        console.log("response", response);
        console.log(
          "========================================================="
        );
        setChatLog((prevChatLog) => {
          return [
            ...prevChatLog,
            { type: "bot", message: response.data.message },
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
        console.log("error getting filters 45", error);
      }
    }
    getAllFilters();
  }, []);
  // const changger  = async(message:any)=>{

  //   const content = await unified. unified()
  //     .use(parse)
  //     .use(remark2react)
  //     .processSync(message).result;
  // return content
  // }

  const containerStyle = {
    backgroundImage: `url('/chat_bg.png')`,
    height: "91vh", // Set the height as needed
    width: "100%",
  };

  return (
    // <div className="justify-center h-screen p-3 text-white ">
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
          <div className="w-[70%] px-2 space-y-2 h-screen overflow-auto"
            style={containerStyle}
          >
            <div className="flex flex-col w-full">
              {chatLog.length ? (
                <div className="flex-grow pl-6 pr-1 mt-5 fixed mb-20 h-[76%] w-[76%] overflow-y-auto  ">
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
                        key={chatLog.length}
                        className="relative left-[2rem] top-[2rem] -bottom-[38rem] "
                      >
                        <div className="bg-gray-300 rounded-lg p-4 text-white w-[4rem]">
                          <TypingAnimation />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ):null}
                      {/* <div
                        key={chatLog.length}
                        className="relative left-[2rem]  "
                      >
                        <div className="bg-gray-300 rounded-lg p-4 text-white w-[4rem]">
                          <TypingAnimation />
                        </div>
                      </div> */}
              <form
                onSubmit={handleSubmit}
                className=" fixed bottom-1  w-[76%]  flex-none p-6 "
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

            <Image src={'/bot_avatar_lg.png'} height={282} width={379} alt="new"/>
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
