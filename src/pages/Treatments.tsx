import { BookingButton } from "../components/BookingButton/BookingButton";
import { Photo } from "../components/Photo/Photo";
import { Intro } from "../components/Intro/Intro";
import { Section } from "../components/Section/Section";
import { useReveal } from "../hooks/useReveal";
import type { Treatment } from "../content";
import { treatments, treatmentsPage } from "../content";
import styles from "./Treatments.module.css";

import treatmentsHeaderPhoto from "../assets/treatments-header.jpeg";

function TreatmentRow({
  treatment,
  reversed,
}: {
  treatment: Treatment;
  reversed: boolean;
}) {
  const reveal = useReveal<HTMLElement>();

  return (
    <article
      id={treatment.id}
      className={`reveal ${styles.treatment} ${
        reversed ? styles.reversed : ""
      }`}
      {...reveal}
    >
      <div className={styles.aside}>
        <h2>{treatment.name}</h2>

        {treatment.image ? (
          <figure className={styles.media}>
            <Photo src={treatment.image} alt={treatment.imageAlt ?? ""} />
          </figure>
        ) : null}

        {treatment.products ? (
          <ul className={styles.products}>
            {treatment.products.map((product) => (
              <li key={product.name} className={styles.product}>
                <img
                  className={styles.productImage}
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                />
                <span className={styles.productName}>{product.name}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className={styles.body}>
        <p className={styles.summary}>{treatment.summary}</p>
        {treatment.body.map((entry, index) =>
          // A nested array is a list; a plain string is a paragraph.
          Array.isArray(entry) ? (
            <ul key={index} className={styles.points}>
              {entry.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          ) : (
            <p key={index}>{entry}</p>
          )
        )}

        {treatment.tagline ? (
          <p className={styles.meta}>{treatment.tagline}</p>
        ) : null}

        {treatment.downtime ? (
          <p className={styles.downtime}>{treatment.downtime}</p>
        ) : null}
      </div>
    </article>
  );
}

export function Treatments() {
  return (
    <Section heading={treatmentsPage.heading} headingLevel="h1">
      <div className={styles.intro}>
        <div className={styles.introText}>
          <Intro paragraphs={treatmentsPage.intro} />
          <BookingButton />
        </div>
        {/* Decorative: the page heading and intro already say what this is. */}
        <Photo
          className={styles.introPhoto}
          src={treatmentsHeaderPhoto}
          alt=""
          ratio="landscape"
          eager
        />
      </div>

      <div className={styles.list}>
        {treatments.map((treatment, index) => (
          <TreatmentRow
            key={treatment.id}
            treatment={treatment}
            reversed={index % 2 === 1 && Boolean(treatment.image)}
          />
        ))}
      </div>

      <div className={styles.cta}>
        <BookingButton />
      </div>
    </Section>
  );
}
