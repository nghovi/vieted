import { NextResponse } from "next/server";
import { getServerSessionStudent } from "@/lib/auth";
import { saveStudentEnglishChapter } from "@/lib/db";
import { getEnglishChapterById } from "@/lib/english-grade-9";

export async function POST(request: Request) {
  const student = await getServerSessionStudent();

  if (!student) {
    return NextResponse.json({ error: "Bạn chưa đăng nhập." }, { status: 401 });
  }

  const body = (await request.json()) as { chapterId?: string };

  if (typeof body.chapterId !== "string" || !getEnglishChapterById(body.chapterId)) {
    return NextResponse.json({ error: "Bài học không hợp lệ." }, { status: 400 });
  }

  await saveStudentEnglishChapter(student.dbId, body.chapterId);

  return NextResponse.json({ chapterId: body.chapterId });
}
