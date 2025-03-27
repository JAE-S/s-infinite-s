# CI/CD Testing Workflows Guide

This guide explains how our test automation is integrated into the CI/CD pipeline through GitHub Actions workflows.

## Workflow Architecture

Our CI/CD pipeline separates concerns between test verification and build/deployment:

### Quality & Tests Workflow

The central test workflow (`quality-and-tests.yml`) runs all tests based on the target environment:

```
.github/workflows/quality-and-tests.yml
```

This workflow:

1. Runs on all PRs and branch pushes
2. Performs code quality checks first (linting, type checking)
3. Runs automated tests based on target environment

### Environment-Specific Build Workflows

Environment builds are handled in separate workflows that depend on tests passing:

```
.github/workflows/development.yml
.github/workflows/staging.yml
.github/workflows/production.yml
```

Each environment workflow:

1. References the shared `quality-and-tests.yml` workflow
2. Waits for tests to pass before building
3. Creates and uploads build artifacts

## Environment Detection

The `quality-and-tests.yml` workflow automatically determines which environment you're targeting:

```yaml
- name: Determine environment
  id: determine-env
  run: |
    if [[ "${{ github.ref }}" == "refs/heads/development" || "${{ github.base_ref }}" == "development" ]]; then
      echo "environment=development" >> $GITHUB_OUTPUT
    elif [[ "${{ github.ref }}" == "refs/heads/staging" || "${{ github.base_ref }}" == "staging" ]]; then
      echo "environment=staging" >> $GITHUB_OUTPUT
    elif [[ "${{ github.ref }}" == "refs/heads/production" || "${{ github.base_ref }}" == "production" || "${{ github.ref }}" == "refs/heads/main" ]]; then
      echo "environment=production" >> $GITHUB_OUTPUT
    else
      echo "environment=development" >> $GITHUB_OUTPUT
    fi
```

## Test Categories by Environment

Tests are run progressively across environments:

| Test Category | Development | Staging | Production |
| ------------- | ----------- | ------- | ---------- |
| Smoke Tests   | ✅          | ✅      | ✅         |
| Accessibility | ❌          | ✅      | ✅         |
| SEO           | ❌          | ❌      | ✅         |
| Code Coverage | ❌          | ❌      | ✅         |

## Test Results Reporting

Test results are communicated through several channels:

1. **GitHub Actions Logs**: Complete test output in workflow logs
2. **PR Comments**: Automated comment with test summary on pull requests
3. **Artifacts**: Test results stored as workflow artifacts
4. **Coverage Reports**: Generated for production builds

Example PR comment:

```markdown
## Test Results Summary

Environment: staging

- Smoke Tests: ✅
- Accessibility Tests: ✅
```

## Adding New Test Categories

To add a new test category to the CI pipeline:

1. Add a new npm script in package.json:

   ```json
   "test:new-category": "vitest run --testNamePattern=\"new-category\""
   ```

2. Update the `quality-and-tests.yml` workflow to run the new category for appropriate environments:

   ```yaml
   - name: Run new category tests
     if: steps.determine-env.outputs.environment == 'staging' || steps.determine-env.outputs.environment == 'production'
     run: pnpm run test:new-category
   ```

3. Update the test summary section to include the new category

## Troubleshooting Workflow Issues

### Common Issues

1. **Tests pass locally but fail in CI**:
   - Check Node/npm versions
   - Look for timing issues in async tests
   - Check for environment-specific configurations
