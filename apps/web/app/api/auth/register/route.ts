import { NextResponse } from "next/server";
import {
  getSessionCookieName,
  validateStudentRegistration,
} from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    phoneNumber?: string;
    password?: string;
    fullName?: string;
    grade?: number;
  };

  const result = await validateStudentRegistration({
    phoneNumber: body.phoneNumber ?? "",
    password: body.password ?? "",
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
