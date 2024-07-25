import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Link from "next/link";
import React from "react";

function Header() {
  return (
    <header className=" lg:flex hidden  sm:px-4 lg:px-24 h-[156px] pt-4 pb-4  w-full border-b-2 border-slate-200 ">
      <div className="flex items-center justify-between w-full h-full ">
        <Logo />
        <div className="flex items-center h-full px-4 lg:px-6 justify-evenly">
          <nav className="flex gap-4 ml-auto sm:gap-6">
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Features
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Subjects
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Testimonials
            </Link>
            <Link
              href="#"
              className="text-sm font-medium hover:underline underline-offset-4"
              prefetch={false}
            >
              Pricing
            </Link>
          </nav>
        </div>
        <div className="flex items-center h-full">
          <ClerkLoading>
            <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
          </ClerkLoading>

          <SignedOut>
            <SignInButton
              mode="modal"
              fallbackRedirectUrl={
                process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL
              }
            >
              <Button variant={"secondaryOutline"} size={"md"}>
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSwitchSessionUrl="/" />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}

export default Header;
