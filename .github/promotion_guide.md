# Code Promotion Guide

This guide explains the process of promoting code between environments in our project.

## Environment Overview

Our project uses multiple environments, each with a specific purpose:

### Development Environment

- **Purpose**: Active development, feature implementation, and initial testing
- **Branch**: `development`
- **Version Format**: `1.2.3-dev.1`
- **Stability**: Less stable, frequent changes
- **URL Pattern**: `https://dev.example.com` or `/development/` path
- **Audience**: Developers and internal testers

### Staging Environment

- **Purpose**: Pre-production testing, quality assurance, user acceptance testing
- **Branch**: `staging`
- **Version Format**: `1.2.3-rc.1` (release candidate)
- **Stability**: More stable, changes only after testing in development
- **URL Pattern**: `https://staging.example.com` or `/staging/` path
- **Audience**: QA testers, product owners, stakeholders

### Production Environment

- **Purpose**: Live application used by end users
- **Branch**: `production` (with `main` as a mirror)
- **Version Format**: `1.2.3` (clean semantic version)
- **Stability**: Highly stable, changes only after thorough testing
- **URL Pattern**: `https://example.com` or root path
- **Audience**: End users

## When to Promote Code

### Development → Staging

Promote code from development to staging when:

- A feature or set of features is complete
- All unit tests are passing
- Basic integration testing has been performed
- The code is ready for more thorough testing

### Staging → Production

Promote code from staging to production when:

- All tests have passed in staging
- User acceptance testing is complete
- Performance testing shows acceptable results
- The release has been approved by the product owner

## Using the Promotion Workflow

Our automated promotion workflow simplifies the process of moving code between environments:

1. **Access the workflow**:

   - Go to the GitHub repository
   - Click on the "Actions" tab
   - Select "Promote Between Environments" from the list of workflows
   - Click on "Run workflow" button

2. **Configure the promotion**:

   - **Source environment**: Select the environment to promote from (development or staging)
   - **Target environment**: Select the environment to promote to (staging or production)
   - **Version bump type**: Choose how to increment the version number:
     - **auto**: Automatically determine the bump type by analyzing commits
     - **patch**: For bug fixes and minor changes (1.2.3 → 1.2.4)
     - **minor**: For new features (1.2.3 → 1.3.0)
     - **major**: For breaking changes (1.2.3 → 2.0.0)
     - **none**: Keep the current version number

3. **Run the workflow**:
   - Click the green "Run workflow" button
   - The workflow will create a promotion pull request

## The Promotion Process

When you run the promotion workflow, several automated steps occur:

1. A new branch is created for the promotion
2. If a version bump is selected, the version is updated according to semantic versioning rules
3. A pull request is created to merge the code into the target environment
4. The PR is labeled with "promotion" and the appropriate version bump label

## Reviewing and Approving Promotion PRs

When a promotion PR is created:

1. **Review the changes**:

   - Examine what features, fixes, or changes are included
   - Verify the version bump is appropriate
   - Check that all required tests have passed

2. **Approve and merge**:

   - Request reviews from appropriate team members
   - Once approved, merge the PR
   - The CI/CD process will automatically build and deploy to the target environment

3. **Verify the deployment**:
   - Check that the application is working correctly in the target environment
   - Verify that the version number is displayed correctly

## Automatic Version Determination

When you select "auto" for the version bump type, the system:

1. Analyzes commit messages since the last version tag
2. Looks for conventional commit prefixes:
   - `BREAKING CHANGE:` or `feat!:` → major bump
   - `feat:` → minor bump
   - `fix:`, `docs:`, etc. → patch bump
3. Determines the most significant change type and applies the corresponding bump

## Handling Hotfixes

For urgent fixes that need to bypass the normal flow:

1. Create a hotfix branch from production/main
2. Implement and test the fix
3. Create a PR directly to staging or production (depending on urgency)
4. After merging to production, backport the changes to lower environments

## Troubleshooting

### Common Issues

1. **Merge conflicts in promotion PR**:

   - Solution: Resolve conflicts manually, typically by keeping the target environment's configuration files and updating with new features from source

2. **Version bump conflicts**:

   - Solution: If the auto-detection doesn't select the appropriate bump type, close the PR and run the workflow again with manually selected bump type

3. **Failed tests after promotion**:

   - Solution: Fix issues in development first, then restart the promotion process

4. **Environment configuration issues**:
   - Solution: Check that environment-specific configurations (in `.env` files) are appropriate for the target environment

## Best Practices

1. **Regular promotions**: Promote code regularly to avoid large, risky deployments
2. **Testing before promotion**: Always test thoroughly before promoting to higher environments
3. **Version bumps**: Choose version bumps that reflect the nature of the changes
4. **Documentation**: Update documentation as features progress through environments
5. **Communication**: Notify relevant team members when promoting code, especially to production

## Viewing Promotion History

You can track the history of promotions:

1. In GitHub, filter PRs by the "promotion" label
2. Check the CHANGELOG.md file for version history
3. Review deployment logs in your CI/CD system

For any questions about the promotion process, contact the development team lead or DevOps engineer.
