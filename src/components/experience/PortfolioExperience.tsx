import { useRef } from 'react';
import { ContactScene } from './scenes/ContactScene';
import { EducationScene } from './scenes/EducationScene';
import { IntroScene } from './scenes/IntroScene';
import { PresentationScene } from './scenes/PresentationScene';
import { ProjectsScene } from './scenes/ProjectsScene';
import { TechnologiesScene } from './scenes/TechnologiesScene';
import { usePortfolioScroll } from './usePortfolioScroll';

export function PortfolioExperience() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const presentationRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const technologiesRef = useRef<HTMLElement>(null);

  usePortfolioScroll({
    root: rootRef,
    stage: stageRef,
    intro: introRef,
    presentation: presentationRef,
    education: educationRef,
    technologies: technologiesRef,
  });

  const returnToStart = () => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <main ref={rootRef} className="portfolio-experience">
      <div className="portfolio-experience__journey">
        <div ref={stageRef} className="portfolio-experience__stage">
          <IntroScene ref={introRef} />
          <PresentationScene ref={presentationRef} />
          <EducationScene ref={educationRef} />
          <TechnologiesScene ref={technologiesRef} />
        </div>
      </div>
      <ProjectsScene />
      <ContactScene onReturnToStart={returnToStart} />
    </main>
  );
}
