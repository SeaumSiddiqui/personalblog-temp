import React, { useEffect, useState } from 'react';
import {
  SiSpringboot,
  SiOpenjdk,
  SiSpring,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiAmazonaws,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiApachemaven,
  SiJunit5
} from 'react-icons/si';

interface SidebarContentProps {
  isDarkMode: boolean;
}

interface Stat {
  label: string;
  value: string;
}

interface Tech {
  name: string;
  icon: React.ComponentType<any>;
}

export const SidebarContent: React.FC<SidebarContentProps> = ({ isDarkMode }) => {
  const [showStacks, setShowStacks] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= 0;
        setShowStacks(isVisible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats: Stat[] = [
    { label: 'Years Experience', value: '1+' },
    { label: 'Projects', value: '3+' },
    { label: 'Technologies', value: '12+' }
  ];

  const techs: Tech[] = [
    { name: 'Spring Boot', icon: SiSpringboot },
    { name: 'Java', icon: SiOpenjdk },
    { name: 'Spring Security', icon: SiSpring },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'Redis', icon: SiRedis },
    { name: 'AWS', icon: SiAmazonaws },
    { name: 'Docker', icon: SiDocker },
    { name: 'Kubernetes', icon: SiKubernetes },
    { name: 'Git', icon: SiGit },
    { name: 'Maven', icon: SiApachemaven },
    { name: 'JUnit', icon: SiJunit5 }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`transition-all duration-700 ease-in-out ${
          showStacks ? 'opacity-0 -translate-y-8' : 'opacity-100 translate-y-0'
        }`}
        style={{ position: showStacks ? 'absolute' : 'relative' }}
      >
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-3 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-primary-900/20 hover:bg-primary-900/30'
                  : 'bg-primary-100/50 hover:bg-primary-100'
              }`}
            >
              <div
                className={`text-2xl font-bold mb-1 transition-colors duration-300 ${
                  isDarkMode ? 'text-primary-300' : 'text-primary-700'
                }`}
              >
                {stat.value}
              </div>
              <div
                className={`text-xs transition-colors duration-300 ${
                  isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`transition-all duration-700 ease-in-out ${
          showStacks ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ position: showStacks ? 'relative' : 'absolute', top: showStacks ? 0 : 0 }}
      >
        <h3
          className={`text-sm font-semibold mb-3 transition-colors duration-300 ${
            isDarkMode ? 'text-dark-text' : 'text-light-text'
          }`}
        >
          Tech Stack
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {techs.map((tech, index) => (
            <div
              key={index}
              className={`group p-2 rounded-lg transition-all duration-300 flex items-center justify-center ${
                isDarkMode
                  ? 'bg-primary-900/20 hover:bg-primary-900/30'
                  : 'bg-primary-100/50 hover:bg-primary-100'
              }`}
              title={tech.name}
            >
              <tech.icon
                className={`w-5 h-5 transition-colors duration-300 ${
                  isDarkMode
                    ? 'text-primary-300 group-hover:text-primary-200'
                    : 'text-primary-700 group-hover:text-primary-800'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
