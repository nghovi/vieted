export const grade9EnglishTextbookPdfPath =
  "/api/textbooks/english-grade-9/pdf";

export const grade9EnglishChapterStartPages: Record<string, number> = {
  "unit-1-local-community": 10,
  "unit-2-city-life": 20,
  "unit-3-healthy-living-for-teens": 30,
  "unit-4-remembering-the-past": 42,
  "unit-5-our-experiences": 52,
};

export function getGrade9EnglishChapterStartPage(chapterId: string) {
  return grade9EnglishChapterStartPages[chapterId] ?? 10;
}

export function getGrade9EnglishChapterEndPage(chapterId: string) {
  const orderedStarts = Object.entries(grade9EnglishChapterStartPages).sort(
    (a, b) => a[1] - b[1],
  );
  const index = orderedStarts.findIndex(([id]) => id === chapterId);

  if (index === -1) {
    return 71;
  }

  const nextStart = orderedStarts[index + 1]?.[1];
  return nextStart ? nextStart - 1 : 71;
}
