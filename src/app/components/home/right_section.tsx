import Image from "next/image";

export function HomeRightSectionComponent(){
    return (
        <div className="w-[30%] h-full border-[1px] border-l-gray-300">
        <div className="p-3 flex-col flex space-y-4 text-[#7160A8]">
          <Image src={"/bot_avatar_lg.png"} height={282} width={379} alt="new"
          />
          <div className="bg-yellow-50 p-4 rounded-xl w-full">
            <span className="text-[16px] font-[600]">Try a Prompt</span>
            <div className="flex flex-wrap text-[12px] py-2 flex-row ">
              <button className="bg-transparent border rounded p-2 m-1 border-[#7160A8]">
                Repeat the question
              </button>
              <button className="bg-transparent border rounded p-2 m-1 border-[#7160A8]">
                Solve with Modal
              </button>
              <button className="bg-transparent border rounded p-2 m-1 border-[#7160A8]">
                Solve with Ratio
              </button>
            </div>
          </div>
        </div>
      </div>
    )
}