import { InstagramIcon } from "../icons/InstagramIcon";
import { Logo } from "../Logo/Logo";
import { footer, site } from "../../content";
import styles from "./Footer.module.css";

import wellnessStudioPhoto from "../../assets/wellness-studio.jpg";
import { Photo } from "../Photo/Photo";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <h2 className={styles.heading}>Contact</h2>
            <ul className={styles.list}>
              <li>
                <span>Email: </span>
                <a href={`mailto:${footer.email}`}>{footer.email}</a>
              </li>
              <li>
                <a
                  className={styles.social}
                  href={footer.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon className={styles.socialIcon} />
                  {footer.instagram.handle}
                </a>
              </li>
              <li>
                <address className={styles.address}>
                  {footer.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
              </li>
            </ul>

            {footer.gettingHere ? (
              <div className={styles.gettingHere}>
                <h3 className={styles.subheading}>
                  Getting here &amp; parking
                </h3>
                {footer.gettingHere.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
            ) : null}
          </div>
          <Photo src={wellnessStudioPhoto} alt="The Wellness Studio"></Photo>
        </div>

        <div className={styles.bottom}>
          <div className={styles.mark}>
            <Logo size={76} />
          </div>
          <span>
            © {new Date().getFullYear()} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
