import { BeforeAfter } from "../components/BeforeAfter/BeforeAfter";
import { BookingButton } from "../components/BookingButton/BookingButton";
import { Intro } from "../components/Intro/Intro";
import { Section } from "../components/Section/Section";
import { clientResults, clientResultsPage } from "../content";
import styles from "./ClientResults.module.css";

export function ClientResults() {
  return (
    <Section
      heading={clientResultsPage.heading}
      eyebrow={clientResultsPage.eyebrow}
      headingLevel="h1"
    >
      <Intro paragraphs={clientResultsPage.intro} />

      <div className={styles.grid}>
        {clientResults.map((pair) => (
          <BeforeAfter key={pair.id} pair={pair} />
        ))}
      </div>

      <p className={styles.note}>{clientResultsPage.consentNote}</p>

      <div className={styles.cta}>
        <BookingButton />
      </div>
    </Section>
  );
}
