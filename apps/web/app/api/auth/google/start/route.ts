import crypto from "node:crypto";
import { NextResponse } from "next/server";
import {
  buildGoogleAuthorizeUrl,
  getGoogleAuthConfig,
  getGoogleOauthStateCookieName,
} from "@/lib/auth";

export async function GET(request: Request) {
  const loginUrl = new URL("/login", request.url);

  if (!getGoogleAuthConfig()) {
    loginUrl.searchParams.set("socialError", "google_config");
    return NextResponse.redirect(loginUrl);
  }

  const state = crypto.randomUUID();
  const authorizeUrl = buildGoogleAuthorizeUrl(state);

  if (!authorizeUrl) {
    loginUrl.searchParams.set("socialError", "google_config");
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set({
    name: getGoogleOauthStateCookieName(),
    value: state,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 10,
  });

  return response;
}
