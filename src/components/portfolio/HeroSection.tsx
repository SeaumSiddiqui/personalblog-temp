import React, { useEffect, useState, useRef } from 'react';

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
  openContactModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDarkMode
}) => {
  const [nameVisible, setNameVisible] = useState<number[]>([]);
  const [roleVisible, setRoleVisible] = useState<number[]>([]);
  const [locationReady, setLocationReady] = useState(false);
  const [locationSpinComplete, setLocationSpinComplete] = useState(false);
  const animationTriggered = useRef(false);

  const nameWords = ['Seaum', 'Siddiqui'];
  const roleText = 'Backend Engineer';

  useEffect(() => {
    if (animationTriggered.current) return;
    animationTriggered.current = true;

    nameWords.forEach((_, index) => {
      setTimeout(() => {
        setNameVisible(prev => [...prev, index]);
      }, 200 + index * 250);
    });

    const roleDelay = 200 + nameWords.length * 250 + 200;
    roleText.split('').forEach((_, index) => {
      setTimeout(() => {
        setRoleVisible(prev => [...prev, index]);
      }, roleDelay + index * 50);
    });

    const locationDelay = roleDelay + roleText.length * 50 + 300;
    setTimeout(() => setLocationReady(true), locationDelay);
    setTimeout(() => setLocationSpinComplete(true), locationDelay + 800);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className={`text-5xl sm:text-6xl lg:text-7xl font-primary font-black tracking-tighter leading-tight transition-colors duration-300 ${
        isDarkMode ? 'text-dark-text' : 'text-light-text'
      }`}>
        {nameWords.map((word, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden mr-4"
          >
            <span
              className="inline-block transition-all duration-700 ease-out"
              style={{
                transform: nameVisible.includes(index) ? 'translateY(0)' : 'translateY(100%)',
                opacity: nameVisible.includes(index) ? 1 : 0,
              }}
            >
              {word}
            </span>
          </span>
        ))}
      </h1>

      <h2 className={`text-sm sm:text-base font-mono font-medium uppercase tracking-wide leading-relaxed transition-colors duration-300 ${
        isDarkMode ? 'text-slate-400' : 'text-slate-600'
      }`}>
        {roleText.split('').map((char, index) => (
          <span
            key={index}
            className="inline-block overflow-hidden"
            style={{ width: char === ' ' ? '0.3em' : 'auto' }}
          >
            <span
              className="inline-block transition-all duration-500 ease-out"
              style={{
                transform: roleVisible.includes(index) ? 'translateY(0)' : 'translateY(100%)',
                opacity: roleVisible.includes(index) ? 1 : 0,
                transitionDelay: `${index * 20}ms`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          </span>
        ))}
      </h2>

      <p className={`max-w-sm text-sm leading-loose ${
        isDarkMode ? 'text-slate-400' : 'text-slate-700'
      }`}>
        I build scalable backend systems and RESTful APIs using Spring Boot and microservices architecture.
      </p>

      <div className={`flex items-center gap-2 text-xs font-mono leading-relaxed ${
        isDarkMode ? 'text-slate-400' : 'text-slate-600'
      }`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`w-4 h-4 flex-shrink-0 transition-all duration-300 ${
            locationReady ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            animation: locationReady && !locationSpinComplete
              ? 'locationSpin 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              : locationSpinComplete
                ? 'locationFloat 3s ease-in-out infinite'
                : 'none',
          }}
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>Dhaka, Bangladesh</span>
      </div>

      <style>{`
        @keyframes locationSpin {
          0% {
            transform: rotate(0deg) scale(0.5);
            opacity: 0;
          }
          50% {
            transform: rotate(360deg) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: rotate(720deg) scale(1);
            opacity: 1;
          }
        }
        @keyframes locationFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
      `}</style>
    </div>
  );
};
