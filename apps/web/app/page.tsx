import Link from "next/link";
import {
  getServerSelectedHistoryChapter,
  getServerSessionStudent,
  getServerStudyPreference,
} from "@/lib/auth";
import {
  getHistoryChapterByIdFromDb,
  getHistoryEvaluationOverview,
  listHistoryChaptersFromDb,
} from "@/lib/db";
import { HistoryChapterForm } from "./history-chapter-form";
import { StudyPreferencesForm } from "./study-preferences-form";

const quickStats = [
  { label: "Khối lớp bắt đầu", value: "Lớp 9" },
  { label: "Môn học đầu tiên", value: "Lịch sử" },
  { label: "Chế độ học", value: "Học, kiểm tra, đánh giá" },
];

const focusAreas = [
  {
    title: "Học theo chủ đề",
    description:
      "Học sinh chọn lớp, lưu môn học hiện tại, sau đó nhận bài học đúng bối cảnh và chương trình.",
  },
  {
    title: "Luyện tập có phản hồi",
    description:
      "Quiz ngắn với giải thích sai ở đâu, gợi ý cách sửa và kỹ năng cần xem lại.",
  },
  {
    title: "Đánh giá tiến độ",
    description:
      "Học sinh xem kết quả học và kiểm tra theo từng chương để biết phần nào đã chắc, phần nào cần cải thiện.",
  },
];

const roadmap = [
  "Đăng nhập bằng số điện thoại và mật khẩu cho cả web và Flutter",
  "Lưu lớp hiện tại từ 1 đến 12 và môn học đang học",
  "Bản đồ chủ đề Lịch sử lớp 9 để bắt đầu nhanh và dễ đo lường",
  "Trợ lý AI bằng tiếng Việt, ưu tiên gợi ý trước khi đưa đáp án",
  "Bảng đánh giá tiến độ cho học sinh và tổng kết hằng tuần cho phụ huynh",
];

const subjectLabels: Record<string, string> = {
  history: "Lịch sử",
  math: "Toán",
  english: "Tiếng Anh",
  literature: "Ngữ văn",
  physics: "Vật lý",
  chemistry: "Hóa học",
};

export default async function HomePage() {
  const student = await getServerSessionStudent();
  const preference = await getServerStudyPreference();
  const selectedHistoryChapterId = await getServerSelectedHistoryChapter();
  const chapters = await listHistoryChaptersFromDb();
  const selectedHistoryChapter =
    (await getHistoryChapterByIdFromDb(selectedHistoryChapterId)) ??
    (chapters[0]
      ? await getHistoryChapterByIdFromDb(chapters[0].id)
      : null);
  const subjectLabel =
    subjectLabels[preference.currentSubject] ?? preference.currentSubject;
  const historyEvaluation =
    student ? await getHistoryEvaluationOverview(student.dbId) : null;

  if (!selectedHistoryChapter) {
    throw new Error("History chapters are not available.");
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">VietEd MVP</p>
          <h1>Nền tảng học tập có AI cho học sinh Việt Nam, thiết kế cho thói quen học thật.</h1>
          <p className="lede">
            Chúng ta bắt đầu với Lịch sử lớp 9: học sinh lưu lớp hiện tại, chọn
            môn muốn học, rồi đi vào luồng bài học, kiểm tra và đánh giá có cấu trúc.
          </p>
          {student ? (
            <div className="session-banner">
              <strong>{student.fullName}</strong>
              <span>
                Lớp {student.grade} • {student.phoneNumber}
              </span>
            </div>
          ) : (
            <div className="session-banner">
              <strong>Chưa đăng nhập</strong>
              <span>Đăng nhập bằng số điện thoại để lưu tiến độ học tập.</span>
            </div>
          )}
          <div className="hero-actions">
            <Link href="/login" className="primary-link">
              {student ? "Vào tài khoản" : "Đăng nhập"}
            </Link>
            <a href="#focus" className="secondary-link">
              Luồng học tập
            </a>
          </div>
        </div>

        <div className="hero-card">
          <h2>Cấu hình học tập hiện tại</h2>
          <ul>
            <li>
              <span>Lớp đã lưu</span>
              <strong>Lớp {preference.currentGrade}</strong>
            </li>
            <li>
              <span>Môn đang học</span>
              <strong>{subjectLabel}</strong>
            </li>
            {quickStats.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
          {student ? (
            <StudyPreferencesForm
              initialGrade={preference.currentGrade}
              initialSubject={preference.currentSubject}
            />
          ) : (
            <p className="helper-copy">
              Đăng nhập trước để lưu lớp hiện tại và môn học.
            </p>
          )}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Khởi đầu với Lịch sử 9</p>
          <h2>Chủ đề mở đầu cho học sinh lớp 9 môn Lịch sử.</h2>
        </div>
        <div className="feature-card chapter-feature">
          <h3>Chương đang chọn</h3>
          <p>{selectedHistoryChapter.title}</p>
          <p>{selectedHistoryChapter.summary}</p>
          <div className="inline-actions">
            <Link
              href={`/history/grade-9/${selectedHistoryChapter.id}/learn`}
              className="secondary-link"
            >
              Học
            </Link>
            <Link
              href={`/history/grade-9/${selectedHistoryChapter.id}/test`}
              className="secondary-link"
            >
              Kiểm tra
            </Link>
            <Link
              href={`/history/grade-9/${selectedHistoryChapter.id}/review`}
              className="secondary-link"
            >
              Đánh giá
            </Link>
          </div>
          {student ? (
            <HistoryChapterForm
              initialChapterId={selectedHistoryChapter.id}
              chapters={chapters.map((chapter) => ({
                id: chapter.id,
                title: chapter.title,
              }))}
            />
          ) : (
            <p className="helper-copy">
              Đăng nhập để lưu chương học và xem bộ câu hỏi trên server.
            </p>
          )}
        </div>
        <div className="grid">
          <article className="feature-card">
            <h3>Học</h3>
            <p>
              Bắt đầu từ tóm tắt chương, các ý chính cần nhớ và cách ghi mốc thời gian.
            </p>
          </article>
          <article className="feature-card">
            <h3>Kiểm tra</h3>
            <p>
              Mỗi chương có nhiều bộ câu hỏi trắc nghiệm, dùng để tự đánh giá sau khi học.
            </p>
          </article>
          <article className="feature-card">
            <h3>Đánh giá</h3>
            <p>
              Xem kết quả học và kiểm tra theo chương, biết ngay điểm mạnh và phần cần làm lại.
            </p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Đánh giá tiến độ</p>
          <h2>Kết quả học tập hiện tại của học sinh.</h2>
        </div>
        {student && historyEvaluation ? (
          <div className="grid">
            <article className="feature-card">
              <h3>Tổng quan</h3>
              <p>
                Hoàn thành học {historyEvaluation.completedLearningChapters}/
                {historyEvaluation.totalChapters} chương.
              </p>
              <p>
                Đã làm {historyEvaluation.attemptedSets}/
                {historyEvaluation.totalSets} bộ kiểm tra.
              </p>
            </article>
            <article className="feature-card">
              <h3>Điểm số</h3>
              <p>
                Điểm trung bình:{" "}
                {historyEvaluation.averageScore !== null
                  ? `${historyEvaluation.averageScore}%`
                  : "Chưa có dữ liệu"}
              </p>
              <p>
                Chương tốt nhất: {historyEvaluation.strongestChapter ?? "Chưa xác định"}
              </p>
            </article>
            <article className="feature-card">
              <h3>Cần chú ý</h3>
              <p>
                Ưu tiên xem lại:{" "}
                {historyEvaluation.needsAttentionChapter ?? "Chưa có dữ liệu kiểm tra"}
              </p>
              <p>
                Hãy vào mục Đánh giá của từng chương để xem chi tiết từng bộ bài đã làm.
              </p>
            </article>
          </div>
        ) : (
          <div className="feature-card chapter-feature">
            <h3>Chưa có đánh giá</h3>
            <p>Đăng nhập để xem kết quả học tập và kiểm tra theo từng chương.</p>
          </div>
        )}
      </section>

      <section id="focus" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Vòng lặp học tập cốt lõi</p>
          <h2>Giữ trải nghiệm có cấu trúc, không như một khung chat trống.</h2>
        </div>
        <div className="grid">
          {focusAreas.map((item) => (
            <article key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="roadmap" className="content-section roadmap">
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
