---
name: refactor-form
description: Refactor a form component to react-hook-form. Use when the user wants a form migrated to react-hook-form, or wants a form's useState fields, FormData reads, or hand-written validation cleaned up.
argument-hint: <path to form component>
---

# Refactor form to react-hook-form

This is a **refactor**: the form submits the same data, rejects the same input, shows the same error, and closes the same way after the change. Existing bugs are kept as they are. Report them at the end.

Work on one form per run: the one passed as the argument or named by the user. If the user asks for several, finish all five steps on one before starting the next.

## 1. Pin behavior

Read the form and its `.test.tsx`. The tests must cover, through the UI the way the user sees it:

- a valid submit that calls the mutation with the exact `variables` it sends today
- an empty submit that shows the error alert and does not call the mutation

Add whichever of these is missing, next to the form, following `AddTaskForm.test.tsx` (`MockedProvider`, `fireEvent`, and a `vi.fn()` result on the mutation mock). Run `npm test`.

**Done when** both cases exist and the suite is green against the **unchanged** form.

## 2. Install

Add `react-hook-form` to `dependencies` with `npm install react-hook-form` if `package.json` doesn't already have it.

## 3. Rewrite the form

- Declare a `FormValues` type with one key per submitted field. Fields that start empty are `T | null`.
- Call a single `useForm<FormValues>({ defaultValues })`. For an edit form, `defaultValues` come from the entity prop.
- For native inputs, use `register('field', { required: true })`. Keep the existing `name`, `placeholder` and markup.
- Wrap the custom components (`Select`, `Multiselect`, `DatePicker`) in `Controller`, passing `field.value` and `field.onChange` to their `value`/`values` and `onChange` props. Put the required checks in `rules`.
- Replace `showError` with `Object.keys(formState.errors).length > 0`, and keep the alert's text and markup exactly as they are.
- Use `<form onSubmit={handleSubmit(onSubmit)}>`, where `onSubmit(values: FormValues)` builds the same mutation input as before and then calls `onClose()`.
- Read display-only values, such as the due-date button label, with `watch('field')`.
- State that never gets submitted, like `openDatePicker`, stays as `useState`.

**Done when** every submitted field is managed by `useForm`, the only remaining `useState` calls hold UI-only state, and `FormData`, `showError` and per-field setters no longer appear.

## 4. Verify

Run `npm run type-check`, `npm test` and `npm run lint`. The tests from step 1 must pass **without edits**. If one fails, the refactor changed behavior, so fix the form, not the test.

**Done when** all three commands pass.

## 5. Report

Summarize what moved into `useForm`, which state stayed local, and any behavior bugs you noticed but kept (e.g. the mutation isn't awaited, so the form closes even when the request fails).
