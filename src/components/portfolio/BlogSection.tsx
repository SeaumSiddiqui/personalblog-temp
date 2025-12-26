import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ExternalLink } from 'lucide-react';

interface BlogPost {
  title: string;
  date: string;
  link?: string;
}

interface BlogSectionProps {
  isDarkMode: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ isDarkMode }) => {
  const recentPosts: BlogPost[] = [
    {
      title: 'Spring Boot: Export Excel File from MySQL Database with User Selected Fields',
      date: '2025',
      link: 'https://example.com/blog/spring-boot-export-excel'
    },
    {
      title: 'Storing Bengali Enum Values in Database with JPA Converters',
      date: '2025',
      link: 'https://example.com/blog/bengali-enum-jpa'
    }
  ];

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
        <div className="space-y-8">
          {recentPosts.map((post, index) => (
            <div
              key={index}
              className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50"
            >
              {post.link && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-primary-900/10 lg:group-hover:shadow-lg lg:group-hover:drop-shadow-lg"
                />
              )}
              {!post.link && (
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-lg transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-primary-900/10 lg:group-hover:shadow-lg lg:group-hover:drop-shadow-lg" />
              )}

              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-light-text-secondary dark:text-dark-text-secondary sm:col-span-2">
                {post.date}
              </header>

              <div className="z-10 sm:col-span-6">
                <h3 className="font-semibold leading-snug">
                  {post.link ? (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link"
                    >
                      <span className={`inline-flex items-baseline text-base font-medium leading-tight transition-colors duration-300 group-hover:text-primary-500 ${
                        isDarkMode ? 'text-dark-text' : 'text-light-text'
                      }`}>
                        <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block" />
                        <span>{post.title}</span>
                        <ExternalLink className="ml-2 w-4 h-4 inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </span>
                    </a>
                  ) : (
                    <span className={`inline-flex items-baseline text-base font-medium leading-tight transition-colors duration-300 group-hover:text-primary-500 ${
                      isDarkMode ? 'text-dark-text' : 'text-light-text'
                    }`}>
                      {post.title}
                    </span>
                  )}
                </h3>
              </div>
            </div>
          ))}
        </div>

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
