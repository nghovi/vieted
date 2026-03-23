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
import { grade9EnglishChapters } from "@/lib/english-grade-9";
import { grade9GeographyChapters } from "@/lib/geography-grade-9";
import { grade9HistoryChapters } from "@/lib/history-grade-9";
import { EnglishChapterForm } from "./english-chapter-form";
import { GeographyChapterForm } from "./geography-chapter-form";
import { HistoryChapterForm } from "./history-chapter-form";
import { StudyPreferencesForm } from "./study-preferences-form";

const quickStats = [
  { label: "Khối lớp bắt đầu", value: "Lớp 9" },
  { label: "Môn học trọng tâm", value: "Lịch sử, Toán, Ngữ văn, Tiếng Anh" },
  { label: "Chế độ học", value: "Học, kiểm tra, đánh giá" },
];

const previewSubjectContent: Record<
  string,
  {
    title: string;
    summary: string;
    eyebrow: string;
    heading: string;
  }
> = {
  math: {
    title: "Toán lớp 9 đang được hoàn thiện",
    summary:
      "Lộ trình bài học, bài luyện và đánh giá cho Toán đang được chuẩn bị để mở tiếp theo.",
    eyebrow: "Khởi đầu với Toán 9",
    heading: "Nội dung Toán lớp 9 sẽ được mở trong các bản cập nhật tới.",
  },
  literature: {
    title: "Ngữ văn lớp 9 đang được hoàn thiện",
    summary:
      "Các bài học đọc hiểu, tiếng Việt và làm văn đang được xây dựng để mở tiếp theo.",
    eyebrow: "Khởi đầu với Ngữ văn 9",
    heading: "Nội dung Ngữ văn lớp 9 sẽ được mở trong các bản cập nhật tới.",
  },
};

const focusAreas = [
  {
    title: "Học theo chương",
    description: "Vào thẳng bài học đúng môn và đúng chương đang cần ôn.",
  },
  {
    title: "Làm bài ngắn",
    description: "Kiểm tra nhanh sau khi học để biết mình hiểu tới đâu.",
  },
  {
    title: "Xem tiến độ",
    description: "Theo dõi kết quả theo từng chương để ôn lại đúng chỗ.",
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
  let chapterChoices = grade9HistoryChapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
  }));
  let geographyChapterChoices = grade9GeographyChapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
  }));
  let englishChapterChoices = grade9EnglishChapters.map((chapter) => ({
    id: chapter.id,
    title: chapter.title,
  }));
  let selectedHistoryChapter =
    grade9HistoryChapters.find((chapter) => chapter.id === selectedHistoryChapterId) ??
    grade9HistoryChapters[0] ??
    null;
  let selectedGeographyChapter =
    grade9GeographyChapters.find((chapter) => chapter.id === selectedGeographyChapterId) ??
    grade9GeographyChapters[0] ??
    null;
  let selectedEnglishChapter =
    grade9EnglishChapters.find((chapter) => chapter.id === selectedEnglishChapterId) ??
    grade9EnglishChapters[0] ??
    null;
  const subjectLabel =
    subjectLabels[preference.currentSubject] ?? preference.currentSubject;
  let historyEvaluation = null;
  let geographyEvaluation = null;
  let englishEvaluation = null;

  try {
    chapterChoices = (await listHistoryChaptersFromDb()).map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
    }));
    geographyChapterChoices = (await listGeographyChaptersFromDb()).map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
    }));
    englishChapterChoices = (await listEnglishChaptersFromDb()).map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
    }));
    selectedHistoryChapter =
      (await getHistoryChapterByIdFromDb(selectedHistoryChapterId)) ??
      selectedHistoryChapter ??
      null;
    selectedGeographyChapter =
      (await getGeographyChapterByIdFromDb(selectedGeographyChapterId)) ??
      selectedGeographyChapter ??
      null;
    selectedEnglishChapter =
      (await getEnglishChapterByIdFromDb(selectedEnglishChapterId)) ??
      selectedEnglishChapter ??
      null;
    historyEvaluation = student ? await getHistoryEvaluationOverview(student.dbId) : null;
    geographyEvaluation = student ? await getGeographyEvaluationOverview(student.dbId) : null;
    englishEvaluation = student ? await getEnglishEvaluationOverview(student.dbId) : null;
  } catch (error) {
    console.error("Falling back to bundled homepage content because DB is unavailable.", error);
  }
  const selectedChapter =
    preference.currentSubject === "history"
      ? selectedHistoryChapter
      : preference.currentSubject === "english"
        ? selectedEnglishChapter
        : null;
  const selectedChapters =
    preference.currentSubject === "history"
      ? chapterChoices
      : preference.currentSubject === "english"
        ? englishChapterChoices
        : [];
  const selectedEvaluation =
    preference.currentSubject === "history"
      ? historyEvaluation
      : preference.currentSubject === "english"
        ? englishEvaluation
        : null;
  const subjectEyebrow =
    preference.currentSubject === "history"
      ? "Khởi đầu với Lịch sử 9"
      : preference.currentSubject === "english"
        ? "Khởi đầu với Tiếng Anh 9"
        : previewSubjectContent[preference.currentSubject]?.eyebrow ??
          "Môn học đang hoàn thiện";
  const subjectHeading =
    preference.currentSubject === "history"
      ? "Chủ đề mở đầu cho học sinh lớp 9 môn Lịch sử."
      : preference.currentSubject === "english"
        ? "Bài học mở đầu cho học sinh lớp 9 môn Tiếng Anh."
        : previewSubjectContent[preference.currentSubject]?.heading ??
          "Nội dung môn học đang được cập nhật.";
  const subjectBasePath =
    preference.currentSubject === "history"
      ? "/history/grade-9"
      : "/english/grade-9";
  const isLoggedIn = Boolean(student);
  const isLiveSubject =
    preference.currentSubject === "history" ||
    preference.currentSubject === "english";

  if (isLiveSubject && !selectedChapter) {
    throw new Error("Subject chapters are not available.");
  }

  return (
    <main className="page-shell">
      <section className={`hero${isLoggedIn ? "" : " hero-guest"}`}>
        <div className="hero-copy">
          <p className="eyebrow">Trường Điểm Online</p>
          <h1>Học đúng môn, đúng chương, có bài luyện và đánh giá.</h1>
          <p className="lede">
            {isLoggedIn
              ? "Tiếp tục lộ trình học của em với môn đang chọn, bài học hiện tại và kết quả mới nhất."
              : "Đăng nhập để chọn môn, lưu tiến độ và bắt đầu học ngay."}
          </p>
          {student ? (
            <div className="session-banner">
              <strong>{student.fullName}</strong>
              <span>
                Lớp {student.grade} • {student.contactLabel}
              </span>
            </div>
          ) : null}
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
          </div>
        </div>

        {isLoggedIn ? (
          <div className="hero-card">
            <h2>Học tập hiện tại</h2>
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
            <StudyPreferencesForm
              initialGrade={preference.currentGrade}
              initialSubject={preference.currentSubject}
            />
          </div>
        ) : (
          <div className="hero-card hero-card-compact">
            <h2>Bắt đầu nhanh</h2>
            <ul>
              {quickStats.map((item) => (
                <li key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {isLoggedIn ? (
        <>
          <section className="content-section">
            <div className="section-heading">
              <p className="eyebrow">{subjectEyebrow}</p>
              <h2>{subjectHeading}</h2>
            </div>
            <div className="feature-card chapter-feature">
              {isLiveSubject && selectedChapter ? (
                <>
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
                  {preference.currentSubject === "history" ? (
                    <HistoryChapterForm
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
                  )}
                </>
              ) : (
                <>
                  <h3>
                    {previewSubjectContent[preference.currentSubject]?.title ??
                      "Môn học đang được hoàn thiện"}
                  </h3>
                  <p>
                    {previewSubjectContent[preference.currentSubject]?.summary ??
                      "Nội dung môn học này sẽ được bổ sung sớm."}
                  </p>
                  <p className="helper-copy">
                    Hiện tại trải nghiệm đầy đủ đang có cho Lịch sử và Tiếng Anh.
                  </p>
                </>
              )}
            </div>
            <div className="grid">
              <article className="feature-card">
                <h3>Học</h3>
                <p>Tóm tắt nhanh, ý chính và nội dung cần nhớ của chương.</p>
              </article>
              <article className="feature-card">
                <h3>Kiểm tra</h3>
                <p>Bộ câu hỏi ngắn để tự kiểm tra sau khi học.</p>
              </article>
              <article className="feature-card">
                <h3>Đánh giá</h3>
                <p>Xem lại điểm mạnh và phần cần ôn thêm theo từng chương.</p>
              </article>
            </div>
          </section>

          <section className="content-section">
            <div className="section-heading">
              <p className="eyebrow">Đánh giá tiến độ</p>
              <h2>Kết quả học tập hiện tại.</h2>
            </div>
            {selectedEvaluation && isLiveSubject ? (
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
                  <p>Vào mục Đánh giá của từng chương để xem chi tiết hơn.</p>
                </article>
              </div>
            ) : (
              <div className="feature-card chapter-feature">
                <h3>{isLiveSubject ? "Chưa có đánh giá" : "Đánh giá sẽ mở cùng môn học"}</h3>
                <p>
                  {isLiveSubject
                    ? "Làm bài kiểm tra để bắt đầu theo dõi tiến độ."
                    : "Toán và Ngữ văn đang được chuẩn bị nội dung trước khi mở hệ thống đánh giá."}
                </p>
              </div>
            )}
          </section>
        </>
      ) : null}

      <section id="focus" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Cách học trên Trường Điểm</p>
          <h2>Ngắn gọn, rõ ràng, đi theo từng bước.</h2>
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
