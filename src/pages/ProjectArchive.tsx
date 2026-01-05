import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { ThemeToggle } from '../components/ThemeToggle';
import { SocialLinks } from '../components/SocialLinks';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../context/ThemeContext';
import qcharitybdThumbnail from '../assets/thumbnails/projects/qcharitybd.png';
import personalblogThumbnail from '../assets/thumbnails/projects/personalblog.png';
import { ThemedLiquidEther } from '../components/portfolio/ThemedLequidEther';
import MagicBento from '../components/reactbits/MagicBento';

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

  const projects: Project[] = [
    {
      title: 'QCharity BD Portal',
      description: 'A comprehensive charity management platform for QCharity BD that streamlines donations, beneficiary management, and day-to-day operations. Features document workflow, payment tracking, and role-based access control.',
      technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Docker', 'AWS', 'Keycloak'],
      image: qcharitybdThumbnail,
      link: 'https://qcharitybd.com',
      year: '2025'
    },
    {
      title: 'Blog Writing Platform',
      description: 'A full-stack blog management system with authentication, role-based access control, and modern UI. Features markdown editor, image uploads, and responsive design with a clean, elegant interface.',
      technologies: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Keycloak', 'Docker'],
      image: personalblogThumbnail,
      link: 'https://seaumsiddiqui.com/blogs',
      year: '2025'
    },
  ];

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

        <MagicBento
          projects={projects}
          isDarkMode={isDarkMode}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          clickEffect={true}
          enableMagnetism={true}
          particleCount={10}
        />
      </div>
    </div>
  );
};
