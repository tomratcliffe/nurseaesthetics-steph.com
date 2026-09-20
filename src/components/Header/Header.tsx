import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../Logo/Logo";
import { NavOverlay } from "../NavOverlay/NavOverlay";
import { site } from "../../content";
import styles from "./Header.module.css";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /** Focus returns to the trigger whenever the panel closes, however it closed. */
  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${
          open ? styles.open : ""
        }`}
      >
        <div className={styles.inner}>
          <Link
            className={styles.brand}
            to="/"
            aria-label={`${site.name} — home`}
          >
            <Logo size={44} minimal />
          </Link>

          <button
            ref={triggerRef}
            className={styles.trigger}
            type="button"
            aria-expanded={open}
            aria-controls="site-nav"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span className={styles.icon} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <NavOverlay open={open} onClose={close} />
    </>
  );
}
