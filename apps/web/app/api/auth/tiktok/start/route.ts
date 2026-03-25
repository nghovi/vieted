import crypto from "node:crypto";
import { NextResponse } from "next/server";
import {
  buildPublicUrl,
  buildTikTokAuthorizeUrl,
  getTikTokAuthConfig,
  getTikTokOauthStateCookieName,
} from "@/lib/auth";

export async function GET(request: Request) {
  const loginUrl = buildPublicUrl(request, "/login");

  if (!getTikTokAuthConfig()) {
    loginUrl.searchParams.set("socialError", "tiktok_config");
    return NextResponse.redirect(loginUrl);
  }

  const state = crypto.randomUUID();
  const authorizeUrl = buildTikTokAuthorizeUrl(state);

  if (!authorizeUrl) {
    loginUrl.searchParams.set("socialError", "tiktok_config");
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.redirect(authorizeUrl);

  response.cookies.set({
    name: getTikTokOauthStateCookieName(),
    value: state,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
  });

  return response;
}
