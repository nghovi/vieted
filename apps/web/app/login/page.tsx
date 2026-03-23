import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="page-shell auth-page">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Đăng nhập học sinh</p>
          <h1>Đăng nhập bằng số điện thoại, TikTok, Facebook hoặc Gmail.</h1>
          <p className="lede">
            Trang này dành cho tài khoản đã đăng ký trước đó. Nếu học sinh chưa có tài
            khoản, hãy sang trang đăng ký để tạo tài khoản bằng số điện thoại hoặc mạng xã hội.
          </p>
          <div className="demo-credentials">
            <strong>Phương thức hỗ trợ</strong>
            <span>Số điện thoại và mật khẩu.</span>
            <span>Google/Gmail, Facebook, TikTok bằng mã tài khoản đã đăng ký.</span>
          </div>
        </div>

        <div className="hero-card auth-card">
          <h2>Bắt đầu với Trường Điểm Online</h2>
          <LoginForm />
          <p className="helper-copy">
            Sau khi xác thực, trang chủ sẽ đọc session ở phía server để hiển thị thông tin học sinh.
          </p>
          <div className="inline-actions">
            <Link href="/privacy" className="secondary-link inline-link">
              Chính sách quyền riêng tư
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
