# Bento — CivilPrep Fieldwork UI

A UI-first Expo / React Native concept for a distinct CivilPrep learning environment. The design direction is editorial and spatial rather than a conventional dashboard: warm paper surfaces, oversized typography, an indexed learning atlas, newspaper-like current-affairs briefings, and a focused retrieval-practice zone.

## Current milestone: editorial dashboard

- A typographic masthead and daily edition framing.
- Asymmetric feature layout instead of repeated card grids.
- Learning atlas with indexed subject rows and progress traces.
- Editorial current-affairs briefing with a lead story and secondary reading rail.
- Dedicated dark focus panel and retrieval-practice band.
- Responsive desktop navigation rail and compact mobile navigation dock.
- Sample data only; no authentication, backend, payments, streaming, or production utility integration.

## Stack

- Expo SDK 57 + React Native + TypeScript
- Expo Router
- NativeWind v4 + Tailwind CSS v3 (available in project; this screen uses explicit style tokens)
- Expo Linear Gradient
- Lucide React Native
- Existing project dependencies include Reanimated, Worklets, Gesture Handler, Blur, Haptics, Image, Font, SVG, Skia and Lottie for selective future use.

## Start locally

Use Node.js 22.13.x or newer, matching the Expo SDK 57 baseline.

```bash
npm install
npx expo install --fix
npm run typecheck
npm run build:web
npx expo start
```

Use a compatible Expo Go build or a development build when native dependencies require it. Run Expo diagnostics and validate on Android and web before treating the UI as build-verified.

## Design rules

1. Do not turn every content type into the same card.
2. Let content shape its own layout: editorial stories, indexed syllabus regions, timed drills, and progress traces each have distinct visual grammar.
3. Use typography, whitespace, rules, and asymmetry as primary hierarchy—not decorative gradients.
4. Keep Hindi legible, touch targets accessible, and layouts responsive.
5. Use motion and canvas effects only where they add meaning.
6. Do not add backend credentials or production secrets.
7. Integrate real services only after the UI direction is reviewed.

## Status

Visual concept implementation in progress. The screen uses illustrative sample metrics and interactions. Dependency installation, typecheck, web export, Expo diagnostics, and device validation remain required.
