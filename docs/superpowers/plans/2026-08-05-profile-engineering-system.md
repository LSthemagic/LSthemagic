# Railan Engineering System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a custom, dynamic GitHub profile system with original SVG components, real public telemetry, recent activity, tests, and daily GitHub Actions updates.

**Architecture:** A dependency-free Node.js 22 TypeScript pipeline reads profile configuration, fetches public GitHub REST data when a token is available, falls back to a committed snapshot offline, normalizes data into stable view models, and renders deterministic SVG assets. The README is a thin presentation layer referencing static and generated assets.

**Tech Stack:** Node.js 22, native TypeScript stripping, Node test runner, GitHub REST API, SVG, GitHub Actions.

## Global Constraints

- All visible copy is English.
- No private repository or confidential company data.
- No proficiency percentages or unverifiable expert claims.
- No runtime dependencies.
- Generated output must remain readable without animation.
- GitHub API failures must preserve a working offline generation path.
- Automated refresh commits must not appear in the transmission log.

---

### Task 1: Data normalization and SVG safety

**Files:**
- Create: `scripts/lib/svg.ts`
- Create: `scripts/lib/telemetry.ts`
- Create: `scripts/lib/transmission.ts`
- Test: `tests/svg.test.ts`
- Test: `tests/telemetry.test.ts`
- Test: `tests/transmission.test.ts`

- [ ] Write failing tests for XML escaping, telemetry aggregation, language ranking, activity filtering, empty-state behavior, and five-entry limits.
- [ ] Run tests and confirm failures are caused by missing implementations.
- [ ] Implement the smallest normalization and escaping helpers that satisfy the tests.
- [ ] Run the complete test suite.

### Task 2: Profile configuration and GitHub client

**Files:**
- Create: `data/profile.json`
- Create: `data/snapshot.json`
- Create: `scripts/lib/types.ts`
- Create: `scripts/lib/github.ts`

- [ ] Define typed public GitHub response models and profile configuration.
- [ ] Implement authenticated REST reads for user, repositories, and public events.
- [ ] Implement offline snapshot fallback without overwriting existing assets on remote failure.

### Task 3: Original SVG component system

**Files:**
- Create: `scripts/render/shared.ts`
- Create: `scripts/render/hero.ts`
- Create: `scripts/render/console.ts`
- Create: `scripts/render/matrix.ts`
- Create: `scripts/render/mission.ts`
- Create: `scripts/render/telemetry.ts`
- Create: `scripts/render/transmission.ts`
- Create: `scripts/render/footer.ts`

- [ ] Build a common command-center frame, typography, grid, glow, scanline, and reduced-motion system.
- [ ] Render the hero, engineering console, technology matrix, mission, telemetry, transmission log, and footer as accessible pure SVG.
- [ ] Escape every interpolated text value.

### Task 4: Generation pipeline

**Files:**
- Create: `scripts/generate.ts`
- Modify: `package.json`
- Create: `tsconfig.json`

- [ ] Load configuration and remote or snapshot data.
- [ ] Generate static and dynamic assets atomically.
- [ ] Add `generate`, `test`, and `verify` scripts.
- [ ] Run local generation and tests.

### Task 5: International README and automation

**Files:**
- Modify: `README.md`
- Create: `.github/workflows/update-profile.yml`

- [ ] Replace third-party hero and generic stats cards with original assets.
- [ ] Keep the full profile concise, international, and coherent.
- [ ] Configure daily, manual, and source-change workflow triggers.
- [ ] Commit generated files only when they change and prevent refresh loops.

### Task 6: Final verification and publication

- [ ] Run `npm run verify` from a clean working tree.
- [ ] Validate every SVG as XML.
- [ ] Check README references resolve to existing files.
- [ ] Publish all repository changes in one Git tree commit.
- [ ] Verify the remote README and workflow files after publication.
