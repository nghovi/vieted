import twilio from "twilio";

function normalizePhoneNumberForSms(value: string) {
  const trimmed = value.trim();

  if (trimmed.startsWith("+")) {
    return `+${trimmed.slice(1).replace(/\D/g, "")}`;
  }

  const digits = trimmed.replace(/\D/g, "");

  if (!digits) {
    return "";
  }

  if (digits.startsWith("0")) {
    const defaultCountryCode = (process.env.SMS_DEFAULT_COUNTRY_CODE ?? "+84").replace(
      /[^\d+]/g,
      "",
    );
    return `${defaultCountryCode}${digits.slice(1)}`;
  }

  return `+${digits}`;
}

function getTwilioConfig() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID?.trim() ?? "";
  const authToken = process.env.TWILIO_AUTH_TOKEN?.trim() ?? "";
  const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID?.trim() ?? "";
  const fromPhoneNumber = process.env.TWILIO_FROM_PHONE_NUMBER?.trim() ?? "";

  if (!accountSid || !authToken) {
    return null;
  }

  if (!messagingServiceSid && !fromPhoneNumber) {
    return null;
  }

  return {
    accountSid,
    authToken,
    messagingServiceSid,
    fromPhoneNumber,
  };
}

export function isSmsDeliveryConfigured() {
  return Boolean(getTwilioConfig());
}

export async function sendOtpSms(phoneNumber: string, otpCode: string, purpose: string) {
  const config = getTwilioConfig();

  if (!config) {
    return {
      delivered: false,
      provider: "preview" as const,
    };
  }

  const client = twilio(config.accountSid, config.authToken);
  const to = normalizePhoneNumberForSms(phoneNumber);
  const body =
    purpose === "reset-password"
      ? `Truong Diem Online: ma OTP dat lai mat khau cua ban la ${otpCode}. Ma co hieu luc trong 5 phut.`
      : `Truong Diem Online: ma OTP dang ky cua ban la ${otpCode}. Ma co hieu luc trong 5 phut.`;

  const messageOptions = config.messagingServiceSid
    ? {
        body,
        to,
        messagingServiceSid: config.messagingServiceSid,
      }
    : {
        body,
        to,
        from: normalizePhoneNumberForSms(config.fromPhoneNumber),
      };

  await client.messages.create(messageOptions);

  return {
    delivered: true,
    provider: "twilio" as const,
  };
}
