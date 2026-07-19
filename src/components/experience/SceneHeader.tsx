import { PortfolioScene } from '../../data/portfolioData';
import { Reveal } from './Reveal';

export function SceneHeader({ scene }: { scene: PortfolioScene }) {
  return <header className="scene-header"><Reveal className="scene-header__eyebrow"><span className="scene-header__number" aria-hidden="true">{scene.number}</span><span>{scene.label}</span></Reveal><Reveal delay="reveal--late"><h2 id={`scene-title-${scene.id}`}>{scene.title}</h2></Reveal><Reveal delay="reveal--later"><p>{scene.summary}</p></Reveal></header>;
}
