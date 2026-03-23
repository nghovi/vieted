import { cookies } from "next/headers";
import {
  createStudentAccount,
  createStudentSession,
  deleteStudentSession,
  findStudentByEmail,
  findStudentByPhoneNumber,
  findStudentByProviderIdentity,
  findStudentBySessionToken,
  getStudentAvatarPreset,
  getStudentStudyPreference,
  verifyPassword,
} from "./db";

const sessionCookieName = "vieted_session";

export const defaultStudyPreference = {
  currentGrade: 9,
  currentSubject: "history",
} as const;

export const socialAuthProviders = ["google", "facebook", "tiktok"] as const;

export type SocialAuthProvider = (typeof socialAuthProviders)[number];

function isSocialAuthProvider(value: string): value is SocialAuthProvider {
  return socialAuthProviders.includes(value as SocialAuthProvider);
}

function buildSessionStudent(student: Awaited<ReturnType<typeof findStudentBySessionToken>>) {
  if (!student) {
    return null;
  }

  const contactLabel =
    student.phoneNumber ??
    student.email ??
    (student.authProviderUserId
      ? `${getAuthProviderLabel(student.authProvider)} • ${student.authProviderUserId}`
      : getAuthProviderLabel(student.authProvider));

  return {
    id: String(student.id),
    dbId: student.id,
    fullName: student.fullName,
    grade: student.grade,
    phoneNumber: student.phoneNumber,
    email: student.email,
    authProvider: student.authProvider,
    authProviderUserId: student.authProviderUserId,
    contactLabel,
    avatar: getStudentAvatarPreset(student.avatarKey),
  };
}

export function normalizePhoneNumber(value: string) {
  return value.replace(/\D/g, "");
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function isValidPhoneNumber(value: string) {
  return /^0\d{9,10}$/.test(normalizePhoneNumber(value));
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeEmail(value));
}

export function getAuthProviderLabel(provider: string) {
  switch (provider) {
    case "google":
      return "Google";
    case "facebook":
      return "Facebook";
    case "tiktok":
      return "TikTok";
    default:
      return "Số điện thoại";
  }
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

  if (!student || student.authProvider !== "phone" || !student.passwordHash) {
    return {
      ok: false as const,
      message: "Không tìm thấy tài khoản với số điện thoại này.",
    };
  }

  if (!verifyPassword(password, student.passwordHash)) {
    return {
      ok: false as const,
      message: "Mật khẩu không đúng cho số điện thoại này.",
    };
  }

  const sessionToken = await createStudentSession(student.id);

  return {
    ok: true as const,
    isNewAccount: false,
    student: buildSessionStudent(student),
    sessionToken,
  };
}

export async function validateStudentRegistration(input: {
  phoneNumber: string;
  password: string;
  fullName?: string;
  grade?: number;
}) {
  const normalizedPhone = normalizePhoneNumber(input.phoneNumber);
  const password = input.password ?? "";
  const fullName = input.fullName?.trim() ?? "";
  const grade = Number(input.grade ?? defaultStudyPreference.currentGrade);

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

  if (fullName && fullName.length < 2) {
    return {
      ok: false as const,
      message: "Tên hiển thị cần có ít nhất 2 ký tự.",
    };
  }

  if (!Number.isInteger(grade) || grade < 1 || grade > 12) {
    return {
      ok: false as const,
      message: "Khối lớp cần nằm trong khoảng từ 1 đến 12.",
    };
  }

  const existingStudent = await findStudentByPhoneNumber(normalizedPhone);

  if (existingStudent) {
    return {
      ok: false as const,
      message: "Số điện thoại này đã được đăng ký.",
    };
  }

  const student = await createStudentAccount({
    phoneNumber: normalizedPhone,
    password,
    fullName,
    grade,
    authProvider: "phone",
  });

  const sessionToken = await createStudentSession(student.id);

  return {
    ok: true as const,
    isNewAccount: true,
    student: buildSessionStudent(student),
    sessionToken,
  };
}

export async function validateSocialAuth(input: {
  mode: "login" | "register";
  provider: string;
  providerUserId: string;
  email?: string;
  fullName?: string;
  grade?: number;
}) {
  const provider = input.provider.trim().toLowerCase();
  const providerUserId = input.providerUserId.trim();
  const email = input.email ? normalizeEmail(input.email) : "";
  const fullName = input.fullName?.trim() ?? "";
  const grade = Number(input.grade ?? defaultStudyPreference.currentGrade);

  if (!isSocialAuthProvider(provider)) {
    return {
      ok: false as const,
      message: "Nhà cung cấp đăng nhập chưa được hỗ trợ.",
    };
  }

  if (providerUserId.length < 3) {
    return {
      ok: false as const,
      message: "Cần nhập mã tài khoản hoặc username của nhà cung cấp.",
    };
  }

  if (provider === "google" && !isValidEmail(email)) {
    return {
      ok: false as const,
      message: "Tài khoản Google cần một email hợp lệ.",
    };
  }

  if (email && !isValidEmail(email)) {
    return {
      ok: false as const,
      message: "Email chưa đúng định dạng.",
    };
  }

  if (input.mode === "register") {
    if (fullName.length < 2) {
      return {
        ok: false as const,
        message: "Tên hiển thị cần có ít nhất 2 ký tự.",
      };
    }

    if (!Number.isInteger(grade) || grade < 1 || grade > 12) {
      return {
        ok: false as const,
        message: "Khối lớp cần nằm trong khoảng từ 1 đến 12.",
      };
    }
  }

  const existingByProvider = await findStudentByProviderIdentity(provider, providerUserId);

  if (input.mode === "login") {
    if (!existingByProvider) {
      return {
        ok: false as const,
        message: `Chưa có tài khoản ${getAuthProviderLabel(provider)} này. Hãy đăng ký trước.`,
      };
    }

    const sessionToken = await createStudentSession(existingByProvider.id);

    return {
      ok: true as const,
      isNewAccount: false,
      student: buildSessionStudent(existingByProvider),
      sessionToken,
    };
  }

  if (existingByProvider) {
    return {
      ok: false as const,
      message: `Tài khoản ${getAuthProviderLabel(provider)} này đã được đăng ký.`,
    };
  }

  if (email) {
    const existingByEmail = await findStudentByEmail(email);

    if (existingByEmail) {
      return {
        ok: false as const,
        message: "Email này đã được dùng cho một tài khoản khác.",
      };
    }
  }

  const student = await createStudentAccount({
    email: email || undefined,
    fullName,
    grade,
    authProvider: provider,
    authProviderUserId: providerUserId,
  });

  const sessionToken = await createStudentSession(student.id);

  return {
    ok: true as const,
    isNewAccount: true,
    student: buildSessionStudent(student),
    sessionToken,
  };
}

export async function getServerSessionStudent() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(sessionCookieName)?.value;

    if (!token) {
      return null;
    }

    const student = await findStudentBySessionToken(token);
    return buildSessionStudent(student);
  } catch (error) {
    console.error("Failed to load server session student.", error);
    return null;
  }
}

export function getSessionCookieName() {
  return sessionCookieName;
}

export async function logoutServerSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;

  if (!token) {
    return;
  }

  await deleteStudentSession(token);
}

export async function getServerStudyPreference() {
  try {
    const student = await getServerSessionStudent();

    if (!student) {
      return {
        ...defaultStudyPreference,
        currentHistoryChapterId: "chuong-1-the-gioi-1918-1945",
        currentGeographyChapterId: "chuong-1-dia-li-dan-cu-viet-nam",
        currentEnglishChapterId: "unit-1-local-community",
      };
    }

    const preference = await getStudentStudyPreference(student.dbId);

    if (!preference) {
      return {
        ...defaultStudyPreference,
        currentHistoryChapterId: "chuong-1-the-gioi-1918-1945",
        currentGeographyChapterId: "chuong-1-dia-li-dan-cu-viet-nam",
        currentEnglishChapterId: "unit-1-local-community",
      };
    }

    return preference;
  } catch (error) {
    console.error("Failed to load study preference.", error);
    return {
      ...defaultStudyPreference,
      currentHistoryChapterId: "chuong-1-the-gioi-1918-1945",
      currentGeographyChapterId: "chuong-1-dia-li-dan-cu-viet-nam",
      currentEnglishChapterId: "unit-1-local-community",
    };
  }
}

export async function getServerSelectedHistoryChapter() {
  const preference = await getServerStudyPreference();
  return preference.currentHistoryChapterId ?? "chuong-1-the-gioi-1918-1945";
}

export async function getServerSelectedGeographyChapter() {
  const preference = await getServerStudyPreference();
  return preference.currentGeographyChapterId ?? "chuong-1-dia-li-dan-cu-viet-nam";
}

export async function getServerSelectedEnglishChapter() {
  const preference = await getServerStudyPreference();
  return preference.currentEnglishChapterId ?? "unit-1-local-community";
}
