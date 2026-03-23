import { cookies } from "next/headers";
import {
  createStudentPhoneOtp,
  createStudentAccount,
  createStudentSession,
  deleteStudentSession,
  findStudentByEmail,
  findStudentByPhoneNumber,
  findStudentByProviderIdentity,
  findStudentBySessionToken,
  findValidStudentPhoneOtp,
  getStudentAvatarPreset,
  getStudentStudyPreference,
  markStudentPhoneOtpUsed,
  updateStudentPassword,
  verifyPassword,
} from "./db";
import { isSmsDeliveryConfigured, sendOtpSms } from "./sms";
import { isSupportedStudyPreference } from "./study-catalog";

const sessionCookieName = "vieted_session";
const facebookOauthStateCookieName = "facebook_oauth_state";
const googleOauthStateCookieName = "google_oauth_state";
const tiktokOauthStateCookieName = "tiktok_oauth_state";

export const defaultStudyPreference = {
  currentGrade: 9,
  currentSubject: "history",
} as const;

export const socialAuthProviders = ["google", "facebook", "tiktok"] as const;
export const phoneOtpPurposes = ["register", "reset-password"] as const;

export type SocialAuthProvider = (typeof socialAuthProviders)[number];
export type PhoneOtpPurpose = (typeof phoneOtpPurposes)[number];

function isSocialAuthProvider(value: string): value is SocialAuthProvider {
  return socialAuthProviders.includes(value as SocialAuthProvider);
}

function isPhoneOtpPurpose(value: string): value is PhoneOtpPurpose {
  return phoneOtpPurposes.includes(value as PhoneOtpPurpose);
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

export function isValidPassword(value: string) {
  return value.trim().length >= 8;
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

export function getTikTokOauthStateCookieName() {
  return tiktokOauthStateCookieName;
}

export function getFacebookOauthStateCookieName() {
  return facebookOauthStateCookieName;
}

export function getGoogleOauthStateCookieName() {
  return googleOauthStateCookieName;
}

export function getFacebookAuthConfig() {
  const appId = process.env.FACEBOOK_APP_ID?.trim() ?? "";
  const appSecret = process.env.FACEBOOK_APP_SECRET?.trim() ?? "";
  const redirectUri = process.env.FACEBOOK_REDIRECT_URI?.trim() ?? "";

  if (!appId || !appSecret || !redirectUri) {
    return null;
  }

  return {
    appId,
    appSecret,
    redirectUri,
  };
}

export function buildFacebookAuthorizeUrl(state: string) {
  const config = getFacebookAuthConfig();

  if (!config) {
    return null;
  }

  const params = new URLSearchParams({
    client_id: config.appId,
    redirect_uri: config.redirectUri,
    state,
    scope: "public_profile,email",
    response_type: "code",
  });

  return `https://www.facebook.com/v21.0/dialog/oauth?${params.toString()}`;
}

export function getGoogleAuthConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID?.trim() ?? "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET?.trim() ?? "";
  const redirectUri = process.env.GOOGLE_REDIRECT_URI?.trim() ?? "";

  if (!clientId || !clientSecret || !redirectUri) {
    return null;
  }

  return {
    clientId,
    clientSecret,
    redirectUri,
  };
}

export function buildGoogleAuthorizeUrl(state: string) {
  const config = getGoogleAuthConfig();

  if (!config) {
    return null;
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    access_type: "offline",
    prompt: "consent",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export function getTikTokAuthConfig() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY?.trim() ?? "";
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET?.trim() ?? "";
  const redirectUri = process.env.TIKTOK_REDIRECT_URI?.trim() ?? "";

  if (!clientKey || !clientSecret || !redirectUri) {
    return null;
  }

  return {
    clientKey,
    clientSecret,
    redirectUri,
  };
}

export function buildTikTokAuthorizeUrl(state: string) {
  const config = getTikTokAuthConfig();

  if (!config) {
    return null;
  }

  const params = new URLSearchParams({
    client_key: config.clientKey,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: "user.info.basic",
    state,
  });

  return `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;
}

export async function validateStudentLogin(phoneNumber: string, password: string) {
  const normalizedPhone = normalizePhoneNumber(phoneNumber);

  if (!isValidPhoneNumber(normalizedPhone)) {
    return {
      ok: false as const,
      message: "Số điện thoại không hợp lệ.",
    };
  }

  if (!isValidPassword(password)) {
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

export async function requestPhoneOtp(input: {
  phoneNumber: string;
  purpose: string;
}) {
  const normalizedPhone = normalizePhoneNumber(input.phoneNumber);
  const purpose = input.purpose.trim().toLowerCase();

  if (!isValidPhoneNumber(normalizedPhone)) {
    return {
      ok: false as const,
      message: "Số điện thoại không hợp lệ.",
    };
  }

  if (!isPhoneOtpPurpose(purpose)) {
    return {
      ok: false as const,
      message: "Yêu cầu OTP chưa được hỗ trợ.",
    };
  }

  const existingStudent = await findStudentByPhoneNumber(normalizedPhone);

  if (purpose === "register" && existingStudent) {
    return {
      ok: false as const,
      message: "Số điện thoại này đã được đăng ký.",
    };
  }

  if (
    purpose === "reset-password" &&
    (!existingStudent || existingStudent.authProvider !== "phone")
  ) {
    return {
      ok: false as const,
      message: "Không tìm thấy tài khoản số điện thoại này để đặt lại mật khẩu.",
    };
  }

  const otpCode = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await createStudentPhoneOtp(normalizedPhone, purpose, otpCode, expiresAt);
  let smsResult: Awaited<ReturnType<typeof sendOtpSms>>;

  try {
    smsResult = await sendOtpSms(normalizedPhone, otpCode, purpose);
  } catch (error) {
    console.error("Failed to send OTP SMS.", error);
    return {
      ok: false as const,
      message: "Không thể gửi OTP qua SMS lúc này.",
    };
  }

  return {
    ok: true as const,
    message: smsResult.delivered
      ? "Mã OTP đã được gửi qua SMS."
      : "Mã OTP đã được tạo cho số điện thoại này.",
    expiresInSeconds: 5 * 60,
    otpPreview:
      !isSmsDeliveryConfigured() && process.env.NODE_ENV !== "production" ? otpCode : undefined,
  };
}

export async function validateStudentRegistration(input: {
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  otpCode: string;
  fullName?: string;
  grade?: number;
}) {
  const normalizedPhone = normalizePhoneNumber(input.phoneNumber);
  const password = input.password ?? "";
  const confirmPassword = input.confirmPassword ?? "";
  const otpCode = input.otpCode.trim();
  const fullName = input.fullName?.trim() ?? "";
  const grade = Number(input.grade ?? defaultStudyPreference.currentGrade);

  if (!isValidPhoneNumber(normalizedPhone)) {
    return {
      ok: false as const,
      message: "Số điện thoại không hợp lệ.",
    };
  }

  if (!isValidPassword(password)) {
    return {
      ok: false as const,
      message: "Mật khẩu phải có ít nhất 8 ký tự.",
    };
  }

  if (password !== confirmPassword) {
    return {
      ok: false as const,
      message: "Mật khẩu xác nhận chưa khớp.",
    };
  }

  if (!/^\d{6}$/.test(otpCode)) {
    return {
      ok: false as const,
      message: "Mã OTP cần gồm 6 chữ số.",
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

  const otpRecord = await findValidStudentPhoneOtp(normalizedPhone, "register", otpCode);

  if (!otpRecord) {
    return {
      ok: false as const,
      message: "Mã OTP không đúng hoặc đã hết hạn.",
    };
  }

  const student = await createStudentAccount({
    phoneNumber: normalizedPhone,
    password,
    fullName,
    grade,
    authProvider: "phone",
  });

  await markStudentPhoneOtpUsed(otpRecord.id);

  const sessionToken = await createStudentSession(student.id);

  return {
    ok: true as const,
    isNewAccount: true,
    student: buildSessionStudent(student),
    sessionToken,
  };
}

export async function resetStudentPasswordWithOtp(input: {
  phoneNumber: string;
  otpCode: string;
  password: string;
  confirmPassword: string;
}) {
  const normalizedPhone = normalizePhoneNumber(input.phoneNumber);
  const otpCode = input.otpCode.trim();
  const password = input.password ?? "";
  const confirmPassword = input.confirmPassword ?? "";

  if (!isValidPhoneNumber(normalizedPhone)) {
    return {
      ok: false as const,
      message: "Số điện thoại không hợp lệ.",
    };
  }

  if (!/^\d{6}$/.test(otpCode)) {
    return {
      ok: false as const,
      message: "Mã OTP cần gồm 6 chữ số.",
    };
  }

  if (!isValidPassword(password)) {
    return {
      ok: false as const,
      message: "Mật khẩu mới phải có ít nhất 8 ký tự.",
    };
  }

  if (password !== confirmPassword) {
    return {
      ok: false as const,
      message: "Mật khẩu xác nhận chưa khớp.",
    };
  }

  const student = await findStudentByPhoneNumber(normalizedPhone);

  if (!student || student.authProvider !== "phone") {
    return {
      ok: false as const,
      message: "Không tìm thấy tài khoản số điện thoại này.",
    };
  }

  const otpRecord = await findValidStudentPhoneOtp(
    normalizedPhone,
    "reset-password",
    otpCode,
  );

  if (!otpRecord) {
    return {
      ok: false as const,
      message: "Mã OTP không đúng hoặc đã hết hạn.",
    };
  }

  await updateStudentPassword(student.id, password);
  await markStudentPhoneOtpUsed(otpRecord.id);

  return {
    ok: true as const,
    message: "Đặt lại mật khẩu thành công. Bạn có thể đăng nhập lại ngay.",
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

export async function signInWithTikTokIdentity(input: {
  openId: string;
  displayName?: string;
}) {
  return signInWithOauthIdentity({
    provider: "tiktok",
    providerUserId: input.openId,
    fullName: input.displayName,
  });
}

export async function signInWithGoogleIdentity(input: {
  googleUserId: string;
  email: string;
  fullName?: string;
}) {
  return signInWithOauthIdentity({
    provider: "google",
    providerUserId: input.googleUserId,
    email: input.email,
    fullName: input.fullName,
  });
}

export async function signInWithFacebookIdentity(input: {
  facebookUserId: string;
  email?: string;
  fullName?: string;
}) {
  return signInWithOauthIdentity({
    provider: "facebook",
    providerUserId: input.facebookUserId,
    email: input.email,
    fullName: input.fullName,
  });
}

async function signInWithOauthIdentity(input: {
  provider: SocialAuthProvider;
  providerUserId: string;
  email?: string;
  fullName?: string;
}) {
  const providerUserId = input.providerUserId.trim();
  const email = input.email ? normalizeEmail(input.email) : "";
  const fullName = input.fullName?.trim() ?? "";

  if (providerUserId.length < 3) {
    return {
      ok: false as const,
      message: `Không thể xác định tài khoản ${getAuthProviderLabel(input.provider)}.`,
    };
  }

  if (input.provider === "google" && !isValidEmail(email)) {
    return {
      ok: false as const,
      message: "Google không trả về email hợp lệ.",
    };
  }

  const existingStudent = await findStudentByProviderIdentity(input.provider, providerUserId);

  if (existingStudent) {
    const sessionToken = await createStudentSession(existingStudent.id);

    return {
      ok: true as const,
      isNewAccount: false,
      student: buildSessionStudent(existingStudent),
      sessionToken,
    };
  }

  if (email) {
    const existingByEmail = await findStudentByEmail(email);

    if (existingByEmail) {
      if (existingByEmail.authProvider === input.provider) {
        const sessionToken = await createStudentSession(existingByEmail.id);

        return {
          ok: true as const,
          isNewAccount: false,
          student: buildSessionStudent(existingByEmail),
          sessionToken,
        };
      }

      return {
        ok: false as const,
        message: `Email này đang thuộc về tài khoản ${getAuthProviderLabel(existingByEmail.authProvider)} khác.`,
      };
    }
  }

  const student = await createStudentAccount({
    email: email || undefined,
    fullName: fullName || undefined,
    grade: defaultStudyPreference.currentGrade,
    authProvider: input.provider,
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

    if (
      !isSupportedStudyPreference(
        preference.currentGrade,
        preference.currentSubject,
      )
    ) {
      return {
        ...preference,
        currentGrade: defaultStudyPreference.currentGrade,
        currentSubject: defaultStudyPreference.currentSubject,
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
