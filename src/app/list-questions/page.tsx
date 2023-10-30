"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { QuestionInterface, SingleQuestionInterface } from "../model/question";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FilterInterface } from "../model/filter";
function ListQuestions() {
  const [questions, setQuestions] = useState<SingleQuestionInterface[]>([]);
  const [allQuestions, setAllQuestions] = useState<SingleQuestionInterface[]>(
    []
  );
  const [grades, setGrades] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  const router = useRouter();

  const [image, setImage] = useState("null");
  const [createObjectURL, setCreateObjectURL] = useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpIZoIhMiEbb1g-RygYtru41OZRUjrtzD0IJqQvqYHnq6Ani_VGPnAXmtU0lR4XEbiafw&usqp=CAU"
  );

  const uploadToClient = async (event: any, id: string) => {
    // imag upload
    event.preventDefault();
    if (event.target.files && event.target.files[0] && id) {
      const i = event.target.files[0];
      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: (event: any) => {
          console.log(
            `Current progress:`,
            Math.round((event.loaded * 100) / event.total)
          );
        },
      };

      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("name", event.target.files[0].name);
      formData.append("id", id);
      formData.append("image", file);
      const response = await axios.put("/api/upload", formData, config);
    }
  };

  useEffect(() => {
    async function getAllFilters() {
      try {
        const response = await axios.get("/api/filters");

        const topics_set = new Set(
          response.data.data.map((x: FilterInterface) => x.topic)
        );
        const topics_: any[] = Array.from(topics_set);
        setTopics(topics_);
        const grades_set = new Set(
          response.data.data.map((x: FilterInterface) => x.topic)
        );
        const grades_: any[] = Array.from(grades_set);
        setGrades(grades_);

      } catch (error) {
        console.log("error getting filters 45", error);
      }
    }
    getAllFilters();
  }, []);

  useEffect(() => {
    async function getAllQuestions() {
      try {
        const response = await axios.get("/api/single_question");
        if (response.data?.data?.length) {
          setCreateObjectURL(response.data?.data[0]?.image_url);
          setQuestions(response.data.data);
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
    getAllQuestions();
  }, []);

  async function onSubmit(data: FormData) {
    console.log();
    const grade = data.get("grade");
    const topic = data.get("topic");
    const sub_topic = data.get("sub_topic");
    // if (grade == "Choose a Grade") {
    //   alert("please select a grade");
    //   return;
    // }
    // if (!topic && topic == "Choose a Topic") {
    //   alert("please select a topic");
    //   return;
    // }

    try {
      console.log("=========================================================");
      console.log("grade", grade);
      console.log("topic", topic);
      console.log("allQuestions", allQuestions);
      if (allQuestions.length && grade && topic) {
        const filtered_questions = allQuestions.filter(
          (q) => q.grade == grade && q.topic == topic
        );
        console.log(
          "========================================================="
        );
        console.log("filtered_questions", filtered_questions);
        console.log(
          "========================================================="
        );
        setQuestions(filtered_questions);
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
        <h1 className=" text-lg text-blue-400 mb-3 ">List of Questions</h1>
        <div className="flex">
          <form className="flex flex-wrap  " action={onSubmit}>
            <div className="w-1/4 px-3 ">
              <label htmlFor="grade">grade</label>
              <select
                  id="grade"
                  name="grade"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue={undefined}>Choose a Grade</option>
                  {grades?.map((grade, i) => (
                    <option key={i} value={grade}>
                      {grade}
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
              <label htmlFor="sub_topic">sub topic</label>
              <input
                type="text"
                className="w-[100%] text-black bg-white h-10 p-3"
                name="sub_topic"
                placeholder="enter subtopic here"
                id="sub_topic"
              />
            </div>
            <div className="w-1/4 px-3 pt-5">
              <button
                type="submit"
                className=" p-3 rounded-md bg-slate-500 hover:bg-slate-600"
              >
                 Filter Questions
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="p-2 pr-4 overflow-y-auto">
        <div className="p-2 pr-4 h-full space-y-3 flex flex-col relative overflow-y-auto">
          {questions?.map((question, i) => (
            <div key={i} className="p-3 flex flex-row  justify-between border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col w-2/3 justify-between h-auto my-2 space-y-4">
                <h3 className="mb-2 font-semibold tracking-tight  text-white dark:text-white">
                  {question.question}
                </h3>
                <h5>Correct Answer: {question.correct_answer}</h5>
                <h5>
                  Solution:{" "}
                  <p className="mb-3 font-normal text-gray-300 dark:text-gray-400">
                    {" "}
                    {question.solution}
                  </p>
                </h5>
                <h5>Grade: {question.grade}</h5>
                <h5>Topic: {question.topic}</h5>
              </div>

              <div className="w-1/3 flex flex-col  h-auto pl-8" id="leftdiv">
                <div className="splitdiv text-gray-700" id="rightdiv">
                  <img src={createObjectURL} alt="new" className=" h-3/4  w-full   " />
                </div>
                <h5 className="text-gray-600">Select Image</h5>
                <input
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => uploadToClient(e, question._id as string)}
                />
              </div>
            </div>
          ))}
          {!questions.length && (
            <h4>No Questions</h4>
          )}
        </div>
      </div>
    </>
  );
}

export default ListQuestions;
