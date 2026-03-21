import {
  ensureHistoryContentSeeded,
  getHistoryChapterByIdFromDb,
  listHistoryChaptersFromDb,
} from "../lib/db";

async function main() {
  await ensureHistoryContentSeeded();
  const chapterSummaries = await listHistoryChaptersFromDb();
  const chapters = await Promise.all(
    chapterSummaries.map((chapter) => getHistoryChapterByIdFromDb(chapter.id)),
  );

  const hydratedChapters = chapters.filter((chapter) => chapter !== null);

  const totalSets = hydratedChapters.reduce(
    (sum, chapter) => sum + chapter.questionSets.length,
    0,
  );
  const totalQuestions = hydratedChapters.reduce(
    (sum, chapter) =>
      sum +
      chapter.questionSets.reduce(
        (questionSum, set) => questionSum + set.questions.length,
        0,
      ),
    0,
  );

  console.log(
    JSON.stringify(
      {
        chapters: hydratedChapters.length,
        questionSets: totalSets,
        questions: totalQuestions,
      },
      null,
      2,
    ),
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
