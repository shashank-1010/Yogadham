import { useEffect } from 'react';

const SITE_NAME = 'Yogdham Sansthan';
const DEFAULT_DESCRIPTION =
  'Yogdham Sansthan is a premium yoga institution in Lucknow offering authentic, guided yoga programs with certified trainers. Choose a Home Session or Online Session and register today.';

function setMetaTag(attr, key, content) {
  if (!content) return;
  let tag = document.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(url) {
  if (!url) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', url);
}

/**
 * Lightweight per-page SEO manager for this single-page app. Updates the
 * document title, meta description, canonical link, and Open Graph /
 * Twitter tags whenever a route mounts — so every page (Home, Programs,
 * Register, etc.) gets its own unique, keyword-relevant title and
 * description instead of sharing the one static tag in index.html.
 */
export default function Seo({ title, description = DEFAULT_DESCRIPTION, path = '' }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} | Rooted in Tradition, Guided by Practice`;
    document.title = fullTitle;

    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);

    const canonicalUrl = `https://www.yogdhamsansthan.example${path}`;
    setCanonical(canonicalUrl);
    setMetaTag('property', 'og:url', canonicalUrl);
  }, [title, description, path]);

  return null;
}
