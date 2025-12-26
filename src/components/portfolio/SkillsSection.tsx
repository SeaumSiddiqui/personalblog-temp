import React from 'react';
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

interface SkillsSectionProps {
  isDarkMode: boolean;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ isDarkMode }) => {
  const skills = [
    'Spring Boot',
    'Java',
    'Spring Security',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'AWS',
    'Docker',
    'Kubernetes',
    'Git',
    'Maven',
    'JUnit'
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
          <ul className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <li
                key={index}
                className={`px-3 py-1 text-xs rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-primary-900/30 text-primary-300 hover:bg-primary-900/50'
                    : 'bg-primary-100 text-primary-700 hover:bg-primary-200'
                }`}
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
