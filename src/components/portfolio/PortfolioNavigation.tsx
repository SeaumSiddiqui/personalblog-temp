import React from 'react';

interface PortfolioNavigationProps {
  isDarkMode: boolean;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
  navItemRefs?: React.RefObject<(HTMLLIElement | null)[]>;
}

export const PortfolioNavigation: React.FC<PortfolioNavigationProps> = ({
  isDarkMode,
  activeSection,
  scrollToSection,
  navItemRefs,
}) => {
  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blogs', label: 'Blog' }
  ];

  return (
    <nav className="hidden lg:block">
      <ul className="mt-16 space-y-4">
        {navItems.map((item, index) => (
          <li
            key={item.id}
            ref={(el) => {
              if (navItemRefs?.current) {
                navItemRefs.current[index] = el;
              }
            }}
            className="relative"
            style={{ visibility: 'hidden' }}
          >
            <button
              onClick={() => scrollToSection(item.id)}
              className="group flex items-center space-x-4"
            >
              <span
                className={`h-px transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-primary-500 w-16'
                    : isDarkMode
                    ? 'bg-dark-text-secondary group-hover:bg-primary-400 w-8'
                    : 'bg-light-text-secondary group-hover:bg-primary-500 w-8'
                }`}
              />
              <span
                className={`text-xs font-mono font-bold uppercase tracking-widest transition-colors duration-300 ${
                  activeSection === item.id
                    ? 'text-primary-500'
                    : isDarkMode
                    ? 'text-dark-text-secondary group-hover:text-primary-400'
                    : 'text-light-text-secondary group-hover:text-primary-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};
