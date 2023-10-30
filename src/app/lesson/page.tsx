"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterInterface } from "../model/filter";
import Modal from "../components/modal";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterInterface[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [sub_topics, setSubTopics] = useState<any[]>([]);
  const [chatLog, setChatLog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBegunLesson, setIsBegunLesson] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      router.refresh();
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
    const url = "http://127.0.0.1:8000/begin_chat";
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
    const url = "http://127.0.0.1:8000/chat?message=" + message;

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
  // const sendMessage = (message:any) => {
  //   const url = '/api/chat';

  //   const data = {
  //     model: "gpt-3.5-turbo-0301",
  //     messages: [{ "role": "user", "content": message }]
  //   };

  //   setIsLoading(true);
  //   axios.post(url, data).then((response) => {
  //     setChatLog(prevChatLog => {
  //       return [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }];
  //     })

  //     setIsLoading(false);
  //   }).catch((error) => {
  //     setIsLoading(false);
  //     console.log(error);
  //   })
  // }

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

  const bgContainerStyle = {
    backgroundImage: `url('/lessons_bg.png')`,
    backgroundSize: "cover",
    height: "68%", // Set the height as needed
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

          <div className="flex flex-wrap">
            <div className=" w-1/4 p-6 relative place-items-center object-center content-center items-center py-10 mt-10 flex flex-col bg-white border border-gray-200 rounded-lg  shadow-md ">
              <div className="absolute leading-6 -top-8 text-center  justify-center bg-[#FF9800] rounded-full h-16 w-16">
                <p className="text-white font-[400] text-[12px] pt-2 ">
                  Lesson
                </p>
                <p className="text-white font-[400] text-[26px]">1</p>
              </div>
              <p className="mb-3  text-gray-700  font-[400] text-[16px]">
                Introduction to the 4 operations with Algebra
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
                onClick={() => setIsModalOpen(true)}
                type={"button"}
                className="inline-flex w-full  justify-center  px-3 py-2 text-sm font-medium  rounded-2xl text-white bg-gradient-to-r from-[#FFCB17] to-[#FBB21A]  focus:ring-4 focus:outline-none focus:ring-blue-300 "
              >
                Start Lesson
              </button>
            </div>
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
                <span>
                  Are you sure
                  <ul>
                    <li>addtion that the quic</li>
                    <li>addtion that the quic</li>
                    <li>addtion that the quic</li>
                    <li>addtion that the quic</li>
                    <li>addtion that the quic</li>
                  </ul>
                </span>
                <div className="flex flex-col py-4 bg-full sm:flex-row justify-center gap-8  align-center">
                  {/* <button
              onClick={()=>setIsModalOpen(true)}
                type={"button"}
                > */}
                  <Link href={'/home'}
                    className="inline-flex w-full  justify-center  px-3 py-2 text-sm font-medium  rounded-2xl text-white bg-gradient-to-r from-[#FFCB17] to-[#FBB21A]  focus:ring-4 focus:outline-none focus:ring-blue-300 "
                  >
                    Proceed to Lesson
                  </Link >
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
