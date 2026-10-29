# CivilPrep — The Cognitive Field

An Android-first Expo / React Native prototype for the **Hybrid Knowledge Universe**: mission-first daily learning, an interactive syllabus field, and a focused recall workspace.

## Prototype scope

### Screen 1 — Mission Home
- Recommended mission with a direct start action.
- Connected Knowledge Field preview.
- Continue-learning and daily-recall entry points.
- Searchable topic index as a practical alternative to graph-only navigation.

### Screen 2 — Knowledge Field + Topic Workspace
- Selectable concept nodes and relationship lines.
- Searchable, list-based topic navigation.
- Topic context, related topics, and Understand / Visualise / Recall / Exam mode choices.
- Lightweight SVG visualization rather than a heavyweight 3D engine.

### Screen 3 — Recall Chamber
- Sample multiple-choice questions with answer selection.
- Submission feedback and explanations.
- Question navigator, progress indication, session summary, and retry.
- Local in-memory session state; this is not yet a persistent or production assessment engine.

## Design direction
- Adaptive Hybrid: mission first, Knowledge Field one gesture away.
- Balanced premium and practical information density.
- Selective immersion only when visual relationships help comprehension.
- Warm paper, deep ink, restrained cobalt, and electric lime accents.
- Mobile bottom navigation and a desktop sidebar/context-panel layout.
- No fake live data: sample content is explicitly labelled as prototype data.

## Stack
- Expo SDK 57, React Native 0.86, React 19, TypeScript
- Expo Router
- react-native-svg for the initial knowledge graph
- Lucide React Native
- Existing project dependencies include Skia, Reanimated, Gesture Handler, Haptics, and NativeWind for future needs.

## Run locally
Use Node.js 22.13.x or newer, consistent with the current Expo SDK baseline.

```bash
npm install
npx expo install --fix
npm run typecheck
npx expo-doctor
npm run build:web
npx expo start
```

Validate with an Android device/emulator and a desktop browser before treating the prototype as build-verified. These commands have not been run in the remote editing workflow.

## Known limitations
- Content and questions are illustrative sample data.
- No authentication, backend, Supabase integration, analytics, payments, live classes, or production learner history is connected.
- The graph is a prototype of topic relationships; production relationships must come from verified syllabus/content metadata.
- State is local to the mounted UI and is not yet persisted across app restarts.
- Accessibility, reduced-motion, offline, and narrow-screen testing remain required.

## Safety boundaries
This branch changes only the CivilPrep UI prototype and app shell. Do not merge or deploy until build and device validation are completed. Keep credentials and production data out of the prototype.
