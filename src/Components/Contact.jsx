import { useState } from "react";
import { motion } from "framer-motion";
import "./Contact.css";

const SOCIALS = [
  { name: "GitHub", href: "https://github.com/Nadeem-2005" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/mohammed-nadeem" },
  { name: "Email", href: "mailto:mr.maestro002@gmail.com" },
  { name: "Resume", href: "https://nadeemresume.blob.core.windows.net/$web/Resume-Mohammed-Nadeem.pdf " },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact__inner">
        {/* ── Left — info & socials ── */}
        <motion.div
          className="contact__left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.span className="section-label" variants={fadeUp}>
            Contact
          </motion.span>

          <motion.h2 className="contact__heading" variants={fadeUp}>
            Let's talk.
          </motion.h2>

          <motion.p className="contact__blurb" variants={fadeUp}>
            Have a project in mind, an opportunity to discuss, or just want to
            say hello? I'd love to hear from you.
          </motion.p>

          <motion.nav
            className="contact__socials"
            aria-label="Social links"
            variants={stagger}
          >
            {SOCIALS.map((s, i) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="contact__social-link"
                variants={fadeUp}
              >
                <span className="contact__social-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="contact__social-name">{s.name}</span>
                <span className="contact__social-arrow">↗</span>
              </motion.a>
            ))}
          </motion.nav>
        </motion.div>

        {/* ── Right — form ── */}
        <motion.div
          className="contact__right"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <form className="contact__form" onSubmit={handleSubmit}>
            <motion.div className="contact__form-row" variants={fadeUp}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="contact-input"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="contact-input"
                value={form.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            <motion.div variants={fadeUp}>
              <textarea
                name="message"
                placeholder="Message"
                className="contact-input"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
              />
            </motion.div>

            <motion.div className="contact__submit-row" variants={fadeUp}>
              <button type="submit" className="cta-btn" disabled={sent}>
                <span>{sent ? "Sent" : "Send Message"}</span>
              </button>
              {sent && (
                <motion.span
                  className="contact__sent-msg"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  Thank you — I'll be in touch.
                </motion.span>
              )}
            </motion.div>
          </form>
        </motion.div>
      </div>

    </section>
  );
}
