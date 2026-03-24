import assert from "node:assert/strict";
import test from "node:test";
import { grade9EnglishChapters } from "../lib/english-grade-9";
import {
  getGrade9EnglishChapterEndPage,
  getGrade9EnglishChapterStartPage,
  grade9EnglishChapterStartPages,
} from "../lib/english-textbook";
import { grade9GeographyChapters } from "../lib/geography-grade-9";
import {
  getGrade9GeographyChapterEndPage,
  getGrade9GeographyChapterStartPage,
  grade9GeographyChapterStartPages,
} from "../lib/geography-textbook";
import { grade9HistoryChapters } from "../lib/history-grade-9";
import { grade9MathChapters } from "../lib/math-grade-9";
import {
  getGrade9MathChapterEndPage,
  getGrade9MathChapterStartPage,
  grade9MathChapterTextbooks,
} from "../lib/math-textbook";
import { courseCatalog, getCourseCatalogEntry } from "../lib/course-catalog";
import {
  availableSubjects,
  isSupportedStudyPreference,
  isSupportedGrade,
  supportedGrades,
} from "../lib/study-catalog";

function collectIds(chapters: Array<{
  id: string;
  questionSets: Array<{
    id: string;
    questions: Array<{ id: string; options: string[]; correctOption: number }>;
  }>;
}>) {
  const chapterIds = new Set<string>();
  const setIds = new Set<string>();
  const questionIds = new Set<string>();

  for (const chapter of chapters) {
    assert.equal(chapterIds.has(chapter.id), false, `Duplicate chapter id: ${chapter.id}`);
    chapterIds.add(chapter.id);

    for (const questionSet of chapter.questionSets) {
      assert.equal(setIds.has(questionSet.id), false, `Duplicate set id: ${questionSet.id}`);
      setIds.add(questionSet.id);

      for (const question of questionSet.questions) {
        assert.equal(
          questionIds.has(question.id),
          false,
          `Duplicate question id: ${question.id}`,
        );
        questionIds.add(question.id);
        assert.ok(question.options.length >= 4, `${question.id} should have at least 4 options`);
        assert.ok(
          question.correctOption >= 0 && question.correctOption < question.options.length,
          `${question.id} has an invalid correct option index`,
        );
      }
    }
  }

  return {
    chapterCount: chapterIds.size,
    setCount: setIds.size,
    questionCount: questionIds.size,
  };
}

test("history content bank keeps the expected production size", () => {
  const counts = collectIds(grade9HistoryChapters);

  assert.equal(counts.chapterCount, 7);
  assert.equal(counts.setCount, 21);
  assert.equal(counts.questionCount, 210);
});

test("geography content bank keeps the expected production size", () => {
  const counts = collectIds(grade9GeographyChapters);

  assert.equal(counts.chapterCount, 4);
  assert.equal(counts.setCount, 12);
  assert.equal(counts.questionCount, 120);
});

test("english content bank keeps the expected production size", () => {
  const counts = collectIds(grade9EnglishChapters);

  assert.equal(counts.chapterCount, 5);
  assert.equal(counts.setCount, 15);
  assert.equal(counts.questionCount, 150);
});

test("math content bank keeps the expected production size", () => {
  const counts = collectIds(grade9MathChapters);

  assert.equal(counts.chapterCount, 5);
  assert.equal(counts.setCount, 15);
  assert.equal(counts.questionCount, 150);
});

test("geography textbook chapter anchors stay ordered and bounded", () => {
  const starts = Object.entries(grade9GeographyChapterStartPages)
    .map(([chapterId, startPage]) => ({
      chapterId,
      startPage,
      endPage: getGrade9GeographyChapterEndPage(chapterId),
    }))
    .sort((left, right) => left.startPage - right.startPage);

  for (let index = 0; index < starts.length; index += 1) {
    const current = starts[index];

    assert.equal(getGrade9GeographyChapterStartPage(current.chapterId), current.startPage);
    assert.ok(current.endPage >= current.startPage, `${current.chapterId} has invalid bounds`);

    if (index > 0) {
      assert.ok(
        current.startPage > starts[index - 1].startPage,
        `${current.chapterId} should start after the previous chapter`,
      );
    }
  }
});

test("english textbook unit anchors stay ordered and bounded", () => {
  const starts = Object.entries(grade9EnglishChapterStartPages)
    .map(([chapterId, startPage]) => ({
      chapterId,
      startPage,
      endPage: getGrade9EnglishChapterEndPage(chapterId),
    }))
    .sort((left, right) => left.startPage - right.startPage);

  for (let index = 0; index < starts.length; index += 1) {
    const current = starts[index];

    assert.equal(getGrade9EnglishChapterStartPage(current.chapterId), current.startPage);
    assert.ok(current.endPage >= current.startPage, `${current.chapterId} has invalid bounds`);

    if (index > 0) {
      assert.ok(
        current.startPage > starts[index - 1].startPage,
        `${current.chapterId} should start after the previous chapter`,
      );
    }
  }
});

test("math textbook chapter anchors stay ordered within each volume", () => {
  const groupedByPdf = new Map<
    string,
    Array<{ chapterId: string; startPage: number; endPage: number }>
  >();

  for (const [chapterId, textbook] of Object.entries(grade9MathChapterTextbooks)) {
    const current = groupedByPdf.get(textbook.pdfPath) ?? [];
    current.push({
      chapterId,
      startPage: textbook.startPage,
      endPage: getGrade9MathChapterEndPage(chapterId),
    });
    groupedByPdf.set(textbook.pdfPath, current);
  }

  for (const chapters of groupedByPdf.values()) {
    const ordered = chapters.sort((left, right) => left.startPage - right.startPage);

    for (let index = 0; index < ordered.length; index += 1) {
      const current = ordered[index];

      assert.equal(getGrade9MathChapterStartPage(current.chapterId), current.startPage);
      assert.ok(current.endPage >= current.startPage, `${current.chapterId} has invalid bounds`);

      if (index > 0) {
        assert.ok(
          current.startPage > ordered[index - 1].startPage,
          `${current.chapterId} should start after the previous chapter in the same volume`,
        );
      }
    }
  }
});

test("study catalog exposes only supported production choices", () => {
  assert.deepEqual(supportedGrades, [6, 7, 8, 9]);
  assert.deepEqual(availableSubjects, ["history", "math", "english", "literature"]);
  assert.equal(isSupportedGrade(6), true);
  assert.equal(isSupportedGrade(9), true);
  assert.equal(isSupportedGrade(10), false);
  assert.equal(isSupportedStudyPreference(6, "history"), true);
  assert.equal(isSupportedStudyPreference(7, "math"), true);
  assert.equal(isSupportedStudyPreference(8, "english"), true);
  assert.equal(isSupportedStudyPreference(9, "literature"), true);
  assert.equal(isSupportedStudyPreference(9, "history"), true);
  assert.equal(isSupportedStudyPreference(9, "geography"), false);
  assert.equal(isSupportedStudyPreference(9, "math"), true);
  assert.equal(isSupportedStudyPreference(9, "english"), true);
  assert.equal(isSupportedStudyPreference(9, "literature"), true);
  assert.equal(isSupportedStudyPreference(10, "history"), false);
});

test("course catalog exposes grades 6 to 9 starter learning tracks", () => {
  assert.equal(courseCatalog.length, 13);
  assert.ok(getCourseCatalogEntry(6, "history"));
  assert.ok(getCourseCatalogEntry(6, "math"));
  assert.ok(getCourseCatalogEntry(6, "english"));
  assert.ok(getCourseCatalogEntry(6, "literature"));
  assert.ok(getCourseCatalogEntry(7, "history"));
  assert.ok(getCourseCatalogEntry(8, "english"));
  assert.ok(getCourseCatalogEntry(9, "literature"));
  assert.equal(getCourseCatalogEntry(9, "history") === null, true);
});
