import React from 'react';
import { SiNextdotjs, SiTailwindcss, SiNodedotjs } from 'react-icons/si';
import { ExternalLink } from 'lucide-react';

interface SkillsSectionProps {
  isDarkMode: boolean;
}

interface Skill {
  name: string;
  version?: string;
  icon: React.ComponentType<any>;
  url?: string;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode }) => {
  const skills: Skill[] = [
    { name: 'Next.JS', version: 'Version 15+', icon: SiNextdotjs, url: 'https://nextjs.org' },
    { name: 'Tailwind CSS', icon: SiTailwindcss, url: 'https://tailwindcss.com' },
    { name: 'ShadCN/UI', icon: () => <div className="w-6 h-6 flex items-center justify-center font-bold">S</div>, url: 'https://ui.shadcn.com' },
    { name: 'Node.JS', version: 'Version 20.17.0', icon: SiNodedotjs, url: 'https://nodejs.org' }
  ];

  return (
    <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-opacity-75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          About
        </h2>
      </div>

      <div className="space-y-6">
        <p className={`text-base leading-relaxed transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}>
          Back in 2020, I discovered my passion for backend development when I built my first REST API.
          Fast-forward to today, and I've had the privilege of building scalable microservices, designing robust
          database schemas, and architecting cloud-native applications.
        </p>

        <p className={`text-base leading-relaxed transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}>
          My main focus these days is building accessible, performant backend systems that power modern applications.
          I enjoy working with Spring Boot ecosystem and exploring new technologies that solve real-world problems.
        </p>

        <p className={`text-base leading-relaxed transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}>
          When I'm not coding, you can find me exploring new technologies, contributing to open source, or writing
          about software development on my blog.
        </p>

        <div className="mt-8">
          <h3 className={`text-sm font-semibold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-dark-text' : 'text-light-text'
          }`}>
            Technologies I work with
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <a
                  key={index}
                  href={skill.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-slate-900/80 hover:bg-slate-800/80'
                      : 'bg-slate-100/80 hover:bg-slate-200/80'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isDarkMode ? 'bg-primary-500/20' : 'bg-primary-500/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      isDarkMode ? 'text-primary-400' : 'text-primary-600'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className={`font-medium ${
                      isDarkMode ? 'text-slate-100' : 'text-slate-900'
                    }`}>
                      {skill.name}
                    </div>
                    {skill.version && (
                      <div className={`text-xs ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-600'
                      }`}>
                        {skill.version}
                      </div>
                    )}
                  </div>
                  <ExternalLink className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`} />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
