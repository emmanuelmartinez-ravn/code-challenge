---
name: design-system-component
description: Build a React component that matches the app's design system tokens. Use when the user wants a new UI component, a new variant of an existing one, or styles for new markup.
---

# Design-system component

`src/index.css` is the design system: the `:root` **tokens** and the global classes (`.display`, `.body`, `.button`, `.sr-only`). Every visual value in a new component is a token or a global class. Read `src/index.css` at the start of each run, because the tokens there are the only source of truth.

## 1. Reuse

List `src/shared/components/` and `src/shared/icons/`. If an existing component covers the need, use it. If it's close, add a variant to it (a `variant` prop mapped to a `block--variant` class, like `Badge` and `Button`).

**Done when** you've stated which component you're reusing or extending, or why none fits.

## 2. Place

- Used by more than one feature: `src/shared/components/<Name>/<Name>.tsx`
- Used by one feature: next to that feature's code

The CSS file goes next to the component with the same name: `<Name>.css`.

## 3. Map to tokens

Before writing CSS, list every visual value the component needs (each color, size, space, radius and font) and the token or class it maps to, using the reference below.

**Done when** every value maps. If a value has no token, ask the user rather than inventing one.

## 4. Write

- **TSX:** a `function` component, inline props marked `readonly`, `export default`, and `import './<Name>.css'`. Apply text styles with the typography classes in `className`. Give icon-only controls a label through `.sr-only` or `aria-label`.
- **CSS:** BEM classes named after the component in kebab-case: `.task-chip`, `.task-chip__icon`, `.task-chip--primary`.

## 5. Audit

Run the following on the new CSS file:

```sh
grep -nE "#[0-9a-fA-F]{3,8}|rgba?\(|font-(size|weight)|line-height|letter-spacing|[0-9]+px" <Name>.css
```

**Done when** the only hits are `1px`/`2px` border or outline widths.

Then add a `<Name>.test.tsx` next to the component that covers its behavior, and run `npm run type-check`, `npm test`, `npm run lint` and `npm run build`.

## Token reference

### Color roles

| Role | Token |
|------|-------|
| App background | `--color-neutral-5` |
| Surface (card, panel, popover) | `--color-neutral-4` |
| Raised or hovered surface | `--color-neutral-3` |
| Muted text, placeholder, disabled | `--color-neutral-2` |
| Text | `--color-neutral-1` |
| Accent, primary action, error | `--color-primary-4` (hover `-2`, active `-3`) |
| Success | `--color-secondary-4` |
| Warning | `--color-tertiary-4` |
| Info | `--color-quaternary-2` |

For a tinted background, mix the token with transparency, e.g. `color-mix(in srgb, var(--color-primary-4) 10%, transparent)`. Some existing files hard-code tints like `#da584b1a`; new code uses `color-mix` so the tint stays tied to its token.

### Typography

Always set type with the classes: `display` or `body`, plus a size (`--xl`, `--l`, `--m`, `--s`, and `--xs` for display), plus `--bold` if needed. Example: `className="body body--m body--bold"`.

### Spacing and shape

- **Spacing** uses `rem` on the existing scale: `0.25rem`, `0.5rem`, `0.75rem`, `1rem`, `2rem`. For gaps, use `0.5rem` inside a control and `1rem` between controls.
- **Radius:**
  - `0.25rem` for small pieces (badges, chips, inputs)
  - `0.5rem` for buttons, cards and popovers
  - `50%` for avatars

### Interactive elements

- Clickable elements are a `<button>` with the global `button` class. It provides the reset, flex centering, gap, padding, radius and the focus-visible ring.
- Define `:hover`, `:active` and `:disabled` states on the modifier class, following `Buttons/Button/Button.css`.

### Icons

Use icons from `src/shared/icons/`. A new icon follows the same shape: a component returning an `<svg>` with `fill="currentColor"` and `aria-hidden="true"`, so it takes its color from the surrounding text.
