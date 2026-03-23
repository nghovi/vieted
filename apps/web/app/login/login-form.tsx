"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SocialAuthForm } from "../auth/social-auth-form";

export function LoginForm() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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

      <div className="auth-divider">
        <span>hoặc</span>
      </div>

      <div className="social-auth-shell">
        <div>
          <h3>Đăng nhập bằng TikTok, Facebook hoặc Gmail</h3>
          <p className="helper-copy">
            Chọn nhà cung cấp và nhập mã tài khoản đã dùng khi đăng ký trên VietEd.
          </p>
        </div>
        <SocialAuthForm mode="login" />
      </div>

      <p className="helper-copy">
        Chưa có tài khoản? <Link href="/register">Tạo tài khoản mới</Link>
      </p>
    </div>
  );
}
