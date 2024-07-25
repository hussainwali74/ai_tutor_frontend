import { NextResponse } from "next/server";

// Your token validation function
const validateToken = (token) => {
  // Implement your token validation logic here
  // Return true if the token is valid, false otherwise
};

export default function middleware(req) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  // Check if the request is for a protected route
  if (req.nextUrl.pathname.startsWith('/api/')) {
    if (!token || !validateToken(token)) {
      return new Response('Unauthorized', { status: 401 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
