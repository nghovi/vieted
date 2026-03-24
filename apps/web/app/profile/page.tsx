import { redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import { studentAvatarPresets } from "@/lib/db";
import { LogoutButton } from "../logout-button";
import { ProfilePasswordModal } from "./profile-password-modal";
import { ProfileSettings } from "./profile-settings";

export default async function ProfilePage() {
  const student = await getServerSessionStudent();

  if (!student) {
    redirect("/login");
  }

  const canChangePassword = student.authProvider === "phone";

  return (
    <main className="page-shell">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Hồ sơ học sinh</p>
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
            <LogoutButton className="primary-link logout-button" />
            <ProfilePasswordModal canChangePassword={canChangePassword} />
          </div>
        </div>

        <div className="hero-card">
          <h2>Tài khoản</h2>
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
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Cài đặt</p>
          <h2>Cập nhật thông tin tài khoản.</h2>
        </div>
        <ProfileSettings
          currentNickname={student.fullName}
          currentAvatarKey={student.avatar.key}
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
