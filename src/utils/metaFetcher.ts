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
    const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/fetch-blog-metadata`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`Edge function returned ${response.status}`);
    }

    const metadata: BlogMetadata = await response.json();

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
