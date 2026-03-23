"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SocialAuthForm } from "../auth/social-auth-form";

export function RegisterForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [grade, setGrade] = useState("9");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
        fullName,
        phoneNumber,
        password,
        grade: Number(grade),
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
      <form className="auth-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Tên hiển thị</span>
          <input
            autoComplete="name"
            name="fullName"
            placeholder="Ví dụ: Nguyễn Nam"
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
          />
        </label>

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
            autoComplete="new-password"
            name="password"
            type="password"
            placeholder="Ít nhất 8 ký tự"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>

        <label className="field">
          <span>Khối lớp</span>
          <select
            name="grade"
            value={grade}
            onChange={(event) => setGrade(event.target.value)}
          >
            {Array.from({ length: 12 }, (_, index) => index + 1).map((item) => (
              <option key={item} value={item}>
                Lớp {item}
              </option>
            ))}
          </select>
        </label>

        {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
        {successMessage ? <p className="form-success">{successMessage}</p> : null}

        <button className="primary-link auth-submit" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Đang xử lý..." : "Tạo tài khoản bằng số điện thoại"}
        </button>
      </form>

      <div className="auth-divider">
        <span>hoặc</span>
      </div>

      <div className="social-auth-shell">
        <div>
          <h3>Đăng ký bằng TikTok, Facebook hoặc Gmail</h3>
          <p className="helper-copy">
            VietEd sẽ lưu tài khoản mạng xã hội này làm phương thức đăng nhập cho học sinh.
          </p>
        </div>
        <SocialAuthForm mode="register" />
      </div>

      <p className="helper-copy">
        Đã có tài khoản? <Link href="/login">Quay về đăng nhập</Link>
      </p>
    </div>
  );
}
