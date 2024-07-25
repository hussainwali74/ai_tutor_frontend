"use client";
import React from "react";
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
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Logo from "@/components/logo";
import LearnSidebarItemComponent from "./learn.sidebar_item.component";
type Props = {
  label?: string;
  href?: string;
  iconSrc?: string;
};
export default function ClassSidebarComponent({ label, href, iconSrc }: Props) {
  const path_name = usePathname();
  const active = path_name == href;
  return (
    <div className="flex flex-col items-start h-full gap-8 p-8 ">
      <div className="flex-4">
        <Logo />
      </div>
      <nav className="flex flex-col items-start justify-start flex-1 w-full gap-4 ">
      <LearnSidebarItemComponent label="Leaderboard" iconSrc="/icons/leaderboard.svg" href="/learn" />
        <Link
          href="#"
          className={`text-sm font-medium hover:shadow-md underline-offset-4 ${
            active ? "shadow-md" : "shadow-sm w-full p-3"
          }`}
          prefetch={false}
        >
          Leaderboard
        </Link>

        <Link
          href="#"
          className={`text-sm font-medium hover:shadow-md underline-offset-4 ${
            active ? "shadow-md" : "shadow-sm w-full p-3"
          }`}
          prefetch={false}
        >
          Shop
        </Link>
      </nav>
      <div className="flex items-center w-full pt-4 border-t-2 border-gray-100 border-solid flex-3 ">
        <ClerkLoading>
          <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
        </ClerkLoading>

        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
        <SignedIn>
          <div className="w-full p-2 shadow-md ">
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
