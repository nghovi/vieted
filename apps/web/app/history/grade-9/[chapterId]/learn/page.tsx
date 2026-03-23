import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getGrade9HistoryChapterEndPage,
  getGrade9HistoryChapterStartPage,
} from "@/lib/history-textbook";
import { getHistoryChapterByIdFromDb } from "@/lib/db";
import { LearnTextbookPanel } from "./learn-textbook-panel";

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
          <p className="eyebrow">Chuẩn bị trước khi đọc</p>
          <h2>Nhìn nhanh khung học trước, rồi mở nội dung chương khi em sẵn sàng.</h2>
        </div>
        <div className="grid">
          <article className="feature-card">
            <h3>Mục tiêu của trang học</h3>
            <p>
              Em bắt đầu bằng việc nắm khung kiến thức, sau đó bấm vào nút đọc sách giáo
              khoa để mở phần nội dung chương.
            </p>
          </article>
          <article className="feature-card">
            <h3>Ý chính sẽ gặp trong chương</h3>
            <ul className="options-list">
              {chapter.modeContent.learn.keyIdeas.map((idea) => (
                <li key={idea}>{idea}</li>
              ))}
            </ul>
          </article>
          <article className="feature-card">
            <h3>Cách học gợi ý</h3>
            <p>
              Đọc nội dung chương, tự ghi lại các mốc thời gian và nhân vật quan trọng,
              rồi mới chuyển sang phần kiểm tra để đo mức độ hiểu bài.
            </p>
          </article>
        </div>
      </section>

      <LearnTextbookPanel
        chapterTitle={chapter.title}
        chapterStartPage={getGrade9HistoryChapterStartPage(chapterId)}
        chapterEndPage={getGrade9HistoryChapterEndPage(chapterId)}
      />
    </main>
  );
}
