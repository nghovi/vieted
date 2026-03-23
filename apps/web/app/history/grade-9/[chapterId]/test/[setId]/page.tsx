import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import {
  getHistoryQuestionSetByIdFromDb,
  getLatestHistoryQuestionSetAttempt,
  listHistoryQuestionSetsWithProgress,
} from "@/lib/db";
import { ScoreTrendChart } from "../../score-trend-chart";
import { HistoryTestForm } from "../history-test-form";

type Props = {
  params: Promise<{
    chapterId: string;
    setId: string;
  }>;
};

export default async function HistorySetAttemptPage({ params }: Props) {
  const { chapterId, setId } = await params;
  const student = await getServerSessionStudent();

  if (!student) {
    redirect("/login");
  }

  const questionSet = await getHistoryQuestionSetByIdFromDb(chapterId, setId);
  const latestAttempt = await getLatestHistoryQuestionSetAttempt(
    student.dbId,
    chapterId,
    setId,
  );
  const chapterProgress = await listHistoryQuestionSetsWithProgress(student.dbId, chapterId);

  if (!questionSet || !chapterProgress) {
    notFound();
  }

  const setProgress = chapterProgress.find((item) => item.setId === setId);

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Làm bài kiểm tra</p>
          <h1>{questionSet.title}</h1>
          <p className="lede">
            Hoàn thành từng câu hỏi rồi nộp bài để xem đáp án, giải thích và điểm số của
            lần làm này.
          </p>
          <div className="hero-actions">
            <Link href={`/history/grade-9/${chapterId}/test`} className="secondary-link">
              Về danh sách bộ kiểm tra
            </Link>
            <Link href={`/history/grade-9/${chapterId}/learn`} className="secondary-link">
              Xem phần học
            </Link>
            <Link href={`/history/grade-9/${chapterId}/review`} className="secondary-link">
              Xem đánh giá
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Thông tin gần nhất</h2>
          <ul>
            <li>
              <span>Chương</span>
              <strong>{questionSet.chapterTitle}</strong>
            </li>
            <li>
              <span>Số câu hỏi</span>
              <strong>{questionSet.questions.length} câu</strong>
            </li>
            <li>
              <span>Kết quả lần gần nhất</span>
              <strong>
                {latestAttempt
                  ? `${latestAttempt.scorePercent}% (${latestAttempt.correctCount}/${latestAttempt.totalQuestions})`
                  : "Chưa có"}
              </strong>
            </li>
            <li>
              <span>Thời gian gần nhất</span>
              <strong>
                {latestAttempt
                  ? new Date(latestAttempt.submittedAt).toLocaleString("vi-VN")
                  : "Chưa có"}
              </strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="feature-card">
          <div className="test-toolbar">
            <div>
              <h2>Tiến độ của bộ kiểm tra này</h2>
              <p>
                Xem điểm các lần làm để biết mình đang tiến bộ ổn định hay cần làm lại
                thêm.
              </p>
            </div>
            <span className="test-progress-badge">
              {setProgress?.bestScore !== null ? `Cao nhất ${setProgress?.bestScore}%` : "Chưa có dữ liệu"}
            </span>
          </div>
          <ScoreTrendChart points={setProgress?.attemptHistory ?? []} />
        </div>

        <HistoryTestForm
          attemptHistory={setProgress?.attemptHistory ?? []}
          chapterId={chapterId}
          questions={questionSet.questions.map((question) => ({
            id: question.id,
            prompt: question.prompt,
            options: question.options,
          }))}
          setId={questionSet.id}
          setTitle={questionSet.title}
        />
      </section>
    </main>
  );
}
