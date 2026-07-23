import { forwardRef } from 'react';
import { educationInstitutions, educationSceneContent } from '../../../data/educationData';
import { EducationInstitution } from './EducationInstitution';

export const EducationScene = forwardRef<HTMLElement>(function EducationScene(_, ref) {
  return (
    <section
      ref={ref}
      className="portfolio-scene portfolio-scene--education portfolio-scene--animated"
      aria-labelledby="education-title"
    >
      <div className="education-scene__layout">
        <div className="education-scene__primary" data-education-heading>
          <h2 id="education-title">{educationSceneContent.title}</h2>
        </div>

        <ol className="education-scene__institutions" aria-label="Instituciones de formación">
          {educationInstitutions.map((institution) => (
            <EducationInstitution key={institution.id} institution={institution} />
          ))}
        </ol>
      </div>
    </section>
  );
});
