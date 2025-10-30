# Create Geo App

A CLI tool to create Next.js 16 apps with shadcn/ui pre-configured using the latest best practices.

## Features

- 🚀 **Next.js 16** with App Router and TypeScript
- ⚡ **Turbopack** enabled for faster development builds
- 🔧 **Biome** for linting and formatting (replaces ESLint)
- 🎨 **shadcn/ui** with all components pre-installed
- 🌙 **Dark mode support** with next-themes
- 📚 **MDX Documentation System** with syntax highlighting and copy buttons
- 📦 **Latest configurations** based on official documentation
- 🔧 **Non-interactive setup** with sensible defaults
- ✅ **Proper validation** and error handling
- 🔄 **Proxy Middleware** with Next.js 16 proxy convention
- ⚡ **Performance Optimizations** with instrumentation and monitoring
- 📊 **Third-party libraries** optimized for performance
- 🎭 **Smooth page transitions** with Motion (successor to framer-motion)

## Usage

```bash
npx @geobasinas/create-geo-app <project-name>
```

## What's Included

- **Next.js 16** with TypeScript, Tailwind CSS, and Biome
- **Turbopack** enabled for faster development
- **App Router** structure with src directory
- **shadcn/ui** with all available components
- **Dark mode support** with next-themes and theme toggle
- **MDX Documentation System** with:
  - Auto-linked headings with `rehype-slug` and `rehype-autolink-headings`
  - Beautiful typography with `@tailwindcss/typography`
  - Syntax-highlighted code blocks with copy button
  - Dynamic docs routing at `/docs/[...slug]`
  - Sample documentation (Introduction, Installation, Quick Start, Configuration)
  - Responsive sidebar with navigation
  - `mdx-components.tsx` for custom MDX components
- **Header component** with navigation menu (including Docs link)
- **Footer component** with links
- **Essential pages**: About, Contact, Privacy, Terms
- **Essential Next.js pages**: 404, Error, Loading, Sitemap, Robots
- **Performance optimizations**: Webpack memory, package imports, image optimization
- **Performance monitoring**: Navigation timing and instrumentation
- **Suspense wrappers**: Professional loading states with skeleton components
- **Page transitions**: Smooth animations with Motion library
- **CSS variables** for theming
- **Import alias** configured as `@/*`
- **Proxy Middleware** with examples for common use cases
- **Environment variables** pre-configured

## Essential Next.js Pages Included

Your generated app now includes all essential Next.js pages for a production-ready application:

- **`app/not-found.tsx`** - Custom 404 page with shadcn/ui styling
- **`app/error.tsx`** - Global error boundary with retry functionality
- **`app/loading.tsx`** - Loading states with skeleton components
- **`app/sitemap.ts`** - SEO-optimized sitemap generation
- **`app/robots.ts`** - Search engine configuration

These pages provide:
- Better user experience for broken links and errors
- Professional loading states
- SEO optimization out of the box
- Production-ready error handling

## Next.js 16 Features

- ⚡ **Turbopack**: Next-generation bundler for faster builds
- 🔧 **Biome**: Unified toolchain for linting and formatting
- 🎯 **Improved Performance**: Enhanced React 19 support
- 📱 **Better DX**: Enhanced developer experience
- 🔄 **Proxy Middleware**: New middleware convention replacing old middleware

## Proxy Middleware (Next.js 16)

Your generated app includes a `proxy.ts` file that implements the new Next.js 16 proxy middleware convention. This replaces the old `middleware` naming and provides enhanced functionality.

### What's Included:

- **Basic Proxy**: Redirects `/old-path` to `/new-path`
- **Custom Headers**: Adds `x-custom-header` to all responses
- **Smart Matcher**: Configures which paths the proxy runs on

### Available Examples:

1. **Authentication Proxy** (`examples/proxy-auth.ts`)
   - Protects routes based on session cookies
   - Redirects unauthenticated users to login

2. **Internationalization Proxy** (`examples/proxy-i18n.ts`)
   - Detects user locale from headers/cookies
   - Redirects to localized URLs

3. **A/B Testing Proxy** (`examples/proxy-ab-testing.ts`)
   - Assigns users to test variants
   - Rewrites URLs for different experiences

4. **Rate Limiting Proxy** (`examples/proxy-rate-limit.ts`)
   - Implements API rate limiting
   - Protects against abuse

### Key Changes from Middleware:

- File name: `middleware.ts` → `proxy.ts`
- Function name: `middleware()` → `proxy()`
- Enhanced TypeScript support
- Better runtime configuration

## MDX Documentation System

Your generated app includes a fully functional MDX documentation system at `/docs`:

### Features

- **MDX Support**: Write documentation using Markdown with React components via `@next/mdx`
- **Auto-linked Headings**: All headings get anchor links with `rehype-slug` and `rehype-autolink-headings`
- **Beautiful Typography**: Styled with `@tailwindcss/typography` for professional prose
- **Code Blocks**: Syntax-highlighted code blocks with copy-to-clipboard button
- **Dark Mode**: Full dark mode support for all documentation
- **Responsive Sidebar**: Collapsible navigation sidebar with active link highlighting
- **Custom Components**: Global `mdx-components.tsx` for consistent styling

### Structure

```
your-app/
├── content/
│   └── docs/
│       ├── introduction.mdx
│       ├── installation.mdx
│       ├── quick-start.mdx
│       └── configuration.mdx
├── app/
│   └── docs/
│       ├── layout.tsx          # Docs layout with sidebar
│       └── [...slug]/
│           └── page.tsx         # Dynamic docs route
├── components/
│   ├── docs-sidebar.tsx         # Navigation sidebar
│   └── copy-button.tsx          # Code copy button
└── mdx-components.tsx           # Global MDX components
```

### Adding New Docs

1. Create a new `.mdx` file in `content/docs/`
2. Add the route to `docsMap` in `app/docs/[...slug]/page.tsx`
3. Add a link in `components/docs-sidebar.tsx`
4. Update `generateStaticParams` in the docs page

### Sample Documentation

The system comes with 4 sample documentation pages:

- **Introduction**: Overview and features
- **Installation**: Setup instructions
- **Quick Start**: Getting started guide
- **Configuration**: Configuration options

## Example

```bash
npx @geobasinas/create-geo-app my-awesome-app
```

This will create a fully configured Next.js 16 application ready for development!

## Performance Optimizations

Your generated app includes comprehensive performance optimizations:

- **Webpack Memory Optimizations**: Reduced memory usage during builds
- **Package Import Optimization**: Tree-shaking for lucide-react and Radix UI
- **Image Optimization**: Remote patterns and SVG handling with security
- **Performance Monitoring**: Navigation timing and instrumentation
- **Suspense Boundaries**: Professional loading states with skeleton components
- **Third-party Libraries**: Optimized @next/third-parties integration
- **Page Transitions**: Smooth animations with Motion library (successor to framer-motion)
- **Security**: Content Security Policy for images

### Page Loading Improvements

- **Template Transitions**: Smooth page-to-page animations using Motion
- **Navigation Timing**: Performance monitoring for route changes
- **Suspense Wrappers**: Better loading states with skeleton components
- **Instrumentation**: Automatic performance tracking

### Security Features

- **Image CSP**: Content Security Policy for SVG images
- **Strict Domains**: Only allow images from trusted sources
- **Attachment Downloads**: Force download for SVG files
- **Sandbox Policy**: Restricted execution environment