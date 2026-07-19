import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { PortfolioData, PortfolioProject, PortfolioScene } from '../../data/portfolioData';
import { MinimalNavigation } from './MinimalNavigation';
import { ProjectMedia } from './ProjectMedia';
import { Reveal } from './Reveal';
import { Scene } from './Scene';
import { SceneHeader } from './SceneHeader';
import { ScrollIndicator } from './ScrollIndicator';

const isExternalUrl = (value: string) => /^https?:\/\//i.test(value);
const isConfiguredProject = (project: PortfolioProject) => Boolean(project.name && project.description);

export function PortfolioExperience({ data }: { data: PortfolioData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isEnhanced, setIsEnhanced] = useState(false);
  const scenes = useMemo(() => data.scenes
    .filter((scene) => scene.id !== 'otros-proyectos' || data.projects.some((project) => !project.featured && isConfiguredProject(project)))
    .map((scene, index) => ({ ...scene, number: String(index + 1).padStart(2, '0') })), [data]);
  const scenesById = useMemo(() => new Map(scenes.map((scene, index) => [scene.id, index])), [scenes]);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    setIsEnhanced(true);
    const sceneElements = Array.from(document.querySelectorAll('[data-scene-id]')) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visibleScene = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visibleScene) return;
      const index = scenesById.get((visibleScene.target as HTMLElement).dataset.sceneId ?? '');
      if (typeof index === 'number') setActiveIndex((current) => current === index ? current : index);
    }, { rootMargin: '-32% 0px -48% 0px', threshold: [0, .2, .55] });
    sceneElements.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, [scenesById]);

  return <div className="portfolio-experience" data-enhanced={isEnhanced}>
    <a className="skip-link" href="#main-content">Saltar al contenido</a>
    <MinimalNavigation monogram={data.identity.monogram} name={data.identity.name} scenes={scenes} activeIndex={activeIndex} />
    <main id="main-content">{scenes.map((scene, index) => <Scene key={scene.id} scene={scene} active={index === activeIndex}>{renderScene(scene, data)}<ScrollIndicator nextScene={scenes[index + 1]} /></Scene>)}</main>
  </div>;
}

function renderScene(scene: PortfolioScene, data: PortfolioData) {
  switch (scene.id) {
    case 'presentacion': return <PresentationScene data={data} />;
    case 'punto-de-partida': return <OriginScene scene={scene} data={data} />;
    case 'forma-de-aprender': return <LearningScene scene={scene} data={data} />;
    case 'tecnologias': return <TechnologyScene scene={scene} data={data} />;
    case 'proyecto-principal': return <FeaturedProjectScene scene={scene} data={data} />;
    case 'otros-proyectos': return <SecondaryProjectsScene scene={scene} data={data} />;
    case 'progreso': return <GithubProgressScene scene={scene} data={data} />;
    case 'formacion': return <EducationScene scene={scene} data={data} />;
    case 'proximo-nivel': return <NextLevelScene scene={scene} data={data} />;
    case 'contacto': return <ContactScene scene={scene} data={data} />;
    default: return <SceneHeader scene={scene} />;
  }
}

function PresentationScene({ data }: { data: PortfolioData }) {
  const { identity, presentation } = data;
  const links = [
    identity.contact.curriculum && isExternalUrl(identity.contact.curriculum) && { label: 'Ver currículum', href: identity.contact.curriculum },
    identity.contact.github && isExternalUrl(identity.contact.github) && { label: 'GitHub', href: identity.contact.github },
    identity.contact.linkedin && isExternalUrl(identity.contact.linkedin) && { label: 'LinkedIn', href: identity.contact.linkedin },
  ].filter(Boolean) as Array<{ label: string; href: string }>;
  return <div className="presentation-cover">
    <div className="presentation-cover__heading"><p className="presentation-cover__chapter">01 — Portada</p><h1 id="scene-title-presentacion" className="presentation-cover__name">{identity.name}</h1></div>
    <div className="presentation-cover__media" data-ready={Boolean(identity.photo.src)}>{identity.photo.src ? <img src={identity.photo.src} alt={identity.photo.alt} fetchPriority="high" /> : <span aria-hidden="true">{identity.monogram}</span>}</div>
    <div className="presentation-cover__details"><Reveal className="presentation-cover__role"><p>{identity.role}</p></Reveal><Reveal delay="reveal--late" className="presentation-cover__phrase"><p>{presentation.phrase || identity.description}</p></Reveal><Reveal delay="reveal--later" className="presentation-cover__actions"><a className="action-link action-link--primary" href="#scene-proyecto-principal">Conocer proyectos <span aria-hidden="true">↘</span></a>{links.map((link) => <a key={link.label} className="action-link" href={link.href} target="_blank" rel="noreferrer">{link.label}<span aria-hidden="true"> ↗</span></a>)}</Reveal></div>
  </div>;
}

function OriginScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const details = [
    { label: 'Qué estudio o aprendo', value: data.origin.currentStudies },
    { label: 'Qué me movió a crear', value: data.origin.motivation },
    { label: 'El objetivo inicial', value: data.origin.initialGoal },
  ].filter((detail) => Boolean(detail.value));
  const story = data.origin.story || data.identity.description;
  return <div className="origin-chapter"><SceneHeader scene={scene} /><div className="origin-chapter__layout"><Reveal className="origin-chapter__quote"><blockquote>{story}</blockquote><p>Capítulo 02 / Punto de partida</p></Reveal><div className="origin-chapter__media">{data.origin.secondaryPhoto.src ? <img src={data.origin.secondaryPhoto.src} alt={data.origin.secondaryPhoto.alt} loading="lazy" decoding="async" /> : <span aria-hidden="true">{data.identity.monogram}</span>}</div>{details.length > 0 && <div className="origin-chapter__details">{details.map((detail, index) => <Reveal key={detail.label} delay={index > 1 ? 'reveal--later' : 'reveal--late'} className="origin-detail"><span>{String(index + 1).padStart(2, '0')} / {detail.label}</span><p>{detail.value}</p></Reveal>)}</div>}</div><p className="origin-chapter__note">Todavía estoy construyendo experiencia. Este portafolio documenta ese progreso a través de aprendizaje y proyectos propios.</p></div>;
}

function LearningScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const [activeStep, setActiveStep] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const progress = data.learningPrinciples.length > 1 ? activeStep / (data.learningPrinciples.length - 1) : 0;
  useStepObserver(sceneRef, '[data-learning-step]', 'learningStep', setActiveStep, '-42% 0px -42% 0px');
  return <div ref={sceneRef} className="learning-method"><div className="learning-method__lead"><SceneHeader scene={scene} /><p className="learning-method__active">{data.learningPrinciples[activeStep]}</p><span className="learning-method__counter" aria-hidden="true">{String(activeStep + 1).padStart(2, '0')} / {String(data.learningPrinciples.length).padStart(2, '0')}</span></div><ol className="learning-method__track" style={{ '--learning-progress': progress } as CSSProperties}>{data.learningPrinciples.map((principle, index) => <li key={principle} data-learning-step={index} data-active={index === activeStep} aria-current={index === activeStep ? 'step' : undefined}><span>{String(index + 1).padStart(2, '0')}</span><p>{principle}</p></li>)}</ol></div>;
}

function TechnologyScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const [activeStage, setActiveStage] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  useStepObserver(sceneRef, '[data-technology-stage]', 'technologyStage', setActiveStage, '-38% 0px -48% 0px');
  return <div ref={sceneRef} className="technology-system"><SceneHeader scene={scene} /><div className="technology-system__layout"><div className="technology-system__stages" aria-label="Tecnologías relacionadas con etapas de proyecto">{data.technologyStages.map((stage, index) => <section key={stage.id} className="technology-stage" data-technology-stage={index} data-active={index === activeStage} aria-labelledby={`stage-${stage.id}`}><p id={`stage-${stage.id}`}>{stage.label}</p><ul>{data.technologies.filter((technology) => technology.stages.includes(stage.id)).map((technology) => <li key={technology.name}>{technology.name}</li>)}</ul></section>)}</div><div className="technology-system__categories" aria-label="Tecnologías por práctica actual">{data.technologyCategories.map((category) => <div key={category.id} className="technology-category"><span>{category.label}</span><p>{data.technologies.filter((technology) => technology.category === category.id).map((technology) => technology.name).join(' · ')}</p></div>)}</div></div></div>;
}

function FeaturedProjectScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const project = data.projects.find((item) => item.featured);
  const [activeStep, setActiveStep] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const steps = project ? [
    { id: 'description', label: 'Aplicación', content: project.description },
    project.problem && { id: 'problem', label: 'Problema', content: project.problem },
    project.features.length > 0 && { id: 'functions', label: 'Funciones', content: project.features.join(' · ') },
    project.learnings.length > 0 && { id: 'learning', label: 'Aprendizajes', content: project.learnings.join(' · ') },
  ].filter(Boolean) as Array<{ id: string; label: string; content: string }> : [];
  const capture = project?.captures[Math.min(activeStep, Math.max(project.captures.length - 1, 0))];
  useStepObserver(sceneRef, '[data-project-step]', 'projectStep', setActiveStep, '-38% 0px -45% 0px');
  if (!project) return <SceneHeader scene={scene} />;
  return <div ref={sceneRef} className="featured-project"><div className="featured-project__lead"><SceneHeader scene={scene} />{project.status && <p className="featured-project__meta">Capítulo 05 / {project.status}</p>}</div><div className="featured-project__media"><ProjectMedia src={capture?.src} alt={capture?.alt || `Captura de ${project.name}`} priority={activeStep === 0} />{capture?.label && <span className="featured-project__capture-label">{capture.label}</span>}</div><div className="featured-project__steps">{steps.map((step, index) => <article key={step.id} data-project-step={index} data-active={index === activeStep}><span>{String(index + 1).padStart(2, '0')} / {step.label}</span><h3>{step.label}</h3><p>{step.content}</p>{step.id === 'description' && project.audience && <p className="featured-project__audience">Pensado para: {project.audience}</p>}{step.id === 'functions' && project.technologies.length > 0 && <p className="featured-project__technologies">Tecnologías: {project.technologies.join(' · ')}</p>}</article>)}</div>{(isExternalUrl(project.links.demo) || isExternalUrl(project.links.repository)) && <div className="featured-project__links"><span>Explorar proyecto</span>{isExternalUrl(project.links.demo) && <a href={project.links.demo} target="_blank" rel="noreferrer">Ver demo ↗</a>}{isExternalUrl(project.links.repository) && <a href={project.links.repository} target="_blank" rel="noreferrer">Repositorio ↗</a>}</div>}</div>;
}

function SecondaryProjectsScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const projects = data.projects.filter((project) => !project.featured && isConfiguredProject(project));
  return <div className="secondary-projects"><SceneHeader scene={scene} /><div className="secondary-projects__list">{projects.map((project, index) => <article key={project.id} className="secondary-project"><div className="secondary-project__media"><ProjectMedia src={project.captures[0]?.src} alt={project.captures[0]?.alt || `Captura de ${project.name}`} /></div><div className="secondary-project__content"><span>{String(index + 1).padStart(2, '0')} / Capítulo</span><h3>{project.name}</h3><p>{project.description}</p><dl>{project.problem && <div><dt>Problema</dt><dd>{project.problem}</dd></div>}{project.technologies.length > 0 && <div><dt>Tecnologías</dt><dd>{project.technologies.join(' · ')}</dd></div>}{project.status && <div><dt>Estado</dt><dd>{project.status}</dd></div>}{project.learnings.length > 0 && <div><dt>Aprendizaje</dt><dd>{project.learnings.join(' · ')}</dd></div>}</dl>{(isExternalUrl(project.links.demo) || isExternalUrl(project.links.repository)) && <div className="secondary-project__links">{isExternalUrl(project.links.demo) && <a href={project.links.demo} target="_blank" rel="noreferrer">Demo ↗</a>}{isExternalUrl(project.links.repository) && <a href={project.links.repository} target="_blank" rel="noreferrer">Repositorio ↗</a>}</div>}</div></article>)}</div></div>;
}

function GithubProgressScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const repositories = data.github.featuredRepositories.filter((repository) => Boolean(repository.name));
  return <div className="github-progress"><SceneHeader scene={scene} /><div className="github-progress__layout"><div className="github-progress__summary"><Reveal><span className="github-progress__number">≈{data.github.contributions}</span></Reveal><Reveal delay="reveal--late"><p>{data.github.message}</p></Reveal><span className="github-progress__source">Dato {data.github.source === 'manual' ? 'manual editable · no representa actividad diaria' : 'conectado a una fuente verificada'}</span>{isExternalUrl(data.github.profileUrl) && <a href={data.github.profileUrl} target="_blank" rel="noreferrer">Ver perfil de GitHub ↗</a>}</div><div className="github-progress__matrix" aria-label="Representación visual no diaria de constancia" aria-describedby="github-progress-note">{Array.from({ length: 42 }, (_, index) => <span key={index} aria-hidden="true" />)}</div></div><p id="github-progress-note" className="github-progress__note">Esta cuadrícula representa ritmo de construcción. No utiliza ni aparenta datos diarios reales de GitHub.</p>{repositories.length > 0 && <div className="repository-list"><span>Repositorios destacados</span>{repositories.map((repository) => <article key={repository.name}><h3>{repository.name}</h3>{repository.description && <p>{repository.description}</p>}{repository.technologies.length > 0 && <small>{repository.technologies.join(' · ')}</small>}{isExternalUrl(repository.url) && <a href={repository.url} target="_blank" rel="noreferrer">Repositorio ↗</a>}</article>)}</div>}</div>;
}

function EducationScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const groups = [
    { label: 'Estudios actuales', entries: data.education.studies.filter((entry) => entry.status === 'current').map((entry) => ({ name: entry.title, ...entry })) },
    { label: 'Cursos completados', entries: data.education.courses.filter((entry) => entry.status === 'completed').map((entry) => ({ name: entry.title, ...entry })) },
    { label: 'Cursos en progreso', entries: data.education.courses.filter((entry) => entry.status === 'in-progress').map((entry) => ({ name: entry.title, ...entry })) },
    { label: 'Certificaciones principales', entries: data.education.certifications.filter((entry) => entry.level === 'primary').map((entry) => ({ name: entry.name, ...entry })) },
    { label: 'Certificaciones secundarias', entries: data.education.certifications.filter((entry) => entry.level === 'secondary').map((entry) => ({ name: entry.name, ...entry })), secondary: true },
  ].filter((group) => group.entries.length > 0);
  return <div className="education-journey"><SceneHeader scene={scene} /><div className="education-journey__list">{groups.map((group) => <section key={group.label} className={`education-group ${group.secondary ? 'education-group--secondary' : ''}`}><h3>{group.label}</h3><ul>{group.entries.map((entry) => <li key={`${entry.name}-${entry.date}`}><div><strong>{entry.name}</strong>{(entry.institution || entry.date) && <span>{[entry.institution, entry.date].filter(Boolean).join(' · ')}</span>}</div>{isExternalUrl(entry.evidenceUrl) && <a href={entry.evidenceUrl} target="_blank" rel="noreferrer">Evidencia ↗</a>}</li>)}</ul></section>)}</div></div>;
}

function NextLevelScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  return <div className="next-level"><SceneHeader scene={scene} /><Reveal className="next-level__path"><ol>{data.goals.map((goal, index) => <li key={goal}><span>{String(index + 1).padStart(2, '0')}</span><p>{goal}</p></li>)}</ol><p className="next-level__closing">El siguiente paso no es aparentar haber llegado: es seguir haciendo el trabajo que permite avanzar.</p></Reveal></div>;
}

function ContactScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const [copied, setCopied] = useState(false);
  const { identity } = data;
  const canCopy = Boolean(identity.contact.email && typeof navigator !== 'undefined' && navigator.clipboard);
  const channels = [
    identity.contact.email && { label: 'Correo', value: identity.contact.email, href: `mailto:${identity.contact.email}` },
    isExternalUrl(identity.contact.github) && { label: 'GitHub', value: identity.contact.github, href: identity.contact.github },
    isExternalUrl(identity.contact.linkedin) && { label: 'LinkedIn', value: identity.contact.linkedin, href: identity.contact.linkedin },
    isExternalUrl(identity.contact.curriculum) && { label: 'Currículum', value: identity.contact.curriculum, href: identity.contact.curriculum },
  ].filter(Boolean) as Array<{ label: string; value: string; href: string }>;
  const copyEmail = async () => { if (!canCopy) return; try { await navigator.clipboard.writeText(identity.contact.email); setCopied(true); window.setTimeout(() => setCopied(false), 2200); } catch { setCopied(false); } };
  return <div className="contact-closing"><SceneHeader scene={scene} /><div className="contact-closing__layout"><Reveal className="contact-closing__statement"><p>Estoy construyendo mi primera etapa en desarrollo. Me interesa seguir aprendiendo junto a otros desarrolladores, aportar en proyectos y conversar sobre oportunidades junior.</p><dl><div><dt>Ubicación</dt><dd>{identity.location}</dd></div>{identity.availability && <div><dt>Disponibilidad</dt><dd>{identity.availability}</dd></div>}</dl></Reveal>{channels.length > 0 && <div className="contact-closing__channels" aria-label="Métodos de contacto">{channels.map((channel) => <div key={channel.label} className="contact-channel"><span>{channel.label}</span><a href={channel.href} target={channel.label === 'Correo' ? undefined : '_blank'} rel={channel.label === 'Correo' ? undefined : 'noreferrer'}>{channel.value}<b aria-hidden="true"> ↗</b></a></div>)}{canCopy && <><button type="button" className="copy-email-button" onClick={copyEmail}>{copied ? 'Correo copiado' : 'Copiar correo'}</button><span className="contact-closing__copy-status" aria-live="polite">{copied ? 'Correo copiado al portapapeles.' : ''}</span></>}</div>}</div><div className="contact-closing__return"><span className="contact-closing__monogram" aria-hidden="true">{identity.monogram}</span><p>La historia sigue abierta.</p><a href="#scene-presentacion">Volver al inicio <span aria-hidden="true">↑</span></a></div></div>;
}

function useStepObserver(ref: { current: HTMLDivElement | null }, selector: string, datasetKey: string, setActive: (value: (current: number) => number) => void, rootMargin: string) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const elements = Array.from(root.querySelectorAll(selector)) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      const index = Number((visible.target as HTMLElement).dataset[datasetKey]);
      if (!Number.isNaN(index)) setActive((current) => current === index ? current : index);
    }, { rootMargin, threshold: [0, .45, 1] });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [datasetKey, ref, rootMargin, selector, setActive]);
}
