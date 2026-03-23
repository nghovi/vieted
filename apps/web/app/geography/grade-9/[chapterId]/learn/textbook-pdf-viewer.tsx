"use client";

import {
  grade9GeographyTextbookAvailable,
  grade9GeographyTextbookPdfPath,
} from "@/lib/geography-textbook";

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
  if (!grade9GeographyTextbookAvailable) {
    return (
      <div className="feature-card chapter-feature">
        <div className="section-heading">
          <p className="eyebrow">Sách giáo khoa</p>
          <h2>Chưa thể mở PDF Địa lí trong ứng dụng.</h2>
        </div>
        <p className="helper-copy">
          Khi em bổ sung đúng PDF phần Địa lí lớp 9 vào kho sách, trình đọc sẽ mở lại
          ngay tại trang của chương này.
        </p>
      </div>
    );
  }

  const viewerSrc = `/pdfjs/viewer.html?file=${encodeURIComponent(
    grade9GeographyTextbookPdfPath,
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
        <iframe title={`Sách giáo khoa - ${chapterTitle}`} src={viewerSrc} className="pdf-viewer-frame" />
      </div>
    </div>
  );
}
