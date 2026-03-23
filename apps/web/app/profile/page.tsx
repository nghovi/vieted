import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import { studentAvatarPresets } from "@/lib/db";
import { LogoutButton } from "../logout-button";
import { ProfileSettings } from "./profile-settings";

export default async function ProfilePage() {
  const student = await getServerSessionStudent();

  if (!student) {
    redirect("/login");
  }

  return (
    <main className="page-shell">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Hồ sơ học sinh</p>
          <h1>Quản lý tài khoản học tập của em tại một nơi duy nhất.</h1>
          <p className="lede">
            Đây là nơi để đổi mật khẩu, cập nhật ảnh đại diện và đăng xuất an toàn khỏi Trường Điểm Online.
          </p>
          <div className="session-banner profile-summary">
            <span
              className="avatar-badge profile-avatar"
              aria-hidden="true"
              style={{
                background: student.avatar.background,
                color: student.avatar.accent,
              }}
            >
              {student.avatar.emoji}
            </span>
            <div>
              <strong>{student.fullName}</strong>
              <span>
                Lớp {student.grade} • {student.contactLabel}
              </span>
            </div>
          </div>
          <div className="hero-actions">
            <LogoutButton />
            <Link href="/privacy" className="secondary-link">
              Xem chính sách
            </Link>
            <Link href="/" className="secondary-link">
              Về trang chủ
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Thiết lập tài khoản</h2>
          <ul>
            <li>
              <span>Đăng nhập</span>
              <strong>{student.authProvider === "phone" ? "Bằng số điện thoại" : `Bằng ${student.contactLabel}`}</strong>
            </li>
            <li>
              <span>Mật khẩu</span>
              <strong>
                {student.authProvider === "phone"
                  ? "Tự quản lý trong hồ sơ"
                  : "Đăng nhập qua tài khoản mạng xã hội đã liên kết"}
              </strong>
            </li>
            <li>
              <span>Ảnh đại diện</span>
              <strong>Chọn từ bộ avatar của Trường Điểm Online</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Cập nhật thông tin</p>
          <h2>Giữ tài khoản gọn gàng, rõ ràng và an toàn.</h2>
        </div>
        <ProfileSettings
          currentNickname={student.fullName}
          currentAvatarKey={student.avatar.key}
          authProvider={student.authProvider}
          avatarOptions={studentAvatarPresets.map((avatar) => ({
            key: avatar.key,
            label: avatar.label,
            emoji: avatar.emoji,
            accent: avatar.accent,
            background: avatar.background,
          }))}
        />
      </section>
    </main>
  );
}
