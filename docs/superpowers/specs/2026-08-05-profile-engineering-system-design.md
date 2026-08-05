# Railan Engineering System — Design Specification

## Goal

Transform the GitHub profile repository into a custom, international, dynamic engineering profile that demonstrates backend, automation, API integration, TypeScript, SVG generation, and GitHub Actions capabilities.

The final profile must feel like a hybrid between an engineering command center and a digital transmission interface: cinematic enough to be memorable, restrained enough to remain professional.

## Positioning

Primary title:

> Full Stack Software Engineer

Primary focus:

- Backend systems
- AI-powered automation
- Software architecture
- Complex integrations

The profile must not be centered on PASS or Travel Tech. Those remain part of Railan's professional experience, not the entirety of his identity.

## Language

All visible profile copy will be written in English.

The tone must be confident, technical, concise, and internationally understandable. Avoid unverifiable claims such as "expert", percentage-based proficiency, or exaggerated marketing language.

## Visual Direction

The interface will use a dark command-center aesthetic with subtle transmission effects.

Visual principles:

- Dark navy background
- Ice-blue highlights
- White primary text
- Subtle cyan glow
- Fine technical grid
- Soft scanlines
- Minimal pulse and cursor animations
- Strong spacing and hierarchy
- No aggressive glitch effects
- No gamer-style visual clutter

Core palette:

- Background: `#0B1220`
- Secondary surface: `#111C2E`
- Structural blue: `#28556F`
- Accent blue: `#5CA0C6`
- Highlight: `#89CFF0`
- Primary text: `#FFFFFF`
- Secondary text: `#C9D1D9`

## Profile Structure

### 1. System Hero

A custom SVG will replace the current capsule-render banner.

It will display:

- `RAILAN ENGINEERING SYSTEM`
- `RAILAN SANTANA`
- `FULL STACK SOFTWARE ENGINEER`
- Backend Systems
- AI Automation
- Software Architecture
- Location: Brazil
- System status: Online

Animations will be limited to a pulsing status indicator, cursor blink, soft line movement, and restrained scanlines.

### 2. Communication Links

LinkedIn, portfolio, email, and GitHub links will remain immediately visible below the hero. Their badges must match the project palette.

### 3. System Profile

A concise introduction will explain Railan's background and interests without making the profile dependent on his current company.

The copy will highlight:

- Full Stack development
- Backend APIs and services
- REST and SOAP integrations
- Data normalization
- AI and workflow automation
- Web and mobile development
- Interest in maintainable, scalable systems

### 4. Engineering Console

A custom SVG panel will simulate a command output such as `whoami`.

It will present:

- Role
- Location
- Core domains
- Engineering mindset
- Current system status

The component will be accessible, readable without animation, and responsive inside GitHub's README width.

### 5. Technology Matrix

The technology section will be organized by engineering responsibility instead of presenting an unstructured icon wall.

Domains:

- Backend Core
- Intelligence Layer
- Data Systems
- Experience Layer
- Delivery and Infrastructure

Technologies may include TypeScript, JavaScript, Java, Python, Dart, Node.js, Fastify, Spring Boot, FastAPI, React, Angular, Flutter, PostgreSQL, MySQL, Redis, MongoDB, Firebase, Docker, AWS, GCP, GitHub Actions, Linux, n8n, OpenAI, and Gemini.

The matrix must not imply equal proficiency across all technologies.

### 6. Current Mission

A compact dashboard-style section will replace a generic "currently learning" list.

It will communicate the current directions:

- Building backend services and complex integrations
- Designing AI-assisted automation workflows
- Improving Java and Spring Boot knowledge
- Exploring Flutter and mobile architecture
- Studying distributed systems and system design

This section will be manually editable through a small data file.

### 7. System Telemetry

A generated SVG will show public GitHub data retrieved through the GitHub API.

Initial metrics:

- Public repository count
- Followers
- Total public stars received
- Recent public activity count
- Primary languages from selected public repositories
- Last successful telemetry update

The profile must not fabricate private commit counts or inaccessible metrics.

### 8. Transmission Log

A generated section will summarize recent public activity. It may include public pushes, pull requests, repository creation, and releases.

Rules:

- Maximum of five entries
- Human-readable English descriptions
- No exposure of private repositories
- No automated commit loop entries
- Graceful empty state when no relevant activity is available

### 9. Signal Map

The public contribution or activity graph will remain, but it will be presented inside the same visual language and labeled `SIGNAL MAP`.

A third-party graph service may be retained initially, provided failure does not break the rest of the profile.

### 10. Open Communication Channel

The footer will use a custom SVG and repeat only the essential contact paths.

Closing message:

> ENGINEERING SYSTEMS. AUTOMATING COMPLEXITY. BUILDING WHAT'S NEXT.

## Repository Architecture

```text
LSthemagic/
├── .github/
│   └── workflows/
│       └── update-profile.yml
├── assets/
│   ├── generated/
│   │   ├── telemetry.svg
│   │   └── transmission-log.svg
│   └── static/
│       ├── hero.svg
│       ├── engineering-console.svg
│       ├── technology-matrix.svg
│       └── footer.svg
├── data/
│   └── profile.json
├── scripts/
│   ├── github.ts
│   ├── telemetry.ts
│   ├── transmission-log.ts
│   ├── svg.ts
│   └── generate.ts
├── tests/
│   ├── telemetry.test.ts
│   ├── transmission-log.test.ts
│   └── svg.test.ts
├── docs/
│   └── superpowers/
│       ├── specs/
│       └── plans/
├── package.json
├── tsconfig.json
└── README.md
```

## Data Flow

1. GitHub Actions runs once per day and through manual dispatch.
2. The workflow executes the TypeScript generator with `GITHUB_TOKEN`.
3. The GitHub client retrieves only public profile, repository, language, star, and event data.
4. Normalizers convert API responses into stable internal models.
5. SVG renderers generate deterministic output.
6. The workflow checks for changes under `assets/generated/`.
7. A commit is created only when generated files changed.
8. Automated commits use a fixed message and are excluded from the transmission log.

## Configuration

`data/profile.json` will contain manually maintained content such as:

- Display name
- Role
- Location
- Core domains
- Current mission entries
- Technology groups
- Social links

No secret, company-confidential, or private repository information will be stored.

## Automation

Workflow triggers:

- Daily schedule
- Manual `workflow_dispatch`
- Push affecting scripts, data, or workflow configuration

Workflow permissions:

- `contents: write`

The workflow will use the repository-provided `GITHUB_TOKEN`. No personal access token will be required for the initial version.

## Reliability and Error Handling

- GitHub API failures must not overwrite existing generated assets.
- Missing language data must produce a readable fallback.
- SVG text must be escaped before rendering.
- Generated SVGs must remain valid even with empty event lists.
- The workflow must not commit when outputs are unchanged.
- Automated commits must not trigger an infinite generation loop.

## Testing

Tests will cover:

- Aggregation of repository stars
- Language ranking and percentage calculation
- Filtering private and automated activity
- Empty activity fallback
- XML escaping
- Deterministic SVG generation
- Maximum transmission log length

A local verification command will generate all assets and run the complete test suite.

## Accessibility

- All SVGs will include a title and description.
- Text contrast will remain high.
- Critical content will not depend exclusively on animation or color.
- Animations will respect `prefers-reduced-motion` where supported in embedded SVG.
- The README will provide meaningful `alt` text for every image.

## Scope Boundaries

Included in the first version:

- Custom static hero, console, technology matrix, and footer SVGs
- Dynamic telemetry and transmission-log SVGs
- TypeScript generation pipeline
- Automated daily updates
- Complete English README rewrite
- Tests for data processing and SVG generation

Not included in the first version:

- Visitor guestbook
- Spotify integration
- WakaTime integration
- Private contribution metrics
- External database
- Hosted backend service
- Interactive JavaScript inside the GitHub README
- Separate reusable npm package

## Success Criteria

The work is complete when:

- The profile is fully readable in GitHub's README renderer.
- The profile no longer depends on capsule-render for its core identity.
- The visible copy is fully in English.
- The design consistently follows the hybrid command-center/transmission direction.
- Telemetry is generated from real public GitHub data.
- The workflow updates generated assets without creating commit loops.
- Tests pass locally and in GitHub Actions.
- No private or PASS-confidential information is exposed.
