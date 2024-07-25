"use client";
import React from "react";
import { BarChart3, LogOut, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useClerk, useUser } from "@clerk/nextjs";

export default function LearnHeaderComponent() {

  const { signOut } = useClerk();
  const user = useUser();

  return (
    <header className="lg:mx-auto justify-between  lg:p-10 p-4 items-start flex w-full h-[150px] ">
      {user ? (
        <div className="flex space-x-4 text-xl ">
          <Image
            src={user?.user?.imageUrl || "/user_avatar.png"}
            className="h-full rounded-full "
            width={60}
            height={40}
            alt="user"
          />
          <div className="flex flex-col w-full text-white">
            <h3 className="">Welcome Back</h3>
            <h2 className="font-bold">{`${user?.user?.firstName||''} ${user?.user?.lastName||''}`}</h2>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="flex space-x-4 text-xl ">
        <div className="flex flex-col w-full text-white">
          <h2 className="font-extrabold">Classmates</h2>
        </div>
      </div>
      <div className="hidden space-x-4 text-sm font-light lg:flex">
        <div className="flex w-full space-x-3 text-white">
          <Link
            href={"#"}
            className="flex flex-col items-center hover:text-gray-100"
          >
            <BarChart3 size={18} />
            <p>Performance</p>
          </Link>
          <Link
            href={"#"}
            className="flex flex-col items-center hover:text-gray-100"
          >
            <User size={18} />
            <p>Account</p>
          </Link>
          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="flex flex-col items-center hover:text-gray-100"
          >
            <LogOut size={18} />
            <p>Logout</p>
          </button>
        </div>
      </div>
    </header>
  );
}
