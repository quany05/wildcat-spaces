# Wildcat Spaces

An activity-first study space finder for Northwestern students. Built with React, TypeScript, Next.js, and a server-side search API. No administration interface or user accounts are required.

## Run locally

Use Node 22.13+ and npm:

```sh
npm ci
npm run dev
```

The project has no ChatGPT, Sites, Cloudflare Worker, or connector dependency. Visitors do not need a ChatGPT account. No API keys or environment variables are required.

## Validate and build

```sh
npm run typecheck
npm test
npm run build
```

## Data

Edit `lib/spaces.ts` to add or update spaces. This is a code-maintained seed catalog, not a live university database. The catalog is validated on load and searched server-side by `GET /api/spaces`. Individual records are available at `GET /api/spaces/:id`. Search responses are not cached, so a deployed catalog update takes effect immediately. No writable database or admin system is included, as requested.

Twelve room names, floor locations, and actual room photos are from the [Northwestern Libraries room directory](https://www.library.northwestern.edu/use-the-libraries/spaces-study-rooms/rooms-and-spaces/). Photos are stored in `public/images`. Descriptions, amenities, capacity, group sizes, access rules, activity compatibility, occupancy, and daily hours are **sample information** and are identified as such in the interface. They must be verified before using the app for real-world decisions. The official library directory and reservation site are linked from profiles.

## Matching

Activity and text/area location are hard constraints. All other selected requirements must be satisfied for an exact match. Alternatives always support the activity and location and explicitly list each unmet preference. Preference weights: group size 35; access and hours 30 each; noise 25; sample seating availability 20; each amenity 15; seating type 10. Score = matched preference weight / selected preference weight. Stable curated order breaks ties. Sort by name or seats is also available.

Filters live in the URL and persist through profile navigation. Saved spaces and comparison selections persist in localStorage. Compare up to three spaces. Opening hours use America/Chicago. Demo seat counts are fixed and never presented as live.

## API

`GET /api/spaces?activity=calls&people=4&amenities=outlets,monitor`

Accepted filters: `activity` (focus/group/calls/long), `q`, `area`, `people` (1–100), `noise`, `amenities`, `seating`, `hours`, `access`, `available`, and `sort`. Invalid typed selections return HTTP 400. Unknown detail IDs return HTTP 404. GET-only routes expose no editing endpoint.

## Prototype scope

Implemented: activity/location search, combined filters, deterministic ranking, alternatives, profiles, saved spaces, comparison, responsive layout, missing-photo fallback, loading/error/empty states, and keyboard-accessible controls. Occupancy is simulated. Crowd reports and a campus map are optional future work and are not implemented.

## Deploy on Vercel

1. Push this directory as the root of a GitHub repository.
2. In Vercel, choose Add New → Project and import that repository.
3. Select the Next.js framework and Node.js 22.x. Keep the default build (`npm run build`) and output settings. No environment variables are needed.
4. Deploy, then share the production `.vercel.app` URL or add your domain. If visitors see Vercel authentication, check Settings → Deployment Protection and ensure the production deployment is public.

GitHub stores the source; Vercel runs the frontend and search API. GitHub Pages alone cannot run these server API routes.

## Run without a hosting platform

After `npm ci && npm run build`, run `npm start`. This starts the full application and API on port 3000; use a reverse proxy for HTTPS on a public server.
