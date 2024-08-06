import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import db from "./db/drizzle";

const protectedRoutes = createRouteMatcher([
  "/dashboard",
  "/learn",
  "/lesson",
  "/home",
  "/admin/(.*)*",
  "/manage_admin/(.*)*",
  "/course",
  "/post_signup",
  '/api/(.*)*',
]);

const publicRoutes = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up',
  '/buttons',
  '/',
  '/api/(.*)*',
]);

export default clerkMiddleware(async (auth, req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-custom-header', '1-nono');

  if (protectedRoutes(req)) {
    try {
      auth().protect();
      const { userId } = auth();
      requestHeaders.set('clerk_id', userId || '');

      // Check if it's an admin route
      if (req.nextUrl.pathname.startsWith('/admin')) {
        const currentUser = await auth();
        
        if (!currentUser) {
          return NextResponse.redirect(new URL('/sign-in', req.url).href);
        }

        // Fetch user role from the database
        const dbUser = await db.select().from(user).where(eq(user.clerk_id, currentUser.userId!)).limit(1);
        
        if (!dbUser || dbUser.length === 0 || (dbUser[0].role !== 'admin' && dbUser[0].role !== 'superadmin')) {
          return NextResponse.redirect(new URL('/', req.url).href);
        }
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error) {
      return NextResponse.redirect(new URL('/sign-in', req.url).href);
    }
  }

  if (publicRoutes(req)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
  return NextResponse.error()
  // return NextResponse.redirect(new URL('/sign-in', req.url).href);
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};