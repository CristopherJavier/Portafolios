import { CSSProperties } from 'react';
import { PortfolioScene } from '../../data/portfolioData';

export function SceneProgress({ scenes, activeIndex }: { scenes: PortfolioScene[]; activeIndex: number }) {
  const activeScene = scenes[activeIndex];
  const progress = scenes.length > 1 ? activeIndex / (scenes.length - 1) : 0;
  return <div className="scene-progress" aria-live="polite"><span className="scene-progress__current">{activeScene.number}</span><span className="scene-progress__line" style={{ '--scene-progress': progress } as CSSProperties} aria-hidden="true"><span /></span><span className="scene-progress__total">{String(scenes.length).padStart(2, '0')}</span><span className="sr-only">Escena {activeScene.number} de {scenes.length}: {activeScene.label}</span></div>;
}
