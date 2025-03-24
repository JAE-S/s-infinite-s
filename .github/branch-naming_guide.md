# Branch Naming Convention

This document outlines our standard branch naming conventions to ensure consistency across our codebase and improve workflow clarity.

## Format

All branch names should follow this format:

```
<prefix>/<ticket-number>-<descriptive-name>
```

Where:

- `<prefix>` is one of the standard type prefixes (see below)
- `<ticket-number>` is optional but recommended (e.g., Linear ticket ref, GitHub issue number)
- `<descriptive-name>` is a brief, hyphenated description of the work

Example: `feature/ABC-123-user-authentication` or `fix/implement-password-reset`

## Branch Prefixes

Use these standard prefixes to indicate the type of work in the branch:

| Prefix                | Use Case                                                      |
| --------------------- | ------------------------------------------------------------- |
| `feature/` or `feat/` | New features or significant functionality additions           |
| `fix/`                | Bug fixes that aren't urgent production issues                |
| `hotfix/`             | Urgent fixes for production issues                            |
| `release/`            | Release preparation branches (typically with version numbers) |
| `chore/`              | Maintenance tasks, dependency updates, config changes         |
| `docs/`               | Documentation updates only                                    |
| `test/`               | Adding or updating tests without changing functionality       |
| `refactor/`           | Code restructuring without changing functionality             |
| `style/`              | Formatting, white-space, or styling changes only              |
| `perf/`               | Performance improvement changes                               |
| `ci/`                 | Changes to CI configuration and scripts                       |
| `build/`              | Changes to build system or external dependencies              |

## Ticket Numbers

When available, include the ticket number from your issue tracking system:

- Include the project code if applicable: `ABC-123`
- For GitHub issues, use the number: `#123`
- Position the ticket number between the prefix and description

Examples:

- `feature/ABC-123-user-authentication`
- `fix/#456-login-error-handling`
- `refactor/ABC-789-optimize-data-fetching`

## Best Practices

1. **Be Descriptive**: Branch names should be clear and descriptive
2. **Use Hyphens**: Separate words with hyphens in the descriptive portion
3. **Keep It Brief**: Aim for 2-4 words in the descriptive part
4. **Lowercase**: Use lowercase letters for the entire branch name
5. **No Spaces**: Never use spaces in branch names
6. **Avoid Special Characters**: Stick to letters, numbers, and hyphens

## Examples

✅ Good examples:

- `feature/ABC-123-user-authentication`
- `fix/login-error-handling`
- `docs/update-readme-installation`
- `refactor/optimize-user-queries`
- `hotfix/critical-security-vulnerability`

❌ Bad examples:

- `johns-branch` (no prefix or description)
- `feature/Implement User Authentication` (contains spaces and capitals)
- `fix_login` (uses underscore instead of hyphen, too vague)
- `feature/implement-the-new-authentication-system-with-oauth-and-user-roles` (too long)

## Branch Lifecycle

1. Create branches from `development` (depending on your workflow)
2. Keep branches focused on a single task or feature
3. Regularly pull from the parent branch to stay updated
4. Delete branches after they are merged
