# Review Plan: Steven's PR Feedback

Source: comments by **stevenheffner** on PRs #2, #3, #4, #7, #8, #11 and #14.
Baseline: branch `refactor/react-hook-form-type-safety` (PR #15), where both task forms already use react-hook-form.

Steven's summary: *"they are one lesson, not four"*. **Everything that can fail is silent.** Phases 1–3 fix that lesson. Phases 4–5 are the remaining correctness and hygiene items.

## Feedback inventory

| # | PR | File | Priority | Issue | Status |
|---|----|------|----------|-------|--------|
| 1 | #2 | `AddTaskForm.tsx` | High | `createTask` is fire-and-forget: the modal closes before the result arrives, and errors are never shown | **Done (Phase 1)** |
| 2 | #3 | `EditTaskForm.tsx` | High | Same fire-and-forget problem with `updateTask` | **Done (Phase 1)** |
| 3 | #4 | `TaskCard.tsx` | High | Delete has no confirmation, no notification, and fails silently | **Done (Phase 2)** |
| 4 | #7 | `ControlsLayout.tsx` | High | Search filters on the client; `FilterTaskInput` is never sent to the server | **Done (Phase 3)**, live check pending API |
| 5 | #7 | `ControlsLayout.tsx` | High | `error` is ignored, so an API failure shows "No tasks match your search" | **Done (Phase 3)** |
| 6 | #2 | `Modal.tsx` | Medium | No `role="dialog"`, no Escape key, no focus handling | **Done (Phase 2)** |
| 7 | #3 | Both forms | Medium | The two forms are ~90% duplicated, and they live in different folders | **Done (Phase 1)** |
| 8 | #8 | `router.tsx`, `profile.ts` | Medium | `/settings` is a placeholder; the profile query doesn't request `position` | Open → Phase 4 (`position` needs API) |
| 9 | #11 | 4 files | Low | `refetchQueries: [{ query: GET_TASKS, variables: { input: {} } }]` is repeated in 4 files | **Done (Phase 1)** |
| 10 | #2 | `Status.ts` | Low | Columns are in alphabetical order, not workflow order | **Done (Phase 5)** |
| 11 | #14 | `README.md` | Hygiene | README mentions GraphQL Code Generator and `npm run codegen`, which don't exist | **Done (Phase 5)** |
| 12 | #14 | `TasksColumn.tsx` | Hygiene | `tasks!` non-null assertions | **Done in PR #15** |

---

## Phase 1: Mutations that report their outcome

Covers items 1, 2, 7 and 9. Merging the forms comes first so the error handling is written once instead of twice.

1. **One refetch strategy.** Replace the four `refetchQueries` copies with `refetchQueries: ['GetTasks']` (by operation name), or a small shared constant or hook.
   - Refetching by name refetches whatever `GetTasks` queries are currently active, with their own variables. So it keeps working when Phase 3 starts sending real filters.
2. **Extract `TaskForm`.** Build a shared `TaskForm({ initialTask?, submitLabel, onSubmit })` from the two react-hook-form components.
   - Create passes no task and keeps the status fixed to `TODO`; edit passes the task and shows the Status select.
   - `AddTaskForm` and `EditTaskForm` become thin wrappers that call `createTask` / `updateTask`.
   - Move the shared option components (`EstimateSelectOption`, `AssigneeSelectOption`) next to `TaskForm`. Today `EditTaskForm` imports them from `core/layout/...`.
   - Compute the "N Point(s)" label once (in a helper in `src/constants/utils.ts`) instead of twice per option.
3. **Await the mutation in `onSubmit`.**
   - Make it `async`, `await` the mutation inside `try/catch`, and call `onClose()` only on success.
   - On failure, keep the modal open and show the server error in a `role="alert"` region, separate from the validation message.
   - Disable the submit button while `formState.isSubmitting` is true, so a slow request can't be submitted twice.
4. **Drag and drop (`DashboardPage.tsx:78`).** The optimistic response already rolls the card back on failure. Add `.catch` and report the failure (with the Phase 2 toast once it exists), so the snap-back isn't left unexplained. This also clears the SonarQube floating-promise warning.

**Done when:**
- No mutation call in `src/` is left un-awaited or without a `.catch`.
- Each form has a test where the mutation mock returns an error and the test asserts that the modal stays open and the error text is visible.
- `refetchQueries` with inline variables appears nowhere.

## Phase 2: Delete confirmation, notifications and an accessible modal

Covers items 3 and 6. The confirmation dialog reuses `Modal`, so the modal gets fixed first.

1. **Done, with a custom dialog instead of native `<dialog>`:** `showModal()` puts the dialog in the browser top layer, above any z-index, so toasts would render under its backdrop and become inert. `Modal` is now `role="dialog"` + `aria-modal` + `aria-label`, with Escape, backdrop close, a Tab focus trap, and focus moved in on open and returned on close.
   - Add an `onClose` prop and give it a label via `aria-labelledby`.
   - Return focus to the element that opened the modal when it closes.
   - Check that existing tests still find the forms (jsdom supports `<dialog>` but may need `showModal` stubbed in `vitest.setup.ts`).
2. **Add a `ConfirmDialog` component** (in `src/shared/components/`) built on `Modal`, with a message, a Confirm button and a Cancel button.
3. ~~**Add a small toast system**~~ **Done in Phase 1:** `ToastProvider` + `useToast()` in `src/shared/components/Toast/`, mounted in `Providers`.
4. **Delete flow in `TaskCard`:**
   - Clicking "Delete" opens `ConfirmDialog`.
   - Confirming awaits `deleteTask`, then shows a success or error toast.
   - Reuse the toast for the create/update errors from Phase 1 if that reads better than the inline alert.

**Done when:**
- Clicking Delete sends no request until Confirm is pressed.
- There are tests for cancel (no request sent), confirm success (success toast) and confirm failure (error toast).
- Escape closes the modal, and focus returns to the "More options" button.

## Phase 3: Server-side filtering and an error state

Covers items 4 and 5. ⚠️ **The GraphQL API is currently down.** Build and unit-test against `MockedProvider` now; check the real server's filter behavior (partial name match, case sensitivity) once it's back.

1. **`ControlsLayout.tsx`:** pass `{ input: { name: search || undefined } }` to `GET_TASKS`, and remove the client-side `.filter(...)`. The debounced `search` already exists, so each keystroke won't fire its own request.
2. **Decide whether to add more filters now** (status, tags, estimate, assignee, due date). `FilterTaskInput` already has the fields. At minimum, name search must go to the server, per the challenge requirement.
3. **Give loading, error and empty their own branches.**
   - Add `error` to `ControlsOutletContext`.
   - In `DashboardPage` (and the `MyTask` view), render an error message with a Retry button (`refetch()`) *before* the "No tasks match your search" branch.
4. **Tests:**
   - the query is sent with `name` set to the search term
   - an API error renders the error state, not "No results"

**Done when:**
- Typing in search sends a `GetTasks` request with `name` set.
- No `.filter(` on task names remains.
- The error state has a test.

## Phase 4: Settings and profile

Covers item 8.

1. In `router.tsx`, point `settings` to `<ProfilePage />` and keep `profile` as an alias, or redirect it.
2. Add `position` to `GET_PROFILE` and to the `Profile` type, and render it in `ProfilePage`. ⚠️ **Needs the API** to confirm the field exists. If the schema doesn't expose it, note that in the README instead.

**Done when** `/settings` shows the profile with all six fields, or the README states that `position` is missing from the API.

## Phase 5: Quick hygiene

Covers items 10 and 11.

1. Reorder `STATUSES` to workflow order: `BACKLOG`, `TODO`, `IN_PROGRESS`, `DONE`, `CANCELLED`. Check that `groupTasksByStatus` and the tests don't depend on the old order.
2. README: remove the GraphQL Code Generator line and the `npm run codegen` row, and state that the types are hand-written in `src/constants/`. Also remove the `codegen` script from `package.json`, since `codegen.ts` doesn't exist. Codegen can come back once the API is up.

**Done when** the board shows columns in workflow order and the README matches `package.json`.

---

## Suggested PR breakdown

| PR | Scope | Blocked by API? |
|----|-------|-----------------|
| A | Phase 1: shared `TaskForm`, awaited mutations, refetch by name | No |
| B | Phase 2: `<dialog>` modal, confirm dialog, toasts, delete flow | No |
| C | Phase 3: server-side filters and error state | Live check only |
| D | Phases 4 + 5: settings route, status order, README | `position` field only |

Each PR runs `npm run type-check`, `npm test`, `npm run lint` and `npm run build` before opening, and targets `prod` from a feature branch.
