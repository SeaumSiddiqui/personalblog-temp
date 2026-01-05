import React, { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { SocialLinks } from '../components/SocialLinks';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
import projectThumbnail from '../assets/thumbnails/projects/personalblog.png';
import { ThemedLiquidEther } from '../components/ThemedLiquidEther';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  year: string;
}

export const ProjectArchive: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      title: 'QCharity BD Portal',
      description: 'A comprehensive charity management platform for QCharity BD that streamlines donations, beneficiary management, and day-to-day operations. Features document workflow, payment tracking, and role-based access control.',
      technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Docker', 'AWS', 'Keycloak'],
      image: projectThumbnail,
      link: 'https://qcharitybd.com',
      year: '2025'
    },
    {
      title: 'Blog Writing Platform',
      description: 'A full-stack blog management system with authentication, role-based access control, and modern UI. Features markdown editor, image uploads, and responsive design with a clean, elegant interface.',
      technologies: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Keycloak', 'Docker'],
      image: projectThumbnail,
      link: 'https://seaumsiddiqui.com/blogs',
      year: '2025'
    },
  ];

  const toggleExpand = (index: number) => {
    setExpandedProject(expandedProject === index ? null : index);
  };

  return (
    <div className={`min-h-screen relative transition-colors duration-300 ${
      isDarkMode ? 'bg-dark-bg' : 'bg-light-bg'
    }`}>
      <div className="absolute inset-0 w-full h-full">
        <ThemedLiquidEther
          isDarkMode={isDarkMode}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-6">
        <SocialLinks layout="vertical" size="medium" />
        <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 lg:px-12 lg:py-20">
        <div className="mb-12">
          <Link
            to="/"
            className={`inline-flex items-center text-sm mb-4 transition-colors duration-300 ${
              isDarkMode
                ? 'text-primary-400 hover:text-primary-300'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Link>
          <h1 className={`text-4xl font-bold mb-4 transition-colors duration-300 ${
            isDarkMode ? 'text-dark-text' : 'text-light-text'
          }`}>
            All Projects
          </h1>
          <p className={`text-lg transition-colors duration-300 ${
            isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
          }`}>
            A comprehensive collection of my work
          </p>
        </div>

        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`rounded-lg border transition-all duration-300 overflow-hidden backdrop-blur-md ${
                isDarkMode
                  ? 'bg-dark-card/80 border-dark-border hover:border-primary-500/50'
                  : 'bg-light-card/80 border-light-border hover:border-primary-400/50'
              }`}
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-xl font-semibold transition-colors duration-300 ${
                        isDarkMode ? 'text-dark-text' : 'text-light-text'
                      }`}>
                        {project.title}
                      </h3>
                      <span className={`text-sm px-2 py-1 rounded transition-colors duration-300 ${
                        isDarkMode
                          ? 'bg-primary-900/30 text-primary-300'
                          : 'bg-primary-100 text-primary-700'
                      }`}>
                        {project.year}
                      </span>
                    </div>
                    <p className={`text-sm mb-3 transition-colors duration-300 ${
                      isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                    }`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`text-xs px-2 py-1 rounded transition-colors duration-300 ${
                            isDarkMode
                              ? 'bg-dark-bg text-dark-text-secondary'
                              : 'bg-light-bg text-light-text-secondary'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded transition-colors duration-300 ${
                          isDarkMode
                            ? 'text-primary-400 hover:bg-primary-900/20'
                            : 'text-primary-600 hover:bg-primary-100'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    <button
                      className={`p-2 rounded transition-colors duration-300 ${
                        isDarkMode
                          ? 'text-dark-text-secondary hover:bg-dark-bg'
                          : 'text-light-text-secondary hover:bg-light-bg'
                      }`}
                    >
                      {expandedProject === index ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {expandedProject === index && (
                <div className={`px-6 pb-6 border-t transition-colors duration-300 ${
                  isDarkMode ? 'border-dark-border' : 'border-light-border'
                }`}>
                  <div className="mt-4">
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full rounded-lg border-2 transition-colors duration-300 ${
                        isDarkMode ? 'border-dark-border' : 'border-light-border'
                      }`}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
