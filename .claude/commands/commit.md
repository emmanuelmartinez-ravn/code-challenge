---
description: Stage and commit the current changes using Conventional Commits
allowed-tools: Bash(git *), Bash(npx tsc *), Bash(npm test *), Bash(npm run *), Read, Grep, Glob
---

# Commit

1. Run `git status` and `git diff` (staged and unstaged) to see what changed. If there's nothing to commit, stop and say so.
2. Run verification in order, stopping at the first failure and reporting it — do not edit code to force it to pass, that's a separate task:
   - `npx tsc --noEmit`
   - `npm test`
   - `npm run lint`
   - `npm run build`
3. Stage only the files relevant to this change. Check `git status` first — don't blindly `git add -A`, and never commit `.env` or other files that look like they hold secrets.
4. Write a Conventional Commits message:
   - Format: `<type>(<scope>): <description>`
   - Types: `feat`, `fix`, `refactor`, `perf`, `test`, `docs`, `style`, `build`, `ci`, `chore`, `revert`
   - Scope: the affected area — a folder under `src/` (`app`, `features`, `shared`, `core`, `graphql`, `constants`) or a specific feature name
   - Description: imperative mood, lowercase, no trailing period
   - Add a body only when the "why" isn't obvious from the description alone
   - Add a `BREAKING CHANGE:` footer only for breaking changes
5. Create the commit via a heredoc (never `--no-verify`, never `--amend` unless explicitly asked):
   ```
   git commit -m "$(cat <<'EOF'
   <type>(<scope>): <description>
   EOF
   )"
   ```
6. Run `git status` to confirm the commit succeeded and report the result.

Do not push and do not open a pull request — that's what `/pr` is for.