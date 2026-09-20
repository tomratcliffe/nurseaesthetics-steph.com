import { useCallback, useRef, useState } from "react";
import type { ClientResult } from "../../content";
import styles from "./BeforeAfter.module.css";

const REST = 25;
const STEP = 5;
const clamp = (value: number) => Math.min(100, Math.max(0, value));

type Props = { pair: ClientResult };

/**
 * Before/after comparison. Until it is used, the split follows the cursor as a
 * hint that the image is interactive. Once the handle has been dragged and
 * released — or moved with the keyboard — the split stays where it was left
 * and the cursor no longer affects it.
 */
export function BeforeAfter({ pair }: Props) {
  const [split, setSplit] = useState(REST);
  /** Eased transitions are off during a sweep or drag, on when snapping back. */
  const [eased, setEased] = useState(true);
  /** Set once the split has been placed deliberately, which ends the sweep. */
  const [pinned, setPinned] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  /** Whether the current press has actually moved, as opposed to being a click. */
  const movedRef = useRef(false);

  const splitFromClientX = useCallback((clientX: number) => {
    const frame = frameRef.current;
    if (!frame) return REST;
    const { left, width } = frame.getBoundingClientRect();
    return clamp(((clientX - left) / width) * 100);
  }, []);

  const onFramePointerMove = (event: React.PointerEvent) => {
    if (pinned || event.pointerType !== "mouse" || draggingRef.current) return;
    setEased(false);
    setSplit(splitFromClientX(event.clientX));
  };

  const onFramePointerLeave = () => {
    if (pinned || draggingRef.current) return;
    setEased(true);
    setSplit(REST);
  };

  const onHandlePointerDown = (
    event: React.PointerEvent<HTMLButtonElement>
  ) => {
    draggingRef.current = true;
    movedRef.current = false;
    setEased(false);
    // Capture keeps the drag alive once the pointer leaves the frame.
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onHandlePointerMove = (event: React.PointerEvent) => {
    if (!draggingRef.current) return;
    event.preventDefault();
    movedRef.current = true;
    setSplit(splitFromClientX(event.clientX));
  };

  const onHandlePointerUp = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);

    // Released after an actual drag: the split stays where it was let go. A
    // press that never moved is just a click, and leaves the sweep running.
    if (movedRef.current) setPinned(true);
  };

  const onHandleKeyDown = (event: React.KeyboardEvent) => {
    const next = {
      ArrowLeft: split - STEP,
      ArrowRight: split + STEP,
      ArrowDown: split - STEP,
      ArrowUp: split + STEP,
      Home: 0,
      End: 100,
    }[event.key];

    if (next === undefined) return;
    event.preventDefault();
    setPinned(true);
    setEased(true);
    setSplit(clamp(next));
  };

  const easedClass = eased ? styles.eased : "";
  const hasImages = Boolean(pair.beforeSrc && pair.afterSrc);

  return (
    <figure className={styles.figure}>
      <div
        ref={frameRef}
        className={styles.frame}
        style={{ "--split": `${split}%` } as React.CSSProperties}
        onPointerMove={onFramePointerMove}
        onPointerLeave={onFramePointerLeave}
      >
        <div className={styles.layer}>
          {hasImages ? (
            <img
              className={styles.image}
              src={pair.beforeSrc}
              alt={pair.beforeAlt}
              loading="lazy"
            />
          ) : (
            <div
              className={`${styles.placeholder} ${styles.placeholderBefore}`}
              role="img"
              aria-label={pair.beforeAlt}
            >
              Before
            </div>
          )}
        </div>

        <div className={`${styles.layer} ${styles.after} ${easedClass}`}>
          {hasImages ? (
            <img
              className={styles.image}
              src={pair.afterSrc}
              alt={pair.afterAlt}
              loading="lazy"
            />
          ) : (
            <div
              className={`${styles.placeholder} ${styles.placeholderAfter}`}
              role="img"
              aria-label={pair.afterAlt}
            >
              After
            </div>
          )}
        </div>

        <div className={styles.labels} aria-hidden="true">
          <span className={styles.label}>Before</span>
          <span className={styles.label}>After</span>
        </div>

        <button
          type="button"
          className={`${styles.handle} ${easedClass}`}
          role="slider"
          aria-label={`Reveal the after image for ${pair.treatment}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          aria-valuetext={`${Math.round(split)}% after`}
          onPointerDown={onHandlePointerDown}
          onPointerMove={onHandlePointerMove}
          onPointerUp={onHandlePointerUp}
          onPointerCancel={onHandlePointerUp}
          onKeyDown={onHandleKeyDown}
        >
          <span className={styles.handleLine} />
          <span className={styles.handleGrip} aria-hidden="true">
            <svg width="20" height="10" viewBox="0 0 20 10" fill="none">
              <path d="M7 1 3 5l4 4M13 1l4 4-4 4" stroke="currentColor" />
            </svg>
          </span>
        </button>
      </div>

      <figcaption className={styles.caption}>
        <span className={styles.treatment}>{pair.treatment}</span>
        <span className={styles.captionText}>{pair.caption}</span>
      </figcaption>
    </figure>
  );
}
