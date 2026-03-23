import { NextResponse } from "next/server";
import { resetStudentPasswordWithOtp } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    phoneNumber?: string;
    otpCode?: string;
    password?: string;
    confirmPassword?: string;
  };

  const result = await resetStudentPasswordWithOtp({
    phoneNumber: body.phoneNumber ?? "",
    otpCode: body.otpCode ?? "",
    password: body.password ?? "",
    confirmPassword: body.confirmPassword ?? "",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ message: result.message });
}
