import { useReveal } from "../../hooks/useReveal";
import { Photo } from "../Photo/Photo";
import { RichText } from "../RichText/RichText";
import type { Paragraph } from "../../content";
import styles from "./SplitFeature.module.css";

type Props = {
  heading: string;
  eyebrow?: string;
  body: Paragraph[];
  imageSrc?: string;
  imageAlt: string;
  imageCaption?: string;
  /** Alternate this between consecutive features to keep the page moving. */
  reversed?: boolean;
};

export function SplitFeature({
  heading,
  eyebrow,
  body,
  imageSrc,
  imageAlt,
  imageCaption,
  reversed = false,
}: Props) {
  const reveal = useReveal<HTMLDivElement>();

  return (
    <div
      className={`reveal ${styles.feature} ${reversed ? styles.reversed : ""}`}
      {...reveal}
    >
      <figure className={styles.media}>
        <Photo src={imageSrc} alt={imageAlt} />
        {imageCaption ? (
          <figcaption className={styles.caption}>{imageCaption}</figcaption>
        ) : null}
      </figure>

      <div className={styles.body}>
        {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
        <h2 className={styles.heading}>{heading}</h2>
        <hr className={styles.rule} />
        {body.map((paragraph, index) => (
          // Static copy, so the index is a stable key.
          <p key={index}>
            <RichText paragraph={paragraph} />
          </p>
        ))}
      </div>
    </div>
  );
}
