import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';

interface BlogSectionProps {
  isDarkMode: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ isDarkMode }) => {
  const recentPosts = [
    {
      title: 'Building Scalable Microservices',
      excerpt: 'Best practices for designing and implementing microservices architecture',
      date: '2024'
    },
    {
      title: 'Spring Boot Performance Tips',
      excerpt: 'Optimizing Spring Boot applications for production environments',
      date: '2024'
    },
    {
      title: 'Database Design Patterns',
      excerpt: 'Common patterns and anti-patterns in database schema design',
      date: '2024'
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
              className={`group relative rounded-lg p-6 transition-all duration-300 ${
                isDarkMode
                  ? 'hover:bg-dark-border/50 hover:shadow-xl'
                  : 'hover:bg-light-border/50 hover:shadow-xl'
              }`}
            >
              <div className="flex items-start space-x-4">
                <FileText className={`w-6 h-6 mt-1 flex-shrink-0 transition-colors duration-300 ${
                  isDarkMode
                    ? 'text-primary-400 group-hover:text-primary-300'
                    : 'text-primary-600 group-hover:text-primary-700'
                }`} />

                <div className="flex-1">
                  <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                    isDarkMode
                      ? 'text-dark-text group-hover:text-primary-400'
                      : 'text-light-text group-hover:text-primary-600'
                  }`}>
                    {post.title}
                  </h3>

                  <p className={`text-sm mb-3 transition-colors duration-300 ${
                    isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                  }`}>
                    {post.excerpt}
                  </p>

                  <span className={`text-xs transition-colors duration-300 ${
                    isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                  }`}>
                    {post.date}
                  </span>
                </div>
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
