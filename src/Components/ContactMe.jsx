import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactMe() {
  const titleRef = useRef(null);
  const formRef  = useRef(null);
  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [sent, setSent]   = useState(false);
  const [focus, setFocus] = useState(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: titleRef.current, start: "top 82%" } }
    );
    gsap.fromTo(formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: formRef.current, start: "top 88%" } }
    );
  }, []);

  const socials = [
    { label: "GitHub",    href: "https://github.com/Nadeem-2005",                      handle: "@Nadeem-2005"      },
    { label: "LinkedIn",  href: "https://www.linkedin.com/in/mohammed-nadeem-80628a266", handle: "Mohammed Nadeem"  },
    { label: "Instagram", href: "https://www.instagram.com/nadeem._005",               handle: "@nadeem._005"     },
  ];

  return (
    <section id="contact" style={{ position: "relative", borderTop: "1px solid var(--border)", padding: "8rem 3rem" }}>

      {/* ── Header ── */}
      <div className="section-label">Say Hello</div>
      <div ref={titleRef} style={{ opacity: 0, marginBottom: "6rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(3.5rem, 11vw, 12rem)", lineHeight: 0.85, color: "var(--cream)", letterSpacing: "-0.01em" }}>
          Let's
        </h2>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(3.5rem, 11vw, 12rem)", lineHeight: 0.85, WebkitTextStroke: "1px rgba(240,235,224,0.2)", color: "transparent", letterSpacing: "-0.01em" }}>
          connect.
        </h2>
      </div>

      {/* ── Content ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>

        {/* Left */}
        <div>
          <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "1rem", color: "var(--cream-dim)", lineHeight: 1.85, marginBottom: "3.5rem" }}>
            Have a project that needs careful engineering? Want to collaborate on something that sits at the intersection of code and craft? I'm here for it.
          </p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {socials.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "1.25rem 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none", color: "var(--cream)",
                transition: "padding-left 0.4s var(--ease-expo), border-color 0.3s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.paddingLeft = "0.5rem"; e.currentTarget.style.borderBottomColor = "var(--gold-dim)"; }}
                onMouseLeave={e => { e.currentTarget.style.paddingLeft = "0"; e.currentTarget.style.borderBottomColor = "var(--border)"; }}
              >
                <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "1.1rem" }}>{s.label}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.1em", color: "var(--cream-dim)" }}>{s.handle} →</span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <a href="mailto:contact@nadeem.dev" style={{
              fontFamily: "var(--font-mono)", fontSize: "0.7rem",
              letterSpacing: "0.2em", textTransform: "uppercase",
              color: "var(--gold)", textDecoration: "none",
              borderBottom: "1px solid var(--gold-dim)", paddingBottom: "3px",
            }}>
              contact@nadeem.dev
            </a>
          </div>
        </div>

        {/* Right — Form */}
        <div ref={formRef} style={{ opacity: 0 }}>
          {sent ? (
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic", fontSize: "3.5rem", lineHeight: 1, color: "var(--cream)", marginBottom: "1rem" }}>
                Message received.
              </div>
              <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.9rem", color: "var(--cream-dim)" }}>
                I'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              {[
                { name: "name",    placeholder: "Your name",    type: "text"  },
                { name: "email",   placeholder: "Your email",   type: "email" },
              ].map(f => (
                <input
                  key={f.name} type={f.type} placeholder={f.placeholder} required
                  value={form[f.name]}
                  onChange={e => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                  onFocus={() => setFocus(f.name)}
                  onBlur={() => setFocus(null)}
                  className="contact-input"
                  style={{ borderColor: focus === f.name ? "var(--gold)" : undefined }}
                />
              ))}

              <textarea
                placeholder="Your message"
                required
                rows={5}
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                onFocus={() => setFocus("message")}
                onBlur={() => setFocus(null)}
                style={{
                  resize: "none", background: "transparent", border: "none",
                  borderBottom: `1px solid ${focus === "message" ? "var(--gold)" : "var(--border-2)"}`,
                  padding: "1rem 0", fontFamily: "var(--font-body)", fontWeight: 300,
                  fontSize: "1rem", color: "var(--cream)", width: "100%", outline: "none",
                  transition: "border-color 0.3s ease",
                }}
              />

              <button type="submit" className="cta-btn" style={{ alignSelf: "flex-start" }}>
                <span>Send message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
