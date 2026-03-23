"use client";

import { useState } from "react";
import { TextbookPdfViewer } from "./textbook-pdf-viewer";

type Props = {
  chapterTitle: string;
  chapterStartPage: number;
  chapterEndPage: number;
};

export function LearnTextbookPanel({
  chapterTitle,
  chapterStartPage,
  chapterEndPage,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="content-section">
      <div className="section-heading">
        <p className="eyebrow">Đọc sách giáo khoa</p>
        <h2>Mở trực tiếp sách giáo khoa ngay tại trang bắt đầu của chương hiện tại.</h2>
      </div>
      <div className="feature-card chapter-feature textbook-panel">
        <div className="test-toolbar">
          <div>
            <h3>Trình đọc sách giáo khoa</h3>
            <p>
              Nhấn nút bên dưới để mở tệp PDF của {chapterTitle} tại trang {chapterStartPage}.
            </p>
          </div>
          <button
            type="button"
            className="primary-link action-button"
            onClick={() => setIsOpen((current) => !current)}
          >
            {isOpen ? "Ẩn sách giáo khoa" : "Đọc sách giáo khoa"}
          </button>
        </div>

        {isOpen ? (
          <TextbookPdfViewer
            chapterTitle={chapterTitle}
            chapterStartPage={chapterStartPage}
            chapterEndPage={chapterEndPage}
          />
        ) : (
          <p className="helper-copy">
            Trình đọc PDF sẽ mở đúng vị trí đầu chương để em đọc trực tiếp từ sách giáo khoa.
          </p>
        )}
      </div>
    </section>
  );
}
