import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function PageHero({
  index,
  section,
  eyebrow,
  title,
  lead,
  children,
}: {
  index: string;
  section: string;
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-grid" />
      <div className="section-index light">
        {index} <span>/ {section}</span>
      </div>
      <motion.div className="page-hero-content" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}>
        <p className="eyebrow light">
          <span className="amber-dot" /> {eyebrow}
        </p>
        <h1>{title}</h1>
        {lead && <p className="page-hero-lead">{lead}</p>}
        {children}
      </motion.div>
    </section>
  );
}
