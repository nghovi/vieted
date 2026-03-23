import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import {
  getGeographyChapterByIdFromDb,
  getGeographyChapterEvaluation,
  listGeographyQuestionSetsWithProgress,
} from "@/lib/db";
import { GeographyTestSetList } from "./test-set-list";

type Props = {
  params: Promise<{ chapterId: string }>;
};

export default async function GeographyChapterTestPage({ params }: Props) {
  const { chapterId } = await params;
  const student = await getServerSessionStudent();

  if (!student) redirect("/login");

  const chapter = await getGeographyChapterByIdFromDb(chapterId);
  const testSets = await listGeographyQuestionSetsWithProgress(student.dbId, chapterId);
  const evaluation = await getGeographyChapterEvaluation(student.dbId, chapterId);

  if (!chapter || !testSets || !evaluation) notFound();

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Kiểm tra theo chương</p>
          <h1>{chapter.title}</h1>
          <p className="lede">Chọn một bộ câu hỏi để làm hoặc làm lại.</p>
          <div className="hero-actions">
            <Link href={`/geography/grade-9/${chapterId}/learn`} className="secondary-link">
              Sang phần học
            </Link>
            <Link href={`/geography/grade-9/${chapterId}/review`} className="secondary-link">
              Xem đánh giá chương
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
        <GeographyTestSetList chapterId={chapterId} sets={testSets} />
      </section>
    </main>
  );
}
