# LOC / Living Engineering Workshop

A portfolio for Cao Tiến Lộc: a cinematic engineering workbench, a real 3D Sen companion, curated project case studies, and public GitHub activity.

## Run locally

Requires Node.js 20.9+ and npm.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm test
npm run typecheck
npm run build
npm start
```

The scripts use Webpack because Windows Application Control on the development machine blocks the native SWC binary. Next.js uses its supported WASM fallback; no security settings need to change.

## Content

- `src/data/projects.ts` owns project descriptions, categories, statuses, architecture summaries, and milestones. GitHub never changes release status.
- `profile` in the same file owns contact and résumé configuration. Contact links to GitHub; LinkedIn is available on About. The résumé button opens professional experience. The supplied PDF and personal contact details are not published by default.
- Project descriptions and stages are based on 30 reviewed files across ten public repositories. `src/data/github-sources.json` records revision-pinned source links. See `docs/content-audit.md` for qualifications and discrepancies. National Exam System and `src/data/experience.ts` use the owner-provided résumé, reviewed September 26, 2026; employment claims are attributed separately from public GitHub evidence.
- `src/lib/github.ts` fetches metadata, latest commits, releases, and Actions for ten tracked repositories on the server, with one-hour caching, a five-second timeout, and per-repository failure isolation. Actions are displayed only when their head SHA matches the displayed commit.
- `src/data/repository-snapshot.json` contains actual public GitHub REST responses retrieved on September 26, 2026. It provides a clearly dated and labeled snapshot when live requests fail, and during the first hour after capture. Missing releases or workflow results are not interpreted as production readiness.
- Run `npm run sync:github` to refresh the checked-in metadata snapshot. Failed repositories retain their previous data and timestamp. This does not rewrite project descriptions: newer revisions still require source review.
- An optional server-only `GITHUB_TOKEN` increases the API quota. Never prefix it with `NEXT_PUBLIC_`.
- Set `SITE_URL` to the deployed origin for correct social image URLs. See `.env.example`.

## Routes

`/`, `/work`, `/work/[slug]`, `/lab`, `/now`, `/builds`, `/about`, and a custom 404.

The work index supports shareable category and status filters, including source available, V1, building, prototype, concept, and pending case studies.

## Visual implementation

The studio and four physical artifacts are an optimized, generated WebP background (about 182 KB), with real HTML project links layered over it. This is an art-directed scene, not an orbitable 3D world. Mobile has its own readable two-column project layout.

Sen is a genuine React Three Fiber model sourced from the owner's `Loccao102/VeyraBot` repository, loaded separately on the client. Hover/focus produces a listening state; activating the companion produces a success expression. Rendering pauses when off-screen or in a hidden tab. Reduced motion uses on-demand frames; the UI also disables decorative animation and smooth scrolling. A lotus fallback covers unsupported WebGL.

Keyboard focus, a skip link, semantic links, mobile navigation, and reduced-motion support are included. No analytics, chatbot service, fabricated email, or invented production benchmarks are configured.

## Sources and assets

- `src/components/sen/SenModel.jsx`: copied from https://github.com/Loccao102/VeyraBot/blob/main/src/SenModel.jsx on September 26, 2026; see `docs/asset-provenance.md`.
- `public/images/workshop.webp`: generated for this project with the built-in image generation tool. The full prompt and generation provenance are in `docs/asset-provenance.md`.
- The small lotus icon is an SVG based on the design's lotus identity. UI icons are Lucide.

## Deployment

Deploy with a Next.js-capable host or run `npm run build` followed by `npm start`. Static export is intentionally not enabled because GitHub data uses server-side revalidation. Add the environment values above on the hosting platform. No deployment or push to GitHub is performed by the local development scripts.
