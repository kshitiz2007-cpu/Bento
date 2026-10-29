# Bento — Figma-first UI Redesign Brief

## Goal
Design and approve the complete mobile-first CivilPrep / Gyankunj EdTech UI in Figma before implementing the React Native code. This repository is currently a design-first Expo / React Native UI lab; keep the work isolated from other repositories and do not add backend integrations or secrets.

## Design direction
- Product: premium, futuristic exam-preparation platform for UPSC / State PCS / SSC learners.
- Visual language: adaptive hybrid — bright, readable study surfaces with deep navy/graphite feature surfaces; restrained rose-pink/lilac accents and champagne highlights.
- Layout: purposeful Bento grid, strong editorial/kinetic typography, clear content hierarchy, compact floating bottom navigation.
- Accessibility: high contrast, large touch targets, readable Devanagari, reduced-motion support, and no critical meaning conveyed by color alone.
- Hindi-first content should look intentional, not like a translated placeholder. Use a Devanagari-compatible typeface such as Noto Sans Devanagari.

## Figma deliverables (design before code)
1. **Foundations page**
   - Color variables, semantic tokens, typography scale, spacing, radii, elevations, borders, motion principles, icon rules.
   - Light, dark, and hybrid surface guidance; contrast notes.
2. **Components page**
   - Buttons, icon buttons, search, chips, progress indicators, stat cards, Bento cards, list rows, tabs, floating navigation, empty/loading/error states, quiz answer states, reader controls.
   - Variants for default / pressed / focused / disabled / selected / loading where applicable.
3. **Mobile app screens (Android-first)**
   - Home dashboard: greeting, daily target, resume-learning hero, daily quiz/current affairs, streak/progress.
   - Study discovery: exam → subject → topic → resource hierarchy, search and filters.
   - Notes/resource detail: reading-friendly content, metadata, bookmarks and progress.
   - Quiz: question, answer options, submit/next, question navigator, explanation and results.
   - PDF reader: page controls, bookmarks, reading progress, safe-area-aware bottom actions.
   - Performance: accuracy, subject strengths, weekly activity and next-best action.
   - Live classes: upcoming/live/recorded states.
   - Profile/settings: preferences, appearance, accessibility.
4. **Responsive states**
   - Primary Android frame around 393 × 852; also check compact 360px width and a larger phone.
   - Safe areas, Android system bars, keyboard-visible forms, scrolling, long Hindi text, loading/empty/error states.
5. **Prototype**
   - Clickable core flow: Home → Study → Resource → Quiz → Results; include back navigation and key states.
6. **Developer handoff**
   - Auto Layout, named layers, component properties, variables, spacing, assets, and interaction notes.
   - No flattened screenshots as a substitute for editable UI components.

## Implementation constraints
- Inspect the repository and existing package configuration before choosing implementation details. The main branch currently contains only README.md, so establish a clean Expo + TypeScript baseline on the feature branch.
- Implement from the approved Figma file, matching component hierarchy, tokens, typography, spacing and interaction states.
- Use mock data for the initial UI milestone. Do not invent backend behavior, expose credentials, or modify other repositories.
- Keep components reusable and code production-oriented; support Android back behavior, scrolling, accessible touch targets, and responsive layout.
- Run available lint/typecheck/build checks and document any checks that cannot be run.

## Acceptance criteria
- Figma design is reviewed before the app UI is coded.
- All listed screens share one coherent design system.
- No placeholder Lorem Ipsum; use realistic UPSC/PCS study content and Hindi labels where appropriate.
- Core navigation is clickable and every major screen has empty/loading/error/normal states as relevant.
- Code is committed only to `feat/figma-first-ui-redesign`; do not merge into `main` without approval.
