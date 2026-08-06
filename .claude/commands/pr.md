---
description: Push the current branch and open a PR with a Conventional-Commits-style title
argument-hint: [base-branch]
allowed-tools: Bash(git *), Bash(gh pr *), Read, Grep, Glob
---

# PR

Base branch is `$1`, defaulting to `prod` if not given — that's where features ship from.

1. Run `git status`, `git log <base>..HEAD`, and `git diff <base>...HEAD` to see the full set of commits and changes this PR will include — not just the latest commit.
2. If the current branch is `main` or `prod`, stop and ask the user to move the work to `dev` or a feature branch first — do not open a PR from it.
3. Push the branch: `git push -u origin <branch>` if it has no upstream yet, otherwise a normal `git push`.
4. Title, Conventional Commits format summarizing the overall change (not just the last commit), same `<type>(<scope>): <description>` rules as `/commit` — including the `feat` restriction: only use `feat` if the user explicitly asked for a feature PR, since `prod` is meant to only receive features.
5. Body:
   ```
   ## Summary
   - 1-3 bullets on what changed and why

   ## Test plan
   - How this was verified: tsc/test/lint/build results, manual checks
   ```
6. Create the PR:
   ```
   gh pr create --title "<type>(<scope>): <description>" --base <base> --body "$(cat <<'EOF'
   <body>
   EOF
   )"
   ```
7. Report the PR URL back to the user.
