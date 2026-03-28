import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import {
  canStudentAccessEnglishChapter,
  getEnglishChapterByIdFromDb,
  getEnglishChapterEvaluation,
  listEnglishQuestionSetsWithProgress,
} from "@/lib/db";
import { EnglishTestSetList } from "./test-set-list";

type Props = {
  params: Promise<{ chapterId: string }>;
};

export default async function EnglishChapterTestPage({ params }: Props) {
  const { chapterId } = await params;
  const student = await getServerSessionStudent();
  if (!student) redirect("/login");
  const access = await canStudentAccessEnglishChapter(student.dbId, chapterId);
  if (!access?.isUnlocked) redirect("/");

  const chapter = await getEnglishChapterByIdFromDb(chapterId);
  const testSets = await listEnglishQuestionSetsWithProgress(student.dbId, chapterId);
  const evaluation = await getEnglishChapterEvaluation(student.dbId, chapterId);

  if (!chapter || !testSets || !evaluation) notFound();

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Kiểm tra theo bài</p>
          <h1>{chapter.title}</h1>
          <p className="lede">Chọn một bộ câu hỏi để làm hoặc làm lại.</p>
          <div className="hero-actions">
            <Link href={`/english/grade-9/${chapterId}/learn`} className="secondary-link">
              Sang phần học
            </Link>
            <Link href={`/english/grade-9/${chapterId}/review`} className="secondary-link">
              Xem đánh giá bài
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Tổng quan kiểm tra</h2>
          <ul>
            <li><span>Bộ đã làm</span><strong>{evaluation.attemptedSets}/{evaluation.totalSets}</strong></li>
            <li><span>Điểm trung bình</span><strong>{evaluation.averageScore !== null ? `${evaluation.averageScore}%` : "Chưa có dữ liệu"}</strong></li>
            <li><span>Lần hoạt động gần nhất</span><strong>{evaluation.lastActivityAt ? new Date(evaluation.lastActivityAt).toLocaleString("vi-VN") : "Chưa có"}</strong></li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <EnglishTestSetList chapterId={chapterId} sets={testSets} />
      </section>
    </main>
  );
}
