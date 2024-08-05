"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubjectInterface, TopicInterface } from "../models/interfaces";
import { AdminSubjectsList } from "@/components/admin/subjects";
import { AdminTopicsList } from "@/components/admin/topics";

export default function CreateSubjectTopicPage() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<SubjectInterface>();
  const [subjects, setSubjects] = useState<SubjectInterface[]>([]);
  const [topics, setTopics] = useState<TopicInterface[]>([]);
  const [title, setTitle] = useState<string>();
  const [detail, setDetail] = useState<string>();

  async function onSubmit(data: FormData) {
    console.log(data.get("sub_topic"));
    const subject = data.get("subject");

    if (subject == "Subject Title is required") {
      alert("please select a subject");
      return;
    }

    try {
      const payload = { subject };

      const response = await axios.post("/api/admin/subject", { payload });
      setSubjects(response.data.data);
    } catch (error) {
      console.log("========== ", error);
    } finally {
      router.refresh();
    }
  }

  useEffect(() => {
    async function getAllSubjects() {
      try {
        const response = await axios.get("/api/admin/subject");
        if (response.data.data.length && Array.isArray(response.data.data)) {
          setSubjects(response.data.data);
        }
      } catch (error) {
        console.log("error 45", error);
        console.log("=========================================================");
      }
    }
    getAllSubjects();
    async function getAlltopics() {
      try {
        const response = await axios.get("/api/admin/topic");
        setTopics(response.data.data);
      } catch (error) {
        console.log("error 45", error);
        console.log("=========================================================");
      }
    }
    getAlltopics();
  }, []);
  async function addTopic() {
    if (!title) {
      alert("title is required!");
      return;
    }
    if (!selectedSubject) {
      alert("Subject is required!");
      return;
    }
    try {
      const payload: TopicInterface = {
        subject: selectedSubject.title,
        title: title,
        detail,
        subject_id: selectedSubject.id?.toString(),
      };

      const response = await axios.post("/api/admin/topic", { payload });
      setTopics(response.data.data);
    } catch (error) {
      console.log("========== ", error);
    } finally {
      router.refresh();
    }
  }

  return (
    <>
      <div className="flex flex-col h-full pb-2 overflow-y-scroll ">
        {/* <AdminSubjectsList onSubmit={onSubmit} deleteSubject={deleteSubject} subjects={subjects}/> */}
        <div className="flex flex-col justify-center w-full px-4 my-10 ">
          <h1 className="mb-3 text-lg text-blue-400 ">Add Topic</h1>
          <div className="flex flex-row flex-wrap items-center w-full ">
            <div className="w-full pr-2">
              <label htmlFor="subject">Subjects</label>
              <select
                id="subject"
                onChange={(e) => setSelectedSubject(subjects.find((j) => j.id == parseInt(e.target.value)))}
                name="subject"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-400
                    dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue={""}>Choose a Subject</option>
                {subjects?.map((subject, i) => (
                  <option key={i} value={subject.id}>
                    {subject.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="block w-2/4 px-2 ">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="flex-grow block w-full px-4 py-2 text-black bg-transparent dark:bg-gray-100 dark:border-gray-200 focus:ring-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="lesson title here"
                defaultValue={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="w-2/4 px-2 mt-5">
              <label htmlFor="detail">Detail</label>
              <textarea
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
              focus:border-blue-500 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400
               dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                placeholder="lesson detail here"
                value={detail}
                rows={4}
                onChange={(e) => setDetail(e.target.value)}
              ></textarea>
            </div>

            <div className="w-full px-3 pt-6">
              <button
                type="submit"
                onClick={() => addTopic()}
                className="w-full p-2 text-white rounded-md bg-slate-500 hover:bg-slate-600"
              >
                Add Topic
              </button>
            </div>
          </div>
        </div>

        {/* <AdminTopicsList topics={topics} deleteTopic={deleteTopic} /> */}
      </div>
    </>
  );
}
