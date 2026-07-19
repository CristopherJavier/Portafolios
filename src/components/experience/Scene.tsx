import { PortfolioScene } from '../../data/portfolioData';

export function Scene({ scene, active, children }: { scene: PortfolioScene; active: boolean; children: any; key?: string | number }) {
  return <section id={`scene-${scene.id}`} className={`scene scene--${scene.tone} scene--${scene.height}`} data-scene-id={scene.id} data-active={active} aria-labelledby={`scene-title-${scene.id}`}><div className="scene__frame">{children}</div></section>;
}
