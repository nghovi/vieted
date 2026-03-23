import { NextResponse } from "next/server";
import { getServerSessionStudent } from "@/lib/auth";
import { submitGeographyQuestionSetAttempt } from "@/lib/db";

export async function POST(request: Request) {
  const student = await getServerSessionStudent();

  if (!student) {
    return NextResponse.json({ error: "Bạn chưa đăng nhập." }, { status: 401 });
  }

  const body = (await request.json()) as {
    chapterId?: string;
    setId?: string;
    answers?: Array<{ questionId: string; selectedOption: number }>;
  };

  if (
    typeof body.chapterId !== "string" ||
    typeof body.setId !== "string" ||
    !Array.isArray(body.answers)
  ) {
    return NextResponse.json({ error: "Dữ liệu nộp bài không hợp lệ." }, { status: 400 });
  }

  const result = await submitGeographyQuestionSetAttempt(
    student.dbId,
    body.chapterId,
    body.setId,
    body.answers,
  );

  if (!result) {
    return NextResponse.json({ error: "Bộ câu hỏi không tồn tại." }, { status: 404 });
  }

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ result: result.result });
}
