import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';

export interface BentoProps {
  children: React.ReactNode;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  glowColor?: string;
}

export interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'square' | 'portrait' | 'banner' | 'wide';
  enableMagnetism?: boolean;
  glowColor?: string;
  disableAnimations?: boolean;
  enableBorderGlow?: boolean;
  onClick?: () => void;
}

const DEFAULT_GLOW_COLOR = '59, 130, 246';
const MOBILE_BREAKPOINT = 768;

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

export const BentoCard: React.FC<BentoCardProps> = ({
  children,
  className = '',
  variant = 'square',
  enableMagnetism = true,
  glowColor = DEFAULT_GLOW_COLOR,
  disableAnimations = false,
  enableBorderGlow = true,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;

  const variantClasses = {
    square: 'col-span-1 row-span-1',
    portrait: 'col-span-1 row-span-2',
    banner: 'col-span-2 row-span-1',
    wide: 'col-span-2 row-span-2'
  };

  useEffect(() => {
    if (shouldDisableAnimations || !cardRef.current || !enableMagnetism) return;

    const element = cardRef.current;

    const handleMouseLeave = () => {
      magnetismAnimationRef.current?.kill();
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const magnetX = (x - centerX) * 0.03;
      const magnetY = (y - centerY) * 0.03;

      magnetismAnimationRef.current = gsap.to(element, {
        x: magnetX,
        y: magnetY,
        duration: 0.2,
        ease: 'power2.out'
      });
    };

    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      magnetismAnimationRef.current?.kill();
    };
  }, [shouldDisableAnimations, enableMagnetism]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`bento-card relative overflow-hidden rounded-2xl cursor-pointer ${variantClasses[variant]} ${enableBorderGlow ? 'bento-card--border-glow' : ''} ${className}`}
      style={{
        '--glow-color': glowColor
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

const MagicBento: React.FC<BentoProps> = ({
  children,
  enableBorderGlow = true,
  glowColor = DEFAULT_GLOW_COLOR
}) => {
  return (
    <>
      <style>
        {`
          .bento-card--border-glow {
            border: 1px solid rgba(${glowColor}, 0.1);
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }

          .bento-card--border-glow:hover {
            border-color: rgba(${glowColor}, 0.3);
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15), 0 0 20px rgba(${glowColor}, 0.1);
          }
        `}
      </style>

      <div
        className="bento-grid grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full"
        style={{
          gridAutoRows: 'minmax(200px, auto)'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default MagicBento;
