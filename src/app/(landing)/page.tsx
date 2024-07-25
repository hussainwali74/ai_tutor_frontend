"use client";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import { BotIcon, Loader } from "lucide-react";
import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import MainFooterComponent from "./footer";

function Page() {
  return (
    <div className="flex flex-col w-full min-h-[100dvh] lg:mt-0 mt-24">
      <main className="flex-1">
        <section className="w-full py-12 md:py-4 lg:py-2 xl:py-2">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Personalized Learning with AI Tutor
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Unlock your full potential with our AI-powered tutoring
                    platform. Personalized lessons, interactive exercises,
                    real-time feedback and real-time progress tracking - the
                    ultimate solution for academic success.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                  </ClerkLoading>
                  <ClerkLoaded>
                    <SignedOut>
                      <SignUpButton
                        mode="modal"
                        fallbackRedirectUrl={
                          process.env
                            .NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
                        }
                      >
                        <Button
                          variant={"secondary"}
                          size={"md"}
                          className="w-full"
                        >
                          Get Started
                        </Button>
                      </SignUpButton>
                      <SignInButton
                        mode="modal"
                        fallbackRedirectUrl={
                          process.env
                            .NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL
                        }
                      >
                        <Button
                          variant={"primaryOutline"}
                          size={"md"}
                          className="w-full"
                        >
                          I already Have an account
                        </Button>
                      </SignInButton>
                    </SignedOut>
                    <SignedIn>
                      <Button
                        variant={"danger"}
                        className="w-full"
                        size={"lg"}
                        asChild
                      >
                        <Link href={"/learn"}>Continue Learning</Link>
                      </Button>
                    </SignedIn>
                  </ClerkLoaded>
                </div>
              </div>
              <div className="">
                <DotLottieReact
                  autoResizeCanvas={true}
                  src="animation/1_yellow.lottie"
                  width={4}
                  height={4}
                  loop
                  autoplay
                />
              </div>
              {/* <img
                src="/placeholder.svg"
                width="550"
                height="550"
                alt="AI Tutor"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
              /> */}
            </div>
          </div>
        </section>
        <section className="w-full py-6 md:py-12 lg:py-16 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl py-2">
                  Subjects Covered
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our AI Tutor covers a wide range of subjects to help you excel
                  in all areas of your education.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Math</h3>
                <p className="text-muted-foreground">
                  Algebra, Geometry, Calculus, and more.
                </p>
              </div>
              <div className="grid gap-1 lime">
                <h3 className="text-xl font-bold">Science</h3>
                <p className="text-muted-foreground">
                  Biology, Chemistry, Physics, and more.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Language Arts</h3>
                <p className="text-muted-foreground">
                  Reading, Writing, Grammar, and more.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">History</h3>
                <p className="text-muted-foreground">
                  World History, US History, and more.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Computer Science</h3>
                <p className="text-muted-foreground">
                  Programming, Algorithms, and more.
                </p>
              </div>
              <div className="grid gap-1">
                <h3 className="text-xl font-bold">Foreign Languages</h3>
                <p className="text-muted-foreground">
                  Spanish, French, Mandarin, and more.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Students Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from real students who have transformed their learning
                  with AI Tutor.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Card className="flex flex-col justify-between p-6 bg-muted rounded-lg shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/avatar/user1.jpg" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Jessica Doe
                      </p>
                      <p className="text-sm text-muted-foreground">
                        High School Student
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "AI Tutor has been a game-changer for me. The personalized
                    lessons and interactive exercises have helped me understand
                    complex topics in a way that traditional tutoring never
                    could."
                  </p>
                </div>
              </Card>
              <Card className="flex flex-col justify-between p-6 bg-muted rounded-lg shadow-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="/avatar/user2.jpg" />
                      <AvatarFallback>MJ</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        Michael Johnson
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Middle School Student
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground">
                    "I used to struggle with math, but AI Tutor has helped me
                    build a strong foundation and improve my skills. The
                    progress tracking feature keeps me motivated and on track."
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Take Your Learning to the Next Level
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Sign up for AI Tutor and start your personalized learning
                journey today.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1"
                />
                <Button type="submit">Get Started</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Sign up to start your free trial.{" "}
                <Link
                  href="#"
                  className="underline underline-offset-2"
                  prefetch={false}
                >
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <MainFooterComponent />
    </div>
  );
}

export default Page;
