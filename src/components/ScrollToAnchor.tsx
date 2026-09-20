import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Restores the browser behaviour react-router leaves to the app: scroll to the
 * hash target when there is one, otherwise back to the top on route change.
 */
export function ScrollToAnchor() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const behavior: ScrollBehavior = reduced ? 'auto' : 'smooth';

    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    // The target may not be mounted yet on a fresh page load.
    const scroll = () => {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior, block: 'start' });
    };

    const frame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}
