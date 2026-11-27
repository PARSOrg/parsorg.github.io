# parsorg.github.io

Official PARSOrg website — applications, documentation, changelogs and legal information.

## Development

Node.js 24 and npm are required. Use `npm ci`, `npm run dev`, `npm run check` and `npm run build`. Static output is in `dist/`; preview it with `npm run preview`.

Astro generates static pages. Tailwind CSS is integrated through PostCSS.

## Add an application

Add an entry to `src/data/applications.json` with a unique URL-safe slug, name, description, tagline, theme (`blue` or `violet`), icon (`compass` or `book`) and optional links (`googlePlay`, `discord`, `github`). The home page, app menu and default product page are generated from this configuration. Only configured links are displayed.

For a custom product page, adapt the shared ApplicationLayout with additional content and a custom artwork slot, or create a dedicated static route for the application.

## Publish documents

Application repositories own their public documentation. See [the publication contract](docs/PUBLICATION.md) for approved export format, import and future synchronization. The website publishes reviewed Markdown snapshots under stable URLs. Missing primary documents remain unlinked.

## Deployment

Pull requests targeting `main` run CI. Changes merged into `main` trigger the GitHub Pages workflow. Under repository Settings → Pages, select GitHub Actions as the deployment source.

Website: https://parsorg.github.io/

## Dependencies

Commit `package-lock.json` alongside dependency changes. Use Node.js 24, run `npm audit`, and validate before merging. Do not commit secrets, private application code, or internal documentation to this public repository.
