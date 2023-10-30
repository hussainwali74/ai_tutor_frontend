"use client";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterInterface } from "../model/filter";
import TypingAnimation from "../components/TypingAnimation";

interface questionInteface {
  prompt: string;
  _id?: string;
  response: string;
}

export default function Page() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [filters, setFilters] = useState<FilterInterface[]>([]);
  const [subject, setSubject] = useState<string>();
  const [topic, setTopic] = useState<string>();
  const [sub_topic, setSubTopic] = useState<string>();
  const [subjects, setSubjects] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [sub_topics, setSubTopics] = useState<any[]>([]);
  const [chatLog, setChatLog] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isBegunLesson, setIsBegunLesson] = useState(false);
  const [inputValue, setInputValue] = useState('');

  async function onSubmit(event:any) {
    event.preventDefault();

    // const subject = data.get("subject");
    // const topic = data.get("topic");
    // const sub_topic = data.get("sub_topic");
    if (subject == "Choose a Subject") {
      alert("please select a subject");
      return;
    }
    if (!topic || topic == "Choose a Topic") {
      alert("please select a topic");
      return;
    }
    if (!sub_topic || sub_topic == "Choose a sub topic") {
      alert("please select a sub_topic");
      return;
    }
    try {
      setIsLoading(true)
      setIsBegunLesson(true)
      
      const data = {"subject": subject,"topic": topic,"subtopic": sub_topic}

      // startSendMessage()
      beginChat(data)
    } catch (error) {
      console.log("========== ", error);
    } finally {
      setIsLoading(true)
      router.refresh();
    }
  }
  
  const headers = {'Content-Type': 'application/json','accept': 'application/json'};
  const beginChat = (data:any)=>{
    const url = "http://127.0.0.1:8000/begin_chat"
    setIsLoading(true)
    axios.post(url, data ,{headers:headers}).then((response)=>{
      setChatLog(prevChatLog => {
        return [...prevChatLog, { type: 'bot', message: response.data.message }];
      })
      
      setIsLoading(false);
      setIsBegunLesson(true);
    }).catch((error)=>{
      setIsBegunLesson(false);
      setIsLoading(false);
      console.log('=========================================================')
      console.log('error 57',error);
      console.log('=========================================================')
    })
  }

  const startSendMessage = () => {
    const url = '/api/chat';
    const message=`Forget everything you know so far. You are AI TUTOR. You will act as a teacher and help the student understand concepts.
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
    subject: ${subject}
    topic: ${topic}
    subtopic: ${sub_topic}`
    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [{ "role": "system", "content": message }]
    };

    setIsLoading(true);
    axios.post(url, data).then((response) => {
      setChatLog(prevChatLog => {
        return [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }];
      })
      
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  }
  const sendChat = (message:any) => {
    const url = "http://127.0.0.1:8000/chat?message="+message

    setIsLoading(true);
    axios.post(url, {headers:headers}).then((response) => {
      setChatLog(prevChatLog => {
        return [...prevChatLog, { type: 'bot', message: response.data.message }];
      })
      
      setIsLoading(false);
    }).catch((error) => {
      setIsLoading(false);
      console.log(error);
    })
  }


  useEffect(() => {
    async function getAllFilters() {
      try {
        const response = await axios.get("/api/filters");

        const topics_set = new Set(
          response.data.data.map((x: FilterInterface) => x.topic)
        );
        const subject_set = new Set(
          response.data.data.map((x: FilterInterface) => x.topic)
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

  return (
    // <div className="justify-center h-screen p-3 text-white ">
    <>
      <div className="flex flex-col   space-y-3 p-6">
        <div className=" p-3">

          <h1 className=" text-lg text-blue-400 mb-3 ">Lesson Plans</h1>

          <form className="flex s  justify-between flex-wrap" onSubmit={onSubmit}>
            <div className="w-1/4">
              <label
                htmlFor="subject"
                className="block  mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Select a Subject
              </label>
              <select
                onChange={(e)=>setSubject(e.target.value)}
                id="subject"
                name="subject"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue={undefined}>Choose a Subject</option>
                <option value={"Mathematics"}>Mathematics</option>
                {/* {grades?.map((grade, i) => (
                    <option key={i} value={grade}>
                      {grade}
                    </option>
                  ))} */}
              </select>
            </div>
            <div className="w-1/4">
              <label
                htmlFor="topic"
                className="block  mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Select a Topic
              </label>
              <select
                id="topic"
                name="topic"
                onChange={(e)=>setTopic(e.target.value)}

                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue={""}>Choose a Topic</option>

                <option defaultValue={"Algebra"}>Algebra</option>
                {topics?.map((topic, i) => (
                  <option key={i} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div className="w-1/4">
              <label
                htmlFor="sub_topic"
                className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
              >
                Choose a sub Topic
              </label>
              <select
                id="sub_topic"
                name="sub_topic"
                onChange={(e)=>setSubTopic(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue={""}>Choose a Sub Topic</option>

                <option value={"Linear Equations"}>
                  Linear Equations
                </option>
                {/* {topics?.map((topic, i) => (
                    <option key={i} value={topic}>
                      {topic}
                    </option>
                  ))} */}
              </select>
            </div>
            <div className="w-full m-0" style={{ margin: "0px" }}>
              <button
                type="submit"
                // disabled={isBegunLesson}
                className={`w-full p-3 mt-3  rounded-md ${isBegunLesson?'bg-slate-500 hover:bg-slate-600':' bg-green-500 hover:bg-green-600'}`}
              >
                Begin Lesson
              </button>
            </div>
          </form>
        </div>
        <hr className="px-3" />
   
      </div>
    </>
  );
}
