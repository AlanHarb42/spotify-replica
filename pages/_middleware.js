import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Token exists if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl;

  // Allow request if following is true:
  if (pathname.includes("api/auth") || token) {
    return NextResponse.next();
  }

  // Redirect users to login if they dont have token & requesting a protected route:
  if (!token && pathname !== "/login") {
    return NextResponse.redirect("/login");
  }
}
