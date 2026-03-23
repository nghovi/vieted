export const supportedGrade = 9;

export const gradeOptions = Array.from({ length: 12 }, (_, index) => index + 1);

export const subjectCatalog = [
  { value: "history", label: "Lịch sử", isAvailable: true },
  { value: "geography", label: "Địa lí", isAvailable: true },
  { value: "math", label: "Toán", isAvailable: false },
  { value: "english", label: "Tiếng Anh", isAvailable: true },
  { value: "literature", label: "Ngữ văn", isAvailable: false },
  { value: "physics", label: "Vật lý", isAvailable: false },
  { value: "chemistry", label: "Hóa học", isAvailable: false },
] as const;

export const availableSubjects = subjectCatalog
  .filter((subject) => subject.isAvailable)
  .map((subject) => subject.value);

export type AvailableSubject = (typeof availableSubjects)[number];

export function isSupportedStudyPreference(
  currentGrade: number,
  currentSubject: string,
): currentSubject is AvailableSubject {
  return (
    currentGrade === supportedGrade &&
    subjectCatalog.some(
      (subject) => subject.isAvailable && subject.value === currentSubject,
    )
  );
}
