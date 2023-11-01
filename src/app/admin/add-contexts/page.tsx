"use client";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterInterface } from "../../model/filter";

interface questionInteface {
  prompt: string;
  _id?: string;
  response: string;
}

export default function CreateFiltersPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<FilterInterface[]>([]);
  const [questions, setQuestions] = useState<questionInteface[]>([]);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [sub_topics, setSubTopics] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedSubTopic, setSelectedSubTopic] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (selectedSubject == "Choose a Subject" || selectedSubject == "") {
      alert("please select a subject");
      return;
    }
    if (!selectedTopic || selectedTopic == "Choose a Topic") {
      alert("please select a topic");
      return;
    }
    if (!selectedSubTopic || selectedSubTopic == "Choose a Sub Topic") {
      alert("please select a topic");
      return;
    }
    try {
      
      const data = {
        context: inputValue,
        subject: selectedSubject,
        topic: selectedTopic,
        sub_topic: selectedSubTopic,
      };
      const response = await axios.post("/api/contexts", data);
      if (response.status==200){
        alert('context added successfully! ')
        setInputValue('')
      }
    } catch (error) {
      console.log('=========================================================')
      console.log('error in adding context',error);
      console.log('=========================================================')
    }
    // setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    // sendChat(inputValue)
    // sendMessage(inputValue);

    // setInputValue("");
  };
  useEffect(() => {
    async function getAllFilters() {
      try {
        const response = await axios.get("/api/filters");
        console.log(
          "========================================================="
        );
        console.log("response.data.data", response.data.data);
        console.log(
          "========================================================="
        );
        const data: FilterInterface[] = response.data.data;
        var subs: string[] = [];
        var tops = [];
        var sub_tops = [];
        for (let d in data) {
          const item = data[d];
          subs.push(item.subject);
          tops.push(item.topic);
          sub_tops.push(item.sub_topic);
        }

        // setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

        setSubjects(subs);
        setTopics(tops);
        setSubTopics(sub_tops);
        setFilters(response.data.data);
      } catch (error) {
        console.log("error 45", error);
        console.log(
          "========================================================="
        );
      }
    }
    getAllFilters();
  }, []);

  async function deleteFilter(id: any) {
    console.log("=========================================================");
    console.log("id", id);
    console.log("=========================================================");
    try {
      const response = await axios.delete("/api/filters", {
        params: { id },
      });
      if (response.status == 200) {
        setFilters((prevData) => prevData.filter((d) => d._id != id));
      }
      console.log(
        "=========================================================",
        response
      );
    } catch (error) {
      console.log("=========================================================");
      console.log("error 85", error);
      console.log("=========================================================");
    } finally {
    }
  }
  return (
    // <div className="justify-center h-screen p-3 text-white ">
    <>
      <div className="flex flex-col justify-center  w-full  p-4 pl-12 space-y-3  pt-32">
        <h1 className=" text-lg text-blue-400 mb-3 ">Add Context</h1>
        <div className="flex flex-wrap w-full items-center">
          <div className="w-1/4 px-3 ">
            <label htmlFor="subject">Subjects</label>
            <select
              id="subject"
              onChange={(e) => setSelectedSubject(e.target.value)}
              name="subject"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={""}>Choose a Subject</option>
              {subjects?.map((subject, i) => (
                <option key={i} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/4 px-3">
            <label htmlFor="topic">Topics</label>
            <select
              id="topic"
              onChange={(e) => setSelectedTopic(e.target.value)}
              name="topic"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={""}>Choose a Topic</option>
              {topics?.map((topic, i) => (
                <option key={i} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>
          <div className="w-1/4 px-3">
            <label htmlFor="sub_topic">Sub Topics</label>
            <select
              id="sub_topic"
              onChange={(e) => setSelectedSubTopic(e.target.value)}
              name="sub_topic"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option defaultValue={""}>Choose a Sub Topic</option>
              {sub_topics?.map((sub_topic, i) => (
                <option key={i} value={sub_topic}>
                  {sub_topic}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="p-2 pr-4 overflow-y-auto">
        <form onSubmit={handleSubmit} className="  w-10/12  flex-none p-6 ">
          <div className="flex flex-col w-full space-y-4 rounded-lg border border-gray-700">
            <textarea
              id="message"
              defaultValue={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className=" h-80 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your Context..."
            ></textarea>

            {/* <input
                      type="text"
                      className="flex-grow px-4 h-80 py-2 bg-transparent text-white focus:outline-none"
                      placeholder="Type your message..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                    /> */}
            <button
              type="submit"
              className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
