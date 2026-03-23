type HistoryScorePoint = {
  submittedAt: string;
  scorePercent: number;
};

type Props = {
  points: HistoryScorePoint[];
  compact?: boolean;
  embedded?: boolean;
};

function formatTimeLabel(value: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function getTickIndexes(length: number) {
  if (length <= 1) {
    return [0];
  }

  if (length <= 4) {
    return Array.from({ length }, (_, index) => index);
  }

  return [0, Math.floor((length - 1) / 2), length - 1];
}

export function ScoreTrendChart({
  points,
  compact = false,
  embedded = false,
}: Props) {
  if (points.length === 0) {
    return (
      <div className={`score-trend-card${compact ? " is-compact" : ""}`}>
        <div className="score-trend-empty">
          Chưa có dữ liệu điểm. Hãy làm bộ kiểm tra này để bắt đầu theo dõi tiến bộ.
        </div>
      </div>
    );
  }

  const chartWidth = 360;
  const chartHeight = compact ? 92 : embedded ? 124 : 152;
  const padding = compact
    ? {
        top: 10,
        right: 8,
        bottom: 16,
        left: 8,
      }
    : {
        top: 22,
        right: 16,
        bottom: 34,
        left: 38,
      };

  const plotWidth = chartWidth - padding.left - padding.right;
  const plotHeight = chartHeight - padding.top - padding.bottom;

  const chartPoints = points.map((point, index) => {
    const x =
      points.length === 1
        ? padding.left + plotWidth / 2
        : padding.left + (plotWidth * index) / (points.length - 1);
    const y = padding.top + plotHeight - (point.scorePercent / 100) * plotHeight;

    return {
      ...point,
      x,
      y,
    };
  });

  const linePath = chartPoints
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const yTicks = [0, 50, 100];
  const xTickIndexes = compact ? [] : getTickIndexes(points.length);
  const visibleYTicks = compact ? [0, 100] : yTicks;

  return (
    <div
      className={`score-trend-card${compact ? " is-compact" : ""}${embedded ? " is-embedded" : ""}`}
    >
      {!embedded ? (
        <div className="score-trend-header">
          <strong>{compact ? "Tiến độ điểm" : "Biểu đồ điểm theo thời gian"}</strong>
          <span>{points.length} lần làm</span>
        </div>
      ) : null}

      <svg
        className="score-trend-svg"
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        role="img"
        aria-label="Biểu đồ điểm kiểm tra theo thời gian"
      >
        {visibleYTicks.map((tick) => {
          const y = padding.top + plotHeight - (tick / 100) * plotHeight;
          return (
            <g key={tick}>
              <line
                x1={padding.left}
                x2={chartWidth - padding.right}
                y1={y}
                y2={y}
                className="score-trend-grid-line"
              />
              {!compact ? (
                <text x={padding.left - 10} y={y + 4} className="score-trend-axis-label">
                  {tick}
                </text>
              ) : null}
            </g>
          );
        })}

        <line
          x1={padding.left}
          x2={padding.left}
          y1={padding.top}
          y2={padding.top + plotHeight}
          className="score-trend-axis-line"
        />
        <line
          x1={padding.left}
          x2={chartWidth - padding.right}
          y1={padding.top + plotHeight}
          y2={padding.top + plotHeight}
          className="score-trend-axis-line"
        />

        {chartPoints.length > 1 ? (
          <path d={linePath} className="score-trend-line" />
        ) : null}

        {chartPoints.map((point) => (
          <g key={`${point.submittedAt}-${point.scorePercent}`}>
            <circle cx={point.x} cy={point.y} r={compact ? "3.5" : "4.5"} className="score-trend-dot" />
            {!compact && (
              <text
                x={point.x}
                y={Math.max(point.y - 10, 14)}
                textAnchor="middle"
                className="score-trend-value-label"
              >
                {point.scorePercent}%
              </text>
            )}
          </g>
        ))}

        {xTickIndexes.map((index) => {
          const point = chartPoints[index];
          return (
            <text
              key={`${point.submittedAt}-tick`}
              x={point.x}
              y={chartHeight - 8}
              textAnchor="middle"
              className="score-trend-axis-label"
            >
              {formatTimeLabel(point.submittedAt)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
