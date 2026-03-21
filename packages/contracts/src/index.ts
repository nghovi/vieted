export type Subject =
  | "math"
  | "history"
  | "english"
  | "literature"
  | "physics"
  | "chemistry";

export interface StudentProfile {
  grade: number;
  dailyGoalMinutes: number;
  targetSubjects: Subject[];
}

export interface TopicSummary {
  id: string;
  title: string;
  subject: Subject;
  gradeBand: "junior" | "senior";
  description: string;
}

export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

export interface AuthStudent {
  id: string;
  fullName: string;
  grade: number;
  phoneNumber: string;
}

export interface LoginResponse {
  student: AuthStudent;
  sessionToken: string;
}

export interface StudyPreference {
  currentGrade: number;
  currentSubject: Subject;
}

export const starterTopics: TopicSummary[] = [
  {
    id: "history-9-vietnam-1919-1930",
    title: "Viet Nam 1919-1930",
    subject: "history",
    gradeBand: "junior",
    description:
      "On tap lich su lop 9 ve giai doan Viet Nam tu sau Chien tranh the gioi thu nhat den 1930.",
  },
  {
    id: "math-6-fractions",
    title: "Phan so co ban",
    subject: "math",
    gradeBand: "junior",
    description: "Giai thich, bai tap va on tap cho phan so muc do THCS.",
  },
  {
    id: "math-7-algebra",
    title: "Bieu thuc dai so",
    subject: "math",
    gradeBand: "junior",
    description: "Lam quen voi bieu thuc, bien so va cach rut gon tung buoc.",
  },
];

export const supportedSubjects: Subject[] = [
  "history",
  "math",
  "english",
  "literature",
  "physics",
  "chemistry",
];
