# Design: Visits Page Implementation

## Context

FIGAM needs to document institutional visits and community engagement activities. The visits feature mirrors the existing calendar events structure but focuses on visit documentation with institutional attribution and activity logs.

### Stakeholders
- Content editors managing visit information
- Visitors discovering FIGAM's community partnerships
- Foundation leadership showcasing impact and transparency

### Constraints
- Must follow existing Next.js App Router patterns (server-side rendering, static generation)
- Content managed entirely through Prismic CMS
- Images served from Prismic CDN (no Next.js image optimization)
- Pagination: 9 items per page (consistent with calendar and news)
- Portuguese language (pt-BR)

## Goals

- **Primary:** Enable content editors to create, manage, and display visit information through Prismic
- **Secondary:** Provide visitors with detailed visit narratives and institutional context
- **Non-Goals:** Real-time visit scheduling, visitor RSVP system, integration with external calendars

## Decisions

### 1. Content Structure (Prismic Types)

**Single Type: `visits_page`**
- Manages the listing page configuration
- Fields:
  - `visits_title`: Rich text (page title)
  - `visits_subtitle`: Rich text (page subtitle/description)
  - `meta_title`: Text (SEO)
  - `meta_description`: Text (SEO)
  - `meta_image`: Image (for OpenGraph)
  - `slices`: Slice Zone (for flexible page composition)

**Repeatable Type: `visit_card`**
- Individual visit records
- Fields:
  - `visit_title`: Rich text (visit name/institution)
  - `visit_date`: Date (when the visit occurred)
  - `visit_institution`: Text (institution name, e.g., "Escola Municipal de Alagoinhas")
  - `visit_image`: Image (cover image)
  - `visit_description`: Rich text (short summary)
  - `visit_activities`: Rich text (detailed activities performed)
  - `visit_content`: Rich text (full narrative/details)
  - `slices`: Slice Zone (for flexible detail page composition)

**Rationale:** Mirrors the `calendar`/`events_card` pattern for consistency. Institution field specifically captures the visiting organization per user requirements.

### 2. Routing Architecture

```
/visits                    → Listing page (lists all visits with pagination)
/visits/[id]              → Detail page (full visit narrative and activities)
```

**Rationale:** Matches calendar structure, familiar to users navigating similar pages.

### 3. Pagination Strategy

- **Listing page:** 9 items per page (consistent with calendar and news)
- **Implementation:** Query parameter `?page=N` with static pagination controls
- **Rationale:** Avoids infinite scroll complexity, aligns with existing patterns

### 4. Display Layers

**Listing Page:**
1. Hero section (title + subtitle from `visits_page`)
2. Slice Zone for flexible content blocks
3. Visit card grid/list (fetched from `visit_card` type)
4. Pagination controls

**Detail Page:**
1. Hero header with:
   - Visit title and institution name
   - Visit date badge
   - Cover image
   - Short description
2. Main content:
   - Visit activities section
   - Full visit narrative (rich text)
   - Slice Zone for flexible composition
3. SEO metadata from visit card fields

**Rationale:** Blog-style layout mirrors event detail page, supports rich content narratives.

### 5. Static Generation & Caching

- **Listing page:** Dynamic with `revalidate: 5` in development, `force-cache` in production
- **Detail pages:** Static generation with `generateStaticParams()` for all visits
- **Rationale:** Scales to thousands of visits; webhook-driven cache invalidation keeps content fresh

### 6. Component Reuse

- Adapt existing `formactDate` helper for visit date formatting
- Follow existing `PrismicRichText` custom components for content rendering
- Share pagination logic from calendar page
- Rationale:** Reduces code duplication, maintains design consistency

## Alternatives Considered

| Approach | Rationale | Rejected |
|----------|-----------|----------|
| Combine visits into events_card | Simplifies CMS model but conflates events and visits semantically | Yes - needs institutional context |
| Graphql queries instead of REST | Prismic suggests REST pattern; project already uses REST | Yes - breaks consistency |
| Client-side pagination | Adds JavaScript, complicates SSR; server-side preferred per architecture | Yes - less performant |
| Multi-language support | Foundation operates in Portuguese only; no current demand | Yes - out of scope |

## Risks & Trade-offs

| Risk | Mitigation |
|------|-----------|
| **Content editor confusion:** New CMS model might confuse editors | Train on model similarity to events; clear field documentation |
| **Content duplication:** Editors may duplicate visit info in multiple slices | Create reusable slices; document content reuse patterns |
| **Image size impact:** Large visit images slow page load | Rely on Prismic CDN optimization; provide image guidelines |
| **Scaling to many visits:** Pagination becomes unwieldy with 500+ visits | Implement filtering/search if needed in future; start with simple pagination |

## Migration Plan

**Phase 1: Prismic Content Modeling**
- Create `visits_page` custom type
- Create `visit_card` custom type
- Create example slices for visit zones

**Phase 2: Frontend Development**
- Create listing page with pagination
- Create detail page with rich text rendering
- Integrate Prismic client for data fetching

**Phase 3: Navigation & Launch**
- Add visits to site navigation menu
- Update route resolver in `prismicio.ts`
- Deploy and test with live Prismic content

## Open Questions

1. **Should visits support search/filtering?** (e.g., by institution name, date range)
   - Decision: Start with basic pagination; add search in future iteration if needed
2. **Should visits have tags/categories?** (e.g., educational, cultural, sports)
   - Decision: Use slices for flexible categorization; formal tag field can be added later if needed
3. **Should there be a "Related Visits" section on detail pages?**
   - Decision: Keep scope minimal for first iteration; add in future if content volume justifies it
