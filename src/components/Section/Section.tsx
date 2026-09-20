import type { ReactNode } from "react";
import styles from "./Section.module.css";

type Props = {
  id?: string;
  /** Alternating bands carry the vertical rhythm in place of borders. */
  tone?: "paper" | "cream" | "wash";
  /** The section's heading. */
  heading?: string;
  /** A small label sitting above the heading. */
  eyebrow?: string;
  /** Headings default to h2; the page title on each route passes 'h1'. */
  headingLevel?: "h1" | "h2";
  narrow?: boolean;
  children?: ReactNode;
};

export function Section({
  id,
  tone = "paper",
  heading,
  eyebrow,
  headingLevel: Heading = "h2",
  narrow = false,
  children,
}: Props) {
  const toneClass =
    tone === "cream" ? styles.cream : tone === "wash" ? styles.wash : "";

  return (
    <section id={id} className={`${styles.section} ${toneClass}`}>
      <div className={`${styles.inner} ${narrow ? styles.narrow : ""}`}>
        <>
          {heading && <Heading className={styles.heading}>{heading}</Heading>}
          {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
          {(heading || eyebrow) && <hr className={styles.rule} />}
        </>
        {children}
      </div>
    </section>
  );
}
