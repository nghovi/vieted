import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="page-shell auth-page">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Đăng nhập học sinh</p>
          <h1>Đăng nhập bằng số điện thoại và mật khẩu.</h1>
          <p className="lede">
            Đây là bước xác thực đầu tiên cho web và mobile. Server xác thực
            thông tin, tạo session, sau đó client điều hướng học sinh vào trải nghiệm học tập.
          </p>
          <div className="demo-credentials">
            <strong>Tài khoản demo</strong>
            <span>Số điện thoại: 0987654321</span>
            <span>Mật khẩu: vieted123</span>
          </div>
        </div>

        <div className="hero-card auth-card">
          <h2>Bắt đầu phiên học</h2>
          <LoginForm />
          <p className="helper-copy">
            Sau khi đăng nhập, trang chủ sẽ đọc session ở phía server để hiển thị thông tin học sinh.
          </p>
          <Link href="/" className="secondary-link inline-link">
            Quay lại trang chủ
          </Link>
        </div>
      </section>
    </main>
  );
}
