import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const heroRef    = useRef(null);
  const line1Ref   = useRef(null);
  const line2Ref   = useRef(null);
  const line3Ref   = useRef(null);
  const metaRef    = useRef(null);
  const tagsRef    = useRef(null);
  const scrollRef  = useRef(null);
  const orb1Ref    = useRef(null);
  const orb2Ref    = useRef(null);
  const orb3Ref    = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;

    // ── Entrance timeline ──
    const tl = gsap.timeline({ delay: 0.05 });

    tl.fromTo([orb1Ref.current, orb2Ref.current, orb3Ref.current],
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: "power3.out", stagger: 0.15 }
      )
      .fromTo(line1Ref.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
        "-=1.0"
      )
      .fromTo(line2Ref.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
        "-=0.9"
      )
      .fromTo(line3Ref.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1.1, ease: "power4.out" },
        "-=0.9"
      )
      .fromTo(metaRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(tagsRef.current?.children ? Array.from(tagsRef.current.children) : [],
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        "-=0.2"
      );

    // ── Scroll parallax on title ──
    gsap.to([line1Ref.current, line2Ref.current, line3Ref.current], {
      yPercent: 18,
      ease: "none",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom top",
        scrub: 1.8,
      }
    });

    gsap.to(orb1Ref.current, {
      yPercent: 50,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 2.5 }
    });

    gsap.to(orb2Ref.current, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 3.5 }
    });

    // ── Mouse parallax ──
    const onMouseMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w - 0.5) * 2;
      const y = (e.clientY / h - 0.5) * 2;
      gsap.to(orb1Ref.current, { x: x * 40, y: y * 25, duration: 2, ease: "power2.out" });
      gsap.to(orb2Ref.current, { x: x * -25, y: y * -18, duration: 2.5, ease: "power2.out" });
      gsap.to(orb3Ref.current, { x: x * 15, y: y * 12, duration: 3, ease: "power2.out" });
    };

    hero.addEventListener("mousemove", onMouseMove);
    return () => {
      hero.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  const tags = ["Full Stack", "iOS", "Cloud Infra", "Open Source", "India 🇮🇳"];

  return (
    <section
      ref={heroRef}
      id="about"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 3rem 4.5rem",
        overflow: "hidden",
      }}
    >
      {/* ── Ambient orbs ── */}
      <div ref={orb1Ref} className="grad-orb" style={{
        width: "700px", height: "700px",
        top: "5%", left: "-10%",
        background: "radial-gradient(circle, rgba(201,163,94,0.13) 0%, transparent 70%)",
      }} />
      <div ref={orb2Ref} className="grad-orb" style={{
        width: "500px", height: "500px",
        top: "20%", right: "5%",
        background: "radial-gradient(circle, rgba(110,158,120,0.1) 0%, transparent 70%)",
      }} />
      <div ref={orb3Ref} className="grad-orb" style={{
        width: "400px", height: "400px",
        bottom: "0%", right: "30%",
        background: "radial-gradient(circle, rgba(184,115,90,0.08) 0%, transparent 70%)",
      }} />

      {/* ── Fine grid overlay ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(240,235,224,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(240,235,224,0.025) 1px, transparent 1px)",
        backgroundSize: "100px 100px",
      }} />

      {/* ── Top-right meta ── */}
      <div ref={metaRef} style={{
        position: "absolute", top: "7rem", right: "3rem",
        textAlign: "right",
        fontFamily: "var(--font-mono)",
        fontSize: "0.62rem",
        letterSpacing: "0.2em",
        color: "var(--cream-dim)",
        textTransform: "uppercase",
        lineHeight: 2.2,
        zIndex: 2,
        opacity: 0,
      }}>
        <div>Full Stack Engineer</div>
        <div>Based in India</div>
        <div style={{ color: "var(--gold)" }}>Open to Opportunities</div>
      </div>

      {/* ── Main title ── */}
      <div style={{ position: "relative", zIndex: 2 }}>

        {/* Eyebrow label */}
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.4em",
          textTransform: "uppercase",
          color: "var(--gold)",
          marginBottom: "2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}>
          <span style={{ display: "block", width: "1.5rem", height: "1px", background: "var(--gold)" }} />
          Portfolio — 2026
        </div>

        {/* Giant headline — editorial serif */}
        <div style={{ overflow: "hidden", marginBottom: "-0.05em" }}>
          <div ref={line1Ref} style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(5rem, 13vw, 15rem)",
            lineHeight: 0.88,
            color: "var(--cream)",
            opacity: 0,
          }}>
            Mohammed
          </div>
        </div>

        <div style={{ overflow: "hidden", marginBottom: "-0.05em" }}>
          <div ref={line2Ref} style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(5rem, 13vw, 15rem)",
            lineHeight: 0.88,
            color: "var(--cream)",
            opacity: 0,
            display: "flex",
            alignItems: "baseline",
            gap: "0.3em",
          }}>
            Nadeem
            <span style={{
              fontFamily: "var(--font-display)",
              fontStyle: "normal",
              fontSize: "0.35em",
              color: "var(--gold)",
              letterSpacing: "0.05em",
              paddingBottom: "0.2em",
            }}>
              نديم
            </span>
          </div>
        </div>

        <div style={{ overflow: "hidden" }}>
          <div ref={line3Ref} style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            fontSize: "clamp(1.2rem, 2.5vw, 2.5rem)",
            lineHeight: 1,
            color: "var(--cream-dim)",
            opacity: 0,
            marginTop: "1.5rem",
            maxWidth: "700px",
          }}>
            Engineer who believes great software is a form of art — intentional, refined, and built to endure.
          </div>
        </div>

        {/* Tags */}
        <div ref={tagsRef} style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap", marginTop: "2.5rem" }}>
          {tags.map(t => (
            <span key={t} style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "0.3rem 0.85rem",
              border: "1px solid var(--border-2)",
              color: "var(--cream-dim)",
              borderRadius: "100px",
              opacity: 0,
              transition: "border-color 0.3s ease, color 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-dim)"; e.currentTarget.style.color = "var(--gold)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border-2)"; e.currentTarget.style.color = "var(--cream-dim)"; }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div ref={scrollRef} style={{
        position: "absolute",
        bottom: "2.5rem", right: "3rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.75rem",
        opacity: 0,
        zIndex: 2,
      }}>
        <span style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.55rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "var(--cream-dim)",
          writingMode: "vertical-rl",
        }}>Scroll</span>
        <div style={{
          width: "1px", height: "60px",
          background: "linear-gradient(to bottom, transparent, var(--cream-dim))",
          animation: "scrollLine 2.5s ease-in-out infinite",
        }} />
      </div>
    </section>
  );
}
