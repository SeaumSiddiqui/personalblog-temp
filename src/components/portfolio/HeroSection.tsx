import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Linkedin, Mail, FileText } from 'lucide-react';

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
  openContactModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDarkMode,
  scrollToSection,
  openContactModal
}) => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/seaum-siddiqui', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Mail, onClick: openContactModal, label: 'Email' }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className={`text-4xl sm:text-5xl font-bold tracking-tight transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          Seaum Siddiqui
        </h1>

        <h2 className={`text-xl sm:text-2xl font-semibold transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}>
          Backend Developer
        </h2>

        <p className={`max-w-sm text-base leading-relaxed transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text-secondary' : 'text-light-text-secondary'
        }`}>
          I build robust, scalable backend systems and RESTful APIs.
          Specialized in Spring Boot and microservices architecture.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/blogs"
            className={`group inline-flex items-center space-x-2 text-sm font-semibold transition-colors duration-300 ${
              isDarkMode
                ? 'text-primary-400 hover:text-primary-300'
                : 'text-primary-600 hover:text-primary-700'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Read My Blog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {socialLinks.map((link, index) => (
            link.onClick ? (
              <button
                key={index}
                onClick={link.onClick}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'text-dark-text-secondary hover:text-primary-400 hover:bg-dark-border'
                    : 'text-light-text-secondary hover:text-primary-600 hover:bg-light-border'
                }`}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </button>
            ) : (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode
                    ? 'text-dark-text-secondary hover:text-primary-400 hover:bg-dark-border'
                    : 'text-light-text-secondary hover:text-primary-600 hover:bg-light-border'
                }`}
                aria-label={link.label}
              >
                <link.icon className="w-5 h-5" />
              </a>
            )
          ))}
        </div>
      </div>
    </div>
  );
};
