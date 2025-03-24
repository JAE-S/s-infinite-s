# S-Infinite-S

A React-based application using TypeScript and Vite.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
- [Usage](#usage)
- [Code Quality](#code-quality)
- [Testing](#testing)
- [Considerations](#considerations)
- [Challenges Encountered](#challenges-encountered)
- [Future Development](#future-development)

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

## Project Architecture

// TODO: Define project architecture once the application structure is established.

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

### Development

```bash
# Start development server
pnpm dev

# Build
pnpm build

# Lint code
pnpm lint

# Preview production build
pnpm preview
```

## Usage

// TODO: Add usage instructions and screenshots once the application has been developed.

## Code Quality

- **TypeScript** for type safety
- **ESLint** for code linting (v9.9.0)
- **Prettier** for code formatting (v3.3.3)

## Testing

// TODO: Define testing strategy and implement testing infrastructure.

## Considerations

// TODO: Document design considerations and architectural decisions once they have been made.

## Challenges Encountered

// TODO: Document challenges and solutions as the project progresses.

## Future Development

// TODO: Outline future plans and improvements for the application.

### CI/CD

- Automated semantic versioning (started - Needs further testing to confirm)
- Make sure the labels defined in the .github folder(labels.json) align with git hub
