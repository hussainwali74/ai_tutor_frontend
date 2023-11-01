"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { TopicInterface } from "@/app/model/topic";
import { SubjectInterface } from "@/app/model/subject";
import { LessonInterface } from "@/app/model/lesson";

export default function CreateLessonPage() {
  const router = useRouter();
  const [lessons, setLessons] = useState<LessonInterface[]>([]);
  const [subjects, setSubjects] = useState<SubjectInterface[]>([]);
  const [topics, setTopics] = useState<TopicInterface[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>();

  async function onSubmit(data: FormData) {
    console.log(data.get("sub_topic"));
    const subject = data.get("subject");
    const topic = data.get("topic");
    const title = data.get("title");
    const summary = data.get("summary");
    const context = data.get("context");

    if (!topic && topic == "Choose a Topic") {
      alert("please select a topic");
      return;
    }

    try {
      const payload = { subject, topic, title, summary, context };
      console.log('=========================================================')
      console.log('payload',payload);
      console.log('=========================================================')

      const response = await axios.post("/api/admin/lesson", { payload });
      setLessons(response.data.data);
      console.log("=========================================================");
      console.log("response", response);
      console.log("=========================================================");
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
        setSubjects(response.data.data);
      } catch (error) {
        console.log("error 45", error);
        console.log(
          "========================================================="
        );
      }
    }
    getAllSubjects();
    async function getAlltopics() {
      try {
        const response = await axios.get("/api/admin/topic");
        setTopics(response.data.data);
      } catch (error) {
        console.log("error 45", error);
        console.log(
          "========================================================="
        );
      }
    }
    getAlltopics();
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

  async function deleteFilter(id: any) {
    console.log("=========================================================");
    console.log("id", id);
    console.log("=========================================================");
    try {
      const response = await axios.delete("/api/admin/lesson", {
        params: { id },
      });
      if (response.status == 200) {
        setLessons((prevData) => prevData.filter((d) => d._id != id));
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
    <>
      <div className="flex flex-col  p-4 pl-2 space-y-3 ">
        <h1 className=" text-lg text-blue-400 mb-3 ">Create Lessons</h1>
        <div className="flex">
          <form className="flex flex-wrap  " action={onSubmit}>
            <div className="w-2/4 px-3 -mt-2 ">
              <label htmlFor="subject">Select Subject</label>
              <select
                id="subject"
                onChange={(e) => setSelectedTopic(e.target.value)}
                name="subject"
                className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue={""}>Choose a Subject</option>
                {subjects?.map((subject, i) => (
                  <option key={i} value={subject._id}>
                    {subject.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-2/4 px-3 -mt-2 ">
              <label htmlFor="topic -mt-2">Select Topic</label>
              <select
                id="topic"
                onChange={(e) => setSelectedTopic(e.target.value)}
                name="topic"
                className="bg-gray-50 border h-12 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue={""}>Choose a Topic</option>
                {topics?.map((topic, i) => (
                  <option key={i} value={topic._id}>
                    {topic.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full px-3 mt-2 ">
              <label htmlFor="subject">Title</label>
              <input
                type="text"
                className="w-[100%] text-black bg-white h-10 p-3"
                name="title"
                placeholder="enter title e.g., First, Second "
                id="title"
              />
            </div>
            <div className="w-full px-3 mt-4">
              <label htmlFor="summary">Summary</label>
              <textarea
                rows={4}
                className="block p-2.5 w-full text-sm
                bg-gray-50 rounded-lg border border-gray-300
                focus:ring-blue-500 focus:border-blue-500 "
                id="summary"
                name="summary"
                placeholder="enter Summary here"
              ></textarea>
            </div>
            <div className="w-full px-3 mt-4">
              <label htmlFor="context">Context</label>
              <textarea
                rows={4}
                className="block p-2.5 w-full text-sm
              bg-gray-50 rounded-lg border border-gray-300
              focus:ring-blue-500 focus:border-blue-500 "
                name="context"
                id="context"
                placeholder="enter context here"
              ></textarea>
            </div>

            <div className="w-full px-3 pt-5">
              <button
                type="submit"
                className=" w-full text-white font-bold p-3 rounded-md bg-slate-500 hover:bg-slate-600"
              >
                Add Lesson
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="p-2 pr-4 overflow-y-auto mt-10">
        <table className="table-auto w-full border-collapse ali align-middle items-start border">
          <thead>
            <tr className="border ">
              <th className="border text-start px-2">Subject</th>
              <th className="border text-start px-2">Topic</th>
              <th className="border text-start px-2">title</th>
              <th className="border text-start px-2">delete</th>
            </tr>
          </thead>
          <tbody>
            {lessons?.map((lesson: LessonInterface) => (
              <tr className=" px-2 text-start" key={lesson._id}>
                <td className="border px-2">{lesson.subject}</td>
                <td className="border px-2">{lesson.topic}</td>
                <td className="border px-2">{lesson.title}</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteFilter(lesson._id)}
                    className="hover:bg-orange-500  w-full hover:cursor-pointer  rounded-md  bg-orange-700 p-2"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
