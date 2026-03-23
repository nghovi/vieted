"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);
  const [otpPreview, setOtpPreview] = useState<string | null>(null);
  const [otpCooldownSeconds, setOtpCooldownSeconds] = useState(0);

  useEffect(() => {
    if (otpCooldownSeconds <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setOtpCooldownSeconds((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [otpCooldownSeconds]);

  async function handleSendOtp() {
    if (otpCooldownSeconds > 0) {
      return;
    }

    setIsSendingOtp(true);
    setErrorMessage(null);
    setSuccessMessage(null);
    setOtpMessage(null);

    const response = await fetch("/api/auth/phone-otp/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        purpose: "register",
      }),
    });

    const data = (await response.json()) as {
      error?: string;
      message?: string;
      otpPreview?: string;
    };

    if (!response.ok) {
      setErrorMessage(data.error ?? "Không thể gửi OTP.");
      setIsSendingOtp(false);
      return;
    }

    setOtpMessage(data.message ?? "OTP đã được gửi.");
    setOtpPreview(data.otpPreview ?? null);
    setOtpCooldownSeconds(60);
    setIsSendingOtp(false);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber,
        password,
        confirmPassword,
        otpCode,
      }),
    });

    const data = (await response.json()) as {
      error?: string;
    };

    if (!response.ok) {
      setErrorMessage(data.error ?? "Đăng ký thất bại.");
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage("Đã tạo tài khoản mới và đăng nhập thành công.");
    router.push("/");
    router.refresh();
  }

  return (
    <div className="auth-stack">
      <form className="auth-form register-form" onSubmit={handleSubmit}>
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

        <div className="form-row form-row-split">
          <label className="field">
            <span>Mật khẩu</span>
            <input
              autoComplete="new-password"
              name="password"
              type="password"
              placeholder="Ít nhất 8 ký tự"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <label className="field">
            <span>Xác nhận mật khẩu</span>
            <input
              autoComplete="new-password"
              name="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </label>
        </div>

        <div className="otp-panel">
          <div className="otp-panel-header">
            <div>
              <strong>Xác nhận số điện thoại</strong>
              <p className="helper-copy">Gửi OTP về số điện thoại rồi nhập mã 6 số để hoàn tất đăng ký.</p>
            </div>
            <button
              className="otp-send-button"
              type="button"
              onClick={handleSendOtp}
              disabled={isSendingOtp || otpCooldownSeconds > 0}
            >
              {isSendingOtp
                ? "Đang gửi OTP..."
                : otpCooldownSeconds > 0
                  ? `Gửi lại sau ${otpCooldownSeconds}s`
                  : "Gửi OTP"}
            </button>
          </div>

          <label className="field">
            <span>Mã OTP</span>
            <input
              inputMode="numeric"
              name="otpCode"
              placeholder="123456"
              value={otpCode}
              onChange={(event) => setOtpCode(event.target.value)}
            />
          </label>

          {otpMessage ? <p className="form-success">{otpMessage}</p> : null}
          {otpPreview ? (
            <p className="helper-copy">Mã OTP thử nghiệm trên máy local: <strong>{otpPreview}</strong></p>
          ) : null}
        </div>

        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        {successMessage ? <p className="form-success">{successMessage}</p> : null}

        <button className="primary-link auth-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản bằng số điện thoại"}
        </button>
      </form>

      <p className="helper-copy">
        Đã có tài khoản? <Link href="/login" className="inline-text-link">đăng nhập</Link>
      </p>
    </div>
  );
}
