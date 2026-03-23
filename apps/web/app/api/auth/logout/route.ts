import { NextResponse } from "next/server";
import { getSessionCookieName, logoutServerSession } from "@/lib/auth";

export async function POST() {
  await logoutServerSession();

  const response = NextResponse.json({ ok: true });
  response.cookies.set({
    name: getSessionCookieName(),
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });

  return response;
}
