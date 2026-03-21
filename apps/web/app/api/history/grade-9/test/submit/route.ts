import { NextResponse } from "next/server";
import { getServerSessionStudent } from "@/lib/auth";
import { submitHistoryQuestionSetAttempt } from "@/lib/db";

type Payload = {
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
    return NextResponse.json({ error: "Em cần đăng nhập để làm bài kiểm tra." }, { status: 401 });
  }

  const body = (await request.json()) as Payload;
  const chapterId = body.chapterId?.trim();
  const setId = body.setId?.trim();
  const answers = Array.isArray(body.answers) ? body.answers : [];

  if (!chapterId || !setId) {
    return NextResponse.json(
      { error: "Thiếu thông tin chương hoặc bộ câu hỏi." },
      { status: 400 },
    );
  }

  const result = await submitHistoryQuestionSetAttempt(
    student.dbId,
    chapterId,
    setId,
    answers.flatMap((answer) => {
      if (
        typeof answer.questionId !== "string" ||
        !Number.isInteger(answer.selectedOption)
      ) {
        return [];
      }

      return [
        {
          questionId: answer.questionId,
          selectedOption: Number(answer.selectedOption),
        },
      ];
    }),
  );

  if (!result) {
    return NextResponse.json(
      { error: "Không tìm thấy bộ câu hỏi này." },
      { status: 404 },
    );
  }

  if (!result.ok) {
    return NextResponse.json({ error: result.message }, { status: 400 });
  }

  return NextResponse.json({ result: result.result });
}
