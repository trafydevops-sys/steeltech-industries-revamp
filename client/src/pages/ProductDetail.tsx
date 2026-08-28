import { Check, MoveUpRight } from "lucide-react";
import { Link, useParams } from "wouter";
import Layout from "@/components/Layout";
import PageHero from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SiteImage } from "@/components/SiteImage";
import CTASection from "@/components/CTASection";
import { products } from "@/data/site";
import { productIcons } from "@/lib/productIcons";
import NotFound from "./NotFound";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = products.find((p) => p.slug === slug);

  if (!product) return <NotFound />;

  const Icon = productIcons[product.icon];
  const siblings = products.filter((p) => p.slug !== product.slug);

  return (
    <Layout>
      <PageHero index={product.no} section="SYSTEM PROFILE" eyebrow={product.tag} title={product.name} lead={product.intro} />

      <section className="product-detail-layout">
        <Reveal className="product-detail-image">
          <SiteImage src={product.image} alt={product.imageAlt} label={product.tag} icon={Icon} />
        </Reveal>
        <Reveal delay={0.1} className="product-detail-copy">
          <p className="eyebrow">Where it's used</p>
          <div className="chip-row" style={{ marginBottom: 34 }}>
            {product.applications.map((app) => (
              <span className="chip" key={app}>
                {app}
              </span>
            ))}
          </div>
          <p className="eyebrow">Built in</p>
          <ul className="feature-list" style={{ marginTop: 18 }}>
            {product.features.map((feature) => (
              <li key={feature}>
                <Check size={17} />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Link className="button button-dark" href="/contact">
            Enquire about {product.name} <MoveUpRight size={17} />
          </Link>
        </Reveal>
      </section>

      <section className="product-siblings">
        <h3>Explore the other systems</h3>
        <div className="sibling-rail">
          {siblings.map((sibling) => (
            <Link key={sibling.slug} href={`/products/${sibling.slug}`} className="sibling-card">
              <span>{sibling.no}</span>
              <b>{sibling.name}</b>
            </Link>
          ))}
        </div>
      </section>

      <CTASection />
    </Layout>
  );
}
