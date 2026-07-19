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
