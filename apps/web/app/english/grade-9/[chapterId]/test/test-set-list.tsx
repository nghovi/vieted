"use client";

import Link from "next/link";
import { useState } from "react";
import type { EnglishQuestionSetProgress, HistoryScorePoint } from "@/lib/db";
import {
  TrendChartDialog,
  TrendChartTrigger,
} from "@/app/history/grade-9/[chapterId]/trend-chart-dialog";

type Props = {
  chapterId: string;
  sets: EnglishQuestionSetProgress[];
};

type ActiveDialog = {
  label: string;
  points: HistoryScorePoint[];
} | null;

export function EnglishTestSetList({ chapterId, sets }: Props) {
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);

  return (
    <>
      <div className="question-set">
        {sets.map((set) => (
          <article key={set.setId} className="feature-card">
            <div className="test-toolbar">
              <div>
                <h3>{set.setTitle}</h3>
                <p>{set.questionCount} câu trắc nghiệm</p>
              </div>
              <span className="test-progress-badge">{set.masteryLabel}</span>
            </div>

            <div className="test-stats">
              <div className="attempt-line">
                <span>Số lần làm: {set.attempts}</span>
                <TrendChartTrigger
                  label={set.setTitle}
                  onOpen={() =>
                    setActiveDialog({
                      label: set.setTitle,
                      points: set.attemptHistory,
                    })
                  }
                />
              </div>
              <p>
                Điểm gần nhất: {set.latestScore !== null ? `${set.latestScore}%` : "Chưa làm"}
              </p>
              <p>
                Điểm cao nhất: {set.bestScore !== null ? `${set.bestScore}%` : "Chưa có"}
              </p>
              <p>
                Lần làm gần nhất:{" "}
                {set.lastSubmittedAt
                  ? new Date(set.lastSubmittedAt).toLocaleString("vi-VN")
                  : "Chưa có"}
              </p>
            </div>

            <div className="inline-actions">
              <Link
                href={`/english/grade-9/${chapterId}/test/${set.setId}`}
                className="primary-link"
              >
                {set.attempts > 0 ? "Làm lại" : "Làm bài"}
              </Link>
            </div>
          </article>
        ))}
      </div>

      {activeDialog ? (
        <TrendChartDialog
          label={activeDialog.label}
          points={activeDialog.points}
          onClose={() => setActiveDialog(null)}
        />
      ) : null}
    </>
  );
}
