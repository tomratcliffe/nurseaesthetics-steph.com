import logoUrl from "../../assets/logo.svg";
import logoMinimal from "../../assets/logo-text.svg";
import { site } from "../../content";

type Props = {
  size?: number;
  className?: string;
  /** Hides the mark from assistive tech where nearby text names the business. */
  decorative?: boolean;
  minimal?: boolean;
};

/** Rendered as an <img> so the Drive SVG can be dropped in unmodified. */
export function Logo({
  size = 64,
  className,
  decorative = false,
  minimal = false,
}: Props) {
  if (minimal) {
    return (
      <img
        className={className}
        src={logoMinimal}
        width="auto"
        height={size}
        alt={decorative ? "" : site.name}
        {...(decorative && { "aria-hidden": true })}
      />
    );
  }
  return (
    <img
      className={className}
      src={logoUrl}
      width={size}
      height={size}
      alt={decorative ? "" : site.name}
      {...(decorative && { "aria-hidden": true })}
    />
  );
}
