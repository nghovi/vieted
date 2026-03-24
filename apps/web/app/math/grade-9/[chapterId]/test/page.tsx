import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import {
  getMathChapterByIdFromDb,
  getMathChapterEvaluation,
  listMathQuestionSetsWithProgress,
} from "@/lib/db";
import { MathTestSetList } from "./test-set-list";

type Props = {
  params: Promise<{ chapterId: string }>;
};

export default async function MathChapterTestPage({ params }: Props) {
  const { chapterId } = await params;
  const student = await getServerSessionStudent();
  if (!student) redirect("/login");

  const chapter = await getMathChapterByIdFromDb(chapterId);
  const testSets = await listMathQuestionSetsWithProgress(student.dbId, chapterId);
  const evaluation = await getMathChapterEvaluation(student.dbId, chapterId);

  if (!chapter || !testSets || !evaluation) notFound();

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Kiểm tra theo chương</p>
          <h1>{chapter.title}</h1>
          <p className="lede">Chọn một bộ câu hỏi để làm mới hoặc làm lại.</p>
          <div className="hero-actions">
            <Link href={`/math/grade-9/${chapterId}/learn`} className="secondary-link">
              Sang phần học
            </Link>
            <Link href={`/math/grade-9/${chapterId}/review`} className="secondary-link">
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
                {evaluation.averageScore !== null ? `${evaluation.averageScore}%` : "Chưa có dữ liệu"}
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
        <MathTestSetList chapterId={chapterId} sets={testSets} />
      </section>
    </main>
  );
}
