import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const smoothLerp = 0.1;

export function SmoothScroll() {
  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const lenis = new Lenis({
      autoRaf: true,
      smoothWheel: !motionPreference.matches,
      lerp: motionPreference.matches ? 1 : smoothLerp,
      wheelMultiplier: 1,
      syncTouch: false,
      infinite: false,
    });

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      lenis.options.smoothWheel = !event.matches;
      lenis.options.lerp = event.matches ? 1 : smoothLerp;
    };

    motionPreference.addEventListener('change', handleMotionPreferenceChange);

    return () => {
      motionPreference.removeEventListener('change', handleMotionPreferenceChange);
      lenis.destroy();
    };
  }, []);

  return null;
}
