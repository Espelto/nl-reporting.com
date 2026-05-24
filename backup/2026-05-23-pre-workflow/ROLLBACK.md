# Rollback instructions

Snapshot taken before workflow + Use Cases upgrade (2026-05-23).

## Option A — Git (recommended)

```powershell
cd "c:\Users\Kobzev\Documents\Claude\Projects\nl-reporting.com"
git checkout backup/pre-workflow-upgrade
# or reset feature branch to snapshot:
git checkout feature/use-cases-workflow
git reset --hard e85743e
```

Commit `e85743e` on `master` / `backup/pre-workflow-upgrade` is the full-project snapshot.

## Option B — Restore these files only

Copy from this folder back to project root:

- `CaseStudy.js` → `components/CaseStudy.js`
- `N8NCanvas.js` → `components/N8NCanvas.js`
- `page.js` (home) → `app/page.js`
- `page.js` (case studies index) → `app/case-studies/page.js`

Then delete `components/home/UseCases.js` if you added it.

## What changed in the upgrade

- `N8NCanvas`: click-to-select side panel, tabs (Parameters / Output / Why), walkthrough tour
- `CaseStudy`: renders `sections`, `workflow`, `numbers`, results table
- `UseCases`: new homepage section with interactive AP workflow teaser
- `app/case-studies/page.js`: links to detail pages instead of inline legacy cards
