export const grade9GeographyTextbookPdfPath =
  "/api/textbooks/geography-grade-9/pdf";

export const grade9GeographyTextbookAvailable = true;
export const grade9GeographyTextbookIssueMessage = "";

export const grade9GeographyChapterStartPages: Record<string, number> = {
  "chuong-1-dia-li-dan-cu-viet-nam": 117,
  "chuong-2-dia-li-cac-nganh-kinh-te": 129,
  "chuong-3-su-phan-hoa-lanh-tho": 149,
  "chuong-4-bien-dao-va-phat-trien-ben-vung": 171,
};

export function getGrade9GeographyChapterStartPage(chapterId: string) {
  return grade9GeographyChapterStartPages[chapterId] ?? 117;
}

export function getGrade9GeographyChapterEndPage(chapterId: string) {
  const orderedStarts = Object.entries(grade9GeographyChapterStartPages).sort(
    (a, b) => a[1] - b[1],
  );
  const index = orderedStarts.findIndex(([id]) => id === chapterId);

  if (index === -1) {
    return 190;
  }

  const nextStart = orderedStarts[index + 1]?.[1];
  return nextStart ? nextStart - 1 : 190;
}
