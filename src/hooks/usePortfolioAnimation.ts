import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export interface PortfolioAnimationRefs {
  mainWrapper: React.RefObject<HTMLDivElement | null>;
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

const WC = 'transform, opacity';

export function usePortfolioAnimation(refs: PortfolioAnimationRefs, ready: boolean) {
  const hasRun = useRef(false);
  const floatTween = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!ready || hasRun.current) return;
    hasRun.current = true;

    const ease = 'power4.out';

    if (refs.mainWrapper.current) {
      refs.mainWrapper.current.style.pointerEvents = 'none';
    }

    const tl = gsap.timeline({
      defaults: { ease },
      onComplete: () => {
        if (refs.mainWrapper.current) {
          refs.mainWrapper.current.style.pointerEvents = 'auto';
        }

        if (refs.locationIcon.current) {
          floatTween.current = gsap.to(refs.locationIcon.current, {
            y: -5,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        }
      },
    });

    const nameWords = refs.nameContainer.current?.querySelectorAll('.gsap-name-word');
    if (nameWords && nameWords.length > 0) {
      tl.fromTo(
        nameWords,
        { clipPath: 'inset(0 100% 0 0)', visibility: 'hidden', x: -20, willChange: 'clip-path, ' + WC },
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
        { scale: 0, visibility: 'hidden', opacity: 0, willChange: WC },
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
          { y: 25, visibility: 'hidden', opacity: 0, willChange: WC },
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
        { y: 20, visibility: 'hidden', opacity: 0, willChange: WC },
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

    const locIconLabel = 'locIcon';
    if (refs.locationIcon.current) {
      tl.addLabel(locIconLabel);

      tl.fromTo(
        refs.locationIcon.current,
        { y: 20, scale: 0, visibility: 'hidden', opacity: 0, willChange: WC },
        {
          y: 0,
          scale: 1,
          visibility: 'visible',
          opacity: 1,
          duration: 0.6,
          ease: 'back.out(1.4)',
        },
        locIconLabel
      );

      tl.to(
        refs.locationIcon.current,
        {
          rotationY: 360,
          duration: 0.7,
          ease: 'power2.inOut',
        },
        '>'
      );
    }

    if (refs.locationText.current) {
      tl.fromTo(
        refs.locationText.current,
        { x: -30, visibility: 'hidden', opacity: 0, willChange: WC },
        {
          x: 0,
          visibility: 'visible',
          opacity: 1,
          duration: 0.8,
          ease,
        },
        '>+=0.2'
      );
    }

    const navEls = refs.navItems.current?.filter(Boolean) as HTMLLIElement[];
    const socialEls = refs.socialItems.current?.filter(Boolean) as HTMLAnchorElement[];

    const menuStart = 'menuStart';
    tl.addLabel(menuStart, '-=0.3');

    if (navEls && navEls.length > 0) {
      tl.fromTo(
        navEls,
        { x: -50, visibility: 'hidden', opacity: 0, willChange: WC },
        {
          x: 0,
          visibility: 'visible',
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease,
        },
        menuStart
      );
    }

    if (socialEls && socialEls.length > 0) {
      tl.fromTo(
        socialEls,
        { x: 100, visibility: 'hidden', opacity: 0, willChange: WC },
        {
          x: 0,
          visibility: 'visible',
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease,
        },
        menuStart
      );
    }

    if (refs.themeToggle.current) {
      tl.fromTo(
        refs.themeToggle.current,
        { x: 100, visibility: 'hidden', opacity: 0, willChange: WC },
        {
          x: 0,
          visibility: 'visible',
          opacity: 1,
          duration: 0.8,
          ease,
        },
        `${menuStart}+=${(Math.max(socialEls?.length || 0, 0)) * 0.2}`
      );
    }

    if (refs.sidebarContent.current) {
      const cards = refs.sidebarContent.current.querySelectorAll('.gsap-stat-card');
      if (cards.length > 0) {
        const cols = 3;
        const cardArr = Array.from(cards);
        const reordered: Element[] = [];
        const rows = Math.ceil(cardArr.length / cols);
        for (let r = rows - 1; r >= 0; r--) {
          for (let c = 0; c < cols; c++) {
            const idx = r * cols + c;
            if (idx < cardArr.length) {
              reordered.push(cardArr[idx]);
            }
          }
        }

        tl.fromTo(
          reordered,
          { y: 50, opacity: 0, visibility: 'hidden', filter: 'blur(5px)', willChange: WC + ', filter' },
          {
            y: 0,
            opacity: 1,
            visibility: 'visible',
            filter: 'blur(0px)',
            duration: 0.9,
            stagger: 0.12,
            ease: 'back.out(1.2)',
          },
          '-=0.5'
        );
      }
    }

    const animateContentCards = (els: HTMLDivElement[] | null, offset: string) => {
      if (!els || els.length === 0) return;
      const reversed = [...els].reverse();
      reversed.forEach((el, i) => {
        gsap.set(el, { zIndex: reversed.length - i });
      });
      tl.fromTo(
        reversed,
        { y: 70, opacity: 0.1, visibility: 'hidden', filter: 'blur(5px)', willChange: WC + ', filter' },
        {
          y: 0,
          opacity: 1,
          visibility: 'visible',
          filter: 'blur(0px)',
          duration: 1.2,
          stagger: {
            each: 0.25,
            from: 'start',
          },
          ease,
        },
        offset
      );
    };

    const expEls = refs.experienceCards.current?.filter(Boolean) as HTMLDivElement[];
    animateContentCards(expEls, '-=0.4');

    const projEls = refs.projectCards.current?.filter(Boolean) as HTMLDivElement[];
    animateContentCards(projEls, '-=0.3');

    return () => {
      tl.kill();
      if (floatTween.current) {
        floatTween.current.kill();
      }
      if (refs.mainWrapper.current) {
        refs.mainWrapper.current.style.pointerEvents = 'auto';
      }
    };
  }, [ready, refs]);
}
