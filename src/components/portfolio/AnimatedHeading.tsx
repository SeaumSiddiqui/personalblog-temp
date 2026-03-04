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
  const [visibleWords, setVisibleWords] = useState<number[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const words = text.split(' ');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            words.forEach((_, index) => {
              setTimeout(() => {
                setVisibleWords(prev => [...prev, index]);
              }, index * 80);
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
  }, [text, hasAnimated, words.length]);

  return (
    <h2
      ref={headingRef}
      className={`text-sm font-heading font-semibold uppercase tracking-widest transition-colors duration-300 ${
        isDarkMode ? 'text-dark-text' : 'text-light-text'
      } ${className}`}
    >
      {words.map((word, index) => (
        <span
          key={index}
          className="inline-block overflow-hidden mr-2"
        >
          <span
            className="inline-block transition-all duration-400 ease-out"
            style={{
              transform: visibleWords.includes(index) ? 'translateY(0)' : 'translateY(100%)',
              opacity: visibleWords.includes(index) ? 1 : 0,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </h2>
  );
};
