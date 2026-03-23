import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  getSessionCookieName,
  getTikTokAuthConfig,
  getTikTokOauthStateCookieName,
  signInWithTikTokIdentity,
} from "@/lib/auth";

type TikTokTokenResponse = {
  access_token?: string;
  open_id?: string;
  error?: string;
  error_description?: string;
};

type TikTokUserInfoResponse = {
  data?: {
    user?: {
      open_id?: string;
      display_name?: string;
    };
  };
  error?: {
    code?: string;
    message?: string;
  };
};

async function exchangeCodeForAccessToken(code: string) {
  const config = getTikTokAuthConfig();

  if (!config) {
    throw new Error("TikTok auth is not configured.");
  }

  const response = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_key: config.clientKey,
      client_secret: config.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: config.redirectUri,
    }),
    cache: "no-store",
  });

  const payload = (await response.json()) as TikTokTokenResponse;

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error_description || payload.error || "Failed to exchange TikTok code.");
  }

  return payload;
}

async function fetchTikTokUser(accessToken: string) {
  const response = await fetch(
    "https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    },
  );

  const payload = (await response.json()) as TikTokUserInfoResponse;
  const user = payload.data?.user;

  if (!response.ok || !user?.open_id) {
    throw new Error(payload.error?.message || "Failed to load TikTok user profile.");
  }

  return user;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const loginUrl = new URL("/login", request.url);
  const homeUrl = new URL("/", request.url);
  const code = url.searchParams.get("code") ?? "";
  const state = url.searchParams.get("state") ?? "";
  const error = url.searchParams.get("error") ?? "";

  if (error) {
    loginUrl.searchParams.set("socialError", "tiktok_cancelled");
    return NextResponse.redirect(loginUrl);
  }

  const cookieStore = await cookies();
  const expectedState = cookieStore.get(getTikTokOauthStateCookieName())?.value ?? "";

  if (!code || !state || !expectedState || state !== expectedState) {
    loginUrl.searchParams.set("socialError", "tiktok_state");
    return NextResponse.redirect(loginUrl);
  }

  try {
    const token = await exchangeCodeForAccessToken(code);
    const user = await fetchTikTokUser(token.access_token!);
    const result = await signInWithTikTokIdentity({
      openId: user.open_id ?? token.open_id ?? "",
      displayName: user.display_name,
    });

    if (!result.ok) {
      loginUrl.searchParams.set("socialError", "tiktok_login");
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
      name: getTikTokOauthStateCookieName(),
      value: "",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    });

    return response;
  } catch (caughtError) {
    console.error("TikTok login callback failed.", caughtError);
    loginUrl.searchParams.set("socialError", "tiktok_callback");

    const response = NextResponse.redirect(loginUrl);
    response.cookies.set({
      name: getTikTokOauthStateCookieName(),
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
