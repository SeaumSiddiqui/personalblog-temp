export interface BlogMetadata {
  title: string;
  description?: string;
  image?: string;
  url: string;
}

const CACHE_KEY = 'blog_metadata_cache';
const CACHE_EXPIRY = 7 * 24 * 60 * 60 * 1000;

interface CachedMetadata {
  data: BlogMetadata;
  timestamp: number;
}

interface MetadataCache {
  [url: string]: CachedMetadata;
}

export const getCachedMetadata = (url: string): BlogMetadata | null => {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    if (!cache) return null;

    const parsedCache: MetadataCache = JSON.parse(cache);
    const cached = parsedCache[url];

    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > CACHE_EXPIRY;
    if (isExpired) {
      delete parsedCache[url];
      localStorage.setItem(CACHE_KEY, JSON.stringify(parsedCache));
      return null;
    }

    return cached.data;
  } catch (error) {
    console.error('Error reading cache:', error);
    return null;
  }
};

export const setCachedMetadata = (url: string, metadata: BlogMetadata): void => {
  try {
    const cache = localStorage.getItem(CACHE_KEY);
    const parsedCache: MetadataCache = cache ? JSON.parse(cache) : {};

    parsedCache[url] = {
      data: metadata,
      timestamp: Date.now(),
    };

    localStorage.setItem(CACHE_KEY, JSON.stringify(parsedCache));
  } catch (error) {
    console.error('Error writing to cache:', error);
  }
};

export const fetchBlogMetadata = async (url: string): Promise<BlogMetadata> => {
  const cached = getCachedMetadata(url);
  if (cached) {
    return cached;
  }

  try {
    const response = await fetch(url);
    const html = await response.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    const getMetaContent = (name: string, property?: string): string | null => {
      let element = doc.querySelector(`meta[name="${name}"]`);
      if (!element && property) {
        element = doc.querySelector(`meta[property="${property}"]`);
      }
      return element?.getAttribute('content') || null;
    };

    const title =
      getMetaContent('og:title', 'og:title') ||
      getMetaContent('twitter:title', 'twitter:title') ||
      doc.querySelector('title')?.textContent ||
      'Untitled';

    const description =
      getMetaContent('og:description', 'og:description') ||
      getMetaContent('twitter:description', 'twitter:description') ||
      getMetaContent('description') ||
      '';

    const image =
      getMetaContent('og:image', 'og:image') ||
      getMetaContent('twitter:image', 'twitter:image') ||
      '';

    const metadata: BlogMetadata = {
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      url,
    };

    setCachedMetadata(url, metadata);
    return metadata;
  } catch (error) {
    console.error(`Error fetching metadata for ${url}:`, error);

    const fallbackMetadata: BlogMetadata = {
      title: url,
      url,
    };

    return fallbackMetadata;
  }
};
