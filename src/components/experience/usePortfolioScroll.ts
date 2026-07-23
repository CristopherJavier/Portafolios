import type { RefObject } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger, useGSAP);

type PortfolioScrollRefs = {
  root: RefObject<HTMLElement | null>;
  stage: RefObject<HTMLDivElement | null>;
  intro: RefObject<HTMLElement | null>;
  presentation: RefObject<HTMLElement | null>;
  education: RefObject<HTMLElement | null>;
  technologies: RefObject<HTMLElement | null>;
};

const revealState = { autoAlpha: 0, y: 24 };
const revealTarget = { autoAlpha: 1, y: 0, duration: 0.48, ease: 'none' };

export function usePortfolioScroll(refs: PortfolioScrollRefs) {
  useGSAP(
    () => {
      const { current: stage } = refs.stage;
      const { current: intro } = refs.intro;
      const { current: presentation } = refs.presentation;
      const { current: education } = refs.education;
      const { current: technologies } = refs.technologies;

      if (!stage || !intro || !presentation || !education || !technologies) return undefined;

      const media = gsap.matchMedia();

      media.add(
        {
          motionSafe: '(prefers-reduced-motion: no-preference)',
          compact: '(max-width: 48rem)',
        },
        (context) => {
          if (!context.conditions?.motionSafe) return undefined;

          const isCompact = Boolean(context.conditions.compact);
          const cue = intro.querySelector<HTMLElement>('[data-intro-cue]');
          const presentationItems: HTMLElement[] = Array.from(
            presentation.querySelectorAll<HTMLElement>('[data-presentation-reveal]'),
          );
          const educationHeading = education.querySelector<HTMLElement>('[data-education-heading]');
          const educationNames: HTMLElement[] = Array.from(
            education.querySelectorAll<HTMLElement>('[data-education-name]'),
          );
          const educationDetails: HTMLElement[] = Array.from(
            education.querySelectorAll<HTMLElement>('[data-education-detail]'),
          );
          const educationLogos: HTMLElement[] = Array.from(
            education.querySelectorAll<HTMLElement>('[data-education-logo]'),
          );

          gsap.set(presentation, { autoAlpha: 0, yPercent: 3 });
          gsap.set(education, { xPercent: 100 });
          gsap.set(technologies, { yPercent: 100 });
          if (cue) gsap.set(cue, { autoAlpha: 1 });
          gsap.set(presentationItems, revealState);
          if (educationHeading) gsap.set(educationHeading, revealState);
          gsap.set(educationNames, revealState);
          gsap.set(educationDetails, { autoAlpha: 0, y: 16 });
          gsap.set(educationLogos, { autoAlpha: 0, y: 12, scale: 0.96 });

          const timeline = gsap.timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: stage,
              start: 'top top',
              end: () => `+=${window.innerHeight * (isCompact ? 7 : 8)}`,
              pin: true,
              pinSpacing: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          if (cue) timeline.to(cue, { autoAlpha: 0, duration: 0.3 }, 0.2);

          timeline
            .to(intro, { autoAlpha: 0, yPercent: -3, duration: 0.85 }, 0)
            .to(presentation, { autoAlpha: 1, yPercent: 0, duration: 0.85 }, 0.08);

          const [photo, ...presentationDetails] = presentationItems;
          if (photo) timeline.to(photo, revealTarget);
          timeline.to(presentationDetails, { ...revealTarget, stagger: 0.3 });

          timeline.to(education, { xPercent: 0, duration: 1 });
          if (educationHeading) timeline.to(educationHeading, revealTarget);

          educationNames.forEach((name, index) => {
            const logo = educationLogos[index];
            const details = educationDetails.slice(index * 3, index * 3 + 3);

            timeline.to(name, revealTarget);
            if (logo) {
              timeline.to(
                logo,
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.36, ease: 'none' },
                '<0.1',
              );
            }
            timeline.to(details, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'none', stagger: 0.08 }, '<0.1');
          });

          timeline.to(technologies, { yPercent: 0, duration: 1 });

          return undefined;
        },
      );

      return () => media.revert();
    },
    { scope: refs.root, dependencies: [] },
  );
}
