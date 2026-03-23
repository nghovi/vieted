import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  getGoogleAuthConfig,
  getGoogleOauthStateCookieName,
  getSessionCookieName,
  signInWithGoogleIdentity,
} from "@/lib/auth";

type GoogleTokenResponse = {
  access_token?: string;
  error?: string;
  error_description?: string;
};

type GoogleUserInfoResponse = {
  sub?: string;
  email?: string;
  name?: string;
};

async function exchangeCodeForAccessToken(code: string) {
  const config = getGoogleAuthConfig();

  if (!config) {
    throw new Error("Google auth is not configured.");
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: config.redirectUri,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as GoogleTokenResponse;

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "Failed to exchange Google code.");
  }

  return payload.access_token;
}

async function fetchGoogleUser(accessToken: string) {
  const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  const payload = (await response.json()) as GoogleUserInfoResponse;

  if (!response.ok || !payload.sub || !payload.email) {
    throw new Error("Failed to load Google user profile.");
  }

  return payload;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const loginUrl = new URL("/login", request.url);
  const homeUrl = new URL("/", request.url);
  const code = url.searchParams.get("code") ?? "";
  const state = url.searchParams.get("state") ?? "";
  const error = url.searchParams.get("error") ?? "";

  if (error) {
    loginUrl.searchParams.set("socialError", "google_cancelled");
    return NextResponse.redirect(loginUrl);
  }

  const cookieStore = await cookies();
  const expectedState = cookieStore.get(getGoogleOauthStateCookieName())?.value ?? "";

  if (!code || !state || !expectedState || state !== expectedState) {
    loginUrl.searchParams.set("socialError", "google_state");
    return NextResponse.redirect(loginUrl);
  }

  try {
    const accessToken = await exchangeCodeForAccessToken(code);
    const user = await fetchGoogleUser(accessToken);
    const result = await signInWithGoogleIdentity({
      googleUserId: user.sub!,
      email: user.email!,
      fullName: user.name,
    });

    if (!result.ok) {
      loginUrl.searchParams.set("socialError", "google_login");
      return NextResponse.redirect(loginUrl);
    }

    const response = NextResponse.redirect(homeUrl);
    response.cookies.set({
      name: getSessionCookieName(),
      value: result.sessionToken,
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });
    response.cookies.set({
      name: getGoogleOauthStateCookieName(),
      value: "",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    });

    return response;
  } catch (errorCaught) {
    console.error("Google login callback failed.", errorCaught);
    loginUrl.searchParams.set("socialError", "google_callback");

    const response = NextResponse.redirect(loginUrl);
    response.cookies.set({
      name: getGoogleOauthStateCookieName(),
      value: "",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    });

    return response;
  }
}
