// Third-Party Library Imports
const { Project } = require('ts-morph');
const { execSync } = require('child_process');
const { join } = require('node:path');

// Path resolution
const scriptDir = process.cwd();
const rootDir = scriptDir; // Directly use the current directory as root

// Folders to process - now including the store folder and its subfolders
const TARGET_FOLDERS = [
  'src',
  'src/store',
  'src/store/api',
  'src/store/hooks',
  'src/store/middleware',
  'src/store/slices',
];

// Define the import group comments once - Updated with new categories and order
const IMPORT_GROUPS = {
  // External imports (builtin & external)
  react: '// React Core Imports',
  router: '// React Router Imports',
  redux: '// Redux Core Imports',
  thirdParty: '// Third-Party Library Imports',
  icons: '// Icon Imports',

  // Internal imports
  store: '// Store Imports',
  types: '// Types & Interfaces Imports',
  utils: '// Utility Function Imports',
  layout: '// Layout Imports',
  views: '// Views Imports',
  components: '// Internal Component Imports',
  styles: '// Styling Imports',
  assets: '// Assets',

  // Parent/sibling/index imports
  mocks: '// Mock Data Imports',
  other: '// Additional Imports',
  relative: '// Relative Imports',
};

function organizeImports(filePath) {
  // Skip test files
  if (filePath.includes('.test.')) {
    console.log(`Skipping test file: ${filePath}`);
    return;
  }

  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(filePath);

  // Save the original text to extract the code after imports
  const originalSourceText = sourceFile.getFullText();

  // Check for 'use client' directive
  const hasUseClientAtStart = /^\s*'use client'/.test(originalSourceText);

  // Check for block comments at the top of the file
  const blockCommentMatch = originalSourceText.match(/^\s*(\/\*\*[\s\S]*?\*\/)\s*/);
  const headerComment = blockCommentMatch ? blockCommentMatch[1] : null;

  // Initialize groups for categorizing imports
  const groups = {};
  Object.entries(IMPORT_GROUPS).forEach(([key, comment]) => {
    groups[key] = { imports: [], comment };
  });

  // Collect all import declarations
  const importDeclarations = sourceFile.getImportDeclarations().map(decl => ({
    text: decl.getText(),
    source: decl.getModuleSpecifierValue(),
  }));

  // Early return if no imports to organize
  if (importDeclarations.length === 0) {
    return;
  }

  // Find the last import to determine where imports end
  const lastImportDecl =
    sourceFile.getImportDeclarations()[sourceFile.getImportDeclarations().length - 1];
  const lastImportEnd = lastImportDecl.getEnd();

  // Get content after imports, skipping any import-related comments
  const afterImportsContent = originalSourceText.substring(lastImportEnd);

  // Find the first non-comment, non-whitespace content after imports
  const nonCommentMatch = afterImportsContent.match(/^\s*(?:\/\/[^\n]*\n)*\s*/);
  const nonImportContent = nonCommentMatch
    ? afterImportsContent.substring(nonCommentMatch[0].length)
    : afterImportsContent;

  // Check if the file is part of the Redux store structure
  const isReduxStoreFile = filePath.includes('/store/');

  // Helper function to check if an import is store-related
  const isStoreImport = source => {
    return (
      source.includes('@/store/api/') ||
      source.includes('@/store/slices/') ||
      source.includes('@/store/hooks/') ||
      source.includes('@/store') ||
      source.includes('./api/') ||
      source.includes('./slices/') ||
      source.includes('./hooks/') ||
      source === './index' ||
      // These patterns catch relative store paths with varying parent directory depth
      source.includes('/store/api') ||
      source.includes('/store/apis') ||
      source.includes('../store/api') ||
      source.includes('../../store/api') ||
      source.includes('../../../store/api') ||
      source.includes('/store/slices') ||
      source.includes('../store/slices') ||
      source.includes('../../store/slices') ||
      source.includes('../../../store/slices') ||
      source.includes('/store/hooks') ||
      source.includes('../store/hooks') ||
      source.includes('../../store/hooks') ||
      source.includes('../../../store/hooks')
    );
  };

  // Categorize imports
  importDeclarations.forEach(({ text, source }) => {
    if (isReduxStoreFile) {
      // For Redux API files, prioritize Redux-related imports
      if (source.startsWith('react') || source === 'react') {
        groups.react.imports.push(text);
      } else if (source.includes('react-router-dom')) {
        groups.router.imports.push(text);
      } else if (
        source.includes('@reduxjs/toolkit') ||
        source.includes('redux') ||
        source.includes('react-redux')
      ) {
        groups.redux.imports.push(text);
      } else if (isStoreImport(source)) {
        groups.store.imports.push(text);
      } else if (source.includes('lucide-react') || source.includes('@heroicons')) {
        groups.icons.imports.push(text);
      } else if (
        source.includes('@/types/') ||
        source.includes('./types/') ||
        source.includes('../types/')
      ) {
        groups.types.imports.push(text);
      } else if (source.includes('@/layout') || source.includes('./layout')) {
        groups.layout.imports.push(text);
      } else if (source.includes('@/views') || source.includes('./views')) {
        groups.views.imports.push(text);
      } else if (
        source.includes('@/mocks') ||
        source.includes('./mocks') ||
        source.includes('../mocks')
      ) {
        groups.mocks.imports.push(text);
      } else if (
        !source.startsWith('./') &&
        !source.startsWith('../') &&
        !source.startsWith('@/')
      ) {
        // Consider it a third-party library if it's not a relative or alias import
        groups.thirdParty.imports.push(text);
      } else if (source.startsWith('./') || source.startsWith('../')) {
        groups.relative.imports.push(text);
      } else {
        groups.other.imports.push(text);
      }
    } else {
      // Regular categorization for non-Redux files
      if (source.startsWith('react') || source === 'react') {
        groups.react.imports.push(text);
      } else if (source.includes('react-router-dom')) {
        groups.router.imports.push(text);
      } else if (
        source.includes('redux') ||
        source.includes('@reduxjs/toolkit') ||
        source.includes('react-redux')
      ) {
        groups.redux.imports.push(text);
      } else if (isStoreImport(source)) {
        groups.store.imports.push(text);
      } else if (source.includes('lucide-react') || source.includes('@heroicons')) {
        groups.icons.imports.push(text);
      } else if (source.includes('@/layout') || source.includes('./layout')) {
        groups.layout.imports.push(text);
      } else if (source.includes('@/views') || source.includes('./views')) {
        groups.views.imports.push(text);
      } else if (source.includes('/components/') || source.startsWith('./components/')) {
        groups.components.imports.push(text);
      } else if (
        source.includes('/utils/') ||
        source.includes('/helpers/') ||
        source.startsWith('./utils/')
      ) {
        groups.utils.imports.push(text);
      } else if (source.includes('/types') || source.includes('/interfaces/')) {
        groups.types.imports.push(text);
      } else if (
        source.includes('/styles/') ||
        source.endsWith('.css') ||
        source.endsWith('.scss')
      ) {
        groups.styles.imports.push(text);
      } else if (
        source.includes('/assets/') ||
        source.endsWith('.svg') ||
        source.endsWith('.png')
      ) {
        groups.assets.imports.push(text);
      } else if (
        source.includes('/mocks') ||
        source.includes('./mocks') ||
        source.includes('../mocks')
      ) {
        groups.mocks.imports.push(text);
      } else if (
        !source.startsWith('./') &&
        !source.startsWith('../') &&
        !source.startsWith('@/')
      ) {
        // Consider it a third-party library if it's not a relative or alias import
        groups.thirdParty.imports.push(text);
      } else if (source.startsWith('./') || source.startsWith('../')) {
        groups.relative.imports.push(text);
      } else {
        groups.other.imports.push(text);
      }
    }
  });

  // Filter to non-empty groups
  const nonEmptyGroups = Object.values(groups).filter(group => group.imports.length > 0);

  // Consolidate imports by comment type to avoid duplicates
  const consolidatedImports = new Map();

  nonEmptyGroups.forEach(group => {
    if (!consolidatedImports.has(group.comment)) {
      consolidatedImports.set(group.comment, []);
    }
    consolidatedImports.get(group.comment).push(...group.imports);
  });

  // Create a map of comments to their positions in the desired order
  const importPriorities = {};
  Object.values(IMPORT_GROUPS).forEach((comment, index) => {
    importPriorities[comment] = index;
  });

  // Get all comments from the consolidatedImports
  const commentKeys = Array.from(consolidatedImports.keys());

  // Create a custom sort function that doesn't rely on direct type comparison
  function compareComments(a, b) {
    const priorityA = importPriorities[a] ?? 999;
    const priorityB = importPriorities[b] ?? 999;
    return priorityA - priorityB;
  }

  // Sort the comments
  commentKeys.sort(compareComments);

  // Use the sorted keys as our ordered comments
  const orderedComments = commentKeys;

  // Format the new imports section
  let newImportsText = '';

  // Add header block comment if it existed
  if (headerComment) {
    newImportsText = `${headerComment}\n\n`;
  }

  // Add 'use client' if it existed
  if (hasUseClientAtStart) {
    newImportsText += "'use client';\n\n";
  }

  // Add each comment group with its imports
  orderedComments.forEach((comment, index) => {
    const imports = consolidatedImports.get(comment) || [];

    // Add the comment
    newImportsText += `${comment}\n`;

    // Add the imports
    newImportsText += imports.join('\n');

    // Add spacing between groups
    if (index < orderedComments.length - 1) {
      newImportsText += '\n';
    } else {
      newImportsText += '\n\n';
    }
  });

  // Create the complete file content
  const completeText = newImportsText + nonImportContent;

  // Update the file
  sourceFile.replaceWithText(completeText);
  sourceFile.saveSync();
}

function processFiles(files) {
  // Filter out .test. files before processing
  const filteredFiles = files.filter(file => !file.includes('.test.'));

  filteredFiles.forEach(file => {
    try {
      console.log(`Processing file: ${file}`);
      organizeImports(file);
      console.log(`✓ Successfully processed ${file}`);
    } catch (error) {
      console.error(`✗ Error processing ${file}:`, error);
    }
  });
}

function findAllTypeScriptFiles() {
  const project = new Project();
  const allFiles = [];

  TARGET_FOLDERS.forEach(folder => {
    const folderPath = join(rootDir, folder);
    const patterns = [
      join(folderPath, '*.ts'),
      join(folderPath, '*.tsx'),
      join(folderPath, '**/*.ts'),
      join(folderPath, '**/*.tsx'),
    ];

    const sourceFiles = project.addSourceFilesAtPaths(patterns);
    sourceFiles.forEach(file => {
      // Skip test files explicitly here as well
      if (!file.getFilePath().includes('.test.')) {
        allFiles.push(file.getFilePath());
      }
    });
  });

  return allFiles;
}

function getGitStagedFiles() {
  try {
    const result = execSync('git diff --cached --name-only', {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'], // Ignore stderr
      env: {
        ...process.env,
        GIT_TERMINAL_PROMPT: '0',
        GIT_CONFIG_PARAMETERS: "'color.status=false' 'color.ui=false'",
      },
    })
      .toString()
      .trim();

    if (!result) return [];

    return result
      .split('\n')
      .filter(line => line.length > 0) // Remove empty lines
      .filter(file => /\.(ts|tsx)$/.test(file)) // Only TS/TSX files
      .filter(file => {
        // Check if the file is in any of our target folders or subfolders
        return TARGET_FOLDERS.some(folder => {
          const normalizedFolder = folder.replace(/^src\//, ''); // Remove 'src/' prefix if it exists
          return file.includes(normalizedFolder) || file.startsWith('src/');
        });
      })
      .filter(file => !file.includes('.test.')); // Exclude test files
  } catch (error) {
    console.error('Error getting staged files:', error);
    return [];
  }
}

function main() {
  // Get files passed as arguments
  const argFiles = process.argv.slice(2).filter(arg => !arg.startsWith('-'));

  console.log('Import organizer running with:', {
    command: process.env.npm_lifecycle_event,
    argv: process.argv,
    argFiles,
    cwd: process.cwd(),
  });

  // If we have specific files, process those (excluding test files)
  if (argFiles.length > 0) {
    const nonTestFiles = argFiles.filter(file => !file.includes('.test.'));
    console.log(`Processing ${nonTestFiles.length} specific files`);
    processFiles(nonTestFiles);
  }
  // For --all flag, process all files
  else if (process.argv.includes('--all')) {
    console.log('Running full format on all TypeScript files...');
    const allFiles = findAllTypeScriptFiles();
    console.log(`Found ${allFiles.length} files to process`);
    processFiles(allFiles);
  }
  // For no arguments, get staged files
  else {
    const stagedFiles = getGitStagedFiles();
    if (stagedFiles.length > 0) {
      console.log(`Processing ${stagedFiles.length} staged files`);
      processFiles(stagedFiles.map(file => join(process.cwd(), file)));
    } else {
      console.log('No staged files to process');
    }
  }
}

// Run the script
main();
