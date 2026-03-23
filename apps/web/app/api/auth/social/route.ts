import { NextResponse } from "next/server";
import {
  getSessionCookieName,
  validateSocialAuth,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    mode?: "login" | "register";
    provider?: string;
    providerUserId?: string;
    email?: string;
    fullName?: string;
    grade?: number;
  };

  const result = await validateSocialAuth({
    mode: body.mode === "register" ? "register" : "login",
    provider: body.provider ?? "",
    providerUserId: body.providerUserId ?? "",
    email: body.email,
    fullName: body.fullName,
    grade: body.grade,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.message },
      { status: 400 },
    );
  }

  const response = NextResponse.json({
    isNewAccount: result.isNewAccount,
    student: result.student,
  });

  response.cookies.set({
    name: getSessionCookieName(),
    value: result.sessionToken,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
