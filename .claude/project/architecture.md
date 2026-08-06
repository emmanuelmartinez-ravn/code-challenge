## Project

Tasks Management App — a web app for managing tasks.

## Stack

- React 19, TypeScript
- React Router 8
- Apollo Client 4
- Deployed on Vercel

## Structure

- src/app/ — routes & client
- src/assets/ — static assets
- src/constants/ - types, models and functions
- src/core/ — layout
- src/features/ — pages and specific components
- src/shared/ — shared components
- src/graphql/ — GraphQL queries and mutations

## Commands

- Dev: `npm run dev`
- Build: `npm run build`
- Lint: `npm run lint`
- Test: `npm test`
- Type check: `npx tsc --noEmit`

## Verification

After every change, run in this order:

1. `npx tsc --noEmit` — fix type errors
2. `npm test` — fix failing tests
3. `npm run lint` — fix lint errors
4. `npm run build` — confirm it builds

## Conventions

- Implement custom components or use already existing ones in `src/shared/`
- Use CSS styles

## Don't

- Don't use `any` — use `unknown` and narrow the type
- Don't skip error handling — always show user feedback
- Don't hardcode [config values] — they live in [config location]
