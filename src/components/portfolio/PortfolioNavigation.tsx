import React, { useEffect, useState, useRef } from 'react';

interface PortfolioNavigationProps {
  isDarkMode: boolean;
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export const PortfolioNavigation: React.FC<PortfolioNavigationProps> = ({
  isDarkMode,
  activeSection,
  scrollToSection
}) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const animationTriggered = useRef(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'blogs', label: 'Blog' }
  ];

  useEffect(() => {
    if (animationTriggered.current) return;
    animationTriggered.current = true;

    const baseDelay = 1500;
    navItems.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, baseDelay + index * 120);
    });
  }, []);

  return (
    <nav className="hidden lg:block">
      <ul className="mt-16 space-y-4">
        {navItems.map((item, index) => (
          <li
            key={item.id}
            style={{
              transform: visibleItems.includes(index) ? 'translateX(0)' : 'translateX(-30px)',
              opacity: visibleItems.includes(index) ? 1 : 0,
              transition: `transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease-out`,
              transitionDelay: `${index * 50}ms`,
            }}
          >
            <button
              onClick={() => scrollToSection(item.id)}
              className="group flex items-center space-x-4"
            >
              <span
                className={`h-px transition-all duration-300 ${
                  activeSection === item.id
                    ? 'w-16 bg-primary-500'
                    : isDarkMode
                    ? 'w-8 bg-dark-text-secondary group-hover:w-16 group-hover:bg-primary-400'
                    : 'w-8 bg-light-text-secondary group-hover:w-16 group-hover:bg-primary-500'
                }`}
              />
              <span
                className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300 ${
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
