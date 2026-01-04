import React, { useRef, useEffect, useCallback } from 'react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: string;
  extraScale?: number;
  children?: React.ReactNode;
}

interface Spark {
  id: number;
  x: number;
  y: number;
}

export const ClickSpark: React.FC<ClickSparkProps> = ({
  sparkColor = 'currentColor',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 660,
  easing = 'cubic-bezier(0.25, 1, 0.5, 1)',
  extraScale = 1,
  children,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparksRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const idCounterRef = useRef(0);

  const createSparkSvg = useCallback(() => {
    const lines: string[] = [];
    const angleStep = 360 / sparkCount;

    for (let i = 0; i < sparkCount; i++) {
      const angle = angleStep * i;
      lines.push(
        `<line
          x1="${sparkSize}"
          y1="0"
          x2="${sparkSize * 0.5}"
          y2="0"
          stroke="${sparkColor}"
          stroke-width="2"
          stroke-linecap="round"
          transform="rotate(${angle})"
        />`
      );
    }

    return `
      <svg
        width="${sparkSize * 2}"
        height="${sparkSize * 2}"
        viewBox="${-sparkSize} ${-sparkSize} ${sparkSize * 2} ${sparkSize * 2}"
        style="display: block;"
      >
        ${lines.join('')}
      </svg>
    `;
  }, [sparkColor, sparkSize, sparkCount]);

  const animateSpark = useCallback((sparkElement: HTMLDivElement) => {
    const lines = sparkElement.querySelectorAll('line');

    lines.forEach((line, index) => {
      const angle = (360 / sparkCount) * index;
      const radians = (angle * Math.PI) / 180;
      const translateX = Math.cos(radians) * sparkRadius * extraScale;
      const translateY = Math.sin(radians) * sparkRadius * extraScale;

      line.animate(
        [
          {
            transform: `rotate(${angle}deg) translateX(0)`,
            opacity: 1
          },
          {
            transform: `rotate(${angle}deg) translateX(${sparkRadius * extraScale}px)`,
            opacity: 0
          },
        ],
        {
          duration,
          easing,
          fill: 'forwards',
        }
      );
    });

    setTimeout(() => {
      sparkElement.remove();
    }, duration + 50);
  }, [sparkCount, sparkRadius, duration, easing, extraScale]);

  const handleClick = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const sparkElement = document.createElement('div');
    sparkElement.innerHTML = createSparkSvg();
    sparkElement.style.cssText = `
      position: absolute;
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9999;
    `;

    container.appendChild(sparkElement);

    requestAnimationFrame(() => {
      animateSpark(sparkElement);
    });
  }, [createSparkSvg, animateSpark]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('click', handleClick);

    return () => {
      container.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%' }}
    >
      {children}
    </div>
  );
};

export default ClickSpark;
