"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { SubjectInterface } from "@/app/model/subject";
import { TopicInterface } from "@/app/model/topic";
import { AdminTopicsList } from "../components/admin/topics";
import { AdminSubjectsList } from "../components/admin/subjects";



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
        subject_id: selectedSubject._id,
      };

      const response = await axios.post("/api/admin/topic", { payload });
      setTopics(response.data.data);
    } catch (error) {
      console.log("========== ", error);
    } finally {
      router.refresh();
    }
  }
  async function deleteSubject(id: any) {

    try {
      const response = await axios.delete("/api/admin/subject", {
        params: { id },
      });
      if (response.status == 200) {
        setSubjects((prevData) => prevData.filter((d) => d._id != id));
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
  async function deleteTopic(id: any) {

    try {
      const response = await axios.delete("/api/admin/topic", {
        params: { id },
      });
      if (response.status == 200) {
        setTopics((prevData) => prevData.filter((d) => d._id != id));
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
      <div className="flex flex-col overflow-y-scroll pb-2 h-full ">
      <AdminSubjectsList onSubmit={onSubmit} deleteSubject={deleteSubject} subjects={subjects}/>
        <div className="flex flex-col justify-center  w-full  px-4 my-10 ">
          <h1 className=" text-lg text-blue-400 mb-3 ">Add Topic</h1>
          <div className="flex flex-row flex-wrap w-full items-center ">
            <div className="w-full  pr-2">
              <label htmlFor="subject">Subjects</label>
              <select
                id="subject"
                onChange={(e) =>
                  setSelectedSubject(
                    subjects.find((j) => j._id == e.target.value)
                  )
                }
                name="subject"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-100 dark:placeholder-gray-400
                    dark:text-black  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option defaultValue={""}>Choose a Subject</option>
                {subjects?.map((subject, i) => (
                  <option key={i} value={subject._id}>
                    {subject.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-2/4 px-2 block ">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="flex-grow px-4 block py-2 bg-transparent text-black w-full  dark:bg-gray-100 dark:border-gray-200 focus:ring-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className=" w-full p-2 rounded-md text-white bg-slate-500 hover:bg-slate-600"
              >
                Add Topic
              </button>
            </div>
          </div>
        </div>

        <AdminTopicsList topics={topics} deleteTopic={deleteTopic} />

      </div>
    </>
  );
}
