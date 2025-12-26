import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { ThemeToggle } from '../components/ThemeToggle';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PortfolioNavigation } from '../components/portfolio/PortfolioNavigation';
import { HeroSection } from '../components/portfolio/HeroSection';
import { SkillsSection } from '../components/portfolio/SkillsSection';
import { ProjectsSection } from '../components/portfolio/ProjectsSection';
import { ExperienceSection } from '../components/portfolio/ExperienceSection';
import { EducationSection } from '../components/portfolio/EducationSection';
import { ContactModal } from '../components/portfolio/ContactModal';
import { PortfolioFooter } from '../components/portfolio/PortfolioFooter';
import { ScrollControls } from '../components/portfolio/ScrollControls';

export const Portfolio: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { loading: authLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('about');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = ['about', 'experience', 'projects'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openContactModal = () => {
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };

  if (authLoading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode
          ? 'bg-dark-bg'
          : 'bg-light-bg'
      }`}>
        <LoadingSpinner isDarkMode={isDarkMode} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode
        ? 'bg-dark-bg'
        : 'bg-light-bg'
    }`}>
      {/* Subtle gradient spotlight effect */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${
            isDarkMode
              ? 'rgba(124, 58, 237, 0.06)'
              : 'rgba(124, 58, 237, 0.03)'
          }, transparent 80%)`
        }}
      />

      <div className="relative z-10">
        {/* Side Navigation */}
        <PortfolioNavigation
          isDarkMode={isDarkMode}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />

        {/* Theme Toggle - Top Right */}
        <div className="fixed right-6 top-6 z-50">
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>

        {/* Main Content */}
        <div className="lg:ml-0">
          <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-20 lg:px-24 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-4">
              {/* Left Column - Hero/Sticky */}
              <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
                <HeroSection
                  isDarkMode={isDarkMode}
                  scrollToSection={scrollToSection}
                  openContactModal={openContactModal}
                />
              </header>

              {/* Right Column - Scrollable Content */}
              <main className="pt-24 lg:w-1/2 lg:py-24">
                <SkillsSection isDarkMode={isDarkMode} />
                <ExperienceSection isDarkMode={isDarkMode} />
                <ProjectsSection isDarkMode={isDarkMode} />
                <EducationSection isDarkMode={isDarkMode} />

                {/* Footer text */}
                <PortfolioFooter
                  isDarkMode={isDarkMode}
                  openContactModal={openContactModal}
                />
              </main>
            </div>
          </div>
        </div>

        {/* Scroll Controls */}
        <ScrollControls
          isDarkMode={isDarkMode}
          showScrollTop={showScrollTop}
          scrollToTop={scrollToTop}
        />

        {/* Contact Modal */}
        <ContactModal
          isDarkMode={isDarkMode}
          isOpen={isContactModalOpen}
          onClose={closeContactModal}
        />
      </div>
    </div>
  );
};
