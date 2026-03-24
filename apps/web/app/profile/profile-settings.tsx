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
  avatarOptions: AvatarOption[];
};

export function ProfileSettings({
  currentNickname,
  currentAvatarKey,
  avatarOptions,
}: Props) {
  const router = useRouter();
  const [nickname, setNickname] = useState(currentNickname);
  const [nicknameError, setNicknameError] = useState("");
  const [nicknameSuccess, setNicknameSuccess] = useState("");
  const [selectedAvatarKey, setSelectedAvatarKey] = useState(currentAvatarKey);
  const [avatarError, setAvatarError] = useState("");
  const [avatarSuccess, setAvatarSuccess] = useState("");
  const [isNicknamePending, startNicknameTransition] = useTransition();
  const [isAvatarPending, startAvatarTransition] = useTransition();

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

  return (
    <div className="grid profile-grid">
      <section className="feature-card settings-card">
        <h3>Biệt danh</h3>
        <div className="auth-form">
          <label className="field">
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
          className="primary-link logout-button action-button settings-card-action"
          onClick={submitNickname}
          disabled={isNicknamePending}
        >
          {isNicknamePending ? "Đang lưu biệt danh..." : "Lưu biệt danh"}
        </button>
      </section>

      <section className="feature-card settings-card">
        <h3>Ảnh đại diện</h3>
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
          className="primary-link logout-button action-button settings-card-action"
          onClick={submitAvatar}
          disabled={isAvatarPending}
        >
          {isAvatarPending ? "Đang lưu ảnh đại diện..." : "Lưu ảnh đại diện"}
        </button>
      </section>
    </div>
  );
}
