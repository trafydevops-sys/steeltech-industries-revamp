import { useEffect, useState } from "react";
import { ChevronDown, Menu, MoveUpRight, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { navItems } from "@/data/site";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <header className={`site-header ${scrolled || location !== "/" ? "is-scrolled" : ""}`}>
      <Link href="/" className="brand" aria-label="Steeltech Industries home">
        <img src="/images/logo-transparent.png" alt="Steeltech Industries" className="brand-logo" />
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map((item) =>
          item.children ? (
            <div className="nav-dropdown" key={item.label} onMouseEnter={() => setOpenDropdown(item.label)} onMouseLeave={() => setOpenDropdown(null)}>
              <Link href={item.href} className={location.startsWith(item.href) ? "is-active" : ""}>
                {item.label} <ChevronDown size={12} />
              </Link>
              {openDropdown === item.label && (
                <div className="nav-dropdown-panel">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <b>{child.label}</b>
                      <span>{child.desc}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link key={item.label} href={item.href} className={location === item.href ? "is-active" : ""}>
              {item.label}
            </Link>
          )
        )}
      </nav>

      <Link className="header-cta" href="/contact">
        Talk to an expert <MoveUpRight size={15} />
      </Link>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
        {open ? <X /> : <Menu />}
      </button>

      {open && (
        <div className="mobile-menu">
          <Link href="/">Home</Link>
          {navItems.map((item) => (
            <div key={item.label} className="mobile-menu-group">
              <Link href={item.href}>{item.label}</Link>
              {item.children?.map((child) => (
                <Link key={child.href} href={child.href} className="mobile-menu-sub">
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
