"use client";

import { useState } from "react";

function GoogleIcon() {
  return (
    <svg aria-hidden="true" className="social-brand-icon" viewBox="0 0 24 24">
      <path
        d="M21.8 12.2c0-.7-.1-1.4-.2-2H12v3.7h5.5a4.8 4.8 0 0 1-2 3.1v2.6h3.3c1.9-1.8 3-4.4 3-7.4Z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.6c-.9.6-2.1 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.7A10 10 0 0 0 12 22Z"
        fill="#34A853"
      />
      <path
        d="M6.4 13.9A6 6 0 0 1 6 12c0-.7.1-1.3.4-1.9V7.4H3A10 10 0 0 0 2 12c0 1.7.4 3.3 1 4.6l3.4-2.7Z"
        fill="#FBBC05"
      />
      <path
        d="M12 6c1.5 0 2.9.5 3.9 1.5l2.9-2.9A9.9 9.9 0 0 0 12 2 10 10 0 0 0 3 7.4l3.4 2.7C7.2 7.8 9.4 6 12 6Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="social-brand-icon" viewBox="0 0 24 24">
      <path
        d="M24 12a12 12 0 1 0-13.9 11.9v-8.4H7.1V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12Z"
        fill="#1877F2"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg aria-hidden="true" className="social-brand-icon" viewBox="0 0 24 24">
      <path
        d="M14.7 3.2v8.3a3.97 3.97 0 1 1-2.8-3.8V10c-2.1.4-3.7 2.2-3.7 4.4a4.45 4.45 0 1 0 8.9 0V8.1c.9.7 2 1 3.2 1V6.3c-1.4 0-2.7-.7-3.4-1.9h-2.2Z"
        fill="#25F4EE"
        transform="translate(-0.8, 0.6)"
      />
      <path
        d="M14.7 3.2v8.3a3.97 3.97 0 1 1-2.8-3.8V10c-2.1.4-3.7 2.2-3.7 4.4a4.45 4.45 0 1 0 8.9 0V8.1c.9.7 2 1 3.2 1V6.3c-1.4 0-2.7-.7-3.4-1.9h-2.2Z"
        fill="#FE2C55"
        transform="translate(0.6, -0.3)"
      />
      <path
        d="M14.7 3.2v8.3a3.97 3.97 0 1 1-2.8-3.8V10c-2.1.4-3.7 2.2-3.7 4.4a4.45 4.45 0 1 0 8.9 0V8.1c.9.7 2 1 3.2 1V6.3c-1.4 0-2.7-.7-3.4-1.9h-2.2Z"
        fill="#111111"
      />
    </svg>
  );
}

export function SocialAuthForm() {
  const [activeProvider, setActiveProvider] = useState<
    "google" | "facebook" | "tiktok" | null
  >(null);

  function handleGoogleLogin() {
    setActiveProvider("google");
    window.location.assign("/api/auth/google/start");
  }

  function handleTikTokLogin() {
    setActiveProvider("tiktok");
    window.location.assign("/api/auth/tiktok/start");
  }

  function handleFacebookLogin() {
    setActiveProvider("facebook");
    window.location.assign("/api/auth/facebook/start");
  }

  return (
    <div className="social-auth-form">
      <div className="social-provider-stack">
        <button
          type="button"
          className="social-brand-button social-brand-button-google"
          onClick={handleGoogleLogin}
          disabled={activeProvider !== null}
        >
          <span className="social-brand-mark social-brand-mark-light">
            <GoogleIcon />
          </span>
          <span>
            {activeProvider === "google" ? "Đang chuyển đến Google..." : "Tiếp tục với Gmail"}
          </span>
        </button>

        <button
          type="button"
          className="social-brand-button social-brand-button-facebook"
          onClick={handleFacebookLogin}
          disabled={activeProvider !== null}
        >
          <span className="social-brand-mark social-brand-mark-facebook social-brand-mark-facebook-icon">
            <FacebookIcon />
          </span>
          <span className="social-brand-label-facebook">
            {activeProvider === "facebook"
              ? "Đang chuyển đến Facebook..."
              : "Tiếp tục với Facebook"}
          </span>
        </button>

        <button
          type="button"
          className="social-brand-button social-brand-button-tiktok"
          onClick={handleTikTokLogin}
          disabled={activeProvider !== null}
        >
          <span className="social-brand-mark social-brand-mark-tiktok">
            <TikTokIcon />
          </span>
          <span className="social-brand-label-tiktok">
            {activeProvider === "tiktok" ? "Đang chuyển đến TikTok..." : "Tiếp tục với TikTok"}
          </span>
        </button>
      </div>
    </div>
  );
}
