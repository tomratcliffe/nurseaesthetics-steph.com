type Props = { size?: number; className?: string };

/** Decorative by default: label the link that wraps it, not the icon. */
export function InstagramIcon({ size = 18, className }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" />
      <circle cx="17.7" cy="6.3" r="1.2" fill="currentColor" />
    </svg>
  );
}
