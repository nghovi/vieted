import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  buildPublicUrl,
  getFacebookAuthConfig,
  getFacebookOauthStateCookieName,
  getSessionCookieName,
  signInWithFacebookIdentity,
} from "@/lib/auth";

type FacebookTokenResponse = {
  access_token?: string;
  error?: {
    message?: string;
  };
};

type FacebookUserResponse = {
  id?: string;
  name?: string;
  email?: string;
  error?: {
    message?: string;
  };
};

async function exchangeCodeForAccessToken(code: string) {
  const config = getFacebookAuthConfig();

  if (!config) {
    throw new Error("Facebook auth is not configured.");
  }

  const params = new URLSearchParams({
    client_id: config.appId,
    client_secret: config.appSecret,
    redirect_uri: config.redirectUri,
    code,
  });
  const response = await fetch(`https://graph.facebook.com/v21.0/oauth/access_token?${params}`, {
    cache: "no-store",
  });
  const payload = (await response.json()) as FacebookTokenResponse;

  if (!response.ok || !payload.access_token) {
    throw new Error(payload.error?.message || "Failed to exchange Facebook code.");
  }

  return payload.access_token;
}

async function fetchFacebookUser(accessToken: string) {
  const params = new URLSearchParams({
    fields: "id,name,email",
    access_token: accessToken,
  });
  const response = await fetch(`https://graph.facebook.com/me?${params}`, {
    cache: "no-store",
  });
  const payload = (await response.json()) as FacebookUserResponse;

  if (!response.ok || !payload.id) {
    throw new Error(payload.error?.message || "Failed to load Facebook user profile.");
  }

  return payload;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const loginUrl = buildPublicUrl(request, "/login");
  const homeUrl = buildPublicUrl(request, "/");
  const code = url.searchParams.get("code") ?? "";
  const state = url.searchParams.get("state") ?? "";
  const error = url.searchParams.get("error") ?? "";

  if (error) {
    loginUrl.searchParams.set("socialError", "facebook_cancelled");
    return NextResponse.redirect(loginUrl);
  }

  const cookieStore = await cookies();
  const expectedState = cookieStore.get(getFacebookOauthStateCookieName())?.value ?? "";

  if (!code || !state || !expectedState || state !== expectedState) {
    loginUrl.searchParams.set("socialError", "facebook_state");
    return NextResponse.redirect(loginUrl);
  }

  try {
    const accessToken = await exchangeCodeForAccessToken(code);
    const user = await fetchFacebookUser(accessToken);
    const result = await signInWithFacebookIdentity({
      facebookUserId: user.id!,
      email: user.email,
      fullName: user.name,
    });

    if (!result.ok) {
      loginUrl.searchParams.set("socialError", "facebook_login");
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
      name: getFacebookOauthStateCookieName(),
      value: "",
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 0,
    });

    return response;
  } catch (errorCaught) {
    console.error("Facebook login callback failed.", errorCaught);
    loginUrl.searchParams.set("socialError", "facebook_callback");

    const response = NextResponse.redirect(loginUrl);
    response.cookies.set({
      name: getFacebookOauthStateCookieName(),
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
