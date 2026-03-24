import Link from "next/link";
import { notFound } from "next/navigation";
import { getCourseCatalogEntry } from "@/lib/course-catalog";

type Props = {
  params: Promise<{ subject: string; grade: string }>;
};

const subjectLabels: Record<string, string> = {
  history: "Lịch sử",
  math: "Toán",
  english: "Tiếng Anh",
  literature: "Ngữ văn",
};

export default async function CourseHubPage({ params }: Props) {
  const { subject, grade } = await params;
  const gradeNumber = Number(grade);
  const course = getCourseCatalogEntry(gradeNumber, subject);

  if (!course) notFound();

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">
            {subjectLabels[subject] ?? subject} lớp {gradeNumber}
          </p>
          <h1>{course.title}</h1>
          <p className="lede">{course.summary}</p>
          <div className="hero-actions">
            <Link
              href={`/courses/${subject}/${grade}/${course.chapters[0]?.id}/learn`}
              className="primary-link"
            >
              Vào bài đầu tiên
            </Link>
            <Link href="/" className="secondary-link">
              Về trang chủ
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Danh sách chương đang mở</h2>
          <ul>
            {course.chapters.map((chapter) => (
              <li key={chapter.id}>
                <span>{chapter.title}</span>
                <strong>Học</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Chọn chương để bắt đầu</p>
          <h2>Lộ trình học theo chương cho lớp {gradeNumber}.</h2>
        </div>
        <div className="question-set">
          {course.chapters.map((chapter) => (
            <article key={chapter.id} className="feature-card">
              <h3>{chapter.title}</h3>
              <p>{chapter.summary}</p>
              <div className="inline-actions">
                <Link
                  href={`/courses/${subject}/${grade}/${chapter.id}/learn`}
                  className="primary-link"
                >
                  Học
                </Link>
                <span className="secondary-link disabled-link" aria-disabled="true">
                  Kiểm tra sắp mở
                </span>
                <span className="secondary-link disabled-link" aria-disabled="true">
                  Đánh giá sắp mở
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
