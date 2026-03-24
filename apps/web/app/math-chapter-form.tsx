"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ChapterOption = {
  id: string;
  title: string;
};

type Props = {
  initialChapterId: string;
  chapters: ChapterOption[];
};

export function MathChapterForm({ initialChapterId, chapters }: Props) {
  const router = useRouter();
  const [chapterId, setChapterId] = useState(initialChapterId);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setMessage(null);

    const response = await fetch("/api/student/math-chapter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chapterId }),
    });

    const data = (await response.json()) as { error?: string };

    if (!response.ok) {
      setMessage(data.error ?? "Không thể lưu chương Toán.");
      setIsSaving(false);
      return;
    }

    setMessage("Đã lưu chương Toán hiện tại.");
    setIsSaving(false);
    router.refresh();
  }

  return (
    <form className="preferences-form" onSubmit={handleSubmit}>
      <label className="field">
        <span>Chương Toán muốn học</span>
        <select value={chapterId} onChange={(event) => setChapterId(event.target.value)}>
          {chapters.map((chapter) => (
            <option key={chapter.id} value={chapter.id}>
              {chapter.title}
            </option>
          ))}
        </select>
      </label>

      <div className="inline-actions">
        <button className="primary-link auth-submit" disabled={isSaving} type="submit">
          {isSaving ? "Đang lưu..." : "Lưu chương Toán"}
        </button>
        <Link href={`/math/grade-9/${chapterId}`} className="secondary-link">
          Xem chương
        </Link>
      </div>

      {message ? <p className="helper-copy">{message}</p> : null}
    </form>
  );
}
