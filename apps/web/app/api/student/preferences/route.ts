import { NextResponse } from "next/server";
import { getServerSessionStudent } from "@/lib/auth";
import { saveStudentStudyPreference } from "@/lib/db";
import {
  isSupportedStudyPreference,
  supportedGrades,
} from "@/lib/study-catalog";

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
    !supportedGrades.includes(body.currentGrade as 6 | 7 | 8 | 9)
  ) {
    return NextResponse.json(
      { error: "Hiện tại hệ thống hỗ trợ từ lớp 6 đến lớp 9." },
      { status: 400 },
    );
  }

  if (
    typeof body.currentSubject !== "string" ||
    !isSupportedStudyPreference(body.currentGrade, body.currentSubject)
  ) {
    return NextResponse.json(
      { error: "Môn học chưa hợp lệ hoặc chưa khả dụng." },
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
