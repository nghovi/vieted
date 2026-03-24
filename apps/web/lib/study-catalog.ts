export const supportedGrades = [6, 7, 8, 9] as const;

export const gradeOptions = Array.from({ length: 12 }, (_, index) => index + 1);

export const subjectCatalog = [
  { value: "history", label: "Lịch sử", isAvailable: true },
  { value: "geography", label: "Địa lí", isAvailable: false },
  { value: "math", label: "Toán", isAvailable: true },
  { value: "english", label: "Tiếng Anh", isAvailable: true },
  { value: "literature", label: "Ngữ văn", isAvailable: true },
  { value: "physics", label: "Vật lý", isAvailable: false },
  { value: "chemistry", label: "Hóa học", isAvailable: false },
] as const;

export const availableSubjects = subjectCatalog
  .filter((subject) => subject.isAvailable)
  .map((subject) => subject.value);

export type SupportedGrade = (typeof supportedGrades)[number];
export type AvailableSubject = (typeof availableSubjects)[number];

export function isSupportedGrade(value: number): value is SupportedGrade {
  return supportedGrades.includes(value as SupportedGrade);
}

export function isSubjectAvailable(value: string): value is AvailableSubject {
  return subjectCatalog.some(
    (subject) => subject.isAvailable && subject.value === value,
  );
}

export function isSupportedStudyPreference(
  currentGrade: number,
  currentSubject: string,
): currentSubject is AvailableSubject {
  return isSupportedGrade(currentGrade) && isSubjectAvailable(currentSubject);
}
