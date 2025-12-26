import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface BlogMetadata {
  title: string;
  description?: string;
  image?: string;
  url: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { url } = await req.json();

    if (!url) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BlogMetadataBot/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();

    const getMetaContent = (html: string, patterns: string[]): string | null => {
      for (const pattern of patterns) {
        const regex = new RegExp(
          `<meta[^>]*(?:name|property)=["']${pattern}["'][^>]*content=["']([^"']*)["']`,
          "i"
        );
        const match = html.match(regex);
        if (match) return match[1];

        const reverseRegex = new RegExp(
          `<meta[^>]*content=["']([^"']*)["'][^>]*(?:name|property)=["']${pattern}["']`,
          "i"
        );
        const reverseMatch = html.match(reverseRegex);
        if (reverseMatch) return reverseMatch[1];
      }
      return null;
    };

    const getTitleFromHtml = (html: string): string | null => {
      const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      return match ? match[1].trim() : null;
    };

    const title =
      getMetaContent(html, ["og:title", "twitter:title"]) ||
      getTitleFromHtml(html) ||
      "Untitled";

    const description =
      getMetaContent(html, ["og:description", "twitter:description", "description"]) ||
      "";

    const image =
      getMetaContent(html, ["og:image", "twitter:image"]) ||
      "";

    const metadata: BlogMetadata = {
      title: title.trim(),
      description: description.trim(),
      image: image.trim(),
      url,
    };

    return new Response(JSON.stringify(metadata), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});