import { useEffect, useState } from 'react';
import { PortfolioScene } from '../../data/portfolioData';
import { SceneProgress } from './SceneProgress';

interface MinimalNavigationProps { monogram: string; name: string; scenes: PortfolioScene[]; activeIndex: number; }

export function MinimalNavigation({ monogram, name, scenes, activeIndex }: MinimalNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (!isOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setIsOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  return <aside className="minimal-navigation" aria-label="Navegación del portafolio">
    <a className="minimal-navigation__monogram" href="#scene-presentacion" aria-label={`Volver al inicio de ${name}`}>{monogram}</a>
    <SceneProgress scenes={scenes} activeIndex={activeIndex} />
    <button className="minimal-navigation__toggle" type="button" aria-expanded={isOpen} aria-controls="scene-navigation-menu" onClick={() => setIsOpen((open) => !open)}><span className="sr-only">{isOpen ? 'Cerrar menú de escenas' : 'Abrir menú de escenas'}</span><span aria-hidden="true" /><span aria-hidden="true" /></button>
    <nav id="scene-navigation-menu" className="scene-navigation-menu" data-open={isOpen} aria-label="Escenas del recorrido"><ol>{scenes.map((scene, index) => <li key={scene.id}><a href={`#scene-${scene.id}`} aria-current={index === activeIndex ? 'step' : undefined} onClick={() => setIsOpen(false)}><span>{scene.number}</span>{scene.label}</a></li>)}</ol></nav>
  </aside>;
}
