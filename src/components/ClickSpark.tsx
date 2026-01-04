import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ClickSparkProps {
  isDarkMode: boolean;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({ isDarkMode }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const sparkCount = 8;
      const x = e.clientX;
      const y = e.clientY;

      for (let i = 0; i < sparkCount; i++) {
        const spark = document.createElement('div');
        spark.className = 'click-spark';
        spark.style.cssText = `
          position: fixed;
          width: 8px;
          height: 8px;
          background: ${isDarkMode ? '#b794f6' : '#9333ea'};
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          left: ${x}px;
          top: ${y}px;
          box-shadow: 0 0 10px ${isDarkMode ? '#b794f6' : '#9333ea'};
        `;

        containerRef.current.appendChild(spark);

        const angle = (Math.PI * 2 * i) / sparkCount;
        const distance = 40 + Math.random() * 20;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        gsap.to(spark, {
          x: tx,
          y: ty,
          opacity: 0,
          scale: 0,
          duration: 0.6,
          ease: 'power2.out',
          onComplete: () => {
            spark.remove();
          }
        });
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [isDarkMode]);

  return <div ref={containerRef} className="click-spark-container" />;
};
