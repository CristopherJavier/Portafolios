import { useEffect, useRef } from 'react';
import { LayeredScene } from './LayeredScene';

const scenes = [
  { title: 'Escena 1 — Presentación', direction: 'initial', holdAfter: 0 },
  { title: 'Escena 2 — Formación', direction: 'up', holdAfter: 0 },
  { title: 'Escena 3 — Tecnologías', direction: 'up', holdAfter: 0 },
  { title: 'Escena 4 — Proyectos', direction: 'right', holdAfter: 0 },
  { title: 'Escena 5 — Contacto', direction: 'up', holdAfter: 0 },
] as const;

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);
const transitionStarts = scenes.reduce<number[]>((starts, scene, index) => {
  if (index === 0) return starts;
  starts[index] = index === 1 ? 0 : starts[index - 1] + 1 + scenes[index - 1].holdAfter;
  return starts;
}, [0]);
const totalScrollUnits = transitionStarts[scenes.length - 1] + 1;

export function PortfolioExperience() {
  const experienceRef = useRef<HTMLElement>(null);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const experience = experienceRef.current;
    if (!experience) return;

    let animationFrame: number | null = null;

    const updateLayers = () => {
      animationFrame = null;
      const viewportHeight = window.innerHeight || 1;
      // `holdAfter` can later reserve real scroll distance for an inner scene sequence.
      experience.style.height = `${viewportHeight * (totalScrollUnits + 1)}px`;
      const scrollRange = Math.max(viewportHeight * totalScrollUnits, 1);
      const scrollPosition = clamp(-experience.getBoundingClientRect().top, 0, scrollRange);
      const globalProgress = (scrollPosition / scrollRange) * totalScrollUnits;

      experience.style.setProperty('--scroll-progress', globalProgress.toFixed(4));

      sceneRefs.current.forEach((scene, index) => {
        if (!scene) return;

        const transitionProgress = index === 0 ? 1 : clamp(globalProgress - transitionStarts[index], 0, 1);
        const verticalOffset = `${(1 - transitionProgress) * 100}%`;
        const opacity = index === 0 ? 1 - clamp(globalProgress, 0, 1) : transitionProgress;

        scene.style.setProperty('--layer-x', index > 0 && scenes[index].direction === 'right' ? verticalOffset : '0%');
        scene.style.setProperty('--layer-y', index > 0 && scenes[index].direction !== 'right' ? verticalOffset : '0%');
        scene.style.setProperty('--layer-opacity', opacity.toFixed(4));
      });
    };

    const requestUpdate = () => {
      if (animationFrame !== null) return;
      animationFrame = window.requestAnimationFrame(updateLayers);
    };

    requestUpdate();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (animationFrame !== null) window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <main ref={experienceRef} className="layered-scroll">
      <div className="layered-scroll__stage">
        {scenes.map((scene, index) => (
          <LayeredScene
            key={scene.title}
            ref={(element) => { sceneRefs.current[index] = element; }}
            index={index}
            title={scene.title}
            direction={scene.direction}
          />
        ))}
      </div>
    </main>
  );
}
