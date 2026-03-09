import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    number: "01",
    title: "Engineer",
    subtitle: "Systems & Architecture",
    glyph: "∑",
    desc: "I build things at every layer — from database schemas to iOS interfaces. I obsess over performance, elegance, and code that reads like good prose.",
    accent: "#C9A35E",
    glow: "rgba(201,163,94,0.12)",
    tags: ["Backend", "iOS", "Cloud", "Systems Design"],
  },
  {
    number: "02",
    title: "Artist",
    subtitle: "Craft & Aesthetics",
    glyph: "◆",
    desc: "I believe software design and visual art share the same DNA — proportion, rhythm, and intention. I approach every interface like a canvas.",
    accent: "#6E9E78",
    glow: "rgba(110,158,120,0.12)",
    tags: ["UI Craft", "Typography", "Motion", "Visual Systems"],
  },
  {
    number: "03",
    title: "Creator",
    subtitle: "Vision to Reality",
    glyph: "⬡",
    desc: "From idea to deployment, I own the full arc. I've shipped healthcare platforms, video conferencing apps, and iOS tools — solo and with teams.",
    accent: "#B8735A",
    glow: "rgba(184,115,90,0.12)",
    tags: ["Product", "Fullstack", "Open Source", "Shipping"],
  },
];

export default function Identity() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const panelsRef  = useRef([]);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: "power4.out",
        scrollTrigger: { trigger: titleRef.current, start: "top 82%" },
      }
    );

    panelsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 88%" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="identity" style={{ position: "relative", borderTop: "1px solid var(--border)" }}>

      {/* ── Header ── */}
      <div style={{ padding: "8rem 3rem 5rem" }}>
        <div className="section-label">Three dimensions</div>
        <div ref={titleRef} style={{ opacity: 0 }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(3.5rem, 9vw, 9rem)",
            lineHeight: 0.88,
            color: "var(--cream)",
            letterSpacing: "-0.01em",
          }}>
            One
          </h2>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(3.5rem, 9vw, 9rem)",
            lineHeight: 0.88,
            color: "var(--cream)",
            letterSpacing: "-0.01em",
          }}>
            perspective.
          </h2>
        </div>
      </div>

      {/* ── 3-panel row ── */}
      <div style={{ display: "flex", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", minHeight: "62vh" }}>
        {panels.map((p, i) => (
          <div
            key={p.number}
            ref={el => panelsRef.current[i] = el}
            className="id-panel"
            style={{ opacity: 0 }}
            onMouseEnter={e => {
              e.currentTarget.style.flex = "1.5";
              e.currentTarget.querySelector(".id-panel-glow").style.opacity = "1";
              e.currentTarget.querySelector(".id-panel-desc").style.opacity = "1";
              e.currentTarget.querySelector(".id-panel-desc").style.transform = "translateY(0)";
              e.currentTarget.querySelector(".id-panel-kws").style.opacity = "1";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.flex = "1";
              e.currentTarget.querySelector(".id-panel-glow").style.opacity = "0";
              e.currentTarget.querySelector(".id-panel-desc").style.opacity = "0";
              e.currentTarget.querySelector(".id-panel-desc").style.transform = "translateY(12px)";
              e.currentTarget.querySelector(".id-panel-kws").style.opacity = "0";
            }}
          >
            {/* Glow */}
            <div className="id-panel-glow" style={{
              background: `radial-gradient(ellipse at 40% 85%, ${p.glow} 0%, transparent 70%)`,
            }} />

            {/* Number */}
            <div style={{
              position: "absolute", top: "2.5rem", left: "3rem",
              fontFamily: "var(--font-mono)", fontSize: "0.6rem",
              letterSpacing: "0.25em", color: "var(--cream-dim)", textTransform: "uppercase",
            }}>
              {p.number}
            </div>

            {/* Glyph */}
            <div style={{
              position: "absolute", top: "2.5rem", right: "2.5rem",
              fontFamily: "var(--font-display)", fontSize: "1.5rem",
              color: `${p.accent}30`,
            }}>
              {p.glyph}
            </div>

            {/* Content at bottom */}
            <div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontWeight: 300,
                fontStyle: "italic",
                fontSize: "clamp(3rem, 5.5vw, 5.5rem)",
                lineHeight: 0.9,
                color: "var(--cream)",
                marginBottom: "0.6rem",
              }}>
                {p.title}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.2em",
                color: p.accent,
                textTransform: "uppercase",
                marginBottom: "0.25rem",
              }}>
                {p.subtitle}
              </div>

              <div className="id-panel-desc">{p.desc}</div>

              <div className="id-panel-kws">
                {p.tags.map(t => (
                  <span key={t} style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                    letterSpacing: "0.1em", padding: "0.2rem 0.6rem",
                    border: `1px solid ${p.accent}50`,
                    color: p.accent, borderRadius: "2px",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Pull-quote ── */}
      <div style={{ padding: "5rem 3rem 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "3rem" }}>
        <blockquote style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)",
          color: "var(--cream-dim)",
          lineHeight: 1.6,
          maxWidth: "640px",
        }}>
          "Great engineering is invisible — you only notice it when it's absent."
        </blockquote>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.2em",
          color: "var(--cream-dim)",
          textTransform: "uppercase",
          lineHeight: 2.5,
          flexShrink: 0,
        }}>
          <div>B.Tech — Computer Science</div>
          <div>Pondicherry University</div>
          <div style={{ color: "var(--gold)" }}>Class of 2026</div>
        </div>
      </div>
    </section>
  );
}
