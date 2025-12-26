import React, { useEffect, useState } from 'react';
import { Briefcase, Users, Award } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import {
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiSpringboot
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

  const techs: Tech[] = [
    { name: 'Next.JS', icon: SiNextdotjs },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'ShadCN/UI', icon: SiSpringboot },
    { name: 'Node.JS', icon: SiNodedotjs }
  ];

  const stats: Stat[] = [
    { label: 'Projects', value: '19+' },
    { label: 'Clients', value: '9+' },
    { label: 'Yrs Expertise', value: '4+' }
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
              className={`p-4 rounded-xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-900/90'
                  : 'bg-slate-200/90'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`p-1.5 rounded-lg ${
                  isDarkMode ? 'bg-primary-500/20' : 'bg-primary-500/10'
                }`}>
                  {index === 0 && <Briefcase className={`w-4 h-4 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />}
                  {index === 1 && <Users className={`w-4 h-4 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />}
                  {index === 2 && <Award className={`w-4 h-4 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />}
                </div>
                <div className={`text-2xl font-bold ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {stat.value}
                </div>
              </div>
              <div className={`text-xs font-medium ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
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
        <div className="grid grid-cols-2 gap-3">
          {techs.slice(0, 4).map((tech, index) => (
            <a
              key={index}
              href="#"
              className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                isDarkMode
                  ? 'bg-slate-900/90 hover:bg-slate-800/90'
                  : 'bg-slate-200/90 hover:bg-slate-300/90'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-primary-500/20' : 'bg-primary-500/10'
              }`}>
                {index === 2 ? (
                  <div className={`w-5 h-5 flex items-center justify-center font-bold text-xs ${
                    isDarkMode ? 'text-primary-400' : 'text-primary-600'
                  }`}>
                    S
                  </div>
                ) : (
                  <tech.icon className={`w-5 h-5 ${
                    isDarkMode ? 'text-primary-400' : 'text-primary-600'
                  }`} />
                )}
              </div>
              <div className="flex-1">
                <div className={`text-sm font-medium ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {tech.name}
                </div>
                {(index === 0 || index === 3) && (
                  <div className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>
                    Version {index === 0 ? '15+' : '20.17.0'}
                  </div>
                )}
              </div>
              <ExternalLink className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
