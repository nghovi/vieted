import { NextResponse } from "next/server";
import { getHistoryChapterByIdFromDb } from "@/lib/db";

type Context = {
  params: Promise<{
    chapterId: string;
  }>;
};

export async function GET(_request: Request, context: Context) {
  const { chapterId } = await context.params;
  const chapter = await getHistoryChapterByIdFromDb(chapterId);

  if (!chapter) {
    return NextResponse.json({ error: "Không tìm thấy chương." }, { status: 404 });
  }

  return NextResponse.json(chapter);
}
