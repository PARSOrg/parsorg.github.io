import data from '../data/applications.json';

export interface SocialLink { name: string; icon: string; enabled: boolean; url: string | null }

export interface Application {
  slug: string;
  name: string;
  description: string;
  tagline: string;
  theme: 'blue' | 'violet' | 'teal';
  icon: 'compass' | 'book';
  iconUrl?: string;
  socials?: SocialLink[];
  links: { googlePlay?: string; discord?: string; github?: string };
}

export const applications = data as Application[];

export const resourceTypes = [
  { slug: 'changelog', label: 'Changelog', description: "What's new", icon: 'history' },
  { slug: 'documentation', label: 'Documentation', description: 'Learn how to use it', icon: 'book' },
  { slug: 'privacy-policy', label: 'Privacy policy', description: 'Your data and privacy', icon: 'shield' },
  { slug: 'terms-of-service', label: 'Terms of service', description: 'Legal information', icon: 'file' },
] as const;

interface DocumentModule { frontmatter: { title: string; description?: string }; url?: string }
const documents = import.meta.glob<DocumentModule>('../pages/apps/*/docs/*.md', { eager: true });

export function getDocuments(slug: string) {
  return Object.entries(documents).flatMap(([path, document]) => {
    const match = path.match(/\/apps\/([^/]+)\/docs\/([^/]+)\.md$/);
    if (!match || match[1] !== slug) return [];
    return [{ slug: match[2], title: document.frontmatter.title, description: document.frontmatter.description, url: document.url ?? '/apps/' + slug + '/docs/' + match[2] + '/' }];
  });
}
