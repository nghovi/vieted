import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import {
  canStudentAccessEnglishChapter,
  getEnglishChapterByIdFromDb,
  getEnglishChapterEvaluation,
  listDueEnglishReviewItems,
} from "@/lib/db";
import { EnglishReviewSetList } from "./review-set-list";

type Props = {
  params: Promise<{ chapterId: string }>;
};

export default async function EnglishReviewPage({ params }: Props) {
  const { chapterId } = await params;
  const student = await getServerSessionStudent();
  if (!student) redirect("/login");
  const access = await canStudentAccessEnglishChapter(student.dbId, chapterId);
  if (!access?.isUnlocked) redirect("/");

  const chapter = await getEnglishChapterByIdFromDb(chapterId);
  const evaluation = await getEnglishChapterEvaluation(student.dbId, chapterId);
  const dueReviewItems = await listDueEnglishReviewItems(student.dbId, chapterId);
  if (!chapter || !evaluation) notFound();

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Đánh giá theo bài</p>
          <h1>{chapter.title}</h1>
          <p className="lede">Xem lại trạng thái học và kết quả các bộ kiểm tra của bài này.</p>
          <div className="hero-actions">
            <Link href={`/english/grade-9/${chapterId}/learn`} className="primary-link">Xem lại phần học</Link>
            <Link href={`/english/grade-9/${chapterId}/test`} className="secondary-link">Sang kiểm tra</Link>
            <Link href={`/english/grade-9/${chapterId}`} className="secondary-link">Về bài học</Link>
          </div>
        </div>
        <div className="hero-card">
          <h2>Tổng quan đánh giá</h2>
          <ul>
            <li><span>Đã làm</span><strong>{evaluation.attemptedSets}/{evaluation.totalSets} bộ</strong></li>
            <li><span>Điểm trung bình</span><strong>{evaluation.averageScore !== null ? `${evaluation.averageScore}%` : "Chưa có dữ liệu"}</strong></li>
            <li><span>Điểm cao nhất</span><strong>{evaluation.bestScore !== null ? `${evaluation.bestScore}%` : "Chưa có dữ liệu"}</strong></li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        {dueReviewItems.length > 0 ? (
          <>
            <div className="section-heading">
              <p className="eyebrow">Ôn tập theo SRS</p>
              <h2>Những kỹ năng đến hạn ôn hôm nay.</h2>
            </div>
            <div className="question-set">
              {dueReviewItems.map((item) => (
                <article
                  key={`${item.chapterId}-${item.skillCode}`}
                  className="feature-card"
                >
                  <h3>{item.skillLabel}</h3>
                  <p>
                    Chu kỳ hiện tại: {item.intervalDays} ngày • số lần nhớ lại:{" "}
                    {item.reps}
                  </p>
                  <p>
                    Lần gần nhất:{" "}
                    {item.lastResult === "wrong"
                      ? "Em vẫn còn nhầm ở kỹ năng này."
                      : "Em đã trả lời đúng nhưng cần củng cố thêm."}
                  </p>
                  <div className="inline-actions">
                    <Link
                      href={`/english/grade-9/${chapterId}/test`}
                      className="secondary-link"
                    >
                      Vào làm bài ôn
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </>
        ) : null}

        <EnglishReviewSetList chapterId={chapterId} setResults={evaluation.setResults} />
      </section>
    </main>
  );
}
