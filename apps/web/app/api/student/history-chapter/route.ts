import { NextResponse } from "next/server";
import { getServerSessionStudent } from "@/lib/auth";
import { saveStudentHistoryChapter } from "@/lib/db";
import { getHistoryChapterById } from "@/lib/history-grade-9";

export async function POST(request: Request) {
  const student = await getServerSessionStudent();

  if (!student) {
    return NextResponse.json({ error: "Bạn chưa đăng nhập." }, { status: 401 });
  }

  const body = (await request.json()) as {
    chapterId?: string;
  };

  if (
    typeof body.chapterId !== "string" ||
    !getHistoryChapterById(body.chapterId)
  ) {
    return NextResponse.json(
      { error: "Chương học không hợp lệ." },
      { status: 400 },
    );
  }

  await saveStudentHistoryChapter(student.dbId, body.chapterId);

  return NextResponse.json({
    chapterId: body.chapterId,
  });
}
