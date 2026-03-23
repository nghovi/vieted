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
import { availableSubjects, isSupportedStudyPreference, supportedGrade } from "../lib/study-catalog";

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

test("study catalog exposes only supported production choices", () => {
  assert.equal(supportedGrade, 9);
  assert.deepEqual(availableSubjects, ["history", "geography", "english"]);
  assert.equal(isSupportedStudyPreference(9, "history"), true);
  assert.equal(isSupportedStudyPreference(9, "geography"), true);
  assert.equal(isSupportedStudyPreference(9, "english"), true);
  assert.equal(isSupportedStudyPreference(9, "math"), false);
  assert.equal(isSupportedStudyPreference(8, "history"), false);
});
