"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type AvatarOption = {
  key: string;
  label: string;
  emoji: string;
  accent: string;
  background: string;
};

type Props = {
  currentNickname: string;
  currentAvatarKey: string;
  authProvider: string;
  avatarOptions: AvatarOption[];
};

export function ProfileSettings({
  currentNickname,
  currentAvatarKey,
  authProvider,
  avatarOptions,
}: Props) {
  const router = useRouter();
  const [nickname, setNickname] = useState(currentNickname);
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameSuccess, setNicknameSuccess] = useState("");
  const [selectedAvatarKey, setSelectedAvatarKey] = useState(currentAvatarKey);
  const [avatarError, setAvatarError] = useState("");
  const [avatarSuccess, setAvatarSuccess] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isNicknamePending, startNicknameTransition] = useTransition();
  const [isAvatarPending, startAvatarTransition] = useTransition();
  const [isPasswordPending, startPasswordTransition] = useTransition();
  const canChangePassword = authProvider === "phone";

  function submitNickname() {
    setNicknameError("");
    setNicknameSuccess("");

    startNicknameTransition(async () => {
      const response = await fetch("/api/student/profile/nickname", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nickname,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setNicknameError(payload.message ?? "Không thể cập nhật biệt danh.");
        return;
      }

      setNicknameSuccess(payload.message ?? "Đã cập nhật biệt danh.");
      router.refresh();
    });
  }

  function submitAvatar() {
    setAvatarError("");
    setAvatarSuccess("");

    startAvatarTransition(async () => {
      const response = await fetch("/api/student/profile/avatar", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          avatarKey: selectedAvatarKey,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setAvatarError(payload.message ?? "Không thể cập nhật ảnh đại diện.");
        return;
      }

      setAvatarSuccess(payload.message ?? "Đã cập nhật ảnh đại diện.");
      router.refresh();
    });
  }

  function submitPassword() {
    setPasswordError("");
    setPasswordSuccess("");

    if (nextPassword !== confirmPassword) {
      setPasswordError("Mật khẩu mới và xác nhận mật khẩu chưa khớp.");
      return;
    }

    startPasswordTransition(async () => {
      const response = await fetch("/api/student/profile/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          nextPassword,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setPasswordError(payload.message ?? "Không thể cập nhật mật khẩu.");
        return;
      }

      setCurrentPassword("");
      setNextPassword("");
      setConfirmPassword("");
      setPasswordSuccess(payload.message ?? "Đã cập nhật mật khẩu.");
    });
  }

  return (
    <div className="grid profile-grid">
      <section className="feature-card">
        <h3>Biệt danh</h3>
        <p>Chọn tên gọi thân thuộc để Trường Điểm Online hiển thị đúng cách em muốn.</p>
        <div className="auth-form">
          <label className="field">
            <span>Biệt danh hiển thị</span>
            <input
              autoComplete="nickname"
              name="nickname"
              type="text"
              maxLength={40}
              placeholder="Ví dụ: Nam, Bảo, Linh"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
          </label>
        </div>
        {nicknameError ? <p className="form-error">{nicknameError}</p> : null}
        {nicknameSuccess ? <p className="form-success">{nicknameSuccess}</p> : null}
        <button
          type="button"
          className="primary-link action-button"
          onClick={submitNickname}
          disabled={isNicknamePending}
        >
          {isNicknamePending ? "Đang lưu biệt danh..." : "Lưu biệt danh"}
        </button>
      </section>

      <section className="feature-card">
        <h3>Ảnh đại diện</h3>
        <p>Chọn ảnh đại diện để dễ nhận biết tài khoản khi học tập.</p>
        <div className="avatar-option-grid">
          {avatarOptions.map((avatar) => {
            const isActive = avatar.key === selectedAvatarKey;

            return (
              <button
                key={avatar.key}
                type="button"
                className={`avatar-option ${isActive ? "is-active" : ""}`}
                onClick={() => setSelectedAvatarKey(avatar.key)}
              >
                <span
                  className="avatar-badge"
                  aria-hidden="true"
                  style={{
                    background: avatar.background,
                    color: avatar.accent,
                  }}
                >
                  {avatar.emoji}
                </span>
                <span>{avatar.label}</span>
              </button>
            );
          })}
        </div>
        {avatarError ? <p className="form-error">{avatarError}</p> : null}
        {avatarSuccess ? <p className="form-success">{avatarSuccess}</p> : null}
        <button
          type="button"
          className="primary-link action-button"
          onClick={submitAvatar}
          disabled={isAvatarPending}
        >
          {isAvatarPending ? "Đang lưu ảnh đại diện..." : "Lưu ảnh đại diện"}
        </button>
      </section>

      <section className="feature-card">
        <h3>Đổi mật khẩu</h3>
        {canChangePassword ? (
          <>
            <p>Hãy dùng mật khẩu mạnh để bảo vệ tài khoản học tập của em.</p>
            <div className="auth-form">
              <label className="field">
                <span>Mật khẩu hiện tại</span>
                <input
                  autoComplete="current-password"
                  name="currentPassword"
                  type="password"
                  placeholder="Nhập mật khẩu hiện tại"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                />
              </label>
              <label className="field">
                <span>Mật khẩu mới</span>
                <input
                  autoComplete="new-password"
                  name="nextPassword"
                  type="password"
                  placeholder="Ít nhất 8 ký tự"
                  value={nextPassword}
                  onChange={(event) => setNextPassword(event.target.value)}
                />
              </label>
              <label className="field">
                <span>Xác nhận mật khẩu mới</span>
                <input
                  autoComplete="new-password"
                  name="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu mới"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </label>
            </div>
            {passwordError ? <p className="form-error">{passwordError}</p> : null}
            {passwordSuccess ? <p className="form-success">{passwordSuccess}</p> : null}
            <button
              type="button"
              className="primary-link action-button"
              onClick={submitPassword}
              disabled={isPasswordPending}
            >
              {isPasswordPending ? "Đang cập nhật mật khẩu..." : "Cập nhật mật khẩu"}
            </button>
          </>
        ) : (
          <p className="helper-copy">
            Tài khoản này đang dùng đăng nhập mạng xã hội, nên mật khẩu được quản lý ở
            bên Google, Facebook hoặc TikTok.
          </p>
        )}
      </section>
    </div>
  );
}
