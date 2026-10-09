---
name: fix
description: Apply a surgical, type-safe fix for a bug whose cause is known. Use when the user asks to fix a specific bug or review finding, or when diagnosing-bugs has located a cause.
---

# Fix

A fix is **surgical**: the diff holds only the lines the bug needs changed, plus a regression test. Everything else you notice (duplication, naming, structure, nearby bugs) goes in the report at the end, not in the diff.

## 1. Pin the bug

Write one sentence: *input or state → wrong result, expected result*. Then find the line that causes it.

**Done when** you can name the cause as `file:line` and explain why it produces the wrong result. If you can't, run the `diagnosing-bugs` skill first and come back with its cause.

## 2. Go red

Write a regression test next to the code (`<Name>.test.tsx`) that reproduces the sentence from step 1 through behavior a user or caller would see.

**Done when** the test fails on its assertion, for the reason in step 1. A failure from setup, imports or mocks doesn't count.

## 3. Apply the fix

Change the fewest lines at the cause, using the type-safe toolbox below. Keep existing names, formatting, structure and file layout as they are.

**Done when** the test from step 2 passes and you can explain how each changed line contributes to that.

## 4. Verify

1. Run `npm run type-check`, `npm test` and `npm run lint`.
2. Read `git diff` hunk by hunk. Each hunk is either part of the fix or the regression test. Revert any other hunk, including whitespace and import reordering.
3. Run the type-safety audit on the added lines:

   ```sh
   git diff -U0 | grep -nE "^\+.*(\bas [A-Za-z{]|[]A-Za-z0-9_)]!(\.|\)|,|;|\]|$)|: any\b|<any>|any\[\]|@ts-|eslint-disable)" | grep -v "as const"
   ```

**Done when** all three commands pass, every hunk is part of the fix or the test, and the audit has no hits.

## 5. Report

- **Cause:** `file:line` and why it went wrong
- **Fix:** what changed
- **Test:** its name, and that it failed before the fix and passes after
- **Noticed, not changed:** anything else you saw while working

## Type-safe toolbox

Make the compiler prove every type in the fix through narrowing. Reach for these in order:

1. **An existing guard.** Search `src/constants/utils.ts` for a type guard (e.g. `isStatus`) before writing a new one.
2. **Control-flow narrowing:** an early return (`if (!task) return`), or `typeof`, `in`, `instanceof` or `Array.isArray` checks.
3. **A new type guard** (`function isX(value: unknown): value is X`) when the same check is needed in more than one place. It goes in `src/constants/utils.ts`.
4. **`?.` and `??`** only where `null`/`undefined` is a valid state, with a fallback that means something (e.g. `?? []` for "no tasks"). Never use them to hide the bug.
5. **`catch (error: unknown)`**, then narrow with `error instanceof Error` before reading `.message`.
6. **An exhaustive `switch`** over a union, with a `const unreachable: never = value` default, when the bug is an unhandled case.
7. **Correct the type itself** when the type is wrong about the runtime value (e.g. a field typed `Date` that arrives as a `string`). That counts as part of the fix.

The guardrail the audit enforces: no `as` casts, non-null `!`, `any`, `@ts-ignore`/`@ts-expect-error` or `eslint-disable` in the diff. Each of these hides a type problem without proving anything, so use a narrowing from the list above instead.
