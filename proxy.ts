import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const protectedPaths = ["/players/new", "/players"];
  const isProtected = protectedPaths.some(
    (path) =>
      pathname === path ||
      (pathname.startsWith("/players/") && pathname.endsWith("/edit"))
  );

  if (isProtected && !isLoggedIn) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/players/new", "/players/:id/edit"],
};
