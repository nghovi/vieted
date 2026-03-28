import Link from "next/link";
import { getServerSelectedEnglishChapter, getServerSessionStudent } from "@/lib/auth";
import {
  getEnglishChapterLevelStatuses,
  getEnglishChapterByIdFromDb,
  getEnglishEvaluationOverview,
} from "@/lib/db";
import { grade9EnglishChapters } from "@/lib/english-grade-9";

const heroStats = [
  { label: "Khối lớp", value: "Lớp 9" },
  { label: "Môn học", value: "Tiếng Anh" },
  { label: "Lời hứa", value: "Sửa đúng lỗi sai để tiến bộ nhanh hơn" },
];

const learningLoop = [
  {
    title: "Chẩn đoán điểm yếu",
    description:
      "Làm bài ngắn để biết em đang yếu ngữ pháp, từ vựng, đọc hiểu hay dạng bài nào.",
  },
  {
    title: "Giải thích bằng tiếng Việt",
    description:
      "Trường Điểm giải thích vì sao em sai và đưa ví dụ ngắn, dễ hiểu, đúng mức lớp 9.",
  },
  {
    title: "Luyện lại đúng chỗ",
    description:
      "Hệ thống tạo bộ bài luyện tiếp theo cho đúng kỹ năng đang kéo điểm của em xuống.",
  },
];

const unitThemeClassNames: Record<string, string> = {
  "unit-1-local-community": "level-node--local-community",
  "unit-2-city-life": "level-node--city-life",
  "unit-3-healthy-living-for-teens": "level-node--healthy-living",
  "unit-4-remembering-the-past": "level-node--remembering-the-past",
  "unit-5-our-experiences": "level-node--our-experiences",
};

export default async function HomePage() {
  const student = await getServerSessionStudent();
  const selectedEnglishChapterId = await getServerSelectedEnglishChapter();

  let selectedChapter =
    grade9EnglishChapters.find((chapter) => chapter.id === selectedEnglishChapterId) ??
    grade9EnglishChapters[0] ??
    null;
  let englishEvaluation = null;
  let levelStatuses = await getEnglishChapterLevelStatuses(
    student?.dbId ?? null,
    selectedEnglishChapterId,
  );

  try {
    const currentLevel =
      levelStatuses.find((level) => level.isCurrent) ??
      levelStatuses.find((level) => level.isUnlocked) ??
      levelStatuses[0];
    selectedChapter =
      (await getEnglishChapterByIdFromDb(currentLevel.chapterId)) ?? selectedChapter ?? null;
    englishEvaluation = student ? await getEnglishEvaluationOverview(student.dbId) : null;
  } catch (error) {
    console.error("Falling back to bundled English homepage content.", error);
  }

  if (!selectedChapter) {
    throw new Error("English chapters are not available.");
  }

  return (
    <main className="page-shell">
      <section className={`hero${student ? "" : " hero-guest"}`}>
        <div className="hero-copy">
          <p className="eyebrow">Trường Điểm TA9</p>
          <h1>Cải thiện tiếng Anh lớp 9 nhanh hơn với AI sửa đúng lỗi sai.</h1>
          <p className="lede">
            Học đúng trọng tâm, sửa đúng lỗi sai, mở dần từng unit để tiến bộ vững
            hơn mỗi ngày.
          </p>
          {student ? (
            <div className="session-banner">
              <strong>Đã đăng nhập</strong>
              <span>Tiếp tục lộ trình Tiếng Anh lớp 9.</span>
            </div>
          ) : null}
          <div className="hero-actions">
            {student ? (
              <>
                <Link
                  href={`/english/grade-9/${selectedChapter.id}/learn`}
                  className="primary-link"
                >
                  Tiếp tục học
                </Link>
                <Link href="/profile" className="secondary-link">
                  Hồ sơ
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="primary-link">
                  Bắt đầu ngay
                </Link>
              </>
            )}
          </div>
          <p className="legal-links">
            <Link href="/terms">Điều khoản dịch vụ</Link>
            <span>•</span>
            <Link href="/privacy">Chính sách quyền riêng tư</Link>
          </p>
        </div>

        <div className="hero-card">
          <h2>Dành riêng cho em</h2>
          <ul>
            {heroStats.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Bản đồ cấp độ</p>
          <h2>Đi từng unit, mở dần từng chặng.</h2>
        </div>
        <div className="feature-card level-map-card">
          <div className="level-map-shell">
            {levelStatuses.map((level, index) => (
              <div key={level.chapterId} className="level-node-wrap">
                <div
                  className={[
                    "level-node",
                    unitThemeClassNames[level.chapterId] ?? "",
                    level.isCurrent ? "is-current" : "",
                    level.isCompleted ? "is-complete" : "",
                    level.isUnlocked ? "is-unlocked" : "is-locked",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <div className="level-node-copy">
                    <strong>{level.title}</strong>
                    <span>
                      {level.isCompleted
                        ? "Đã vượt ải"
                        : level.isUnlocked
                          ? "Đang mở"
                          : "Chưa mở khóa"}
                    </span>
                  </div>
                </div>
                {index < levelStatuses.length - 1 ? (
                  <div
                    className={`level-node-link${
                      level.isCompleted ? " is-complete" : ""
                    }`}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            ))}
          </div>
          <div className="level-map-footer">
            <div>
              <h3>{selectedChapter.title}</h3>
              <p>
                Hoàn thành <strong>{levelStatuses.find((level) => level.isCurrent)?.gateSetTitle}</strong>{" "}
                và đạt ít nhất 80% ở mọi kỹ năng để mở cấp tiếp theo.
              </p>
              <p>
                Tiến độ hiện tại:{" "}
                {levelStatuses.find((level) => level.isCurrent)?.masteredSkillCount}/
                {levelStatuses.find((level) => level.isCurrent)?.requiredSkillCount} kỹ năng đạt
                chuẩn • Bài chốt tốt nhất:{" "}
                {levelStatuses.find((level) => level.isCurrent)?.gateBestScore !== null
                  ? `${levelStatuses.find((level) => level.isCurrent)?.gateBestScore}%`
                  : "Chưa có"}
              </p>
            </div>
            <div className="inline-actions">
              <Link
                href={`/english/grade-9/${selectedChapter.id}`}
                className="primary-link"
              >
                Vào cấp hiện tại
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Unit đang mở</p>
          <h2>Tiếp tục bài học em đang chinh phục.</h2>
        </div>
        <div className="feature-card chapter-feature">
          <h3>{selectedChapter.title}</h3>
          <p>{selectedChapter.summary}</p>
          <div className="inline-actions">
            <Link
              href={`/english/grade-9/${selectedChapter.id}/learn`}
              className="primary-link"
            >
              Học bài này
            </Link>
            <Link
              href={`/english/grade-9/${selectedChapter.id}/test`}
              className="secondary-link"
            >
              Làm bài ngắn
            </Link>
            <Link
              href={`/english/grade-9/${selectedChapter.id}/review`}
              className="secondary-link"
            >
              Xem đánh giá
            </Link>
          </div>
        </div>
      </section>

      <section id="focus" className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Cách học trên Trường Điểm</p>
          <h2>Học gọn hơn, hiểu chắc hơn, ôn đúng chỗ hơn.</h2>
        </div>
        <div className="grid">
          {learningLoop.map((item) => (
            <article key={item.title} className="feature-card">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Tiến độ học tập</p>
          <h2>
            {student
              ? "Xem rõ em đang tiến bộ như thế nào."
              : "Bắt đầu học để lưu lại tiến độ của em."}
          </h2>
        </div>
        {student && englishEvaluation ? (
          <div className="grid">
            <article className="feature-card">
              <h3>Tổng quan</h3>
              <p>
                Hoàn thành học {englishEvaluation.completedLearningChapters}/
                {englishEvaluation.totalChapters} bài.
              </p>
              <p>
                Đã làm {englishEvaluation.attemptedSets}/{englishEvaluation.totalSets} bộ
                kiểm tra.
              </p>
            </article>
            <article className="feature-card">
              <h3>Điểm số</h3>
              <p>
                Điểm trung bình:{" "}
                {englishEvaluation.averageScore !== null
                  ? `${englishEvaluation.averageScore}%`
                  : "Chưa có dữ liệu"}
              </p>
              <p>
                Bài tốt nhất: {englishEvaluation.strongestChapter ?? "Chưa xác định"}
              </p>
            </article>
            <article className="feature-card">
              <h3>Cần ưu tiên</h3>
              <p>
                Nên xem lại:{" "}
                {englishEvaluation.needsAttentionChapter ?? "Chưa có dữ liệu kiểm tra"}
              </p>
              <p>Vào mục Đánh giá để thấy bộ bài nào cần làm lại trước.</p>
            </article>
          </div>
        ) : (
          <div className="feature-card chapter-feature">
            <h3>Bắt đầu từ một bài ngắn</h3>
            <p>
              Sau bài học và bài kiểm tra đầu tiên, Trường Điểm sẽ bắt đầu ghi nhớ
              điểm yếu và gợi ý bài luyện tiếp theo cho em.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
