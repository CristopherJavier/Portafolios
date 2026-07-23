import { forwardRef } from 'react';
import { technologyGroups, technologiesSceneContent } from '../../../data/technologiesData';
import { technologyIconMap } from '../technologyIcons';

export const TechnologiesScene = forwardRef<HTMLElement>(function TechnologiesScene(_, ref) {
  return (
    <section
      ref={ref}
      className="portfolio-scene portfolio-scene--technologies portfolio-scene--animated"
      aria-labelledby="technologies-title"
    >
      <div className="technologies-scene__content">
        <h2 id="technologies-title" data-technologies-heading>
          {technologiesSceneContent.title}
        </h2>
        <div className="technologies-scene__groups">
          {technologyGroups.map((group) => (
            <section
              key={group.id}
              className="technologies-scene__group"
              data-technology-group={group.id}
              aria-labelledby={`${group.id}-title`}
            >
              <div className="technologies-scene__group-heading">
                <h3 id={`${group.id}-title`}>{group.title}</h3>
                {group.description && <p>{group.description}</p>}
              </div>
              <ul className="technologies-scene__grid">
                {group.technologies.map((technology) => {
                  const Icon = technologyIconMap[technology.iconKey];

                  return (
                    <li
                      key={technology.id}
                      className="technology-card"
                      data-technology-item
                      data-technology-status={technology.status}
                    >
                      <span className="technology-card__icon" data-technology-icon aria-hidden="true">
                        <Icon />
                        <span className="technology-card__shimmer" data-technology-shimmer />
                      </span>
                      <span className="technology-card__text">
                        <span className="technology-card__name">{technology.name}</span>
                        <span className="technology-card__status">{technology.status}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
});
