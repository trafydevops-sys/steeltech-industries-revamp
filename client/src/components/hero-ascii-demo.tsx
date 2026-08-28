import HeroAscii from "@/components/ui/hero-ascii";

/**
 * Reference usage of HeroAscii. The live integration is the top of Home.tsx.
 * See that file for the version actually rendered on the site.
 */
export default function HeroAsciiDemo() {
  return (
    <div className="h-screen w-screen">
      <HeroAscii />
    </div>
  );
}
