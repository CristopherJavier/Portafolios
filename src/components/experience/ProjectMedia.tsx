export function ProjectMedia({ src, alt, priority = false, label = 'Captura del proyecto pendiente' }: { src?: string; alt: string; priority?: boolean; label?: string }) {
  if (!src) return <div className="project-media project-media--placeholder" role="img" aria-label={label}>{label}</div>;
  return <figure className="project-media"><img src={src} alt={alt} loading={priority ? 'eager' : 'lazy'} decoding="async" /></figure>;
}
