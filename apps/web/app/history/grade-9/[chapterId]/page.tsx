import Link from "next/link";
import { notFound } from "next/navigation";
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

export default async function HistoryChapterPage({ params }: Props) {
  const { chapterId } = await params;
  const student = await getServerSessionStudent();
  const chapter = await getHistoryChapterByIdFromDb(chapterId);
  const evaluation =
    student ? await getHistoryChapterEvaluation(student.dbId, chapterId) : null;

  if (!chapter) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Lịch sử lớp 9</p>
          <h1>{chapter.title}</h1>
          <p className="lede">{chapter.summary}</p>
          <div className="session-banner">
            <strong>Nguồn cấu trúc chương</strong>
            <span>{chapter.textbookScope}</span>
          </div>
          <div className="hero-actions">
            <Link href={`/history/grade-9/${chapterId}/learn`} className="primary-link">
              Học
            </Link>
            <Link href={`/history/grade-9/${chapterId}/test`} className="secondary-link">
              Kiểm tra
            </Link>
            <Link href={`/history/grade-9/${chapterId}/review`} className="secondary-link">
              Đánh giá
            </Link>
            <Link href="/" className="secondary-link">
              Về trang chủ
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Chế độ học theo chương</h2>
          <ul>
            <li>
              <span>Học</span>
              <strong>{chapter.modeContent.learn.keyIdeas.length} ý chính</strong>
            </li>
            <li>
              <span>Kiểm tra</span>
              <strong>{chapter.questionSets.length} bộ câu hỏi</strong>
            </li>
            <li>
              <span>Đánh giá</span>
              <strong>
                {evaluation?.averageScore !== null && evaluation?.averageScore !== undefined
                  ? `${evaluation.averageScore}% trung bình`
                  : "Chưa có kết quả"}
              </strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Lộ trình theo chương</p>
          <h2>Đi qua ba trang riêng để học, làm bài và xem tiến độ rõ ràng hơn.</h2>
        </div>
        <div className="grid">
          <article className="feature-card">
            <h3>Học</h3>
            <p>
              Xem tóm tắt chương, ý chính cần nhớ và gợi ý cách học trước khi bước vào bài
              kiểm tra.
            </p>
            <div className="inline-actions">
              <Link href={`/history/grade-9/${chapterId}/learn`} className="primary-link">
                Mở trang học
              </Link>
            </div>
          </article>
          <article className="feature-card">
            <h3>Kiểm tra</h3>
            <p>
              Chọn từng bộ câu hỏi, làm bài thật và chỉ xem đáp án sau khi nộp bài.
            </p>
            <div className="inline-actions">
              <Link href={`/history/grade-9/${chapterId}/test`} className="primary-link">
                Mở trang kiểm tra
              </Link>
            </div>
          </article>
          <article className="feature-card">
            <h3>Đánh giá</h3>
            <p>
              Theo dõi kết quả học và kiểm tra của riêng chương này để biết phần nào đã
              chắc, phần nào nên làm lại.
            </p>
            <div className="inline-actions">
              <Link href={`/history/grade-9/${chapterId}/review`} className="primary-link">
                Mở trang đánh giá
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
