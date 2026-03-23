import { NextResponse } from "next/server";
import { requestPhoneOtp } from "@/lib/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    phoneNumber?: string;
    purpose?: string;
  };

  const result = await requestPhoneOtp({
    phoneNumber: body.phoneNumber ?? "",
    purpose: body.purpose ?? "",
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({
    message: result.message,
    expiresInSeconds: result.expiresInSeconds,
    otpPreview: result.otpPreview,
  });
}
