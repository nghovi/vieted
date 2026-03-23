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
        fill="currentColor"
      />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg aria-hidden="true" className="social-brand-icon" viewBox="0 0 64 64">
      <path
        d="M39.5 11c1.6 4.5 4.8 7.7 9.3 9.1v6.7c-3.2-.1-6.2-1.1-8.9-2.8V37c0 9.4-7.4 16.5-16.7 16.5-7 0-13.2-4.1-15.8-10.5-3.8-9.2 2.9-19.6 12.7-20.8v7c-5.6 1.1-8.9 7-6.4 12.3 1.7 3.6 5.9 5.7 9.8 4.8 4.6-1 7.7-5.2 7.7-9.9V10.9h8.3Z"
        fill="currentColor"
      />
      <path
        d="M43.4 17.4c1.9 2.2 4.3 3.7 7.2 4.4v4.4c-2.5-.1-4.9-.8-7.2-2v-6.8Z"
        fill="#25F4EE"
      />
      <path
        d="M37.4 9v27.3c0 7.5-5 13.7-11.7 15.2-3.9.9-8.1-.7-9.8-4.3-2.6-5.3.8-11.2 6.4-12.3v-4.3c-9.8 1.2-16.5 11.6-12.7 20.8 2.6 6.4 8.8 10.5 15.8 10.5 9.3 0 16.7-7.1 16.7-16.5V22.7c2.3 1.2 4.7 1.9 7.2 2v-4.4c-2.9-.7-5.3-2.2-7.2-4.4-1.7-2-2.9-4.5-3.5-7.3h-1.2Z"
        fill="#FE2C55"
        fillOpacity="0.9"
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
          <span className="social-brand-mark social-brand-mark-facebook">
            <FacebookIcon />
          </span>
          <span>
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
          <span className="social-brand-mark">
            <TikTokIcon />
          </span>
          <span>
            {activeProvider === "tiktok" ? "Đang chuyển đến TikTok..." : "Tiếp tục với TikTok"}
          </span>
        </button>
      </div>

      <p className="helper-copy">
        Đăng nhập trực tiếp bằng Gmail, Facebook hoặc TikTok. Trường Điểm Online sẽ tạo
        hoặc mở hồ sơ học sinh của bạn sau khi xác thực thành công.
      </p>
    </div>
  );
}
