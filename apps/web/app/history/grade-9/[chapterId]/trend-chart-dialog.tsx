"use client";

import { ScoreTrendChart } from "./score-trend-chart";

type HistoryScorePoint = {
  submittedAt: string;
  scorePercent: number;
};

type TriggerProps = {
  label: string;
  onOpen: () => void;
};

type DialogProps = {
  label: string;
  points: HistoryScorePoint[];
  onClose: () => void;
};

export function TrendChartTrigger({ label, onOpen }: TriggerProps) {
  return (
    <button
      type="button"
      className="chart-trigger-button"
      aria-label={`Xem biểu đồ tiến độ cho ${label}`}
      onClick={onOpen}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="chart-trigger-icon">
        <path
          d="M4 17.5h16"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.7"
        />
        <path
          d="M6 15l4-4 3 2 5-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.9"
        />
        <circle cx="6" cy="15" r="1.2" fill="currentColor" />
        <circle cx="10" cy="11" r="1.2" fill="currentColor" />
        <circle cx="13" cy="13" r="1.2" fill="currentColor" />
        <circle cx="18" cy="7" r="1.2" fill="currentColor" />
      </svg>
    </button>
  );
}

export function TrendChartDialog({ label, points, onClose }: DialogProps) {
  return (
    <div className="chart-dialog-backdrop" role="presentation" onClick={onClose}>
      <div
        className="chart-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`Biểu đồ tiến độ của ${label}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="chart-dialog-header">
          <div>
            <strong>{label}</strong>
            <p>Xem điểm số của từng lần làm theo thời gian.</p>
          </div>
          <button
            type="button"
            className="chart-dialog-close"
            aria-label="Đóng biểu đồ"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <ScoreTrendChart points={points} embedded />
      </div>
    </div>
  );
}
