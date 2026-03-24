import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseCatalogEntry, getCourseChapter } from "@/lib/course-catalog";

type Props = {
  params: Promise<{ subject: string; grade: string; chapterId: string }>;
};

const subjectLabels: Record<string, string> = {
  history: "Lịch sử",
  math: "Toán",
  english: "Tiếng Anh",
  literature: "Ngữ văn",
};

export default async function CourseLearnPage({ params }: Props) {
  const { subject, grade, chapterId } = await params;
  const gradeNumber = Number(grade);
  const course = getCourseCatalogEntry(gradeNumber, subject);
  const chapter = getCourseChapter(gradeNumber, subject, chapterId);

  if (!course || !chapter) notFound();

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            Học {subjectLabels[subject] ?? subject} lớp {gradeNumber}
          </p>
          <h1>{chapter.title}</h1>
          <p className="lede">{chapter.summary}</p>
          <div className="hero-actions">
            <Link href={`/courses/${subject}/${grade}`} className="secondary-link">
              Về danh sách chương
            </Link>
            <Link href="/" className="secondary-link">
              Trang chủ
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Khung học nhanh</h2>
          <ul>
            {chapter.keyIdeas.map((idea) => (
              <li key={idea}>
                <span>Ý chính</span>
                <strong>{idea}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="feature-card chapter-feature">
          <h3>Nội dung bài học</h3>
          <p>{chapter.summary}</p>
          <p className="helper-copy">
            Lộ trình học cho {subjectLabels[subject] ?? subject} lớp {gradeNumber} đã được mở
            theo chương. Phần kiểm tra và đánh giá chi tiết sẽ được nối tiếp trên cùng cấu trúc
            này trong các bản cập nhật tiếp theo.
          </p>
        </div>
      </section>
    </main>
  );
}
