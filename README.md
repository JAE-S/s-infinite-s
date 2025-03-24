# S-Infinite-S

A React-based application using TypeScript and Vite.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Development Workflow](#development-workflow)
  - [Common Commands](#common-commands)
  - [Git Workflow](#git-workflow)
- [Environment Management](#environment-management)
- [Continuous Integration & Deployment](#continuous-integration--deployment)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Code Quality & Standards](#code-quality--standards)
- [Testing](#testing)

## Features

- Infinite scroll for dynamic content loading
- Responsive design with 3-column card layout
- Loading indicators for improved user experience
- Environment-specific builds (development, staging, production)

## Tech Stack

- **React**: UI Library (v18.3.1)
- **TypeScript**: Type Safety (v5.5.3)
- **Tailwind CSS**: Styling (v3.4.12)
- **Vite**: Build optimization (v5.4.1)
- **ESLint & Prettier**: Code quality and formatting
- **PNPM**: Package manager (v9.8.0)
- **Simple Git Hooks**: Git automation
- **Standard Version**: Semantic versioning
- **GitHub Actions**: CI/CD pipeline

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- PNPM v9.8.0

### Installation

1. Clone the repository:

   ```bash
   git clone git@github.com:JAE-S/s-infinite-s.git
   cd s-infinite-s
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

// TODO: Add usage instructions and screenshots once the application has been developed.

## Development Workflow

### Common Commands

```bash
# Development
pnpm dev                 # Start development server
pnpm build:dev           # Build for development environment
pnpm build:staging       # Build for staging environment
pnpm build               # Build for production

# Code Quality
pnpm lint                # Check for linting issues
pnpm lint:fix            # Fix linting issues
pnpm format              # Format code with Prettier
pnpm type-check          # Type check TypeScript code
pnpm organize-imports    # Organize import statements

# Testing
pnpm test                # Run all tests
pnpm test:watch          # Run tests in watch mode
pnpm test:ui             # Run tests with UI
pnpm test:coverage       # Generate coverage report

# Utilities
pnpm clean               # Remove build artifacts and node_modules
```

### Git Workflow

This project follows [Conventional Commits](https://www.conventionalcommits.org/) for commit messages. A commit template is automatically applied when you create a new commit.

**Basic Structure:**

```
<type>(<scope>): <short summary>
```

**Common types:**

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Formatting changes
- `refactor`: Code changes without adding features or fixing bugs
- `perf`: Performance improvements

For more details, see [commit_guide.md](.github/commit_guide.md).

## Project Architecture

This project follows modern React architecture that combines elements of several patterns to create a maintainable structure.

- **Feature-Based Organization**: Components are structured around their functional purpose, with clear separation between reusable UI elements and page-specific views.
- **Component Composition**: The application uses a hierarchy of component types (layouts, views, components) that compose together to create complete interfaces.
- **View/Container Pattern**: Separation between container components and presentational components.

## Project Structure

```
s-infinite-s/
├── .github/                       # GitHub configuration
│   ├── templates                  # Templates for standardized formats
│   │   └── commit-template.txt    # Standard format for Git commit messages
│   ├── workflows                  # GitHub Actions workflow definitions
│   │   ├── auto-version.yml       # Automated version bumping workflow
│   │   ├── development.yml        # CI/CD pipeline for the development environment
│   │   ├── production.yml         # CI/CD pipeline for the production environment
│   │   ├── promote.yml            # Workflow for promoting code between environments
│   │   ├── setup-labels.yml       # Workflow to set up standardized issue/PR labels
│   │   ├── shared-checks.yml      # Common checks used across different workflows
│   │   └── staging.yml            # CI/CD pipeline for the staging environment
│   ├── environments.yml           # Environment configurations and variables
│   ├── labels.json                # Definitions for custom GitHub issue/PR labels
│   ├── promotion_guide.md         # Documentation on how to promote code between environments
│   ├── pull-request_template.md   # Template displayed when creating new pull requests
│   └── versioning_guide.md        # Guidelines for version numbering and management
├── .github/                       # Custom scripts
│   ├── organize-imports.cjs       # Automatically formats import statements in TypeScript/React files by grouping and ordering them according to a predefined standard pattern
│   └── setup-git-template.cjs     # Sets up Git commit message templates by copying from .github/templates/commit-template.txt to provide standardized commit formatting
├── src/
│   ├── assets/                    # Images, styling, fonts, etc.
│   ├── components/                # Reusable UI components
│   │   ├── buttons/               # Button components
│   │   │   └── __tests__/         # Button-specific tests
│   │   ├── cards/                 # Card components
│   │   │   └── __tests__/         # Card-specific tests
│   │   └── icons/                 # Icon components
│   │       └── __tests__/         # Icon-specific tests
│   ├── layouts/                   # Layout components
│   │   └── __tests__/             # Layout-specific tests
│   ├── store/                     # Store setup
│   ├── test/                      # Test configuration and utilities
│   │   ├── mocks/                 # Mock data and mock functions
│   │   ├── results/               # Test result reports
│   │   └── setup.ts               # Test setup configuration
│   ├── types/                     # TypeScript type definitions
│   ├── utils/                     # Utility functions
│   ├── views/                     # Features and feature-specific components
│   │   └── home/                  # Home essentials feature
│   │       ├── __tests__/         # Home essentials-specific tests
│   │       ├── components/        # Home essentials-specific components
│   │       └── home-dashboard_view.tsx
│   ├── App.tsx                    # Main App component
│   ├── App.css                    # Global styles
│   └── main.tsx                   # Application entry point
├── vite.config.js                 # Vite configuration
├── ...env files                   # Environment config files
└── ...config files
```

## Environment Management

The application supports three environments:

1. **Development** - For active development work

   - Branch: `development`
   - Version format: `1.2.3-dev.1`

2. **Staging** - For pre-production testing

   - Branch: `staging`
   - Version format: `1.2.3-rc.1`

3. **Production** - For production deployment
   - Branch: `production` (with `main` as a mirror)
   - Version format: `1.2.3`

### Environment Configuration

Set up environment-specific configuration by copying the example files:

```bash
# Development environment
cp .env.development.example .env.development

# Staging environment
cp .env.staging.example .env.staging

# Production environment
cp .env.production.example .env.production
```

Each environment has its own configuration file with appropriate settings for that environment. Edit these files to customize environment-specific variables.

For more details on promoting code between environments, see [promotion_guide.md](.github/promotion_guide.md).

## Continuous Integration & Deployment

This project uses GitHub Actions for CI/CD:

- **Shared Checks** - Runs linting, type checking, and testing on all branches
- **Environment-Specific Builds** - Separate workflows for development, staging, and production
- **Promotion Workflow** - Handles promoting code between environments
- **Version Management** - Automatically determines version increments based on PR labels

For detailed information about versioning, see [versioning_guide.md](.github/versioning_guide.md).

## Code Quality & Standards

Code quality is maintained through:

- **TypeScript** for type safety
- **ESLint** for code linting (v9.9.0)
- **Prettier** for code formatting (v3.3.3)
- **Simple Git Hooks** for pre-commit checks:
  - Linting
  - Type checking
  - Commit message validation
- **Import Organization** - Standardized import ordering using a custom script

## Testing

The project uses Vitest for testing with the following structure:

- **Component Tests** - Tests for individual components
- **Coverage Reports** - Generated in HTML and JSON formats

Tests are located close to the code they test, in `__tests__` directories.

// TODO: Add more specific testing strategy once implemented.
