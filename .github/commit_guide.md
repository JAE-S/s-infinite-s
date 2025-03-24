# Commit Message Format Guide

Our project uses the [Conventional Commits](https://www.conventionalcommits.org/) format for all commit messages. This enables automated versioning and changelog generation.

## Basic Structure

```
<type>(<scope>): <short summary>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

## Types

The type specifies what kind of change you're committing:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries
- **revert**: Reverts a previous commit

## Scope

The scope is optional and identifies the section of the codebase affected by the change:

- **ui**: UI component changes
- **hooks**: Custom hook related changes
- **utils**: Utility function changes

## Examples

```
docs(readme): update installation instructions

Updated the README with clearer installation instructions and added
troubleshooting section.
```

```
BREAKING CHANGE: refactor API client to use new endpoint structure

The API client now uses the new endpoint structure which is not
backward compatible with the old one.

BREAKING CHANGE: All API calls now require authentication token
```

## Breaking Changes

Breaking changes should be indicated in one of two ways:

1. Using a `!` after the type/scope: `feat(api)!: change response format`
2. Using `BREAKING CHANGE:` in the footer:

   ```
   feat(api): change response format

   BREAKING CHANGE: Response format is now an object instead of an array
   ```

## Version Impact

The commit type directly influences how the version number is incremented:

- **feat** → Minor version bump (1.0.0 → 1.1.0)
- **fix**, **docs**, etc. → Patch version bump (1.0.0 → 1.0.1)
- **BREAKING CHANGE** → Major version bump (1.0.0 → 2.0.0)

## Benefits of Using This Format

1. **Automated versioning**: The commit type helps determine whether a version should be bumped as patch, minor, or major
2. **Readable history**: Makes it easy to see what changes were made and why
3. **Automated changelog**: Enables generating comprehensive changelogs
4. **Searchable history**: Easier to find specific types of changes

## Commit Template

A commit template is automatically applied when you make a new commit. It provides guidance on the format to use.

If you want to bypass the template for a specific commit, you can use:

```
git commit -m "your message" --no-template
```

## Verification

Each commit is automatically checked using commitlint to ensure it follows the conventional commit format. Commits that don't follow the format will be rejected.
