# VietEd

AI-backed learning platform for Vietnamese students, with both web and Flutter mobile apps.

## Vision

VietEd helps students learn, practice, and review school subjects in Vietnamese through guided AI tutoring, adaptive quizzes, and personalized revision plans.

The current product slice starts with grade 9 history and lets each student save their current grade and selected subject.

## Who It Is For

- Students in grades 6-12 in Vietnam
- Parents who want structured review support for their children
- Teachers or tutors who want extra practice materials for students

## Core Product Direction

The first version should focus on three high-value student workflows:

1. Learn a topic with an AI tutor in Vietnamese
2. Practice with quizzes and short-answer exercises
3. Review weak topics using spaced repetition and progress tracking

## MVP Features

- Student onboarding by grade, subject, and goals
- Subject/topic library aligned to school levels
- AI tutor chat for explanations, examples, and follow-up questions
- Quiz generation by topic and difficulty
- Review mode based on mistakes and weak areas
- Progress dashboard for mastery, streaks, and recent performance
- Parent-friendly weekly summary

## Suggested MVP Subjects

- Math
- Vietnamese literature/language
- English
- Physics
- Chemistry

These subjects offer a strong mix of objective practice, explanation-heavy tutoring, and test-prep demand.

## Product Principles

- Vietnamese-first UX
- Short, guided learning sessions
- Clear curriculum structure before open-ended chat
- AI should teach, not just answer
- Safety guardrails for age-appropriate education

## Workspace Layout

- `apps/web`: Next.js web app for student learning and review flows
- `apps/mobile`: Flutter app for Android and iOS
- `packages/contracts`: shared TypeScript contracts and starter curriculum metadata
- `docs`: product and architecture notes

## Technical Starting Point

Recommended stack for MVP:

- Web: Next.js + TypeScript
- Mobile: Flutter
- Backend: Next.js API routes or a small Node service
- Database: PostgreSQL
- Auth: Clerk or Supabase Auth
- AI: OpenAI API for tutoring, quiz generation, and feedback
- Analytics: PostHog
- Hosting: Vercel + managed Postgres

See [docs/product-brief.md](/Users/nam/projects/vieted/docs/product-brief.md) for the detailed product outline and [docs/architecture.md](/Users/nam/projects/vieted/docs/architecture.md) for the MVP system design.

## Run The Apps

### Web

1. `npm install`
2. `npm run dev:web`
3. Open `/login` to test phone/password auth
4. After login, save a grade from 1-12 and choose a subject

### Mobile

1. `cd apps/mobile`
2. `flutter run`

## Stage Deploy

Current stage target:

- Preferred domain: `https://truongdiem.online`
- Fallback stage URL: `http://vieted.13.214.10.4.nip.io`
- app dir: `~/apps/vieted`

Deployment scripts:

- Local upload + remote deploy: `./deploy_stage.sh`
- Remote deploy script on server: `apps/web/scripts/stage-deploy-remote.sh`
- Managed process entrypoint: `apps/web/scripts/stage-run.sh`
- Systemd unit: `apps/web/scripts/vieted-stage.service`
- Cert install hook for renewals: `apps/web/scripts/install-stage-cert.sh`

## Recommended First Build Order

1. Build real phone/password auth backed by PostgreSQL
2. Save each student's current grade from 1-12
3. Save each student's chosen subject
4. Build the grade 9 history topic page and lesson flow
5. Track mistakes and generate review sets

## Next Step

Start with one narrow beachhead: grade 9 history.

This gives us a clear curriculum boundary, easier content QA, and a simpler first study loop before expanding into other subjects.
