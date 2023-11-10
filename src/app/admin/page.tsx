"use client";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import { useEffect, useState } from "react";
import { LessonInterface } from "@/app/model/lesson";
import { SubjectInterface } from "@/app/model/subject";
import { TopicInterface } from "@/app/model/topic";

interface questionInteface {
    prompt: string;
    _id?: string;
    response: string;
}

export default function CreateSubjectTopicPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<questionInteface[]>([]);
    const [selectedSubject, setSelectedSubject] = useState<SubjectInterface>();
    const [selectedLessonId, setSelectedLessonId] = useState("");
    const [subjects, setSubjects] = useState<SubjectInterface[]>([]);
    const [lessons, setLessons] = useState<LessonInterface[]>([]);
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
            alert('title is required!'); return
        }
        if (!selectedSubject) { alert('Subject is required!'); return; }
        try {
            const payload: TopicInterface = { subject: selectedSubject.title, title: title, detail, subject_id: selectedSubject._id };

            const response = await axios.post("/api/admin/topic", { payload });
            console.log('=========================================================')
            console.log('response', response);
            console.log('=========================================================')
            setTopics(response.data.data);
        } catch (error) {
            console.log("========== ", error);
        } finally {
            router.refresh();
        }

    }
    async function deleteSubject(id: any) {
        console.log("=========================================================");
        console.log("id", id);
        console.log("=========================================================");
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
        console.log("=========================================================");
        console.log("id", id);
        console.log("=========================================================");
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
                <div className="flex flex-col  p-4 pl-2 space-y-3  ">
                    <h1 className=" text-lg text-blue-400 mb-3 ">Create Subject </h1>
                    <form className="flex flex-wrap  " action={onSubmit}>
                        <div className="w-3/4 px-3 ">
                            <label htmlFor="subject">Add New Subject</label>
                            <input
                                type="text"
                                className="w-[100%] text-black bg-white h-10 p-3"
                                name="subject"
                                placeholder="enter subject e.g., Maths, English "
                                id="subject"
                            />
                        </div>

                        <div className="w-1/4 px-3 pt-6">
                            <button
                                type="submit"
                                className=" p-2 rounded-md bg-slate-500 hover:bg-slate-600"
                            >
                                Add Subject
                            </button>
                        </div>
                    </form>
                </div>
                <div className="p-2 pr-4  bg-slate-50 ml-5 h-[450rem] overflow-auto  w-[97%] ">
                    <h3 className="py-3 pl-2 font-extrabold text-lg w-full ">Subjects</h3>
                    <table className="table-auto w-full border-collapse   items-start border">
                        <thead>
                            <tr className="border ">
                                <th className="border text-start px-2 w-1/3">Subject</th>
                                <th className="border text-start px-2 w-1/3">delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.length ? subjects?.map((subject: SubjectInterface) => (
                                <tr className=" px-2 text-start" key={subject._id}>
                                    <td className="border px-2">{subject.title}</td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => deleteSubject(subject._id)}
                                            className="hover:bg-orange-500  w-full hover:cursor-pointer  rounded-md  bg-orange-700 p-2"
                                        >
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (null)}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col justify-center  w-full  px-4 my-10 ">
                    <h1 className=" text-lg text-blue-400 mb-3 ">Add Topic</h1>
                    <div className="flex flex-row flex-wrap w-full items-center ">
                        <div className="w-full  pr-2">
                            <label htmlFor="subject">Subjects</label>
                            <select
                                id="subject"
                                onChange={(e) => setSelectedSubject(subjects.find((j) => j._id == e.target.value))}
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

                <div className="p-2 pr-4 overflow-y-auto bg-slate-50 ml-5 w-[97%] h-[440rem]">
                    <h3 className="py-3 pl-2 font-extrabold text-lg w-full ">Topics</h3>
                    <table className="table-auto w-full border-collapse  items-start border">
                        <thead>
                            <tr className="border ">
                                <th className="border text-start px-2 w-1/3">Subject</th>
                                <th className="border text-start px-2 w-1/3">Topic</th>
                                <th className="border text-start px-2 w-1/3">delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {topics.length ? topics?.map((topic: TopicInterface) => (
                                <tr className=" px-2 text-start" key={topic._id}>
                                    <td className="border px-2">{topic.subject_id}</td>
                                    <td className="border px-2">{topic.title}</td>
                                    <td className="border p-2">
                                        <button
                                            onClick={() => deleteTopic(topic._id)}
                                            className="hover:bg-orange-500  w-full hover:cursor-pointer  rounded-md  bg-orange-700 p-2"
                                        >
                                            delete
                                        </button>
                                    </td>
                                </tr>
                            )) : (null)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
