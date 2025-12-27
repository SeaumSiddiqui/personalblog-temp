import React, { useState, useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollControlsProps {
  isDarkMode: boolean;
  showScrollTop: boolean;
  scrollToTop: () => void;
}

export const ScrollControls: React.FC<ScrollControlsProps> = ({
  isDarkMode,
  showScrollTop,
  scrollToTop
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [waveAmplitude, setWaveAmplitude] = useState(5);
  const [waveOffset, setWaveOffset] = useState(0);
  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const animationFrame = useRef<number>();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));

      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = Math.abs(scrollTop - lastScrollTop.current);
      const velocity = timeDiff > 0 ? scrollDiff / timeDiff : 0;

      const targetAmplitude = Math.min(15, 5 + velocity * 100);
      setWaveAmplitude(prev => prev + (targetAmplitude - prev) * 0.1);

      lastScrollTop.current = scrollTop;
      lastScrollTime.current = currentTime;
    };

    updateScrollProgress();

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
    };
  }, []);

  useEffect(() => {
    const animateWave = () => {
      setWaveOffset(prev => (prev + 0.5) % 100);
      animationFrame.current = requestAnimationFrame(animateWave);
    };

    animationFrame.current = requestAnimationFrame(animateWave);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const createWavePath = () => {
    const width = 200;
    const height = 40;
    const amplitude = waveAmplitude;
    const frequency = 0.02;
    const offset = waveOffset;

    let path = `M 0 ${height}`;

    for (let x = 0; x <= width; x += 1) {
      const y = height / 2 +
        Math.sin((x + offset) * frequency) * amplitude +
        Math.sin((x + offset) * frequency * 2) * (amplitude / 3);
      path += ` L ${x} ${y}`;
    }

    path += ` L ${width} ${height} Z`;
    return path;
  };

  return (
    <>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-6 left-6 w-12 h-12 rounded-full border-2 transition-all duration-300
            flex items-center justify-center transform hover:scale-110 hover:shadow-lg backdrop-blur-sm z-40
            ${isDarkMode
              ? 'border-stone-600/50 bg-stone-800/50 hover:border-primary-400/70 hover:bg-primary-500/20'
              : 'border-grey-300/60 bg-white/80 hover:border-primary-500/70 hover:bg-primary-500/10 shadow-lg'
            }
          `}
          title="Scroll to top"
        >
          <ArrowUp className={`w-5 h-5 transition-colors duration-300 ${
            isDarkMode ? 'text-stone-300' : 'text-grey-600'
          }`} />
          <div className="absolute inset-0 rounded-full bg-primary-500 opacity-0 hover:opacity-10 transition-opacity duration-300" />
        </button>
      )}

      <div className="fixed bottom-0 left-0 w-full h-10 z-50 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 40"
          style={{
            width: `${Math.max(scrollProgress, 5)}%`,
            transition: 'width 0.1s ease-out'
          }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDarkMode ? 'rgba(192, 132, 252, 0.3)' : 'rgba(168, 85, 247, 0.3)'} />
              <stop offset="50%" stopColor={isDarkMode ? 'rgba(192, 132, 252, 0.5)' : 'rgba(168, 85, 247, 0.5)'} />
              <stop offset="100%" stopColor={isDarkMode ? 'rgba(192, 132, 252, 0.3)' : 'rgba(168, 85, 247, 0.3)'} />
            </linearGradient>
          </defs>
          <path
            d={createWavePath()}
            fill="url(#waveGradient)"
            opacity="0.8"
          />
          <path
            d={createWavePath()}
            fill="none"
            stroke={isDarkMode ? 'rgba(192, 132, 252, 0.6)' : 'rgba(168, 85, 247, 0.6)'}
            strokeWidth="0.5"
            opacity="0.6"
          />
        </svg>
      </div>
    </>
  );
};