import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import {
  getGeographyQuestionSetByIdFromDb,
  listGeographyQuestionSetsWithProgress,
  getLatestGeographyQuestionSetAttempt,
} from "@/lib/db";
import { GeographyTestForm } from "../geography-test-form";

type Props = {
  params: Promise<{ chapterId: string; setId: string }>;
};

export default async function GeographySetAttemptPage({ params }: Props) {
  const { chapterId, setId } = await params;
  const student = await getServerSessionStudent();

  if (!student) redirect("/login");

  const questionSet = await getGeographyQuestionSetByIdFromDb(chapterId, setId);
  const latestAttempt = await getLatestGeographyQuestionSetAttempt(student.dbId, chapterId, setId);
  const chapterProgress = await listGeographyQuestionSetsWithProgress(student.dbId, chapterId);

  if (!questionSet || !chapterProgress) notFound();

  const setProgress = chapterProgress.find((item) => item.setId === setId);

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Làm bài kiểm tra</p>
          <h1>{questionSet.title}</h1>
          <p className="lede">Hoàn thành từng câu hỏi rồi nộp bài để xem đáp án, giải thích và điểm số.</p>
          <div className="hero-actions">
            <Link href={`/geography/grade-9/${chapterId}/test`} className="secondary-link">Về danh sách bộ kiểm tra</Link>
            <Link href={`/geography/grade-9/${chapterId}/learn`} className="secondary-link">Xem phần học</Link>
            <Link href={`/geography/grade-9/${chapterId}/review`} className="secondary-link">Xem đánh giá</Link>
          </div>
        </div>
        <div className="hero-card">
          <h2>Thông tin gần nhất</h2>
          <ul>
            <li><span>Chương</span><strong>{questionSet.chapterTitle}</strong></li>
            <li><span>Số câu hỏi</span><strong>{questionSet.questions.length} câu</strong></li>
            <li><span>Kết quả lần gần nhất</span><strong>{latestAttempt ? `${latestAttempt.scorePercent}% (${latestAttempt.correctCount}/${latestAttempt.totalQuestions})` : "Chưa có"}</strong></li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <GeographyTestForm
          chapterId={chapterId}
          setId={questionSet.id}
          setTitle={questionSet.title}
          attemptHistory={setProgress?.attemptHistory ?? []}
          questions={questionSet.questions.map((question) => ({
            id: question.id,
            prompt: question.prompt,
            options: question.options,
          }))}
        />
      </section>
    </main>
  );
}
