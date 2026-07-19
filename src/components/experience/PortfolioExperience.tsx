import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { PortfolioData, PortfolioScene } from '../../data/portfolioData';
import { MinimalNavigation } from './MinimalNavigation';
import { ProjectMedia } from './ProjectMedia';
import { Reveal } from './Reveal';
import { Scene } from './Scene';
import { SceneHeader } from './SceneHeader';
import { ScrollIndicator } from './ScrollIndicator';

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
    <main id="main-content">{data.scenes.map((scene, index) => <Scene key={scene.id} scene={scene} active={index === activeIndex}>{scene.id === 'presentacion' ? <PresentationScene data={data} /> : scene.id === 'punto-de-partida' ? <OriginScene scene={scene} data={data} /> : scene.id === 'forma-de-aprender' ? <LearningScene scene={scene} data={data} /> : scene.id === 'tecnologias' ? <TechnologyScene scene={scene} data={data} /> : scene.id === 'proyecto-principal' ? <FeaturedProjectScene scene={scene} data={data} /> : scene.id === 'otros-proyectos' ? <SecondaryProjectsScene scene={scene} data={data} /> : scene.id === 'progreso' ? <GithubProgressScene scene={scene} data={data} /> : scene.id === 'formacion' ? <EducationScene scene={scene} data={data} /> : scene.id === 'proximo-nivel' ? <NextLevelScene scene={scene} data={data} /> : scene.id === 'contacto' ? <ContactScene scene={scene} data={data} /> : <><SceneHeader scene={scene} /><SceneContent scene={scene} data={data} /></>}<ScrollIndicator nextScene={data.scenes[index + 1]} /></Scene>)}</main>
  </div>;
}

function SceneContent({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const featuredProject = data.projects.find((project) => project.featured) ?? data.projects[0];
  if (scene.id === 'presentacion') return <div className="scene-intro"><Reveal><p className="scene-intro__role">{data.identity.role}</p></Reveal><Reveal delay="reveal--late"><p className="scene-intro__description">{data.identity.description}</p></Reveal><div className="portrait-frame" role="img" aria-label={data.identity.photo.alt}>{data.identity.photo.src ? <img src={data.identity.photo.src} alt={data.identity.photo.alt} fetchPriority="high" /> : <span>Fotografía principal pendiente</span>}</div></div>;
  return <p className="scene-placeholder">El contenido de este capítulo se desarrollará con información personal verificada.</p>;
}

function PresentationScene({ data }: { data: PortfolioData }) {
  const { identity, presentation } = data;
  const hasPhoto = Boolean(identity.photo.src);
  const contactLinks = [
    identity.contact.curriculum && { label: 'Ver currículum', href: identity.contact.curriculum },
    identity.contact.github && { label: 'GitHub', href: identity.contact.github },
    identity.contact.linkedin && { label: 'LinkedIn', href: identity.contact.linkedin },
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return <div className="presentation-cover">
    <div className="presentation-cover__heading">
      <p className="presentation-cover__chapter">01 — Portada</p>
      <h1 id="scene-title-presentacion" className="presentation-cover__name">{identity.name}</h1>
    </div>
    <div className="presentation-cover__media" data-ready={hasPhoto} role={hasPhoto ? undefined : 'img'} aria-label={hasPhoto ? undefined : identity.photo.alt}>
      {hasPhoto ? <img src={identity.photo.src} alt={identity.photo.alt} fetchPriority="high" /> : <span>Fotografía principal pendiente</span>}
    </div>
    <div className="presentation-cover__details">
      <Reveal className="presentation-cover__role"><p>{identity.role}</p></Reveal>
      <Reveal delay="reveal--late" className="presentation-cover__phrase"><p>{presentation.phrase || 'FRASE PRINCIPAL — PENDIENTE DE CONFIGURAR'}</p></Reveal>
      <Reveal delay="reveal--later" className="presentation-cover__actions">
        <a className="action-link action-link--primary" href="#scene-proyecto-principal">Conocer proyectos <span aria-hidden="true">↘</span></a>
        {contactLinks.map((link) => <a key={link.label} className="action-link" href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>{link.label}<span aria-hidden="true"> ↗</span></a>)}
        {!identity.contact.curriculum && <span className="action-link action-link--pending">Currículum pendiente</span>}
        {!identity.contact.github && <span className="action-link action-link--pending">GitHub pendiente</span>}
        {!identity.contact.linkedin && <span className="action-link action-link--pending">LinkedIn pendiente</span>}
      </Reveal>
    </div>
  </div>;
}

function OriginScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const details = [
    { label: 'Cómo comenzó', value: data.origin.story, placeholder: 'HISTORIA DE INICIO — PENDIENTE DE CONFIGURAR' },
    { label: 'Qué estudio o aprendo', value: data.origin.currentStudies, placeholder: 'ESTUDIOS ACTUALES — PENDIENTE DE CONFIGURAR' },
    { label: 'Qué me movió a crear', value: data.origin.motivation, placeholder: 'MOTIVACIÓN — PENDIENTE DE CONFIGURAR' },
    { label: 'El objetivo inicial', value: data.origin.initialGoal, placeholder: 'OBJETIVO INICIAL — PENDIENTE DE CONFIGURAR' },
  ];

  return <div className="origin-chapter">
    <SceneHeader scene={scene} />
    <div className="origin-chapter__layout">
      <Reveal className="origin-chapter__quote"><blockquote>{data.origin.story || 'HISTORIA DE INICIO — PENDIENTE DE CONFIGURAR'}</blockquote><p>Capítulo 02 / Punto de partida</p></Reveal>
      <div className="origin-chapter__media" role={data.origin.secondaryPhoto.src ? undefined : 'img'} aria-label={data.origin.secondaryPhoto.src ? undefined : data.origin.secondaryPhoto.alt}>
        {data.origin.secondaryPhoto.src ? <img src={data.origin.secondaryPhoto.src} alt={data.origin.secondaryPhoto.alt} loading="lazy" /> : <span>Fotografía secundaria pendiente</span>}
      </div>
      <div className="origin-chapter__details">{details.map((detail, index) => <Reveal key={detail.label} delay={index > 1 ? 'reveal--later' : 'reveal--late'} className="origin-detail"><span>{String(index + 1).padStart(2, '0')} / {detail.label}</span><p>{detail.value || detail.placeholder}</p></Reveal>)}<p className="origin-chapter__note">Todavía estoy construyendo experiencia. Este portafolio documenta ese progreso a través de aprendizaje y proyectos propios.</p></div>
    </div>
  </div>;
}

function LearningScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const [activeStep, setActiveStep] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const progress = data.learningPrinciples.length > 1 ? activeStep / (data.learningPrinciples.length - 1) : 0;

  useEffect(() => {
    const root = sceneRef.current;
    if (!root) return;
    const steps = Array.from(root.querySelectorAll('[data-learning-step]')) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visibleStep = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visibleStep) return;
      const index = Number((visibleStep.target as HTMLElement).dataset.learningStep);
      if (!Number.isNaN(index)) setActiveStep((current) => current === index ? current : index);
    }, { rootMargin: '-42% 0px -42% 0px', threshold: [0, .5, 1] });
    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return <div ref={sceneRef} className="learning-method">
    <div className="learning-method__lead">
      <SceneHeader scene={scene} />
      <p className="learning-method__active" aria-label={`Idea actual: ${data.learningPrinciples[activeStep]}`}>{data.learningPrinciples[activeStep]}</p>
      <span className="learning-method__counter" aria-hidden="true">{String(activeStep + 1).padStart(2, '0')} / {String(data.learningPrinciples.length).padStart(2, '0')}</span>
    </div>
    <ol className="learning-method__track" style={{ '--learning-progress': progress } as CSSProperties}>
      {data.learningPrinciples.map((principle, index) => <li key={principle} data-learning-step={index} data-active={index === activeStep} aria-current={index === activeStep ? 'step' : undefined}><span>{String(index + 1).padStart(2, '0')}</span><p>{principle}</p></li>)}
    </ol>
  </div>;
}

function TechnologyScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const [activeStage, setActiveStage] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sceneRef.current;
    if (!root) return;
    const stages = Array.from(root.querySelectorAll('[data-technology-stage]')) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visibleStage = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visibleStage) return;
      const index = Number((visibleStage.target as HTMLElement).dataset.technologyStage);
      if (!Number.isNaN(index)) setActiveStage((current) => current === index ? current : index);
    }, { rootMargin: '-38% 0px -48% 0px', threshold: [0, .45, 1] });
    stages.forEach((stage) => observer.observe(stage));
    return () => observer.disconnect();
  }, []);

  return <div ref={sceneRef} className="technology-system">
    <SceneHeader scene={scene} />
    <div className="technology-system__layout">
      <div className="technology-system__stages" aria-label="Tecnologías relacionadas con etapas de proyecto">
        {data.technologyStages.map((stage, index) => {
          const stageTechnologies = data.technologies.filter((technology) => technology.stages.includes(stage.id));
          return <section key={stage.id} className="technology-stage" data-technology-stage={index} data-active={index === activeStage} aria-labelledby={`stage-${stage.id}`}><p id={`stage-${stage.id}`}>{stage.label}</p><ul>{stageTechnologies.map((technology) => <li key={technology.name}>{technology.name}</li>)}</ul></section>;
        })}
      </div>
      <div className="technology-system__categories" aria-label="Tecnologías por práctica actual">
        {data.technologyCategories.map((category) => <div key={category.id} className="technology-category"><span>{category.label}</span><p>{data.technologies.filter((technology) => technology.category === category.id).map((technology) => technology.name).join(' · ') || 'Pendiente de configurar'}</p></div>)}
      </div>
    </div>
  </div>;
}

function FeaturedProjectScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const project = data.projects.find((item) => item.featured);
  const [activeStep, setActiveStep] = useState(0);
  const sceneRef = useRef<HTMLDivElement>(null);
  const steps = project ? [
    { id: 'problem', label: 'Problema', content: project.problem || 'PROBLEMA — PENDIENTE DE CONFIGURAR' },
    { id: 'solution', label: 'Solución', content: project.description || 'DESCRIPCIÓN COMPLETA — PENDIENTE DE CONFIGURAR' },
    { id: 'functions', label: 'Funciones', content: project.features.length ? project.features.join(' · ') : 'FUNCIONES — PENDIENTE DE CONFIGURAR' },
    { id: 'learning', label: 'Aprendizajes', content: project.learnings.length ? project.learnings.join(' · ') : 'APRENDIZAJES — PENDIENTE DE CONFIGURAR' },
  ] : [];
  const capture = project?.captures[activeStep] ?? project?.captures[0];

  useEffect(() => {
    const root = sceneRef.current;
    if (!root) return;
    const stepElements = Array.from(root.querySelectorAll('[data-project-step]')) as HTMLElement[];
    const observer = new IntersectionObserver((entries) => {
      const visibleStep = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visibleStep) return;
      const index = Number((visibleStep.target as HTMLElement).dataset.projectStep);
      if (!Number.isNaN(index)) setActiveStep((current) => current === index ? current : index);
    }, { rootMargin: '-38% 0px -45% 0px', threshold: [0, .45, 1] });
    stepElements.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  if (!project) return <><SceneHeader scene={scene} /><p className="scene-placeholder">Proyecto principal pendiente de configurar.</p></>;

  return <div ref={sceneRef} className="featured-project">
    <div className="featured-project__lead"><SceneHeader scene={scene} /><p className="featured-project__meta">Capítulo 05 / {project.status || 'ESTADO — PENDIENTE DE CONFIGURAR'}</p></div>
    <div className="featured-project__media"><ProjectMedia src={capture?.src} alt={capture?.alt ?? 'Captura de FloristManager'} priority={activeStep === 0} label={capture?.label || 'CAPTURAS DE FLORISTMANAGER — PENDIENTES DE CONFIGURAR'} /><span className="featured-project__capture-label">{capture?.label || 'Captura pendiente'} · {String(Math.min(activeStep + 1, steps.length)).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}</span></div>
    <div className="featured-project__steps">{steps.map((step, index) => <article key={step.id} data-project-step={index} data-active={index === activeStep}><span>{String(index + 1).padStart(2, '0')} / {step.label}</span><h3>{step.label}</h3><p>{step.content}</p>{step.id === 'solution' && <p className="featured-project__audience">Para: {project.audience || 'USUARIO OBJETIVO — PENDIENTE DE CONFIGURAR'}</p>}{step.id === 'functions' && <p className="featured-project__technologies">Tecnologías: {project.technologies.length ? project.technologies.join(' · ') : 'TECNOLOGÍAS — PENDIENTE DE CONFIGURAR'}</p>}</article>)}</div>
    <div className="featured-project__links"><span>Explorar proyecto</span>{project.links.demo ? <a href={project.links.demo} target="_blank" rel="noreferrer">Ver demo ↗</a> : <span>Demo pendiente</span>}{project.links.repository ? <a href={project.links.repository} target="_blank" rel="noreferrer">Repositorio ↗</a> : <span>Repositorio pendiente</span>}</div>
  </div>;
}

function SecondaryProjectsScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const projects = data.projects.filter((project) => !project.featured);
  return <div className="secondary-projects"><SceneHeader scene={scene} /><div className="secondary-projects__list">{projects.map((project, index) => <article key={project.id} className="secondary-project"><div className="secondary-project__media"><ProjectMedia src={project.captures[0]?.src} alt={project.captures[0]?.alt ?? 'Captura de proyecto secundario'} label="CAPTURA DEL PROYECTO — PENDIENTE DE CONFIGURAR" /></div><div className="secondary-project__content"><span>{String(index + 1).padStart(2, '0')} / Capítulo</span><h3>{project.name || 'NOMBRE DEL PROYECTO — PENDIENTE'}</h3><p>{project.description || 'DESCRIPCIÓN — PENDIENTE DE CONFIGURAR'}</p><dl><div><dt>Problema</dt><dd>{project.problem || 'PENDIENTE'}</dd></div><div><dt>Tecnologías</dt><dd>{project.technologies.length ? project.technologies.join(' · ') : 'PENDIENTE'}</dd></div><div><dt>Estado</dt><dd>{project.status || 'PENDIENTE'}</dd></div><div><dt>Aprendizaje</dt><dd>{project.learnings.length ? project.learnings.join(' · ') : 'PENDIENTE'}</dd></div></dl><div className="secondary-project__links">{project.links.demo ? <a href={project.links.demo} target="_blank" rel="noreferrer">Demo ↗</a> : <span>Demo pendiente</span>}{project.links.repository ? <a href={project.links.repository} target="_blank" rel="noreferrer">Repositorio ↗</a> : <span>Repositorio pendiente</span>}</div></div></article>)}</div></div>;
}

function GithubProgressScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  return <div className="github-progress"><SceneHeader scene={scene} /><div className="github-progress__layout"><div className="github-progress__summary"><Reveal><span className="github-progress__number">≈{data.github.contributions}</span></Reveal><Reveal delay="reveal--late"><p>{data.github.message}</p></Reveal><span className="github-progress__source">Dato {data.github.source === 'manual' ? 'manual editable · no representa actividad diaria' : 'conectado a una fuente verificada'}</span>{data.github.profileUrl ? <a href={data.github.profileUrl} target="_blank" rel="noreferrer">Ver perfil de GitHub ↗</a> : <span className="github-progress__pending">Perfil de GitHub pendiente de configurar</span>}</div><div className="github-progress__matrix" aria-label="Representación visual no diaria de constancia" aria-describedby="github-progress-note">{Array.from({ length: 42 }, (_, index) => <span key={index} aria-hidden="true" />)}</div></div><p id="github-progress-note" className="github-progress__note">Esta cuadrícula representa ritmo de construcción. No utiliza ni aparenta datos diarios reales de GitHub.</p><div className="repository-list"><span>Repositorios destacados</span>{data.github.featuredRepositories.length ? data.github.featuredRepositories.map((repository) => <article key={repository.name}><h3>{repository.name}</h3><p>{repository.description || 'DESCRIPCIÓN — PENDIENTE DE CONFIGURAR'}</p><small>{repository.technologies.length ? repository.technologies.join(' · ') : 'TECNOLOGÍAS — PENDIENTE DE CONFIGURAR'}</small>{repository.url ? <a href={repository.url} target="_blank" rel="noreferrer">Repositorio ↗</a> : <span>Repositorio pendiente</span>}</article>) : <p className="scene-placeholder">Agrega repositorios destacados y tecnologías verificadas desde la fuente de datos.</p>}</div></div>;
}

function EducationScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const sections = [
    { label: 'Estudios actuales', entries: data.education.studies.filter((entry) => entry.status === 'current'), type: 'title' },
    { label: 'Cursos completados', entries: data.education.courses.filter((entry) => entry.status === 'completed'), type: 'title' },
    { label: 'Cursos en progreso', entries: data.education.courses.filter((entry) => entry.status === 'in-progress'), type: 'title' },
    { label: 'Certificaciones principales', entries: data.education.certifications.filter((entry) => entry.level === 'primary'), type: 'name' },
    { label: 'Certificaciones secundarias', entries: data.education.certifications.filter((entry) => entry.level === 'secondary'), type: 'name' },
  ];
  return <div className="education-journey"><SceneHeader scene={scene} /><div className="education-journey__list">{sections.map((section) => <section key={section.label} className={`education-group ${section.label === 'Certificaciones secundarias' ? 'education-group--secondary' : ''}`}><h3>{section.label}</h3>{section.entries.length ? <ul>{section.entries.map((entry) => <li key={`${entry[section.type]}-${entry.date}`}><div><strong>{entry[section.type]}</strong><span>{entry.institution || 'INSTITUCIÓN — PENDIENTE'} · {entry.date || 'FECHA — PENDIENTE'}</span></div>{entry.evidenceUrl ? <a href={entry.evidenceUrl} target="_blank" rel="noreferrer">Evidencia ↗</a> : <span>Evidencia pendiente</span>}</li>)}</ul> : <p>Sin información registrada todavía.</p>}</section>)}</div></div>;
}

function NextLevelScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  return <div className="next-level"><SceneHeader scene={scene} /><Reveal className="next-level__path"><ol>{data.goals.map((goal, index) => <li key={goal}><span>{String(index + 1).padStart(2, '0')}</span><p>{goal}</p></li>)}</ol><p className="next-level__closing">El siguiente paso no es aparentar haber llegado: es seguir haciendo el trabajo que permite avanzar.</p></Reveal></div>;
}

function ContactScene({ scene, data }: { scene: PortfolioScene; data: PortfolioData }) {
  const [copied, setCopied] = useState(false);
  const { identity } = data;
  const hasEmail = Boolean(identity.contact.email);
  const isExternalUrl = (value: string) => /^https?:\/\//i.test(value);

  const copyEmail = async () => {
    if (!hasEmail || !navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(identity.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const channels = [
    { label: 'Correo', value: identity.contact.email, href: hasEmail ? `mailto:${identity.contact.email}` : '' },
    { label: 'GitHub', value: identity.contact.github, href: identity.contact.github },
    { label: 'LinkedIn', value: identity.contact.linkedin, href: identity.contact.linkedin },
    { label: 'Currículum', value: identity.contact.curriculum, href: identity.contact.curriculum },
  ];

  return <div className="contact-closing"><SceneHeader scene={scene} /><div className="contact-closing__layout"><Reveal className="contact-closing__statement"><p>Estoy construyendo mi primera etapa en desarrollo. Me interesa seguir aprendiendo junto a otros desarrolladores, aportar en proyectos y conversar sobre oportunidades junior.</p><dl><div><dt>Ubicación</dt><dd>{identity.location}</dd></div><div><dt>Disponibilidad</dt><dd>{identity.availability || 'DISPONIBILIDAD — PENDIENTE DE CONFIGURAR'}</dd></div></dl></Reveal><div className="contact-closing__channels" aria-label="Métodos de contacto">{channels.map((channel) => <div key={channel.label} className="contact-channel"><span>{channel.label}</span>{channel.href && (channel.label === 'Correo' || isExternalUrl(channel.href)) ? <a href={channel.href} target={channel.label === 'Correo' ? undefined : '_blank'} rel={channel.label === 'Correo' ? undefined : 'noreferrer'}>{channel.value}<b aria-hidden="true"> ↗</b></a> : <p>{channel.label.toUpperCase()} — PENDIENTE DE CONFIGURAR</p>}</div>)}<button type="button" className="copy-email-button" onClick={copyEmail} disabled={!hasEmail || !navigator.clipboard}>{copied ? 'Correo copiado' : hasEmail ? 'Copiar correo' : 'Correo pendiente de configurar'}</button><span className="contact-closing__copy-status" aria-live="polite">{copied ? 'Correo copiado al portapapeles.' : ''}</span></div></div><div className="contact-closing__return"><span className="contact-closing__monogram" aria-hidden="true">{identity.monogram}</span><p>La historia sigue abierta.</p><a href="#scene-presentacion">Volver al inicio <span aria-hidden="true">↑</span></a></div></div>;
}
