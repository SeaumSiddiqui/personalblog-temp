import React from 'react';
import { MapPin } from 'lucide-react';

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
  openContactModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDarkMode
}) => {
  return (
    <div className="space-y-4">
      <h1 className={`text-4xl sm:text-5xl font-primary font-black tracking-tighter transition-colors duration-300 ${
        isDarkMode ? 'text-dark-text' : 'text-light-text'
      }`}>
        Seaum Siddiqui
      </h1>

      <h2 className={`text-xl sm:text-2xl font-heading font-semibold transition-colors duration-300 ${
        isDarkMode ? 'text-dark-text' : 'text-light-text'
      }`}>
        Backend Engineer
      </h2>

      <p className="max-w-sm text-base leading-relaxed text-slate-400">
        I build scalable backend systems and RESTful APIs using Spring Boot and microservices architecture.
      </p>

      <div className="flex items-center gap-2 text-sm text-slate-400">
        <MapPin size={16} className="flex-shrink-0" />
        <span>Dhaka, Bangladesh</span>
      </div>
    </div>
  );
};
