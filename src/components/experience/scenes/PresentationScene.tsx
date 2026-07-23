import { forwardRef } from 'react';

export const PresentationScene = forwardRef<HTMLElement>(function PresentationScene(_, ref) {
  return (
    <section
      ref={ref}
      className="portfolio-scene portfolio-scene--presentation portfolio-scene--animated"
      aria-labelledby="presentation-title"
    >
      <div className="presentation-scene__portrait-art" data-presentation-reveal="photo">
        <img
          className="presentation-scene__portrait"
          src="/assets/images/cristopher-javier.jpg"
          alt="Cristopher Javier"
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="presentation-scene__content">
        <h2 id="presentation-title" data-presentation-reveal="name">Cristopher Javier</h2>
        <p className="presentation-scene__role" data-presentation-reveal="role">
          Programador y desarrollador en formación
        </p>
        <p className="presentation-scene__statement" data-presentation-reveal="description">
          Convierto curiosidad en proyectos reales y cada línea de código en una oportunidad para crecer.
        </p>
        <p className="presentation-scene__location" data-presentation-reveal="location">
          Santiago de los Caballeros, República Dominicana
        </p>
        <div className="presentation-scene__actions" data-presentation-reveal="actions">
          <a href="https://github.com/CristopherJavier" target="_blank" rel="noreferrer">GitHub</a>
          <a href="/assets/documents/cv-cristopher-javier.pdf" download>Descargar CV</a>
        </div>
      </div>
    </section>
  );
});
