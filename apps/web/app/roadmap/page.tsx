import Link from "next/link";

const roadmap = [
  "Đăng nhập bằng số điện thoại và mật khẩu cho cả web và Flutter",
  "Lưu lớp hiện tại từ 1 đến 12 và môn học đang học",
  "Bản đồ chủ đề Lịch sử lớp 9 để bắt đầu nhanh và dễ đo lường",
  "Trợ lý AI bằng tiếng Việt, ưu tiên gợi ý trước khi đưa đáp án",
  "Bảng đánh giá tiến độ cho học sinh và tổng kết hằng tuần cho phụ huynh",
];

export default function RoadmapPage() {
  return (
    <main className="page-shell">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Lộ trình sản phẩm</p>
          <h1>Kế hoạch triển khai được tách riêng khỏi trang chủ học sinh.</h1>
          <p className="lede">
            Trang này giữ lại các mốc phát triển sản phẩm để bạn theo dõi, trong khi
            homepage tập trung hoàn toàn vào trải nghiệm học tập.
          </p>
          <div className="hero-actions">
            <Link href="/" className="secondary-link">
              Về trang chủ
            </Link>
            <Link href="/profile" className="secondary-link">
              Về hồ sơ
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Tóm tắt</h2>
          <ul>
            <li>
              <span>Phạm vi hiện tại</span>
              <strong>Lịch sử lớp 9</strong>
            </li>
            <li>
              <span>Nền tảng</span>
              <strong>Web và Flutter</strong>
            </li>
            <li>
              <span>Mục tiêu</span>
              <strong>Tiến tới sản phẩm edtech hàng đầu</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section roadmap">
        <div className="section-heading">
          <p className="eyebrow">Kế hoạch triển khai</p>
          <h2>Những gì nên hoàn thiện trước khi mở rộng sang môn khác.</h2>
        </div>
        <ol>
          {roadmap.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
