"use client";
import React, { FormEvent, useEffect, useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import {ContextInterface} from '../../model/context'
import {FilterInterface} from '../../model/filter'
function ListQuestions() {
  const [contexts, setContexts] = useState<ContextInterface[]>([]);
  const [allQuestions, setAllQuestions] = useState<ContextInterface[]>(
    []
  );
  const [subjects, setSubjects] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [sub_topics, setSubTopics] = useState<any[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function getAllFilters() {
      try {
        const response = await axios.get("/api/filters");

        const sub_topics_set = new Set(
          response.data.data.map((x: FilterInterface) => x.sub_topic)
        );
        const sub_topics_: any[] = Array.from(sub_topics_set);
        setSubTopics(sub_topics_);
        
        const topics_set = new Set(
          response.data.data.map((x: FilterInterface) => x.topic)
        );
        const topics_: any[] = Array.from(topics_set);
        setTopics(topics_);

        const subjects_set = new Set(
          response.data.data.map((x: FilterInterface) => x.subject)
        );
        const subjects_: any[] = Array.from(subjects_set);
        setSubjects(subjects_);

      } catch (error) {
        console.log("error getting filters 45", error);
      }
    }
    getAllFilters();
  }, []);

  useEffect(() => {
    async function getAllContexts() {
      try {
        const response = await axios.get("/api/contexts");
        if (response.data?.data?.length) {
          // setCreateObjectURL(response.data?.data[0]?.image_url);
          setContexts(response.data.data);
          setAllQuestions(response.data.data);
        }
      } catch (error) {
        console.log(
          "========================================================="
        );
        console.log("error 45", error);
        console.log(
          "========================================================="
        );
      }
    }
    getAllContexts();
  }, []);

  async function onSubmit(data: FormData) {
    console.log();
    const subject = data.get("subject");
    const topic = data.get("topic");
    const sub_topic = data.get("sub_topic");
    if (subject == "Choose a Subject") {
      alert("please select a subject");
      return;
    }
    if (!topic && topic == "Choose a Topic") {
      alert("please select a topic");
      return;
    }

    try {
      console.log("=========================================================");
      console.log("subject", subject);
      console.log("topic", topic);
      console.log("allQuestions", allQuestions);
      if (allQuestions.length && subject && topic) {
        const filtered_contexts = allQuestions.filter(
          (q) => q.subject == subject && q.topic == topic
        );
        console.log(
          "========================================================="
        );
        console.log("filtered_contexts", filtered_contexts);
        console.log(
          "========================================================="
        );
        setContexts(filtered_contexts);
      }

      console.log("=========================================================");
    } catch (error) {
      console.log("========== ", error);
    } finally {
      router.refresh();
    }
  }

  return (
    // <div className="justify-center h-screen p-3 text-white ">
    <>
      <div className="flex flex-col  p-4 pl-2 space-y-3 ">
        <h1 className=" text-lg text-blue-400 mb-3 ">List of Contexts</h1>
        <div className="flex">
          <form className="flex flex-wrap  " action={onSubmit}>
            <div className="w-1/4 px-3 ">
              <label htmlFor="subject">Subjects</label>
              <select
                  id="subject"
                  name="subject"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue={undefined}>Choose a Subject</option>
                  {subjects?.map((subject, i) => (
                    <option key={i} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
            </div>
            <div className="w-1/4 px-3">
              <label htmlFor="topic">topic</label>
              <select
                  id="topic"
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

            <div className="w-1/4 px-3 pt-5">
              <button
                type="submit"
                className=" p-3 rounded-md bg-slate-500 hover:bg-slate-600"
              >
                 Filter Contexts
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="p-2 pr-4 overflow-y-auto">
        <div className="p-2 pr-4 h-full space-y-3 flex flex-col relative overflow-y-auto">
          {contexts?.map((context, i) => (
            <div key={i} className="p-3 flex flex-row  justify-between border border-gray-200 rounded-lg shadow dark:bg-gray-600 dark:border-gray-700">

                <p className="mb-2 font-semibold tracking-tight  text-white dark:text-white">
                  {context.context}
                </p>          
            </div>
          ))}
          {!contexts.length && (
            <h4>No Contexts yet</h4>
          )}
        </div>
      </div>
    </>
  );
}

export default ListQuestions;
