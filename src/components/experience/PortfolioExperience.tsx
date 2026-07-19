import { useLayoutEffect, useRef } from 'react';
import { LayeredScene } from './LayeredScene';

const scenes = [
  { title: 'Escena 1 — Presentación', direction: 'initial', holdAfter: 0 },
  { title: 'Escena 2 — Formación', direction: 'up', holdAfter: 0 },
  { title: 'Escena 3 — Tecnologías', direction: 'up', holdAfter: 0 },
  { title: 'Escena 4 — Proyectos', direction: 'right', holdAfter: 0 },
  { title: 'Escena 5 — Contacto', direction: 'up', holdAfter: 0 },
] as const;

const clamp = (value: number, minimum: number, maximum: number) => Math.min(Math.max(value, minimum), maximum);

export function PortfolioExperience() {
  const experienceRef = useRef<HTMLElement>(null);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);

  useLayoutEffect(() => {
    const experience = experienceRef.current;
    const layerElements = sceneRefs.current;
    if (!experience || layerElements.some((scene) => !scene)) return;

    const [firstScene, secondScene, thirdScene, fourthScene, fifthScene] = layerElements as HTMLElement[];
    let frameId: number | null = null;

    const updateScenes = () => {
      frameId = null;

      const containerTop = experience.getBoundingClientRect().top + window.scrollY;
      const containerHeight = experience.offsetHeight;
      const scrollRange = Math.max(containerHeight - window.innerHeight, 1);
      const globalProgress = clamp((window.scrollY - containerTop) / scrollRange, 0, 1) * 4;
      const progressFor = (transitionStart: number) => clamp(globalProgress - transitionStart, 0, 1);
      const verticalOffset = (progress: number) => `${(1 - progress) * 100}%`;
      const horizontalOffset = (progress: number) => `${(1 - progress) * 100}%`;

      firstScene.style.transform = 'translate3d(0, 0, 0)';
      secondScene.style.transform = `translate3d(0, ${verticalOffset(progressFor(0))}, 0)`;
      thirdScene.style.transform = `translate3d(0, ${verticalOffset(progressFor(1))}, 0)`;
      fourthScene.style.transform = `translate3d(${horizontalOffset(progressFor(2))}, 0, 0)`;
      fifthScene.style.transform = `translate3d(0, ${verticalOffset(progressFor(3))}, 0)`;
    };

    const requestUpdate = () => {
      if (frameId !== null) return;
      frameId = window.requestAnimationFrame(updateScenes);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    updateScenes();

    return () => {
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
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
