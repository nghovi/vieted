"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const grades = Array.from({ length: 12 }, (_, index) => index + 1);
const availableGrade = 9;

const subjects = [
  { value: "history", label: "Lịch sử", isAvailable: true },
  { value: "math", label: "Toán", isAvailable: false },
  { value: "english", label: "Tiếng Anh", isAvailable: false },
  { value: "literature", label: "Ngữ văn", isAvailable: false },
  { value: "physics", label: "Vật lý", isAvailable: false },
  { value: "chemistry", label: "Hóa học", isAvailable: false },
];

type Props = {
  initialGrade: number;
  initialSubject: string;
};

export function StudyPreferencesForm({ initialGrade, initialSubject }: Props) {
  const router = useRouter();
  const [currentGrade, setCurrentGrade] = useState(String(initialGrade));
  const [currentSubject, setCurrentSubject] = useState(initialSubject);
  const [message, setMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const response = await fetch("/api/student/preferences", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentGrade: Number(currentGrade),
        currentSubject,
      }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(data.error ?? "Không thể lưu lựa chọn học tập.");
      setIsSaving(false);
      return;
    }

    setMessage("Đã lưu lớp hiện tại và môn học.");
    setIsSaving(false);
    router.refresh();
  }

  return (
    <form className="preferences-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Lớp hiện tại</span>
        <select
          value={currentGrade}
          onChange={(event) => setCurrentGrade(event.target.value)}
        >
          {grades.map((grade) => (
            <option key={grade} disabled={grade !== availableGrade} value={grade}>
              {grade === availableGrade
                ? `Lớp ${grade}`
                : `Lớp ${grade} - Chưa khả dụng`}
            </option>
          ))}
        </select>
        <span className="helper-copy">Hiện tại mới mở lớp 9 cho bản phát hành đầu tiên.</span>
      </label>

      <label className="field">
        <span>Môn học</span>
        <select
          value={currentSubject}
          onChange={(event) => setCurrentSubject(event.target.value)}
        >
          {subjects.map((subject) => (
            <option
              key={subject.value}
              disabled={!subject.isAvailable}
              value={subject.value}
            >
              {subject.isAvailable
                ? subject.label
                : `${subject.label} - Chưa khả dụng`}
            </option>
          ))}
        </select>
        <span className="helper-copy">
          Giai đoạn này chỉ hỗ trợ môn Lịch sử để ra mắt nhanh và làm thật tốt.
        </span>
      </label>

      <button className="primary-link auth-submit" disabled={isSaving} type="submit">
        {isSaving ? "Đang lưu..." : "Lưu lựa chọn"}
      </button>

      {message ? <p className="helper-copy">{message}</p> : null}
    </form>
  );
}
