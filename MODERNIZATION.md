# Modernization notes

## Scope of this iteration

This first iteration adds a glassmorphism visual layer while deliberately leaving application behavior and server contracts untouched.

### Implemented
- Added `src/styles/glass.css` as a single, isolated presentation layer.
- Applied frosted-glass surfaces to Material UI panels, menus, drawers, and forms.
- Added light and dark glass palettes that follow the existing `darkMode` state.
- Refreshed desktop navigation, button shapes, typography, focus states, responsive spacing, and reduced-motion behavior.
- Preserved existing page components, API URL, local-storage keys, authentication flow, and Socket.IO code.

### Audit findings
- React 18.2 and TypeScript 4.9 are in use.
- The app uses Create React App (`react-scripts` 5.0.1) and Material UI 5.
- `App.tsx` owns several responsibilities (authentication restore, theme, navigation state, and socket notifications). These should be separated incrementally after the visual pass is validated.
- `App.tsx` contains `any` around user and API response data; typed API response models would be a useful follow-up.
- The `matchMedia` change listener currently has no cleanup. Fixing it is a small lifecycle improvement, but it is kept separate from this CSS-first change to make visual regressions easier to isolate.

## Recommended next steps

1. Install dependencies using the existing lockfile and run the current build/test commands to establish a baseline.
2. Review screenshots of login, registration, profile, settings, About, AR, and mobile navigation in both themes.
3. Add/repair tests for authentication restoration, route/page selection, and socket notification behavior.
4. Fix lifecycle/type-safety issues in small commits.
5. Migrate Create React App to Vite in a separate change after confirming public assets, environment variables, test setup, and deployment assumptions. Do not combine this migration with a dependency-major-version sweep.
6. Update React, TypeScript, Material UI, and supporting packages in compatible groups, rebuilding and testing after each group.

## Validation status

A build and test run could not be performed in the provided environment because `node_modules` is not included in the archive. No dependency installation was attempted. Run `npm ci`, `npm test -- --watchAll=false`, and `npm run build` locally before deploying.
