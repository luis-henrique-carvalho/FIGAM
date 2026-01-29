## ADDED Requirements

### Requirement: Visit Card Repeatable Type
The system SHALL provide a `visit_card` repeatable custom type in Prismic for managing individual visit records with complete institutional and activity information.

**Definition:** A `visit_card` is a Prismic document that captures details about a single institutional visit to FIGAM, including visit date, institution name, activities performed, and detailed narrative content.

#### Scenario: Create a visit record
- **WHEN** a content editor creates a new `visit_card` document
- **THEN** the document SHALL contain:
  - `visit_title`: Rich text field for visit name/title
  - `visit_date`: Date field for visit occurrence date
  - `visit_institution`: Text field for institution name (e.g., "Escola Municipal de Alagoinhas")
  - `visit_image`: Image field for cover image with alt text
  - `visit_description`: Rich text field for short summary (shown in listings)
  - `visit_activities`: Rich text field for detailed activities performed
  - `visit_content`: Rich text field for full narrative and details
  - `slices`: Slice Zone for flexible content composition

#### Scenario: View visit in detail page
- **WHEN** visitor clicks on a visit in the listing
- **THEN** the system SHALL render:
  - Visit title, date, institution, and cover image
  - Visit activities and full narrative content
  - Properly formatted rich text with heading, paragraph, link, and list styles

### Requirement: Visits Page Single Type
The system SHALL provide a `visits_page` single custom type in Prismic for managing the visits listing page configuration and metadata.

**Definition:** `visits_page` is a unique document that controls the appearance and SEO of the visits listing page (`/visits`).

#### Scenario: Configure visits listing page
- **WHEN** a content editor edits the `visits_page` document
- **THEN** the document SHALL contain:
  - `visits_title`: Rich text field for page title
  - `visits_subtitle`: Rich text field for page subtitle/description
  - `meta_title`: Text field for SEO page title
  - `meta_description`: Text field for SEO meta description
  - `meta_image`: Image field for OpenGraph preview image
  - `slices`: Slice Zone for flexible content composition above visit listings

#### Scenario: SEO metadata generation
- **WHEN** visitor accesses `/visits` page
- **THEN** the page SHALL render with:
  - HTML title from `meta_title` or `visits_title`
  - Meta description from `meta_description` or `visits_subtitle`
  - OpenGraph image from `meta_image`
  - Proper Open Graph markup for social sharing

### Requirement: Visits Listing Page
The system SHALL provide a listing page at `/visits` that displays all published visit cards with pagination, filtering, and discovery capability.

**Definition:** The visits listing page is a server-rendered Next.js page that fetches visits from Prismic and presents them in an organized, paginated format.

#### Scenario: View all visits with pagination
- **WHEN** visitor accesses `/visits`
- **THEN** the system SHALL:
  - Display visits page title and subtitle from `visits_page` document
  - Render up to 9 visit cards per page (consistent with calendar)
  - Display pagination controls (Previous, Next, page numbers)
  - Sort visits by date descending (most recent first)

#### Scenario: Navigate between pages
- **WHEN** visitor clicks "Next" or a page number
- **THEN** the system SHALL:
  - Update URL with `?page=N` query parameter
  - Load and display the requested page of visits
  - Highlight current page in pagination controls
  - Maintain page title and subtitle from config

#### Scenario: Handle empty state
- **WHEN** no visits are published
- **THEN** the system SHALL display a helpful message (e.g., "Nenhuma visita registrada")

### Requirement: Visit Detail Page
The system SHALL provide a detail page at `/visits/[id]` that displays complete information about a single visit with rich text formatting and institutional context.

**Definition:** The visit detail page is a server-rendered Next.js page that fetches a single visit card from Prismic and renders it with full narrative content and formatting.

#### Scenario: View complete visit information
- **WHEN** visitor accesses `/visits/[visit-id]`
- **THEN** the system SHALL display:
  - Visit title as main heading
  - Visit date as a badge/timestamp
  - Institution name prominently displayed
  - Cover image with alt text
  - Short description/preview text
  - Complete visit narrative with proper rich text formatting
  - Activities performed with proper formatting

#### Scenario: Render rich text content
- **WHEN** visit detail page renders rich text fields
- **THEN** the system SHALL support:
  - Headings (h1-h6) with appropriate styling
  - Paragraphs with justified text alignment
  - Lists (ordered and unordered) with proper nesting
  - Bold, italic, and underline text formatting
  - Links with underline and hover states
  - Images with captions and alt text
  - Code blocks for preformatted content

#### Scenario: Generate static detail pages
- **WHEN** application builds
- **THEN** the system SHALL:
  - Generate static HTML for all published visits using `generateStaticParams()`
  - Support incremental static regeneration in development (5-second revalidate)
  - Serve detail pages from static cache in production

#### Scenario: Handle missing or deleted visit
- **WHEN** visitor requests `/visits/[invalid-id]`
- **THEN** the system SHALL return 404 Not Found

### Requirement: Static Generation for Performance
The system SHALL use Next.js static generation and caching to optimize performance of visits pages.

#### Scenario: Generate metadata on demand
- **WHEN** visit detail page is requested
- **THEN** the system SHALL:
  - Generate SEO metadata from visit card fields
  - Create OpenGraph title and images
  - Cache metadata for subsequent requests

#### Scenario: Revalidate cache on content change
- **WHEN** content editor publishes changes to visit documents via Prismic
- **THEN** the system SHALL:
  - Trigger webhook to `/api/revalidate` endpoint
  - Invalidate cached visits pages using cache tags
  - Serve fresh content on next request

### Requirement: Route Registration
The system SHALL register visits routes in Prismic route resolver for proper linking and preview mode.

#### Scenario: Configure route mapping
- **WHEN** Prismic documents are created with `visit_card` type
- **THEN** the system SHALL:
  - Map `visit_card` documents to `/visits/[uid]` route pattern
  - Support Prismic preview mode for draft visits
  - Enable Prismic "View" button to display live visit pages

### Requirement: Date Formatting
The system SHALL format visit dates consistently using Brazilian date format (DD/MM/YYYY).

#### Scenario: Display visit date
- **WHEN** visit detail page renders
- **THEN** the system SHALL display visit date:
  - In badge as `DD/MM/YYYY` format (e.g., "28/01/2026")
  - Using existing `formactDate` helper for consistency
  - Regardless of source date format from Prismic
