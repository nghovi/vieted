import crypto from "node:crypto";
import { pool } from "./mysql";
import {
  getHistoryChapterModeContent,
  grade9HistoryChapters,
  type HistoryQuestion,
  type HistoryQuestionSet,
} from "./history-grade-9";

export type DbStudent = {
  id: number;
  fullName: string;
  grade: number;
  phoneNumber: string;
  passwordHash: string;
};

export type DbStudyPreference = {
  currentGrade: number;
  currentSubject: string;
  currentHistoryChapterId: string;
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
  }>;
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
};

export type HistoryQuestionSetAttemptResult = {
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

function parseJsonArray(value: string | string[]) {
  if (Array.isArray(value)) {
    return value;
  }

  return JSON.parse(value) as string[];
}

function hashPassword(password: string) {
  return crypto.scryptSync(password, "vieted-local-salt", 64).toString("hex");
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

export function verifyPassword(password: string, hash: string) {
  return hashPassword(password) === hash;
}

export async function findStudentByPhoneNumber(phoneNumber: string) {
  const [rows] = await pool.query(
    `select id, full_name as fullName, grade, phone_number as phoneNumber, password_hash as passwordHash
     from students
     where phone_number = ?
     limit 1`,
    [phoneNumber],
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

export async function findStudentBySessionToken(sessionToken: string) {
  const [rows] = await pool.query(
    `select s.id, s.full_name as fullName, s.grade, s.phone_number as phoneNumber, s.password_hash as passwordHash
     from student_sessions ss
     join students s on s.id = ss.student_id
     where ss.session_token = ?
       and ss.expires_at > utc_timestamp()
     limit 1`,
    [sessionToken],
  );

  return (rows as DbStudent[])[0] ?? null;
}

export async function getStudentStudyPreference(studentId: number) {
  const [rows] = await pool.query(
    `select current_grade as currentGrade, current_subject as currentSubject, current_history_chapter_id as currentHistoryChapterId
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
    `insert into study_preferences (student_id, current_grade, current_subject, current_history_chapter_id)
     values (?, ?, ?, 'chuong-1-the-gioi-1918-1945')
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
    `insert into study_preferences (student_id, current_grade, current_subject, current_history_chapter_id)
     values (?, 9, 'history', ?)
     on duplicate key update
       current_history_chapter_id = values(current_history_chapter_id)`,
    [studentId, currentHistoryChapterId],
  );
}

export async function ensureHistoryContentSeeded() {
  const [chapterCountRows] = await pool.query(
    "select count(*) as total from history_chapters",
  );
  const total = Number(
    (chapterCountRows as Array<{ total: number }>)[0]?.total ?? 0,
  );

  if (total > 0) {
    return;
  }

  for (const [chapterIndex, chapter] of grade9HistoryChapters.entries()) {
    const modeContent = getHistoryChapterModeContent(chapter.id);
    if (!modeContent) {
      continue;
    }

    await pool.query(
      `insert into history_chapters (
         id, title, summary, textbook_scope, learn_overview,
         learn_key_ideas_json, review_checklist_json, review_quick_prompts_json, sort_order
       ) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
         values (?, ?, ?, ?)`,
        [questionSet.id, chapter.id, questionSet.title, setIndex + 1],
      );

      for (const [questionIndex, question] of questionSet.questions.entries()) {
        await pool.query(
          `insert into history_questions (
             id, question_set_id, prompt, options_json,
             correct_option, explanation, sort_order
           ) values (?, ?, ?, ?, ?, ?, ?)`,
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

export async function ensureDemoHistoryProgressSeeded() {
  await ensureHistoryContentSeeded();

  const [attemptRows] = await pool.query(
    "select count(*) as total from student_history_set_attempts where student_id = 1",
  );
  const totalAttempts = Number(
    (attemptRows as Array<{ total: number }>)[0]?.total ?? 0,
  );

  if (totalAttempts > 0) {
    return;
  }

  await pool.query(
    `insert into student_history_chapter_progress (
       student_id, chapter_id, learn_status, learn_completed_at, last_activity_at
     ) values
       (1, 'chuong-1-the-gioi-1918-1945', 'completed', date_sub(utc_timestamp(), interval 2 day), date_sub(utc_timestamp(), interval 1 day)),
       (1, 'chuong-2-viet-nam-1918-1945', 'learning', null, date_sub(utc_timestamp(), interval 6 hour)),
       (1, 'chuong-3-the-gioi-1945-1991', 'not_started', null, null)
     on duplicate key update
       learn_status = values(learn_status),
       learn_completed_at = values(learn_completed_at),
       last_activity_at = values(last_activity_at)`,
  );

  await pool.query(
    `insert into student_history_set_attempts (
       student_id, chapter_id, question_set_id, score_percent,
       correct_count, total_questions, submitted_at
     ) values
       (1, 'chuong-1-the-gioi-1918-1945', 'c1-set-1', 80.00, 4, 5, date_sub(utc_timestamp(), interval 2 day)),
       (1, 'chuong-1-the-gioi-1918-1945', 'c1-set-2', 60.00, 3, 5, date_sub(utc_timestamp(), interval 1 day)),
       (1, 'chuong-2-viet-nam-1918-1945', 'c2-set-1', 40.00, 2, 5, date_sub(utc_timestamp(), interval 6 hour)),
       (1, 'chuong-2-viet-nam-1918-1945', 'c2-set-2', 80.00, 4, 5, date_sub(utc_timestamp(), interval 2 hour))`,
  );
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

export async function listHistoryQuestionSetsWithProgress(
  studentId: number,
  chapterId: string,
) {
  await ensureDemoHistoryProgressSeeded();

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
    } satisfies HistoryQuestionSetProgress;
  });
}

export async function getLatestHistoryQuestionSetAttempt(
  studentId: number,
  chapterId: string,
  setId: string,
) {
  await ensureDemoHistoryProgressSeeded();

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

export async function getHistoryEvaluationOverview(studentId: number) {
  await ensureDemoHistoryProgressSeeded();

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

export async function getHistoryChapterEvaluation(
  studentId: number,
  chapterId: string,
) {
  await ensureDemoHistoryProgressSeeded();

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
