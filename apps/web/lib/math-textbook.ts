export const grade9MathTextbookPdfPaths = {
  tap1: "/api/textbooks/math-grade-9/tap-1/pdf",
  tap2: "/api/textbooks/math-grade-9/tap-2/pdf",
} as const;

export const grade9MathChapterTextbooks: Record<
  string,
  { pdfPath: string; startPage: number; endPage?: number }
> = {
  "chuong-1-can-bac-hai-va-can-thuc": {
    pdfPath: grade9MathTextbookPdfPaths.tap1,
    startPage: 8,
  },
  "chuong-2-ham-so-bac-nhat": {
    pdfPath: grade9MathTextbookPdfPaths.tap1,
    startPage: 30,
  },
  "chuong-3-he-thuc-luong-trong-tam-giac-vuong": {
    pdfPath: grade9MathTextbookPdfPaths.tap1,
    startPage: 56,
    endPage: 88,
  },
  "chuong-4-phuong-trinh-bac-hai-mot-an": {
    pdfPath: grade9MathTextbookPdfPaths.tap2,
    startPage: 8,
  },
  "chuong-5-thong-ke-va-xac-suat-thuc-nghiem": {
    pdfPath: grade9MathTextbookPdfPaths.tap2,
    startPage: 74,
    endPage: 124,
  },
};

export function getGrade9MathChapterStartPage(chapterId: string) {
  return grade9MathChapterTextbooks[chapterId]?.startPage ?? 8;
}

export function getGrade9MathTextbookPdfPath(chapterId: string) {
  return grade9MathChapterTextbooks[chapterId]?.pdfPath ?? grade9MathTextbookPdfPaths.tap1;
}

export function getGrade9MathChapterEndPage(chapterId: string) {
  const current = grade9MathChapterTextbooks[chapterId];
  if (!current) {
    return 140;
  }

  if (current.endPage) {
    return current.endPage;
  }

  const orderedStarts = Object.entries(grade9MathChapterTextbooks)
    .filter(([, item]) => item.pdfPath === current.pdfPath)
    .sort((a, b) => a[1].startPage - b[1].startPage);
  const index = orderedStarts.findIndex(([id]) => id === chapterId);
  const nextStart = orderedStarts[index + 1]?.[1]?.startPage;

  if (nextStart) {
    return nextStart - 1;
  }

  return current.pdfPath === grade9MathTextbookPdfPaths.tap1 ? 88 : 124;
}
