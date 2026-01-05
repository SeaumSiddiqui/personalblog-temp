import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { ThemeToggle } from '../components/ThemeToggle';
import { SocialLinks } from '../components/SocialLinks';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { PortfolioNavigation } from '../components/portfolio/PortfolioNavigation';
import { HeroSection } from '../components/portfolio/HeroSection';
import { SidebarContent } from '../components/portfolio/SidebarContent';
import { ProfileImage } from '../components/portfolio/ProfileImage';
import { ProjectsSection } from '../components/portfolio/ProjectsSection';
import { ExperienceSection } from '../components/portfolio/ExperienceSection';
import { BlogSection } from '../components/portfolio/BlogSection';
import { ContactModal } from '../components/portfolio/ContactModal';
import { PortfolioFooter } from '../components/portfolio/PortfolioFooter';
import { ScrollControls } from '../components/portfolio/ScrollControls';
import { ThemedLiquidEther } from '../components/portfolio/ThemedLequidEther';
import SparkContainer from '@kamiru/react-spark';

export const Portfolio: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { loading: authLoading } = useAuth();
  const [activeSection, setActiveSection] = useState('about');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);

      const sections = ['about', 'experience', 'projects', 'blogs'];
      const scrollPosition = window.scrollY + 100;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      if (scrollPosition + windowHeight >= documentHeight - 50) {
        setActiveSection('blogs');
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
    <SparkContainer color={isDarkMode ? '#b794f6' : '#9333ea'}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-dark-bg'
          : 'bg-light-bg'
      }`}>
      <div className="fixed inset-0 w-full h-full pointer-events-none">
        <ThemedLiquidEther
          isDarkMode={isDarkMode}
          mouseForce={15}
          cursorSize={30}
          isViscous={false}
          viscous={20}
          iterationsViscous={16}
          iterationsPoisson={16}
          resolution={0.3}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.3}
          autoIntensity={1.5}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      <div className="relative z-10">
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-6">
          <SocialLinks layout="vertical" size="medium" />
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </div>

        <div className="lg:ml-0">
          <div className="mx-auto min-h-screen max-w-screen-2xl px-6 py-12 md:px-12 md:py-20 lg:px-32 lg:py-0">
            <div className="lg:flex lg:justify-between lg:gap-16">
              <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24">
                <div>
                  <HeroSection
                    isDarkMode={isDarkMode}
                    scrollToSection={scrollToSection}
                    openContactModal={openContactModal}
                  />

                  <PortfolioNavigation
                    isDarkMode={isDarkMode}
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                  />
                </div>

                <div className="hidden lg:block">
                  <SidebarContent isDarkMode={isDarkMode} />
                </div>
              </header>

              <main className="pt-24 lg:w-1/2 lg:py-24">
                <div id="about">
                  <ProfileImage isDarkMode={isDarkMode} />
                </div>
                <ExperienceSection isDarkMode={isDarkMode} />
                <div className="mb-16" />
                <ProjectsSection isDarkMode={isDarkMode} />
                <div className="mb-16" />
                <BlogSection isDarkMode={isDarkMode} />

                <PortfolioFooter
                  isDarkMode={isDarkMode}
                  openContactModal={openContactModal}
                />
              </main>
            </div>
          </div>
        </div>

        <ScrollControls
          isDarkMode={isDarkMode}
          showScrollTop={showScrollTop}
          scrollToTop={scrollToTop}
        />

        <ContactModal
          isDarkMode={isDarkMode}
          isOpen={isContactModalOpen}
          onClose={closeContactModal}
        />
      </div>
      </div>
    </SparkContainer>
  );
};
