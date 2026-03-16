import { motion } from "framer-motion";
import "./Footer.css";

const NAV_LINKS = [
  { label: "About", id: "about" },
  { label: "Tech Stack", id: "tech-stack" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Contact", id: "contact" },
];

const CONNECT = [
  { name: "GitHub", href: "https://github.com/Nadeem-2005" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-nadeem" },
  { name: "Email", href: "mailto:mr.maestro002@gmail.com" },
  { name: "Resume", href: "https://nadeemresume.blob.core.windows.net/$web/Resume-Mohammed-Nadeem.pdf" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

export default function Footer() {
  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const backToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer__divider" />

      <motion.div
        className="footer__top"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={stagger}
      >
        {/* ── Branding ── */}
        <motion.div variants={fadeUp}>
          <div className="footer__brand-name">Nadeem</div>
          <p className="footer__brand-tagline">
            Backend engineer who cares about craft.
            Building systems that work — and experiences that feel right.
          </p>
        </motion.div>

        {/* ── Navigation ── */}
        <motion.div variants={fadeUp}>
          <div className="footer__col-heading">Navigation</div>
          <nav className="footer__nav">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="footer__nav-link"
                onClick={(e) => scrollTo(e, link.id)}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </motion.div>

        {/* ── Connect ── */}
        <motion.div variants={fadeUp}>
          <div className="footer__col-heading">Connect</div>
          <nav className="footer__nav">
            {CONNECT.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noreferrer noopener"
                className="footer__connect-link"
              >
                {link.name}
                <span className="footer__connect-arrow">↗</span>
              </a>
            ))}
          </nav>
        </motion.div>
      </motion.div>

      {/* ── Bottom bar ── */}
      <motion.div
        className="footer__bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <span className="footer__quote">
          Built with intention. Designed with care.
        </span>
        <span className="footer__copy">&copy; 2026 Nadeem</span>
      </motion.div>

      {/* ── Back to top ── */}
      <button
        className="footer__back-to-top"
        onClick={backToTop}
        aria-label="Back to top"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </footer>
  );
}
