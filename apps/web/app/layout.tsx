import Link from "next/link";
import type { Metadata } from "next";
import { getServerSessionStudent } from "@/lib/auth";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trường Điểm Online",
  description: "AI-backed learning for Vietnamese students in grades 6-12.",
  other: {
    "facebook-domain-verification": "2fn41iuevhzspjfr3l6jk47er1272m",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const student = await getServerSessionStudent();

  return (
    <html lang="vi">
      <body>
        <div className="floating-action-stack">
          <Link href="/" className="floating-home-link" aria-label="Về trang chủ">
            <span className="floating-home-icon" aria-hidden="true">
              ⌂
            </span>
            <span className="floating-home-label">Trang chủ</span>
          </Link>
          {student ? (
            <Link href="/profile" className="floating-profile-link" aria-label="Mở hồ sơ">
              <span
                className="floating-profile-avatar"
                aria-hidden="true"
                style={{
                  background: student.avatar.background,
                  color: student.avatar.accent,
                }}
              >
                {student.avatar.emoji}
              </span>
              <span className="floating-profile-label">Hồ sơ</span>
            </Link>
          ) : null}
        </div>
        {children}
      </body>
    </html>
  );
}
