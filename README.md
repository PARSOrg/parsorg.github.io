# parsorg.github.io

Official PARSOrg website — applications, documentation, changelogs and legal information.

## Development

Requires Node.js 24 and npm. Install the locked dependencies with `npm ci`, start the development server with `npm run dev`, and validate with `npm run check` and `npm run build`. The static output is in `dist/`; preview it with `npm run preview`.

Astro generates static pages. Tailwind CSS is integrated through PostCSS. Source pages live in `src/pages/`, shared layouts in `src/layouts/`, and global styles in `src/styles/`.

## Deployment

Pull requests targeting `main` run CI (locked installation, type checking, static build and dependency audit). Changes merged into `main` trigger the GitHub Pages workflow. Under repository Settings → Pages, select GitHub Actions as the deployment source.

Website: https://parsorg.github.io/

## Dependencies

Commit `package-lock.json` alongside dependency changes. Use Node.js 24, run `npm audit`, and validate before merging. Do not commit secrets, private application code, or internal documentation to this public repository.
