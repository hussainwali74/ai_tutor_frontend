import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

export default function HomeHeaderComponent() {
  return (
    <div className="flex fixed top-0 w-full z-10 justify-between p-3 px-4 bg-[#3D316F] text-white">
      <h3 className="pt-3 font-bold">Classmates</h3>
      <div className="flex space-x-6">
        <div className="flex-col ">
          <Image src={"/icons/Chat.png"} className="ml-3" height={24} width={24} alt={"af"} />
          <span className="text-[11px]">Feedback</span>
        </div>
        <div className="flex-col">
          <Image src={"/icons/Close.png"} height={23} width={23} alt={"af"} />
          <span className="text-[11px]">Exit</span>
        </div>
        <div className="div">
          <UserButton
            appearance={{
              elements: {
                button: " ",
                avatarBox: "h-9 w-9 ",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
