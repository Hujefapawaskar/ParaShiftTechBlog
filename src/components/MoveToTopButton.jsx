import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SCROLL_THRESHOLD = 280;

const MoveToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [isScrollingToTop, setIsScrollingToTop] = useState(false);
  const frameRef = useRef(null);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (isScrollingToTop) return;

    const startY = window.scrollY;
    if (startY <= 0) return;

    setIsScrollingToTop(true);
    const startTime = performance.now();
    const duration = Math.min(1100, Math.max(500, startY * 0.55));

    const easeOutCubic = (progress) => 1 - (1 - progress) ** 3;

    const animateScroll = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const nextY = Math.round(startY * (1 - eased));

      window.scrollTo(0, nextY);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animateScroll);
      } else {
        setIsScrollingToTop(false);
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(animateScroll);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          aria-label="Move to top"
          disabled={isScrollingToTop}
          className="hover-gradient-lr fixed bottom-4 right-4 z-50 inline-flex h-11 items-center justify-center rounded-full px-4 text-xs font-semibold tracking-wide text-white shadow-lg shadow-violet-950/40 sm:bottom-6 sm:right-6 sm:h-12 sm:px-5 sm:text-sm"
        >
          <motion.span
            animate={
              isScrollingToTop
                ? { y: [0, -5, 0], opacity: [1, 0.8, 1] }
                : { y: 0, opacity: 1 }
            }
            transition={
              isScrollingToTop
                ? { duration: 0.45, repeat: Infinity, ease: "easeInOut" }
                : { duration: 0.2 }
            }
            className="inline-flex items-center"
          >
            ↑
          </motion.span>
          <span className="ml-1">Top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default MoveToTopButton;
