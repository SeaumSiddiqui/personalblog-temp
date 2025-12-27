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
  const [waveAmplitude, setWaveAmplitude] = useState(0);
  const [waveOffset, setWaveOffset] = useState(0);
  const [waveOpacity, setWaveOpacity] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const lastScrollTop = useRef(0);
  const lastScrollTime = useRef(Date.now());
  const scrollTimeout = useRef<NodeJS.Timeout>();
  const animationFrame = useRef<number>();

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrollPercent)));

      const currentTime = Date.now();
      const timeDiff = currentTime - lastScrollTime.current;
      const scrollDiff = scrollTop - lastScrollTop.current;
      const velocity = timeDiff > 0 ? Math.abs(scrollDiff) / timeDiff : 0;

      if (scrollDiff !== 0) {
        setScrollDirection(scrollDiff > 0 ? 'down' : 'up');
      }

      const targetAmplitude = Math.min(20, 8 + velocity * 150);
      setWaveAmplitude(prev => prev + (targetAmplitude - prev) * 0.15);

      const progressFade = Math.sin((scrollPercent / 100) * Math.PI);
      const targetOpacity = Math.min(1, velocity * 200) * progressFade;
      setWaveOpacity(prev => prev + (targetOpacity - prev) * 0.2);

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        setWaveAmplitude(prev => prev + (0 - prev) * 0.1);
        setWaveOpacity(prev => prev + (0 - prev) * 0.1);
      }, 150);

      lastScrollTop.current = scrollTop;
      lastScrollTime.current = currentTime;
    };

    updateScrollProgress();

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    window.addEventListener('resize', updateScrollProgress, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollProgress);
      window.removeEventListener('resize', updateScrollProgress);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    const animateWave = () => {
      const speed = scrollDirection === 'down' ? 1 : -1;
      setWaveOffset(prev => (prev + speed) % 200);
      animationFrame.current = requestAnimationFrame(animateWave);
    };

    animationFrame.current = requestAnimationFrame(animateWave);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [scrollDirection]);

  const createOceanWavePath = () => {
    const width = 100;
    const height = 40;
    const amplitude = waveAmplitude;
    const offset = waveOffset;

    const segments = 200;
    let path = `M 0 ${height}`;

    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width;
      const normalizedX = x + offset * 0.5;

      const wave1 = Math.sin((normalizedX * 0.05)) * amplitude * 0.6;
      const wave2 = Math.sin((normalizedX * 0.08 + 2)) * amplitude * 0.4;
      const wave3 = Math.sin((normalizedX * 0.15 + 4)) * amplitude * 0.3;

      const crest = Math.exp(-Math.pow((normalizedX % 40) - 15, 2) / 50) * amplitude * 0.8;

      const y = height - (height * 0.3 + wave1 + wave2 + wave3 + crest);

      if (i === 0) {
        path += ` L ${x} ${y}`;
      } else {
        const prevX = ((i - 1) / segments) * width;
        const prevNormalizedX = prevX + offset * 0.5;
        const prevWave1 = Math.sin((prevNormalizedX * 0.05)) * amplitude * 0.6;
        const prevWave2 = Math.sin((prevNormalizedX * 0.08 + 2)) * amplitude * 0.4;
        const prevWave3 = Math.sin((prevNormalizedX * 0.15 + 4)) * amplitude * 0.3;
        const prevCrest = Math.exp(-Math.pow((prevNormalizedX % 40) - 15, 2) / 50) * amplitude * 0.8;
        const prevY = height - (height * 0.3 + prevWave1 + prevWave2 + prevWave3 + prevCrest);

        const cp1x = prevX + (x - prevX) * 0.4;
        const cp1y = prevY;
        const cp2x = prevX + (x - prevX) * 0.6;
        const cp2y = y;

        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x} ${y}`;
      }
    }

    path += ` L ${width} ${height} L 0 ${height} Z`;
    return path;
  };

  const waveWidth = Math.min(100, Math.max(5, scrollProgress));

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

      <div className="fixed bottom-0 left-0 w-full h-16 z-50 overflow-hidden pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 100 40"
          style={{
            left: scrollDirection === 'down' ? 0 : 'auto',
            right: scrollDirection === 'up' ? 0 : 'auto',
            width: `${waveWidth}%`,
            opacity: waveOpacity,
            transition: 'opacity 0.3s ease-out, width 0.1s ease-out'
          }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={isDarkMode ? 'rgba(192, 132, 252, 0.4)' : 'rgba(168, 85, 247, 0.4)'} />
              <stop offset="50%" stopColor={isDarkMode ? 'rgba(192, 132, 252, 0.6)' : 'rgba(168, 85, 247, 0.6)'} />
              <stop offset="100%" stopColor={isDarkMode ? 'rgba(192, 132, 252, 0.4)' : 'rgba(168, 85, 247, 0.4)'} />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <path
            d={createOceanWavePath()}
            fill="url(#waveGradient)"
            filter="url(#glow)"
            style={{
              transform: scrollDirection === 'up' ? 'scaleX(-1)' : 'none',
              transformOrigin: 'center'
            }}
          />
          <path
            d={createOceanWavePath()}
            fill="none"
            stroke={isDarkMode ? 'rgba(192, 132, 252, 0.8)' : 'rgba(168, 85, 247, 0.8)'}
            strokeWidth="0.3"
            style={{
              transform: scrollDirection === 'up' ? 'scaleX(-1)' : 'none',
              transformOrigin: 'center'
            }}
          />
        </svg>
      </div>
    </>
  );
};