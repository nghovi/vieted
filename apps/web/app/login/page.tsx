import { Suspense } from "react";
import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="page-shell auth-page">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Đăng nhập học sinh</p>
          <h1>Đăng nhập bằng số điện thoại, Gmail, Facebook hoặc TikTok.</h1>
          <p className="lede">
            Trang này dành cho tài khoản đã đăng ký trước đó. Nếu học sinh chưa có tài
            khoản, hãy sang trang <Link href="/register" className="inline-text-link">đăng ký</Link> để tạo tài khoản bằng số điện thoại.
          </p>
          <div className="demo-credentials">
            <strong>Phương thức hỗ trợ</strong>
            <span>Số điện thoại và mật khẩu.</span>
            <span>Quên mật khẩu có thể đặt lại bằng OTP gửi theo số điện thoại.</span>
            <span>Gmail bằng đăng nhập trực tiếp qua Google.</span>
            <span>Facebook bằng đăng nhập trực tiếp qua Meta.</span>
            <span>TikTok bằng đăng nhập trực tiếp trên trang xác thực của TikTok.</span>
          </div>
        </div>

        <div className="hero-card auth-card">
          <h2>Bắt đầu với Trường Điểm Online</h2>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
