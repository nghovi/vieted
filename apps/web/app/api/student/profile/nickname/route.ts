import { NextResponse } from "next/server";
import { getServerSessionStudent } from "@/lib/auth";
import { updateStudentNickname } from "@/lib/db";

export async function PATCH(request: Request) {
  const student = await getServerSessionStudent();

  if (!student) {
    return NextResponse.json(
      { message: "Em cần đăng nhập để cập nhật hồ sơ." },
      { status: 401 },
    );
  }

  const body = (await request.json()) as {
    nickname?: string;
  };

  const nickname = body.nickname?.trim() ?? "";

  if (nickname.length < 2) {
    return NextResponse.json(
      { message: "Biệt danh cần có ít nhất 2 ký tự." },
      { status: 400 },
    );
  }

  if (nickname.length > 40) {
    return NextResponse.json(
      { message: "Biệt danh không được vượt quá 40 ký tự." },
      { status: 400 },
    );
  }

  await updateStudentNickname(student.dbId, nickname);

  return NextResponse.json({
    ok: true,
    message: "Đã lưu biệt danh mới.",
  });
}
