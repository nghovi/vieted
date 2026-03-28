# MVP Architecture

## Recommended Stack

- Next.js 15 with TypeScript for the web app
- Flutter for Android and iOS mobile apps
- Tailwind CSS for fast UI development
- PostgreSQL for core data
- Prisma or Drizzle ORM
- Supabase Auth or Clerk
- OpenAI API for tutoring and content generation
- Vercel for deployment
- PostHog for product analytics

## Core System Modules

### 0. Client apps

- Web app in Next.js for fast iteration, parent dashboards, and browser-based study
- Mobile app in Flutter for student daily practice and review on Android and iOS

Both clients should consume the same backend APIs and share the same curriculum, quiz, and mastery concepts.

### Authentication

- Students log in with mobile phone number and password
- Server validates credentials and issues the session
- Web uses an HTTP-only cookie session
- Mobile should exchange credentials for a token and store it securely on-device
- Parent and teacher auth can be added later as separate roles

### Study context

- Each student can save a current grade from 1 to 12
- Each student can choose the subject they want to study next
- The first focused learning path should be grade 9 English
- The saved study context should drive lesson recommendations, quizzes, and review queues

### 1. Curriculum service

Stores:

- Grades
- Subjects
- Chapters
- Topics
- Skills

This should be hand-defined and reviewed, not generated on the fly.

### 2. Learning session service

Tracks:

- Current topic
- Lesson state
- Student messages
- AI responses
- Mini-checkpoint questions

### 3. Quiz service

Generates and stores:

- Quiz sessions
- Questions
- Correct answers
- Student responses
- Feedback
- Skill tags

### 4. Mastery and review service

Maintains:

- Topic mastery score
- Skill confidence
- Review due dates
- Mistake history

### 5. Parent summary service

Aggregates weekly data into a simple report.

## Suggested Data Model

### Main tables

- users
- auth_identities
- student_profiles
- subjects
- grades
- topics
- topic_skills
- learning_sessions
- messages
- quizzes
- quiz_questions
- quiz_attempts
- mastery_scores
- review_items
- weekly_summaries

## AI Workflow Design

### Tutor flow

Input:

- Student grade
- Subject
- Topic
- Recent mastery level
- Student message

Output:

- Explanation in Vietnamese
- Optional worked example
- Optional check-for-understanding question

### Quiz generation flow

Input:

- Grade
- Topic
- Difficulty
- Number of questions

Output:

- Structured JSON questions
- Answers
- Explanations
- Skill tags

### Review recommendation flow

Input:

- Mistake history
- Topic mastery
- Days since last review

Output:

- Ranked review queue
- Short explanation of why each topic is recommended

## Product UX Recommendations

- Keep the home screen focused on "Continue learning", "Practice now", and "Today's review"
- Avoid free-form blank chat as the main entry point
- Put topic and grade context above every AI interaction
- Use short sessions of 10-15 minutes by default

## MVP Build Phases

### Phase 1

- Authentication
- Student onboarding
- Curriculum map for one subject
- Topic page
- AI tutor

### Phase 2

- Quiz generation
- Quiz results and answer explanations
- Mistake tracking

### Phase 3

- Review queue
- Mastery dashboard
- Parent summary

## Prompting Guidance

Use system prompts that enforce:

- Vietnamese language output by default
- Grade-appropriate difficulty
- Step-by-step teaching
- Hint-first behavior when the student is struggling
- Topic grounding to reduce drift

## Recommendation

The fastest path is to build a narrow but polished MVP around grade 9 English instead of a broad multi-subject platform. That gives you better content quality, simpler measurement, and a much stronger learning loop.
