import { forwardRef } from 'react';

type LayerDirection = 'initial' | 'up' | 'right';

type LayeredSceneProps = {
  direction: LayerDirection;
  index: number;
  title: string;
};

export const LayeredScene = forwardRef<HTMLElement, LayeredSceneProps>(function LayeredScene({ direction, index, title }, ref) {
  const Heading = index === 0 ? 'h1' : 'h2';
  const headingId = `layered-scene-${index + 1}`;

  if (index === 0) {
    return (
      <section
        ref={ref}
        className="layered-scene layered-scene--presentation"
        data-direction={direction}
        data-scene={index + 1}
        aria-labelledby={headingId}
      >
        <div className="presentation-scene__portrait-art">
          <img
            className="presentation-scene__portrait"
            src="/assets/images/cristopher-javier.jpg"
            alt="Cristopher Javier"
            decoding="async"
            fetchPriority="high"
          />
        </div>
        <div className="presentation-scene__content">
          <p className="presentation-scene__role">Programador y desarrollador en formación</p>
          <h1 id={headingId}>Cristopher Javier</h1>
          <p className="presentation-scene__statement">
            Convierto curiosidad en proyectos reales y cada línea de código en una oportunidad para crecer.
          </p>
          <p className="presentation-scene__location">Santiago de los Caballeros, República Dominicana</p>
          <div className="presentation-scene__actions">
            <a href="https://github.com/CristopherJavier" target="_blank" rel="noreferrer">GitHub</a>
            <a href="/assets/documents/cv-cristopher-javier.pdf" download>Descargar CV</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className="layered-scene"
      data-direction={direction}
      data-scene={index + 1}
      aria-labelledby={headingId}
    >
      <Heading id={headingId}>{title}</Heading>
    </section>
  );
});
