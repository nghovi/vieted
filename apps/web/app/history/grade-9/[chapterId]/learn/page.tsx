import Link from "next/link";
import { notFound } from "next/navigation";
import { getHistoryChapterByIdFromDb } from "@/lib/db";

type Props = {
  params: Promise<{
    chapterId: string;
  }>;
};

export default async function HistoryLearnPage({ params }: Props) {
  const { chapterId } = await params;
  const chapter = await getHistoryChapterByIdFromDb(chapterId);

  if (!chapter) {
    notFound();
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Học theo chương</p>
          <h1>{chapter.title}</h1>
          <p className="lede">
            Đọc phần tóm tắt, ghi nhớ các ý chính và dùng chúng làm khung trước khi em làm
            bài kiểm tra.
          </p>
          <div className="hero-actions">
            <Link href={`/history/grade-9/${chapterId}/test`} className="primary-link">
              Sang kiểm tra
            </Link>
            <Link href={`/history/grade-9/${chapterId}/review`} className="secondary-link">
              Xem đánh giá
            </Link>
            <Link href={`/history/grade-9/${chapterId}`} className="secondary-link">
              Về chương
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h2>Khung học nhanh</h2>
          <ul>
            <li>
              <span>Tổng quan</span>
              <strong>1 phần tóm tắt chương</strong>
            </li>
            <li>
              <span>Ý chính</span>
              <strong>{chapter.modeContent.learn.keyIdeas.length} ý cần nhớ</strong>
            </li>
            <li>
              <span>Kiểm tra tiếp theo</span>
              <strong>{chapter.questionSets.length} bộ câu hỏi</strong>
            </li>
          </ul>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Tổng quan chương</p>
          <h2>Những gì em cần nắm chắc trước khi làm bài.</h2>
        </div>
        <div className="grid">
          <article className="feature-card">
            <h3>Tóm tắt nội dung</h3>
            <p>{chapter.modeContent.learn.overview}</p>
          </article>
          <article className="feature-card">
            <h3>Ý chính cần nhớ</h3>
            <ul className="options-list">
              {chapter.modeContent.learn.keyIdeas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          </article>
          <article className="feature-card">
            <h3>Cách học gợi ý</h3>
            <p>
              Đọc tóm tắt trước, tự ghi lại các mốc thời gian và nhân vật quan trọng, sau
              đó mới chuyển sang phần kiểm tra để đo mức độ hiểu bài.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
