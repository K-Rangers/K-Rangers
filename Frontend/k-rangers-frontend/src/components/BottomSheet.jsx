import { useEffect, useRef } from "react";
import styles from "../css/BottomSheet.module.css";

function BottomSheet({
  open = false,
  onClose,
  height = 360,
  bottomOffset = "0px",
  closeOnBackdrop = true,
  unmountOnClose = false,
  children,
}) {
  const sheetRef = useRef(null);
  const backdropRef = useRef(null);
  const prevFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    prevFocusRef.current = document.activeElement;

    document.body.style.overflow = "hidden";
    sheetRef.current?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = prevOverflow;
      const el = prevFocusRef.current;
      if (el && typeof el.focus === "function") el.focus();
    };
  }, [open]);

  const onBackdropClick = (e) => {
    if (!closeOnBackdrop) return;
    if (e.target === backdropRef.current) onClose?.();
  };

  if (!open && unmountOnClose) return null;

  return (
    <>
      <div
        ref={backdropRef}
        className={`${styles.dim} ${open ? styles.show : ""}`}
        onClick={onBackdropClick}
      />
      <section
        ref={sheetRef}
        className={`${styles.sheet} ${open ? styles.open : ""}`}
        style={{
          "--sheet-height": `${height}px`,
          "--bottom-offset": bottomOffset,
        }}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.handle} />
        <div className={styles.inner}>{children}</div>
      </section>
    </>
  );
}

export default BottomSheet;