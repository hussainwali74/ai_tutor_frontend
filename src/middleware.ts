import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

const protectedRoutes = createRouteMatcher([
  "/dashboard",
  "/learn",
  "/home",
  "/course",
  "/post_signup",
  "/lesson",
]);

const publicRoutes = createRouteMatcher([
  '/sign-in',
  '/sign-up',
  '/buttons',
  '/',
  '/api/(.*)*',
  ]);

export default clerkMiddleware(async (auth, req:NextRequest) => {
  
  if (protectedRoutes(req)) {
    try {
      await auth().protect();
      return NextResponse.next()
    } catch (error) {
      return NextResponse.error(); // Return an unauthorized response
    }
  }
  if (publicRoutes(req)){
    return 
  }  
  return NextResponse.json({status:404, body:"not Found"})
  });

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
