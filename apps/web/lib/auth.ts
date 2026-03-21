import { cookies } from "next/headers";
import {
  createStudentSession,
  findStudentByPhoneNumber,
  findStudentBySessionToken,
  getStudentStudyPreference,
  verifyPassword,
} from "./db";

const sessionCookieName = "vieted_session";

export const defaultStudyPreference = {
  currentGrade: 9,
  currentSubject: "history",
} as const;

export function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function isValidPhoneNumber(value: string) {
  return /^0\d{9,10}$/.test(normalizePhoneNumber(value));
}

export async function validateStudentLogin(phoneNumber: string, password: string) {
  const normalizedPhone = normalizePhoneNumber(phoneNumber);

  if (!isValidPhoneNumber(normalizedPhone)) {
    return {
      ok: false as const,
      message: "Số điện thoại không hợp lệ.",
    };
  }

  if (password.trim().length < 8) {
    return {
      ok: false as const,
      message: "Mật khẩu phải có ít nhất 8 ký tự.",
    };
  }

  const student = await findStudentByPhoneNumber(normalizedPhone);

  if (!student || !verifyPassword(password, student.passwordHash)) {
    return {
      ok: false as const,
      message: "Sai số điện thoại hoặc mật khẩu.",
    };
  }

  const sessionToken = await createStudentSession(student.id);

  return {
    ok: true as const,
    student: {
      id: String(student.id),
      dbId: student.id,
      fullName: student.fullName,
      grade: student.grade,
      phoneNumber: student.phoneNumber,
    },
    sessionToken,
  };
}

export async function getServerSessionStudent() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) {
    return null;
  }

  const student = await findStudentBySessionToken(token);

  if (!student) {
    return null;
  }

  return {
    id: String(student.id),
    dbId: student.id,
    fullName: student.fullName,
    grade: student.grade,
    phoneNumber: student.phoneNumber,
  };
}

export function getSessionCookieName() {
  return sessionCookieName;
}

export async function getServerStudyPreference() {
  const student = await getServerSessionStudent();

  if (!student) {
    return {
      ...defaultStudyPreference,
      currentHistoryChapterId: "chuong-1-the-gioi-1918-1945",
    };
  }

  const preference = await getStudentStudyPreference(student.dbId);

  if (!preference) {
    return {
      ...defaultStudyPreference,
      currentHistoryChapterId: "chuong-1-the-gioi-1918-1945",
    };
  }

  return preference;
}

export async function getServerSelectedHistoryChapter() {
  const preference = await getServerStudyPreference();
  return preference.currentHistoryChapterId ?? "chuong-1-the-gioi-1918-1945";
}
