import { NextResponse } from "next/server";
import { listHistoryChaptersFromDb } from "@/lib/db";

export async function GET() {
  const chapters = await listHistoryChaptersFromDb();

  return NextResponse.json(
    chapters.map((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      summary: chapter.summary,
      questionSetCount: 3,
    })),
  );
}
