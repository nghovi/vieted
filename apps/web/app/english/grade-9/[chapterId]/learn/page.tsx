import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getGrade9EnglishChapterEndPage,
  getGrade9EnglishChapterStartPage,
} from "@/lib/english-textbook";
import { getEnglishChapterByIdFromDb } from "@/lib/db";
import { TextbookPdfViewer } from "./textbook-pdf-viewer";

type Props = {
  params: Promise<{ chapterId: string }>;
};

export default async function EnglishLearnPage({ params }: Props) {
  const { chapterId } = await params;
  const chapter = await getEnglishChapterByIdFromDb(chapterId);

  if (!chapter) notFound();

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Học theo bài</p>
          <h1>{chapter.title}</h1>
          <p className="lede">{chapter.modeContent.learn.overview}</p>
          <div className="hero-actions">
            <Link href={`/english/grade-9/${chapterId}/test`} className="primary-link">
              Sang kiểm tra
            </Link>
            <Link href={`/english/grade-9/${chapterId}/review`} className="secondary-link">
              Xem đánh giá
            </Link>
            <Link href={`/english/grade-9/${chapterId}`} className="secondary-link">
              Về bài học
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
          chapterStartPage={getGrade9EnglishChapterStartPage(chapterId)}
          chapterEndPage={getGrade9EnglishChapterEndPage(chapterId)}
        />
      </section>
    </main>
  );
}
