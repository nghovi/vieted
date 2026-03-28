import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="page-shell auth-page">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Đăng nhập học sinh</p>
          <h1>Chọn tài khoản để vào học ngay.</h1>
          <p className="lede">
            Tiếp tục với Gmail, Facebook hoặc TikTok để bắt đầu học và lưu tiến độ.
          </p>
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
