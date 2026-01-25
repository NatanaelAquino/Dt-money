Project: dt-money-app (Expo + React Native + NativeWind)

Purpose
- Quick, actionable guidelines for AI coding agents to be immediately productive in this repo.

Key files & entry points
- App root: App.tsx — imports `./src/styles/global.css` and renders the app entry screen.
- Entry bootstrap: index.ts — uses `registerRootComponent(App)` (Expo standard).
- Babel: babel.config.js — uses `nativewind/babel` and `module-resolver` alias `@` -> `./src`.
- Tailwind config: tailwind.config.js — uses `nativewind/preset`; content globs include `./src/**/*.{js,jsx,ts,tsx}`.
- Colors: src/shared/colors.ts — project color tokens referenced across UI and (intended) tailwind theme.
- Styles: src/styles/global.css — imports Tailwind base/components/utilities.
- Screens/components: src/screens and src/components — typical UI surface; examples: `src/screens/login/index.tsx`.

Big-picture architecture
- Expo-managed React Native app. UI is built with React components in `src/screens` and `src/components`.
- Styling via Tailwind / NativeWind: components use `className` on React Native primitives (e.g., `<View className="...">`).
- Module aliasing: source imports commonly use `@/...` or `@/screens/...` because `babel.config.js` maps `@` to `./src`.
- No backend code present here — this is a client-only mobile app scaffold.

Developer workflows (commands)
- Start Metro + Expo dev tools: `npm run start` (alias: `expo start`).
- Run on Android device/emulator: `npm run android` (runs `expo run:android`).
- Run on iOS simulator (macOS): `npm run ios` (runs `expo run:ios`).
- Web preview: `npm run web`.
- If using npx: `npx expo start` or `npx expo run:android`.

Project-specific conventions & gotchas
- NativeWind: Use `className` on RN components (not `style`) for Tailwind utilities.
- Babel/module-resolver alias `@` — prefer imports like `import { X } from '@/components/X'`.
- Tailwind content globs already include `./src/**/*.{js,jsx,ts,tsx}` — add any new file extensions here if needed.
- Color tokens live in `src/shared/colors.ts`. Tailwind config currently references `colors` — when changing theme colors, update `tailwind.config.js` accordingly (import or require the color file if you want JS-inclusion):

  // example: const colors = require('./src/shared/colors')

- TypeScript: `tsconfig.json` extends `expo/tsconfig.base` and sets `strict: true` — keep type-safe changes minimal and add types where appropriate.
- Styling entry: `src/styles/global.css` contains the Tailwind directives — ensure this file remains imported in `App.tsx`.

Code patterns to follow when editing
- Keep changes small and focused; update `babel.config.js` only if adding aliases or changing NativeWind behavior.
- Follow existing file layout: `src/screens/<feature>/index.tsx` for screen components.
- Use the `@` alias for cross-file imports rather than long relative paths.
- Use Tailwind classes for spacing, typography and colors; reference color tokens from `src/shared/colors.ts` rather than hardcoding hex where possible.

Missing/fragile points discovered
- `tailwind.config.js` references `colors` variable but does not import it — AI edits touching the theme should ensure the `colors` variable is imported/required.
- Example UI file `src/screens/login/index.tsx` shows a truncated Tailwind class (`justi`) — watch for accidental truncations and run the app to verify layout.

Debugging tips
- Use Expo dev tools (opened by `npm run start`) to view logs and reload the app.
- For native build errors, run `expo run:android` and read Gradle outputs in the terminal.
- If Metro cache causes stale builds, restart with `expo start -c`.

What to avoid / not assumed
- There are no unit or e2e tests in the repo — do not add test scaffolding without the user's request.
- No CI or GitHub Actions files detected; avoid adding CI changes unless instructed.

When making PRs
- Keep changes minimal and testable in Expo (via `npm run start` and device/simulator).
- Run TypeScript typecheck (`tsc`) locally if changing types.

If you need clarification from the human
- Ask which target platforms to prioritize (Expo Go, Android standalone, iOS simulator).
- Ask whether color tokens should be imported into `tailwind.config.js` or duplicated there.

End of file.
