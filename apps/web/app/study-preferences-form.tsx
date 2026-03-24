"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  gradeOptions as grades,
  subjectCatalog as subjects,
  supportedGrades,
} from "@/lib/study-catalog";

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
            <option key={grade} disabled={!supportedGrades.includes(grade as 6 | 7 | 8 | 9)} value={grade}>
              {supportedGrades.includes(grade as 6 | 7 | 8 | 9)
                ? `Lớp ${grade}`
                : `Lớp ${grade} - Chưa khả dụng`}
            </option>
          ))}
        </select>
        <span className="helper-copy">Chọn lớp học phù hợp với hồ sơ học tập của em.</span>
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
        <span className="helper-copy">Môn học đang học sẽ được lưu trong tài khoản của em.</span>
      </label>

      <button className="primary-link auth-submit" disabled={isSaving} type="submit">
        {isSaving ? "Đang lưu..." : "Lưu lựa chọn"}
      </button>

      {message ? <p className="helper-copy">{message}</p> : null}
    </form>
  );
}
