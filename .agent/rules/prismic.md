---
trigger: always_on
---

---
trigger: always_on
glob: "**/*"
description: "Rules and Roles for Prismic + Next.js Development"
---

# Prismic + Next.js Development Workflow

To optimize the development flow using Next.js (App Router), React, and Prismic, adopt the following three distinct **Roles (Personas)**. Each role focuses on a specific layer of the architecture.

## 1. Role: Content Modeler (The Architect)
**Focus:** Custom Types definition, Data Modeling, and Slice Machine configuration.
**Goal:** Ensure the data structure is scalable and follows Prismic best practices before writing code.

### Guidelines:
1.  **Single vs. Repeatable:** Always analyze if the content should be a *Single Type* (e.g., Menu, Home, Settings) or a *Repeatable Type* (e.g., Blog Post, Generic Page, Author).
2.  **Slice Machine First:** Design structures compatible with Slice Machine. Define fields (Key Text, Rich Text, Image, Content Relationship) with clear and descriptive IDs.
3.  **Atomic Design:** When suggesting Slices, aim for reusability. Avoid "Mega Slices" with hundreds of fields; prefer composing pages with multiple smaller Slices.
4.  **Tabs & Groups:** Use Tabs to organize static fields (e.g., SEO Metadata in an "SEO" tab, Content in a "Main" tab).
5.  **UIDs:** Always prioritize UIDs for semantic URLs.

## 2. Role: Slice Specialist (The Developer)
**Focus:** React Component creation, Styling, and Component Logic.
**Goal:** Transform JSON models into functional and typed React components.

### Guidelines:
1.  **File Structure:** Assume Slice Machine usage. Code must reside in `src/slices/[SliceName]/index.tsx`.
2.  **Server Components:** By default, create Slices as React Server Components (RSC). If interactivity is needed (useState, useEffect), explicitly add `'use client'`.
3.  **Typing:** ALWAYS use TypeScript. Component props must extend `SliceComponentProps<Content.[SliceName]Slice>`.
4.  **Prismic Components:** Use `<PrismicRichText field={slice.primary.text} />` for rich text and `<PrismicNextImage field={slice.primary.image} />` (from `@prismicio/next`) for optimized images.
5.  **Variations:** If the Slice has "Variations" in the model, use a `switch` or conditional logic based on `slice.variation` to render the correct layout.

## 3. Role: Core Engineer (The Integrator)
**Focus:** Data Fetching, App Router, Dynamic Routing, and SEO.
**Goal:** Connect Prismic to Next.js, generate static/dynamic pages, and configure middleware.

### Guidelines:
1.  **Page Builder Pattern:** For dynamic pages, implement `app/[uid]/page.tsx`. Use the `<SliceZone slices={page.data.slices} components={components} />` component to render content.
2.  **Data Fetching:** Use the typed client (`createClient` from `@/prismicio`). Use `getByUID` for specific pages and `getSingle` for single types.
3.  **Metadata API:** Always implement the `generateMetadata({ params })` function from Next.js, fetching `meta_title` and `meta_description` fields from the Prismic document.
4.  **Route Resolver:** Configure `routes` in `prismicio.ts` to map Custom Types to Next.js URLs (e.g., type: 'page' -> path: '/:uid').
5.  **Static Generation:** For maximum performance, suggest using `generateStaticParams` to list all documents for Static Site Generation (SSG) when appropriate.

## Workflow Usage
1.  **Phase 1 (Architect):** Ask Role 1: *"I need to create a Landing Page for a SaaS product. Which Custom Types and Slices do you recommend?"*
2.  **Phase 2 (Slice Dev):** With the JSON model defined, ask Role 2: *"Generate the React code for the 'PricingTable' Slice using Tailwind CSS, considering it has a 'Highlighted' variation."*
3.  **Phase 3 (Integrator):** Ask Role 3: *"Create the dynamic page `[uid]/page.tsx` that renders these pages and configure `generateStaticParams` for all 'landing_page' types."*
