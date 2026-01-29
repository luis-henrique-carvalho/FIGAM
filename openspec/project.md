# Project Context

## Purpose

**FIGAM** (Fundação Iraci Gama de Cultura) is a cultural foundation website dedicated to promoting art, culture, and social development in Alagoinhas, Bahia, Brazil.

### Key Objectives
- Showcase the foundation's mission, values, and community impact
- Provide transparency through accountability reports and public documents
- Share news, updates, and stories with the community
- Manage and display a calendar of cultural events and activities
- Facilitate contact and engagement with visitors
- Present information about facilities and equipment available to the community

### Organization Details
- **Location:** Rua 15 de Novembro, Centro, Alagoinhas - BA, 48.050-010
- **Contact:** iracigamafundacao@gmail.com
- **Focus Areas:** Cultural programs, arts, music, performance, community initiatives, and education

## Tech Stack

### Core Framework & Runtime
- **Next.js 14.2.35** (App Router pattern with React Server Components)
- **React 18** (Server Components by default)
- **TypeScript 5** (strict mode enabled)
- **Node.js** runtime
- **pnpm 10.14.0** (package manager)

### CMS & Content Management
- **Prismic CMS** (headless CMS, repository: `figam1`)
  - `@prismicio/client` v7.3.1
  - `@prismicio/next` v1.5.0
  - `@prismicio/react` v2.7.3
  - `slice-machine-ui` v0.3.34
- **Slice Machine** for component-based content modeling

### UI & Styling
- **Tailwind CSS v3.3.6** with custom theme
  - Custom colors: `green-main`, `green-opacity`, `purple-main`, `red-main`
  - Plugins: `tailwind-scrollbar`, `tailwind-scrollbar-hide`
- **NextUI v2.2.9** (React UI component library)
- **Framer Motion v10.16.14** (animations)
- **React Icons v4.12.0**
- **Google Fonts:** Inter, Noto Serif (via `next/font`)

### Analytics & Monitoring
- **Vercel Analytics v1.6.1**

### Configuration Files
- `next.config.js` - Image optimization disabled (uses Prismic CDN)
- `tailwind.config.ts` - Custom theme configuration
- `tsconfig.json` - Path aliases (`@/*` → `./src/*`)
- `slicemachine.config.json` - Prismic Slice Machine setup

## Project Conventions

### Code Style

#### TypeScript
- **Strict mode enabled** in all TypeScript files
- Path aliases: `@/*` maps to `./src/*`
- Auto-generated Prismic types in `prismicio-types.d.ts`
- All components must be typed with proper interfaces

#### Naming Conventions
- **Files:** PascalCase for components (`HeaderHome.tsx`, `EventCard.tsx`)
- **Folders:** kebab-case for routes (`(pages)/`, `post/[id]/`)
- **Components:** PascalCase
- **Functions/Variables:** camelCase
- **CSS Classes:** Tailwind utilities + custom classes in `globals.css`

#### Formatting
- ESLint with Next.js configuration
- Consistent import ordering (React, Next.js, libraries, local components)
- Prettier-compatible formatting

### Architecture Patterns

#### Next.js App Router Structure
```
src/app/
├── layout.tsx                 # Root layout (NavBar, Footer, providers)
├── page.tsx                   # Home page (Server Component)
├── providers.tsx              # Client wrapper for NextUI
├── (pages)/                   # Route group for content pages
│   ├── about/                 # Static about page
│   ├── news/                  # News listing with pagination
│   │   └── post/[id]/        # Dynamic post detail pages
│   ├── calendar/              # Events calendar with pagination
│   │   └── [id]/             # Dynamic event detail pages
│   ├── accountability/        # Accountability listing with pagination
│   │   └── item/[id]/        # Dynamic accountability detail
│   ├── contact/               # Contact page
│   ├── equipament/[id]/       # Dynamic equipment pages
│   └── projects/              # Projects page (under construction)
├── api/                       # API routes
│   ├── preview/              # Prismic preview mode
│   ├── exit-preview/         # Exit preview
│   └── revalidate/           # Webhook for cache revalidation
└── components/                # Page-specific components
```

#### Component Organization
- **`src/components/`** - Reusable UI components (NavBar, Footer, Cards, etc.)
- **`src/slices/`** - Prismic Slice components (dynamically imported)
- **`src/app/components/`** - Page-specific components
- **`src/helpers/`** - Utility functions (e.g., `formatDate.ts`)

#### Prismic CMS Integration

**Route Resolver Pattern** (`src/prismicio.ts`):
- Maps Prismic document types to Next.js routes
- Example: `{ type: 'post', path: '/news/post/:uid' }`

**Content Fetching:**
- Server-side data fetching using `createClient()` from `@prismicio`
- Methods: `getByUID()`, `getSingle()`, `getAllByType()`, `getFirst()`
- **Caching:** Production uses `force-cache`, development uses `{next: {revalidate: 5}}`
- Cache tags: `prismic:documents` for webhook-based revalidation

**Slice Zone Pattern:**
- Content pages use `<SliceZone>` to render dynamic content blocks
- Slices registered in `src/slices/index.ts` with dynamic imports
- Each slice is a standalone React component with its own folder structure

#### Data Patterns
- **Pagination:** 9 items per page on News, Calendar, Accountability
- **Static Generation:** `generateStaticParams()` for dynamic routes
- **Metadata Generation:** `generateMetadata()` for SEO on all pages
- **Type Safety:** Auto-generated TypeScript types from Prismic models

#### Component Patterns
- **Server Components by default** (RSC pattern for performance)
- Client Components marked with `'use client'` directive (e.g., `providers.tsx`, `NavBarComponent.tsx`)
- Functional components with typed props
- Custom wrappers: `CustomImage`, `CustomImageScroll` for optimized images

#### Image Handling
- Next.js Image component with `<PrismicNextImage>`
- Images served directly from Prismic CDN (`images.prismic.io`)
- Image optimization disabled in `next.config.js` (relies on Prismic CDN)

### Testing Strategy

Currently, the project does not have an automated testing suite. Future considerations:
- Unit tests for utility functions (e.g., `formatDate`)
- Component tests for Slices
- E2E tests for critical user journeys (contact form, event calendar)
- Visual regression testing for Prismic content changes

### Git Workflow

#### Branch Naming
- Pattern: `feature/[descriptive-name]`
- Example: `feature/add-visit-page`
- Default branch: `main`

#### Development Workflow
Follows a **3-phase workflow** (as per `AGENTS.md`):

1. **Content Modeler Phase:** Define Custom Types and Slices in Prismic
2. **Slice Developer Phase:** Create React components for Slices
3. **Core Engineer Phase:** Integrate with Next.js, implement routing and SEO

#### OpenSpec Integration
- **Proposal-driven development** for new features and breaking changes
- Specs stored in `openspec/specs/`
- Active changes tracked in `openspec/changes/`
- Archived changes moved to `openspec/changes/archive/`

#### Environment
- Repository: `luis-henrique-carvalho/FIGAM`
- Hosting: Vercel (inferred from analytics integration)

## Domain Context

### Content Architecture

**Single Types** (non-repeatable):
- **`home`** - Homepage content (hero section, about, core values)
- **`about`** - About page with mission, vision, photo gallery
- **`news`** - News listing page configuration
- **`calendar`** - Events calendar page configuration
- **`contact`** - Contact page with form and embedded map
- **`accountability`** - Transparency/accountability page configuration

**Repeatable Types**:
- **`post`** - Individual news articles (title, cover image, content, author info, publication date)
- **`events_card`** - Individual events (title, event date, image, description, details)
- **`accountability_card`** - Accountability documents (type, text, PDF attachments, publication date)
- **`equipment`** - Equipment/facility information (title, description, images)
- **`slideimage`** - Image slides for galleries and carousels

### Shared Slices
- **`About1`** - About section component
- **`ContactCard`** - Contact information cards
- **`Document`** - Document display component
- **`EventCard`** - Event card grid component
- **`ImageSlide`** - Image carousel/slider
- **`AccountCardsZone`** - Accountability cards zone (exists in structure)

### Business Domain Focus

FIGAM operates in the cultural and social development sector with focus on:

- **Cultural Programs** - Arts exhibitions, music performances, theater
- **Social Development** - Community initiatives and educational programs
- **Transparency** - Public accountability reports and financial documents
- **Events** - Community gatherings, workshops, cultural celebrations
- **News & Updates** - Impact stories, announcements, community highlights
- **Education** - Educational programs and facility access

### User Journeys

1. **Discover:** Home page → About page → Browse news/events
2. **Engage:** Events calendar → Event details → Contact form
3. **Transparency:** Accountability page → View/download reports
4. **Stay Informed:** News listing → Read articles → Share on social media

### Content Localization
- **Language:** Portuguese (Brazil) - `pt-BR`
- Date formatting uses Brazilian format via `formatDate` helper
- All content and UI text in Portuguese

## Important Constraints

### Performance
- Image optimization relies entirely on Prismic CDN
- Static generation preferred for dynamic routes when possible
- Cache strategy: `force-cache` in production, 5-second revalidation in development
- Webhook-based cache invalidation required for content updates

### Content Management
- All content must be managed through Prismic CMS
- Content structure changes require Slice Machine model updates
- New Slices must follow the 3-phase workflow (Model → Component → Integration)

### Deployment
- Deployment platform: Vercel
- Environment variables required:
  - `PRISMIC_REPOSITORY` (optional, defaults to `figam1`)
  - `PRISMIC_API_KEY` (API access token)
  - `PRISMIC_WEBHOOK_SECRET` (webhook validation)
  - `NODE_ENV` (production/development)

### SEO & Accessibility
- All pages must implement `generateMetadata()` function
- Meta title, description, and Open Graph images must come from Prismic
- Semantic HTML structure required
- Images must have proper alt text from Prismic fields

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-first responsive design
- NextUI components provide baseline accessibility

## External Dependencies

### Prismic CMS
- **Repository:** `figam1`
- **API Access:** Via `PRISMIC_API_KEY` environment variable
- **Webhooks:** Configured for cache revalidation via `/api/revalidate`
- **Preview Mode:** Enabled via `/api/preview` and `/api/exit-preview`
- **CDN:** `images.prismic.io` for all image hosting and optimization
- **Slice Machine:** Local development UI at `http://localhost:3000/slice-simulator`

### Google Services
- **Google Fonts API:** Inter and Noto Serif fonts loaded via `next/font`
- **Google Maps:** Embedded map on contact page for foundation location

### Vercel Platform
- **Analytics:** Integrated for visitor tracking and performance monitoring
- **Hosting:** Automatic deployments from Git repository
- **Edge Functions:** Used for preview mode and API routes
- **Environment Variables:** Managed through Vercel dashboard

### Development Tools
- **Slice Machine:** Local UI for Prismic content modeling
- **ESLint:** Code linting with Next.js configuration
- **PostCSS/Autoprefixer:** CSS processing pipeline
- **TypeScript Compiler:** Type checking and code generation
