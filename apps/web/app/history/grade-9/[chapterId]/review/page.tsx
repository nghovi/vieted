import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import {
  getHistoryChapterByIdFromDb,
  getHistoryChapterEvaluation,
} from "@/lib/db";

type Props = {
  params: Promise<{
    chapterId: string;
  }>;
};

export default async function HistoryReviewPage({ params }: Props) {
  const { chapterId } = await params;
  const student = await getServerSessionStudent();

  if (!student) {
    redirect("/login");
  }

  const chapter = await getHistoryChapterByIdFromDb(chapterId);
  const evaluation = await getHistoryChapterEvaluation(student.dbId, chapterId);

  if (!chapter || !evaluation) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Đánh giá theo chương</p>
          <h1>{chapter.title}</h1>
          <p className="lede">
            Xem lại trạng thái học, kết quả các bộ kiểm tra và quyết định phần nào cần học
            lại hoặc làm lại.
          </p>
          <div className="hero-actions">
            <Link href={`/history/grade-9/${chapterId}/learn`} className="primary-link">
              Xem lại phần học
            </Link>
            <Link href={`/history/grade-9/${chapterId}/test`} className="secondary-link">
              Sang kiểm tra
            </Link>
            <Link href={`/history/grade-9/${chapterId}`} className="secondary-link">
              Về chương
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Tổng quan đánh giá</h2>
          <ul>
            <li>
              <span>Đã làm</span>
              <strong>
                {evaluation.attemptedSets}/{evaluation.totalSets} bộ
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
              <span>Điểm cao nhất</span>
              <strong>
                {evaluation.bestScore !== null
                  ? `${evaluation.bestScore}%`
                  : "Chưa có dữ liệu"}
              </strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Đánh giá</p>
          <h2>Xem lại kết quả học và kiểm tra của chương này.</h2>
        </div>

        <div className="grid">
          <article className="feature-card">
            <h3>Tiến độ học</h3>
            <p>
              Trạng thái:{" "}
              {evaluation.learnStatus === "completed"
                ? "Đã hoàn thành"
                : evaluation.learnStatus === "learning"
                  ? "Đang học"
                  : "Chưa bắt đầu"}
            </p>
            <p>
              Lần hoạt động gần nhất:{" "}
              {evaluation.lastActivityAt
                ? new Date(evaluation.lastActivityAt).toLocaleString("vi-VN")
                : "Chưa có"}
            </p>
          </article>
          <article className="feature-card">
            <h3>Kết quả kiểm tra</h3>
            <p>
              Đã làm {evaluation.attemptedSets}/{evaluation.totalSets} bộ.
            </p>
            <p>
              Điểm trung bình:{" "}
              {evaluation.averageScore !== null
                ? `${evaluation.averageScore}%`
                : "Chưa có dữ liệu"}
            </p>
            <p>
              Điểm cao nhất:{" "}
              {evaluation.bestScore !== null
                ? `${evaluation.bestScore}%`
                : "Chưa có dữ liệu"}
            </p>
          </article>
          <article className="feature-card">
            <h3>Nhận xét</h3>
            <p>
              {evaluation.averageScore === null
                ? "Hãy bắt đầu một bộ kiểm tra để hệ thống có dữ liệu đánh giá."
                : evaluation.averageScore >= 80
                  ? "Kết quả rất tốt. Em đã nắm khá chắc nội dung chương."
                  : evaluation.averageScore >= 60
                    ? "Kết quả ổn. Nên xem lại các ý chính rồi làm thêm một bộ kiểm tra."
                    : "Chương này cần được củng cố thêm. Nên học lại phần tóm tắt trước khi kiểm tra lại."}
            </p>
          </article>
        </div>

        <section className="content-section compact-section">
          <div className="section-heading">
            <p className="eyebrow">Chi tiết theo bộ</p>
            <h2>Kết quả từng bộ kiểm tra.</h2>
          </div>
          <div className="question-set">
            {evaluation.setResults.map((setResult) => (
              <article key={setResult.setId} className="feature-card">
                <h3>{setResult.setTitle}</h3>
                <p>Số lần làm: {setResult.attempts}</p>
                <p>
                  Điểm gần nhất:{" "}
                  {setResult.latestScore !== null
                    ? `${setResult.latestScore}%`
                    : "Chưa làm"}
                </p>
                <p>
                  Điểm cao nhất:{" "}
                  {setResult.bestScore !== null
                    ? `${setResult.bestScore}%`
                    : "Chưa có"}
                </p>
                <p>
                  Lần làm gần nhất:{" "}
                  {setResult.lastSubmittedAt
                    ? new Date(setResult.lastSubmittedAt).toLocaleString("vi-VN")
                    : "Chưa có"}
                </p>
                <div className="inline-actions">
                  <Link
                    href={`/history/grade-9/${chapterId}/test/${setResult.setId}`}
                    className="secondary-link"
                  >
                    Làm lại bộ này
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
