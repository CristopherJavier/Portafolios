import { forwardRef } from 'react';

export const TechnologiesScene = forwardRef<HTMLElement>(function TechnologiesScene(_, ref) {
  return (
    <section
      ref={ref}
      className="portfolio-scene portfolio-scene--technologies portfolio-scene--animated"
      aria-labelledby="technologies-title"
    >
      <div className="technologies-scene__content" data-scene-content="pending">
        <h2 id="technologies-title">Tecnologías</h2>
        <div className="technologies-scene__canvas" aria-hidden="true" />
      </div>
    </section>
  );
});
