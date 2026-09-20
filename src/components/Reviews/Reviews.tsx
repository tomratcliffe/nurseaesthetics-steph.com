import { reviews } from "../../content";
import { Cta } from "../Cta/Cta";
import styles from "./Reviews.module.css";

const MAX_RATING = 5;

/** Stars are decorative; the rating is announced as text alongside them. */
function Stars({ rating }: { rating: number }) {
  return (
    <p className={styles.quoteStars}>
      <span aria-hidden="true">{"★".repeat(rating)}</span>
      <span className="visually-hidden">{`Rated ${rating} out of ${MAX_RATING}.`}</span>
    </p>
  );
}

export function Reviews() {
  return (
    <>
      <div className={styles.list}>
        {reviews.quotes.map((review, index) => {
          const caption = [review.attribution, review.treatment]
            .filter(Boolean)
            .join(" — ");

          return (
            <figure
              key={review.quote[0].slice(0, 40)}
              className={`${styles.quote} ${index === 0 ? styles.lead : ""}`}
            >
              <Stars rating={review.rating ?? MAX_RATING} />
              <blockquote>
                {review.quote.map((paragraph, line) => (
                  <p key={paragraph.slice(0, 40)}>
                    {line === 0 ? "“" : ""}
                    {paragraph}
                    {line === review.quote.length - 1 ? "”" : ""}
                  </p>
                ))}
              </blockquote>
              {caption ? (
                <figcaption>
                  <cite className={styles.attribution}>{caption}</cite>
                </figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>

      {reviews.reviewsLinkLabel && reviews.reviewsUrl ? (
        <p className={styles.more}>
          <Cta href={reviews.reviewsUrl} variant="outline">
            {reviews.reviewsLinkLabel}
          </Cta>
        </p>
      ) : null}
    </>
  );
}
