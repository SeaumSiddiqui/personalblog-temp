import React from 'react';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { SocialLinks } from '../components/SocialLinks';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
import qcharitybdThumbnail from '../assets/thumbnails/projects/qcharitybd.png';
import personalblogThumbnail from '../assets/thumbnails/projects/personalblog.png';
import { ThemedLiquidEther } from '../components/portfolio/ThemedLequidEther';
import MagicBento, { BentoCard } from '../components/reactbits/MagicBento';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
  year: string;
  variant: 'square' | 'portrait' | 'banner' | 'wide';
}

export const ProjectArchive: React.FC = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  const glowColor = isDarkMode ? '59, 130, 246' : '37, 99, 235';

  const projects: Project[] = [
    {
      title: 'QCharity BD Portal',
      description: 'A comprehensive charity management platform for QCharity BD that streamlines donations, beneficiary management, and day-to-day operations. Features document workflow, payment tracking, and role-based access control.',
      technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Docker', 'AWS', 'Keycloak'],
      image: qcharitybdThumbnail,
      link: 'https://qcharitybd.com',
      year: '2025',
      variant: 'wide'
    },
    {
      title: 'Blog Writing Platform',
      description: 'A full-stack blog management system with authentication, role-based access control, and modern UI. Features markdown editor, image uploads, and responsive design.',
      technologies: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Keycloak', 'Docker'],
      image: personalblogThumbnail,
      link: 'https://seaumsiddiqui.com/blogs',
      year: '2025',
      variant: 'portrait'
    },
    //  DEMO / FAKE PROJECTS
    {
      title: 'TaskFlow – Project Management Dashboard',
      description:
        'A demo project management dashboard designed to track tasks, deadlines, and team productivity with a clean Kanban-style UI.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71',
      link: '#',
      year: '2024',
      variant: 'portrait'
    },
    {
      title: 'FinScope – Personal Finance Tracker',
      description:
        'A concept finance tracking app that visualizes income, expenses, and savings goals using interactive charts.',
      technologies: ['Next.js', 'TypeScript', 'Chart.js'],
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad',
      link: '#',
      year: '2024',
      variant: 'portrait'
    },
    {
      title: 'EduWave – Online Learning Platform',
      description:
        'A demo e-learning platform featuring course listings, video previews, and student progress tracking.',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f',
      link: '#',
      year: '2023',
      variant: 'wide'
    },
    {
      title: 'ShopEase – E-commerce UI Concept',
      description:
        'A modern e-commerce frontend concept with product browsing, filtering, and cart interactions.',
      technologies: ['React', 'Redux', 'CSS Modules'],
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f',
      link: '#',
      year: '2023',
      variant: 'portrait'
    },
    {
      title: 'HealthSync – Fitness & Wellness App',
      description:
        'A demo fitness and wellness application concept that tracks workouts, habits, and daily activity.',
      technologies: ['React Native', 'Expo', 'TypeScript'],
      image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74',
      link: '#',
      year: '2022',
      variant: 'portrait'
    }
  ];

  const handleProjectClick = (link?: string) => {
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
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

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 lg:px-12 lg:py-20">
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

        <MagicBento
          enableBorderGlow={true}
          glowColor={glowColor}
        >
          {projects.map((project, index) => (
            <BentoCard
              key={index}
              variant={project.variant}
              enableMagnetism={true}
              glowColor={glowColor}
              enableBorderGlow={true}
              onClick={() => handleProjectClick(project.link)}
              className={`group ${
                isDarkMode
                  ? 'bg-dark-card/80 border border-dark-border'
                  : 'bg-light-card/80 border border-light-border'
              } backdrop-blur-sm`}
            >
              <div className="relative w-full h-full flex flex-col">
                <div className={`relative overflow-hidden ${
                  project.variant === 'wide' ? 'h-48 md:h-64' :
                  project.variant === 'portrait' ? 'h-40' :
                  project.variant === 'banner' ? 'h-32' : 'h-36'
                }`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 ${
                    isDarkMode
                      ? 'bg-gradient-to-t from-dark-card via-dark-card/50 to-transparent'
                      : 'bg-gradient-to-t from-light-card via-light-card/50 to-transparent'
                  }`} />

                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      isDarkMode
                        ? 'bg-primary-500/20 text-primary-300'
                        : 'bg-primary-500/20 text-primary-700'
                    }`}>
                      {project.year}
                    </span>
                    {project.link && (
                      <span className={`p-1.5 rounded-full transition-colors ${
                        isDarkMode
                          ? 'bg-white/10 hover:bg-white/20'
                          : 'bg-black/10 hover:bg-black/20'
                      }`}>
                        <ExternalLink className={`w-3.5 h-3.5 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`} />
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1 p-5 flex flex-col">
                  <h3 className={`text-lg md:text-xl font-semibold mb-2 transition-colors ${
                    isDarkMode ? 'text-dark-text' : 'text-light-text'
                  }`}>
                    {project.title}
                  </h3>

                  <p className={`text-sm leading-relaxed mb-4 flex-1 ${
                    isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
                  } ${project.variant === 'square' || project.variant === 'banner' ? 'line-clamp-2' : 'line-clamp-4'}`}>
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.technologies.slice(0, project.variant === 'wide' || project.variant === 'portrait' ? 6 : 4).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-2 py-0.5 text-xs rounded-md transition-colors ${
                          isDarkMode
                            ? 'bg-dark-border text-dark-text-secondary'
                            : 'bg-light-border text-light-text-secondary'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > (project.variant === 'wide' || project.variant === 'portrait' ? 6 : 4) && (
                      <span className={`px-2 py-0.5 text-xs rounded-md ${
                        isDarkMode
                          ? 'bg-dark-border text-dark-text-secondary'
                          : 'bg-light-border text-light-text-secondary'
                      }`}>
                        +{project.technologies.length - (project.variant === 'wide' || project.variant === 'portrait' ? 6 : 4)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </BentoCard>
          ))}
        </MagicBento>
      </div>
    </div>
  );
};
