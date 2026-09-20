import styles from "./Photo.module.css";

type Props = {
  /** Omit while waiting on a real photograph. */
  src?: string;
  alt: string;
  className?: string;
  /**
   * Text for the panel shown when there is no `src`. Omit and nothing at all
   * is rendered, so the surrounding layout closes up.
   */
  placeholder?: string;
  /** Above-the-fold photographs should not be lazy-loaded. */
  eager?: boolean;
  /**
   * The crop. Portrait is the site default; landscape suits a photograph
   * running alongside a block of copy rather than beside a heading.
   */
  ratio?: "portrait" | "landscape";
};

/**
 * A photograph in the site's shape: full width of its container, cropped to
 * an aspect ratio, with the rounded corners used throughout.
 */
export function Photo({
  src,
  alt,
  className,
  placeholder,
  eager = false,
  ratio = "portrait",
}: Props) {
  const classes = [styles.photo, styles[ratio], className]
    .filter(Boolean)
    .join(" ");

  if (src) {
    return (
      <img
        className={classes}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
      />
    );
  }

  if (!placeholder) return null;

  return (
    <div className={`${classes} ${styles.placeholder}`} role="img" aria-label={alt}>
      <span>{placeholder}</span>
    </div>
  );
}
