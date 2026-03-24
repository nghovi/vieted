"use client";

import { useEffect, useState, useTransition } from "react";
import { createPortal } from "react-dom";

type Props = {
  canChangePassword: boolean;
};

export function ProfilePasswordModal({ canChangePassword }: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [nextPassword, setNextPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  if (!canChangePassword) {
    return null;
  }

  function closeModal() {
    setIsOpen(false);
    setErrorMessage("");
    setSuccessMessage("");
  }

  function submitPassword() {
    setErrorMessage("");
    setSuccessMessage("");

    if (nextPassword !== confirmPassword) {
      setErrorMessage("Mật khẩu mới và xác nhận mật khẩu chưa khớp.");
      return;
    }

    startTransition(async () => {
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
        setErrorMessage(payload.message ?? "Không thể cập nhật mật khẩu.");
        return;
      }

      setCurrentPassword("");
      setNextPassword("");
      setConfirmPassword("");
      setSuccessMessage(payload.message ?? "Đã cập nhật mật khẩu.");
    });
  }

  return (
    <>
      <button
        type="button"
        className="primary-link logout-button action-button"
        onClick={() => setIsOpen(true)}
      >
        Đổi mật khẩu
      </button>

      {isMounted && isOpen
        ? createPortal(
            <div className="profile-password-backdrop" onClick={closeModal}>
              <div
                className="profile-password-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="profile-password-modal-title"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="profile-password-modal-header">
                  <strong id="profile-password-modal-title">Đổi mật khẩu</strong>
                  <button
                    type="button"
                    className="chart-dialog-close"
                    onClick={closeModal}
                    aria-label="Đóng"
                  >
                    ×
                  </button>
                </div>

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

                {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
                {successMessage ? <p className="form-success">{successMessage}</p> : null}

                <div className="inline-actions">
                  <button
                    type="button"
                    className="primary-link action-button"
                    onClick={submitPassword}
                    disabled={isPending}
                  >
                    {isPending ? "Đang cập nhật mật khẩu..." : "Cập nhật mật khẩu"}
                  </button>
                  <button
                    type="button"
                    className="secondary-link action-button"
                    onClick={closeModal}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
