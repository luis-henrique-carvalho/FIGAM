# Change: Add Visits Page

## Why

FIGAM needs to showcase institutional visits and community engagement activities. A dedicated visits page allows the foundation to document visit dates, institutions involved, activities performed, and detailed narratives about each visit. This increases transparency and celebrates community partnerships.

## What Changes

- **New Content Capability:** Create Prismic types for managing visits (single type `visits_page` and repeatable type `visit_card`)
- **New Pages:** Add listing page (`/visits`) and detail pages (`/visits/[id]`)
- **Content Slices:** Add Slice Machine components for visits content zones
- **Frontend Components:** Create React components to render visit listings and details
- **Routing Integration:** Register routes in Prismic route resolver and Next.js routing

## Impact

- **Affected specs:** Adds new capability `visits-management`
- **Affected code:**
  - Prismic Slice Machine (`slicemachine.config.json`, `/slices/` directory)
  - Next.js routes (`src/app/(pages)/visits/` directory)
  - Prismic client configuration (`src/prismicio.ts`)
  - Type definitions (`prismicio-types.d.ts` - auto-generated)
- **User-facing changes:** New navigation menu item for Visits
- **Content model changes:** New custom types in Prismic repository
