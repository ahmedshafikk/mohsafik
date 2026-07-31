# Architectural Blueprint

Project brief: Mohamed Shafik — Dubai Ultra-Prime Real Estate

I'm redesigning an existing personal-brand website for a Dubai luxury real estate advisor. Please rebuild the frontend using React, preserving the established brand identity below. Do not set up Supabase or any backend — this app will connect to an existing external API (Cloudflare Workers) that I will wire up separately.

Brand identity to preserve:

Concept: "Architectural drafting rendered in luxury" — the brand differentiator is the advisor's civil engineering background, expressed through structured, drafting-inspired visual language (not generic soft/minimal/beige luxury real estate styling)

Color palette: limestone (base/neutral), deep petrol (primary accent), brass (secondary accent/highlight) — I'll provide exact hex codes

Typography: Bodoni Moda for display/headlines, IBM Plex Mono for utility text/labels/numbers, Karla for body copy

Existing assets: logo, hero image, and self-drawing SVG elevation illustration — I'll upload these

Pages to build:

Home — hero, stats band, mandate/process sections (rebuild from existing site structure, refined visual treatment)

Blog listing page — grid/list of published posts with cover images, titles, excerpts, dates

Blog post page — full post view with cover image, title, date, rich content

Listings page — grid of property listings (villas, penthouses, hotels, development plots) with photos, price, location, key details

Listing detail page — full property view with photo gallery, description, specs, contact CTA

Admin panel (protected route, e.g. /admin) — simple login screen, then forms to:

Create/edit/delete blog posts (title, content, cover image upload, publish status)

Create/edit/delete property listings (title, price, location, description, multiple image upload, status)

Technical requirements:

All data (blog posts, listings) is fetched from and submitted to an external REST API — please use placeholder fetch calls I can point at my API endpoints (e.g. /api/blogs, /api/listings)

Image uploads in the admin panel should POST to an external upload endpoint (e.g. /api/upload) and store the returned URL — no built-in storage needed

Admin login should call an external auth endpoint (e.g. /api/login) and store the returned token for authenticated requests

Responsive design, matching the existing site's premium, structured aesthetic — avoid generic AI-default soft/rounded/pastel styling

I'll upload the logo, hero image, and color hex codes in the next message.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6316ab09-e030-4d6e-87e2-a678af7a4446).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
