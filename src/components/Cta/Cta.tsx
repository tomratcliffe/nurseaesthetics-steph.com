import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styles from './Cta.module.css';

type Props = {
  children: ReactNode;
  /** Outline is the secondary action, sitting beside a solid primary one. */
  variant?: 'solid' | 'outline';
  onClick?: () => void;
} & (
  | {
      /** An in-app route, rendered as a router link. */
      to: string;
      href?: never;
    }
  | {
      /** An external URL, opened in a new tab with rel="noopener noreferrer". */
      href: string;
      to?: never;
    }
);

/**
 * An absolute URL is unambiguously external. Types cannot tell an external URL
 * from a route — both are strings — so a URL handed to `to` is routed to the
 * anchor branch rather than silently becoming an in-app navigation.
 */
const isAbsolute = (value: string) => /^(?:[a-z][a-z\d+\-.]*:|\/\/)/i.test(value);

/** The shared call-to-action surface, for both internal and external links. */
export function Cta({ children, to, href, variant = 'solid', onClick }: Props) {
  const className = `${styles.cta} ${variant === 'outline' ? styles.outline : ''}`;
  const external = href ?? (to !== undefined && isAbsolute(to) ? to : undefined);

  const content = (
    <>
      {children}
      <svg className={styles.arrow} width="18" height="8" viewBox="0 0 18 8" aria-hidden="true">
        <path d="M0 4h16M12.5 0.5 16.5 4l-4 3.5" fill="none" stroke="currentColor" />
      </svg>
    </>
  );

  if (external === undefined) {
    return (
      <Link className={className} to={to as string} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <a
      className={className}
      href={external}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {content}
      <span className="visually-hidden">(opens in a new tab)</span>
    </a>
  );
}
