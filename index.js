#!/usr/bin/env node
import { execa } from 'execa';
import { writeFile, mkdir } from 'fs/promises';
import { dirname, join } from 'path';

async function main() {
  const projectName = process.argv[2];

  // Show help if --help flag is provided
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log('Usage: create-geo-app <project-name>');
    console.log('\nDescription:');
    console.log('  Creates a Next.js 16 app with shadcn/ui pre-configured');
    console.log('\nExample:');
    console.log('  create-geo-app my-app');
    console.log('\nFeatures:');
    console.log('  - Next.js 16 with TypeScript');
    console.log('  - Turbopack for faster development');
    console.log('  - Biome for linting and formatting');
    console.log('  - shadcn/ui with all components');
    console.log('  - Tailwind CSS and App Router');
    console.log('  - Dark mode support with next-themes');
    process.exit(0);
  }

  if (!projectName) {
    console.error('Please provide a project name:');
    console.error('create-geo-app <project-name>');
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
      '--css-variables',  // Use CSS variables for theming
      '--base-color', 'neutral'
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

    // Install next-themes for dark mode support
    console.log('\n🌙 Installing dark mode support...');
    await execa('npm', ['install', 'next-themes'], { stdio: 'inherit' });

    // Install third-party libraries for performance
    console.log('\n📦 Installing optimized third-party libraries...');
    await execa('npm', ['install', '@next/third-parties@latest', 'sharp'], { stdio: 'inherit' });

    // Install MDX and documentation dependencies
    console.log('\n📚 Installing MDX and documentation dependencies...');
    await execa('npm', ['install', '@next/mdx', '@mdx-js/loader', '@mdx-js/react', '@types/mdx', 'rehype-slug', 'rehype-autolink-headings', '@tailwindcss/typography'], { stdio: 'inherit' });

    // Create theme provider component
    console.log('\n🎨 Setting up theme provider...');
    await createThemeProvider();

    // Update root layout to include theme provider
    console.log('\n📝 Updating root layout...');
    await updateRootLayout();

    // Create mode toggle component
    console.log('\n🔧 Creating mode toggle component...');
    await createModeToggle();

    // Create mobile menu component
    console.log('\n📱 Creating mobile menu component...');
    await createMobileMenu();

    // Create header component
    console.log('\n📋 Creating header component...');
    await createHeaderComponent();

    // Create footer component
    console.log('\n📋 Creating footer component...');
    await createFooterComponent();

    // Create hover prefetch link component
    console.log('\n🔗 Creating hover prefetch link component...');
    await createHoverPrefetchLink();

    // Create environment variables with project name
    console.log('\n🔧 Setting up environment variables...');
    await createEnvFile(projectName);

    // Create about and contact pages
    console.log('\n📄 Creating additional pages...');
    await createAboutPage();
    await createContactPage();
    await createPrivacyPage();
    await createTermsPage();
    await createGetStartedPage();

    // Create essential Next.js pages
    console.log('\n📄 Creating essential Next.js pages...');
    await createNotFoundPage();
    await createErrorPage();
    await createLoadingPage();
    await createSitemap();
    await createRobots();

    // Create performance optimizations
    console.log('\n⚡ Setting up performance optimizations...');
    await createOptimizedNextConfig();
    await createInstrumentation();
    await createSuspenseWrapper();
    
    // Create render optimization components
    console.log('\n⚡ Creating render optimization components...');
    await createStreamingLayout();
    await createOptimizedFonts();

    // Update the main page to have a simple hello message
    console.log('\n📄 Updating main page...');
    await updateMainPage();

    // Create proxy middleware file for Next.js 16
    console.log('\n🔧 Setting up proxy middleware...');
    await createProxyMiddleware();

    // Create documentation system
    console.log('\n📚 Setting up documentation system...');
    await createMdxComponents();
    await createDocsSidebar();
    await createDocsLayout();
    await createDocsPage();
    await createSampleDocs();
    await updateNextConfigForMdx();
    await updateTailwindConfigForTypography();
    await updateHeaderWithDocsLink();

    console.log('\n✅ Setup complete! To start developing:');
    console.log(`📁 cd ${projectName}`);
    console.log('🚀 npm run dev');
    console.log('\n✨ Your Next.js 16 app with shadcn/ui and dark mode is ready!');

  } catch (error) {
    console.error('\n❌ Error during setup:', error.message);
    console.error('Please check your internet connection and try again.');
    process.exit(1);
  }
}

async function createThemeProvider() {
  const themeProviderContent = `"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
`;

  const componentsDir = 'components';
  await mkdir(componentsDir, { recursive: true });
  await writeFile(join(componentsDir, 'theme-provider.tsx'), themeProviderContent);
}

async function updateRootLayout() {
  const layoutPath = 'app/layout.tsx';
  let layoutContent = await readFile(layoutPath, 'utf-8');
  
  // Import fonts, ThemeProvider, Header, and Footer
  if (!layoutContent.includes('from "@/components/theme-provider"')) {
    layoutContent = layoutContent.replace(
      /import ".\/globals.css";/,
      `import "./globals.css";\nimport { inter } from "@/lib/fonts";\nimport { ThemeProvider } from "@/components/theme-provider";\nimport { Header } from "@/components/header";\nimport { Footer } from "@/components/footer";`
    );
  }

  // Wrap body content with ThemeProvider and add Header and Footer with flex layout
  if (!layoutContent.includes('<ThemeProvider')) {
    layoutContent = layoutContent.replace(
      /<body[^>]*>([\s\S]*?)<\/body>/,
      (match, bodyContent) => {
        return match.replace(
          bodyContent,
          `\n          <ThemeProvider\n            attribute=\"class\"\n            defaultTheme=\"system\"\n            enableSystem\n            disableTransitionOnChange\n          >\n            <div className=\"min-h-screen flex flex-col\">\n              <Header />\n              <main className=\"flex-1 bg-white dark:bg-black\">\n                ${bodyContent.trim()}\n              </main>\n              <Footer />\n            </div>\n          </ThemeProvider>`
        );
      }
    );
  }

  // Add optimized font class and suppressHydrationWarning to html tag
  if (!layoutContent.includes('suppressHydrationWarning')) {
    layoutContent = layoutContent.replace(
      /<html[^>]*>/,
      `<html lang=\"en\" suppressHydrationWarning className={\`\${inter.variable} antialiased\`}>`
    );
  }

  await writeFile(layoutPath, layoutContent);
}

async function createModeToggle() {
  const modeToggleContent = `"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant=\"outline\" size=\"icon\">
          <Sun className=\"h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90\" />
          <Moon className=\"absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0\" />
          <span className=\"sr-only\">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align=\"end\">
        <DropdownMenuItem onClick={() => setTheme(\"light\")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(\"dark\")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme(\"system\")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
`;

  const componentsDir = 'components';
  await writeFile(join(componentsDir, 'mode-toggle.tsx'), modeToggleContent);
}

async function createMobileMenu() {
  const mobileMenuContent = `"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"

export function MobileMenu() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setOpen(false)}
          />
          <nav className="fixed top-0 right-0 h-full w-64 bg-white dark:bg-black border-l border-neutral-200 dark:border-neutral-800 p-6 z-50 flex flex-col gap-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <Link
              href="/"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/docs/introduction"
              onClick={() => setOpen(false)}
            >
              Docs
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/get-started"
              onClick={() => setOpen(false)}
            >
              Get Started
            </Link>

            <div className="mt-auto pt-6 border-t border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center justify-between">
                <span className="text-sm">Theme</span>
                <ModeToggle />
              </div>
            </div>
          </nav>
        </>
      )}
    </div>
  )
}
`;

  const componentsDir = 'components';
  await mkdir(componentsDir, { recursive: true });
  await writeFile(join(componentsDir, 'mobile-menu.tsx'), mobileMenuContent);
}

async function createHeaderComponent() {
  const headerContent = `"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { HoverPrefetchLink } from "@/components/hover-prefetch-link"
import { MobileMenu } from "@/components/mobile-menu"

export function Header() {
  return (
    <header className="bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-black dark:text-white hover:opacity-80 transition-opacity">
          {process.env.NEXT_PUBLIC_APP_NAME || "Geo App"}
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <HoverPrefetchLink href="/">
            <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
              Home
            </span>
          </HoverPrefetchLink>
          <HoverPrefetchLink href="/about">
            <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
              About
            </span>
          </HoverPrefetchLink>
          <HoverPrefetchLink href="/contact">
            <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
              Contact
            </span>
          </HoverPrefetchLink>
          <Button asChild variant="outline" className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">
            <HoverPrefetchLink href="/get-started">
              Get Started
            </HoverPrefetchLink>
          </Button>
          <ModeToggle />
        </nav>

        {/* Mobile Navigation */}
        <MobileMenu />
      </div>
    </header>
  )
}
`;

  const componentsDir = 'components';
  await mkdir(componentsDir, { recursive: true });
  await writeFile(join(componentsDir, 'header.tsx'), headerContent);
}

async function createFooterComponent() {
  const footerContent = `"use client"

import * as React from "react"
import { HoverPrefetchLink } from "@/components/hover-prefetch-link"

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black border-t border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-black dark:text-white">
              {process.env.NEXT_PUBLIC_APP_NAME || "Geo App"}
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 text-sm mt-1">
              &copy; {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          <nav className="flex space-x-6">
            <HoverPrefetchLink href="/about">
              <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm">
                About
              </span>
            </HoverPrefetchLink>
            <HoverPrefetchLink href="/contact">
              <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm">
                Contact
              </span>
            </HoverPrefetchLink>
            <HoverPrefetchLink href="/privacy">
              <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm">
                Privacy
              </span>
            </HoverPrefetchLink>
            <HoverPrefetchLink href="/terms">
              <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-sm">
                Terms
              </span>
            </HoverPrefetchLink>
          </nav>
        </div>
      </div>
    </footer>
  )
}
`;

  const componentsDir = 'components';
  await mkdir(componentsDir, { recursive: true });
  await writeFile(join(componentsDir, 'footer.tsx'), footerContent);
}

async function createHoverPrefetchLink() {
  const hoverPrefetchLinkContent = `"use client"

import Link from "next/link"
import { useState } from "react"

export function HoverPrefetchLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const [prefetch, setPrefetch] = useState(false)

  return (
    <Link
      href={href}
      prefetch={prefetch}
      onMouseEnter={() => setPrefetch(true)}
    >
      {children}
    </Link>
  )
}
`;

  const componentsDir = 'components';
  await mkdir(componentsDir, { recursive: true });
  await writeFile(join(componentsDir, 'hover-prefetch-link.tsx'), hoverPrefetchLinkContent);
}

async function createEnvFile(projectName) {
  const envContent = `NEXT_PUBLIC_APP_NAME=${projectName}
NEXT_PUBLIC_APP_DESCRIPTION="A Next.js 16 app with shadcn/ui pre-configured"
NEXT_PUBLIC_APP_AUTHOR="Your Name"
NEXT_PUBLIC_APP_VERSION="1.0.0"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_EMAIL="your.email@example.com"
NEXT_PUBLIC_APP_PHONE="123-456-7890"
NEXT_PUBLIC_APP_ADDRESS="123 Main St, Anytown, USA"
NEXT_PUBLIC_APP_GITHUB="your_github_handle"
NEXT_PUBLIC_APP_LINKEDIN="your_linkedin_handle"
`;

  const envPath = '.env';
  await writeFile(envPath, envContent);
}

async function createAboutPage() {
  const aboutContent = `import Link from "next/link"

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold text-left mb-6 text-black dark:text-white">About Us</h1>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <div className="text-left mt-12">
        <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-lg">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
`;

  const pagesDir = 'app/about';
  await mkdir(pagesDir, { recursive: true });
  await writeFile(join(pagesDir, 'page.tsx'), aboutContent);
}

async function createContactPage() {
  const contactContent = `"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function Contact() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    alert('Thank you for your message! We will get back to you soon.')
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold text-left mb-6 text-black dark:text-white">Contact Us</h1>
      <p className="text-lg text-left mb-12 text-neutral-600 dark:text-neutral-400">
        Have questions or feedback? We would love to hear from you.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-lg text-black dark:text-white">Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            className="text-lg bg-white dark:bg-black border-neutral-200 dark:border-neutral-700 text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500"
            required
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="email" className="text-lg text-black dark:text-white">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className="text-lg bg-white dark:bg-black border-neutral-200 dark:border-neutral-700 text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500"
            required
          />
        </div>
        
        <div className="space-y-3">
          <Label htmlFor="message" className="text-lg text-black dark:text-white">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message..."
            rows={6}
            className="text-lg bg-white dark:bg-black border-neutral-200 dark:border-neutral-700 text-black dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500"
            required
          />
        </div>
        
        <Button type="submit" className="w-full text-lg">
          Send Message
        </Button>
      </form>
      
      <div className="text-left mt-12">
        <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-lg">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
`;

  const pagesDir = 'app/contact';
  await mkdir(pagesDir, { recursive: true });
  await writeFile(join(pagesDir, 'page.tsx'), contactContent);
}

async function createPrivacyPage() {
  const privacyContent = `import Link from "next/link"

export default function Privacy() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold text-left mb-6 text-black dark:text-white">Privacy Policy</h1>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from our website.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        We do not collect any personal information from you unless you voluntarily submit it to us.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        We use your email address to send you updates about our products and services, and to respond to your inquiries.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        We do not share your personal information with third parties.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        If you have any questions about this Privacy Policy, please contact us.
      </p>
      <div className="text-left mt-12">
        <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-lg">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
`;

  const pagesDir = 'app/privacy';
  await mkdir(pagesDir, { recursive: true });
  await writeFile(join(pagesDir, 'page.tsx'), privacyContent);
}

async function createTermsPage() {
  const termsContent = `import Link from "next/link"

export default function Terms() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold text-left mb-6 text-black dark:text-white">Terms of Service</h1>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        These Terms of Service govern your access to and use of our website, including our products and services.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of the Terms, you may not access the website.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will provide at least 30 days&apos; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        By continuing to access or use our website after any revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new terms, you are no longer authorized to use the website.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        We may, in our sole discretion, post new terms on the website. Your continued use of the website after such terms are posted will be subject to the new terms.
      </p>
      <p className="text-lg text-left mb-2 text-black dark:text-white">
        If you have any questions about these Terms, please contact us.
      </p>
      <div className="text-left mt-12">
        <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-lg">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
`;

  const pagesDir = 'app/terms';
  await mkdir(pagesDir, { recursive: true });
  await writeFile(join(pagesDir, 'page.tsx'), termsContent);
}

async function createGetStartedPage() {
  const getStartedContent = `import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Zap, Code, Palette } from "lucide-react"

export default function GetStarted() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-black dark:text-white">
          Get Started
        </h1>
        <p className="text-xl text-neutral-600 dark:text-neutral-400">
          Everything you need to know to start building with our platform
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <Card>
          <CardHeader>
            <Zap className="h-10 w-10 mb-2 text-yellow-500" />
            <CardTitle>Quick Setup</CardTitle>
            <CardDescription>
              Get up and running in minutes with our streamlined setup process
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Follow our step-by-step guide to configure your environment and start building.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Code className="h-10 w-10 mb-2 text-blue-500" />
            <CardTitle>Documentation</CardTitle>
            <CardDescription>
              Comprehensive guides and API references at your fingertips
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Explore detailed documentation covering every feature and functionality.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Palette className="h-10 w-10 mb-2 text-purple-500" />
            <CardTitle>Customize</CardTitle>
            <CardDescription>
              Tailor the platform to match your unique requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Personalize themes, components, and workflows to fit your needs.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="bg-neutral-50 dark:bg-neutral-900 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
          Quick Start Guide
        </h2>
        <ol className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
              1
            </span>
            <div>
              <h3 className="font-semibold text-black dark:text-white">Install Dependencies</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Run npm install to set up all required packages and dependencies.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
              2
            </span>
            <div>
              <h3 className="font-semibold text-black dark:text-white">Configure Environment</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Set up your environment variables in the .env file for local development.
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center font-bold">
              3
            </span>
            <div>
              <h3 className="font-semibold text-black dark:text-white">Start Development Server</h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Run npm run dev to start the development server and begin building.
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="text-center">
        <Button asChild size="lg">
          <Link href="/contact" className="gap-2">
            Need Help? Contact Us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="text-center mt-12">
        <Link href="/" className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors text-lg">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
`;

  const pagesDir = 'app/get-started';
  await mkdir(pagesDir, { recursive: true });
  await writeFile(join(pagesDir, 'page.tsx'), getStartedContent);
}

async function updateMainPage() {
  const mainPageContent = `export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-4xl font-bold text-left mb-6 text-black dark:text-white">
        Hello
      </h1>
      <p className="text-lg text-left text-neutral-600 dark:text-neutral-400">
        Welcome to your new Next.js app with shadcn/ui.
      </p>
    </div>
  )
}
`;

  const pagePath = 'app/page.tsx';
  await writeFile(pagePath, mainPageContent);
}

async function createProxyMiddleware() {
  const proxyContent = `import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Next.js 16 Proxy Middleware
 * 
 * This proxy function runs on the Node.js runtime and can be used to:
 * - Redirect requests
 * - Rewrite URLs
 * - Add/remove headers
 * - Handle authentication
 * - Implement A/B testing
 * - Internationalization routing
 * 
 * Note: This replaces the old 'middleware' convention in Next.js 16
 */

export function proxy(request: NextRequest) {
  // Example: Redirect /old-path to /new-path
  if (request.nextUrl.pathname === '/old-path') {
    return NextResponse.redirect(new URL('/new-path', request.url))
  }

  // Example: Add custom header to all requests
  const response = NextResponse.next()
  response.headers.set('x-custom-header', 'hello-world')

  return response
}

/**
 * Configuration for the proxy middleware
 * 
 * The matcher defines which paths this proxy should run on.
 * You can use:
 * - Single paths: '/about'
 * - Multiple paths: ['/about', '/dashboard']
 * - Dynamic paths: '/blog/:slug'
 * - Wildcard paths: '/api/*'
 * - Exclude patterns: '/((?!api|_next/static|_next/image|favicon.ico).*)'
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
`;

  const proxyPath = 'proxy.ts';
  await writeFile(proxyPath, proxyContent);
}

async function createNotFoundPage() {
  const notFoundContent = `import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <h1 className="text-6xl font-bold mb-4 text-black dark:text-white">404</h1>
      <h2 className="text-2xl font-semibold mb-6 text-neutral-600 dark:text-neutral-400">
        Page Not Found
      </h2>
      <p className="text-lg mb-8 text-neutral-600 dark:text-neutral-400">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  )
}
`;

  const appDir = 'app';
  await writeFile(join(appDir, 'not-found.tsx'), notFoundContent);
}

async function createErrorPage() {
  const errorContent = `"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
      <h1 className="text-4xl font-bold mb-4 text-black dark:text-white">
        Something went wrong!
      </h1>
      <p className="text-lg mb-8 text-neutral-600 dark:text-neutral-400">
        An unexpected error has occurred.
      </p>
      <Button onClick={reset}>Try Again</Button>
    </div>
  )
}
`;

  const appDir = 'app';
  await writeFile(join(appDir, 'error.tsx'), errorContent);
}

async function createLoadingPage() {
  const loadingContent = `import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Skeleton className="h-12 w-3/4 mb-6" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  )
}
`;

  const appDir = 'app';
  await writeFile(join(appDir, 'loading.tsx'), loadingContent);
}

async function createSitemap() {
  const sitemapContent = `import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourapp.com'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: \`\${baseUrl}/docs/introduction\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: \`\${baseUrl}/docs/installation\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: \`\${baseUrl}/docs/quick-start\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: \`\${baseUrl}/docs/configuration\`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: \`\${baseUrl}/about\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: \`\${baseUrl}/contact\`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: \`\${baseUrl}/privacy\`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: \`\${baseUrl}/terms\`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]
}
`;

  const appDir = 'app';
  await writeFile(join(appDir, 'sitemap.ts'), sitemapContent);
}

async function createRobots() {
  const robotsContent = `import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://yourapp.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: \`\${baseUrl}/sitemap.xml\`,
  }
}
`;

  const appDir = 'app';
  await writeFile(join(appDir, 'robots.ts'), robotsContent);
}

async function createOptimizedNextConfig() {
  const nextConfigContent = `import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Turbopack is enabled by default in Next.js 16
  turbopack: {
    // Turbopack already optimizes bundles automatically
    // No additional config needed for most cases
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*', 'next-themes'],
    // Faster server component rendering
    serverComponentsHmrCache: true,
  },
  
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  images: {
    formats: ['image/avif', 'image/webp'], // Use modern formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

export default nextConfig
`;

  await writeFile('next.config.ts', nextConfigContent);
}

async function createInstrumentation() {
  const instrumentationContent = `export function onRouterTransitionStart(url: string) {
  if (typeof performance !== 'undefined') {
    performance.mark(\`nav-start-\${url}\`)
  }
}

export function onRouterTransitionComplete(url: string) {
  if (typeof performance !== 'undefined') {
    performance.mark(\`nav-complete-\${url}\`)
    
    // Measure navigation performance
    const startMark = performance.getEntriesByName(\`nav-start-\${url}\`)[0]
    const completeMark = performance.getEntriesByName(\`nav-complete-\${url}\`)[0]
    
    if (startMark && completeMark) {
      const duration = completeMark.startTime - startMark.startTime
      console.log(\`Navigation to \${url} took \${duration.toFixed(2)}ms\`)
    }
  }
}
`;

  const instrumentationDir = 'app';
  await writeFile(join(instrumentationDir, 'instrumentation.ts'), instrumentationContent);
}

async function createSuspenseWrapper() {
  const suspenseWrapperContent = `"use client"

import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

export function SuspenseWrapper({ 
  children,
  fallback = <Skeleton className="h-64 w-full" />
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode
}) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

export function PageSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <Skeleton className="h-12 w-3/4 mb-6" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-full mb-4" />
      <Skeleton className="h-4 w-2/3 mb-8" />
      <Skeleton className="h-32 w-full" />
    </div>
  )
}
`;

  const componentsDir = 'components';
  await writeFile(join(componentsDir, 'suspense-wrapper.tsx'), suspenseWrapperContent);
}

async function createStreamingLayout() {
  const streamingLayoutContent = `import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Server Component - renders fast, no hydration needed
export function StreamingSection({ 
  children,
  fallback = <Skeleton className="h-32 w-full" />
}: { 
  children: React.ReactNode
  fallback?: React.ReactNode 
}) {
  return (
    <Suspense fallback={fallback}>
      {children}
    </Suspense>
  )
}

// Use this wrapper for slow data fetches
export function StreamingContent({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    }>
      {children}
    </Suspense>
  )
}
`;

  const componentsDir = 'components';
  await writeFile(join(componentsDir, 'streaming-layout.tsx'), streamingLayoutContent);
}

async function createOptimizedFonts() {
  const fontsContent = `import { Inter } from "next/font/google"

// Optimize font loading - prevents layout shift
export const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Use fallback font while loading
  preload: true,
  variable: "--font-inter",
  fallback: ["system-ui", "arial"],
})

// For headings - load only when needed
export const interTight = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  variable: "--font-inter-tight",
})
`;

  const libDir = 'lib';
  await mkdir(libDir, { recursive: true });
  await writeFile(join(libDir, 'fonts.ts'), fontsContent);
}

// Helper function to read files
async function readFile(path, encoding = 'utf-8') {
  const { readFile } = await import('fs/promises');
  return readFile(path, encoding);
}

async function createMdxComponents() {
  const mdxComponentsContent = `import type { MDXComponents } from 'mdx/types'
import { CopyButton } from '@/components/copy-button'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-6 mb-4">
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        {children}
      </p>
    ),
    ul: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li className="mt-2">
        {children}
      </li>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
    code: ({ children, ...props }) => {
      const isInline = !props.className
      
      if (isInline) {
        return (
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {children}
          </code>
        )
      }
      
      return (
        <div className="relative">
          <pre className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black p-4">
            <code className="relative rounded font-mono text-sm text-white" {...props}>
              {children}
            </code>
          </pre>
          <CopyButton text={String(children)} />
        </div>
      )
    },
    a: ({ href, children }) => (
      <a
        href={href}
        className="font-medium underline underline-offset-4 hover:text-primary"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </a>
    ),
    table: ({ children }) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
        {children}
      </td>
    ),
    ...components,
  }
}
`;

  await writeFile('mdx-components.tsx', mdxComponentsContent);
}

async function createCopyButton() {
  const copyButtonContent = `"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute right-4 top-4 h-6 w-6"
      onClick={copy}
    >
      {copied ? (
        <Check className="h-3 w-3" />
      ) : (
        <Copy className="h-3 w-3" />
      )}
      <span className="sr-only">Copy code</span>
    </Button>
  )
}
`;

  const componentsDir = 'components';
  await mkdir(componentsDir, { recursive: true });
  await writeFile(join(componentsDir, 'copy-button.tsx'), copyButtonContent);
}

async function createDocsSidebar() {
  const docsSidebarContent = `"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const docsNav = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
      { title: "Installation", href: "/docs/installation" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "Configuration", href: "/docs/configuration" },
    ],
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full md:w-64 md:flex-shrink-0">
      <div className="sticky top-20 -mt-10 h-[calc(100vh-3.5rem)] overflow-y-auto py-10">
        <nav className="space-y-6">
          {docsNav.map((section) => (
            <div key={section.title}>
              <h4 className="mb-2 font-semibold text-sm text-black dark:text-white">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block text-sm hover:text-black dark:hover:text-white transition-colors",
                        pathname === item.href
                          ? "text-black dark:text-white font-medium"
                          : "text-neutral-600 dark:text-neutral-400"
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  )
}
`;

  const componentsDir = 'components';
  await mkdir(componentsDir, { recursive: true });
  await writeFile(join(componentsDir, 'docs-sidebar.tsx'), docsSidebarContent);
}

async function createDocsLayout() {
  const docsLayoutContent = `import { DocsSidebar } from "@/components/docs-sidebar"

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row gap-10">
        <DocsSidebar />
        <main className="flex-1 min-w-0">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            {children}
          </article>
        </main>
      </div>
    </div>
  )
}
`;

  const docsDir = 'app/docs';
  await mkdir(docsDir, { recursive: true });
  await writeFile(join(docsDir, 'layout.tsx'), docsLayoutContent);
}

async function createDocsPage() {
  const docsPageContent = `import { notFound } from "next/navigation"

// Map of slugs to MDX imports
const docsMap: Record<string, () => Promise<any>> = {
  introduction: () => import("@/content/docs/introduction.mdx"),
  installation: () => import("@/content/docs/installation.mdx"),
  "quick-start": () => import("@/content/docs/quick-start.mdx"),
  configuration: () => import("@/content/docs/configuration.mdx"),
}

export default async function DocsPage({
  params,
}: {
  params: { slug?: string[] }
}) {
  const slug = params.slug?.[0] || "introduction"
  const docImport = docsMap[slug]

  if (!docImport) {
    notFound()
  }

  const { default: Content } = await docImport()

  return <Content />
}

export async function generateStaticParams() {
  return [
    { slug: ["introduction"] },
    { slug: ["installation"] },
    { slug: ["quick-start"] },
    { slug: ["configuration"] },
  ]
}
`;

  const docsDir = 'app/docs/[...slug]';
  await mkdir(docsDir, { recursive: true });
  await writeFile(join(docsDir, 'page.tsx'), docsPageContent);
}

async function createSampleDocs() {
  // Create copy button first
  await createCopyButton();

  const introContent = `# Introduction

Welcome to the documentation! This is a minimal documentation system built with MDX.

## Features

This documentation system includes:

- **MDX Support**: Write documentation using Markdown with React components
- **Auto-linked Headings**: All headings automatically get anchor links
- **Typography**: Beautiful typography with Tailwind's typography plugin
- **Code Blocks**: Syntax-highlighted code blocks with copy button
- **Dark Mode**: Automatic dark mode support

## Getting Started

Check out the [Installation](/docs/installation) guide to get started.

## Code Example

Here's a simple example:

\`\`\`typescript
const greeting = "Hello, World!"
console.log(greeting)
\`\`\`

You can copy the code above using the copy button in the top-right corner.

## Inline Code

You can also use \`inline code\` within paragraphs.

## Lists

### Unordered List

- First item
- Second item
- Third item

### Ordered List

1. First step
2. Second step
3. Third step

## Blockquote

> This is a blockquote. It can be used to highlight important information or quotes.

## Links

You can add [internal links](/docs/installation) or [external links](https://nextjs.org).
`;

  const installationContent = `# Installation

Learn how to install and set up your project.

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.0 or later
- npm or yarn package manager

## Install Dependencies

Run the following command to install all dependencies:

\`\`\`bash
npm install
\`\`\`

Or with yarn:

\`\`\`bash
yarn install
\`\`\`

## Environment Setup

Create a \`.env.local\` file in the root of your project:

\`\`\`bash
NEXT_PUBLIC_API_URL=http://localhost:3000
\`\`\`

## Start Development Server

Once everything is installed, start the development server:

\`\`\`bash
npm run dev
\`\`\`

Your app should now be running at [http://localhost:3000](http://localhost:3000).

## Next Steps

- Check out the [Quick Start](/docs/quick-start) guide
- Learn about [Configuration](/docs/configuration)
`;

  const quickStartContent = `# Quick Start

Get up and running quickly with this guide.

## Create Your First Page

1. Navigate to the \`app\` directory
2. Create a new file called \`page.tsx\`
3. Add the following code:

\`\`\`typescript
export default function Home() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  )
}
\`\`\`

## Add Styling

You can use Tailwind CSS classes for styling:

\`\`\`typescript
export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold">Hello, World!</h1>
      <p className="text-lg text-neutral-600 dark:text-neutral-400">
        Welcome to your new app!
      </p>
    </div>
  )
}
\`\`\`

## Use Components

Import and use UI components from shadcn/ui:

\`\`\`typescript
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">Hello, World!</h1>
      <Button>Click me</Button>
    </div>
  )
}
\`\`\`
`;

  const configurationContent = `# Configuration

Learn how to configure your application.

## Next.js Configuration

The \`next.config.ts\` file contains your Next.js configuration:

\`\`\`typescript
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Your configuration here
}

export default nextConfig
\`\`\`

## Tailwind Configuration

Customize your Tailwind configuration in \`tailwind.config.ts\`:

\`\`\`typescript
import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
\`\`\`

## Environment Variables

Add environment variables to your \`.env.local\` file:

\`\`\`bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.example.com

# Authentication
NEXT_PUBLIC_AUTH_DOMAIN=auth.example.com
\`\`\`

## TypeScript Configuration

The \`tsconfig.json\` file configures TypeScript:

\`\`\`json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "paths": {
      "@/*": ["./*"]
    }
  }
}
\`\`\`
`;

  const contentDocsDir = 'content/docs';
  await mkdir(contentDocsDir, { recursive: true });
  await writeFile(join(contentDocsDir, 'introduction.mdx'), introContent);
  await writeFile(join(contentDocsDir, 'installation.mdx'), installationContent);
  await writeFile(join(contentDocsDir, 'quick-start.mdx'), quickStartContent);
  await writeFile(join(contentDocsDir, 'configuration.mdx'), configurationContent);
}

async function updateNextConfigForMdx() {
  const nextConfigContent = `import type { NextConfig } from "next"
import createMDX from '@next/mdx'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const nextConfig: NextConfig = {
  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header
  
  // Configure MDX page extensions
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  
  // Turbopack is enabled by default in Next.js 16
  turbopack: {
    // Turbopack already optimizes bundles automatically
    // No additional config needed for most cases
  },
  
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-*', 'next-themes'],
    // Faster server component rendering
    serverComponentsHmrCache: true,
    mdxRs: true,
  },
  
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  images: {
    formats: ['image/avif', 'image/webp'], // Use modern formats
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vercel.app',
      },
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
    ],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
}

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'wrap',
          properties: {
            className: ['anchor'],
          },
        },
      ],
    ],
  },
})

export default withMDX(nextConfig)
`;

  await writeFile('next.config.ts', nextConfigContent);
}

async function updateTailwindConfigForTypography() {
  const tailwindConfigContent = `import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
}

export default config
`;

  await writeFile('tailwind.config.ts', tailwindConfigContent);
}

async function updateHeaderWithDocsLink() {
  const headerContent = `"use client"

import * as React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { HoverPrefetchLink } from "@/components/hover-prefetch-link"
import { MobileMenu } from "@/components/mobile-menu"

export function Header() {
  return (
    <header className="bg-white dark:bg-black border-b border-neutral-200 dark:border-neutral-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-semibold text-black dark:text-white hover:opacity-80 transition-opacity">
          {process.env.NEXT_PUBLIC_APP_NAME || "Geo App"}
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <HoverPrefetchLink href="/">
            <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
              Home
            </span>
          </HoverPrefetchLink>
          <HoverPrefetchLink href="/docs/introduction">
            <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
              Docs
            </span>
          </HoverPrefetchLink>
          <HoverPrefetchLink href="/about">
            <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
              About
            </span>
          </HoverPrefetchLink>
          <HoverPrefetchLink href="/contact">
            <span className="text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
              Contact
            </span>
          </HoverPrefetchLink>
          <Button asChild variant="outline" className="border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800">
            <HoverPrefetchLink href="/get-started">
              Get Started
            </HoverPrefetchLink>
          </Button>
          <ModeToggle />
        </nav>

        {/* Mobile Navigation */}
        <MobileMenu />
      </div>
    </header>
  )
}
`;

  const componentsDir = 'components';
  await mkdir(componentsDir, { recursive: true });
  await writeFile(join(componentsDir, 'header.tsx'), headerContent);
}

main();