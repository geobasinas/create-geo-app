#!/usr/bin/env node
import { execa } from 'execa';

async function main() {
  const projectName = process.argv[2];

  // Show help if --help flag is provided
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log('Usage: create-bas-app <project-name>');
    console.log('\nDescription:');
    console.log('  Creates a Next.js 16 app with shadcn/ui pre-configured');
    console.log('\nExample:');
    console.log('  create-bas-app my-app');
    console.log('\nFeatures:');
    console.log('  - Next.js 16 with TypeScript');
    console.log('  - Turbopack for faster development');
    console.log('  - Biome for linting and formatting');
    console.log('  - shadcn/ui with all components');
    console.log('  - Tailwind CSS and App Router');
    process.exit(0);
  }

  if (!projectName) {
    console.error('Please provide a project name:');
    console.error('create-bas-app <project-name>');
    console.error('\nUse --help for more information');
    process.exit(1);
  }

  // Validate project name
  if (!/^[a-z0-9-]+$/.test(projectName)) {
    console.error('Error: Project name must contain only lowercase letters, numbers, and hyphens');
    process.exit(1);
  }

  try {
    // Run create-next-app with Next.js 16 specific options
    console.log('🚀 Setting up Next.js 16 project...');
    await execa('npx', [
      'create-next-app@latest',
      projectName,
      '--yes',           // Skip confirmation prompts
      '--typescript',    // Use TypeScript
      '--tailwind',      // Use Tailwind CSS
      '--eslint',        // Include ESLint
      '--biome',         // Use Biome for linting and formatting
      '--app',           // Use App Router
      '--src-dir',       // Use src directory
      '--turbopack',     // Enable Turbopack for faster development
      '--import-alias', '@/*' // Set import alias
    ], { stdio: 'inherit' });

    // Change to project directory
    process.chdir(projectName);

    // Initialize shadcn/ui with proper configuration
    console.log('\n🎨 Installing shadcn/ui...');
    await execa('npx', [
      'shadcn@latest',
      'init',
      '--yes',           // Skip confirmation prompt
      '--defaults',      // Use default configuration
      '--css-variables'  // Use CSS variables for theming
    ], { stdio: 'inherit' });

    // Add delay for stability
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Install all shadcn/ui components
    console.log('\n📦 Installing shadcn/ui components...');
    await execa('npx', [
      'shadcn@latest',
      'add',
      '--all',           // Add all available components
      '--yes'            // Skip confirmation prompt
    ], { stdio: 'inherit' });

    console.log('\n✅ Setup complete! To start developing:');
    console.log(`📁 cd ${projectName}`);
    console.log('🚀 npm run dev');
    console.log('\n✨ Your Next.js 16 app with shadcn/ui is ready!');

  } catch (error) {
    console.error('\n❌ Error during setup:', error.message);
    console.error('Please check your internet connection and try again.');
    process.exit(1);
  }
}

main();