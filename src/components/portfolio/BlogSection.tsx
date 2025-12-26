import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ExternalLink } from 'lucide-react';
import { fetchBlogMetadata, BlogMetadata } from '../../utils/metaFetcher';

interface BlogPost {
  url: string;
  date: string;
}

interface BlogSectionProps {
  isDarkMode: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ isDarkMode }) => {
  const blogUrls: BlogPost[] = [
    {
      url: 'https://example.com/blog/spring-boot-export-excel',
      date: '2025'
    },
    {
      url: 'https://example.com/blog/bengali-enum-jpa',
      date: '2025'
    }
  ];

  const [blogPosts, setBlogPosts] = useState<(BlogMetadata & { date: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllMetadata = async () => {
      try {
        const metadataPromises = blogUrls.map(async (blog) => {
          const metadata = await fetchBlogMetadata(blog.url);
          return { ...metadata, date: blog.date };
        });

        const results = await Promise.all(metadataPromises);
        setBlogPosts(results);
      } catch (error) {
        console.error('Error fetching blog metadata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMetadata();
  }, []);

  return (
    <section id="blogs" className="mb-16 scroll-mt-16">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className={`text-sm font-bold uppercase tracking-widest ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          Blog
        </h2>
      </div>

      <div>
        {loading && (
          <div className="space-y-8">
            {blogUrls.map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4">
                  <div className="z-10 mb-2 mt-1 sm:col-span-2">
                    <div className={`h-4 rounded ${isDarkMode ? 'bg-dark-border' : 'bg-light-border'}`} />
                  </div>
                  <div className="z-10 sm:col-span-6">
                    <div className="flex gap-4">
                      <div className={`w-24 h-24 rounded-lg ${isDarkMode ? 'bg-dark-border' : 'bg-light-border'}`} />
                      <div className="flex-1 space-y-2">
                        <div className={`h-4 rounded ${isDarkMode ? 'bg-dark-border' : 'bg-light-border'}`} />
                        <div className={`h-4 w-3/4 rounded ${isDarkMode ? 'bg-dark-border' : 'bg-light-border'}`} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
          <div className="space-y-8">
            {blogPosts.map((post, index) => (
              <div
                key={index}
                className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
              >
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-primary-900/10 lg:group-hover:shadow-lg lg:group-hover:drop-shadow-lg"
                />

                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-light-text-secondary dark:text-dark-text-secondary sm:col-span-2">
                  {post.date}
                </header>

                <div className="z-10 sm:col-span-6">
                  <div className="flex gap-4">
                    {post.image && (
                      <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border border-light-border dark:border-dark-border">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold leading-snug">
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/link"
                        >
                          <span className={`inline-flex items-baseline text-base font-medium leading-tight transition-colors duration-300 group-hover:text-primary-500 ${
                            isDarkMode ? 'text-dark-text' : 'text-light-text'
                          }`}>
                            <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                            <span className="line-clamp-2">{post.title}</span>
                            <ExternalLink className="ml-2 w-4 h-4 inline-block flex-shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                          </span>
                        </a>
                      </h3>
                      {post.description && (
                        <p className={`mt-2 text-sm line-clamp-2 transition-colors duration-300 ${
                          isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                        }`}>
                          {post.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}


        <div className="mt-8">
          <Link
            to="/blogs"
            className={`group inline-flex items-center space-x-2 text-sm font-semibold transition-colors duration-300 ${
              isDarkMode
                ? 'text-primary-400 hover:text-primary-300'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            <span>View All Articles</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </div>
    </section>
  );
};
