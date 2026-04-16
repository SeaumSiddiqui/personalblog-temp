import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

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
const WCF = 'transform, opacity, filter';

export function usePortfolioAnimation(refs: PortfolioAnimationRefs, ready: boolean) {
  const floatTween = useRef<gsap.core.Tween | null>(null);
  const hasRun = useRef(false);

  useGSAP(() => {
    if (!ready || hasRun.current) return;
    hasRun.current = true;

    const ease = 'power4.out';

    document.body.style.pointerEvents = 'none';

    const startFloat = () => {
      if (refs.locationIcon.current) {
        floatTween.current = gsap.to(refs.locationIcon.current, {
          y: -5,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }
    };

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease },
      onComplete: () => {
        document.body.style.pointerEvents = 'auto';
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
        },
        '-=0.5'
      );
    }

    if (refs.locationIcon.current) {
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
        }
      );

      tl.to(refs.locationIcon.current, {
        rotationY: 360,
        duration: 0.7,
        ease: 'power2.inOut',
      }, '>');
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
        },
        '>0.3'
      );
    }

    tl.call(startFloat);

    const navEls = refs.navItems.current?.filter(Boolean) as HTMLLIElement[];
    const socialEls = refs.socialItems.current?.filter(Boolean) as HTMLAnchorElement[];

    tl.add('sidebarsSync');

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
        },
        'sidebarsSync'
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
        },
        'sidebarsSync'
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
        },
        'sidebarsSync'
      );
    }

    if (refs.sidebarContent.current) {
      const cards = refs.sidebarContent.current.querySelectorAll('.gsap-stat-card');
      if (cards.length > 0) {
        tl.fromTo(
          cards,
          { y: 60, opacity: 0, visibility: 'hidden', willChange: WC },
          {
            y: 0,
            opacity: 1,
            visibility: 'visible',
            duration: 0.9,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.5'
        );
      }
    }

    const expEls = refs.experienceCards.current?.filter(Boolean) as HTMLDivElement[];
    if (expEls && expEls.length > 0) {
      tl.fromTo(
        expEls,
        { y: 100, opacity: 0, visibility: 'hidden', filter: 'blur(10px)', willChange: WCF },
        {
          y: 0,
          opacity: 1,
          visibility: 'visible',
          filter: 'blur(0px)',
          duration: 1.5,
          stagger: 0.1,
          ease: 'expo.out',
        },
        '-=0.4'
      );
    }

    const projEls = refs.projectCards.current?.filter(Boolean) as HTMLDivElement[];
    if (projEls && projEls.length > 0) {
      tl.fromTo(
        projEls,
        { y: 100, opacity: 0, visibility: 'hidden', filter: 'blur(10px)', willChange: WCF },
        {
          y: 0,
          opacity: 1,
          visibility: 'visible',
          filter: 'blur(0px)',
          duration: 1.5,
          stagger: 0.1,
          ease: 'expo.out',
        },
        '-=0.3'
      );
    }

    tl.play();

    return () => {
      tl.kill();
      if (floatTween.current) {
        floatTween.current.kill();
      }
      document.body.style.pointerEvents = 'auto';
    };
  }, { dependencies: [ready], scope: refs.mainWrapper });
}
