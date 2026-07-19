import { CSSProperties, useEffect, useMemo, useState } from 'react';
import { PortfolioData, PortfolioScene } from '../../data/portfolioData';
import { MinimalNavigation } from './MinimalNavigation';
import { ProjectMedia } from './ProjectMedia';
import { Reveal } from './Reveal';
import { Scene } from './Scene';
import { SceneHeader } from './SceneHeader';
import { ScrollIndicator } from './ScrollIndicator';
import { SocialLinks } from './SocialLinks';

export function PortfolioExperience({ data }: { data: PortfolioData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scenesById = useMemo(() => new Map(data.scenes.map((scene, index) => [scene.id, index])), [data.scenes]);

  useEffect(() => {
    const sceneElements = Array.from(document.querySelectorAll<HTMLElement>('[data-scene-id]'));
    const observer = new IntersectionObserver((entries) => {
      const visibleScene = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visibleScene) return;
      const index = scenesById.get((visibleScene.target as HTMLElement).dataset.sceneId ?? '');
      if (typeof index === 'number') setActiveIndex((current) => current === index ? current : index);
    }, { rootMargin: '-32% 0px -48% 0px', threshold: [0, 0.2, 0.55] });
    sceneElements.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, [scenesById]);

  return <div className="portfolio-experience" style={{ '--active-scene': activeIndex } as CSSProperties}>
    <a className="skip-link" href="#main-content">Saltar al contenido</a>
    <MinimalNavigation monogram={data.identity.monogram} name={data.identity.name} scenes={data.scenes} activeIndex={activeIndex} />
    <main id="main-content">{data.scenes.map((scene, index) => <Scene key={scene.id} scene={scene} active={index === activeIndex}><SceneHeader scene={scene} /><SceneContent scene={scene} data={data} /><ScrollIndicator nextScene={data.scenes[index + 1]} /></Scene>)}</main>
  </div>;
}

function SceneContent({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const featuredProject = data.projects.find((project) => project.featured) ?? data.projects[0];
  if (scene.id === 'presentacion') return <div className="scene-intro"><Reveal><p className="scene-intro__role">{data.identity.role}</p></Reveal><Reveal delay="reveal--late"><p className="scene-intro__description">{data.identity.description}</p></Reveal><div className="portrait-frame" role="img" aria-label={data.identity.photo.alt}>{data.identity.photo.src ? <img src={data.identity.photo.src} alt={data.identity.photo.alt} fetchPriority="high" /> : <span>Fotografía principal pendiente</span>}</div></div>;
  if (scene.id === 'tecnologias') return <div className="technology-layers" aria-label="Tecnologías por nivel de práctica">{data.technologies.map((group) => <Reveal key={group.label} className="technology-layer"><h3>{group.label}</h3><p>{group.items.length ? group.items.join(' · ') : 'Contenido pendiente de confirmar'}</p></Reveal>)}</div>;
  if (scene.id === 'proyecto-principal') return <div className="project-foundation"><ProjectMedia src={featuredProject?.image?.src} alt={featuredProject?.image?.alt ?? 'Captura del proyecto principal'} priority label="Captura del proyecto principal pendiente" /><Reveal className="project-foundation__copy"><p className="scene-detail-label">Caso de estudio</p><h3>{featuredProject?.name ?? 'Proyecto principal pendiente de confirmar'}</h3><p>{featuredProject?.summary ?? 'La estructura ya está preparada para documentar problema, audiencia, decisiones, tecnologías y aprendizaje con información real.'}</p></Reveal></div>;
  if (scene.id === 'otros-proyectos') { const projects = data.projects.filter((project) => !project.featured); return <div className="chapter-list">{projects.length ? projects.map((project, index) => <Reveal key={project.id} className="chapter-list__item"><span>{String(index + 1).padStart(2, '0')}</span><h3>{project.name}</h3><p>{project.status}</p></Reveal>) : <p className="scene-placeholder">Los proyectos secundarios aparecerán aquí como capítulos visuales cuando se incorporen datos verificados.</p>}</div>; }
  if (scene.id === 'progreso') return <div className="progress-foundation"><Reveal><span className="progress-foundation__number">≈{data.progress.contributions}</span></Reveal><Reveal delay="reveal--late"><p>{data.progress.message}</p></Reveal><div className="progress-foundation__grid" aria-label="Representación visual de constancia" aria-hidden="true">{Array.from({ length: 42 }, (_, index) => <span key={index} />)}</div></div>;
  if (scene.id === 'formacion') return <div className="education-foundation">{data.education.studies.length ? data.education.studies.map((study) => <Reveal key={study}><p>{study}</p></Reveal>) : <p className="scene-placeholder">Agrega estudios y certificaciones verificadas desde la fuente de datos central.</p>}{data.education.certifications.map((certification) => <Reveal key={certification.name} className={`certification certification--${certification.level}`}><span>{certification.name}</span></Reveal>)}</div>;
  if (scene.id === 'proximo-nivel') return <ol className="goal-list">{data.goals.map((goal, index) => <li key={goal}><span>{String(index + 1).padStart(2, '0')}</span>{goal}</li>)}</ol>;
  if (scene.id === 'contacto') return <div className="contact-foundation"><Reveal><p>Disponible para conversar sobre colaboración, aprendizaje y oportunidades junior.</p></Reveal><SocialLinks {...data.identity.contact} /></div>;
  return <p className="scene-placeholder">El contenido de este capítulo se desarrollará con información personal verificada.</p>;
}
