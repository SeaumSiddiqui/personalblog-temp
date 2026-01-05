import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import projectThumbnail from '../../assets/thumbnails/projects/personalblog.png';
import { ProjectBento } from './ProjectBento';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
}

interface ProjectsSectionProps {
  isDarkMode: boolean;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ isDarkMode }) => {
  const projects: Project[] = [
    {
      title: 'QCharity BD Portal',
      description: 'A comprehensive charity management platform for QCharity BD that streamlines donations, beneficiary management, and day-to-day operations. Features document workflow, payment tracking, and role-based access control.',
      technologies: ['Spring Boot', 'React', 'PostgreSQL', 'Docker', 'AWS', 'Keycloak'],
      image: projectThumbnail,
      link: 'https://qcharitybd.com'
    },
    {
      title: 'Blog Writing Platform',
      description: 'A full-stack blog management system with authentication, role-based access control, and modern UI. Features markdown editor, image uploads, and responsive design with a clean, elegant interface.',
      technologies: ['Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Keycloak', 'Docker'],
      image: projectThumbnail,
      link: 'https://seaumsiddiqui.com/blogs'
    }
  ];

  return (
    <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-opacity-75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className={`text-sm font-bold uppercase tracking-widest transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          Projects
        </h2>
      </div>

      <div className="mb-12">
        <ProjectBento
          projects={projects}
          isDarkMode={isDarkMode}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          clickEffect={true}
          enableMagnetism={true}
          particleCount={8}
        />
      </div>

      <div className="mt-12">
        <Link
          to="/projects"
          className={`group inline-flex items-center text-sm font-semibold transition-colors duration-300 ${
            isDarkMode
              ? 'text-primary-400 hover:text-primary-300'
              : 'text-primary-600 hover:text-primary-700'
          }`}
        >
          <span>View Full Project Archive</span>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};
