# Weekly Summary: PRs #15–#23 (October 2026)

`REVIEW_PLAN.md` groups that feedback into five phases. Phases 1, 2, 3 and 5 are done. Phase 4 is waiting on the GraphQL API.

## Summary by area

### Forms and types: #15

- `AddTaskForm` and `EditTaskForm` now use `react-hook-form` instead of per-field `useState` + `FormData`. Tests confirm that submits send the same mutation variables as before.
- Types now match the values the app receives at runtime:
  - API dates are typed as ISO strings.
  - An `isStatus` guard replaces the `as Status` casts.
  - The `tasks!` assertions are gone.
  - Vite env vars are strictly typed (`vite-env.d.ts` moved into `src/` so it actually loads).

### Mutations report their outcome: #18 (Phase 1)

- **New toast system:** `Toast`, `ToastProvider` and `useToast`.
- **Create and edit wait for the server:**
  - On success, a toast appears and the modal closes.
  - On failure, an error toast appears and the modal stays open with the user's input.
  - The submit button is disabled while saving, which prevents duplicate tasks.
- **Drag-and-drop:** a failed move now shows an error toast. Before, the card silently snapped back.
- **Shared `TaskForm`:** replaces the two nearly identical forms. Refetches now use `refetchQueries: [GET_TASKS]`.

### Delete confirmation and accessible modal: #19 (Phase 2)

- **Delete confirmation:** Delete now opens a "Delete task?" `ConfirmDialog`. Confirming waits for the server, and if the delete fails the dialog stays open so the user can retry.
- **Accessible `Modal`:**
  - It has `role="dialog"`, `aria-modal` and an accessible name.
  - Escape or a backdrop press closes it.
  - Focus is trapped inside it and returns to the opener on close.
  - It is a custom dialog rather than native `<dialog>`, so toasts can still appear above it.
- **Options menu:** choosing an item closes the menu and moves focus back to "More options".

### Search, load errors and cleanup: #20, #21, #23 (Phases 3 and 5)

- **Server-side search:** search is sent to `GET_TASKS` as `{ name }`, replacing the client-side filter. Previous results stay visible while a new search loads.
- **Load errors:** when tasks fail to load, Dashboard and My Task show "Couldn't load your tasks." with a Retry button, using a new shared `ErrorState` component.
  - `ControlsLayout` shows the error itself, so neither page can show an empty-board message after a failed load.
  - #23 shortened the message, added a screen-reader-only page heading, and kept Add task visible.
- **Empty states:** "No tasks match your search." appears only when there is a search. An empty board without one says "There are no tasks yet."
- **Column order:** columns follow the workflow: Backlog → To do → In Progress → Done → Cancelled.
- **README:** the README now matches the project. It no longer mentions GraphQL Codegen or the unused `codegen` script, and it lists React Hook Form.

### Tooling and docs: #16, #17, #22

- **#16:** new `design-system-component` and `fix` Claude skills.
- **#17:** `REVIEW_PLAN.md`, which tracks every review comment by phase.
- **#22:** a read-only `reviewer` agent that reviews a PR, runs the checks in a worktree and ranks its findings.

## Test coverage

The test suite grew from 18 to 68 tests. New tests cover the forms, toasts, `Modal`, `ConfirmDialog`, `TaskCard` delete flow, `ErrorState`, search, and load and empty states.

## Still open

- **Phase 4:** point `/settings` at the profile page and request the `position` field. This needs the API.
- **Silent failures:** `ProfilePage` and the assignee list in the task form failed silently when the API was down. #24 (open) adds an error state with Retry to both.
