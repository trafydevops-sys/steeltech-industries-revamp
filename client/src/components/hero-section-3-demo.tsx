import { ScrollFlyIn } from "@/components/ui/hero-section-3";

/**
 * Reference usage of ScrollFlyIn, adapted for Steeltech Industries.
 * Not currently rendered on any page; kept here as an available primitive.
 */
export default function ScrollFlyInDemo() {
  return (
    <div className="w-full bg-background text-foreground">
      <ScrollFlyIn
        imageUrl="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2400&auto=format&fit=crop"
        imageAlt="Close-up of engineered steel structural beams"
      >
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-md font-semibold uppercase tracking-widest text-muted-foreground">Steeltech Industries</p>
          <h2 className="mt-2 text-5xl font-bold leading-tight md:text-7xl">Every door starts as raw steel.</h2>
        </div>
      </ScrollFlyIn>
    </div>
  );
}
