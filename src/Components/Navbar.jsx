import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const navItems = [
  { href: "#about",      label: "About"      },
  { href: "#identity",   label: "Identity"   },
  { href: "#skills",     label: "Skills"     },
  { href: "#projects",   label: "Projects"   },
  { href: "#experience", label: "Experience" },
  { href: "#contact",    label: "Contact"    },
];

export default function Navbar({ visible = true }) {
  const navRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!visible) return;
    gsap.fromTo(navRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: "power3.out", delay: 0.3 }
    );
  }, [visible]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, href) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav ref={navRef} style={{
      position: "fixed",
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      padding: "1.75rem 3rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      opacity: 0,
      background: scrolled ? "rgba(10,9,8,0.88)" : "transparent",
      backdropFilter: scrolled ? "blur(24px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "none",
      transition: "background 0.5s ease, backdrop-filter 0.5s ease, border 0.5s ease",
    }}>
      {/* Logo */}
      <span style={{
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontWeight: 300,
        fontSize: "1.4rem",
        letterSpacing: "0.04em",
        color: "var(--cream)",
      }}>
        Nadeem
      </span>

      {/* Links */}
      <ul style={{ display: "flex", alignItems: "center", gap: "2.5rem", listStyle: "none" }}>
        {navItems.map(item => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={e => handleNav(e, item.href)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--cream)",
                textDecoration: "none",
                opacity: 0.6,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = "1"}
              onMouseLeave={e => e.currentTarget.style.opacity = "0.6"}
            >
              {item.label}
            </a>
          </li>
        ))}
        <li>
          <a
            href="https://nadeemresume.blob.core.windows.net/$web/Resume-Mohammed-Nadeem.pdf"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              padding: "0.45rem 1.1rem",
              border: "1px solid rgba(240,235,224,0.25)",
              color: "var(--cream)",
              textDecoration: "none",
              borderRadius: "2px",
              transition: "all 0.35s ease",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--cream)"; e.currentTarget.style.color = "var(--bg)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--cream)"; }}
          >
            Résumé
          </a>
        </li>
      </ul>
    </nav>
  );
}
