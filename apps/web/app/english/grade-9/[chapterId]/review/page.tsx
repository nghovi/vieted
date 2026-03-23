import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import { getEnglishChapterByIdFromDb, getEnglishChapterEvaluation } from "@/lib/db";
import { EnglishReviewSetList } from "./review-set-list";

type Props = {
  params: Promise<{ chapterId: string }>;
};

export default async function EnglishReviewPage({ params }: Props) {
  const { chapterId } = await params;
  const student = await getServerSessionStudent();
  if (!student) redirect("/login");

  const chapter = await getEnglishChapterByIdFromDb(chapterId);
  const evaluation = await getEnglishChapterEvaluation(student.dbId, chapterId);
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
        <EnglishReviewSetList chapterId={chapterId} setResults={evaluation.setResults} />
      </section>
    </main>
  );
}
