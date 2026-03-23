import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getGrade9GeographyChapterEndPage,
  getGrade9GeographyChapterStartPage,
} from "@/lib/geography-textbook";
import { getGeographyChapterByIdFromDb } from "@/lib/db";
import { TextbookPdfViewer } from "./textbook-pdf-viewer";

type Props = {
  params: Promise<{ chapterId: string }>;
};

export default async function GeographyLearnPage({ params }: Props) {
  const { chapterId } = await params;
  const chapter = await getGeographyChapterByIdFromDb(chapterId);

  if (!chapter) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Học theo chương</p>
          <h1>{chapter.title}</h1>
          <p className="lede">{chapter.modeContent.learn.overview}</p>
          <div className="hero-actions">
            <Link href={`/geography/grade-9/${chapterId}/test`} className="primary-link">
              Sang kiểm tra
            </Link>
            <Link href={`/geography/grade-9/${chapterId}/review`} className="secondary-link">
              Xem đánh giá
            </Link>
            <Link href={`/geography/grade-9/${chapterId}`} className="secondary-link">
              Về chương
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
          chapterTitle={chapter.title}
          chapterStartPage={getGrade9GeographyChapterStartPage(chapterId)}
          chapterEndPage={getGrade9GeographyChapterEndPage(chapterId)}
        />
      </section>
    </main>
  );
}
