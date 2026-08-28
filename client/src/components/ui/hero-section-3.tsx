import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollFlyInProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode; // Static text content
  imageUrl: string;
  imageAlt?: string;
}

/** Tracks viewport width reactively so the fly-in distance adapts on resize instead of freezing at first-render width. */
function useViewportWidth() {
  const [width, setWidth] = React.useState(() => (typeof window !== "undefined" ? window.innerWidth : 1280));

  React.useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}

const ScrollFlyIn = React.forwardRef<HTMLDivElement, ScrollFlyInProps>(
  ({ children, imageUrl, imageAlt = "Animated image", className, ...props }, forwardedRef) => {
    const targetRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(forwardedRef, () => targetRef.current as HTMLDivElement);

    const screenWidth = useViewportWidth();

    const { scrollYProgress } = useScroll({
      target: targetRef,
      offset: ["start end", "end start"],
    });

    // Aggressive offscreen start/end so the image is fully clear of the viewport before and after the reveal.
    const x = useTransform(scrollYProgress, [0.1, 0.8], [`-${5 * screenWidth}px`, `${2.5 * screenWidth}px`]);
    const opacity = useTransform(scrollYProgress, [0.1, 0.25, 0.7, 0.8], [0, 1, 1, 0]);

    return (
      <div ref={targetRef} className={cn("relative h-[200vh]", className)} {...props}>
        <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
          <div className="z-10 text-center">{children}</div>

          <motion.div style={{ x, opacity }} className="absolute top-0 left-0 z-20 flex h-full w-full items-center" aria-hidden={!imageAlt}>
            <img
              src={imageUrl}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              draggable={false}
              className="h-auto w-auto max-w-none select-none"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/1200x800/111315/f5a623?text=Image+unavailable";
              }}
            />
          </motion.div>
        </div>
      </div>
    );
  }
);

ScrollFlyIn.displayName = "ScrollFlyIn";

export { ScrollFlyIn };
