"use client";
import React from "react";
import Logo from "./logo";
import Link from "next/link";
import {
  ClerkLoading,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
type Props = {
  label?: string;
  href?: string;
  iconSrc?: string;
};
export default function SidebarComponent({ label, href, iconSrc }: Props) {
  const path_name = usePathname();
  const active = path_name == href;
  return (
    <div className="p-8  items-start flex flex-col gap-8  h-full ">
      <div className="flex-4">
        <Logo />
      </div>
      <nav className=" flex-1 gap-4 flex flex-col justify-start items-start w-full ">
        <Link
          href="#"
          className={`text-sm font-medium hover:shadow-md underline-offset-4 ${
            active ? "shadow-md" : "shadow-sm w-full p-3 "
          }`}
          prefetch={false}
        >
          Features
        </Link>
        <Link
          href="#"
          className={`text-sm font-medium hover:shadow-md underline-offset-4 ${
            active ? "shadow-md" : "shadow-sm w-full p-3"
          }`}
          prefetch={false}
        >
          Subjects
        </Link>
        <Link
          href="#"
          className={`text-sm font-medium hover:shadow-md underline-offset-4 ${
            active ? "shadow-md" : "shadow-sm w-full p-3"
          }`}
          prefetch={false}
        >
          Testimonials
        </Link>
        <Link
          href="#"
          className={`text-sm font-medium hover:shadow-md underline-offset-4 ${
            active ? "shadow-md" : "shadow-sm w-full p-3"
          }`}
          prefetch={false}
        >
          Pricing
        </Link>
      </nav>
      <div className="flex-3 items-center flex border-t-2  w-full border-solid border-gray-100 pt-4 ">
        <ClerkLoading>
          <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <div className=" shadow-md p-2 w-full">
            <UserButton afterSwitchSessionUrl="/" appearance={{
                elements:{
                    button:"w-[300px] items-center "
                }
            }} showName={true} />
          </div>
        </SignedIn>
      </div>
    </div>
  );
}
