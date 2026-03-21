import Link from "next/link";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VietEd",
  description: "AI-backed learning for Vietnamese students in grades 6-12.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <body>
        <Link href="/" className="floating-home-link" aria-label="Về trang chủ">
          <span className="floating-home-icon" aria-hidden="true">
            ⌂
          </span>
          <span className="floating-home-label">Trang chủ</span>
        </Link>
        {children}
      </body>
    </html>
  );
}
