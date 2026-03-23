"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
};

export function LogoutButton({ className }: Props) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/login");
    router.refresh();
  }

  return (
    <button
      className={className ?? "secondary-link logout-button"}
      disabled={isSubmitting}
      type="button"
      onClick={handleLogout}
    >
      {isSubmitting ? "Đang đăng xuất..." : "Đăng xuất"}
    </button>
  );
}
