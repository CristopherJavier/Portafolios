import { forwardRef } from 'react';
import { educationInstitutions } from '../../../data/educationData';
import { EducationInstitution } from './EducationInstitution';

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
          {educationInstitutions.map((institution) => (
            <EducationInstitution key={institution.id} institution={institution} />
          ))}
        </div>

        <div className="education-scene__details" data-education-reveal>
          <p>Aprendizaje en C#, Blender, Unity, Figma, inteligencia artificial y realidad virtual.</p>
          <p className="education-scene__goal">Objetivo: convertirme en desarrollador full stack.</p>
        </div>
      </div>
    </section>
  );
});
