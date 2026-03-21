import { NextResponse } from "next/server";
import { getServerSessionStudent } from "@/lib/auth";
import { saveStudentStudyPreference } from "@/lib/db";

const availableGrade = 9;
const availableSubjects = new Set(["history"]);

export async function POST(request: Request) {
  const student = await getServerSessionStudent();

  if (!student) {
    return NextResponse.json({ error: "Bạn chưa đăng nhập." }, { status: 401 });
  }

  const body = (await request.json()) as {
    currentGrade?: number;
    currentSubject?: string;
  };

  if (
    typeof body.currentGrade !== "number" ||
    body.currentGrade !== availableGrade
  ) {
    return NextResponse.json(
      { error: "Hiện tại VietEd mới hỗ trợ lớp 9 trong giai đoạn ra mắt đầu tiên." },
      { status: 400 },
    );
  }

  if (
    typeof body.currentSubject !== "string" ||
    !availableSubjects.has(body.currentSubject)
  ) {
    return NextResponse.json(
      { error: "Hiện tại VietEd mới hỗ trợ môn Lịch sử." },
      { status: 400 },
    );
  }

  await saveStudentStudyPreference(
    student.dbId,
    body.currentGrade,
    body.currentSubject,
  );

  return NextResponse.json({
    currentGrade: body.currentGrade,
    currentSubject: body.currentSubject,
  });
}
