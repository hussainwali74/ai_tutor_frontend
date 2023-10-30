"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string[]>([]);

  
  async function onSubmit(data:FormData) {
    try {
      const prompt:string=data.get('prompt') as string
      if(prompt && prompt.length){

        // const prompt:string = data.get('prompt')
        const response = await axios.post("/api/image", { prompt });
        console.log("=========================================================");
        console.log("response", response);
        console.log("response", response.data);
        console.log("=========================================================");
        setImageUrl((current) => [...current, response.data]);

        console.log('=========================================================')
        console.log('imageUrl',imageUrl);
        console.log('=========================================================')
      }else{
        alert('please provide prompt')
      }
    } catch (error) {
      console.log("========== ", error);
    } finally {
      router.refresh();
    }
  }

  return (
    <div className="flex flex-col   space-y-3 p-6">
      <div className=" p-3">
        <h1 className=" text-lg text-blue-400 mb-3 ">Create Images</h1>

        <form action={onSubmit}>
          <div className="space-y-2">
            <label htmlFor="prompt">Prompt</label>
            <input
              type="text"
              className="w-[100%] text-black bg-white h-10 p-3"
              name="prompt"
              id="prompt"
            />

            <button
              type="submit"
              className="w-full p-3 rounded-md bg-slate-500 hover:bg-slate-600"
            >
              Generate
            </button>
          </div>
        </form>
      </div>
      <hr className="px-3" />
      <div className="space-y-4  p-3 ">
        <div className="w-full  p-2 space-y-2 h-96 overflow-auto">
          {imageUrl?.map((image, i) => (
            <div
            key={i}
            className=" p-3 bg-gray border border-gray-200 rounded-lg shadow"
            >
              <img src={image} className="image w-full h-96" alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
