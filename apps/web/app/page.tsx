import Link from "next/link";
import {
  getServerSelectedEnglishChapter,
  getServerSelectedGeographyChapter,
  getServerSelectedHistoryChapter,
  getServerSessionStudent,
  getServerStudyPreference,
} from "@/lib/auth";
import {
  getEnglishChapterByIdFromDb,
  getEnglishEvaluationOverview,
  getGeographyChapterByIdFromDb,
  getGeographyEvaluationOverview,
  listEnglishChaptersFromDb,
  listGeographyChaptersFromDb,
  getHistoryChapterByIdFromDb,
  getHistoryEvaluationOverview,
  listHistoryChaptersFromDb,
} from "@/lib/db";
import { EnglishChapterForm } from "./english-chapter-form";
import { GeographyChapterForm } from "./geography-chapter-form";
import { HistoryChapterForm } from "./history-chapter-form";
import { StudyPreferencesForm } from "./study-preferences-form";

const quickStats = [
  { label: "Khối lớp bắt đầu", value: "Lớp 9" },
  { label: "Môn học đang hỗ trợ", value: "Lịch sử, Địa lí, Tiếng Anh" },
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

const subjectLabels: Record<string, string> = {
  history: "Lịch sử",
  geography: "Địa lí",
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
  const selectedGeographyChapterId = await getServerSelectedGeographyChapter();
  const selectedEnglishChapterId = await getServerSelectedEnglishChapter();
  const chapters = await listHistoryChaptersFromDb();
  const geographyChapters = await listGeographyChaptersFromDb();
  const englishChapters = await listEnglishChaptersFromDb();
  const selectedHistoryChapter =
    (await getHistoryChapterByIdFromDb(selectedHistoryChapterId)) ??
    (chapters[0]
      ? await getHistoryChapterByIdFromDb(chapters[0].id)
      : null);
  const selectedGeographyChapter =
    (await getGeographyChapterByIdFromDb(selectedGeographyChapterId)) ??
    (geographyChapters[0]
      ? await getGeographyChapterByIdFromDb(geographyChapters[0].id)
      : null);
  const selectedEnglishChapter =
    (await getEnglishChapterByIdFromDb(selectedEnglishChapterId)) ??
    (englishChapters[0]
      ? await getEnglishChapterByIdFromDb(englishChapters[0].id)
      : null);
  const subjectLabel =
    subjectLabels[preference.currentSubject] ?? preference.currentSubject;
  const historyEvaluation =
    student ? await getHistoryEvaluationOverview(student.dbId) : null;
  const geographyEvaluation =
    student ? await getGeographyEvaluationOverview(student.dbId) : null;
  const englishEvaluation =
    student ? await getEnglishEvaluationOverview(student.dbId) : null;
  const selectedChapter =
    preference.currentSubject === "history"
      ? selectedHistoryChapter
      : preference.currentSubject === "geography"
        ? selectedGeographyChapter
        : selectedEnglishChapter;
  const selectedChapters =
    preference.currentSubject === "history"
      ? chapters
      : preference.currentSubject === "geography"
        ? geographyChapters
        : englishChapters;
  const selectedEvaluation =
    preference.currentSubject === "history"
      ? historyEvaluation
      : preference.currentSubject === "geography"
        ? geographyEvaluation
        : englishEvaluation;
  const subjectEyebrow =
    preference.currentSubject === "history"
      ? "Khởi đầu với Lịch sử 9"
      : preference.currentSubject === "geography"
        ? "Khởi đầu với Địa lí 9"
        : "Khởi đầu với Tiếng Anh 9";
  const subjectHeading =
    preference.currentSubject === "history"
      ? "Chủ đề mở đầu cho học sinh lớp 9 môn Lịch sử."
      : preference.currentSubject === "geography"
        ? "Chủ đề mở đầu cho học sinh lớp 9 môn Địa lí."
        : "Bài học mở đầu cho học sinh lớp 9 môn Tiếng Anh.";
  const subjectBasePath =
    preference.currentSubject === "history"
      ? "/history/grade-9"
      : preference.currentSubject === "geography"
        ? "/geography/grade-9"
        : "/english/grade-9";

  if (!selectedChapter) {
    throw new Error("Subject chapters are not available.");
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">VietEd</p>
          <h1>Nền tảng học tập có AI cho học sinh Việt Nam, thiết kế cho thói quen học thật.</h1>
          <p className="lede">
            Học sinh lưu lớp hiện tại, chọn môn muốn học, rồi đi vào luồng bài học,
            kiểm tra và đánh giá có cấu trúc.
          </p>
          {student ? (
            <div className="session-banner">
              <strong>{student.fullName}</strong>
              <span>
                Lớp {student.grade} • {student.contactLabel}
              </span>
            </div>
          ) : (
            <div className="session-banner">
              <strong>Chưa đăng nhập</strong>
              <span>Đăng nhập hoặc đăng ký để lưu tiến độ học tập.</span>
            </div>
          )}
          <div className="hero-actions">
            <Link href="/login" className="primary-link">
              {student ? "Đổi tài khoản" : "Đăng nhập"}
            </Link>
            {!student ? (
              <Link href="/register" className="secondary-link">
                Đăng ký
              </Link>
            ) : null}
            {student ? (
              <Link href="/profile" className="secondary-link">
                Hồ sơ
              </Link>
            ) : null}
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
          <p className="eyebrow">{subjectEyebrow}</p>
          <h2>{subjectHeading}</h2>
        </div>
        <div className="feature-card chapter-feature">
          <h3>Chương đang chọn</h3>
          <p>{selectedChapter.title}</p>
          <p>{selectedChapter.summary}</p>
          <div className="inline-actions">
            <Link href={`${subjectBasePath}/${selectedChapter.id}/learn`} className="secondary-link">
              Học
            </Link>
            <Link href={`${subjectBasePath}/${selectedChapter.id}/test`} className="secondary-link">
              Kiểm tra
            </Link>
            <Link href={`${subjectBasePath}/${selectedChapter.id}/review`} className="secondary-link">
              Đánh giá
            </Link>
          </div>
          {student ? (
            preference.currentSubject === "history" ? (
              <HistoryChapterForm
                initialChapterId={selectedChapter.id}
                chapters={selectedChapters.map((chapter) => ({
                  id: chapter.id,
                  title: chapter.title,
                }))}
              />
            ) : preference.currentSubject === "geography" ? (
              <GeographyChapterForm
                initialChapterId={selectedChapter.id}
                chapters={selectedChapters.map((chapter) => ({
                  id: chapter.id,
                  title: chapter.title,
                }))}
              />
            ) : (
              <EnglishChapterForm
                initialChapterId={selectedChapter.id}
                chapters={selectedChapters.map((chapter) => ({
                  id: chapter.id,
                  title: chapter.title,
                }))}
              />
            )
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
        {student && selectedEvaluation ? (
          <div className="grid">
            <article className="feature-card">
              <h3>Tổng quan</h3>
              <p>
                Hoàn thành học {selectedEvaluation.completedLearningChapters}/
                {selectedEvaluation.totalChapters} chương.
              </p>
              <p>
                Đã làm {selectedEvaluation.attemptedSets}/
                {selectedEvaluation.totalSets} bộ kiểm tra.
              </p>
            </article>
            <article className="feature-card">
              <h3>Điểm số</h3>
              <p>
                Điểm trung bình:{" "}
                {selectedEvaluation.averageScore !== null
                  ? `${selectedEvaluation.averageScore}%`
                  : "Chưa có dữ liệu"}
              </p>
              <p>
                Chương tốt nhất: {selectedEvaluation.strongestChapter ?? "Chưa xác định"}
              </p>
            </article>
            <article className="feature-card">
              <h3>Cần chú ý</h3>
              <p>
                Ưu tiên xem lại:{" "}
                {selectedEvaluation.needsAttentionChapter ?? "Chưa có dữ liệu kiểm tra"}
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
    </main>
  );
}
