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
const damping = 14;
const progressTolerance = 0.0005;
const transitionStarts = scenes.reduce<number[]>((starts, scene, index) => {
  if (index === 0) return starts;
  starts[index] = index === 1 ? 0 : starts[index - 1] + 1 + scenes[index - 1].holdAfter;
  return starts;
}, [0]);
const totalScrollUnits = transitionStarts[scenes.length - 1] + 1;

export function PortfolioExperience() {
  const experienceRef = useRef<HTMLElement>(null);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);
  const targetProgressRef = useRef(0);
  const renderedProgressRef = useRef(0);

  useEffect(() => {
    const experience = experienceRef.current;
    if (!experience) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame: number | null = null;
    let previousFrameTime = performance.now();

    const renderLayers = (renderedProgress: number) => {
      experience.style.setProperty('--rendered-progress', renderedProgress.toFixed(4));

      sceneRefs.current.forEach((scene, index) => {
        if (!scene) return;

        const transitionProgress = index === 0 ? 1 : clamp(renderedProgress - transitionStarts[index], 0, 1);
        const offset = `${(1 - transitionProgress) * 100}%`;
        const opacity = index === 0 ? 1 - clamp(renderedProgress, 0, 1) : transitionProgress;

        scene.style.setProperty('--layer-x', index > 0 && scenes[index].direction === 'right' ? offset : '0%');
        scene.style.setProperty('--layer-y', index > 0 && scenes[index].direction !== 'right' ? offset : '0%');
        scene.style.setProperty('--layer-opacity', opacity.toFixed(4));
      });
    };

    const updateTargetProgress = () => {
      const viewportHeight = window.innerHeight || 1;
      // `holdAfter` can later reserve real scroll distance for an inner scene sequence.
      experience.style.height = `${viewportHeight * (totalScrollUnits + 1)}px`;
      const scrollRange = Math.max(viewportHeight * totalScrollUnits, 1);
      const scrollPosition = clamp(-experience.getBoundingClientRect().top, 0, scrollRange);
      targetProgressRef.current = (scrollPosition / scrollRange) * totalScrollUnits;
      experience.style.setProperty('--target-progress', targetProgressRef.current.toFixed(4));
    };

    const animate = (currentFrameTime: number) => {
      const targetProgress = targetProgressRef.current;
      const elapsedSeconds = Math.min((currentFrameTime - previousFrameTime) / 1000, 0.1);
      previousFrameTime = currentFrameTime;

      if (reducedMotion.matches) {
        renderedProgressRef.current = targetProgress;
      } else {
        const alpha = 1 - Math.exp(-damping * elapsedSeconds);
        renderedProgressRef.current += (targetProgress - renderedProgressRef.current) * alpha;
      }

      if (Math.abs(targetProgress - renderedProgressRef.current) <= progressTolerance) {
        renderedProgressRef.current = targetProgress;
      }

      renderLayers(renderedProgressRef.current);

      if (renderedProgressRef.current === targetProgress) {
        animationFrame = null;
        return;
      }

      animationFrame = window.requestAnimationFrame(animate);
    };

    const requestAnimation = () => {
      if (animationFrame !== null) return;
      previousFrameTime = performance.now();
      animationFrame = window.requestAnimationFrame(animate);
    };

    const updateTargetAndRender = () => {
      updateTargetProgress();

      if (reducedMotion.matches) {
        renderedProgressRef.current = targetProgressRef.current;
        renderLayers(renderedProgressRef.current);
        return;
      }

      requestAnimation();
    };

    const handleMotionPreferenceChange = () => {
      if (reducedMotion.matches && animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
      updateTargetAndRender();
    };

    updateTargetAndRender();
    window.addEventListener('scroll', updateTargetAndRender, { passive: true });
    window.addEventListener('resize', updateTargetAndRender, { passive: true });
    reducedMotion.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      window.removeEventListener('scroll', updateTargetAndRender);
      window.removeEventListener('resize', updateTargetAndRender);
      reducedMotion.removeEventListener('change', handleMotionPreferenceChange);
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
