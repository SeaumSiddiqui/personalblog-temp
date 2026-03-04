import React, { useEffect, useState, useRef } from 'react';

interface AnimatedHeadingProps {
  text: string;
  isDarkMode: boolean;
  className?: string;
}

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  text,
  isDarkMode,
  className = ''
}) => {
  const [visibleChars, setVisibleChars] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            text.split('').forEach((_, index) => {
              setTimeout(() => {
                setVisibleChars(prev => [...prev, index]);
              }, index * 40);
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (headingRef.current) {
      observer.observe(headingRef.current);
    }

    return () => observer.disconnect();
  }, [text, hasAnimated]);

  return (
    <h2
      ref={headingRef}
      className={`text-sm font-heading font-semibold uppercase tracking-widest leading-relaxed transition-colors duration-300 ${
        isDarkMode ? 'text-dark-text' : 'text-light-text'
      } ${className}`}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden"
          style={{ width: char === ' ' ? '0.3em' : 'auto' }}
        >
          <span
            className="inline-block transition-all duration-400 ease-out"
            style={{
              transform: visibleChars.includes(index) ? 'translateY(0)' : 'translateY(100%)',
              opacity: visibleChars.includes(index) ? 1 : 0,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        </span>
      ))}
    </h2>
  );
};
