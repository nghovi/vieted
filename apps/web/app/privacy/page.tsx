import Link from "next/link";

const policySections = [
  {
    title: "1. Phạm vi áp dụng",
    body: "Chính sách quyền riêng tư này áp dụng cho website và ứng dụng di động của TruongHoc tại truonghoc.online, bao gồm các chức năng đăng nhập, học tập, làm bài kiểm tra, theo dõi tiến độ và quản lý hồ sơ học sinh.",
  },
  {
    title: "2. Dữ liệu được thu thập",
    body: "TruongHoc có thể thu thập và lưu trữ các dữ liệu cần thiết để vận hành dịch vụ, bao gồm số điện thoại đăng nhập, mật khẩu đã mã hóa, biệt danh, ảnh đại diện, lớp học, môn học, chương học đã chọn, lịch sử học tập, kết quả kiểm tra và các dữ liệu kỹ thuật phục vụ bảo mật và vận hành hệ thống.",
  },
  {
    title: "3. Mục đích xử lý dữ liệu",
    body: "Dữ liệu được sử dụng để tạo và quản lý tài khoản học sinh, xác thực đăng nhập, lưu tiến độ học tập, hiển thị kết quả bài làm, cung cấp chức năng đánh giá, cải thiện chất lượng sản phẩm và bảo đảm an toàn, ổn định của dịch vụ.",
  },
  {
    title: "4. Cơ sở và cách thức sử dụng",
    body: "TruongHoc chỉ xử lý dữ liệu trong phạm vi cần thiết để cung cấp dịch vụ học tập và vận hành tài khoản. Dữ liệu không được sử dụng cho mục đích ngoài phạm vi dịch vụ nếu chưa có căn cứ phù hợp hoặc chưa có thông báo bổ sung tới người dùng.",
  },
  {
    title: "5. Bảo mật thông tin",
    body: "TruongHoc áp dụng các biện pháp kỹ thuật và tổ chức phù hợp để bảo vệ dữ liệu người dùng, bao gồm mã hóa mật khẩu, kiểm soát phiên đăng nhập và giới hạn truy cập dữ liệu. Tuy vậy, không có hệ thống nào bảo đảm an toàn tuyệt đối, vì vậy người dùng cần bảo mật thông tin đăng nhập của mình.",
  },
  {
    title: "6. Chia sẻ dữ liệu",
    body: "TruongHoc không bán dữ liệu cá nhân của học sinh. Dữ liệu chỉ được chia sẻ trong phạm vi cần thiết để lưu trữ, bảo trì, bảo mật, vận hành hệ thống hoặc đáp ứng yêu cầu pháp lý hợp lệ.",
  },
  {
    title: "7. Lưu trữ dữ liệu",
    body: "Dữ liệu tài khoản và dữ liệu học tập được lưu trong thời gian cần thiết để duy trì tài khoản, cung cấp lịch sử học tập, đánh giá tiến độ và đáp ứng các yêu cầu vận hành hoặc nghĩa vụ pháp lý liên quan.",
  },
  {
    title: "8. Quyền của người dùng",
    body: "Người dùng có thể xem, cập nhật một số thông tin hồ sơ như biệt danh, ảnh đại diện và mật khẩu trong phần Hồ sơ. Khi cần hỗ trợ thêm về tài khoản hoặc dữ liệu, người dùng có thể liên hệ qua truonghoc.online.",
  },
  {
    title: "9. Dữ liệu học tập",
    body: "Kết quả bài kiểm tra, thời gian làm bài và tiến độ học tập được lưu để hiển thị báo cáo, biểu đồ tiến bộ, phần đánh giá và các gợi ý học tập phù hợp với từng học sinh.",
  },
  {
    title: "10. Thay đổi chính sách",
    body: "TruongHoc có thể cập nhật chính sách này theo thời gian để phản ánh thay đổi về sản phẩm, công nghệ hoặc yêu cầu pháp lý. Phiên bản mới nhất sẽ được đăng tại trang này và có hiệu lực kể từ thời điểm được công bố.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <main className="page-shell">
      <section className="hero auth-hero">
        <div className="hero-copy">
          <p className="eyebrow">Chính sách quyền riêng tư</p>
          <h1>Chính sách quyền riêng tư dành cho website và ứng dụng của TruongHoc.</h1>
          <p className="lede">
            Trang này mô tả cách TruongHoc thu thập, sử dụng, lưu trữ và bảo vệ dữ liệu
            của học sinh và người dùng khi sử dụng dịch vụ tại truonghoc.online.
          </p>
          <div className="hero-actions">
            <Link href="/login" className="secondary-link">
              Về đăng nhập
            </Link>
            <Link href="/" className="secondary-link">
              Về trang chủ
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Thông tin chính</h2>
          <ul>
            <li>
              <span>Đơn vị dịch vụ</span>
              <strong>TruongHoc tại truonghoc.online</strong>
            </li>
            <li>
              <span>Dữ liệu tài khoản</span>
              <strong>Số điện thoại, mật khẩu đã mã hóa, hồ sơ người dùng</strong>
            </li>
            <li>
              <span>Dữ liệu học tập</span>
              <strong>Lớp học, môn học, chương học, kết quả và tiến độ</strong>
            </li>
            <li>
              <span>Cập nhật</span>
              <strong>Phiên bản mới nhất luôn được công bố tại trang này</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="policy-layout">
          {policySections.map((section) => (
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
