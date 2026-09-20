import { BookingButton } from '../components/BookingButton/BookingButton';
import { Cta } from '../components/Cta/Cta';
import { Logo } from '../components/Logo/Logo';
import { Reviews } from '../components/Reviews/Reviews';
import { Section } from '../components/Section/Section';
import { SplitFeature } from '../components/SplitFeature/SplitFeature';
import { aboutMe, clinicalApproach, hero, reviews } from '../content';
import styles from './Home.module.css';

export function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={styles.inner}>
          {/* Decorative: the h1 beneath carries the name. */}
          <Logo className={`reveal-on-load ${styles.logo}`} size={176} decorative />
          <h1 className={styles.heading}>{hero.heading}</h1>
          <div className={styles.body}>
            {hero.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>
          <BookingButton />
        </div>
      </section>

      <Section tone="wash">
        <div className={styles.features}>
          <SplitFeature
            heading={aboutMe.heading}
            eyebrow={aboutMe.eyebrow}
            body={aboutMe.body}
            imageSrc={aboutMe.image}
            imageAlt={aboutMe.imageAlt}
            imageCaption={aboutMe.imageCaption}
          />
          <SplitFeature
            heading={clinicalApproach.heading}
            eyebrow={clinicalApproach.eyebrow}
            body={clinicalApproach.body}
            imageSrc={clinicalApproach.image}
            imageAlt={clinicalApproach.imageAlt}
            imageCaption={clinicalApproach.imageCaption}
            reversed
          />
        </div>

        <p className={styles.treatmentsLink}>
          <Cta to="/treatments" variant="outline">
            See all treatments
          </Cta>
        </p>
      </Section>

      <Section tone="cream" heading={reviews.heading}>
        <Reviews />
      </Section>
    </>
  );
}
