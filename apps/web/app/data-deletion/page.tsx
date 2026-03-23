import Link from "next/link";

const deletionSections = [
  {
    title: "1. Cách yêu cầu xóa dữ liệu",
    body: "Người dùng có thể gửi yêu cầu xóa tài khoản và dữ liệu liên quan bằng cách liên hệ đội ngũ hỗ trợ của Trường Điểm Online và cung cấp số điện thoại đã đăng ký hoặc email/tài khoản mạng xã hội đã liên kết.",
  },
  {
    title: "2. Dữ liệu sẽ được xóa",
    body: "Khi yêu cầu xóa được xác nhận, Trường Điểm Online sẽ xóa hồ sơ tài khoản, phương thức đăng nhập đã liên kết, tùy chọn học tập, tiến độ học, kết quả làm bài và các dữ liệu liên quan trực tiếp đến tài khoản đó trong phạm vi hệ thống của chúng tôi.",
  },
  {
    title: "3. Dữ liệu có thể được giữ lại tạm thời",
    body: "Một số bản ghi kỹ thuật hoặc dữ liệu cần thiết cho bảo mật, phòng chống gian lận, sao lưu tạm thời hoặc tuân thủ nghĩa vụ pháp lý có thể được lưu giữ trong khoảng thời gian hợp lý trước khi được xóa hoàn toàn.",
  },
  {
    title: "4. Thời gian xử lý",
    body: "Yêu cầu xóa dữ liệu sẽ được xem xét và xử lý trong thời gian hợp lý sau khi chúng tôi xác minh quyền sở hữu tài khoản và tính hợp lệ của yêu cầu.",
  },
  {
    title: "5. Liên hệ hỗ trợ",
    body: "Email hỗ trợ hiện tại: support@truongdiem.online",
  },
] as const;

export default function DataDeletionPage() {
  return (
    <main className="page-shell">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Xóa dữ liệu</p>
          <h1>Hướng dẫn yêu cầu xóa tài khoản và dữ liệu tại Trường Điểm Online.</h1>
          <p className="lede">
            Trang này mô tả cách người dùng có thể yêu cầu xóa tài khoản và dữ liệu cá
            nhân liên quan khi sử dụng website hoặc ứng dụng của Trường Điểm Online.
          </p>
          <div className="hero-actions">
            <Link href="/privacy" className="secondary-link">
              Xem chính sách quyền riêng tư
            </Link>
            <Link href="/login" className="secondary-link">
              Về đăng nhập
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Tóm tắt nhanh</h2>
          <ul>
            <li>
              <span>Yêu cầu xóa</span>
              <strong>Qua email hỗ trợ hoặc kênh liên hệ chính thức</strong>
            </li>
            <li>
              <span>Xác minh</span>
              <strong>Bằng số điện thoại hoặc tài khoản đã liên kết</strong>
            </li>
            <li>
              <span>Phạm vi xóa</span>
              <strong>Hồ sơ tài khoản, tiến độ học và dữ liệu liên quan</strong>
            </li>
            <li>
              <span>Liên hệ</span>
              <strong>support@truongdiem.online</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="policy-layout">
          {deletionSections.map((section) => (
            <article key={section.title} className="feature-card">
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
