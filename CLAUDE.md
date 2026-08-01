# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Dubai luxury real estate personal-brand website for Mohamed Shafik. Built with TanStack Start (React 19), featuring a public marketing site and admin CMS. The frontend connects to an external Cloudflare Workers API.

**Brand concept**: "Architectural drafting rendered in luxury" — structured, drafting-inspired visual language reflecting the advisor's civil engineering background.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # ESLint
npm run format   # Prettier
```

## Architecture

### Stack
- **Framework**: TanStack Start 1.168 with TanStack Router (file-based routing)
- **UI**: React 19, shadcn/ui components, Radix UI primitives
- **Styling**: Tailwind 4.2 with custom design tokens (oklch color space)
- **Data**: TanStack React Query for server state
- **Forms**: React Hook Form + Zod validation
- **SSR**: Nitro server with error page fallback

### Route Structure (`src/routes/`)
TanStack Router file-based routing. `routeTree.gen.ts` is auto-generated — do not edit.

| File | URL | Purpose |
|------|-----|---------|
| `index.tsx` | `/` | Home (hero, stats, mandate, process) |
| `listings.index.tsx` | `/listings` | Portfolio grid |
| `listings.$id.tsx` | `/listings/:id` | Asset detail with gallery |
| `blog.index.tsx` | `/blog` | Journal grid |
| `blog.$slug.tsx` | `/blog/:slug` | Blog post |
| `admin.tsx` | `/admin` | Protected CMS dashboard |
| `__root.tsx` | — | Root layout with providers |

Dynamic params use `$` prefix (e.g., `$id`, `$slug`), not curly braces.

### Component Organization
- `src/components/ui/` — shadcn/ui component library (48 components)
- `src/components/site/` — Public site components (SiteLayout, Elevation)
- `src/components/admin/` — Admin forms (ListingForm, BlogForm, ImageUploader)

### Data Layer (`src/lib/`)
- `api.ts` — REST client with Bearer token auth, configured via `VITE_API_BASE_URL`
- `content.ts` — Type-safe data fetching functions and TypeScript types for Listing/BlogPost
- `i18n.tsx` — Bilingual EN/AR provider with RTL support
- `theme.tsx` — Dark/light theme provider with localStorage persistence

### API Endpoints (external)
```
GET/POST      /api/listings
GET/PUT/DELETE /api/listings/:id
GET/POST      /api/blogs
GET/PUT/DELETE /api/blogs/:slug
POST          /api/upload (multipart/form-data)
POST          /api/login
```

### Provider Stack (in `__root.tsx`)
```
QueryClientProvider → ThemeProvider → I18nProvider → Outlet
```

## Design System

### Color Palette (CSS variables in `src/styles.css`)
- `--limestone` / `--limestone-deep`: Base neutrals (off-white)
- `--petrol` / `--petrol-deep` / `--petrol-light`: Primary accent (near-black)
- `--brass` / `--brass-light`: Secondary accent (gold #C9A227)

### Typography
- **Display/headings**: Bodoni Moda (`font-display`)
- **Body**: Karla (`font-sans`)
- **Labels/specs**: IBM Plex Mono (`font-mono`)

### Custom Utilities
- `draft-grid` — architectural grid background pattern
- `label-mono` — uppercase mono label style
- `elevation-draw` — animated SVG stroke drawing

## Key Patterns

### Data Fetching
```tsx
// Public pages use React Query
const { data, isLoading } = useQuery({
  queryKey: ["listings"],
  queryFn: listListings
});

// Admin mutations invalidate cache
const mutation = useMutation({
  mutationFn: createListing,
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ["listings"] })
});
```

### Auth
Admin routes check for Bearer token stored in localStorage (`ms_admin_token`). Login calls `/api/login` and stores returned token via `setToken()` from `lib/api.ts`.

### Internationalization
```tsx
const { t, lang, setLang, dir } = useI18n();
// t("nav.portfolio") returns translated string
// dir is "ltr" or "rtl" based on language
```
