"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SocialAuthForm } from "../auth/social-auth-form";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetPhoneNumber, setResetPhoneNumber] = useState("");
  const [resetOtpCode, setResetOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isSendingResetOtp, setIsSendingResetOtp] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resetErrorMessage, setResetErrorMessage] = useState<string | null>(null);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);
  const [resetOtpPreview, setResetOtpPreview] = useState<string | null>(null);
  const [resetOtpCooldownSeconds, setResetOtpCooldownSeconds] = useState(0);

  const socialError = searchParams.get("socialError");
  const socialErrorMessage =
    socialError === "google_config"
      ? "Gmail login chưa được cấu hình đầy đủ."
      : socialError === "google_cancelled"
        ? "Bạn đã hủy đăng nhập Google."
        : socialError === "google_state"
          ? "Phiên đăng nhập Google không hợp lệ. Hãy thử lại."
          : socialError === "google_callback"
            ? "Google không trả về phiên đăng nhập hợp lệ."
            : socialError === "google_login"
              ? "Không thể đăng nhập bằng Gmail lúc này."
              : socialError === "facebook_config"
                ? "Facebook login chưa được cấu hình đầy đủ."
                : socialError === "facebook_cancelled"
                  ? "Bạn đã hủy đăng nhập Facebook."
                  : socialError === "facebook_state"
                    ? "Phiên đăng nhập Facebook không hợp lệ. Hãy thử lại."
                    : socialError === "facebook_callback"
                      ? "Facebook không trả về phiên đăng nhập hợp lệ."
                      : socialError === "facebook_login"
                        ? "Không thể đăng nhập bằng Facebook lúc này."
              : socialError === "tiktok_config"
      ? "TikTok login chưa được cấu hình đầy đủ."
      : socialError === "tiktok_cancelled"
        ? "Bạn đã hủy đăng nhập TikTok."
        : socialError === "tiktok_state"
          ? "Phiên đăng nhập TikTok không hợp lệ. Hãy thử lại."
          : socialError === "tiktok_callback"
            ? "TikTok không trả về phiên đăng nhập hợp lệ."
            : socialError === "tiktok_login"
              ? "Không thể đăng nhập bằng TikTok lúc này."
              : null;

  useEffect(() => {
    if (resetOtpCooldownSeconds <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setResetOtpCooldownSeconds((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [resetOtpCooldownSeconds]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phoneNumber, password }),
    });

    const data = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setErrorMessage(data.error ?? "Đăng nhập thất bại.");
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage("Đăng nhập thành công.");
    router.push("/");
    router.refresh();
  }

  async function handleSendResetOtp() {
    if (resetOtpCooldownSeconds > 0) {
      return;
    }

    setIsSendingResetOtp(true);
    setResetErrorMessage(null);
    setResetSuccessMessage(null);

    const response = await fetch("/api/auth/phone-otp/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: resetPhoneNumber,
        purpose: "reset-password",
      }),
    });

    const data = (await response.json()) as {
      error?: string;
      message?: string;
      otpPreview?: string;
    };

    if (!response.ok) {
      setResetErrorMessage(data.error ?? "Không thể gửi OTP đặt lại mật khẩu.");
      setIsSendingResetOtp(false);
      return;
    }

    setResetSuccessMessage(data.message ?? "OTP đặt lại mật khẩu đã được gửi.");
    setResetOtpPreview(data.otpPreview ?? null);
    setResetOtpCooldownSeconds(60);
    setIsSendingResetOtp(false);
  }

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsResettingPassword(true);
    setResetErrorMessage(null);
    setResetSuccessMessage(null);

    const response = await fetch("/api/auth/password-reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: resetPhoneNumber,
        otpCode: resetOtpCode,
        password: newPassword,
        confirmPassword: confirmNewPassword,
      }),
    });

    const data = (await response.json()) as {
      error?: string;
      message?: string;
    };

    if (!response.ok) {
      setResetErrorMessage(data.error ?? "Không thể đặt lại mật khẩu.");
      setIsResettingPassword(false);
      return;
    }

    setResetSuccessMessage(data.message ?? "Đặt lại mật khẩu thành công.");
    setPhoneNumber(resetPhoneNumber);
    setPassword("");
    setSuccessMessage("Mật khẩu mới đã được cập nhật. Hãy đăng nhập lại.");
    setResetOtpCode("");
    setNewPassword("");
    setConfirmNewPassword("");
    setIsResettingPassword(false);
    setShowForgotPassword(false);
  }

  return (
    <div className="auth-stack">
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Số điện thoại</span>
          <input
            autoComplete="tel"
            inputMode="numeric"
            name="phoneNumber"
            placeholder="0987654321"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Mật khẩu</span>
          <input
            autoComplete="current-password"
            name="password"
            type="password"
            placeholder="Ít nhất 8 ký tự"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        {successMessage ? <p className="form-success">{successMessage}</p> : null}

        <button className="primary-link auth-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Đang xử lý..." : "Đăng nhập bằng số điện thoại"}
        </button>
      </form>

      <div className="auth-inline-actions">
        <button
          type="button"
          className="text-action"
          onClick={() => {
            setShowForgotPassword((current) => !current);
            setResetErrorMessage(null);
            setResetSuccessMessage(null);
          }}
        >
          {showForgotPassword ? "Ẩn phần quên mật khẩu" : "Quên mật khẩu?"}
        </button>
      </div>

      {showForgotPassword ? (
        <form className="auth-form auth-subpanel" onSubmit={handleResetPassword}>
          <div>
            <h3>Đặt lại mật khẩu bằng OTP</h3>
            <p className="helper-copy">
              Nhập số điện thoại, lấy OTP xác nhận, rồi tạo mật khẩu mới.
            </p>
          </div>

          <label className="field">
            <span>Số điện thoại</span>
            <input
              autoComplete="tel"
              inputMode="numeric"
              name="resetPhoneNumber"
              placeholder="0987654321"
              value={resetPhoneNumber}
              onChange={(event) => setResetPhoneNumber(event.target.value)}
            />
          </label>

          <div className="otp-panel">
            <div className="otp-panel-header">
              <div>
                <strong>OTP xác nhận</strong>
                <p className="helper-copy">Mã có hiệu lực trong 5 phút.</p>
              </div>
              <button
                className="otp-send-button"
                type="button"
                onClick={handleSendResetOtp}
                disabled={isSendingResetOtp || resetOtpCooldownSeconds > 0}
              >
                {isSendingResetOtp
                  ? "Đang gửi OTP..."
                  : resetOtpCooldownSeconds > 0
                    ? `Gửi lại sau ${resetOtpCooldownSeconds}s`
                    : "Gửi OTP"}
              </button>
            </div>

            <label className="field">
              <span>Mã OTP</span>
              <input
                inputMode="numeric"
                name="resetOtpCode"
                placeholder="123456"
                value={resetOtpCode}
                onChange={(event) => setResetOtpCode(event.target.value)}
              />
            </label>

            {resetOtpPreview ? (
              <p className="helper-copy">Mã OTP thử nghiệm trên máy local: <strong>{resetOtpPreview}</strong></p>
            ) : null}
          </div>

          <label className="field">
            <span>Mật khẩu mới</span>
            <input
              autoComplete="new-password"
              name="newPassword"
              type="password"
              placeholder="Ít nhất 8 ký tự"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Xác nhận mật khẩu mới</span>
            <input
              autoComplete="new-password"
              name="confirmNewPassword"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmNewPassword}
              onChange={(event) => setConfirmNewPassword(event.target.value)}
            />
          </label>

          {resetErrorMessage ? <p className="form-error">{resetErrorMessage}</p> : null}
          {resetSuccessMessage ? <p className="form-success">{resetSuccessMessage}</p> : null}

          <button className="primary-link auth-submit" disabled={isResettingPassword} type="submit">
            {isResettingPassword ? "Đang cập nhật..." : "Xác nhận mật khẩu mới"}
          </button>
        </form>
      ) : null}

      <div className="auth-divider">
        <span>hoặc</span>
      </div>

      <div className="social-auth-shell">
        {socialErrorMessage ? <p className="form-error">{socialErrorMessage}</p> : null}
        <SocialAuthForm />
      </div>

      <p className="helper-copy">
        Chưa có tài khoản? <Link href="/register" className="inline-text-link">Tạo tài khoản mới</Link>
      </p>
    </div>
  );
}
