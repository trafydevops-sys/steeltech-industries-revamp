import { useEffect } from "react";
import { Link } from "wouter";

/**
 * Full-bleed WebGL hero (UnicornStudio "Vitruvian Man" embed) with a mono/technical
 * frame treatment. Renders as a <section>, not a standalone page. The app's Layout
 * already supplies the fixed nav and footer, so this component only owns the
 * animation, corner framing, and the central headline/CTA block.
 */
export default function HeroAscii() {
  useEffect(() => {
    const embedScript = document.createElement("script");
    embedScript.type = "text/javascript";
    embedScript.textContent = `
      !function(){
        if(!window.UnicornStudio){
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js";
          i.onload=function(){
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          };
          (document.head || document.body).appendChild(i)
        }
      }();
    `;
    document.head.appendChild(embedScript);

    const style = document.createElement("style");
    style.textContent = `
      [data-us-project] { position: relative !important; overflow: hidden !important; }
      [data-us-project] canvas { clip-path: inset(0 0 10% 0) !important; }
      [data-us-project] * { pointer-events: none !important; }
      [data-us-project] a[href*="unicorn"],
      [data-us-project] button[title*="unicorn"],
      [data-us-project] div[title*="Made with"],
      [data-us-project] .unicorn-brand,
      [data-us-project] [class*="brand"],
      [data-us-project] [class*="credit"],
      [data-us-project] [class*="watermark"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        position: absolute !important;
        left: -9999px !important;
        top: -9999px !important;
      }
    `;
    document.head.appendChild(style);

    const hideBranding = () => {
      const projectDiv = document.querySelector("[data-us-project]");
      if (!projectDiv) return;
      projectDiv.querySelectorAll("*").forEach((el) => {
        const text = (el.textContent || "").toLowerCase();
        if (text.includes("made with") || text.includes("unicorn")) el.remove();
      });
    };

    hideBranding();
    // The widget hydrates asynchronously; poll briefly for its branding node, then stop.
    // The original ran this every 100ms forever, which is a needless CPU cost once it settles.
    const interval = setInterval(hideBranding, 200);
    const stopPolling = setTimeout(() => clearInterval(interval), 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(stopPolling);
      if (document.head.contains(embedScript)) document.head.removeChild(embedScript);
      if (document.head.contains(style)) document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden bg-black" aria-labelledby="ascii-hero-title">
      {/* Vitruvian man animation, hidden on mobile for performance */}
      <div className="absolute inset-0 hidden h-full w-full lg:block" aria-hidden="true">
        <div data-us-project="whwOGlfJ5Rz2rHaEUgHl" style={{ width: "100%", height: "100%", minHeight: "100vh" }} />
      </div>

      {/* Mobile fallback: lightweight CSS starfield instead of the WebGL scene */}
      <div className="stars-bg absolute inset-0 h-full w-full lg:hidden" aria-hidden="true" />

      {/* Corner frame accents */}
      <div className="absolute left-0 top-0 z-20 h-8 w-8 border-l-2 border-t-2 border-white/30 lg:h-12 lg:w-12" />
      <div className="absolute right-0 top-0 z-20 h-8 w-8 border-r-2 border-t-2 border-white/30 lg:h-12 lg:w-12" />
      <div className="absolute bottom-0 left-0 z-20 h-8 w-8 border-b-2 border-l-2 border-white/30 lg:h-12 lg:w-12" />
      <div className="absolute bottom-0 right-0 z-20 h-8 w-8 border-b-2 border-r-2 border-white/30 lg:h-12 lg:w-12" />

      <div className="relative z-10 flex min-h-screen items-center pt-24 lg:pt-0">
        <div className="container mx-auto px-6 lg:ml-[10%] lg:px-16">
          <div className="relative max-w-lg">
            {/* Top decorative index line */}
            <div className="mb-3 flex items-center gap-2 opacity-60">
              <div className="h-px w-8 bg-white" />
              <span className="font-mono text-[10px] tracking-wider text-white">001</span>
              <div className="h-px flex-1 bg-white" />
            </div>

            {/* Title with dithered accent */}
            <div className="relative">
              <div className="dither-pattern absolute -left-3 bottom-0 top-0 hidden w-1 opacity-40 lg:block" />
              <h1
                id="ascii-hero-title"
                className="mb-3 font-mono text-2xl font-bold leading-tight tracking-wider text-white lg:mb-4 lg:text-5xl"
                style={{ letterSpacing: "0.1em" }}
              >
                BUILT TO
                <span className="mt-1 block text-white opacity-90 lg:mt-2">HOLD THE LINE</span>
              </h1>
            </div>

            {/* Decorative dots pattern, desktop only */}
            <div className="mb-3 hidden gap-1 opacity-40 lg:flex">
              {Array.from({ length: 40 }).map((_, i) => (
                <div key={i} className="h-0.5 w-0.5 rounded-full bg-white" />
              ))}
            </div>

            {/* Description with technical corner accent */}
            <div className="relative">
              <p className="mb-5 font-mono text-xs leading-relaxed text-gray-300 opacity-80 lg:mb-6 lg:text-base">
                Where engineering meets protection: every opening built to exact tolerance.
              </p>
              <div className="absolute -right-4 top-1/2 hidden h-3 w-3 border border-white opacity-30 lg:block" style={{ transform: "translateY(-50%)" }}>
                <div className="absolute left-1/2 top-1/2 h-1 w-1 bg-white" style={{ transform: "translate(-50%, -50%)" }} />
              </div>
            </div>

            {/* CTAs, routed into the real app instead of the original's dead buttons */}
            <div className="flex flex-col gap-3 lg:flex-row lg:gap-4">
              <Link
                href="/products"
                className="group relative border border-white bg-transparent px-5 py-2 font-mono text-xs text-white transition-all duration-200 hover:bg-white hover:text-black lg:px-6 lg:py-2.5 lg:text-sm"
              >
                <span className="absolute -left-1 -top-1 hidden h-2 w-2 border-l border-t border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                <span className="absolute -bottom-1 -right-1 hidden h-2 w-2 border-b border-r border-white opacity-0 transition-opacity group-hover:opacity-100 lg:block" />
                GET STARTED
              </Link>

              <Link
                href="/contact"
                className="relative border border-white bg-transparent px-5 py-2 font-mono text-xs text-white transition-all duration-200 hover:bg-white hover:text-black lg:px-6 lg:py-2.5 lg:text-sm"
              >
                LEARN MORE
              </Link>
            </div>

            {/* Bottom technical notation, desktop only */}
            <div className="mt-6 hidden items-center gap-2 opacity-40 lg:flex">
              <span className="font-mono text-[9px] text-white">∞</span>
              <div className="h-px flex-1 bg-white" />
              <span className="font-mono text-[9px] text-white">EST. 1995 · CHENNAI 13.08°N 80.27°E</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
