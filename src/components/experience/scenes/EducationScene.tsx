import { forwardRef } from 'react';

export const EducationScene = forwardRef<HTMLElement>(function EducationScene(_, ref) {
  return (
    <section
      ref={ref}
      className="portfolio-scene portfolio-scene--education portfolio-scene--animated"
      aria-labelledby="education-title"
    >
      <div className="education-scene__layout">
        <div className="education-scene__primary" data-education-reveal>
          <h2 id="education-title">Estudiante de Ingeniería en Sistemas Computacionales en UTESA.</h2>
          <p className="education-scene__academy">Formación complementaria en T-eco Academy.</p>
        </div>

        <div className="education-scene__institutions" aria-label="Instituciones de formación" data-education-reveal>
          <figure className="education-scene__institution education-scene__institution--utesa">
            <img src="/assets/logos/utesa-logo.png" alt="Logo de UTESA" />
            <figcaption>UTESA</figcaption>
          </figure>
          <figure className="education-scene__institution education-scene__institution--teco">
            <img
              src="/assets/logos/teco-academy-logo.png"
              alt="Logo de T-eco Academy"
              onError={(event) => { event.currentTarget.hidden = true; }}
            />
            <figcaption>T-eco Academy</figcaption>
          </figure>
        </div>

        <div className="education-scene__details" data-education-reveal>
          <p>Aprendizaje en C#, Blender, Unity, Figma, inteligencia artificial y realidad virtual.</p>
          <p className="education-scene__goal">Objetivo: convertirme en desarrollador full stack.</p>
        </div>
      </div>
    </section>
  );
});
