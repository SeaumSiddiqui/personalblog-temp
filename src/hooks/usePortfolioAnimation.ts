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
  const floatTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!ready || hasRun.current) return;
    hasRun.current = true;

    const ease = 'power4.out';
    const tl = gsap.timeline({ defaults: { ease } });

    const nameWords = refs.nameContainer.current?.querySelectorAll('.gsap-name-word');
    if (nameWords && nameWords.length > 0) {
      tl.fromTo(
        nameWords,
        { clipPath: 'inset(0 100% 0 0)', visibility: 'hidden', x: -20, willChange: 'clip-path, transform' },
        {
          clipPath: 'inset(0 0% 0 0)',
          visibility: 'visible',
          x: 0,
          duration: 1.2,
          stagger: 0.25,
          ease,
        },
        0
      );
    }

    if (refs.profileImage.current) {
      tl.fromTo(
        refs.profileImage.current,
        { scale: 0, visibility: 'hidden', opacity: 0 },
        {
          scale: 1,
          visibility: 'visible',
          opacity: 1,
          duration: 1.0,
          ease: 'back.out(1.4)',
        },
        '-=0.7'
      );
    }

    if (refs.roleContainer.current) {
      const roleWords = refs.roleContainer.current.querySelectorAll('.gsap-role-word');
      if (roleWords.length > 0) {
        tl.fromTo(
          roleWords,
          { y: 25, visibility: 'hidden', opacity: 0 },
          {
            y: 0,
            visibility: 'visible',
            opacity: 1,
            duration: 0.9,
            stagger: 0.2,
            ease,
          },
          '-=0.6'
        );
      }
    }

    if (refs.descriptionRef.current) {
      tl.fromTo(
        refs.descriptionRef.current,
        { y: 20, visibility: 'hidden', opacity: 0 },
        {
          y: 0,
          visibility: 'visible',
          opacity: 1,
          duration: 0.9,
          ease,
        },
        '-=0.5'
      );
    }

    const locationLabel = 'location';
    if (refs.locationIcon.current) {
      tl.addLabel(locationLabel)
        .fromTo(
          refs.locationIcon.current,
          { y: 20, rotationY: 0, scale: 0, visibility: 'hidden', opacity: 0 },
          {
            y: 0,
            rotationY: 360,
            scale: 1,
            visibility: 'visible',
            opacity: 1,
            duration: 1.0,
            ease: 'back.out(1.4)',
          },
          locationLabel
        );
    }

    if (refs.locationText.current) {
      tl.fromTo(
        refs.locationText.current,
        { x: -25, visibility: 'hidden', opacity: 0 },
        {
          x: 0,
          visibility: 'visible',
          opacity: 1,
          duration: 0.8,
          ease,
        },
        `${locationLabel}+=0.3`
      );
    }

    const navEls = refs.navItems.current?.filter(Boolean) as HTMLLIElement[];
    const socialEls = refs.socialItems.current?.filter(Boolean) as HTMLAnchorElement[];

    const syncLabel = 'navSocialSync';
    tl.addLabel(syncLabel, '-=0.4');

    if (navEls && navEls.length > 0) {
      tl.fromTo(
        navEls,
        { x: -50, visibility: 'hidden', opacity: 0 },
        {
          x: 0,
          visibility: 'visible',
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease,
        },
        syncLabel
      );
    }

    if (socialEls && socialEls.length > 0) {
      tl.fromTo(
        socialEls,
        { x: 100, visibility: 'hidden', opacity: 0 },
        {
          x: 0,
          visibility: 'visible',
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease,
        },
        syncLabel
      );
    }

    if (refs.themeToggle.current) {
      tl.fromTo(
        refs.themeToggle.current,
        { x: 100, visibility: 'hidden', opacity: 0 },
        {
          x: 0,
          visibility: 'visible',
          opacity: 1,
          duration: 0.8,
          ease,
        },
        `${syncLabel}+=${(Math.max(socialEls?.length || 0, 0)) * 0.2}`
      );
    }

    if (refs.sidebarContent.current) {
      const cards = refs.sidebarContent.current.querySelectorAll('.gsap-stat-card');
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { y: 50, opacity: 0, visibility: 'hidden' },
          {
            y: 0,
            opacity: 1,
            visibility: 'visible',
            duration: 0.9,
            stagger: 0.15,
            ease: 'back.out(1.2)',
          },
          '-=0.5'
        );
      }
    }

    const animateCards = (els: HTMLDivElement[] | null, offset: string) => {
      if (!els || els.length === 0) return;
      els.forEach((el, i) => {
        gsap.set(el, { zIndex: els.length - i });
      });
      tl.fromTo(
        els,
        { y: 60, opacity: 0, visibility: 'hidden' },
        {
          y: 0,
          opacity: 1,
          visibility: 'visible',
          duration: 1.0,
          stagger: {
            each: 0.2,
            from: 'start',
          },
          ease,
        },
        offset
      );
    };

    const expEls = refs.experienceCards.current?.filter(Boolean) as HTMLDivElement[];
    animateCards(expEls, '-=0.4');

    const projEls = refs.projectCards.current?.filter(Boolean) as HTMLDivElement[];
    animateCards(projEls, '-=0.3');

    tl.then(() => {
      if (refs.locationIcon.current) {
        floatTween.current = gsap.to(refs.locationIcon.current, {
          y: -5,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    });

    return () => {
      tl.kill();
      if (floatTween.current) {
        floatTween.current.kill();
      }
    };
  }, [ready, refs]);
}
