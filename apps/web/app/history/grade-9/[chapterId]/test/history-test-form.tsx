"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { HistoryQuestionSetAttemptResult, HistoryScorePoint } from "@/lib/db";
import { ScoreTrendChart } from "../score-trend-chart";

type Props = {
  chapterId: string;
  setId: string;
  setTitle: string;
  attemptHistory: HistoryScorePoint[];
  questions: Array<{
    id: string;
    prompt: string;
    options: string[];
  }>;
};

export function HistoryTestForm({
  chapterId,
  setId,
  setTitle,
  questions,
  attemptHistory,
}: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<HistoryQuestionSetAttemptResult | null>(null);
  const [trendPoints, setTrendPoints] = useState<HistoryScorePoint[]>(attemptHistory);
  const [isPending, startTransition] = useTransition();

  const answeredCount = Object.keys(answers).length;
  const isComplete = answeredCount === questions.length;

  function updateAnswer(questionId: string, selectedOption: number) {
    setAnswers((current) => ({
      ...current,
      [questionId]: selectedOption,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const response = await fetch("/api/history/grade-9/test/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chapterId,
        setId,
        answers: questions.map((question) => ({
          questionId: question.id,
          selectedOption: answers[question.id],
        })),
      }),
    });

    const data = (await response.json()) as {
      error?: string;
      result?: HistoryQuestionSetAttemptResult;
    };

    if (!response.ok || !data.result) {
      setErrorMessage(data.error ?? "Không thể nộp bài lúc này.");
      return;
    }

    setResult(data.result);
    setTrendPoints((current) => [
      ...current,
      {
        submittedAt: data.result!.submittedAt,
        scorePercent: data.result!.scorePercent,
      },
    ]);
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <div className="test-layout">
      {!result ? (
        <form className="test-form" onSubmit={handleSubmit}>
          <div className="feature-card">
            <div className="test-toolbar">
              <div>
                <p className="eyebrow">Bộ kiểm tra</p>
                <h2>{setTitle}</h2>
              </div>
              <div className="test-progress-badge">
                Đã chọn {answeredCount}/{questions.length} câu
              </div>
            </div>
            <p className="helper-copy">
              Chọn một đáp án cho mỗi câu rồi nộp bài. Đáp án đúng chỉ hiển thị sau khi em
              hoàn thành bài kiểm tra.
            </p>
          </div>

          <div className="question-set">
            {questions.map((question, index) => (
              <article key={question.id} className="feature-card">
                <h3>
                  Câu {index + 1}. {question.prompt}
                </h3>
                <div className="test-options">
                  {question.options.map((option, optionIndex) => {
                    const optionLabel = String.fromCharCode(65 + optionIndex);
                    const isSelected = answers[question.id] === optionIndex;

                    return (
                      <label
                        key={`${question.id}-${optionLabel}`}
                        className={`test-option${isSelected ? " is-selected" : ""}`}
                      >
                        <input
                          checked={isSelected}
                          name={question.id}
                          type="radio"
                          value={optionIndex}
                          onChange={() => updateAnswer(question.id, optionIndex)}
                        />
                        <span>
                          <strong>{optionLabel}.</strong> {option}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>

          {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

          <div className="inline-actions">
            <button className="primary-link auth-submit" disabled={!isComplete || isPending}>
              {isPending ? "Đang cập nhật..." : "Nộp bài"}
            </button>
          </div>
        </form>
      ) : null}

      {result ? (
        <section className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Kết quả mới nhất</p>
            <h2>Em vừa hoàn thành bộ kiểm tra này.</h2>
          </div>
          <div className="grid">
            <article className="feature-card">
              <h3>Điểm số</h3>
              <p>{result.scorePercent}%</p>
            </article>
            <article className="feature-card">
              <h3>Số câu đúng</h3>
              <p>
                {result.correctCount}/{result.totalQuestions} câu
              </p>
            </article>
            <article className="feature-card">
              <h3>Nhận định</h3>
              <p>
                {result.scorePercent >= 80
                  ? "Rất tốt. Em đã nắm chắc bộ câu hỏi này."
                  : result.scorePercent >= 60
                    ? "Kết quả ổn. Em nên xem lại các câu sai và làm lại để củng cố."
                    : "Em nên học lại phần kiến thức chính rồi làm lại bộ này."}
              </p>
            </article>
          </div>

          <div className="feature-card">
            <div className="test-toolbar">
              <div>
                <h3>Đường tiến bộ của em</h3>
                <p>Mỗi điểm trên biểu đồ là một lần em làm bộ kiểm tra này.</p>
              </div>
              <span className="test-progress-badge">
                {result.scorePercent}% ở lần làm mới nhất
              </span>
            </div>
            <ScoreTrendChart points={trendPoints} />
          </div>

          <div className="feature-card chapter-feature">
            <div className="test-toolbar">
              <div>
                <h3>Tiếp theo</h3>
                <p>Em có thể làm lại bộ này hoặc chuyển sang bộ kiểm tra khác của chương.</p>
              </div>
              <div className="inline-actions">
                <button
                  type="button"
                  className="primary-link action-button"
                  onClick={() => {
                    setAnswers({});
                    setErrorMessage(null);
                    setResult(null);
                  }}
                >
                  Làm lại bộ này
                </button>
                <Link href={`/history/grade-9/${chapterId}/test`} className="secondary-link">
                  Chọn bộ kiểm tra khác
                </Link>
              </div>
            </div>
          </div>

          <div className="question-set">
            {result.questions.map((question, index) => (
              <article
                key={question.questionId}
                className={`feature-card result-card${question.isCorrect ? " is-correct" : " is-wrong"}`}
              >
                <h3>
                  Câu {index + 1}. {question.prompt}
                </h3>
                <p className="result-summary">
                  {question.isCorrect
                    ? "Đúng. Em đã chọn chính xác đáp án của câu này."
                    : "Sai. Hãy so sánh đáp án em chọn với đáp án đúng ở bên dưới."}
                </p>
                <div className="result-options">
                  {question.options.map((option, optionIndex) => {
                    const optionLabel = String.fromCharCode(65 + optionIndex);
                    const isStudentChoice = optionIndex === question.selectedOption;
                    const isCorrectAnswer = optionIndex === question.correctOption;

                    return (
                      <div
                        key={`${question.questionId}-${optionLabel}`}
                        className={[
                          "result-option",
                          isStudentChoice ? "is-student-choice" : "",
                          isCorrectAnswer ? "is-correct-answer" : "",
                          isStudentChoice && !isCorrectAnswer ? "is-student-wrong" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                      >
                        <div className="result-option-heading">
                          <strong>{optionLabel}.</strong>
                          <span>{option}</span>
                        </div>
                        <div className="result-option-tags">
                          {isStudentChoice ? (
                            <span className="result-tag student-tag">Em đã chọn</span>
                          ) : null}
                          {isCorrectAnswer ? (
                            <span className="result-tag correct-tag">Đáp án đúng</span>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="result-explanation">{question.explanation}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
