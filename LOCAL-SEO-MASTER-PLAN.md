# Nakama Digital — Local SEO Master Plan

## Pilot phase

The first validation set contains three city landing pages:

- /luwuk/
- /sintang/
- /surabaya/

All city pages use the same reusable `CityLanding` component and the `localSeoCities` data layer.

## Architecture

```
src/
  data/
    localSeoCities.ts
  pages/
    CityLanding.tsx
  App.tsx
```

The city slug is resolved from the URL and mapped to a single city record. A new city should normally require a new data record, not a new page component.

## Required data for every city

Each city record should contain:

- city and region
- primary keyword
- secondary keyword set
- unique headline
- unique intro
- unique local context
- local business/organization focus
- service descriptions
- city-specific FAQ wording

The template can be shared, but the local information must be meaningfully different before large-scale expansion.

## Technical SEO rules

Every city page should:

- use one descriptive H1
- set a city-specific title
- set a city-specific meta description
- use a self-referencing canonical URL
- remain indexable unless intentionally excluded
- expose Service and FAQ structured data where appropriate
- use a stable trailing-slash canonical convention
- be included in the XML sitemap
- be discoverable through internal links
- work on mobile and desktop

## Routing rules

Explicit application routes must appear before the city catch-all route.

Current order keeps these routes protected:

- /workflow/*
- /client-intake
- /en
- /admin
- /:citySlug
- /

Do not place `/:citySlug` above an existing fixed route.

## Expansion rule

Do not create dozens of city pages by simple name replacement.

Before adding another city, give it:

1. a distinct local introduction
2. locally relevant business categories
3. useful city-specific FAQ wording
4. at least one additional internal-link path
5. a verified sitemap entry
6. a successful production build

The layout and component should remain shared so maintenance stays centralized.

## Build-time SEO generation

City SEO data has a single source of truth in `src/data/localSeoCities.json`. The production build reads that data and generates a dedicated `dist/<city>/index.html` for every configured city. Each generated city document receives city-specific title, meta description, canonical, robots, Open Graph metadata, Service schema, and FAQ schema. The same data also generates the XML sitemap and robots.txt.

The React route remains available as the interactive application layer, while the generated HTML gives search engines a city-specific document at the initial request.

## Deployment

GitHub Pages deployment is handled by:

`.github/workflows/deploy-pages.yml`

The build output is `dist/` and the project build script also creates `dist/404.html` for GitHub Pages SPA fallback.

## Indexing support

The public site includes:

- `/robots.txt`
- `/sitemap.xml`

The sitemap currently lists the root page and the three pilot city URLs.

## Pilot acceptance checklist

The architecture is ready for broader expansion only after the three pilot routes are verified for:

- successful production build
- correct route resolution
- correct page title
- correct meta description
- correct canonical
- valid structured data
- no route collisions
- working internal links
- successful GitHub Pages deployment
- clean Google Search Console inspection

Ranking positions are not a deployment acceptance criterion; indexing and technical correctness are.
