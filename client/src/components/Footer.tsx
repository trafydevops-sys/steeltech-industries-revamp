import { MoveUpRight } from "lucide-react";
import { Link } from "wouter";
import { contact, navItems } from "@/data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/images/logo-transparent.png" alt="Steeltech Industries" className="footer-brand-logo" />
          <p>Engineered steel doors for the places that cannot afford to compromise on protection, performance, or permanence. Since 1995.</p>
        </div>
        <div className="footer-links">
          <div>
            <h4>Sitemap</h4>
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Products</h4>
            {navItems
              .find((i) => i.label === "Products")
              ?.children?.map((child) => (
                <Link key={child.href} href={child.href}>
                  {child.label}
                </Link>
              ))}
          </div>
          <div>
            <h4>Get in touch</h4>
            <a href={contact.phoneHref}>{contact.phone}</a>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <span>{contact.locations.join(" · ")}</span>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>ENGINEERED ACCESS / 1995-2026</span>
        <span>© {new Date().getFullYear()} Steeltech Industries. A Royal Fab Group venture.</span>
        <a href="#top">
          Back to top <MoveUpRight size={15} />
        </a>
      </div>
    </footer>
  );
}
