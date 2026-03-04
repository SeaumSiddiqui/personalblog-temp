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
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= 0;
        if (isVisible !== showStacks) {
          setIsTransitioning(true);
          setTimeout(() => {
            setShowStacks(isVisible);
            setTimeout(() => setIsTransitioning(false), 50);
          }, 10);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [showStacks]);

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

  const springAnimation = {
    animation: isTransitioning ? 'spring-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
  };

  return (
    <>
      <style>{`
        @keyframes spring-bounce {
          0% {
            transform: scale(0.85) translateY(10px);
            opacity: 0;
          }
          50% {
            transform: scale(1.02) translateY(-2px);
          }
          100% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-out-up {
          0% {
            transform: scale(1) translateY(0);
            opacity: 1;
          }
          100% {
            transform: scale(0.95) translateY(-20px);
            opacity: 0;
          }
        }

        .card-enter {
          animation: spring-bounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .card-exit {
          animation: fade-out-up 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        .stagger-1 { animation-delay: 0.05s; }
        .stagger-2 { animation-delay: 0.1s; }
        .stagger-3 { animation-delay: 0.15s; }
        .stagger-4 { animation-delay: 0.2s; }
        .stagger-5 { animation-delay: 0.25s; }
        .stagger-6 { animation-delay: 0.3s; }
      `}</style>

      <div className="relative w-full mt-3" style={{ minHeight: '120px' }}>
        <div
          className={`transition-opacity duration-300 ${
            showStacks ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          style={{
            position: showStacks ? 'absolute' : 'relative',
            width: '100%',
            top: 0,
            left: 0
          }}
        >
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  !showStacks && isTransitioning ? 'card-enter' : ''
                } ${
                  showStacks && !isTransitioning ? 'card-exit' : ''
                } stagger-${index + 1} ${
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
          className={`transition-opacity duration-300 ${
            showStacks ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          style={{
            position: showStacks ? 'relative' : 'absolute',
            width: '100%',
            top: 0,
            left: 0
          }}
        >
          <div className="grid grid-cols-3 gap-2">
            {techs.map((tech, index) => (
              <a
                key={index}
                href="#"
                className={`group flex flex-col items-center gap-2 p-3 rounded-lg transition-all duration-300 ${
                  showStacks && isTransitioning ? 'card-enter' : ''
                } ${
                  !showStacks && !isTransitioning ? 'card-exit' : ''
                } stagger-${index + 1} ${
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
      </div>
    </>
  );
};
