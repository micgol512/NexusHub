// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = [
  "/",
  "/contact",
  "/product",
  /^\/product\/[^\/]+$/,
  "/login",
  "/register",
];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPublic = PUBLIC_PATHS.some((path) =>
    path instanceof RegExp ? path.test(pathname) : path === pathname
  );

  if (isPublic) {
    return NextResponse.next();
  }

  const token = await getToken({ req });

  if (!token) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
