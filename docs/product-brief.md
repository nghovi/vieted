# Product Brief

## Problem

Vietnamese students often study through a mix of school lessons, tutoring, worksheets, and test prep apps. Many tools are static, not personalized, and do not help students understand why they got something wrong. Generic AI chat is flexible but lacks curriculum structure, progress memory, and age-appropriate scaffolding.

## Opportunity

Build an AI-backed learning companion that combines:

- Structured curriculum paths
- Personalized tutoring in Vietnamese
- Adaptive practice and review
- Progress visibility for students and parents

## Primary Users

### 1. Junior secondary students

- Need help understanding concepts
- Respond well to guided lessons and short practice loops
- Benefit from gamified review and encouragement

### 2. High school students

- Need efficient review and exam preparation
- Care about weak-topic detection and time efficiency
- Need concise explanations, worked examples, and past-paper style practice

### 3. Parents

- Want confidence that study time is productive
- Need simple progress summaries instead of raw activity logs

## Core Use Cases

### Learn

Students choose a subject and topic, then the app:

- Explains the concept in Vietnamese
- Uses simple examples first, then increases difficulty
- Checks understanding with mini questions during the lesson

### Practice

Students answer:

- Multiple choice questions
- Short-answer questions
- Step-by-step problem-solving questions

The app gives immediate feedback and explains mistakes.

### Review

The system records weak skills and schedules them for review using spaced repetition and confidence scoring.

### Ask

Students can ask follow-up questions, but answers should be grounded in the selected topic and grade level so the experience stays educational rather than drifting into generic chat.

## MVP Definition

The MVP should solve one sharp problem well:

### Recommended MVP

An AI study and review app for Vietnamese students in grades 6-9, starting with math.

Why this is the best first wedge:

- Math is easier to structure into topics and difficulty levels
- Learning outcomes are easier to measure
- Review and mistake analysis are highly valuable
- Parents can quickly see improvement

### MVP User Story

"I choose my grade and math topic, learn with a Vietnamese AI tutor, take a short quiz, and get a personalized review plan based on my mistakes."

## Feature Set

### 1. Student profile

- Grade
- Target subjects
- Daily study goal
- Preferred difficulty

### 2. Curriculum map

- Subject -> chapter -> topic
- Grade-aware topic sequencing

### 3. AI tutor

- Topic-scoped explanations
- Worked examples
- Hint mode before full solution
- Adjustable explanation depth

### 4. Quiz engine

- Question generation from topic + difficulty
- Answer evaluation
- Mistake tagging by skill

### 5. Review engine

- Weak-topic detection
- Daily review queue
- Spaced repetition logic

### 6. Progress tracking

- Accuracy by topic
- Mastery trend
- Study streak
- Time spent

### 7. Parent summary

- Weekly learning summary
- Topics covered
- Weak areas
- Recommended next focus

## AI Jobs To Be Done

The AI should support specific jobs:

- Explain a concept at the student's level
- Generate age-appropriate examples
- Ask checking questions during study
- Create quizzes from the current topic
- Explain why an answer is wrong
- Recommend what to review next

The AI should not be the source of truth for curriculum structure. Curriculum and topic trees should be stored in the product so the learning path stays consistent.

## Safety and Quality Requirements

- Vietnamese-first content quality
- Age-appropriate responses
- Strong refusal behavior for unsafe or unrelated topics
- Avoid hallucinated facts in literature/history subjects
- Encourage learning steps instead of giving direct final answers too early

## Success Metrics

### Student metrics

- Weekly active students
- Sessions per week
- Quiz completion rate
- Review return rate
- Improvement in topic mastery over time

### Product metrics

- Day 7 retention
- Average session length
- AI session to quiz conversion
- Parent summary open rate

## Go-To-Market Starting Point

- Direct-to-parent subscription for home study
- Small tutoring centers as early partners
- One-city pilot with a narrow subject focus

## Non-MVP Items

Save these for later:

- Full teacher dashboards
- Live classes
- Voice tutoring
- All subjects at once
- Nationwide curriculum coverage from day one

## Sharp Recommendation

Do not start with a generic "AI for all school subjects" app. Start with a structured math learning and review product for grades 6-9, prove engagement and learning value, then expand subject by subject.
