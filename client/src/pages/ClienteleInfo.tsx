import type { ReactNode } from "react";
import { useParams } from "wouter";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { RevealStagger, staggerItem } from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import { qualityPolicy, serviceOfferings, assurance, certificationImages } from "@/data/site";
import NotFound from "./NotFound";

type Card = { title: string; desc: string };

const pages: Record<
  string,
  {
    index: string;
    section: string;
    eyebrow: string;
    title: ReactNode;
    lead: string;
    cards: readonly Card[];
    images?: readonly { src: string; alt: string }[];
  }
> = {
  certifications: {
    index: "07",
    section: "CERTIFICATIONS",
    eyebrow: "Standards we build to",
    title: (
      <>
        Certified,
        <br />
        <span>not just claimed.</span>
      </>
    ),
    lead: "Our quality management system follows ISO 9001:2008, and every fire-rated assembly is tested against recognised standards before it reaches a site.",
    cards: qualityPolicy.map((p) => ({ title: p.area, desc: p.desc })),
    images: certificationImages,
  },
  "our-approach": {
    index: "08",
    section: "OUR APPROACH",
    eyebrow: "How we take on a project",
    title: (
      <>
        Three ways
        <br />
        <span>we get involved.</span>
      </>
    ),
    lead: "Every project gets one of three levels of Steeltech involvement, chosen to match how your own team is set up.",
    cards: serviceOfferings,
  },
  assurance: {
    index: "09",
    section: "ASSURANCE",
    eyebrow: "What we stand behind",
    title: (
      <>
        Backed after
        <br />
        <span>the handover.</span>
      </>
    ),
    lead: "A door is a long-term commitment. Here is what continues once the installation is complete.",
    cards: assurance,
  },
};

export default function ClienteleInfo() {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? pages[slug] : undefined;

  if (!page) return <NotFound />;

  return (
    <Layout>
      <PageHero index={page.index} section={page.section} eyebrow={page.eyebrow} title={page.title} lead={page.lead} />

      <section className="section-pad">
        <RevealStagger className="simple-grid">
          {page.cards.map((card) => (
            <motion.div variants={staggerItem} className="simple-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </motion.div>
          ))}
        </RevealStagger>
      </section>

      {page.images && (
        <section className="section-pad dark-section" style={{ paddingTop: 60 }}>
          <p className="eyebrow light" style={{ textAlign: "center" }}>
            <span className="amber-dot" /> Certificate on file
          </p>
          <div className="cert-image-row">
            {page.images.map((img) => (
              <div className="cert-image-card" key={img.src}>
                <img src={img.src} alt={img.alt} />
              </div>
            ))}
          </div>
        </section>
      )}

      <CTASection />
    </Layout>
  );
}
