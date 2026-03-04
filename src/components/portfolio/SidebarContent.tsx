import React, { useEffect, useState } from 'react';
import { Briefcase, Users, Award } from 'lucide-react';
import { ExternalLink } from 'lucide-react';
import {
  SiOpenjdk,
  SiSpringboot,
  SiMysql,
  SiDocker,
  SiGithub,
  SiApachemaven
} from 'react-icons/si';
import GitHubHeatmap from './GitHubHeatmap';

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

type SectionType = 'stats' | 'stacks' | 'github';

export const SidebarContent: React.FC<SidebarContentProps> = ({ isDarkMode }) => {
  const [activeSection, setActiveSection] = useState<SectionType>('stats');

  useEffect(() => {
    const handleScroll = () => {
      const experienceSection = document.getElementById('experience');
      const projectsSection = document.getElementById('projects');

      if (!experienceSection || !projectsSection) return;

      const experienceRect = experienceSection.getBoundingClientRect();
      const projectsRect = projectsSection.getBoundingClientRect();

      const viewportMiddle = window.innerHeight / 2;

      if (projectsRect.top <= viewportMiddle && projectsRect.bottom >= 0) {
        setActiveSection('github');
      } else if (experienceRect.top <= viewportMiddle && experienceRect.bottom >= 0) {
        setActiveSection('stacks');
      } else {
        setActiveSection('stats');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const techs: Tech[] = [
    { name: 'Java', icon: SiOpenjdk },
    { name: 'Spring Boot', icon: SiSpringboot },
    { name: 'MySQL', icon: SiMysql },
    { name: 'Docker', icon: SiDocker },
    { name: 'GitHub', icon: SiGithub },
    { name: 'Maven', icon: SiApachemaven }
  ];

  const stats: Stat[] = [
    { label: 'Projects', value: '2+' },
    { label: 'Clients', value: '1+' },
    { label: 'Yrs Expertise', value: '0+' }
  ];

  return (
    <div className="relative w-full overflow-hidden mt-3">
      <style>{`
        .sidebar-transition {
          transition: opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      filter 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
      `}</style>

      <div
        className="sidebar-transition will-change-transform"
        style={{
          position: activeSection === 'stats' ? 'relative' : 'absolute',
          width: '100%',
          opacity: activeSection === 'stats' ? 1 : 0,
          transform: activeSection === 'stats'
            ? 'translateY(0) scale(1)'
            : 'translateY(-20px) scale(0.95)',
          filter: activeSection === 'stats' ? 'blur(0px)' : 'blur(8px)',
          pointerEvents: activeSection === 'stats' ? 'auto' : 'none',
        }}
      >
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-black/60 border border-slate-800'
                  : 'bg-white/60 border border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className={`p-1 rounded ${
                  isDarkMode ? 'bg-primary-500/20' : 'bg-primary-500/10'
                }`}>
                  {index === 0 && <Briefcase className={`w-3.5 h-3.5 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />}
                  {index === 1 && <Users className={`w-3.5 h-3.5 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />}
                  {index === 2 && <Award className={`w-3.5 h-3.5 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />}
                </div>
                <div className={`text-xl font-mono font-bold ${
                  isDarkMode ? 'text-slate-100' : 'text-slate-900'
                }`}>
                  {stat.value}
                </div>
              </div>
              <div className={`text-xs font-mono font-medium ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="sidebar-transition will-change-transform"
        style={{
          position: activeSection === 'stacks' ? 'relative' : 'absolute',
          width: '100%',
          top: 0,
          opacity: activeSection === 'stacks' ? 1 : 0,
          transform: activeSection === 'stacks'
            ? 'translateY(0) scale(1)'
            : activeSection === 'stats'
              ? 'translateY(20px) scale(0.95)'
              : 'translateY(-20px) scale(0.95)',
          filter: activeSection === 'stacks' ? 'blur(0px)' : 'blur(8px)',
          pointerEvents: activeSection === 'stacks' ? 'auto' : 'none',
        }}
      >
        <div className="grid grid-cols-3 gap-2">
          {techs.map((tech, index) => (
            <a
              key={index}
              href="#"
              className={`group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                isDarkMode
                  ? 'bg-black/60 border border-slate-800 hover:bg-black/80'
                  : 'bg-white/60 border border-slate-300 hover:bg-white/80'
              }`}
            >
              <div className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-primary-500/20' : 'bg-primary-500/10'
              }`}>
                <tech.icon className={`w-5 h-5 ${
                  isDarkMode ? 'text-primary-400' : 'text-primary-600'
                }`} />
              </div>
              <div className="flex items-center gap-1">
                <div className={`text-xs font-mono font-medium text-center ${
                  isDarkMode ? 'text-slate-300' : 'text-slate-700'
                }`}>
                  {tech.name}
                </div>
                <ExternalLink className={`w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity ${
                  isDarkMode ? 'text-slate-400' : 'text-slate-600'
                }`} />
              </div>
            </a>
          ))}
        </div>
      </div>

      <div
        className="sidebar-transition will-change-transform"
        style={{
          position: activeSection === 'github' ? 'relative' : 'absolute',
          width: '100%',
          top: 0,
          opacity: activeSection === 'github' ? 1 : 0,
          transform: activeSection === 'github'
            ? 'translateY(0) scale(1)'
            : 'translateY(20px) scale(0.95)',
          filter: activeSection === 'github' ? 'blur(0px)' : 'blur(8px)',
          pointerEvents: activeSection === 'github' ? 'auto' : 'none',
        }}
      >
        <div className="p-4 rounded-lg">
          <GitHubHeatmap />
        </div>
      </div>
    </div>
  );
};
