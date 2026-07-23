import { forwardRef } from 'react';

export const IntroScene = forwardRef<HTMLElement>(function IntroScene(_, ref) {
  return (
    <section
      id="inicio"
      ref={ref}
      className="portfolio-scene portfolio-scene--intro portfolio-scene--animated"
      aria-labelledby="intro-title"
    >
      <div className="intro-scene__shape intro-scene__shape--outline" aria-hidden="true" />
      <div className="intro-scene__shape intro-scene__shape--peach" aria-hidden="true" />
      <div className="intro-scene__content">
        <p className="intro-scene__label">Portafolio personal</p>
        <h1 id="intro-title">Cristopher Javier</h1>
      </div>
      <span
        className="intro-scene__cue"
        data-intro-cue
        role="img"
        aria-label="Continúa hacia la presentación"
      >
        <span aria-hidden="true">⌄</span>
      </span>
    </section>
  );
});
