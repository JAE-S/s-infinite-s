#!/usr/bin/env node

/**
 * Script to set up the git commit template
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get repository root
const repoRoot = execSync('git rev-parse --show-toplevel').toString().trim();

// Commit template path relative to repository root
const templateRelativePath = '.github/templates/commit-template.txt';
const templatePath = path.join(repoRoot, templateRelativePath);

// Check if template exists
if (!fs.existsSync(templatePath)) {
  console.error(`Error: Commit template not found at ${templatePath}`);
  process.exit(1);
}

try {
  // Set the template for the current repository
  execSync(`git config --local commit.template "${templateRelativePath}"`);
  console.log(`✅ Git commit template set to ${templateRelativePath}`);
} catch (error) {
  console.error('Error setting git commit template:', error.message);
  process.exit(1);
}