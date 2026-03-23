"use client";

import { grade9EnglishTextbookPdfPath } from "@/lib/english-textbook";

type Props = {
  chapterTitle: string;
  chapterStartPage: number;
  chapterEndPage: number;
};

export function TextbookPdfViewer({
  chapterTitle,
  chapterStartPage,
  chapterEndPage,
}: Props) {
  const viewerSrc = `/pdfjs/viewer.html?file=${encodeURIComponent(
    grade9EnglishTextbookPdfPath,
  )}&page=${chapterStartPage}&chapterEnd=${chapterEndPage}`;

  return (
    <div className="pdf-viewer-shell">
      <div className="pdf-viewer-toolbar">
        <div>
          <strong>{chapterTitle}</strong>
          <p>
            Trình đọc sẽ mở ngay tại trang {chapterStartPage} và em có thể chuyển trang trực
            tiếp trong khung đọc.
          </p>
        </div>
        <div className="inline-actions">
          <a href={viewerSrc} target="_blank" rel="noreferrer" className="primary-link">
            Mở toàn màn hình
          </a>
        </div>
      </div>

      <div className="pdf-react-viewer">
        <iframe
          title={`Sách giáo khoa - ${chapterTitle}`}
          src={viewerSrc}
          className="pdf-viewer-frame"
        />
      </div>
    </div>
  );
}
