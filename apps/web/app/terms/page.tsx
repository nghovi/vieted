import Link from "next/link";

const termsSections = [
  {
    title: "1. Phạm vi áp dụng",
    body: "Điều khoản dịch vụ này áp dụng cho website và ứng dụng của Trường Điểm Online, bao gồm các chức năng tạo tài khoản, đăng nhập, học tập, làm bài kiểm tra, theo dõi tiến độ và quản lý hồ sơ học sinh.",
  },
  {
    title: "2. Điều kiện sử dụng",
    body: "Người dùng cần cung cấp thông tin đăng nhập chính xác trong phạm vi cần thiết để truy cập dịch vụ. Người dùng chịu trách nhiệm bảo mật tài khoản, mật khẩu, mã OTP và các phương thức đăng nhập đã liên kết.",
  },
  {
    title: "3. Tài khoản và xác thực",
    body: "Trường Điểm Online có thể cung cấp đăng ký hoặc đăng nhập bằng số điện thoại, OTP hoặc tài khoản mạng xã hội được hỗ trợ. Chúng tôi có thể tạm ngừng hoặc từ chối quyền truy cập nếu phát hiện thông tin giả mạo, lạm dụng hoặc hành vi ảnh hưởng đến an toàn hệ thống.",
  },
  {
    title: "4. Nội dung và mục đích sử dụng",
    body: "Dịch vụ được thiết kế để hỗ trợ học sinh học tập thông qua bài học, câu hỏi luyện tập, bài kiểm tra và dữ liệu tiến độ. Người dùng chỉ được sử dụng nội dung cho mục đích học tập cá nhân và không được sao chép, phát tán hoặc khai thác trái phép nội dung trên nền tảng.",
  },
  {
    title: "5. Hành vi không được phép",
    body: "Người dùng không được sử dụng dịch vụ để phá hoại hệ thống, truy cập trái phép, thu thập dữ liệu trái phép, chia sẻ mã độc, gian lận kết quả học tập hoặc thực hiện bất kỳ hành vi nào vi phạm pháp luật hoặc gây ảnh hưởng xấu đến người dùng khác.",
  },
  {
    title: "6. Dữ liệu và quyền riêng tư",
    body: "Việc thu thập, sử dụng và lưu trữ dữ liệu cá nhân được thực hiện theo Chính sách quyền riêng tư của Trường Điểm Online. Khi sử dụng dịch vụ, người dùng đồng ý với các hoạt động xử lý dữ liệu cần thiết để vận hành tài khoản và cung cấp trải nghiệm học tập.",
  },
  {
    title: "7. Tạm ngừng hoặc chấm dứt dịch vụ",
    body: "Chúng tôi có thể tạm ngừng, giới hạn hoặc chấm dứt quyền sử dụng dịch vụ đối với các tài khoản vi phạm điều khoản, gây rủi ro bảo mật hoặc ảnh hưởng đến hoạt động ổn định của nền tảng.",
  },
  {
    title: "8. Giới hạn trách nhiệm",
    body: "Trường Điểm Online nỗ lực duy trì dịch vụ ổn định và chính xác, nhưng không cam kết dịch vụ luôn liên tục, không gián đoạn hoặc hoàn toàn không có lỗi. Trong phạm vi pháp luật cho phép, chúng tôi không chịu trách nhiệm cho các thiệt hại phát sinh gián tiếp từ việc sử dụng hoặc không thể sử dụng dịch vụ.",
  },
  {
    title: "9. Thay đổi điều khoản",
    body: "Chúng tôi có thể cập nhật điều khoản này theo thời gian để phản ánh thay đổi về sản phẩm, công nghệ hoặc yêu cầu pháp lý. Phiên bản mới nhất sẽ được công bố tại trang này và có hiệu lực từ thời điểm đăng tải.",
  },
  {
    title: "10. Liên hệ",
    body: "Mọi câu hỏi liên quan đến điều khoản dịch vụ có thể được gửi về địa chỉ hỗ trợ: support@truongdiem.online.",
  },
] as const;

export default function TermsPage() {
  return (
    <main className="page-shell">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Điều khoản dịch vụ</p>
          <h1>Điều khoản sử dụng dành cho website và ứng dụng của Trường Điểm Online.</h1>
          <p className="lede">
            Trang này mô tả các điều kiện sử dụng dịch vụ, quyền và trách nhiệm của
            người dùng khi truy cập và sử dụng Trường Điểm Online.
          </p>
          <div className="hero-actions">
            <Link href="/privacy" className="secondary-link">
              Xem chính sách quyền riêng tư
            </Link>
            <Link href="/data-deletion" className="secondary-link">
              Xem hướng dẫn xóa dữ liệu
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Tóm tắt nhanh</h2>
          <ul>
            <li>
              <span>Dịch vụ</span>
              <strong>Học tập, làm bài kiểm tra và theo dõi tiến độ</strong>
            </li>
            <li>
              <span>Tài khoản</span>
              <strong>Số điện thoại hoặc phương thức đăng nhập được hỗ trợ</strong>
            </li>
            <li>
              <span>Sử dụng hợp lệ</span>
              <strong>Chỉ cho mục đích học tập và không lạm dụng hệ thống</strong>
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
          {termsSections.map((section) => (
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
