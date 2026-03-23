import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <main className="page-shell auth-page">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Đăng ký tài khoản</p>
          <h1>Tạo tài khoản Trường Điểm Online bằng số điện thoại hoặc mạng xã hội quen dùng.</h1>
          <p className="lede">
            Học sinh có thể đăng ký bằng số điện thoại, hoặc tạo tài khoản bằng Gmail,
            Facebook, và TikTok để vào học nhanh hơn trong những lần sau.
          </p>
          <div className="demo-credentials">
            <strong>Các cách đăng ký hiện có</strong>
            <span>Số điện thoại và mật khẩu.</span>
            <span>Google/Gmail, Facebook, TikTok qua mã tài khoản đã liên kết.</span>
          </div>
        </div>

        <div className="hero-card auth-card">
          <h2>Bắt đầu hồ sơ học sinh</h2>
          <RegisterForm />
          <div className="inline-actions">
            <Link href="/login" className="secondary-link inline-link">
              Đã có tài khoản
            </Link>
            <Link href="/" className="secondary-link inline-link">
              Quay lại trang chủ
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
