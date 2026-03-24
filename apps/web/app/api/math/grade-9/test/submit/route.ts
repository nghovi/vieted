import { NextResponse } from "next/server";
import { getServerSessionStudent } from "@/lib/auth";
import { submitMathQuestionSetAttempt } from "@/lib/db";

type RequestBody = {
  chapterId?: string;
  setId?: string;
  answers?: Array<{
    questionId?: string;
    selectedOption?: number;
  }>;
};

export async function POST(request: Request) {
  const student = await getServerSessionStudent();
  if (!student) {
    return NextResponse.json({ error: "Bạn chưa đăng nhập." }, { status: 401 });
  }

  const body = (await request.json()) as RequestBody;

  if (
    typeof body.chapterId !== "string" ||
    typeof body.setId !== "string" ||
    !Array.isArray(body.answers)
  ) {
    return NextResponse.json({ error: "Dữ liệu nộp bài không hợp lệ." }, { status: 400 });
  }

  const result = await submitMathQuestionSetAttempt(
    student.dbId,
    body.chapterId,
    body.setId,
    body.answers
      .filter(
        (answer): answer is { questionId: string; selectedOption: number } =>
          typeof answer.questionId === "string" &&
          typeof answer.selectedOption === "number",
      )
      .map((answer) => ({
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
      })),
  );

  if (!result) {
    return NextResponse.json({ error: "Không tìm thấy bộ câu hỏi này." }, { status: 404 });
  }

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ result: result.result });
}
