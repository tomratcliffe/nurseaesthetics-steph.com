import { useEffect, useRef, useState } from 'react';

/**
 * Reveals an element the first time it is scrolled into view, for the shared
 * `reveal` entrance animation in global.css.
 *
 * Spread the result onto the element you want to animate, alongside the
 * `reveal` class:
 *
 *   const reveal = useReveal<HTMLDivElement>();
 *   <div className={`reveal ${styles.thing}`} {...reveal} />
 *
 * The element starts hidden, so anything that would stop the observer firing
 * — no IntersectionObserver, an element already past the fold — reveals
 * immediately rather than leaving content invisible.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setRevealed(true);
        // One-shot: the element should not fade again on the way back up.
        observer.disconnect();
      },
      // Waits until a little of the element is actually showing.
      { rootMargin: '0px 0px -10% 0px' },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, 'data-revealed': revealed } as const;
}
