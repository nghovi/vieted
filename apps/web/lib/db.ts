import crypto from "node:crypto";
import { pool } from "./mysql";
import {
  getEnglishChapterModeContent,
  grade9EnglishChapters,
  type EnglishQuestion,
  type EnglishQuestionSet,
} from "./english-grade-9";
import {
  getGeographyChapterModeContent,
  grade9GeographyChapters,
  type GeographyQuestion,
  type GeographyQuestionSet,
} from "./geography-grade-9";
import {
  getHistoryChapterModeContent,
  grade9HistoryChapters,
  type HistoryQuestion,
  type HistoryQuestionSet,
} from "./history-grade-9";
import {
  getMathChapterModeContent,
  grade9MathChapters,
  type MathQuestion,
  type MathQuestionSet,
} from "./math-grade-9";

export type DbStudent = {
  id: number;
  fullName: string;
  grade: number;
  phoneNumber: string | null;
  email: string | null;
  passwordHash: string | null;
  authProvider: string;
  authProviderUserId: string | null;
  avatarKey: string;
};

export type DbStudyPreference = {
  currentGrade: number;
  currentSubject: string;
  currentHistoryChapterId: string;
  currentGeographyChapterId: string;
  currentEnglishChapterId: string;
  currentMathChapterId: string;
};

export type DbStudentPhoneOtp = {
  id: number;
  phoneNumber: string;
  purpose: string;
  codeHash: string;
  expiresAt: Date;
  usedAt: Date | null;
};

export type HistoryLearnStatus = "not_started" | "learning" | "completed";

export type HistoryEvaluationOverview = {
  completedLearningChapters: number;
  totalChapters: number;
  attemptedSets: number;
  totalSets: number;
  averageScore: number | null;
  strongestChapter: string | null;
  needsAttentionChapter: string | null;
};

export type HistoryChapterEvaluation = {
  chapterId: string;
  learnStatus: HistoryLearnStatus;
  learnCompletedAt: string | null;
  lastActivityAt: string | null;
  attemptedSets: number;
  totalSets: number;
  averageScore: number | null;
  bestScore: number | null;
  lastScore: number | null;
  setResults: Array<{
    setId: string;
    setTitle: string;
    attempts: number;
    bestScore: number | null;
    latestScore: number | null;
    lastSubmittedAt: string | null;
    attemptHistory: HistoryScorePoint[];
  }>;
};

export type HistoryScorePoint = {
  submittedAt: string;
  scorePercent: number;
};

export type HistoryQuestionSetProgress = {
  setId: string;
  setTitle: string;
  questionCount: number;
  attempts: number;
  bestScore: number | null;
  latestScore: number | null;
  lastSubmittedAt: string | null;
  masteryLabel: string;
  attemptHistory: HistoryScorePoint[];
};

export type EnglishSkillCode =
  | "grammar_tense"
  | "sentence_structure"
  | "word_form"
  | "vocabulary_meaning"
  | "preposition_collocation"
  | "reading_comprehension"
  | "error_identification"
  | "sentence_transformation";

export type EnglishSkillFeedback = {
  skillCode: EnglishSkillCode;
  skillLabel: string;
  explanationVi: string;
  hintVi: string;
  memoryTipVi: string;
};

export type EnglishWeakSkillSummary = {
  skillCode: EnglishSkillCode;
  skillLabel: string;
  wrongCount: number;
  nextReviewAt: string | null;
};

type BaseQuestionSetAttemptResult = {
  attemptId: number;
  chapterId: string;
  chapterTitle: string;
  setId: string;
  setTitle: string;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  submittedAt: string;
  questions: Array<{
      questionId: string;
      prompt: string;
      options: string[];
      selectedOption: number;
      correctOption: number;
      isCorrect: boolean;
      explanation: string;
    }>;
};

export type HistoryQuestionSetAttemptResult = BaseQuestionSetAttemptResult;

export type GeographyEvaluationOverview = HistoryEvaluationOverview;
export type GeographyChapterEvaluation = HistoryChapterEvaluation;
export type GeographyQuestionSetProgress = HistoryQuestionSetProgress;
export type GeographyQuestionSetAttemptResult = HistoryQuestionSetAttemptResult;
export type EnglishEvaluationOverview = HistoryEvaluationOverview;
export type EnglishChapterEvaluation = HistoryChapterEvaluation;
export type EnglishQuestionSetProgress = HistoryQuestionSetProgress;
export type EnglishQuestionSetAttemptResult = Omit<
  BaseQuestionSetAttemptResult,
  "questions"
> & {
  weakSkills: EnglishWeakSkillSummary[];
  dueReviewCount: number;
  questions: Array<
    BaseQuestionSetAttemptResult["questions"][number] & {
      skillCode: EnglishSkillCode;
      skillLabel: string;
      explanationVi: string;
      hintVi: string;
      memoryTipVi: string;
    }
  >;
};
export type EnglishChapterLevelStatus = {
  chapterId: string;
  title: string;
  index: number;
  isUnlocked: boolean;
  isCompleted: boolean;
  isCurrent: boolean;
  gateSetId: string;
  gateSetTitle: string;
  gateBestScore: number | null;
  requiredSkillCount: number;
  masteredSkillCount: number;
};
export type MathEvaluationOverview = HistoryEvaluationOverview;
export type MathChapterEvaluation = HistoryChapterEvaluation;
export type MathQuestionSetProgress = HistoryQuestionSetProgress;
export type MathQuestionSetAttemptResult = HistoryQuestionSetAttemptResult;

export type HistoryTextbookChapter = {
  chapterId: string;
  sourceLabel: string;
  contentText: string;
};

type HistoryChapterRow = {
  id: string;
  title: string;
  summary: string;
  textbookScope: string;
  learnOverview: string;
  learnKeyIdeasJson: string;
  reviewChecklistJson: string;
  reviewQuickPromptsJson: string;
  sortOrder: number;
};

type HistoryQuestionSetRow = {
  id: string;
  chapterId: string;
  title: string;
  sortOrder: number;
};

type HistoryQuestionRow = {
  id: string;
  setId: string;
  prompt: string;
  optionsJson: string | string[];
  correctOption: number;
  explanation: string;
  sortOrder: number;
};

type ChapterProgressRow = {
  chapterId: string;
  learnStatus: HistoryLearnStatus;
  learnCompletedAt: Date | null;
  lastActivityAt: Date | null;
};

type SetAttemptRow = {
  id: number;
  chapterId: string;
  questionSetId: string;
  setTitle: string;
  scorePercent: number;
  correctCount: number;
  totalQuestions: number;
  submittedAt: Date;
};

type InsertResult = {
  insertId: number;
};

type EnglishQuestionSkillTagRow = {
  questionId: string;
  skillCode: EnglishSkillCode;
};

type EnglishReviewItemRow = {
  id: number;
  studentId: number;
  chapterId: string;
  skillCode: EnglishSkillCode;
  reps: number;
  lapses: number;
  intervalDays: number;
  nextReviewAt: Date | null;
};

export const studentAvatarPresets = [
  {
    key: "book-fox",
    label: "Cáo đọc sách",
    emoji: "🦊",
    accent: "#db6b2d",
    background: "linear-gradient(135deg, #fff1d6 0%, #f4c891 100%)",
  },
  {
    key: "smart-owl",
    label: "Cú mèo thông thái",
    emoji: "🦉",
    accent: "#7b4f9d",
    background: "linear-gradient(135deg, #efe2ff 0%, #d1b4ff 100%)",
  },
  {
    key: "sea-whale",
    label: "Cá voi chăm chỉ",
    emoji: "🐳",
    accent: "#1d6fb8",
    background: "linear-gradient(135deg, #dbf3ff 0%, #9fdcff 100%)",
  },
  {
    key: "brave-tiger",
    label: "Hổ tự tin",
    emoji: "🐯",
    accent: "#b85a1d",
    background: "linear-gradient(135deg, #ffe7cf 0%, #ffb270 100%)",
  },
  {
    key: "green-frog",
    label: "Ếch vui vẻ",
    emoji: "🐸",
    accent: "#1f8f6b",
    background: "linear-gradient(135deg, #e2fbe9 0%, #9fe0b3 100%)",
  },
  {
    key: "rocket-bear",
    label: "Gấu bứt phá",
    emoji: "🐻",
    accent: "#6a4d3b",
    background: "linear-gradient(135deg, #f5eadf 0%, #d6b399 100%)",
  },
] as const;

export type StudentAvatarPreset = (typeof studentAvatarPresets)[number];

export function getStudentAvatarPreset(avatarKey: string | null | undefined) {
  return (
    studentAvatarPresets.find((avatar) => avatar.key === avatarKey) ??
    studentAvatarPresets[0]
  );
}

function parseJsonArray(value: string | string[]) {
  if (Array.isArray(value)) {
    return value;
  }

  return JSON.parse(value) as string[];
}

function createPasswordHash(password: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${derivedKey}`;
}

function createOtpHash(code: string) {
  return crypto.createHash("sha256").update(code).digest("hex");
}

function toIsoOrNull(value: Date | null) {
  return value ? value.toISOString() : null;
}

function getMasteryLabel(score: number | null) {
  if (score === null) {
    return "Chưa làm";
  }

  if (score >= 80) {
    return "Nắm chắc";
  }

  if (score >= 60) {
    return "Đạt yêu cầu";
  }

  return "Cần làm lại";
}

const englishSkillLabels: Record<EnglishSkillCode, string> = {
  grammar_tense: "Ngữ pháp và thì",
  sentence_structure: "Cấu trúc câu",
  word_form: "Từ loại",
  vocabulary_meaning: "Từ vựng và nghĩa",
  preposition_collocation: "Giới từ và kết hợp từ",
  reading_comprehension: "Đọc hiểu",
  error_identification: "Nhận diện lỗi sai",
  sentence_transformation: "Biến đổi câu",
};

const srsIntervalsInDays = [1, 3, 7, 14, 30];

function getEnglishSkillLabel(skillCode: EnglishSkillCode) {
  return englishSkillLabels[skillCode];
}

function addDays(baseDate: Date, days: number) {
  const nextDate = new Date(baseDate);
  nextDate.setUTCDate(nextDate.getUTCDate() + days);
  return nextDate;
}

function pickReviewIntervalDays(reps: number) {
  return srsIntervalsInDays[Math.min(reps, srsIntervalsInDays.length - 1)];
}

function inferEnglishSkillCode(question: EnglishQuestion): EnglishSkillCode {
  const haystack = `${question.prompt} ${question.explanation}`.toLowerCase();

  if (
    haystack.includes("preposition") ||
    haystack.includes("between") ||
    haystack.includes("on the corner") ||
    haystack.includes("talk about")
  ) {
    return "preposition_collocation";
  }

  if (
    haystack.includes("word form") ||
    haystack.includes("correct form") ||
    haystack.includes("past participle") ||
    haystack.includes("noun") ||
    haystack.includes("adjective") ||
    haystack.includes("adverb")
  ) {
    return "word_form";
  }

  if (
    haystack.includes("main idea") ||
    haystack.includes("best title") ||
    haystack.includes("main purpose") ||
    haystack.includes("answer fits") ||
    haystack.includes("question matches") ||
    haystack.includes("question asks") ||
    haystack.includes("the answer should")
  ) {
    return "reading_comprehension";
  }

  if (
    haystack.includes("grammatically correct") ||
    haystack.includes("present simple") ||
    haystack.includes("present perfect") ||
    haystack.includes("simple past") ||
    haystack.includes("comparative") ||
    haystack.includes("passive") ||
    haystack.includes("reported speech") ||
    haystack.includes("use 'there is'") ||
    haystack.includes("use 'there are'") ||
    haystack.includes("repeated or habitual") ||
    haystack.includes("with third-person singular")
  ) {
    return "grammar_tense";
  }

  if (
    haystack.includes("which sentence is correct") ||
    haystack.includes("choose the correct sentence") ||
    haystack.includes("contrast two ideas") ||
    haystack.includes("expresses an opinion")
  ) {
    return "sentence_structure";
  }

  if (
    haystack.includes("closest in meaning") ||
    haystack.includes("opposite of") ||
    haystack.includes("odd one out") ||
    haystack.includes("best word") ||
    haystack.includes("means") ||
    haystack.includes("describes")
  ) {
    return "vocabulary_meaning";
  }

  return "vocabulary_meaning";
}

function buildEnglishSkillFeedback(
  question: Pick<EnglishQuestion, "prompt" | "explanation">,
  skillCode: EnglishSkillCode,
) {
  const skillLabel = getEnglishSkillLabel(skillCode);
  const explanationBase = question.explanation.trim();
  const explanationVi = `Em đang cần xem lại kỹ năng ${skillLabel.toLowerCase()}. ${explanationBase}`;

  const hintBySkill: Record<EnglishSkillCode, string> = {
    grammar_tense: "Xem kỹ dấu hiệu thời gian và cấu trúc động từ trước khi chọn đáp án.",
    sentence_structure: "Đọc toàn câu trước, rồi kiểm tra trật tự từ và mối liên kết giữa các ý.",
    word_form: "Nhìn từ đứng trước và sau chỗ trống để đoán từ loại cần dùng.",
    vocabulary_meaning: "Khoanh vùng nghĩa của câu trước, rồi mới so sánh sắc thái của từng từ.",
    preposition_collocation: "Tập trung vào cụm từ cố định hoặc quan hệ vị trí trong câu.",
    reading_comprehension: "Tìm từ khóa trong câu hỏi và đối chiếu lại ý chính trước khi chọn.",
    error_identification: "So từng phần của câu với mẫu đúng để phát hiện chỗ bất thường.",
    sentence_transformation: "Giữ nguyên nghĩa gốc rồi kiểm tra lại chủ ngữ, động từ và liên từ.",
  };

  const memoryTipBySkill: Record<EnglishSkillCode, string> = {
    grammar_tense: "Gạch nhanh dấu hiệu thời gian trước khi làm để tránh chọn theo cảm giác.",
    sentence_structure: "Nếu một đáp án nghe thiếu tự nhiên, hãy kiểm tra lại trật tự từ trước.",
    word_form: "Danh từ, động từ, tính từ, trạng từ thường được nhận ra nhờ vị trí trong câu.",
    vocabulary_meaning: "Học từ theo cụm và ngữ cảnh sẽ nhớ lâu hơn học từ đơn lẻ.",
    preposition_collocation: "Nhiều giới từ phải học theo cụm quen thuộc chứ không dịch từng chữ.",
    reading_comprehension: "Đừng chọn đáp án chỉ vì thấy giống từ khóa; hãy kiểm tra nghĩa toàn câu.",
    error_identification: "Mỗi lần sai hãy ghi lại đúng một mẫu lỗi để lần sau nhận ra nhanh hơn.",
    sentence_transformation: "Luôn so sánh nghĩa gốc và nghĩa câu mới trước khi chốt đáp án.",
  };

  return {
    skillCode,
    skillLabel,
    explanationVi,
    hintVi: hintBySkill[skillCode],
    memoryTipVi: memoryTipBySkill[skillCode],
  } satisfies EnglishSkillFeedback;
}

async function ensureEnglishSkillInfrastructure() {
  await pool.query(`
    create table if not exists english_question_skill_tags (
      id bigint primary key auto_increment,
      question_id varchar(120) not null,
      skill_code varchar(50) not null,
      weight decimal(4,2) not null default 1.00,
      created_at timestamp default current_timestamp,
      unique key uq_english_question_skill_tags_question_skill (question_id, skill_code),
      index idx_english_question_skill_tags_question_id (question_id),
      constraint fk_english_question_skill_tags_question_id
        foreign key (question_id) references english_questions(id)
        on delete cascade
    )
  `);

  await pool.query(`
    create table if not exists student_english_skill_events (
      id bigint primary key auto_increment,
      student_id bigint not null,
      chapter_id varchar(120) not null,
      question_set_id varchar(120) not null,
      question_id varchar(120) not null,
      set_attempt_id bigint not null,
      skill_code varchar(50) not null,
      source varchar(20) not null default 'rule',
      is_correct tinyint(1) not null,
      confidence_score decimal(4,2) null,
      mistake_type varchar(50) null,
      explanation_vi text null,
      hint_vi text null,
      memory_tip_vi text null,
      created_at datetime not null,
      index idx_student_english_skill_events_student_id (student_id),
      index idx_student_english_skill_events_attempt_id (set_attempt_id),
      constraint fk_student_english_skill_events_student_id
        foreign key (student_id) references students(id)
        on delete cascade,
      constraint fk_student_english_skill_events_attempt_id
        foreign key (set_attempt_id) references student_english_set_attempts(id)
        on delete cascade,
      constraint fk_student_english_skill_events_question_id
        foreign key (question_id) references english_questions(id)
        on delete cascade
    )
  `);

  await pool.query(`
    create table if not exists student_english_review_items (
      id bigint primary key auto_increment,
      student_id bigint not null,
      chapter_id varchar(120) not null,
      skill_code varchar(50) not null,
      status varchar(20) not null default 'active',
      stability decimal(5,2) not null default 0.30,
      difficulty decimal(5,2) not null default 0.50,
      interval_days int not null default 1,
      reps int not null default 0,
      lapses int not null default 0,
      confidence_band varchar(20) null,
      last_result varchar(20) null,
      last_reviewed_at datetime null,
      next_review_at datetime null,
      created_at timestamp default current_timestamp,
      updated_at timestamp default current_timestamp on update current_timestamp,
      unique key uq_student_english_review_items_student_chapter_skill (student_id, chapter_id, skill_code),
      index idx_student_english_review_items_due (student_id, next_review_at),
      constraint fk_student_english_review_items_student_id
        foreign key (student_id) references students(id)
        on delete cascade
    )
  `);
}

function buildAttemptHistory(attempts: SetAttemptRow[]): HistoryScorePoint[] {
  return [...attempts]
    .sort((a, b) => a.submittedAt.getTime() - b.submittedAt.getTime())
    .map((attempt) => ({
      submittedAt: attempt.submittedAt.toISOString(),
      scorePercent: Number(attempt.scorePercent),
    }));
}

function buildHistoryChapter(
  chapterRow: HistoryChapterRow,
  setRows: HistoryQuestionSetRow[],
  questionRows: HistoryQuestionRow[],
) {
  const questionSets: HistoryQuestionSet[] = setRows
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((setRow) => {
      const questions: HistoryQuestion[] = questionRows
        .filter((questionRow) => questionRow.setId === setRow.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((questionRow) => ({
          id: questionRow.id,
          prompt: questionRow.prompt,
          options: parseJsonArray(questionRow.optionsJson),
          correctOption: questionRow.correctOption,
          explanation: questionRow.explanation,
        }));

      return {
        id: setRow.id,
        title: setRow.title,
        questions,
      };
    });

  return {
    id: chapterRow.id,
    title: chapterRow.title,
    summary: chapterRow.summary,
    textbookScope: chapterRow.textbookScope,
    questionSets,
    modeContent: {
      learn: {
        overview: chapterRow.learnOverview,
        keyIdeas: parseJsonArray(chapterRow.learnKeyIdeasJson),
      },
      review: {
        checklist: parseJsonArray(chapterRow.reviewChecklistJson),
        quickPrompts: parseJsonArray(chapterRow.reviewQuickPromptsJson),
      },
    },
  };
}

function buildGeographyChapter(
  chapterRow: HistoryChapterRow,
  setRows: HistoryQuestionSetRow[],
  questionRows: HistoryQuestionRow[],
) {
  const questionSets: GeographyQuestionSet[] = setRows
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((setRow) => {
      const questions: GeographyQuestion[] = questionRows
        .filter((questionRow) => questionRow.setId === setRow.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((questionRow) => ({
          id: questionRow.id,
          prompt: questionRow.prompt,
          options: parseJsonArray(questionRow.optionsJson),
          correctOption: questionRow.correctOption,
          explanation: questionRow.explanation,
        }));

      return {
        id: setRow.id,
        title: setRow.title,
        questions,
      };
    });

  return {
    id: chapterRow.id,
    title: chapterRow.title,
    summary: chapterRow.summary,
    textbookScope: chapterRow.textbookScope,
    questionSets,
    modeContent: {
      learn: {
        overview: chapterRow.learnOverview,
        keyIdeas: parseJsonArray(chapterRow.learnKeyIdeasJson),
      },
      review: {
        checklist: parseJsonArray(chapterRow.reviewChecklistJson),
        quickPrompts: parseJsonArray(chapterRow.reviewQuickPromptsJson),
      },
    },
  };
}

function buildEnglishChapter(
  chapterRow: HistoryChapterRow,
  setRows: HistoryQuestionSetRow[],
  questionRows: HistoryQuestionRow[],
) {
  const questionSets: EnglishQuestionSet[] = setRows
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((setRow) => {
      const questions: EnglishQuestion[] = questionRows
        .filter((questionRow) => questionRow.setId === setRow.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((questionRow) => ({
          id: questionRow.id,
          prompt: questionRow.prompt,
          options: parseJsonArray(questionRow.optionsJson),
          correctOption: questionRow.correctOption,
          explanation: questionRow.explanation,
        }));

      return {
        id: setRow.id,
        title: setRow.title,
        questions,
      };
    });

  return {
    id: chapterRow.id,
    title: chapterRow.title,
    summary: chapterRow.summary,
    textbookScope: chapterRow.textbookScope,
    questionSets,
    modeContent: {
      learn: {
        overview: chapterRow.learnOverview,
        keyIdeas: parseJsonArray(chapterRow.learnKeyIdeasJson),
      },
      review: {
        checklist: parseJsonArray(chapterRow.reviewChecklistJson),
        quickPrompts: parseJsonArray(chapterRow.reviewQuickPromptsJson),
      },
    },
  };
}

function buildMathChapter(
  chapterRow: HistoryChapterRow,
  setRows: HistoryQuestionSetRow[],
  questionRows: HistoryQuestionRow[],
) {
  const questionSets: MathQuestionSet[] = setRows
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((setRow) => {
      const questions: MathQuestion[] = questionRows
        .filter((questionRow) => questionRow.setId === setRow.id)
        .sort((a, b) => a.sortOrder - b.sortOrder)
        .map((questionRow) => ({
          id: questionRow.id,
          prompt: questionRow.prompt,
          options: parseJsonArray(questionRow.optionsJson),
          correctOption: questionRow.correctOption,
          explanation: questionRow.explanation,
        }));

      return {
        id: setRow.id,
        title: setRow.title,
        questions,
      };
    });

  return {
    id: chapterRow.id,
    title: chapterRow.title,
    summary: chapterRow.summary,
    textbookScope: chapterRow.textbookScope,
    questionSets,
    modeContent: {
      learn: {
        overview: chapterRow.learnOverview,
        keyIdeas: parseJsonArray(chapterRow.learnKeyIdeasJson),
      },
      review: {
        checklist: parseJsonArray(chapterRow.reviewChecklistJson),
        quickPrompts: parseJsonArray(chapterRow.reviewQuickPromptsJson),
      },
    },
  };
}

export function verifyPassword(password: string, hash: string) {
  if (!hash) {
    return false;
  }

  if (hash.startsWith("scrypt:")) {
    const [, salt, derivedKey] = hash.split(":");
    if (!salt || !derivedKey) {
      return false;
    }

    const candidate = crypto.scryptSync(password, salt, 64);
    const stored = Buffer.from(derivedKey, "hex");

    return stored.length === candidate.length && crypto.timingSafeEqual(stored, candidate);
  }

  const legacyHash = crypto
    .scryptSync(password, "vieted-local-salt", 64)
    .toString("hex");

  return legacyHash === hash;
}

export async function findStudentByPhoneNumber(phoneNumber: string) {
  const [rows] = await pool.query(
    `select id, full_name as fullName, grade, phone_number as phoneNumber,
            email, password_hash as passwordHash, auth_provider as authProvider,
            auth_provider_user_id as authProviderUserId, avatar_key as avatarKey
     from students
     where phone_number = ?
     limit 1`,
    [phoneNumber],
  );

  return (rows as DbStudent[])[0] ?? null;
}

export async function findStudentByEmail(email: string) {
  const [rows] = await pool.query(
    `select id, full_name as fullName, grade, phone_number as phoneNumber,
            email, password_hash as passwordHash, auth_provider as authProvider,
            auth_provider_user_id as authProviderUserId, avatar_key as avatarKey
     from students
     where email = ?
     limit 1`,
    [email],
  );

  return (rows as DbStudent[])[0] ?? null;
}

export async function findStudentByProviderIdentity(
  authProvider: string,
  authProviderUserId: string,
) {
  const [rows] = await pool.query(
    `select id, full_name as fullName, grade, phone_number as phoneNumber,
            email, password_hash as passwordHash, auth_provider as authProvider,
            auth_provider_user_id as authProviderUserId, avatar_key as avatarKey
     from students
     where auth_provider = ?
       and auth_provider_user_id = ?
     limit 1`,
    [authProvider, authProviderUserId],
  );

  return (rows as DbStudent[])[0] ?? null;
}

export async function createStudentSession(studentId: number) {
  const sessionToken = crypto.randomUUID();

  await pool.query(
    `insert into student_sessions (session_token, student_id, expires_at)
     values (?, ?, date_add(utc_timestamp(), interval 7 day))`,
    [sessionToken, studentId],
  );

  return sessionToken;
}

export async function createStudentPhoneOtp(
  phoneNumber: string,
  purpose: string,
  code: string,
  expiresAt: Date,
) {
  await pool.query(
    `delete from student_phone_otps
     where phone_number = ?
       and purpose = ?`,
    [phoneNumber, purpose],
  );

  await pool.query(
    `insert into student_phone_otps (
       phone_number, purpose, code_hash, expires_at
     )
     values (?, ?, ?, ?)`,
    [phoneNumber, purpose, createOtpHash(code), expiresAt],
  );
}

export async function findValidStudentPhoneOtp(
  phoneNumber: string,
  purpose: string,
  code: string,
) {
  const [rows] = await pool.query(
    `select id, phone_number as phoneNumber, purpose, code_hash as codeHash,
            expires_at as expiresAt, used_at as usedAt
     from student_phone_otps
     where phone_number = ?
       and purpose = ?
       and code_hash = ?
       and used_at is null
       and expires_at > utc_timestamp()
     order by id desc
     limit 1`,
    [phoneNumber, purpose, createOtpHash(code)],
  );

  return (rows as DbStudentPhoneOtp[])[0] ?? null;
}

export async function markStudentPhoneOtpUsed(otpId: number) {
  await pool.query(
    `update student_phone_otps
     set used_at = utc_timestamp()
     where id = ?`,
    [otpId],
  );
}

export async function createStudentAccount(
  options: {
    phoneNumber?: string;
    email?: string;
    password?: string;
    fullName?: string;
    grade?: number;
    authProvider?: string;
    authProviderUserId?: string;
  },
) {
  const phoneNumber = options.phoneNumber?.trim() || null;
  const email = options.email?.trim().toLowerCase() || null;
  const authProvider = options.authProvider?.trim() || "phone";
  const authProviderUserId = options.authProviderUserId?.trim() || null;
  const fullName =
    options.fullName?.trim() ||
    (phoneNumber
      ? `Học sinh ${phoneNumber.slice(-4)}`
      : email
        ? email.split("@")[0]
        : "Học sinh Trường Điểm Online");
  const grade = options.grade ?? 9;
  const passwordHash = options.password ? createPasswordHash(options.password) : null;
  const avatarKey = studentAvatarPresets[0].key;

  const [result] = await pool.query(
    `insert into students (
       full_name, grade, phone_number, email, password_hash,
       auth_provider, auth_provider_user_id, avatar_key
     )
     values (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      fullName,
      grade,
      phoneNumber,
      email,
      passwordHash,
      authProvider,
      authProviderUserId,
      avatarKey,
    ],
  );

  const studentId = (result as InsertResult).insertId;

  await pool.query(
    `insert into study_preferences (
       student_id, current_grade, current_subject,
       current_history_chapter_id, current_geography_chapter_id, current_english_chapter_id,
       current_math_chapter_id
     )
     values (?, ?, 'history', 'chuong-1-the-gioi-1918-1945', 'chuong-1-dia-li-dan-cu-viet-nam', 'unit-1-local-community', 'chuong-1-can-bac-hai-va-can-thuc')
     on duplicate key update
       current_grade = values(current_grade),
       current_subject = values(current_subject),
       current_history_chapter_id = values(current_history_chapter_id),
       current_geography_chapter_id = values(current_geography_chapter_id),
       current_english_chapter_id = values(current_english_chapter_id),
       current_math_chapter_id = values(current_math_chapter_id)`,
    [studentId, grade],
  );

  return {
    id: studentId,
    fullName,
    grade,
    phoneNumber,
    email,
    passwordHash,
    authProvider,
    authProviderUserId,
    avatarKey,
  } satisfies DbStudent;
}

export async function findStudentBySessionToken(sessionToken: string) {
  const [rows] = await pool.query(
    `select s.id, s.full_name as fullName, s.grade, s.phone_number as phoneNumber,
            s.email, s.password_hash as passwordHash, s.auth_provider as authProvider,
            s.auth_provider_user_id as authProviderUserId, s.avatar_key as avatarKey
     from student_sessions ss
     join students s on s.id = ss.student_id
     where ss.session_token = ?
       and ss.expires_at > utc_timestamp()
     limit 1`,
    [sessionToken],
  );

  return (rows as DbStudent[])[0] ?? null;
}

export async function deleteStudentSession(sessionToken: string) {
  await pool.query(
    `delete from student_sessions
     where session_token = ?`,
    [sessionToken],
  );
}

export async function getStudentById(studentId: number) {
  const [rows] = await pool.query(
    `select id, full_name as fullName, grade, phone_number as phoneNumber,
            email, password_hash as passwordHash, auth_provider as authProvider,
            auth_provider_user_id as authProviderUserId, avatar_key as avatarKey
     from students
     where id = ?
     limit 1`,
    [studentId],
  );

  return (rows as DbStudent[])[0] ?? null;
}

export async function updateStudentAvatar(studentId: number, avatarKey: string) {
  const avatar = studentAvatarPresets.find((item) => item.key === avatarKey);
  if (!avatar) {
    return false;
  }

  await pool.query(
    `update students
     set avatar_key = ?
     where id = ?`,
    [avatar.key, studentId],
  );

  return true;
}

export async function updateStudentPassword(studentId: number, nextPassword: string) {
  const passwordHash = createPasswordHash(nextPassword);

  await pool.query(
    `update students
     set password_hash = ?
     where id = ?`,
    [passwordHash, studentId],
  );
}

export async function updateStudentNickname(studentId: number, nickname: string) {
  await pool.query(
    `update students
     set full_name = ?
     where id = ?`,
    [nickname, studentId],
  );
}

export async function getStudentStudyPreference(studentId: number) {
  const [rows] = await pool.query(
    `select current_grade as currentGrade, current_subject as currentSubject,
            current_history_chapter_id as currentHistoryChapterId,
            current_geography_chapter_id as currentGeographyChapterId,
            current_english_chapter_id as currentEnglishChapterId,
            current_math_chapter_id as currentMathChapterId
     from study_preferences
     where student_id = ?
     limit 1`,
    [studentId],
  );

  return (rows as DbStudyPreference[])[0] ?? null;
}

export async function saveStudentStudyPreference(
  studentId: number,
  currentGrade: number,
  currentSubject: string,
) {
  await pool.query(
    `insert into study_preferences (
       student_id, current_grade, current_subject,
       current_history_chapter_id, current_geography_chapter_id, current_english_chapter_id,
       current_math_chapter_id
     )
     values (?, ?, ?, 'chuong-1-the-gioi-1918-1945', 'chuong-1-dia-li-dan-cu-viet-nam', 'unit-1-local-community', 'chuong-1-can-bac-hai-va-can-thuc')
     on duplicate key update
       current_grade = values(current_grade),
       current_subject = values(current_subject)`,
    [studentId, currentGrade, currentSubject],
  );
}

export async function saveStudentHistoryChapter(
  studentId: number,
  currentHistoryChapterId: string,
) {
  await pool.query(
    `insert into study_preferences (
       student_id, current_grade, current_subject,
       current_history_chapter_id, current_geography_chapter_id, current_english_chapter_id,
       current_math_chapter_id
     )
     values (?, 9, 'history', ?, 'chuong-1-dia-li-dan-cu-viet-nam', 'unit-1-local-community', 'chuong-1-can-bac-hai-va-can-thuc')
     on duplicate key update
       current_history_chapter_id = values(current_history_chapter_id)`,
    [studentId, currentHistoryChapterId],
  );
}

export async function saveStudentGeographyChapter(
  studentId: number,
  currentGeographyChapterId: string,
) {
  await pool.query(
    `insert into study_preferences (
       student_id, current_grade, current_subject,
       current_history_chapter_id, current_geography_chapter_id, current_english_chapter_id,
       current_math_chapter_id
     )
     values (?, 9, 'geography', 'chuong-1-the-gioi-1918-1945', ?, 'unit-1-local-community', 'chuong-1-can-bac-hai-va-can-thuc')
     on duplicate key update
       current_geography_chapter_id = values(current_geography_chapter_id)`,
    [studentId, currentGeographyChapterId],
  );
}

export async function saveStudentEnglishChapter(
  studentId: number,
  currentEnglishChapterId: string,
) {
  await pool.query(
    `insert into study_preferences (
       student_id, current_grade, current_subject,
       current_history_chapter_id, current_geography_chapter_id, current_english_chapter_id,
       current_math_chapter_id
     )
     values (?, 9, 'english', 'chuong-1-the-gioi-1918-1945', 'chuong-1-dia-li-dan-cu-viet-nam', ?, 'chuong-1-can-bac-hai-va-can-thuc')
     on duplicate key update
       current_english_chapter_id = values(current_english_chapter_id)`,
    [studentId, currentEnglishChapterId],
  );
}

export async function saveStudentMathChapter(
  studentId: number,
  currentMathChapterId: string,
) {
  await pool.query(
    `insert into study_preferences (
       student_id, current_grade, current_subject,
       current_history_chapter_id, current_geography_chapter_id, current_english_chapter_id,
       current_math_chapter_id
     )
     values (?, 9, 'math', 'chuong-1-the-gioi-1918-1945', 'chuong-1-dia-li-dan-cu-viet-nam', 'unit-1-local-community', ?)
     on duplicate key update
       current_math_chapter_id = values(current_math_chapter_id)`,
    [studentId, currentMathChapterId],
  );
}

export async function ensureHistoryContentSeeded() {
  for (const [chapterIndex, chapter] of grade9HistoryChapters.entries()) {
    const modeContent = getHistoryChapterModeContent(chapter.id);
    if (!modeContent) {
      continue;
    }

    await pool.query(
      `insert into history_chapters (
         id, title, summary, textbook_scope, learn_overview,
         learn_key_ideas_json, review_checklist_json, review_quick_prompts_json, sort_order
       ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
       on duplicate key update
         title = values(title),
         summary = values(summary),
         textbook_scope = values(textbook_scope),
         learn_overview = values(learn_overview),
         learn_key_ideas_json = values(learn_key_ideas_json),
         review_checklist_json = values(review_checklist_json),
         review_quick_prompts_json = values(review_quick_prompts_json),
         sort_order = values(sort_order)`,
      [
        chapter.id,
        chapter.title,
        chapter.summary,
        chapter.textbookScope,
        modeContent.learn.overview,
        JSON.stringify(modeContent.learn.keyIdeas),
        JSON.stringify(modeContent.review.checklist),
        JSON.stringify(modeContent.review.quickPrompts),
        chapterIndex + 1,
      ],
    );

    for (const [setIndex, questionSet] of chapter.questionSets.entries()) {
      await pool.query(
        `insert into history_question_sets (id, chapter_id, title, sort_order)
         values (?, ?, ?, ?)
         on duplicate key update
           chapter_id = values(chapter_id),
           title = values(title),
           sort_order = values(sort_order)`,
        [questionSet.id, chapter.id, questionSet.title, setIndex + 1],
      );

      for (const [questionIndex, question] of questionSet.questions.entries()) {
        await pool.query(
          `insert into history_questions (
             id, question_set_id, prompt, options_json,
             correct_option, explanation, sort_order
           ) values (?, ?, ?, ?, ?, ?, ?)
           on duplicate key update
             question_set_id = values(question_set_id),
             prompt = values(prompt),
             options_json = values(options_json),
             correct_option = values(correct_option),
             explanation = values(explanation),
             sort_order = values(sort_order)`,
          [
            question.id,
            questionSet.id,
            question.prompt,
            JSON.stringify(question.options),
            question.correctOption,
            question.explanation,
            questionIndex + 1,
          ],
        );
      }
    }
  }
}

export async function ensureGeographyContentSeeded() {
  for (const [chapterIndex, chapter] of grade9GeographyChapters.entries()) {
    const modeContent = getGeographyChapterModeContent(chapter.id);
    if (!modeContent) {
      continue;
    }

    await pool.query(
      `insert into geography_chapters (
         id, title, summary, textbook_scope, learn_overview,
         learn_key_ideas_json, review_checklist_json, review_quick_prompts_json, sort_order
       ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
       on duplicate key update
         title = values(title),
         summary = values(summary),
         textbook_scope = values(textbook_scope),
         learn_overview = values(learn_overview),
         learn_key_ideas_json = values(learn_key_ideas_json),
         review_checklist_json = values(review_checklist_json),
         review_quick_prompts_json = values(review_quick_prompts_json),
         sort_order = values(sort_order)`,
      [
        chapter.id,
        chapter.title,
        chapter.summary,
        chapter.textbookScope,
        modeContent.learn.overview,
        JSON.stringify(modeContent.learn.keyIdeas),
        JSON.stringify(modeContent.review.checklist),
        JSON.stringify(modeContent.review.quickPrompts),
        chapterIndex + 1,
      ],
    );

    for (const [setIndex, questionSet] of chapter.questionSets.entries()) {
      await pool.query(
        `insert into geography_question_sets (id, chapter_id, title, sort_order)
         values (?, ?, ?, ?)
         on duplicate key update
           chapter_id = values(chapter_id),
           title = values(title),
           sort_order = values(sort_order)`,
        [questionSet.id, chapter.id, questionSet.title, setIndex + 1],
      );

      for (const [questionIndex, question] of questionSet.questions.entries()) {
        await pool.query(
          `insert into geography_questions (
             id, question_set_id, prompt, options_json, correct_option, explanation, sort_order
           ) values (?, ?, ?, ?, ?, ?, ?)
           on duplicate key update
             question_set_id = values(question_set_id),
             prompt = values(prompt),
             options_json = values(options_json),
             correct_option = values(correct_option),
             explanation = values(explanation),
             sort_order = values(sort_order)`,
          [
            question.id,
            questionSet.id,
            question.prompt,
            JSON.stringify(question.options),
            question.correctOption,
            question.explanation,
            questionIndex + 1,
          ],
        );
      }
    }
  }
}

export async function ensureEnglishContentSeeded() {
  await ensureEnglishSkillInfrastructure();

  for (const [chapterIndex, chapter] of grade9EnglishChapters.entries()) {
    const modeContent = getEnglishChapterModeContent(chapter.id);
    if (!modeContent) {
      continue;
    }

    await pool.query(
      `insert into english_chapters (
         id, title, summary, textbook_scope, learn_overview,
         learn_key_ideas_json, review_checklist_json, review_quick_prompts_json, sort_order
       ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
       on duplicate key update
         title = values(title),
         summary = values(summary),
         textbook_scope = values(textbook_scope),
         learn_overview = values(learn_overview),
         learn_key_ideas_json = values(learn_key_ideas_json),
         review_checklist_json = values(review_checklist_json),
         review_quick_prompts_json = values(review_quick_prompts_json),
         sort_order = values(sort_order)`,
      [
        chapter.id,
        chapter.title,
        chapter.summary,
        chapter.textbookScope,
        modeContent.learn.overview,
        JSON.stringify(modeContent.learn.keyIdeas),
        JSON.stringify(modeContent.review.checklist),
        JSON.stringify(modeContent.review.quickPrompts),
        chapterIndex + 1,
      ],
    );

    for (const [setIndex, questionSet] of chapter.questionSets.entries()) {
      await pool.query(
        `insert into english_question_sets (id, chapter_id, title, sort_order)
         values (?, ?, ?, ?)
         on duplicate key update
           chapter_id = values(chapter_id),
           title = values(title),
           sort_order = values(sort_order)`,
        [questionSet.id, chapter.id, questionSet.title, setIndex + 1],
      );

      for (const [questionIndex, question] of questionSet.questions.entries()) {
        await pool.query(
          `insert into english_questions (
             id, question_set_id, prompt, options_json, correct_option, explanation, sort_order
           ) values (?, ?, ?, ?, ?, ?, ?)
           on duplicate key update
             question_set_id = values(question_set_id),
             prompt = values(prompt),
             options_json = values(options_json),
             correct_option = values(correct_option),
             explanation = values(explanation),
             sort_order = values(sort_order)`,
          [
            question.id,
            questionSet.id,
            question.prompt,
            JSON.stringify(question.options),
            question.correctOption,
            question.explanation,
            questionIndex + 1,
          ],
        );

        const inferredSkillCode = inferEnglishSkillCode(question);
        await pool.query(
          `insert into english_question_skill_tags (question_id, skill_code, weight)
           values (?, ?, 1.00)
           on duplicate key update
             weight = values(weight)`,
          [question.id, inferredSkillCode],
        );
      }
    }
  }
}

export async function ensureMathContentSeeded() {
  for (const [chapterIndex, chapter] of grade9MathChapters.entries()) {
    const modeContent = getMathChapterModeContent(chapter.id);
    if (!modeContent) {
      continue;
    }

    await pool.query(
      `insert into math_chapters (
         id, title, summary, textbook_scope, learn_overview,
         learn_key_ideas_json, review_checklist_json, review_quick_prompts_json, sort_order
       ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)
       on duplicate key update
         title = values(title),
         summary = values(summary),
         textbook_scope = values(textbook_scope),
         learn_overview = values(learn_overview),
         learn_key_ideas_json = values(learn_key_ideas_json),
         review_checklist_json = values(review_checklist_json),
         review_quick_prompts_json = values(review_quick_prompts_json),
         sort_order = values(sort_order)`,
      [
        chapter.id,
        chapter.title,
        chapter.summary,
        chapter.textbookScope,
        modeContent.learn.overview,
        JSON.stringify(modeContent.learn.keyIdeas),
        JSON.stringify(modeContent.review.checklist),
        JSON.stringify(modeContent.review.quickPrompts),
        chapterIndex + 1,
      ],
    );

    for (const [setIndex, questionSet] of chapter.questionSets.entries()) {
      await pool.query(
        `insert into math_question_sets (id, chapter_id, title, sort_order)
         values (?, ?, ?, ?)
         on duplicate key update
           chapter_id = values(chapter_id),
           title = values(title),
           sort_order = values(sort_order)`,
        [questionSet.id, chapter.id, questionSet.title, setIndex + 1],
      );

      for (const [questionIndex, question] of questionSet.questions.entries()) {
        await pool.query(
          `insert into math_questions (
             id, question_set_id, prompt, options_json, correct_option, explanation, sort_order
           ) values (?, ?, ?, ?, ?, ?, ?)
           on duplicate key update
             question_set_id = values(question_set_id),
             prompt = values(prompt),
             options_json = values(options_json),
             correct_option = values(correct_option),
             explanation = values(explanation),
             sort_order = values(sort_order)`,
          [
            question.id,
            questionSet.id,
            question.prompt,
            JSON.stringify(question.options),
            question.correctOption,
            question.explanation,
            questionIndex + 1,
          ],
        );
      }
    }
  }
}

export async function listHistoryChaptersFromDb() {
  await ensureHistoryContentSeeded();

  const [rows] = await pool.query(
    `select
       id, title, summary, textbook_scope as textbookScope,
       learn_overview as learnOverview,
       learn_key_ideas_json as learnKeyIdeasJson,
       review_checklist_json as reviewChecklistJson,
       review_quick_prompts_json as reviewQuickPromptsJson,
       sort_order as sortOrder
     from history_chapters
     order by sort_order asc`,
  );

  return rows as HistoryChapterRow[];
}

export async function getHistoryChapterByIdFromDb(chapterId: string) {
  await ensureHistoryContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       id, title, summary, textbook_scope as textbookScope,
       learn_overview as learnOverview,
       learn_key_ideas_json as learnKeyIdeasJson,
       review_checklist_json as reviewChecklistJson,
       review_quick_prompts_json as reviewQuickPromptsJson,
       sort_order as sortOrder
     from history_chapters
     where id = ?
     limit 1`,
    [chapterId],
  );

  const chapterRow = (chapterRows as HistoryChapterRow[])[0];
  if (!chapterRow) {
    return null;
  }

  const [setRows] = await pool.query(
    `select id, chapter_id as chapterId, title, sort_order as sortOrder
     from history_question_sets
     where chapter_id = ?
     order by sort_order asc`,
    [chapterId],
  );

  const [questionRows] = await pool.query(
    `select q.id, q.question_set_id as setId, q.prompt, q.options_json as optionsJson,
            q.correct_option as correctOption, q.explanation, q.sort_order as sortOrder
     from history_questions q
     join history_question_sets s on s.id = q.question_set_id
     where s.chapter_id = ?
     order by s.sort_order asc, q.sort_order asc`,
    [chapterId],
  );

  return buildHistoryChapter(
    chapterRow,
    setRows as HistoryQuestionSetRow[],
    questionRows as HistoryQuestionRow[],
  );
}

export async function getHistoryQuestionSetByIdFromDb(
  chapterId: string,
  setId: string,
) {
  await ensureHistoryContentSeeded();

  const [setRows] = await pool.query(
    `select
       s.id,
       s.chapter_id as chapterId,
       s.title,
       s.sort_order as sortOrder,
       c.title as chapterTitle
     from history_question_sets s
     join history_chapters c on c.id = s.chapter_id
     where s.chapter_id = ? and s.id = ?
     limit 1`,
    [chapterId, setId],
  );

  const setRow = (setRows as Array<HistoryQuestionSetRow & { chapterTitle: string }>)[0];
  if (!setRow) {
    return null;
  }

  const [questionRows] = await pool.query(
    `select id, question_set_id as setId, prompt, options_json as optionsJson,
            correct_option as correctOption, explanation, sort_order as sortOrder
     from history_questions
     where question_set_id = ?
     order by sort_order asc`,
    [setId],
  );

  const questions: HistoryQuestion[] = (questionRows as HistoryQuestionRow[]).map(
    (questionRow) => ({
      id: questionRow.id,
      prompt: questionRow.prompt,
      options: parseJsonArray(questionRow.optionsJson),
      correctOption: questionRow.correctOption,
      explanation: questionRow.explanation,
    }),
  );

  return {
    chapterId,
    chapterTitle: setRow.chapterTitle,
    id: setRow.id,
    title: setRow.title,
    questions,
  };
}

export async function getHistoryTextbookChapter(chapterId: string) {
  await ensureHistoryContentSeeded();

  const [rows] = await pool.query(
    `select chapter_id as chapterId, source_label as sourceLabel, content_text as contentText
     from history_textbook_chapters
     where chapter_id = ?
     limit 1`,
    [chapterId],
  );

  return (rows as HistoryTextbookChapter[])[0] ?? null;
}

export async function listGeographyChaptersFromDb() {
  await ensureGeographyContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       id,
       title,
       summary,
       textbook_scope as textbookScope,
       learn_overview as learnOverview,
       learn_key_ideas_json as learnKeyIdeasJson,
       review_checklist_json as reviewChecklistJson,
       review_quick_prompts_json as reviewQuickPromptsJson,
       sort_order as sortOrder
     from geography_chapters
     order by sort_order asc`,
  );

  const chapters = chapterRows as HistoryChapterRow[];
  const [setRows] = await pool.query(
    `select id, chapter_id as chapterId, title, sort_order as sortOrder
     from geography_question_sets
     order by sort_order asc`,
  );
  const [questionRows] = await pool.query(
    `select id, question_set_id as setId, prompt, options_json as optionsJson,
            correct_option as correctOption, explanation, sort_order as sortOrder
     from geography_questions
     order by sort_order asc`,
  );

  return chapters.map((chapterRow) =>
    buildGeographyChapter(
      chapterRow,
      (setRows as HistoryQuestionSetRow[]).filter((setRow) => setRow.chapterId === chapterRow.id),
      questionRows as HistoryQuestionRow[],
    ),
  );
}

export async function getGeographyChapterByIdFromDb(chapterId: string) {
  await ensureGeographyContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       id,
       title,
       summary,
       textbook_scope as textbookScope,
       learn_overview as learnOverview,
       learn_key_ideas_json as learnKeyIdeasJson,
       review_checklist_json as reviewChecklistJson,
       review_quick_prompts_json as reviewQuickPromptsJson,
       sort_order as sortOrder
     from geography_chapters
     where id = ?
     limit 1`,
    [chapterId],
  );

  const chapterRow = (chapterRows as HistoryChapterRow[])[0];
  if (!chapterRow) {
    return null;
  }

  const [setRows] = await pool.query(
    `select id, chapter_id as chapterId, title, sort_order as sortOrder
     from geography_question_sets
     where chapter_id = ?
     order by sort_order asc`,
    [chapterId],
  );
  const [questionRows] = await pool.query(
    `select q.id, q.question_set_id as setId, q.prompt, q.options_json as optionsJson,
            q.correct_option as correctOption, q.explanation, q.sort_order as sortOrder
     from geography_questions q
     join geography_question_sets s on s.id = q.question_set_id
     where s.chapter_id = ?
     order by s.sort_order asc, q.sort_order asc`,
    [chapterId],
  );

  return buildGeographyChapter(
    chapterRow,
    setRows as HistoryQuestionSetRow[],
    questionRows as HistoryQuestionRow[],
  );
}

export async function getGeographyQuestionSetByIdFromDb(chapterId: string, setId: string) {
  await ensureGeographyContentSeeded();

  const [setRows] = await pool.query(
    `select s.id, s.title, c.title as chapterTitle
     from geography_question_sets s
     join geography_chapters c on c.id = s.chapter_id
     where s.id = ? and s.chapter_id = ?
     limit 1`,
    [setId, chapterId],
  );

  const setRow = (setRows as Array<{ id: string; title: string; chapterTitle: string }>)[0];
  if (!setRow) {
    return null;
  }

  const [questionRows] = await pool.query(
    `select id, question_set_id as setId, prompt, options_json as optionsJson,
            correct_option as correctOption, explanation, sort_order as sortOrder
     from geography_questions
     where question_set_id = ?
     order by sort_order asc`,
    [setId],
  );

  const questions: GeographyQuestion[] = (questionRows as HistoryQuestionRow[]).map((row) => ({
    id: row.id,
    prompt: row.prompt,
    options: parseJsonArray(row.optionsJson),
    correctOption: row.correctOption,
    explanation: row.explanation,
  }));

  return {
    chapterId,
    chapterTitle: setRow.chapterTitle,
    id: setRow.id,
    title: setRow.title,
    questions,
  };
}

export async function listEnglishChaptersFromDb() {
  await ensureEnglishContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       id,
       title,
       summary,
       textbook_scope as textbookScope,
       learn_overview as learnOverview,
       learn_key_ideas_json as learnKeyIdeasJson,
       review_checklist_json as reviewChecklistJson,
       review_quick_prompts_json as reviewQuickPromptsJson,
       sort_order as sortOrder
     from english_chapters
     order by sort_order asc`,
  );

  const chapters = chapterRows as HistoryChapterRow[];
  const [setRows] = await pool.query(
    `select id, chapter_id as chapterId, title, sort_order as sortOrder
     from english_question_sets
     order by sort_order asc`,
  );
  const [questionRows] = await pool.query(
    `select id, question_set_id as setId, prompt, options_json as optionsJson,
            correct_option as correctOption, explanation, sort_order as sortOrder
     from english_questions
     order by sort_order asc`,
  );

  return chapters.map((chapterRow) =>
    buildEnglishChapter(
      chapterRow,
      (setRows as HistoryQuestionSetRow[]).filter((setRow) => setRow.chapterId === chapterRow.id),
      questionRows as HistoryQuestionRow[],
    ),
  );
}

export async function getEnglishChapterByIdFromDb(chapterId: string) {
  await ensureEnglishContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       id,
       title,
       summary,
       textbook_scope as textbookScope,
       learn_overview as learnOverview,
       learn_key_ideas_json as learnKeyIdeasJson,
       review_checklist_json as reviewChecklistJson,
       review_quick_prompts_json as reviewQuickPromptsJson,
       sort_order as sortOrder
     from english_chapters
     where id = ?
     limit 1`,
    [chapterId],
  );

  const chapterRow = (chapterRows as HistoryChapterRow[])[0];
  if (!chapterRow) {
    return null;
  }

  const [setRows] = await pool.query(
    `select id, chapter_id as chapterId, title, sort_order as sortOrder
     from english_question_sets
     where chapter_id = ?
     order by sort_order asc`,
    [chapterId],
  );
  const [questionRows] = await pool.query(
    `select q.id, q.question_set_id as setId, q.prompt, q.options_json as optionsJson,
            q.correct_option as correctOption, q.explanation, q.sort_order as sortOrder
     from english_questions q
     join english_question_sets s on s.id = q.question_set_id
     where s.chapter_id = ?
     order by s.sort_order asc, q.sort_order asc`,
    [chapterId],
  );

  return buildEnglishChapter(
    chapterRow,
    setRows as HistoryQuestionSetRow[],
    questionRows as HistoryQuestionRow[],
  );
}

export async function getEnglishQuestionSetByIdFromDb(chapterId: string, setId: string) {
  await ensureEnglishContentSeeded();

  const [setRows] = await pool.query(
    `select s.id, s.title, c.title as chapterTitle
     from english_question_sets s
     join english_chapters c on c.id = s.chapter_id
     where s.id = ? and s.chapter_id = ?
     limit 1`,
    [setId, chapterId],
  );

  const setRow = (setRows as Array<{ id: string; title: string; chapterTitle: string }>)[0];
  if (!setRow) {
    return null;
  }

  const [questionRows] = await pool.query(
    `select id, question_set_id as setId, prompt, options_json as optionsJson,
            correct_option as correctOption, explanation, sort_order as sortOrder
     from english_questions
     where question_set_id = ?
     order by sort_order asc`,
    [setId],
  );

  const questions: EnglishQuestion[] = (questionRows as HistoryQuestionRow[]).map((row) => ({
    id: row.id,
    prompt: row.prompt,
    options: parseJsonArray(row.optionsJson),
    correctOption: row.correctOption,
    explanation: row.explanation,
  }));

  return {
    chapterId,
    chapterTitle: setRow.chapterTitle,
    id: setRow.id,
    title: setRow.title,
    questions,
  };
}

async function getEnglishQuestionSkillCodeMap(questions: EnglishQuestion[]) {
  if (questions.length === 0) {
    return new Map<string, EnglishSkillCode>();
  }

  const [tagRows] = await pool.query(
    `select question_id as questionId, skill_code as skillCode
     from english_question_skill_tags
     where question_id in (?)`,
    [questions.map((question) => question.id)],
  );

  const tagMap = new Map<string, EnglishSkillCode>();
  for (const row of tagRows as EnglishQuestionSkillTagRow[]) {
    tagMap.set(row.questionId, row.skillCode);
  }

  for (const question of questions) {
    if (!tagMap.has(question.id)) {
      tagMap.set(question.id, inferEnglishSkillCode(question));
    }
  }

  return tagMap;
}

async function getStudentEnglishReviewItemsMap(studentId: number, chapterId: string) {
  const [reviewRows] = await pool.query(
    `select
       id,
       student_id as studentId,
       chapter_id as chapterId,
       skill_code as skillCode,
       reps,
       lapses,
       interval_days as intervalDays,
       next_review_at as nextReviewAt
     from student_english_review_items
     where student_id = ? and chapter_id = ?`,
    [studentId, chapterId],
  );

  return new Map(
    (reviewRows as EnglishReviewItemRow[]).map((row) => [row.skillCode, row] as const),
  );
}

async function upsertEnglishReviewItem(
  studentId: number,
  chapterId: string,
  skillCode: EnglishSkillCode,
  isCorrect: boolean,
  existingItem: EnglishReviewItemRow | undefined,
) {
  const now = new Date();

  if (isCorrect && !existingItem) {
    return null;
  }

  if (!isCorrect) {
    const lapses = (existingItem?.lapses ?? 0) + 1;
    const nextReviewAt = addDays(now, 1);
    const intervalDays = 1;
    const reps = 0;

    await pool.query(
      `insert into student_english_review_items (
         student_id, chapter_id, skill_code, status, stability, difficulty,
         interval_days, reps, lapses, last_result, last_reviewed_at, next_review_at
       ) values (?, ?, ?, 'active', ?, ?, ?, ?, ?, 'wrong', utc_timestamp(), ?)
       on duplicate key update
         status = values(status),
         stability = values(stability),
         difficulty = values(difficulty),
         interval_days = values(interval_days),
         reps = values(reps),
         lapses = values(lapses),
         last_result = values(last_result),
         last_reviewed_at = values(last_reviewed_at),
         next_review_at = values(next_review_at)`,
      [
        studentId,
        chapterId,
        skillCode,
        0.25,
        0.7,
        intervalDays,
        reps,
        lapses,
        nextReviewAt,
      ],
    );

    return nextReviewAt;
  }

  const reps = (existingItem?.reps ?? 0) + 1;
  const intervalDays = pickReviewIntervalDays(reps);
  const nextReviewAt = addDays(now, intervalDays);

  await pool.query(
    `update student_english_review_items
     set status = 'active',
         stability = ?,
         difficulty = ?,
         interval_days = ?,
         reps = ?,
         last_result = 'correct',
         last_reviewed_at = utc_timestamp(),
         next_review_at = ?
     where student_id = ? and chapter_id = ? and skill_code = ?`,
    [0.4 + reps * 0.15, 0.4, intervalDays, reps, nextReviewAt, studentId, chapterId, skillCode],
  );

  return nextReviewAt;
}

export async function listDueEnglishReviewItems(
  studentId: number,
  chapterId?: string,
) {
  await ensureEnglishContentSeeded();

  const params: Array<number | string> = [studentId];
  let chapterFilter = "";
  if (chapterId) {
    chapterFilter = " and chapter_id = ?";
    params.push(chapterId);
  }

  const [reviewRows] = await pool.query(
    `select
       chapter_id as chapterId,
       skill_code as skillCode,
       interval_days as intervalDays,
       reps,
       lapses,
       next_review_at as nextReviewAt,
       last_result as lastResult
     from student_english_review_items
     where student_id = ?
       ${chapterFilter}
       and next_review_at is not null
       and next_review_at <= utc_timestamp()
     order by next_review_at asc, updated_at desc`,
    params,
  );

  return (reviewRows as Array<{
    chapterId: string;
    skillCode: EnglishSkillCode;
    intervalDays: number;
    reps: number;
    lapses: number;
    nextReviewAt: Date;
    lastResult: string | null;
  }>).map((row) => ({
    chapterId: row.chapterId,
    skillCode: row.skillCode,
    skillLabel: getEnglishSkillLabel(row.skillCode),
    intervalDays: row.intervalDays,
    reps: row.reps,
    lapses: row.lapses,
    nextReviewAt: row.nextReviewAt.toISOString(),
    lastResult: row.lastResult,
  }));
}

function getEnglishChapterSkillCodes(chapter: (typeof grade9EnglishChapters)[number]) {
  return [...new Set(chapter.questionSets.flatMap((set) => set.questions.map(inferEnglishSkillCode)))];
}

export async function getEnglishChapterLevelStatuses(
  studentId: number | null | undefined,
  selectedChapterId?: string,
) {
  await ensureEnglishContentSeeded();

  if (!studentId) {
    return grade9EnglishChapters.map((chapter, index) => {
      const gateSet = chapter.questionSets[chapter.questionSets.length - 1];
      return {
        chapterId: chapter.id,
        title: chapter.title,
        index,
        isUnlocked: index === 0,
        isCompleted: false,
        isCurrent: index === 0,
        gateSetId: gateSet.id,
        gateSetTitle: gateSet.title,
        gateBestScore: null,
        requiredSkillCount: getEnglishChapterSkillCodes(chapter).length,
        masteredSkillCount: 0,
      } satisfies EnglishChapterLevelStatus;
    });
  }

  const [attemptRows] = await pool.query(
    `select
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       max(a.score_percent) as bestScore
     from student_english_set_attempts a
     where a.student_id = ?
     group by a.chapter_id, a.question_set_id`,
    [studentId],
  );

  const [skillRows] = await pool.query(
    `select
       chapter_id as chapterId,
       skill_code as skillCode,
       sum(case when is_correct = 1 then 1 else 0 end) as correctCount,
       count(*) as totalCount
     from student_english_skill_events
     where student_id = ?
     group by chapter_id, skill_code`,
    [studentId],
  );

  const bestScoreMap = new Map<string, number>();
  for (const row of attemptRows as Array<{
    chapterId: string;
    questionSetId: string;
    bestScore: number | string;
  }>) {
    bestScoreMap.set(
      `${row.chapterId}:${row.questionSetId}`,
      Number(row.bestScore),
    );
  }

  const skillAccuracyMap = new Map<string, number>();
  for (const row of skillRows as Array<{
    chapterId: string;
    skillCode: EnglishSkillCode;
    correctCount: number | string;
    totalCount: number | string;
  }>) {
    const totalCount = Number(row.totalCount);
    const correctCount = Number(row.correctCount);
    skillAccuracyMap.set(
      `${row.chapterId}:${row.skillCode}`,
      totalCount > 0 ? (correctCount / totalCount) * 100 : 0,
    );
  }

  let unlockedSoFar = true;
  let foundCurrent = false;

  const statuses = grade9EnglishChapters.map((chapter, index) => {
    const gateSet = chapter.questionSets[chapter.questionSets.length - 1];
    const gateBestScore = bestScoreMap.get(`${chapter.id}:${gateSet.id}`) ?? null;
    const skillCodes = getEnglishChapterSkillCodes(chapter);
    const masteredSkillCount = skillCodes.filter((skillCode) => {
      const accuracy = skillAccuracyMap.get(`${chapter.id}:${skillCode}`) ?? 0;
      return accuracy >= 80;
    }).length;
    const isCompleted =
      gateBestScore !== null &&
      gateBestScore >= 80 &&
      masteredSkillCount === skillCodes.length;
    const isUnlocked = index === 0 ? true : unlockedSoFar;
    const isSelected = selectedChapterId === chapter.id;
    const isCurrent = isUnlocked && !foundCurrent && (isSelected || !selectedChapterId);

    if (isCurrent) {
      foundCurrent = true;
    }

    unlockedSoFar = unlockedSoFar && isCompleted;

    return {
      chapterId: chapter.id,
      title: chapter.title,
      index,
      isUnlocked,
      isCompleted,
      isCurrent,
      gateSetId: gateSet.id,
      gateSetTitle: gateSet.title,
      gateBestScore,
      requiredSkillCount: skillCodes.length,
      masteredSkillCount,
    } satisfies EnglishChapterLevelStatus;
  });

  if (!statuses.some((status) => status.isCurrent)) {
    const fallbackStatus = [...statuses].reverse().find((status) => status.isUnlocked) ?? statuses[0];
    return statuses.map((status) => ({
      ...status,
      isCurrent: status.chapterId === fallbackStatus.chapterId,
    }));
  }

  return statuses;
}

export async function canStudentAccessEnglishChapter(
  studentId: number | null | undefined,
  chapterId: string,
) {
  const statuses = await getEnglishChapterLevelStatuses(studentId, chapterId);
  return statuses.find((status) => status.chapterId === chapterId) ?? null;
}

export async function listMathChaptersFromDb() {
  await ensureMathContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       id,
       title,
       summary,
       textbook_scope as textbookScope,
       learn_overview as learnOverview,
       learn_key_ideas_json as learnKeyIdeasJson,
       review_checklist_json as reviewChecklistJson,
       review_quick_prompts_json as reviewQuickPromptsJson,
       sort_order as sortOrder
     from math_chapters
     order by sort_order asc`,
  );

  const chapters = chapterRows as HistoryChapterRow[];
  const [setRows] = await pool.query(
    `select id, chapter_id as chapterId, title, sort_order as sortOrder
     from math_question_sets
     order by sort_order asc`,
  );
  const [questionRows] = await pool.query(
    `select id, question_set_id as setId, prompt, options_json as optionsJson,
            correct_option as correctOption, explanation, sort_order as sortOrder
     from math_questions
     order by sort_order asc`,
  );

  return chapters.map((chapterRow) =>
    buildMathChapter(
      chapterRow,
      (setRows as HistoryQuestionSetRow[]).filter((setRow) => setRow.chapterId === chapterRow.id),
      questionRows as HistoryQuestionRow[],
    ),
  );
}

export async function getMathChapterByIdFromDb(chapterId: string) {
  await ensureMathContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       id,
       title,
       summary,
       textbook_scope as textbookScope,
       learn_overview as learnOverview,
       learn_key_ideas_json as learnKeyIdeasJson,
       review_checklist_json as reviewChecklistJson,
       review_quick_prompts_json as reviewQuickPromptsJson,
       sort_order as sortOrder
     from math_chapters
     where id = ?
     limit 1`,
    [chapterId],
  );

  const chapterRow = (chapterRows as HistoryChapterRow[])[0];
  if (!chapterRow) {
    return null;
  }

  const [setRows] = await pool.query(
    `select id, chapter_id as chapterId, title, sort_order as sortOrder
     from math_question_sets
     where chapter_id = ?
     order by sort_order asc`,
    [chapterId],
  );
  const [questionRows] = await pool.query(
    `select q.id, q.question_set_id as setId, q.prompt, q.options_json as optionsJson,
            q.correct_option as correctOption, q.explanation, q.sort_order as sortOrder
     from math_questions q
     join math_question_sets s on s.id = q.question_set_id
     where s.chapter_id = ?
     order by s.sort_order asc, q.sort_order asc`,
    [chapterId],
  );

  return buildMathChapter(
    chapterRow,
    setRows as HistoryQuestionSetRow[],
    questionRows as HistoryQuestionRow[],
  );
}

export async function getMathQuestionSetByIdFromDb(chapterId: string, setId: string) {
  await ensureMathContentSeeded();

  const [setRows] = await pool.query(
    `select s.id, s.title, c.title as chapterTitle
     from math_question_sets s
     join math_chapters c on c.id = s.chapter_id
     where s.id = ? and s.chapter_id = ?
     limit 1`,
    [setId, chapterId],
  );

  const setRow = (setRows as Array<{ id: string; title: string; chapterTitle: string }>)[0];
  if (!setRow) {
    return null;
  }

  const [questionRows] = await pool.query(
    `select id, question_set_id as setId, prompt, options_json as optionsJson,
            correct_option as correctOption, explanation, sort_order as sortOrder
     from math_questions
     where question_set_id = ?
     order by sort_order asc`,
    [setId],
  );

  const questions: MathQuestion[] = (questionRows as HistoryQuestionRow[]).map((row) => ({
    id: row.id,
    prompt: row.prompt,
    options: parseJsonArray(row.optionsJson),
    correctOption: row.correctOption,
    explanation: row.explanation,
  }));

  return {
    chapterId,
    chapterTitle: setRow.chapterTitle,
    id: setRow.id,
    title: setRow.title,
    questions,
  };
}

export async function listHistoryQuestionSetsWithProgress(
  studentId: number,
  chapterId: string,
) {
  await ensureHistoryContentSeeded();

  const chapter = await getHistoryChapterByIdFromDb(chapterId);
  if (!chapter) {
    return null;
  }

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_history_set_attempts a
     join history_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ?
     order by a.submitted_at desc`,
    [studentId, chapterId],
  );

  const attempts = attemptRows as SetAttemptRow[];

  return chapter.questionSets.map((set) => {
    const setAttempts = attempts.filter((attempt) => attempt.questionSetId === set.id);
    const latestScore =
      setAttempts.length > 0 ? Number(setAttempts[0].scorePercent) : null;
    const bestScore =
      setAttempts.length > 0
        ? Math.max(...setAttempts.map((attempt) => Number(attempt.scorePercent)))
        : null;

    return {
      setId: set.id,
      setTitle: set.title,
      questionCount: set.questions.length,
      attempts: setAttempts.length,
      bestScore,
      latestScore,
      lastSubmittedAt: toIsoOrNull(setAttempts[0]?.submittedAt ?? null),
      masteryLabel: getMasteryLabel(latestScore ?? bestScore),
      attemptHistory: buildAttemptHistory(setAttempts),
    } satisfies HistoryQuestionSetProgress;
  });
}

export async function listGeographyQuestionSetsWithProgress(
  studentId: number,
  chapterId: string,
) {
  await ensureGeographyContentSeeded();

  const chapter = await getGeographyChapterByIdFromDb(chapterId);
  if (!chapter) {
    return null;
  }

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_geography_set_attempts a
     join geography_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ?
     order by a.submitted_at desc`,
    [studentId, chapterId],
  );

  const attempts = attemptRows as SetAttemptRow[];

  return chapter.questionSets.map((set) => {
    const setAttempts = attempts.filter((attempt) => attempt.questionSetId === set.id);
    const latestScore = setAttempts.length > 0 ? Number(setAttempts[0].scorePercent) : null;
    const bestScore =
      setAttempts.length > 0
        ? Math.max(...setAttempts.map((attempt) => Number(attempt.scorePercent)))
        : null;

    return {
      setId: set.id,
      setTitle: set.title,
      questionCount: set.questions.length,
      attempts: setAttempts.length,
      bestScore,
      latestScore,
      lastSubmittedAt: toIsoOrNull(setAttempts[0]?.submittedAt ?? null),
      masteryLabel: getMasteryLabel(latestScore ?? bestScore),
      attemptHistory: buildAttemptHistory(setAttempts),
    } satisfies GeographyQuestionSetProgress;
  });
}

export async function listEnglishQuestionSetsWithProgress(
  studentId: number,
  chapterId: string,
) {
  await ensureEnglishContentSeeded();

  const chapter = await getEnglishChapterByIdFromDb(chapterId);
  if (!chapter) {
    return null;
  }

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_english_set_attempts a
     join english_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ?
     order by a.submitted_at desc`,
    [studentId, chapterId],
  );

  const attempts = attemptRows as SetAttemptRow[];

  return chapter.questionSets.map((set) => {
    const setAttempts = attempts.filter((attempt) => attempt.questionSetId === set.id);
    const latestScore = setAttempts.length > 0 ? Number(setAttempts[0].scorePercent) : null;
    const bestScore =
      setAttempts.length > 0
        ? Math.max(...setAttempts.map((attempt) => Number(attempt.scorePercent)))
        : null;

    return {
      setId: set.id,
      setTitle: set.title,
      questionCount: set.questions.length,
      attempts: setAttempts.length,
      bestScore,
      latestScore,
      lastSubmittedAt: toIsoOrNull(setAttempts[0]?.submittedAt ?? null),
      masteryLabel: getMasteryLabel(latestScore ?? bestScore),
      attemptHistory: buildAttemptHistory(setAttempts),
    } satisfies EnglishQuestionSetProgress;
  });
}

export async function listMathQuestionSetsWithProgress(
  studentId: number,
  chapterId: string,
) {
  await ensureMathContentSeeded();

  const chapter = await getMathChapterByIdFromDb(chapterId);
  if (!chapter) {
    return null;
  }

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_math_set_attempts a
     join math_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ?
     order by a.submitted_at desc`,
    [studentId, chapterId],
  );

  const attempts = attemptRows as SetAttemptRow[];

  return chapter.questionSets.map((set) => {
    const setAttempts = attempts.filter((attempt) => attempt.questionSetId === set.id);
    const latestScore = setAttempts.length > 0 ? Number(setAttempts[0].scorePercent) : null;
    const bestScore =
      setAttempts.length > 0
        ? Math.max(...setAttempts.map((attempt) => Number(attempt.scorePercent)))
        : null;

    return {
      setId: set.id,
      setTitle: set.title,
      questionCount: set.questions.length,
      attempts: setAttempts.length,
      bestScore,
      latestScore,
      lastSubmittedAt: toIsoOrNull(setAttempts[0]?.submittedAt ?? null),
      masteryLabel: getMasteryLabel(latestScore ?? bestScore),
      attemptHistory: buildAttemptHistory(setAttempts),
    } satisfies MathQuestionSetProgress;
  });
}

export async function getLatestHistoryQuestionSetAttempt(
  studentId: number,
  chapterId: string,
  setId: string,
) {
  await ensureHistoryContentSeeded();

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_history_set_attempts a
     join history_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ? and a.question_set_id = ?
     order by a.submitted_at desc
     limit 1`,
    [studentId, chapterId, setId],
  );

  const attempt = (attemptRows as SetAttemptRow[])[0];
  if (!attempt) {
    return null;
  }

  return {
    attemptId: attempt.id,
    scorePercent: Number(attempt.scorePercent),
    correctCount: attempt.correctCount,
    totalQuestions: attempt.totalQuestions,
    submittedAt: toIsoOrNull(attempt.submittedAt)!,
  };
}

export async function getLatestGeographyQuestionSetAttempt(
  studentId: number,
  chapterId: string,
  setId: string,
) {
  await ensureGeographyContentSeeded();

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_geography_set_attempts a
     join geography_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ? and a.question_set_id = ?
     order by a.submitted_at desc
     limit 1`,
    [studentId, chapterId, setId],
  );

  const attempt = (attemptRows as SetAttemptRow[])[0];
  if (!attempt) {
    return null;
  }

  return {
    attemptId: attempt.id,
    scorePercent: Number(attempt.scorePercent),
    correctCount: attempt.correctCount,
    totalQuestions: attempt.totalQuestions,
    submittedAt: toIsoOrNull(attempt.submittedAt)!,
  };
}

export async function getLatestEnglishQuestionSetAttempt(
  studentId: number,
  chapterId: string,
  setId: string,
) {
  await ensureEnglishContentSeeded();

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_english_set_attempts a
     join english_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ? and a.question_set_id = ?
     order by a.submitted_at desc
     limit 1`,
    [studentId, chapterId, setId],
  );

  const attempt = (attemptRows as SetAttemptRow[])[0];
  if (!attempt) {
    return null;
  }

  return {
    attemptId: attempt.id,
    scorePercent: Number(attempt.scorePercent),
    correctCount: attempt.correctCount,
    totalQuestions: attempt.totalQuestions,
    submittedAt: toIsoOrNull(attempt.submittedAt)!,
  };
}

export async function getLatestMathQuestionSetAttempt(
  studentId: number,
  chapterId: string,
  setId: string,
) {
  await ensureMathContentSeeded();

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_math_set_attempts a
     join math_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ? and a.question_set_id = ?
     order by a.submitted_at desc
     limit 1`,
    [studentId, chapterId, setId],
  );

  const attempt = (attemptRows as SetAttemptRow[])[0];
  if (!attempt) {
    return null;
  }

  return {
    attemptId: attempt.id,
    scorePercent: Number(attempt.scorePercent),
    correctCount: attempt.correctCount,
    totalQuestions: attempt.totalQuestions,
    submittedAt: toIsoOrNull(attempt.submittedAt)!,
  };
}

export async function submitHistoryQuestionSetAttempt(
  studentId: number,
  chapterId: string,
  setId: string,
  answers: Array<{ questionId: string; selectedOption: number }>,
) {
  await ensureHistoryContentSeeded();

  const questionSet = await getHistoryQuestionSetByIdFromDb(chapterId, setId);
  if (!questionSet) {
    return null;
  }

  const answerMap = new Map<string, number>();
  for (const answer of answers) {
    if (!Number.isInteger(answer.selectedOption)) {
      continue;
    }

    answerMap.set(answer.questionId, answer.selectedOption);
  }

  const missingQuestions = questionSet.questions.filter(
    (question) => !answerMap.has(question.id),
  );

  if (missingQuestions.length > 0) {
    return {
      ok: false as const,
      message: "Em cần chọn đáp án cho tất cả câu hỏi trước khi nộp bài.",
    };
  }

  const gradedQuestions = questionSet.questions.map((question) => {
    const selectedOption = answerMap.get(question.id)!;
    const isCorrect = selectedOption === question.correctOption;

    return {
      questionId: question.id,
      prompt: question.prompt,
      options: question.options,
      selectedOption,
      correctOption: question.correctOption,
      isCorrect,
      explanation: question.explanation,
    };
  });

  const correctCount = gradedQuestions.filter((question) => question.isCorrect).length;
  const totalQuestions = gradedQuestions.length;
  const scorePercent = Number(((correctCount / totalQuestions) * 100).toFixed(1));

  const [insertedAttempt] = await pool.query(
    `insert into student_history_set_attempts (
       student_id, chapter_id, question_set_id, score_percent,
       correct_count, total_questions, submitted_at
     ) values (?, ?, ?, ?, ?, ?, utc_timestamp())`,
    [studentId, chapterId, setId, scorePercent, correctCount, totalQuestions],
  );

  const attemptId = (insertedAttempt as InsertResult).insertId;

  for (const question of gradedQuestions) {
    await pool.query(
      `insert into student_history_question_attempts (
         set_attempt_id, student_id, chapter_id, question_set_id, question_id,
         selected_option, is_correct, created_at
       ) values (?, ?, ?, ?, ?, ?, ?, utc_timestamp())`,
      [
        attemptId,
        studentId,
        chapterId,
        setId,
        question.questionId,
        question.selectedOption,
        question.isCorrect ? 1 : 0,
      ],
    );
  }

  await pool.query(
    `insert into student_history_chapter_progress (
       student_id, chapter_id, learn_status, learn_completed_at, last_activity_at
     ) values (?, ?, 'learning', null, utc_timestamp())
     on duplicate key update
       learn_status = case
         when learn_status = 'completed' then 'completed'
         else 'learning'
       end,
       last_activity_at = values(last_activity_at)`,
    [studentId, chapterId],
  );

  return {
    ok: true as const,
    result: {
      attemptId,
      chapterId,
      chapterTitle: questionSet.chapterTitle,
      setId,
      setTitle: questionSet.title,
      scorePercent,
      correctCount,
      totalQuestions,
      submittedAt: new Date().toISOString(),
      questions: gradedQuestions,
    } satisfies HistoryQuestionSetAttemptResult,
  };
}

export async function submitGeographyQuestionSetAttempt(
  studentId: number,
  chapterId: string,
  setId: string,
  answers: Array<{ questionId: string; selectedOption: number }>,
) {
  await ensureGeographyContentSeeded();

  const questionSet = await getGeographyQuestionSetByIdFromDb(chapterId, setId);
  if (!questionSet) {
    return null;
  }

  const answerMap = new Map<string, number>();
  for (const answer of answers) {
    if (!Number.isInteger(answer.selectedOption)) {
      continue;
    }

    answerMap.set(answer.questionId, answer.selectedOption);
  }

  const missingQuestions = questionSet.questions.filter((question) => !answerMap.has(question.id));
  if (missingQuestions.length > 0) {
    return {
      ok: false as const,
      message: "Em cần chọn đáp án cho tất cả câu hỏi trước khi nộp bài.",
    };
  }

  const gradedQuestions = questionSet.questions.map((question) => {
    const selectedOption = answerMap.get(question.id)!;
    const isCorrect = selectedOption === question.correctOption;

    return {
      questionId: question.id,
      prompt: question.prompt,
      options: question.options,
      selectedOption,
      correctOption: question.correctOption,
      isCorrect,
      explanation: question.explanation,
    };
  });

  const correctCount = gradedQuestions.filter((question) => question.isCorrect).length;
  const totalQuestions = gradedQuestions.length;
  const scorePercent = Number(((correctCount / totalQuestions) * 100).toFixed(1));

  const [insertedAttempt] = await pool.query(
    `insert into student_geography_set_attempts (
       student_id, chapter_id, question_set_id, score_percent,
       correct_count, total_questions, submitted_at
     ) values (?, ?, ?, ?, ?, ?, utc_timestamp())`,
    [studentId, chapterId, setId, scorePercent, correctCount, totalQuestions],
  );

  const attemptId = (insertedAttempt as InsertResult).insertId;

  for (const question of gradedQuestions) {
    await pool.query(
      `insert into student_geography_question_attempts (
         set_attempt_id, student_id, chapter_id, question_set_id, question_id,
         selected_option, is_correct, created_at
       ) values (?, ?, ?, ?, ?, ?, ?, utc_timestamp())`,
      [
        attemptId,
        studentId,
        chapterId,
        setId,
        question.questionId,
        question.selectedOption,
        question.isCorrect ? 1 : 0,
      ],
    );
  }

  await pool.query(
    `insert into student_geography_chapter_progress (
       student_id, chapter_id, learn_status, learn_completed_at, last_activity_at
     ) values (?, ?, 'learning', null, utc_timestamp())
     on duplicate key update
       learn_status = case
         when learn_status = 'completed' then 'completed'
         else 'learning'
       end,
       last_activity_at = values(last_activity_at)`,
    [studentId, chapterId],
  );

  return {
    ok: true as const,
    result: {
      attemptId,
      chapterId,
      chapterTitle: questionSet.chapterTitle,
      setId,
      setTitle: questionSet.title,
      scorePercent,
      correctCount,
      totalQuestions,
      submittedAt: new Date().toISOString(),
      questions: gradedQuestions,
    } satisfies GeographyQuestionSetAttemptResult,
  };
}

export async function submitEnglishQuestionSetAttempt(
  studentId: number,
  chapterId: string,
  setId: string,
  answers: Array<{ questionId: string; selectedOption: number }>,
) {
  await ensureEnglishContentSeeded();

  const questionSet = await getEnglishQuestionSetByIdFromDb(chapterId, setId);
  if (!questionSet) {
    return null;
  }

  const answerMap = new Map<string, number>();
  for (const answer of answers) {
    if (!Number.isInteger(answer.selectedOption)) {
      continue;
    }

    answerMap.set(answer.questionId, answer.selectedOption);
  }

  const missingQuestions = questionSet.questions.filter((question) => !answerMap.has(question.id));
  if (missingQuestions.length > 0) {
    return {
      ok: false as const,
      message: "Em cần chọn đáp án cho tất cả câu hỏi trước khi nộp bài.",
    };
  }

  const skillCodeMap = await getEnglishQuestionSkillCodeMap(questionSet.questions);

  const gradedQuestions = questionSet.questions.map((question) => {
    const selectedOption = answerMap.get(question.id)!;
    const isCorrect = selectedOption === question.correctOption;
    const skillCode =
      skillCodeMap.get(question.id) ?? inferEnglishSkillCode(question);
    const skillFeedback = buildEnglishSkillFeedback(question, skillCode);

    return {
      questionId: question.id,
      prompt: question.prompt,
      options: question.options,
      selectedOption,
      correctOption: question.correctOption,
      isCorrect,
      explanation: question.explanation,
      ...skillFeedback,
    };
  });

  const correctCount = gradedQuestions.filter((question) => question.isCorrect).length;
  const totalQuestions = gradedQuestions.length;
  const scorePercent = Number(((correctCount / totalQuestions) * 100).toFixed(1));

  const [insertedAttempt] = await pool.query(
    `insert into student_english_set_attempts (
       student_id, chapter_id, question_set_id, score_percent,
       correct_count, total_questions, submitted_at
     ) values (?, ?, ?, ?, ?, ?, utc_timestamp())`,
    [studentId, chapterId, setId, scorePercent, correctCount, totalQuestions],
  );

  const attemptId = (insertedAttempt as InsertResult).insertId;
  const existingReviewItems = await getStudentEnglishReviewItemsMap(studentId, chapterId);
  const weakSkillState = new Map<
    EnglishSkillCode,
    { wrongCount: number; nextReviewAt: string | null }
  >();

  for (const question of gradedQuestions) {
    await pool.query(
      `insert into student_english_question_attempts (
         set_attempt_id, student_id, chapter_id, question_set_id, question_id,
         selected_option, is_correct, created_at
       ) values (?, ?, ?, ?, ?, ?, ?, utc_timestamp())`,
      [
        attemptId,
        studentId,
        chapterId,
        setId,
        question.questionId,
        question.selectedOption,
        question.isCorrect ? 1 : 0,
      ],
    );

    await pool.query(
      `insert into student_english_skill_events (
         student_id, chapter_id, question_set_id, question_id, set_attempt_id, skill_code,
         source, is_correct, confidence_score, mistake_type, explanation_vi, hint_vi,
         memory_tip_vi, created_at
       ) values (?, ?, ?, ?, ?, ?, 'rule', ?, ?, ?, ?, ?, ?, utc_timestamp())`,
      [
        studentId,
        chapterId,
        setId,
        question.questionId,
        attemptId,
        question.skillCode,
        question.isCorrect ? 1 : 0,
        null,
        question.skillCode,
        question.explanationVi,
        question.hintVi,
        question.memoryTipVi,
      ],
    );

    const nextReviewAt = await upsertEnglishReviewItem(
      studentId,
      chapterId,
      question.skillCode,
      question.isCorrect,
      existingReviewItems.get(question.skillCode),
    );

    if (nextReviewAt) {
      existingReviewItems.set(question.skillCode, {
        id: existingReviewItems.get(question.skillCode)?.id ?? 0,
        studentId,
        chapterId,
        skillCode: question.skillCode,
        reps: question.isCorrect
          ? (existingReviewItems.get(question.skillCode)?.reps ?? 0) + 1
          : 0,
        lapses: question.isCorrect
          ? existingReviewItems.get(question.skillCode)?.lapses ?? 0
          : (existingReviewItems.get(question.skillCode)?.lapses ?? 0) + 1,
        intervalDays: question.isCorrect
          ? pickReviewIntervalDays((existingReviewItems.get(question.skillCode)?.reps ?? 0) + 1)
          : 1,
        nextReviewAt,
      });
    }

    if (!question.isCorrect) {
      const currentWeakSkill = weakSkillState.get(question.skillCode);
      weakSkillState.set(question.skillCode, {
        wrongCount: (currentWeakSkill?.wrongCount ?? 0) + 1,
        nextReviewAt: nextReviewAt ? nextReviewAt.toISOString() : null,
      });
    }
  }

  await pool.query(
    `insert into student_english_chapter_progress (
       student_id, chapter_id, learn_status, learn_completed_at, last_activity_at
     ) values (?, ?, 'learning', null, utc_timestamp())
     on duplicate key update
       learn_status = case
         when learn_status = 'completed' then 'completed'
         else 'learning'
       end,
       last_activity_at = values(last_activity_at)`,
    [studentId, chapterId],
  );

  const weakSkills = [...weakSkillState.entries()]
    .map(([skillCode, state]) => ({
      skillCode,
      skillLabel: getEnglishSkillLabel(skillCode),
      wrongCount: state.wrongCount,
      nextReviewAt: state.nextReviewAt,
    }))
    .sort((left, right) => right.wrongCount - left.wrongCount);

  const [dueCountRows] = await pool.query(
    `select count(*) as total
     from student_english_review_items
     where student_id = ?
       and next_review_at is not null
       and next_review_at <= utc_timestamp()`,
    [studentId],
  );

  const dueReviewCount = Number(
    (dueCountRows as Array<{ total: number | string }>)[0]?.total ?? 0,
  );

  return {
    ok: true as const,
    result: {
      attemptId,
      chapterId,
      chapterTitle: questionSet.chapterTitle,
      setId,
      setTitle: questionSet.title,
      scorePercent,
      correctCount,
      totalQuestions,
      submittedAt: new Date().toISOString(),
      weakSkills,
      dueReviewCount,
      questions: gradedQuestions,
    } satisfies EnglishQuestionSetAttemptResult,
  };
}

export async function submitMathQuestionSetAttempt(
  studentId: number,
  chapterId: string,
  setId: string,
  answers: Array<{ questionId: string; selectedOption: number }>,
) {
  await ensureMathContentSeeded();

  const questionSet = await getMathQuestionSetByIdFromDb(chapterId, setId);
  if (!questionSet) {
    return null;
  }

  const answerMap = new Map<string, number>();
  for (const answer of answers) {
    if (!Number.isInteger(answer.selectedOption)) {
      continue;
    }

    answerMap.set(answer.questionId, answer.selectedOption);
  }

  const missingQuestions = questionSet.questions.filter((question) => !answerMap.has(question.id));
  if (missingQuestions.length > 0) {
    return {
      ok: false as const,
      message: "Em cần chọn đáp án cho tất cả câu hỏi trước khi nộp bài.",
    };
  }

  const gradedQuestions = questionSet.questions.map((question) => {
    const selectedOption = answerMap.get(question.id)!;
    const isCorrect = selectedOption === question.correctOption;

    return {
      questionId: question.id,
      prompt: question.prompt,
      options: question.options,
      selectedOption,
      correctOption: question.correctOption,
      isCorrect,
      explanation: question.explanation,
    };
  });

  const correctCount = gradedQuestions.filter((question) => question.isCorrect).length;
  const totalQuestions = gradedQuestions.length;
  const scorePercent = Number(((correctCount / totalQuestions) * 100).toFixed(1));

  const [insertedAttempt] = await pool.query(
    `insert into student_math_set_attempts (
       student_id, chapter_id, question_set_id, score_percent,
       correct_count, total_questions, submitted_at
     ) values (?, ?, ?, ?, ?, ?, utc_timestamp())`,
    [studentId, chapterId, setId, scorePercent, correctCount, totalQuestions],
  );

  const attemptId = (insertedAttempt as InsertResult).insertId;

  for (const question of gradedQuestions) {
    await pool.query(
      `insert into student_math_question_attempts (
         set_attempt_id, student_id, chapter_id, question_set_id, question_id,
         selected_option, is_correct, created_at
       ) values (?, ?, ?, ?, ?, ?, ?, utc_timestamp())`,
      [
        attemptId,
        studentId,
        chapterId,
        setId,
        question.questionId,
        question.selectedOption,
        question.isCorrect ? 1 : 0,
      ],
    );
  }

  await pool.query(
    `insert into student_math_chapter_progress (
       student_id, chapter_id, learn_status, learn_completed_at, last_activity_at
     ) values (?, ?, 'learning', null, utc_timestamp())
     on duplicate key update
       learn_status = case
         when learn_status = 'completed' then 'completed'
         else 'learning'
       end,
       last_activity_at = values(last_activity_at)`,
    [studentId, chapterId],
  );

  return {
    ok: true as const,
    result: {
      attemptId,
      chapterId,
      chapterTitle: questionSet.chapterTitle,
      setId,
      setTitle: questionSet.title,
      scorePercent,
      correctCount,
      totalQuestions,
      submittedAt: new Date().toISOString(),
      questions: gradedQuestions,
    } satisfies MathQuestionSetAttemptResult,
  };
}

export async function getHistoryEvaluationOverview(studentId: number) {
  await ensureHistoryContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       hc.id as chapterId,
       hc.title,
       coalesce(chp.learn_status, 'not_started') as learnStatus
     from history_chapters hc
     left join student_history_chapter_progress chp
       on chp.chapter_id = hc.id and chp.student_id = ?
     order by hc.sort_order asc`,
    [studentId],
  );

  const [attemptRows] = await pool.query(
    `select chapter_id as chapterId, score_percent as scorePercent
     from student_history_set_attempts
     where student_id = ?`,
    [studentId],
  );

  const [setCountRows] = await pool.query(
    "select count(*) as totalSets from history_question_sets",
  );

  const chapters = chapterRows as Array<{
    chapterId: string;
    title: string;
    learnStatus: HistoryLearnStatus;
  }>;
  const attempts = attemptRows as Array<{
    chapterId: string;
    scorePercent: number;
  }>;
  const totalSets = Number(
    (setCountRows as Array<{ totalSets: number }>)[0]?.totalSets ?? 0,
  );

  const scoreByChapter = new Map<string, number[]>();
  for (const attempt of attempts) {
    const current = scoreByChapter.get(attempt.chapterId) ?? [];
    current.push(Number(attempt.scorePercent));
    scoreByChapter.set(attempt.chapterId, current);
  }

  const chapterAverages = chapters.map((chapter) => {
    const scores = scoreByChapter.get(chapter.chapterId) ?? [];
    const average =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : null;

    return {
      title: chapter.title,
      average,
    };
  });

  const attemptedAverages = chapterAverages.filter(
    (chapter) => chapter.average !== null,
  ) as Array<{ title: string; average: number }>;

  return {
    completedLearningChapters: chapters.filter(
      (chapter) => chapter.learnStatus === "completed",
    ).length,
    totalChapters: chapters.length,
    attemptedSets: attempts.length,
    totalSets,
    averageScore:
      attempts.length > 0
        ? Number(
            (
              attempts.reduce((sum, attempt) => sum + Number(attempt.scorePercent), 0) /
              attempts.length
            ).toFixed(1),
          )
        : null,
    strongestChapter:
      attemptedAverages.sort((a, b) => b.average - a.average)[0]?.title ?? null,
    needsAttentionChapter:
      attemptedAverages.sort((a, b) => a.average - b.average)[0]?.title ?? null,
  } satisfies HistoryEvaluationOverview;
}

export async function getGeographyEvaluationOverview(studentId: number) {
  await ensureGeographyContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       gc.id as chapterId,
       gc.title,
       coalesce(gcp.learn_status, 'not_started') as learnStatus
     from geography_chapters gc
     left join student_geography_chapter_progress gcp
       on gcp.chapter_id = gc.id and gcp.student_id = ?
     order by gc.sort_order asc`,
    [studentId],
  );

  const [attemptRows] = await pool.query(
    `select chapter_id as chapterId, score_percent as scorePercent
     from student_geography_set_attempts
     where student_id = ?`,
    [studentId],
  );

  const [setCountRows] = await pool.query(
    "select count(*) as totalSets from geography_question_sets",
  );

  const chapters = chapterRows as Array<{
    chapterId: string;
    title: string;
    learnStatus: HistoryLearnStatus;
  }>;
  const attempts = attemptRows as Array<{
    chapterId: string;
    scorePercent: number;
  }>;
  const totalSets = Number((setCountRows as Array<{ totalSets: number }>)[0]?.totalSets ?? 0);

  const scoreByChapter = new Map<string, number[]>();
  for (const attempt of attempts) {
    const current = scoreByChapter.get(attempt.chapterId) ?? [];
    current.push(Number(attempt.scorePercent));
    scoreByChapter.set(attempt.chapterId, current);
  }

  const chapterAverages = chapters.map((chapter) => {
    const scores = scoreByChapter.get(chapter.chapterId) ?? [];
    const average =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : null;
    return { title: chapter.title, average };
  });

  const attemptedAverages = chapterAverages.filter(
    (chapter) => chapter.average !== null,
  ) as Array<{ title: string; average: number }>;

  return {
    completedLearningChapters: chapters.filter((chapter) => chapter.learnStatus === "completed").length,
    totalChapters: chapters.length,
    attemptedSets: attempts.length,
    totalSets,
    averageScore:
      attempts.length > 0
        ? Number(
            (
              attempts.reduce((sum, attempt) => sum + Number(attempt.scorePercent), 0) /
              attempts.length
            ).toFixed(1),
          )
        : null,
    strongestChapter: attemptedAverages.sort((a, b) => b.average - a.average)[0]?.title ?? null,
    needsAttentionChapter: attemptedAverages.sort((a, b) => a.average - b.average)[0]?.title ?? null,
  } satisfies GeographyEvaluationOverview;
}

export async function getEnglishEvaluationOverview(studentId: number) {
  await ensureEnglishContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       ec.id as chapterId,
       ec.title,
       coalesce(ecp.learn_status, 'not_started') as learnStatus
     from english_chapters ec
     left join student_english_chapter_progress ecp
       on ecp.chapter_id = ec.id and ecp.student_id = ?
     order by ec.sort_order asc`,
    [studentId],
  );

  const [attemptRows] = await pool.query(
    `select chapter_id as chapterId, score_percent as scorePercent
     from student_english_set_attempts
     where student_id = ?`,
    [studentId],
  );

  const [setCountRows] = await pool.query(
    "select count(*) as totalSets from english_question_sets",
  );

  const chapters = chapterRows as Array<{
    chapterId: string;
    title: string;
    learnStatus: HistoryLearnStatus;
  }>;
  const attempts = attemptRows as Array<{
    chapterId: string;
    scorePercent: number;
  }>;
  const totalSets = Number((setCountRows as Array<{ totalSets: number }>)[0]?.totalSets ?? 0);

  const scoreByChapter = new Map<string, number[]>();
  for (const attempt of attempts) {
    const current = scoreByChapter.get(attempt.chapterId) ?? [];
    current.push(Number(attempt.scorePercent));
    scoreByChapter.set(attempt.chapterId, current);
  }

  const chapterAverages = chapters.map((chapter) => {
    const scores = scoreByChapter.get(chapter.chapterId) ?? [];
    const average =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : null;
    return { title: chapter.title, average };
  });

  const attemptedAverages = chapterAverages.filter(
    (chapter) => chapter.average !== null,
  ) as Array<{ title: string; average: number }>;

  return {
    completedLearningChapters: chapters.filter((chapter) => chapter.learnStatus === "completed").length,
    totalChapters: chapters.length,
    attemptedSets: attempts.length,
    totalSets,
    averageScore:
      attempts.length > 0
        ? Number(
            (
              attempts.reduce((sum, attempt) => sum + Number(attempt.scorePercent), 0) /
              attempts.length
            ).toFixed(1),
          )
        : null,
    strongestChapter: attemptedAverages.sort((a, b) => b.average - a.average)[0]?.title ?? null,
    needsAttentionChapter: attemptedAverages.sort((a, b) => a.average - b.average)[0]?.title ?? null,
  } satisfies EnglishEvaluationOverview;
}

export async function getMathEvaluationOverview(studentId: number) {
  await ensureMathContentSeeded();

  const [chapterRows] = await pool.query(
    `select
       mc.id as chapterId,
       mc.title,
       coalesce(mcp.learn_status, 'not_started') as learnStatus
     from math_chapters mc
     left join student_math_chapter_progress mcp
       on mcp.chapter_id = mc.id and mcp.student_id = ?
     order by mc.sort_order asc`,
    [studentId],
  );

  const [attemptRows] = await pool.query(
    `select chapter_id as chapterId, score_percent as scorePercent
     from student_math_set_attempts
     where student_id = ?`,
    [studentId],
  );

  const [setCountRows] = await pool.query(
    "select count(*) as totalSets from math_question_sets",
  );

  const chapters = chapterRows as Array<{
    chapterId: string;
    title: string;
    learnStatus: HistoryLearnStatus;
  }>;
  const attempts = attemptRows as Array<{
    chapterId: string;
    scorePercent: number;
  }>;
  const totalSets = Number((setCountRows as Array<{ totalSets: number }>)[0]?.totalSets ?? 0);

  const scoreByChapter = new Map<string, number[]>();
  for (const attempt of attempts) {
    const current = scoreByChapter.get(attempt.chapterId) ?? [];
    current.push(Number(attempt.scorePercent));
    scoreByChapter.set(attempt.chapterId, current);
  }

  const chapterAverages = chapters.map((chapter) => {
    const scores = scoreByChapter.get(chapter.chapterId) ?? [];
    const average =
      scores.length > 0
        ? scores.reduce((sum, score) => sum + score, 0) / scores.length
        : null;
    return { title: chapter.title, average };
  });

  const attemptedAverages = chapterAverages.filter(
    (chapter) => chapter.average !== null,
  ) as Array<{ title: string; average: number }>;

  return {
    completedLearningChapters: chapters.filter((chapter) => chapter.learnStatus === "completed").length,
    totalChapters: chapters.length,
    attemptedSets: attempts.length,
    totalSets,
    averageScore:
      attempts.length > 0
        ? Number(
            (
              attempts.reduce((sum, attempt) => sum + Number(attempt.scorePercent), 0) /
              attempts.length
            ).toFixed(1),
          )
        : null,
    strongestChapter: attemptedAverages.sort((a, b) => b.average - a.average)[0]?.title ?? null,
    needsAttentionChapter: attemptedAverages.sort((a, b) => a.average - b.average)[0]?.title ?? null,
  } satisfies MathEvaluationOverview;
}

export async function getHistoryChapterEvaluation(
  studentId: number,
  chapterId: string,
) {
  await ensureHistoryContentSeeded();

  const chapter = await getHistoryChapterByIdFromDb(chapterId);
  if (!chapter) {
    return null;
  }

  const [progressRows] = await pool.query(
    `select
       chapter_id as chapterId,
       learn_status as learnStatus,
       learn_completed_at as learnCompletedAt,
       last_activity_at as lastActivityAt
     from student_history_chapter_progress
     where student_id = ? and chapter_id = ?
     limit 1`,
    [studentId, chapterId],
  );

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_history_set_attempts a
     join history_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ?
     order by a.submitted_at desc`,
    [studentId, chapterId],
  );

  const progress = (progressRows as ChapterProgressRow[])[0];
  const attempts = attemptRows as SetAttemptRow[];

  const groupedBySet = chapter.questionSets.map((set) => {
    const setAttempts = attempts.filter((attempt) => attempt.questionSetId === set.id);
    return {
      setId: set.id,
      setTitle: set.title,
      attempts: setAttempts.length,
      bestScore:
        setAttempts.length > 0
          ? Math.max(...setAttempts.map((attempt) => Number(attempt.scorePercent)))
          : null,
      latestScore:
        setAttempts.length > 0 ? Number(setAttempts[0].scorePercent) : null,
      lastSubmittedAt: toIsoOrNull(setAttempts[0]?.submittedAt ?? null),
      attemptHistory: buildAttemptHistory(setAttempts),
    };
  });

  return {
    chapterId,
    learnStatus: progress?.learnStatus ?? "not_started",
    learnCompletedAt: toIsoOrNull(progress?.learnCompletedAt ?? null),
    lastActivityAt:
      toIsoOrNull(progress?.lastActivityAt ?? null) ??
      toIsoOrNull(attempts[0]?.submittedAt ?? null),
    attemptedSets: groupedBySet.filter((set) => set.attempts > 0).length,
    totalSets: chapter.questionSets.length,
    averageScore:
      attempts.length > 0
        ? Number(
            (
              attempts.reduce(
                (sum, attempt) => sum + Number(attempt.scorePercent),
                0,
              ) / attempts.length
            ).toFixed(1),
          )
        : null,
    bestScore:
      attempts.length > 0
        ? Math.max(...attempts.map((attempt) => Number(attempt.scorePercent)))
        : null,
    lastScore: attempts.length > 0 ? Number(attempts[0].scorePercent) : null,
    setResults: groupedBySet,
  } satisfies HistoryChapterEvaluation;
}

export async function getGeographyChapterEvaluation(
  studentId: number,
  chapterId: string,
) {
  await ensureGeographyContentSeeded();

  const chapter = await getGeographyChapterByIdFromDb(chapterId);
  if (!chapter) {
    return null;
  }

  const [progressRows] = await pool.query(
    `select
       chapter_id as chapterId,
       learn_status as learnStatus,
       learn_completed_at as learnCompletedAt,
       last_activity_at as lastActivityAt
     from student_geography_chapter_progress
     where student_id = ? and chapter_id = ?
     limit 1`,
    [studentId, chapterId],
  );

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_geography_set_attempts a
     join geography_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ?
     order by a.submitted_at desc`,
    [studentId, chapterId],
  );

  const progress = (progressRows as ChapterProgressRow[])[0];
  const attempts = attemptRows as SetAttemptRow[];

  const groupedBySet = chapter.questionSets.map((set) => {
    const setAttempts = attempts.filter((attempt) => attempt.questionSetId === set.id);
    return {
      setId: set.id,
      setTitle: set.title,
      attempts: setAttempts.length,
      bestScore:
        setAttempts.length > 0
          ? Math.max(...setAttempts.map((attempt) => Number(attempt.scorePercent)))
          : null,
      latestScore: setAttempts.length > 0 ? Number(setAttempts[0].scorePercent) : null,
      lastSubmittedAt: toIsoOrNull(setAttempts[0]?.submittedAt ?? null),
      attemptHistory: buildAttemptHistory(setAttempts),
    };
  });

  return {
    chapterId,
    learnStatus: progress?.learnStatus ?? "not_started",
    learnCompletedAt: toIsoOrNull(progress?.learnCompletedAt ?? null),
    lastActivityAt:
      toIsoOrNull(progress?.lastActivityAt ?? null) ?? toIsoOrNull(attempts[0]?.submittedAt ?? null),
    attemptedSets: groupedBySet.filter((set) => set.attempts > 0).length,
    totalSets: chapter.questionSets.length,
    averageScore:
      attempts.length > 0
        ? Number(
            (
              attempts.reduce((sum, attempt) => sum + Number(attempt.scorePercent), 0) /
              attempts.length
            ).toFixed(1),
          )
        : null,
    bestScore:
      attempts.length > 0 ? Math.max(...attempts.map((attempt) => Number(attempt.scorePercent))) : null,
    lastScore: attempts.length > 0 ? Number(attempts[0].scorePercent) : null,
    setResults: groupedBySet,
  } satisfies GeographyChapterEvaluation;
}

export async function getEnglishChapterEvaluation(
  studentId: number,
  chapterId: string,
) {
  await ensureEnglishContentSeeded();

  const chapter = await getEnglishChapterByIdFromDb(chapterId);
  if (!chapter) {
    return null;
  }

  const [progressRows] = await pool.query(
    `select
       chapter_id as chapterId,
       learn_status as learnStatus,
       learn_completed_at as learnCompletedAt,
       last_activity_at as lastActivityAt
     from student_english_chapter_progress
     where student_id = ? and chapter_id = ?
     limit 1`,
    [studentId, chapterId],
  );

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_english_set_attempts a
     join english_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ?
     order by a.submitted_at desc`,
    [studentId, chapterId],
  );

  const progress = (progressRows as ChapterProgressRow[])[0];
  const attempts = attemptRows as SetAttemptRow[];

  const groupedBySet = chapter.questionSets.map((set) => {
    const setAttempts = attempts.filter((attempt) => attempt.questionSetId === set.id);
    return {
      setId: set.id,
      setTitle: set.title,
      attempts: setAttempts.length,
      bestScore:
        setAttempts.length > 0
          ? Math.max(...setAttempts.map((attempt) => Number(attempt.scorePercent)))
          : null,
      latestScore: setAttempts.length > 0 ? Number(setAttempts[0].scorePercent) : null,
      lastSubmittedAt: toIsoOrNull(setAttempts[0]?.submittedAt ?? null),
      attemptHistory: buildAttemptHistory(setAttempts),
    };
  });

  return {
    chapterId,
    learnStatus: progress?.learnStatus ?? "not_started",
    learnCompletedAt: toIsoOrNull(progress?.learnCompletedAt ?? null),
    lastActivityAt:
      toIsoOrNull(progress?.lastActivityAt ?? null) ?? toIsoOrNull(attempts[0]?.submittedAt ?? null),
    attemptedSets: groupedBySet.filter((set) => set.attempts > 0).length,
    totalSets: chapter.questionSets.length,
    averageScore:
      attempts.length > 0
        ? Number(
            (
              attempts.reduce((sum, attempt) => sum + Number(attempt.scorePercent), 0) /
              attempts.length
            ).toFixed(1),
          )
        : null,
    bestScore:
      attempts.length > 0 ? Math.max(...attempts.map((attempt) => Number(attempt.scorePercent))) : null,
    lastScore: attempts.length > 0 ? Number(attempts[0].scorePercent) : null,
    setResults: groupedBySet,
  } satisfies EnglishChapterEvaluation;
}

export async function getMathChapterEvaluation(
  studentId: number,
  chapterId: string,
) {
  await ensureMathContentSeeded();

  const chapter = await getMathChapterByIdFromDb(chapterId);
  if (!chapter) {
    return null;
  }

  const [progressRows] = await pool.query(
    `select
       chapter_id as chapterId,
       learn_status as learnStatus,
       learn_completed_at as learnCompletedAt,
       last_activity_at as lastActivityAt
     from student_math_chapter_progress
     where student_id = ? and chapter_id = ?
     limit 1`,
    [studentId, chapterId],
  );

  const [attemptRows] = await pool.query(
    `select
       a.id,
       a.chapter_id as chapterId,
       a.question_set_id as questionSetId,
       s.title as setTitle,
       a.score_percent as scorePercent,
       a.correct_count as correctCount,
       a.total_questions as totalQuestions,
       a.submitted_at as submittedAt
     from student_math_set_attempts a
     join math_question_sets s on s.id = a.question_set_id
     where a.student_id = ? and a.chapter_id = ?
     order by a.submitted_at desc`,
    [studentId, chapterId],
  );

  const progress = (progressRows as ChapterProgressRow[])[0];
  const attempts = attemptRows as SetAttemptRow[];

  const groupedBySet = chapter.questionSets.map((set) => {
    const setAttempts = attempts.filter((attempt) => attempt.questionSetId === set.id);
    return {
      setId: set.id,
      setTitle: set.title,
      attempts: setAttempts.length,
      bestScore:
        setAttempts.length > 0
          ? Math.max(...setAttempts.map((attempt) => Number(attempt.scorePercent)))
          : null,
      latestScore: setAttempts.length > 0 ? Number(setAttempts[0].scorePercent) : null,
      lastSubmittedAt: toIsoOrNull(setAttempts[0]?.submittedAt ?? null),
      attemptHistory: buildAttemptHistory(setAttempts),
    };
  });

  return {
    chapterId,
    learnStatus: progress?.learnStatus ?? "not_started",
    learnCompletedAt: toIsoOrNull(progress?.learnCompletedAt ?? null),
    lastActivityAt:
      toIsoOrNull(progress?.lastActivityAt ?? null) ?? toIsoOrNull(attempts[0]?.submittedAt ?? null),
    attemptedSets: groupedBySet.filter((set) => set.attempts > 0).length,
    totalSets: chapter.questionSets.length,
    averageScore:
      attempts.length > 0
        ? Number(
            (
              attempts.reduce((sum, attempt) => sum + Number(attempt.scorePercent), 0) /
              attempts.length
            ).toFixed(1),
          )
        : null,
    bestScore:
      attempts.length > 0 ? Math.max(...attempts.map((attempt) => Number(attempt.scorePercent))) : null,
    lastScore: attempts.length > 0 ? Number(attempts[0].scorePercent) : null,
    setResults: groupedBySet,
  } satisfies MathChapterEvaluation;
}
