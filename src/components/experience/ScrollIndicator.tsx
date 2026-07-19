import { PortfolioScene } from '../../data/portfolioData';

export function ScrollIndicator({ nextScene }: { nextScene?: PortfolioScene }) {
  if (!nextScene) return null;
  return <a className="scroll-indicator" href={`#scene-${nextScene.id}`}><span>Continuar</span><span aria-hidden="true">↓</span><span className="sr-only">a {nextScene.label}</span></a>;
}
