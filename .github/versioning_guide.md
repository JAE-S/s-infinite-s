# Versioning Guide

## Automated Versioning System

This project uses automated semantic versioning based on [Conventional Commits](https://www.conventionalcommits.org/) and PR labels. This document explains how to work with our versioning system.

## Pull Request Labels for Versioning

When creating pull requests, add one of these labels to control version bumping:

- **`major`** - Indicates a breaking change (bumps the first number, e.g., 1.0.0 → 2.0.0)
- **`minor`** - Indicates a new feature (bumps the second number, e.g., 1.0.0 → 1.1.0)
- **`patch`** - Indicates a bug fix or minor change (bumps the third number, e.g., 1.0.0 → 1.0.1)

If no label is added, the system defaults to a `patch` increment.

## How to Apply Labels to PRs

1. Create your pull request as normal
2. On the right sidebar of the PR, click on the gear icon next to "Labels"
3. Select the appropriate version bump label based on the changes in your PR
4. Save your selection

## Version Label Guidelines

Use these guidelines to determine which label to apply:

- **`major`** - Use when making incompatible API changes, changing the user interface dramatically, or removing features

  - Examples: Changing how authentication works, redesigning the UI, removing a significant feature

- **`minor`** - Use when adding functionality in a backward-compatible manner

  - Examples: Adding a new feature, expanding an existing feature, adding new parameters to an API

- **`patch`** - Use for backward-compatible bug fixes or minor improvements
  - Examples: Fixing bugs, improving performance, enhancing documentation, minor UI adjustments

## Commit Message Format

While PR labels are the primary way we determine version bumps, we also analyze commit messages as a fallback. Following the Conventional Commits format will help our automation:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Common types:

- `fix:` - Bug fixes (patch bump)
- `feat:` - New features (minor bump)
- `feat!:` or `BREAKING CHANGE:` - Breaking changes (major bump)
- `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `chore:` - Other changes (no version bump)

## Environment-Specific Versioning

Our system automatically applies different version formats based on the target environment:

- **Development**: `1.2.3-dev.1` - Development pre-releases
- **Staging**: `1.2.3-rc.1` - Release candidates
- **Production**: `1.2.3` - Clean semantic versions

## Promotion Between Environments

When using the promotion workflow to promote code between environments:

1. Go to Actions → Promote Between Environments
2. Select the source and target environments
3. Choose a version bump type or select "auto" to analyze commits automatically
4. Run the workflow

The promotion will create a new pull request with the appropriate version bump label.

## Viewing Version History

You can view the version history in:

1. The `CHANGELOG.md` file in the repository
2. GitHub Releases (for production versions)
3. The version display in the application footer

## Questions and Support

If you have questions about versioning or encounter issues, please contact the development team lead.
