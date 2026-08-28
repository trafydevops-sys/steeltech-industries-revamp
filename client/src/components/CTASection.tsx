import { MoveUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Link } from "wouter";
import { Reveal } from "./Reveal";

export default function CTASection({
  eyebrow = "Have an opening in mind?",
  title = (
    <>
      Let's make
      <br />
      <span>it stronger.</span>
    </>
  ),
  lead = "Tell us what you are building, replacing, or protecting. We will help you get to the right door system without the guesswork.",
}: {
  eyebrow?: string;
  title?: ReactNode;
  lead?: string;
}) {
  return (
    <section className="cta-band section-pad">
      <Reveal className="cta-band-inner">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{lead}</p>
          <Link className="button button-amber" href="/contact">
            Start a conversation <MoveUpRight size={18} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
