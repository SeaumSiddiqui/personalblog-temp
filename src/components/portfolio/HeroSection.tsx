import React from 'react';

interface HeroSectionProps {
  isDarkMode: boolean;
  scrollToSection: (sectionId: string) => void;
  openContactModal: () => void;
  nameRef?: React.MutableRefObject<HTMLHeadingElement | null>;
  roleRef?: React.MutableRefObject<HTMLHeadingElement | null>;
  descriptionRef?: React.MutableRefObject<HTMLParagraphElement | null>;
  locationIconRef?: React.MutableRefObject<SVGSVGElement | null>;
  locationTextRef?: React.MutableRefObject<HTMLSpanElement | null>;
}

const NAME_WORDS = ['Seaum', 'Siddiqui'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  isDarkMode,
  nameRef,
  roleRef,
  descriptionRef,
  locationIconRef,
  locationTextRef,
}) => {
  const roleWords = ['Backend', 'Engineer'];

  return (
    <div className="space-y-4">
      <h1
        ref={(el) => { if (nameRef) nameRef.current = el; }}
        className={`text-5xl sm:text-6xl lg:text-7xl font-heading font-bold tracking-tight leading-none transition-colors duration-300 ${
          isDarkMode ? 'text-dark-text' : 'text-light-text'
        }`}
      >
        {NAME_WORDS.map((word, index) => (
          <span
            key={index}
            className="gsap-name-word inline-block mr-4"
            style={{ visibility: 'hidden', opacity: 0, clipPath: 'inset(0 100% 0 0)' }}
          >
            {word}
          </span>
        ))}
      </h1>

      <h2
        ref={(el) => { if (roleRef) roleRef.current = el; }}
        className={`text-sm sm:text-base font-mono font-medium uppercase tracking-wide transition-colors duration-300 ${
          isDarkMode ? 'text-slate-400' : 'text-slate-600'
        }`}
      >
        {roleWords.map((word, index) => (
          <span
            key={index}
            className="gsap-role-word inline-block mr-2"
            style={{ visibility: 'hidden', opacity: 0 }}
          >
            {word}
          </span>
        ))}
      </h2>

      <p
        ref={(el) => { if (descriptionRef) descriptionRef.current = el; }}
        className={`max-w-sm text-sm leading-relaxed ${
          isDarkMode ? 'text-slate-400' : 'text-slate-700'
        }`}
        style={{ visibility: 'hidden', opacity: 0 }}
      >
        I build scalable backend systems and RESTful APIs
        <br />
        using <span className={isDarkMode ? 'text-slate-200 font-medium' : 'text-slate-900 font-medium'}>Java, Spring Boot</span> and <span className={isDarkMode ? 'text-slate-200 font-medium' : 'text-slate-900 font-medium'}>microservices architecture</span>.
      </p>

      <div className={`flex items-center gap-2 text-xs font-mono ${
        isDarkMode ? 'text-slate-400' : 'text-slate-600'
      }`}>
        <div className="overflow-visible p-1" style={{ perspective: '400px' }}>
          <svg
            ref={(el) => { if (locationIconRef) locationIconRef.current = el; }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 flex-shrink-0"
            style={{ visibility: 'hidden', opacity: 0, willChange: 'transform' }}
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="overflow-hidden">
          <span
            ref={(el) => { if (locationTextRef) locationTextRef.current = el; }}
            style={{ visibility: 'hidden', opacity: 0, display: 'inline-block' }}
          >
            Dhaka, Bangladesh
          </span>
        </div>
      </div>

      <style>{`
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
