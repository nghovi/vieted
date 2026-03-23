export const grade9HistoryTextbookPdfPath =
  "/api/textbooks/history-grade-9/pdf";

export const grade9HistoryChapterStartPages: Record<string, number> = {
  "chuong-1-the-gioi-1918-1945": 7,
  "chuong-2-viet-nam-1918-1945": 22,
  "chuong-3-the-gioi-1945-1991": 41,
  "chuong-4-viet-nam-1945-1991": 61,
  "chuong-5-the-gioi-tu-1991-den-nay": 97,
  "chuong-6-viet-nam-tu-1991-den-nay": 105,
  "chuong-7-cach-mang-khoa-hoc-ki-thuat-va-toan-cau-hoa": 110,
};

export function getGrade9HistoryChapterStartPage(chapterId: string) {
  return grade9HistoryChapterStartPages[chapterId] ?? 7;
}

export function getGrade9HistoryChapterEndPage(chapterId: string) {
  const orderedStarts = Object.entries(grade9HistoryChapterStartPages).sort(
    (a, b) => a[1] - b[1],
  );
  const index = orderedStarts.findIndex(([id]) => id === chapterId);

  if (index === -1) {
    return 114;
  }

  const nextStart = orderedStarts[index + 1]?.[1];
  return nextStart ? nextStart - 1 : 114;
}
