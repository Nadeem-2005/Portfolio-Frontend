import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    company: "Jar",
    role: "Backend Engineering Intern",
    duration: "2026 — Upcoming",
    location: "Bangalore, India",
    desc: "Joining the fintech infrastructure team to work on distributed backend systems — the kind of problems that demand precision at scale.",
    tags: ["Java", "Node.js", "Distributed Systems", "Cloud"],
    status: "upcoming",
    accent: "var(--gold)",
  },
  {
    company: "Verizon",
    role: "Software Developer Engineer",
    duration: "2026 — Upcoming",
    location: "Chennai, India",
    desc: "Incoming role at one of the world's largest telecom operators — building enterprise-grade software that serves millions.",
    tags: ["Java", "React", "Cloud", "Enterprise"],
    status: "upcoming",
    accent: "var(--sage)",
  },
  {
    company: "Adappt Mobile Cloud",
    role: "Software Developer Intern",
    duration: "May 2025 — Jun 2025",
    location: "Pondicherry, India",
    desc: "Redesigned the job-processing pipeline for a healthcare platform using Redis + BullMQ. Delivered measurable performance gains in a real production environment.",
    tags: ["Redis", "BullMQ", "Node.js", "PostgreSQL"],
    status: "completed",
    accent: "var(--terra)",
  },
  {
    company: "Freelance & Personal",
    role: "Full Stack & iOS Developer",
    duration: "2023 — Present",
    location: "Remote",
    desc: "Shipped three production-grade products: CliniCall (healthcare), Connect+ (video conferencing), and The Climate (iOS). Each one pushed me further.",
    tags: ["Next.js", "Swift", "Firebase", "Prisma"],
    status: "ongoing",
    accent: "var(--sky)",
  },
];

const statusLabel = { upcoming: "Upcoming", completed: "Completed", ongoing: "Ongoing" };

export default function Experience() {
  const titleRef = useRef(null);
  const lineRef  = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: titleRef.current, start: "top 82%" } }
    );
    gsap.fromTo(lineRef.current,
      { scaleY: 0, transformOrigin: "top" },
      { scaleY: 1, duration: 2, ease: "power2.out", scrollTrigger: { trigger: lineRef.current, start: "top 80%", end: "bottom 20%", scrub: 1 } }
    );
    cardsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.fromTo(el,
        { opacity: 0, x: -24 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: i * 0.07, scrollTrigger: { trigger: el, start: "top 88%" } }
      );
    });
  }, []);

  return (
    <section id="experience" style={{ position: "relative", borderTop: "1px solid var(--border)", padding: "8rem 3rem" }}>
      {/* Header */}
      <div className="section-label">Journey</div>
      <div ref={titleRef} style={{ opacity: 0, marginBottom: "6rem" }}>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(3rem, 9vw, 9rem)", lineHeight: 0.88, color: "var(--cream)", letterSpacing: "-0.01em" }}>
          The road
        </h2>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(3rem, 9vw, 9rem)", lineHeight: 0.88, WebkitTextStroke: "1px rgba(240,235,224,0.2)", color: "transparent", letterSpacing: "-0.01em" }}>
          so far.
        </h2>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", maxWidth: "860px" }}>
        <div ref={lineRef} style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: "1px",
          background: "linear-gradient(to bottom, var(--gold), rgba(201,163,94,0.05))",
        }} />

        <div style={{ paddingLeft: "3rem", display: "flex", flexDirection: "column", gap: "2.5rem" }}>
          {experiences.map((exp, i) => (
            <div key={i} ref={el => cardsRef.current[i] = el} style={{ position: "relative", opacity: 0 }}>
              {/* Timeline dot */}
              <div style={{
                position: "absolute", left: "-3.37rem", top: "2rem",
                width: "7px", height: "7px", borderRadius: "50%",
                background: exp.accent,
                boxShadow: `0 0 12px ${exp.accent}`,
              }} />

              <div
                className="exp-card"
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold-dim)"; e.currentTarget.style.transform = "translateX(6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateX(0)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "0.85rem" }}>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic", fontSize: "1.8rem", lineHeight: 1, color: "var(--cream)", marginBottom: "0.2rem" }}>
                      {exp.role}
                    </div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "0.95rem", color: exp.accent }}>
                      {exp.company}
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--cream-dim)", textTransform: "uppercase" }}>{exp.duration}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.1em", color: "var(--cream-dim)", marginTop: "0.15rem" }}>{exp.location}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: exp.accent, marginTop: "0.35rem" }}>{statusLabel[exp.status]}</div>
                  </div>
                </div>
                <p style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "0.85rem", color: "var(--cream-dim)", lineHeight: 1.75, marginBottom: "1.25rem" }}>
                  {exp.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {exp.tags.map(t => (
                    <span key={t} style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.58rem",
                      letterSpacing: "0.1em", padding: "0.2rem 0.55rem",
                      border: `1px solid ${exp.accent}45`, color: exp.accent, borderRadius: "2px",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
