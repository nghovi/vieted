import Link from "next/link";
import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <main className="page-shell auth-page">
      <section className="hero auth-hero auth-hero-balanced">
        <div className="hero-copy">
          <p className="eyebrow">Đăng ký tài khoản</p>
          <h1>Tạo tài khoản Trường Điểm Online bằng số điện thoại.</h1>
          <p className="lede">
            Trang đăng ký dành cho học sinh tạo tài khoản mới bằng số điện thoại.
            Số điện thoại sẽ được xác nhận bằng OTP trước khi tài khoản mới được tạo.
          </p>
          <div className="demo-credentials">
            <strong>Cách đăng ký hiện có</strong>
            <span>Số điện thoại, OTP xác nhận, và mật khẩu.</span>
            <span>TikTok chỉ dùng ở bước đăng nhập.</span>
          </div>
        </div>

        <div className="hero-card auth-card auth-card-tight">
          <h2>Bắt đầu hồ sơ học sinh</h2>
          <RegisterForm />
          <div className="inline-actions">
            <Link href="/privacy" className="subtle-inline-link">
              Chính sách quyền riêng tư
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
