import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getServerSessionStudent } from "@/lib/auth";
import {
  canStudentAccessEnglishChapter,
  getEnglishChapterByIdFromDb,
  getEnglishChapterEvaluation,
} from "@/lib/db";

type Props = {
  params: Promise<{ chapterId: string }>;
};

export default async function EnglishChapterPage({ params }: Props) {
  const { chapterId } = await params;
  const student = await getServerSessionStudent();
  const access = await canStudentAccessEnglishChapter(student?.dbId ?? null, chapterId);
  if (!access?.isUnlocked) redirect("/");
  const chapter = await getEnglishChapterByIdFromDb(chapterId);
  const evaluation =
    student ? await getEnglishChapterEvaluation(student.dbId, chapterId) : null;

  if (!chapter) notFound();

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Tiếng Anh lớp 9</p>
          <h1>{chapter.title}</h1>
          <p className="lede">{chapter.summary}</p>
          <div className="session-banner">
            <strong>Nguồn tài liệu</strong>
            <span>{chapter.textbookScope}</span>
          </div>
          <div className="hero-actions">
            <Link href={`/english/grade-9/${chapterId}/learn`} className="primary-link">
              Học
            </Link>
            <Link href={`/english/grade-9/${chapterId}/test`} className="secondary-link">
              Kiểm tra
            </Link>
            <Link href={`/english/grade-9/${chapterId}/review`} className="secondary-link">
              Đánh giá
            </Link>
            <Link href="/" className="secondary-link">
              Về trang chủ
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Chế độ học theo bài</h2>
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
    </main>
  );
}
