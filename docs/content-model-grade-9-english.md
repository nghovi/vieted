# Content Model: Grade 9 English

## Goal

Define how much content each unit in `TA9` should have so the app can support:

- normal practice
- weak-skill remediation
- spaced repetition review
- future AI-generated retry sets

The key principle is:

Do not think only in "sets per unit".

Think in:

- visible study sets
- skill coverage
- reusable review inventory

## Short Answer

`3 visible sets per unit` is enough for an MVP demo.

It is **not enough** for a durable learning product with:

- SRS review
- targeted mistake repair
- repeated use without boredom
- enough variation to avoid answer memorization

## Recommended Structure Per Unit

Each unit should have three layers of content.

### Layer 1: Visible core sets

These are the sets students see in the normal learning flow.

Recommended minimum:

- `1 diagnostic set`
- `3 standard practice sets`
- `1 mixed review set`

Minimum total:

- `5 visible sets per unit`

This is a better target than only `3 sets`.

### Layer 2: Tagged skill bank

This is the hidden inventory used for:

- retry practice
- weak-skill drills
- SRS review
- future AI assembly

Recommended minimum:

- `20 to 30 tagged questions per major skill cluster`

Not every question needs to be shown as a normal named set.

### Layer 3: Repair and review pools

These are small pools assembled from the skill bank.

Recommended per unit:

- `2 to 4 retry pools`
- `2 review pools`

These pools can be generated dynamically from tagged questions rather than authored as separate visible lessons.

## Target Count Per Unit

For a strong first commercial version, each unit should aim for:

- `5 visible sets`
- `40 to 60 total questions`
- `4 to 6 skill clusters`
- `8 to 15 questions per skill cluster`

For a stronger long-term version:

- `6 to 8 visible sets`
- `60 to 90 total questions`
- `5 to 7 skill clusters`
- `12 to 20 questions per skill cluster`

## Recommended Unit Shape

Example structure for one unit:

### 1. Diagnostic set

Purpose:

- identify likely weak skills quickly

Recommended size:

- `8 to 10 questions`

Mix:

- broad skill coverage
- medium difficulty

### 2. Practice set A

Purpose:

- reinforce core vocabulary and easy grammar

Recommended size:

- `8 to 10 questions`

### 3. Practice set B

Purpose:

- reinforce sentence patterns and applied grammar

Recommended size:

- `8 to 10 questions`

### 4. Practice set C

Purpose:

- reinforce reading and mixed application

Recommended size:

- `8 to 10 questions`

### 5. Mixed review set

Purpose:

- simulate recall after the main learning phase

Recommended size:

- `10 to 12 questions`

This gives the student a clear visible path while preserving enough variety for the review system.

## Skill Cluster Design

Each unit should define a small number of primary skill clusters.

Recommended structure:

- `2 content-specific clusters`
- `2 language-form clusters`
- `1 mixed reading/application cluster`

For example, in a unit like `Local Community`:

- `vocabulary_meaning`
- `preposition_collocation`
- `grammar_tense`
- `sentence_structure`
- `reading_comprehension`

For a unit like `Our Experiences`:

- `grammar_tense`
- `word_form`
- `sentence_structure`
- `reading_comprehension`
- `vocabulary_meaning`

## Question Coverage Rule

Every visible set should contain:

- `1 to 2 easy questions`
- `4 to 5 medium questions`
- `2 to 3 harder questions`

And every major skill in the unit should appear:

- in at least `2 visible sets`
- in the hidden review inventory at least `6 to 10 times`

This is important because SRS becomes weak if the app only has one or two examples for a skill.

## MVP Content Recommendation

For launch, use this minimum target:

- `3 visible practice sets`
- `1 diagnostic set`
- `1 mixed review set`
- `30 to 40 total tagged questions per unit`

This is the smallest content model that still supports:

- basic diagnosis
- skill tagging
- meaningful retry practice
- first-pass SRS

## Why 3 Sets Alone Is Not Enough

If a unit only has 3 fixed sets:

- students memorize answer positions
- retries feel repetitive
- weak-skill practice becomes too narrow
- SRS has too little variety
- progress may look better than real understanding

That creates fake mastery.

## Best Model For This Repo

Given the current codebase, the best path is:

### Visible model

Keep:

- a small number of named visible sets

### Data model

Expand:

- question-level skill tags
- hidden question inventory
- review-item scheduling

### Runtime model

Assemble:

- retry sets from tagged questions
- review sessions from due SRS items

This means the product can stay simple on the surface while the learning engine gets smarter underneath.

## Practical Recommendation For TA9

Use this target per unit:

- `5 visible sets`
- `40 to 60 questions`
- `5 primary skill clusters`
- `8 to 12 questions per cluster`

That is a realistic sweet spot for:

- student variety
- review quality
- remediation
- manageable content production

## Build Priority

### Phase 1

- keep existing visible sets
- add skill tags to all current questions

### Phase 2

- add one diagnostic set and one mixed review set per unit

### Phase 3

- expand each unit to at least `40 tagged questions`

### Phase 4

- build retry and SRS sessions from the tagged question bank

## Recommendation

For `TA9`, do not treat `3 sets per unit` as the long-term content model.

Treat it as an early shell.

The real target is:

- enough questions per skill
- enough variation for review
- enough inventory for SRS and mistake repair

That is what will make the app feel smarter than a normal test bank.
