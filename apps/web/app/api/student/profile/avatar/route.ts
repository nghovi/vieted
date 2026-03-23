import { NextResponse } from "next/server";
import { getServerSessionStudent } from "@/lib/auth";
import { updateStudentAvatar } from "@/lib/db";

export async function PATCH(request: Request) {
  const student = await getServerSessionStudent();

  if (!student) {
    return NextResponse.json(
      { message: "Em cần đăng nhập để cập nhật hồ sơ." },
      { status: 401 },
    );
  }

  const body = (await request.json()) as {
    avatarKey?: string;
  };

  const avatarKey = body.avatarKey?.trim() ?? "";
  if (!avatarKey) {
    return NextResponse.json(
      { message: "Em hãy chọn một ảnh đại diện." },
      { status: 400 },
    );
  }

  const ok = await updateStudentAvatar(student.dbId, avatarKey);

  if (!ok) {
    return NextResponse.json(
      { message: "Ảnh đại diện này chưa khả dụng." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: "Đã lưu ảnh đại diện mới.",
  });
}
