import { NextResponse } from "next/server";
import {
  getSessionCookieName,
  validateStudentLogin,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    phoneNumber?: string;
    password?: string;
  };

  const result = await validateStudentLogin(
    body.phoneNumber ?? "",
    body.password ?? "",
  );

  if (!result.ok) {
    return NextResponse.json(
      { error: result.message },
      { status: 401 },
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
