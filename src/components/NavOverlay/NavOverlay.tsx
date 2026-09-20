import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BookingButton } from "../BookingButton/BookingButton";
import { InstagramIcon } from "../icons/InstagramIcon";
import { contact, nav } from "../../content";
import styles from "./NavOverlay.module.css";

const FOCUSABLE = "a[href], button:not([disabled])";

type Props = { open: boolean; onClose: () => void };

export function NavOverlay({ open, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.dataset.scrollLocked = String(open);
    return () => {
      delete document.body.dataset.scrollLocked;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>(FOCUSABLE)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !panel) return;

      // Trap: wrap focus around the first and last focusable elements.
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || !panel.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <div
      id="site-nav"
      className={`${styles.overlay} ${open ? styles.open : ""}`}
      inert={!open}
    >
      <div ref={panelRef} className={styles.inner}>
        <nav aria-label="Main">
          <ul className={styles.list}>
            {nav.map((group) => (
              <li key={group.to} className={styles.item}>
                <Link
                  className={styles.primary}
                  to={group.to}
                  onClick={onClose}
                >
                  {group.label}
                </Link>

                {group.children ? (
                  <ul className={styles.children}>
                    {group.children.map((child) => (
                      <li key={child.to} className={styles.child}>
                        <Link
                          className={styles.childLink}
                          to={child.to}
                          onClick={onClose}
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.cta}>
          <BookingButton variant="solid" onClick={onClose} />

          <div className={styles.meta}>
            <a href={`mailto:${contact.email}`} onClick={onClose}>
              {contact.email}
            </a>

            <a
              className={styles.social}
              href={contact.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              aria-label={`Instagram — ${contact.instagram.handle} (opens in a new tab)`}
            >
              <InstagramIcon size={22} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
