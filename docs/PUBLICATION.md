# Public documentation contract

The application repository owns document content. This website owns URLs, layout and presentation. The website must not clone or read a private application repository.

## Source convention

ParkVector: `PARSOrg/ParkVector/docs/public/`. Create that directory later in the application repository. Use UTF-8 Markdown, no YAML frontmatter or raw HTML, and only the filenames in `src/data/document-publication.json`. Use absolute site paths for links between documents, e.g. `/apps/parkvector/docs/faq/`. An initial H1 is optional; the website supplies the canonical title. Never place drafts, internal documents, secrets, personal data, or unapproved legal wording in an export. Export an explicitly reviewed selection of files, not the entire application tree.

## Import

From a trusted checkout of this website:

```sh
node scripts/import-public-docs.mjs parkvector /path/to/approved-export
npm ci
npm run check
npm run build
```

The importer validates filenames, file types and basic Markdown format, then wraps content in website-owned frontmatter. It does not delete previously published documents when they are absent from an export. Withdrawals require an explicit reviewed change. Validation is not a privacy or legal content review.

## Future automation (not enabled)

Add a workflow to the private application repository which exports only reviewed, allowlisted documents, checks out the public website using a narrowly scoped credential, runs the importer and opens a pull request. A GitHub App installation token or fine-grained token limited to the website with contents and pull requests write permissions can be used. Store credentials only in the private source repository or protected environment; never in Markdown or workflow logs. Do not give the public website access to the private source repository.

Require review of the exported diff, especially legal content, before merge. Existing website CI validates and GitHub Pages publishes after merge. Keep the last published content if export fails. Do not auto-merge or publish drafts. Record the source commit in the PR description. A public PR itself exposes its contents, so approval for public disclosure must happen before opening it.

No source workflow, credentials, or synchronization schedule are configured by this change. Other applications can be registered once their source and document allowlist are approved.
