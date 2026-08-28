import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { animate, motion, useMotionValue, type AnimationPlaybackControls } from "framer-motion";
import { cn } from "@/lib/utils";

type InfiniteSliderProps = {
  children: ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
};

/** Duplicates its children into a seamless, auto-scrolling strip. Measures its own content size via ResizeObserver
 * so the loop distance stays correct across breakpoints without a fixed-size assumption. */
export function InfiniteSlider({ children, gap = 16, duration = 25, durationOnHover, direction = "horizontal", reverse = false, className = "" }: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentSize, setContentSize] = useState(0);
  const [currentDuration, setCurrentDuration] = useState(duration);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cycle, setCycle] = useState(0);
  const translation = useMotionValue(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => setContentSize((direction === "horizontal" ? el.scrollWidth : el.scrollHeight) / 2);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
    // `children` is intentionally excluded: it's a fresh array/element reference on every parent render
    // (e.g. `.map()`-generated JSX), which would tear down and rebuild the ResizeObserver on every render
    // and race the animation's contentSize state. The ResizeObserver itself already re-measures whenever
    // the rendered content's actual size changes (including images loading in).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [direction]);

  useEffect(() => {
    if (!contentSize) return;
    const size = contentSize + gap;
    const from = reverse ? -size : 0;
    const to = reverse ? 0 : -size;

    let controls: AnimationPlaybackControls;
    if (isTransitioning) {
      controls = animate(translation, [translation.get(), to], {
        ease: "linear",
        duration: currentDuration * Math.abs((translation.get() - to) / size),
        onComplete: () => {
          setIsTransitioning(false);
          setCycle((c) => c + 1);
        },
      });
    } else {
      controls = animate(translation, [from, to], {
        ease: "linear",
        duration: currentDuration,
        repeat: Infinity,
        repeatType: "loop",
        onRepeat: () => translation.set(from),
      });
    }

    return () => controls.stop();
  }, [cycle, translation, currentDuration, contentSize, gap, isTransitioning, reverse]);

  const hoverProps = durationOnHover
    ? {
        onHoverStart: () => {
          setIsTransitioning(true);
          setCurrentDuration(durationOnHover);
        },
        onHoverEnd: () => {
          setIsTransitioning(true);
          setCurrentDuration(duration);
        },
      }
    : {};

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        ref={containerRef}
        className="flex w-max"
        style={{
          ...(direction === "horizontal" ? { x: translation } : { y: translation }),
          gap: `${gap}px`,
          flexDirection: direction === "horizontal" ? "row" : "column",
        }}
        {...hoverProps}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
