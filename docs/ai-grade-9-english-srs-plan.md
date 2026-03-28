# AI + SRS Plan For Grade 9 English

## Goal

Bring AI into `TA9` where it improves learning outcomes, not where it adds generic chat.

The main product promise is:

- identify the student's exact weakness
- explain the mistake in Vietnamese
- generate the next targeted practice
- schedule review with spaced repetition until the skill becomes stable

## Product Principle

AI should support a tight loop:

1. quiz
2. diagnose
3. explain
4. retry
5. schedule review

Do not start with a free-form chatbot as the main experience.

## Best First AI Features

### 1. Mistake diagnosis

After each English question attempt, AI should classify the likely mistake type.

Recommended skill tags for the first version:

- `grammar_tense`
- `sentence_structure`
- `word_form`
- `vocabulary_meaning`
- `preposition_collocation`
- `reading_comprehension`
- `error_identification`
- `sentence_transformation`

For MVP, each question should also have at least one hand-authored default skill tag in the curriculum data. AI can refine or add a secondary tag after submission.

### 2. Vietnamese error explanation

For each incorrect answer, AI should return:

- `mistakeType`
- `explanationVi`
- `hintVi`
- `memoryTipVi`
- `difficultyLevel`

The explanation should be:

- short
- in Vietnamese
- specific to the wrong option
- suitable for Grade 9

### 3. Targeted retry set generation

After a quiz, AI should create a short repair set:

- 3 to 5 questions
- same weak skill
- easier to harder sequence
- same chapter context when possible

This is the most important AI-generated content surface in the product.

### 4. Review recommendation

The app should rank what to review next based on:

- recent mistakes
- repeated mistakes
- confidence
- due date from SRS
- last exposure date

### 5. Scoped follow-up help

Students should be able to ask narrow follow-up prompts such as:

- "Vì sao đáp án B sai?"
- "Cho em thêm 2 câu giống vậy"
- "Nhắc lại công thức"
- "Giải thích ngắn hơn"

Avoid blank-chat mode.

## Where AI Fits In The Current App

Current flow already exists:

- chapter learn page
- test set page
- review page
- question attempt storage in `student_english_set_attempts`
- question-level storage in `student_english_question_attempts`

The best insertion points are:

### After quiz submission

Extend the current submit flow so each wrong answer can return structured AI feedback and feed the review system.

### Review page

Replace score-only review with:

- weak skills
- due review items
- AI-generated retry sets

### Learn page

Add short AI support cards:

- explain this grammar point
- give one example
- ask me a quick check question

## Proposed SRS Model

Use a skill-level SRS, not only chapter-level review.

Each student should have review items for:

- a skill within a chapter
- optionally a specific question pattern

### Review item unit

Recommended unit:

- `student_id`
- `subject = english`
- `grade = 9`
- `chapter_id`
- `skill_code`

Example:

- student 42
- English grade 9
- `unit-1-local-community`
- `preposition_collocation`

### SRS fields

Each review item should track:

- `stability`
- `difficulty`
- `intervalDays`
- `reps`
- `lapses`
- `lastReviewedAt`
- `nextReviewAt`
- `lastResult`
- `confidenceScore`

### MVP scheduling rule

Do not overcomplicate the first version.

Use a simple progression:

- first miss: review in `1` day
- second successful review: `3` days
- next successful review: `7` days
- next successful review: `14` days
- next successful review: `30` days

If the student fails again:

- increment `lapses`
- reduce stability
- send the item back to `1` day or `3` days` depending on severity

### Confidence-aware adjustment

After retry or review, ask:

- `Em thấy câu này dễ hay khó?`

Store:

- `low`
- `medium`
- `high`

Then adjust schedule:

- correct + high confidence: promote normally
- correct + low confidence: promote more slowly
- wrong + high confidence: treat as dangerous misconception
- wrong + low confidence: treat as normal weak skill

This gives the SRS more value than score-only review.

## Data Model Changes

Current tables already support set attempts and question attempts. Add new tables for skill intelligence and review scheduling.

### 1. `english_question_skill_tags`

Purpose:

- define default skill tags for each English question

Suggested fields:

- `id`
- `question_id`
- `skill_code`
- `weight`
- `created_at`

### 2. `student_english_skill_events`

Purpose:

- store every detected skill event after a question attempt

Suggested fields:

- `id`
- `student_id`
- `chapter_id`
- `question_set_id`
- `question_id`
- `set_attempt_id`
- `skill_code`
- `source` (`rule`, `ai`, `manual`)
- `is_correct`
- `confidence_score`
- `mistake_type`
- `explanation_vi`
- `hint_vi`
- `memory_tip_vi`
- `created_at`

### 3. `student_english_review_items`

Purpose:

- power the spaced repetition queue

Suggested fields:

- `id`
- `student_id`
- `chapter_id`
- `skill_code`
- `status`
- `stability`
- `difficulty`
- `interval_days`
- `reps`
- `lapses`
- `confidence_band`
- `last_result`
- `last_reviewed_at`
- `next_review_at`
- `created_at`
- `updated_at`

Unique key:

- `(student_id, chapter_id, skill_code)`

### 4. `student_english_retry_sets`

Purpose:

- store AI-generated repair sets so the student can return to them

Suggested fields:

- `id`
- `student_id`
- `chapter_id`
- `source_attempt_id`
- `primary_skill_code`
- `title`
- `questions_json`
- `status`
- `created_at`
- `completed_at`

## API Additions

### 1. Extend quiz submission response

Current endpoint:

- `/api/english/grade-9/test/submit`

Extend response with:

```json
{
  "result": {
    "attemptId": 123,
    "scorePercent": 70,
    "correctCount": 7,
    "totalQuestions": 10,
    "questions": [
      {
        "questionId": "e1s1q1",
        "isCorrect": false,
        "mistakeType": "preposition_collocation",
        "explanationVi": "Em chọn sai giới từ...",
        "hintVi": "Hãy nhìn mối quan hệ vị trí giữa hai địa điểm.",
        "memoryTipVi": "Between dùng khi có hai đối tượng."
      }
    ],
    "weakSkills": [
      {
        "skillCode": "preposition_collocation",
        "wrongCount": 2,
        "nextReviewAt": "2026-03-26T00:00:00.000Z"
      }
    ],
    "retrySet": {
      "id": "retry_001",
      "title": "Luyện lại: giới từ chỉ vị trí",
      "questionCount": 4
    }
  }
}
```

### 2. Review queue endpoint

- `/api/english/grade-9/review-queue`

Returns:

- due items
- recommended order
- explanation for why each item is due

### 3. Retry set endpoint

- `/api/english/grade-9/retry/[retrySetId]`

Returns AI-generated or rule-generated targeted practice.

### 4. Review submission endpoint

- `/api/english/grade-9/review/submit`

Updates:

- review item state
- SRS schedule
- confidence

## AI Workflow Design

## Stage 1: rule-first, AI-assisted

Use deterministic rules first whenever possible.

Example:

- a question tagged `word_form`
- student chooses wrong option
- app can already attach the default skill tag and a stored explanation

Then AI improves the experience by generating:

- clearer Vietnamese explanation
- hint
- short memory tip

This reduces cost and improves consistency.

## Stage 2: AI-generated retry sets

Input:

- chapter title
- skill code
- recent wrong questions
- grade level
- allowed format

Output:

- structured JSON retry set
- correct answer
- explanation in Vietnamese

## Prompt Contract

Always ask the model for strict JSON.

Example shape:

```json
{
  "mistakeType": "word_form",
  "explanationVi": "Sau động từ này cần danh từ, không phải tính từ.",
  "hintVi": "Xem lại từ đứng ngay trước chỗ trống.",
  "memoryTipVi": "Động từ 'make' thường đi với danh từ trong mẫu câu này.",
  "confidence": 0.86
}
```

## Recommended UI Changes

### Test result page

Add under each wrong answer:

- `Em sai ở:` skill label
- `Vì sao sai:` explanation in Vietnamese
- `Mẹo nhớ:` memory tip

Add a summary card:

- top 2 weak skills
- one retry CTA

### Review page

Split review into two sections:

- `Cần ôn hôm nay`
- `Điểm yếu gần đây`

Each review card should show:

- skill name
- last mistake
- why this item is due
- quick start CTA

### Home page

Add one compact personalized panel:

- `Hôm nay em nên học gì`
- due review count
- one recommended lesson
- one recommended retry set

## Build Order

### Phase 1

- add question skill tags
- save skill events on quiz submission
- show weak-skill summary after quiz

### Phase 2

- create `student_english_review_items`
- implement SRS scheduling
- show due review queue

### Phase 3

- generate targeted retry sets
- add confidence input after retry
- tune scheduling with confidence

### Phase 4

- add scoped follow-up AI help on learn and review pages

## Recommendation For This Repo

Start with a hybrid approach:

- hand-tag existing Grade 9 English questions by skill
- keep the current test flow
- extend the submit endpoint to emit skill-level feedback
- build SRS review items before adding open-ended AI chat

That sequence gives the app a real learning moat:

- better diagnosis
- better retry practice
- better long-term retention through spaced repetition
