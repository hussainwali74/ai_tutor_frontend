"use client";
import { FilterInterface } from "@/app/models/interfaces";
import axios from "axios";
import { useEffect, useState } from "react";


export default function CreateFiltersPage() {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const data = {
        context: inputValue,
      };
      const response = await axios.post("/api/contexts", data);
      if (response.status == 200) {
        alert("context added successfully! ");
        setInputValue("");
      }
    } catch (error) {
      console.log("=========================================================");
      console.log("error in adding context", error);
      console.log("=========================================================");
    }
  };
  useEffect(() => {
    async function getAllFilters() {
      try {
        const response = await axios.get("/api/filters");
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

      } catch (error) {
        console.log("error 45", error);
        console.log(
          "========================================================="
        );
      }
    }
    getAllFilters();
  }, []);

  return (
    // <div className="justify-center h-screen p-3 text-white ">
    <>
      <div className="flex flex-col justify-center w-full p-4 pt-32 pl-12 space-y-3">
        <h1 className="mb-3 text-3xl text-blue-400 ">General Prompt</h1>
      </div>
      <div className="p-2 pr-4 overflow-y-auto">
        <form onSubmit={handleSubmit} className="flex-none w-10/12 p-6 ">
          <div className="flex flex-col w-full space-y-4 border border-gray-700 rounded-lg">
            <textarea
              id="message"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className=" h-80 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your Context..."
            ></textarea>

            <button
              type="submit"
              className="px-4 py-2 font-semibold text-white transition-colors duration-300 bg-purple-500 rounded-lg focus:outline-none hover:bg-purple-600"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
