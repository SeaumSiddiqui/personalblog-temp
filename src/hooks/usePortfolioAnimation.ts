import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface PortfolioAnimationRefs {
  nameContainer: React.RefObject<HTMLHeadingElement | null>;
  roleContainer: React.RefObject<HTMLHeadingElement | null>;
  descriptionRef: React.RefObject<HTMLParagraphElement | null>;
  locationIcon: React.RefObject<SVGSVGElement | null>;
  locationText: React.RefObject<HTMLSpanElement | null>;
  profileImage: React.RefObject<HTMLDivElement | null>;
  navItems: React.RefObject<(HTMLLIElement | null)[]>;
  socialItems: React.RefObject<(HTMLAnchorElement | null)[]>;
  themeToggle: React.RefObject<HTMLDivElement | null>;
  sidebarContent: React.RefObject<HTMLDivElement | null>;
  experienceCards: React.RefObject<(HTMLDivElement | null)[]>;
  projectCards: React.RefObject<(HTMLDivElement | null)[]>;
}

export function usePortfolioAnimation(refs: PortfolioAnimationRefs, ready: boolean) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!ready || hasRun.current) return;
    hasRun.current = true;

    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // Phase 1: Brand Identity - clip-path reveal left-to-right
    const nameWords = refs.nameContainer.current?.querySelectorAll('.gsap-name-word');
    if (nameWords && nameWords.length > 0) {
      tl.fromTo(
        nameWords,
        { clipPath: 'inset(0 100% 0 0)', visibility: 'hidden', x: -30 },
        {
          clipPath: 'inset(0 0% 0 0)',
          visibility: 'visible',
          x: 0,
          duration: 0.7,
          stagger: 0.15,
        },
        0
      );
    }

    // Phase 2: Hero Image - center pop with back.out
    if (refs.profileImage.current) {
      tl.fromTo(
        refs.profileImage.current,
        { scale: 0, visibility: 'hidden' },
        {
          scale: 1,
          visibility: 'visible',
          duration: 0.6,
          ease: 'back.out(1.7)',
        },
        0.3
      );
    }

    // Phase 3: Location icon pop + spin
    if (refs.locationIcon.current) {
      tl.fromTo(
        refs.locationIcon.current,
        { y: 20, scale: 0, visibility: 'hidden' },
        {
          y: 0,
          scale: 1,
          visibility: 'visible',
          duration: 0.4,
          ease: 'back.out(1.7)',
        },
        0.7
      );

      tl.to(
        refs.locationIcon.current,
        {
          rotationY: 360,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        0.95
      );

      tl.to(
        refs.locationIcon.current,
        {
          keyframes: [
            { y: -3, duration: 1.5, ease: 'sine.inOut' },
            { y: 0, duration: 1.5, ease: 'sine.inOut' },
          ],
          repeat: -1,
        },
        '+=0'
      );
    }

    // Phase 3 continued: Location text slides out from behind icon
    if (refs.locationText.current) {
      tl.fromTo(
        refs.locationText.current,
        { x: -20, visibility: 'hidden' },
        {
          x: 0,
          visibility: 'visible',
          duration: 0.4,
          ease: 'expo.out',
        },
        1.2
      );
    }

    // Role words fade up
    if (refs.roleContainer.current) {
      const roleWords = refs.roleContainer.current.querySelectorAll('.gsap-role-word');
      if (roleWords.length > 0) {
        tl.fromTo(
          roleWords,
          { y: 20, visibility: 'hidden' },
          {
            y: 0,
            visibility: 'visible',
            duration: 0.5,
            stagger: 0.1,
            ease: 'expo.out',
          },
          0.8
        );
      }
    }

    // Description fade up
    if (refs.descriptionRef.current) {
      tl.fromTo(
        refs.descriptionRef.current,
        { y: 15, visibility: 'hidden' },
        {
          y: 0,
          visibility: 'visible',
          duration: 0.5,
          ease: 'expo.out',
        },
        1.0
      );
    }

    // Phase 4: Nav items stagger left-to-right
    const navEls = refs.navItems.current?.filter(Boolean) as HTMLLIElement[];
    if (navEls && navEls.length > 0) {
      tl.fromTo(
        navEls,
        { x: -40, visibility: 'hidden' },
        {
          x: 0,
          visibility: 'visible',
          duration: 0.5,
          stagger: 0.08,
          ease: 'expo.out',
        },
        1.1
      );
    }

    // Phase 4: Social icons stagger right-to-left (top to bottom)
    const socialEls = refs.socialItems.current?.filter(Boolean) as HTMLAnchorElement[];
    if (socialEls && socialEls.length > 0) {
      tl.fromTo(
        socialEls,
        { x: 40, visibility: 'hidden' },
        {
          x: 0,
          visibility: 'visible',
          duration: 0.5,
          stagger: 0.08,
          ease: 'expo.out',
        },
        1.1
      );
    }

    // Theme toggle after socials
    if (refs.themeToggle.current) {
      tl.fromTo(
        refs.themeToggle.current,
        { x: 40, visibility: 'hidden' },
        {
          x: 0,
          visibility: 'visible',
          duration: 0.5,
          ease: 'expo.out',
        },
        1.1 + (socialEls?.length || 0) * 0.08
      );
    }

    // Phase 5: Sidebar stat cards - depth-based reveal
    if (refs.sidebarContent.current) {
      const cards = refs.sidebarContent.current.querySelectorAll('.gsap-stat-card');
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { y: 40, scale: 0.9, visibility: 'hidden' },
          {
            y: 0,
            scale: 1,
            visibility: 'visible',
            duration: 0.5,
            stagger: 0.08,
            ease: 'back.out(1.7)',
          },
          1.4
        );
      }
    }

    // Phase 5: Experience cards - bottom-to-top unstacking
    const expEls = refs.experienceCards.current?.filter(Boolean) as HTMLDivElement[];
    if (expEls && expEls.length > 0) {
      expEls.forEach((el, i) => {
        gsap.set(el, { zIndex: expEls.length - i });
      });
      tl.fromTo(
        expEls,
        { y: 60, visibility: 'hidden' },
        {
          y: 0,
          visibility: 'visible',
          duration: 0.6,
          stagger: 0.12,
          ease: 'expo.out',
        },
        1.5
      );
    }

    // Phase 5: Project cards - bottom-to-top unstacking
    const projEls = refs.projectCards.current?.filter(Boolean) as HTMLDivElement[];
    if (projEls && projEls.length > 0) {
      projEls.forEach((el, i) => {
        gsap.set(el, { zIndex: projEls.length - i });
      });
      tl.fromTo(
        projEls,
        { y: 60, visibility: 'hidden' },
        {
          y: 0,
          visibility: 'visible',
          duration: 0.6,
          stagger: 0.12,
          ease: 'expo.out',
        },
        1.6
      );
    }

    return () => {
      tl.kill();
    };
  }, [ready, refs]);
}
