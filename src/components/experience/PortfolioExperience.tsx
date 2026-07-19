import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { LayeredScene } from './LayeredScene';

const scenes = [
  { title: 'Escena 1 — Presentación', direction: 'initial', holdAfter: 0 },
  { title: 'Escena 2 — Formación', direction: 'up', holdAfter: 0 },
  { title: 'Escena 3 — Tecnologías', direction: 'up', holdAfter: 0 },
  { title: 'Escena 4 — Proyectos', direction: 'right', holdAfter: 0 },
  { title: 'Escena 5 — Contacto', direction: 'up', holdAfter: 0 },
] as const;

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);
const lenisLerp = 0.08;
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

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lenis = new Lenis({
      smoothWheel: !reducedMotion.matches,
      lerp: reducedMotion.matches ? 1 : lenisLerp,
      wheelMultiplier: 1,
      infinite: false,
      autoRaf: true,
    });

    const renderLayers = (scrollPosition: number) => {
      const viewportHeight = window.innerHeight || 1;
      const scrollRange = Math.max(viewportHeight * totalScrollUnits, 1);
      const localScroll = clamp(scrollPosition - experience.offsetTop, 0, scrollRange);
      const progress = (localScroll / scrollRange) * totalScrollUnits;

      experience.style.setProperty('--scroll-progress', progress.toFixed(4));

      sceneRefs.current.forEach((scene, index) => {
        if (!scene) return;

        const transitionProgress = index === 0 ? 1 : clamp(progress - transitionStarts[index], 0, 1);
        const offset = `${(1 - transitionProgress) * 100}%`;
        const opacity = index === 0 ? 1 - clamp(progress, 0, 1) : transitionProgress;

        scene.style.setProperty('--layer-x', index > 0 && scenes[index].direction === 'right' ? offset : '0%');
        scene.style.setProperty('--layer-y', index > 0 && scenes[index].direction !== 'right' ? offset : '0%');
        scene.style.setProperty('--layer-opacity', opacity.toFixed(4));
      });
    };

    const resizeExperience = () => {
      const viewportHeight = window.innerHeight || 1;
      // `holdAfter` can later reserve real scroll distance for an inner scene sequence.
      experience.style.height = `${viewportHeight * (totalScrollUnits + 1)}px`;
      lenis.resize();
      renderLayers(lenis.scroll);
    };

    const handleLenisScroll = (instance: Lenis) => renderLayers(instance.scroll);
    const handleMotionPreferenceChange = () => {
      lenis.options.smoothWheel = !reducedMotion.matches;
      lenis.options.lerp = reducedMotion.matches ? 1 : lenisLerp;
      lenis.scrollTo(lenis.scroll, { immediate: true, force: true });
    };

    lenis.on('scroll', handleLenisScroll);
    resizeExperience();
    window.addEventListener('resize', resizeExperience, { passive: true });
    reducedMotion.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      window.removeEventListener('resize', resizeExperience);
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
      lenis.off('scroll', handleLenisScroll);
      lenis.destroy();
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
