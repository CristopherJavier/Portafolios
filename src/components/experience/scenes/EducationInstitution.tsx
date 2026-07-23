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
    <li
      className="education-scene__institution"
      data-education-institution={institution.id}
      data-has-logo={canShowLogo}
    >
      {canShowLogo && (
        <div className="education-scene__logo" data-education-logo>
          <img
            src={institution.logo}
            alt={institution.logoAlt}
            decoding="async"
            onError={() => setHasLogoError(true)}
          />
        </div>
      )}
      <div className="education-scene__institution-content">
        <h3 className="education-scene__institution-name" data-education-name>
          {institution.name}
        </h3>
        <p className="education-scene__institution-program" data-education-detail>
          {institution.program}
        </p>
        <p className="education-scene__institution-period" data-education-detail>
          {institution.period}
        </p>
        <p className="education-scene__institution-description" data-education-detail>
          {institution.description}
        </p>
      </div>
    </li>
  );
}
