import { useState } from 'react';
import type { EducationItem } from '../../../data/educationData';

type EducationInstitutionProps = {
  key?: string;
  institution: EducationItem;
};

export function EducationInstitution({ institution }: EducationInstitutionProps) {
  const [hasLogoError, setHasLogoError] = useState(false);
  const canShowLogo = Boolean(institution.logo && institution.logoAlt && !hasLogoError);

  return (
    <figure
      className="education-scene__institution"
      data-education-institution={institution.id}
      data-has-logo={canShowLogo}
    >
      {canShowLogo && (
        <img
          src={institution.logo}
          alt={institution.logoAlt}
          decoding="async"
          data-education-logo
          onError={() => setHasLogoError(true)}
        />
      )}
      <figcaption>
        <span className="education-scene__institution-name">{institution.name}</span>
        {institution.period && <span className="education-scene__institution-period">{institution.period}</span>}
        {institution.description && (
          <span className="education-scene__institution-description">{institution.description}</span>
        )}
      </figcaption>
    </figure>
  );
}
