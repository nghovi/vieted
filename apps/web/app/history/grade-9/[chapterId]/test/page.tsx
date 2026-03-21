import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import {
  getHistoryChapterByIdFromDb,
  getHistoryChapterEvaluation,
  listHistoryQuestionSetsWithProgress,
} from "@/lib/db";

type Props = {
  params: Promise<{
    chapterId: string;
  }>;
};

export default async function HistoryChapterTestPage({ params }: Props) {
  const { chapterId } = await params;
  const student = await getServerSessionStudent();

  if (!student) {
    redirect("/login");
  }

  const chapter = await getHistoryChapterByIdFromDb(chapterId);
  const testSets = await listHistoryQuestionSetsWithProgress(student.dbId, chapterId);
  const evaluation = await getHistoryChapterEvaluation(student.dbId, chapterId);

  if (!chapter || !testSets || !evaluation) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Kiểm tra theo chương</p>
          <h1>{chapter.title}</h1>
          <p className="lede">
            Chọn một bộ câu hỏi để làm hoặc làm lại. Hệ thống sẽ lưu lần làm gần nhất,
            điểm tốt nhất và trạng thái tiến bộ của từng bộ.
          </p>
          <div className="hero-actions">
            <Link href={`/history/grade-9/${chapterId}/learn`} className="secondary-link">
              Sang phần học
            </Link>
            <Link href={`/history/grade-9/${chapterId}/review`} className="secondary-link">
              Xem đánh giá chương
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Tổng quan kiểm tra</h2>
          <ul>
            <li>
              <span>Bộ đã làm</span>
              <strong>
                {evaluation.attemptedSets}/{evaluation.totalSets}
              </strong>
            </li>
            <li>
              <span>Điểm trung bình</span>
              <strong>
                {evaluation.averageScore !== null
                  ? `${evaluation.averageScore}%`
                  : "Chưa có dữ liệu"}
              </strong>
            </li>
            <li>
              <span>Lần hoạt động gần nhất</span>
              <strong>
                {evaluation.lastActivityAt
                  ? new Date(evaluation.lastActivityAt).toLocaleString("vi-VN")
                  : "Chưa có"}
              </strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Danh sách bộ kiểm tra</p>
          <h2>Chọn bộ câu hỏi để làm mới hoặc làm lại.</h2>
        </div>

        <div className="question-set">
          {testSets.map((set) => (
            <article key={set.setId} className="feature-card">
              <div className="test-toolbar">
                <div>
                  <h3>{set.setTitle}</h3>
                  <p>{set.questionCount} câu trắc nghiệm</p>
                </div>
                <span className="test-progress-badge">{set.masteryLabel}</span>
              </div>

              <div className="test-stats">
                <p>Số lần làm: {set.attempts}</p>
                <p>
                  Điểm gần nhất:{" "}
                  {set.latestScore !== null ? `${set.latestScore}%` : "Chưa làm"}
                </p>
                <p>
                  Điểm cao nhất:{" "}
                  {set.bestScore !== null ? `${set.bestScore}%` : "Chưa có"}
                </p>
                <p>
                  Lần làm gần nhất:{" "}
                  {set.lastSubmittedAt
                    ? new Date(set.lastSubmittedAt).toLocaleString("vi-VN")
                    : "Chưa có"}
                </p>
              </div>

              <div className="inline-actions">
                <Link
                  href={`/history/grade-9/${chapterId}/test/${set.setId}`}
                  className="primary-link"
                >
                  {set.attempts > 0 ? "Làm lại" : "Làm bài"}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
