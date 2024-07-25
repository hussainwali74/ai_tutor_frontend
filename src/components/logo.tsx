import { Karla } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const karla = Karla({ subsets: ["latin"], weight: "500" });

function LogoComponent() {
  return (
    <div className="flex items-center sm:w-[125px] w-full ">
      <Link href={"/"} className="flex items-center  space-x-2 justify-center">
        <Image src={"/logo_orange.svg"} width={40} height={40} alt="logo" />
        <h3 className="text-xl pb-2 font-bold text-orange-400">AI Tutor</h3>
      </Link>
    </div>
  );
}

export default LogoComponent;

// text-[#FFAC00]