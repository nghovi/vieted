import { NextResponse } from "next/server";
import { getServerSessionStudent } from "@/lib/auth";
import { getStudentById, updateStudentPassword, verifyPassword } from "@/lib/db";

export async function PATCH(request: Request) {
  const student = await getServerSessionStudent();

  if (!student) {
    return NextResponse.json(
      { message: "Em cần đăng nhập để cập nhật mật khẩu." },
      { status: 401 },
    );
  }

  const body = (await request.json()) as {
    currentPassword?: string;
    nextPassword?: string;
  };

  const currentPassword = body.currentPassword ?? "";
  const nextPassword = body.nextPassword ?? "";

  if (!currentPassword || !nextPassword) {
    return NextResponse.json(
      { message: "Em cần nhập đủ mật khẩu hiện tại và mật khẩu mới." },
      { status: 400 },
    );
  }

  if (nextPassword.trim().length < 8) {
    return NextResponse.json(
      { message: "Mật khẩu mới phải có ít nhất 8 ký tự." },
      { status: 400 },
    );
  }

  const dbStudent = await getStudentById(student.dbId);

  if (!dbStudent) {
    return NextResponse.json(
      { message: "Không tìm thấy tài khoản học sinh." },
      { status: 404 },
    );
  }

  if (dbStudent.authProvider !== "phone" || !dbStudent.passwordHash) {
    return NextResponse.json(
      { message: "Tài khoản này không dùng mật khẩu nội bộ của Trường Điểm Online." },
      { status: 400 },
    );
  }

  if (!verifyPassword(currentPassword, dbStudent.passwordHash)) {
    return NextResponse.json(
      { message: "Mật khẩu hiện tại chưa đúng." },
      { status: 400 },
    );
  }

  await updateStudentPassword(student.dbId, nextPassword);

  return NextResponse.json({
    ok: true,
    message: "Đã cập nhật mật khẩu mới.",
  });
}
