import { ShieldCheck } from "lucide-react";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal, RevealStagger, staggerItem } from "@/components/Reveal";
import StatStrip from "@/components/StatStrip";
import CTASection from "@/components/CTASection";
import { benefits, certifications, certificationImages } from "@/data/site";
import { motion } from "framer-motion";

export default function Quality() {
  return (
    <Layout>
      <PageHero
        index="04"
        section="QUALITY"
        eyebrow="Not just supplied. Proven."
        title={
          <>
            Quietly
            <br />
            <span>uncompromising.</span>
          </>
        }
        lead="Protection is not a feature you add at the end. It is the material, the frame, the fit, and the finish, considered together and tested throughout."
      />

      <section className="section-pad">
        <StatStrip />
      </section>

      <section className="performance section-pad dark-section">
        <div className="section-index light">
          02 <span>/ THE ADVANTAGE</span>
        </div>
        <Reveal className="section-heading">
          <div>
            <p className="eyebrow light">
              <span className="amber-dot" /> Why steel wins
            </p>
            <h2>
              Eleven reasons
              <br />
              <em>it holds up.</em>
            </h2>
          </div>
        </Reveal>
        <RevealStagger className="benefit-list" style={{ padding: "0 8vw 60px" }}>
          {benefits.map((benefit) => (
            <motion.div variants={staggerItem} className="benefit" key={benefit.no}>
              <span className="benefit-no">{benefit.no}</span>
              <div>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
              <ShieldCheck size={19} />
            </motion.div>
          ))}
        </RevealStagger>
      </section>

      <section className="section-pad">
        <div className="section-index">
          03 <span>/ STANDARDS</span>
        </div>
        <Reveal className="section-heading" style={{ padding: "42px 0 66px" }}>
          <div>
            <p className="eyebrow">Certified, tested, warrantied</p>
            <h2>
              Compliance
              <br />
              <span>built in.</span>
            </h2>
          </div>
        </Reveal>
        <RevealStagger className="simple-grid">
          {certifications.map((cert) => (
            <motion.div variants={staggerItem} className="simple-card dark" key={cert.title}>
              <h3>{cert.title}</h3>
              <p>{cert.desc}</p>
            </motion.div>
          ))}
        </RevealStagger>
        <div className="cert-image-row">
          {certificationImages.map((img) => (
            <div className="cert-image-card" key={img.src}>
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
      </section>

      <CTASection eyebrow="Have a compliance question?" title={<>Ask about<br /><span>certification.</span></>} lead="We can walk you through the ratings, standards, and warranty terms for any system in our range." />
    </Layout>
  );
}
