"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type SocialMode = "login" | "register";
type SocialProvider = "google" | "facebook" | "tiktok";

const providerOptions: Array<{
  value: SocialProvider;
  label: string;
  hint: string;
}> = [
  {
    value: "google",
    label: "Gmail / Google",
    hint: "Dùng email Gmail và mã tài khoản Google.",
  },
  {
    value: "facebook",
    label: "Facebook",
    hint: "Dùng email hoặc username Facebook và mã người dùng.",
  },
  {
    value: "tiktok",
    label: "TikTok",
    hint: "Dùng username hoặc mã hồ sơ TikTok.",
  },
];

type Props = {
  mode: SocialMode;
};

export function SocialAuthForm({ mode }: Props) {
  const router = useRouter();
  const [provider, setProvider] = useState<SocialProvider>("google");
  const [providerUserId, setProviderUserId] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [grade, setGrade] = useState("9");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const isRegister = mode === "register";
  const selectedProvider = providerOptions.find((item) => item.value === provider);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const response = await fetch("/api/auth/social", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mode,
        provider,
        providerUserId,
        email,
        fullName,
        grade: Number(grade),
      }),
    });

    const payload = (await response.json()) as {
      error?: string;
      isNewAccount?: boolean;
    };

    if (!response.ok) {
      setErrorMessage(payload.error ?? "Xác thực mạng xã hội thất bại.");
      setIsSubmitting(false);
      return;
    }

    setSuccessMessage(
      isRegister || payload.isNewAccount
        ? `Đã tạo tài khoản ${selectedProvider?.label ?? ""} thành công.`
        : `Đăng nhập bằng ${selectedProvider?.label ?? ""} thành công.`,
    );

    router.push("/");
    router.refresh();
  }

  return (
    <form className="auth-form social-auth-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Nhà cung cấp</span>
        <select
          name="provider"
          value={provider}
          onChange={(event) => setProvider(event.target.value as SocialProvider)}
        >
          {providerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <p className="helper-copy">{selectedProvider?.hint}</p>

      <label className="field">
        <span>Mã tài khoản / Username</span>
        <input
          autoComplete="username"
          name="providerUserId"
          placeholder="@vieted.student hoặc 123456789"
          value={providerUserId}
          onChange={(event) => setProviderUserId(event.target.value)}
        />
      </label>

      <label className="field">
        <span>Email liên kết</span>
        <input
          autoComplete="email"
          name="email"
          type="email"
          placeholder={provider === "google" ? "hocvien@gmail.com" : "Tùy chọn nếu có"}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>

      {isRegister ? (
        <>
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
        </>
      ) : null}

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
      {successMessage ? <p className="form-success">{successMessage}</p> : null}

      <button className="primary-link auth-submit" disabled={isSubmitting} type="submit">
        {isSubmitting
          ? "Đang xử lý..."
          : isRegister
            ? `Tạo tài khoản bằng ${selectedProvider?.label ?? "mạng xã hội"}`
            : `Đăng nhập bằng ${selectedProvider?.label ?? "mạng xã hội"}`}
      </button>
    </form>
  );
}
