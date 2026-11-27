import { readFile, writeFile, mkdir, lstat, readdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const registry = JSON.parse(await readFile(join(root, 'src/data/document-publication.json'), 'utf8'));
const [app, source, ...extra] = process.argv.slice(2);
if (!app || !source || extra.length || !Object.hasOwn(registry, app)) {
  throw new Error('Usage: node scripts/import-public-docs.mjs <registered-app> <public-docs-directory>');
}
const config = registry[app];
const dir = resolve(source);
const dest = join(root, 'src/pages/apps', app, 'docs');
if (!(await lstat(dir)).isDirectory()) throw new Error('Source must be a real directory');
const entries = await readdir(dir, { withFileTypes: true });
const approved = Object.keys(config.documents).map(slug => slug + '.md');
if (!entries.length || entries.some(entry => !entry.isFile() || !approved.includes(entry.name))) {
  throw new Error('Only allowlisted regular Markdown files are accepted in the publication directory');
}
const prepared = [];
for (const entry of entries) {
  const path = join(dir, entry.name);
  const stat = await lstat(path);
  if (!stat.isFile() || stat.size > 1024 * 1024) throw new Error('Invalid document: ' + entry.name);
  const body = (await readFile(path, 'utf8')).replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim();
  if (!body || body.startsWith('---') || /<\/?[a-z!]/i.test(body)) {
    throw new Error('Expected nonempty plain Markdown without frontmatter or raw HTML: ' + entry.name);
  }
  const slug = entry.name.slice(0, -3);
  const title = config.documents[slug];
  const clean = body.replace(/^# [^\n]+\n*/, '');
  if (!clean.trim()) throw new Error('Empty document body: ' + entry.name);
  prepared.push([entry.name, '---\nlayout: ../../../../layouts/DocumentLayout.astro\ntitle: ' + JSON.stringify(title) + '\n---\n\n' + clean + '\n']);
}
await mkdir(dest, { recursive: true });
for (const [name, content] of prepared) await writeFile(join(dest, name), content);
console.log('Imported ' + prepared.length + ' approved document(s) for ' + app + '. Review the diff before publishing.');
