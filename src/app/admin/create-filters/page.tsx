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
  async function onSubmit(data: FormData) {
    console.log(data.get("sub_topic"));
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
      const payload = { subject, topic, sub_topic };

      const response = await axios.post("/api/filters", { payload });
      setFilters(response.data.data);
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
    async function getAllFilters() {
      try {
        const response = await axios.get("/api/filters");
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
      <div className="flex flex-col  p-4 pl-2 space-y-3 ">
        <h1 className=" text-lg text-blue-400 mb-3 ">Add Filters</h1>
        <div className="flex">
          <form className="flex flex-wrap  " action={onSubmit}>
            <div className="w-1/4 px-3 ">
              <label htmlFor="subject">subject</label>
              <input
                type="text"
                className="w-[100%] text-black bg-white h-10 p-3"
                name="subject"
                placeholder="enter subject e.g., First, Second "
                id="subject"
              />
            </div>
            <div className="w-1/4 px-3">
              <label htmlFor="topic">topic</label>
              <input
                type="text"
                className="w-[100%] text-black bg-white h-10 p-3"
                name="topic"
                placeholder="enter topic here"
                id="topic"
              />
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
                Add Filters
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="p-2 pr-4 overflow-y-auto">
        <table className="table-auto w-full border-collapse ali align-middle items-start border">
          <thead>
            <tr className="border ">
              <th className="border text-start px-2">Subject</th>
              <th className="border text-start px-2">Topic</th>
              <th className="border text-start px-2">Sub_topic</th>
              <th className="border text-start px-2">delete</th>
            </tr>
          </thead>
          <tbody>
            {filters?.map((filter: FilterInterface) => (
              <tr className=" px-2 text-start" key={filter._id}>
                <td className="border px-2">{filter.subject}</td>
                <td className="border px-2">{filter.topic}</td>
                <td className="border px-2">{filter.sub_topic}</td>
                <td className="border p-2">
                  <button
                    onClick={() => deleteFilter(filter._id)}
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
