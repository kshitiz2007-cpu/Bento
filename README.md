# Bento — CivilPrep Figma-first UI Lab

A UI-first Expo / React Native project for the premium, mobile-first CivilPrep exam-preparation experience by Gyankunj Academy.

## Design source of truth

**Figma file:** https://www.figma.com/design/wwUQCSNjh7RQGrKWjhhN97

Current editable screens:
- `01 — CivilPrep Home`: Bento dashboard, resume-learning hero, daily momentum, daily drill, current affairs, quick revision and floating navigation.
- `02 — Study & Practice`: subject discovery, progress cards, quiz question and answer states.

## Visual system

- Adaptive light learning surfaces with deep navy feature cards
- Restrained rose-pink and violet accents
- Bento cards, editorial typography and compact floating navigation
- Reusable tokens in `src/theme.ts`
- Hindi-ready typography and mobile-first spacing are design requirements
- Initial milestone uses mock data only; no backend secrets or production credentials

## Run locally

Install dependencies using the package manager of your choice, then:

```bash
npm install
npm run typecheck
npm start
```

Use Expo Go or an Android emulator to preview the app. A successful typecheck/build has not yet been verified in this remote repository workflow.

## Implementation plan

1. Create and validate the editable Figma design before matching it in code.
2. Implement the Home dashboard and shared design tokens.
3. Implement Study, Notes/Resource, Quiz, PDF Reader, Performance, Live Classes and Profile screens.
4. Validate Android back navigation, scrolling, touch targets, compact widths, long Hindi labels and loading/empty/error states.
5. Connect real services only after the UI milestone is approved.

All work for this redesign belongs on `feat/figma-first-ui-redesign`. Do not merge into `main` without approval.
