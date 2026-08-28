import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import DomeGallery from "@/components/ui/DomeGallery";
import { clients, hardwarePartners, serviceGeography } from "@/data/site";

export default function Clientele() {
  const galleryImages = clients.map((c) => ({ src: c.logo, alt: c.name }));

  return (
    <Layout>
      <PageHero
        index="06"
        section="CLIENTELE"
        eyebrow="Trusted across sectors"
        title={
          <>
            Proven on
            <br />
            <span>real projects.</span>
          </>
        }
        lead="From national infrastructure to regional institutions, our door systems are specified where reliability isn't optional. Drag to explore who we've worked with."
      />

      <section className="section-pad" style={{ paddingBottom: 40 }}>
        <div className="section-index">
          02 <span>/ CLIENTS</span>
        </div>
        <Reveal className="client-dome">
          <DomeGallery images={galleryImages} grayscale={false} segments={30} fit={0.55} />
        </Reveal>
      </section>

      <section className="section-pad" style={{ paddingTop: 0 }}>
        <Reveal>
          <p className="eyebrow" style={{ textAlign: "center" }}>
            Service geography
          </p>
          <div className="geo-row" style={{ marginTop: 20 }}>
            {serviceGeography.map((city) => (
              <span className="geo-chip" key={city}>
                {city}
              </span>
            ))}
          </div>
        </Reveal>

        <div className="trust-links">
          <Link href="/clientele/certifications">
            <b>Certifications</b>
            <span>ISO 9001:2008 and our quality policy</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/clientele/our-approach">
            <b>Our Approach</b>
            <span>How we take on a project</span>
            <ArrowRight size={16} />
          </Link>
          <Link href="/clientele/assurance">
            <b>Assurance</b>
            <span>Warranty and after-sales support</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section className="section-pad dark-section" style={{ paddingTop: 60 }}>
        <Reveal>
          <p className="eyebrow light" style={{ textAlign: "center" }}>
            <span className="amber-dot" /> Hardware sourced from
          </p>
          <div className="partner-row" style={{ justifyContent: "center", marginTop: 24 }}>
            {hardwarePartners.map((partner) => (
              <span className="partner-chip" key={partner}>
                {partner}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="Want to see how we work?"
        title={
          <>
            Become our
            <br />
            <span>next reference.</span>
          </>
        }
        lead="Tell us about your project and we will show you how we have handled similar work before."
      />
    </Layout>
  );
}
