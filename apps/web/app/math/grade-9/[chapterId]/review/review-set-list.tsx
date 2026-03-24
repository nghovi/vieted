"use client";

import Link from "next/link";
import { useState } from "react";
import type { HistoryScorePoint, MathChapterEvaluation } from "@/lib/db";
import {
  TrendChartDialog,
  TrendChartTrigger,
} from "@/app/history/grade-9/[chapterId]/trend-chart-dialog";

type Props = {
  chapterId: string;
  setResults: MathChapterEvaluation["setResults"];
};

type ActiveDialog = {
  label: string;
  points: HistoryScorePoint[];
} | null;

export function MathReviewSetList({ chapterId, setResults }: Props) {
  const [activeDialog, setActiveDialog] = useState<ActiveDialog>(null);

  return (
    <>
      <div className="question-set">
        {setResults.map((setResult) => (
          <article key={setResult.setId} className="feature-card">
            <h3>{setResult.setTitle}</h3>
            <div className="attempt-line">
              <span>Số lần làm: {setResult.attempts}</span>
              <TrendChartTrigger
                label={setResult.setTitle}
                onOpen={() =>
                  setActiveDialog({
                    label: setResult.setTitle,
                    points: setResult.attemptHistory,
                  })
                }
              />
            </div>
            <p>
              Điểm gần nhất:{" "}
              {setResult.latestScore !== null ? `${setResult.latestScore}%` : "Chưa làm"}
            </p>
            <p>
              Điểm cao nhất:{" "}
              {setResult.bestScore !== null ? `${setResult.bestScore}%` : "Chưa có"}
            </p>
            <p>
              Lần làm gần nhất:{" "}
              {setResult.lastSubmittedAt
                ? new Date(setResult.lastSubmittedAt).toLocaleString("vi-VN")
                : "Chưa có"}
            </p>
            <div className="inline-actions">
              <Link href={`/math/grade-9/${chapterId}/test/${setResult.setId}`} className="secondary-link">
                Làm lại bộ này
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
