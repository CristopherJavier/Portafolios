type ContactSceneProps = {
  onReturnToStart: () => void;
};

export function ContactScene({ onReturnToStart }: ContactSceneProps) {
  return (
    <section className="portfolio-section portfolio-section--contact" aria-labelledby="contact-title">
      <div className="contact-scene__ambient" aria-hidden="true" />
      <div className="contact-scene__content" data-scene-content="pending">
        <h2 id="contact-title">Contacto</h2>
        <div className="contact-scene__return">
          <button type="button" onClick={onReturnToStart}>Volver al inicio</button>
        </div>
      </div>
    </section>
  );
}
