# Tasks: Add Visits Page

## Phase 1: Prismic Content Modeling

- [x] 1.1 Create `visits_page` single custom type in Prismic with fields: `visits_title`, `visits_subtitle`, `meta_title`, `meta_description`, `meta_image`, `slices`
- [x] 1.2 Create `visit_card` repeatable custom type in Prismic with fields: `visit_title`, `visit_date`, `visit_institution`, `visit_image`, `visit_description`, `visit_activities`, `visit_content`, `slices`
- [ ] 1.3 Create example visit card document in Prismic for testing/preview
- [ ] 1.4 Create Slice Machine components for visits content zones (e.g., VisitsHero, ActivitiesList)
- [ ] 1.5 Verify auto-generated TypeScript types in `prismicio-types.d.ts` include visits types
- [x] 1.6 Update Prismic route resolver in `src/prismicio.ts` to map `visit_card` to `/visits/[uid]` route

## Phase 2: Frontend Implementation - Listing Page

- [x] 2.1 Create `src/app/(pages)/visits/page.tsx` with server-side data fetching
- [x] 2.2 Implement pagination logic (9 items per page, consistent with calendar)
- [x] 2.3 Implement page title and subtitle rendering from `visits_page` config
- [x] 2.4 Create `generateMetadata()` function for SEO (title, description, OpenGraph)
- [x] 2.5 Render SliceZone from `visits_page` document for flexible content composition
- [x] 2.6 Create pagination controls (Previous, Next, page numbers) with styling
- [ ] 2.7 Test pagination with multiple pages of visits
- [x] 2.8 Verify responsive design (mobile, tablet, desktop)

## Phase 3: Frontend Implementation - Detail Page

- [x] 3.1 Create `src/app/(pages)/visits/[id]/page.tsx` with server-side data fetching
- [x] 3.2 Implement `generateStaticParams()` to generate static pages for all visits
- [x] 3.3 Implement hero header section with title, institution, date badge, and cover image
- [x] 3.4 Create custom rich text components for visit content rendering (headings, paragraphs, lists, links, images)
- [x] 3.5 Implement `generateMetadata()` function for visit detail pages (dynamic SEO)
- [x] 3.6 Render SliceZone from `visit_card` document for flexible detail page composition
- [x] 3.7 Implement 404 handling for non-existent visits
- [ ] 3.8 Test detail page with multiple visit records
- [x] 3.9 Verify responsive design and image rendering

## Phase 4: Styling & UX

- [ ] 4.1 Apply consistent styling with existing pages (calendar, news)
- [ ] 4.2 Ensure date formatting uses `formactDate` helper with DD/MM/YYYY format
- [ ] 4.3 Style institution name prominently in hero section
- [ ] 4.4 Create visit card component for listing with image, title, date, institution preview
- [ ] 4.5 Verify rich text content rendering with proper spacing and typography
- [ ] 4.6 Test images from Prismic CDN render correctly with alt text
- [ ] 4.7 Verify accessibility (semantic HTML, alt text, proper heading hierarchy)

## Phase 5: Integration & Navigation

- [x] 5.1 Update site navigation menu to include Visits link
- [x] 5.2 Update NavBarComponent to include Visits in both desktop and mobile menus
- [ ] 5.3 Create breadcrumb navigation for detail pages (if desired)
- [x] 5.4 Update `/visits/[id]` route in route resolver for Prismic preview mode
- [ ] 5.5 Test Prismic preview mode for draft visits
- [ ] 5.6 Verify all internal links work correctly

## Phase 6: Testing & Validation

- [ ] 6.1 Test with multiple visits (3+ records) in Prismic
- [ ] 6.2 Test pagination with exactly 9 and 18 items
- [ ] 6.3 Test with visits containing rich text, images, links, and complex formatting
- [ ] 6.4 Verify SEO metadata in page source and meta tags
- [ ] 6.5 Test OpenGraph preview on social media simulators
- [ ] 6.6 Verify 404 handling for invalid visit IDs
- [ ] 6.7 Test with slow network (DevTools throttling)
- [ ] 6.8 Verify date formatting across different visit dates
- [ ] 6.9 Test institution name display with various lengths and special characters
- [ ] 6.10 Run accessibility audit (Lighthouse, WAVE, etc.)

## Phase 7: Cache & Webhook Integration

- [ ] 7.1 Verify webhook-based cache revalidation triggers on visit document changes
- [ ] 7.2 Test incremental static regeneration (5-second revalidate in development)
- [ ] 7.3 Verify cache tags are properly set for visits pages
- [ ] 7.4 Test publishing changes to visits and verify they appear in production

## Phase 8: Documentation & Cleanup

- [ ] 8.1 Update project documentation if needed
- [ ] 8.2 Verify no console errors or warnings in browser
- [ ] 8.3 Remove any debug code or temporary test data
- [ ] 8.4 Final review of code style and consistency with project conventions
- [ ] 8.5 Confirm all requirements from spec.md are implemented
