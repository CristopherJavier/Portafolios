interface SocialLinksProps { email: string; github: string; linkedin: string; curriculum: string; }

export function SocialLinks({ email, github, linkedin, curriculum }: SocialLinksProps) {
  const links = [email && { label: 'Correo', href: `mailto:${email}` }, github && { label: 'GitHub', href: github }, linkedin && { label: 'LinkedIn', href: linkedin }, curriculum && { label: 'Currículum', href: curriculum }].filter(Boolean) as Array<{ label: string; href: string }>;
  if (!links.length) return <p className="contact-pending">Configura correo, redes y currículum en <code>src/data/portfolioData.ts</code>.</p>;
  return <ul className="social-links" aria-label="Canales de contacto">{links.map((link) => <li key={link.label}><a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined}>{link.label}<span aria-hidden="true"> ↗</span></a></li>)}</ul>;
}
