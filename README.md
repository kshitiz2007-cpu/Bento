# Bento — Hyper-Futuristic UI Lab

A UI-first Expo / React Native project for exploring a premium, futuristic EdTech design system before connecting real utilities or backend services.

## Current milestone: UI foundation

- Dark graphite / navy surfaces with restrained lilac, rose and champagne accents.
- Bento-grid learning dashboard and reusable cards.
- Floating translucent bottom navigation.
- Study, Tests, Library and Profile screen concepts.
- Mock data only; no authentication, backend, payments, streaming or production utility integration.

## Stack

- Expo SDK 57 + React Native + TypeScript
- Expo Router
- NativeWind v4 + Tailwind CSS v3
- React Native Reusables-inspired custom primitives
- Reanimated + Worklets + Gesture Handler
- Expo Blur, Linear Gradient, Haptics, Image and Font
- Lucide React Native + SVG
- Skia and Lottie dependencies are present for later visual experiments; use them only where a screen benefits from them.

## Start locally

Use Node.js compatible with Expo SDK 57 (Node 20.19+ recommended).

```bash
npm install
npx expo install --fix
npx expo start
```

Use a compatible Expo Go build or a development build when native dependencies require it. Run Expo diagnostics and typecheck before treating the project as build-verified.

## Design rules

1. Build the visual experience with mock data first.
2. Keep tokens and shared primitives centralized.
3. Use motion only when it improves hierarchy or feedback.
4. Respect reduced motion, contrast, Hindi readability and Android touch targets.
5. Do not add backend credentials or production secrets.
6. Integrate real utilities only after the UI direction is reviewed.

## Status

Initial UI concept only; dependencies have not been installed and the app has not yet been built or tested on a device.
