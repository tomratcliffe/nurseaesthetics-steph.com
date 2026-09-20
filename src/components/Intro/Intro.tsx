import type { Paragraph } from "../../content";
import { RichText } from "../RichText/RichText";
import styles from "./Intro.module.css";

type Props = {
  /** One entry per paragraph, straight from content.ts. */
  paragraphs: Paragraph[];
  className?: string;
};

/** The standing copy at the top of a page, one paragraph per entry. */
export function Intro({ paragraphs, className }: Props) {
  return (
    <div className={[styles.intro, className].filter(Boolean).join(" ")}>
      {paragraphs.map((paragraph, index) => (
        // Static copy, so the index is a stable key.
        <p key={index}>
          <RichText paragraph={paragraph} />
        </p>
      ))}
    </div>
  );
}
