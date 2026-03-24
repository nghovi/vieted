import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getGrade9MathChapterEndPage,
  getGrade9MathChapterStartPage,
} from "@/lib/math-textbook";
import { getMathChapterByIdFromDb } from "@/lib/db";
import { TextbookPdfViewer } from "./textbook-pdf-viewer";

type Props = {
  params: Promise<{ chapterId: string }>;
};

export default async function MathLearnPage({ params }: Props) {
  const { chapterId } = await params;
  const chapter = await getMathChapterByIdFromDb(chapterId);

  if (!chapter) notFound();

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Học theo chương</p>
          <h1>{chapter.title}</h1>
          <p className="lede">{chapter.modeContent.learn.overview}</p>
          <div className="hero-actions">
            <Link href={`/math/grade-9/${chapterId}/test`} className="primary-link">
              Sang kiểm tra
            </Link>
            <Link href={`/math/grade-9/${chapterId}/review`} className="secondary-link">
              Xem đánh giá
            </Link>
            <Link href={`/math/grade-9/${chapterId}`} className="secondary-link">
              Về chương học
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Khung học nhanh</h2>
          <ul>
            {chapter.modeContent.learn.keyIdeas.map((idea) => (
              <li key={idea}>
                <span>Ý chính</span>
                <strong>{idea}</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section">
        <TextbookPdfViewer
          chapterId={chapterId}
          chapterTitle={chapter.title}
          chapterStartPage={getGrade9MathChapterStartPage(chapterId)}
          chapterEndPage={getGrade9MathChapterEndPage(chapterId)}
        />
      </section>
    </main>
  );
}
