import React, { useEffect, useRef, useState, ReactNode } from 'react';
import { gsap } from 'gsap';

export interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  once?: boolean;
  className?: string;
  disabled?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  duration = 0.6,
  distance = 20,
  direction = 'up',
  threshold = 0.1,
  once = true,
  className = '',
  disabled = false
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (disabled || !elementRef.current) return;

    const element = elementRef.current;

    const getInitialTransform = () => {
      switch (direction) {
        case 'up':
          return { y: distance, x: 0 };
        case 'down':
          return { y: -distance, x: 0 };
        case 'left':
          return { x: distance, y: 0 };
        case 'right':
          return { x: -distance, y: 0 };
        default:
          return { y: distance, x: 0 };
      }
    };

    const initialTransform = getInitialTransform();

    gsap.set(element, {
      opacity: 0,
      ...initialTransform
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated)) {
            gsap.to(element, {
              opacity: 1,
              x: 0,
              y: 0,
              duration,
              delay,
              ease: 'power2.out'
            });
            setHasAnimated(true);
            if (once) {
              observer.unobserve(element);
            }
          } else if (!entry.isIntersecting && !once && hasAnimated) {
            gsap.to(element, {
              opacity: 0,
              ...initialTransform,
              duration: duration * 0.5,
              ease: 'power2.in'
            });
            setHasAnimated(false);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [delay, duration, distance, direction, threshold, once, disabled, hasAnimated]);

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <div ref={elementRef} className={`will-change-transform ${className}`}>
      {children}
    </div>
  );
};

export interface ScrollRevealGroupProps {
  children: ReactNode[];
  staggerDelay?: number;
  baseDelay?: number;
  duration?: number;
  distance?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  once?: boolean;
  className?: string;
  itemClassName?: string;
  disabled?: boolean;
}

export const ScrollRevealGroup: React.FC<ScrollRevealGroupProps> = ({
  children,
  staggerDelay = 0.1,
  baseDelay = 0,
  duration = 0.6,
  distance = 20,
  direction = 'up',
  threshold = 0.1,
  once = true,
  className = '',
  itemClassName = '',
  disabled = false
}) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child, index) => (
        <ScrollReveal
          key={index}
          delay={baseDelay + index * staggerDelay}
          duration={duration}
          distance={distance}
          direction={direction}
          threshold={threshold}
          once={once}
          className={itemClassName}
          disabled={disabled}
        >
          {child}
        </ScrollReveal>
      ))}
    </div>
  );
};

export default ScrollReveal;
