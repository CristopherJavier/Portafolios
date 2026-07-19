export function ProjectMedia({ src, alt, priority = false }: { src?: string; alt: string; priority?: boolean }) {
  if (!src) return <div className="project-media project-media--placeholder" aria-hidden="true" />;
  return <figure className="project-media"><img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" /></figure>;
}
