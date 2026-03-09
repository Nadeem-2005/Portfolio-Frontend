import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: "Languages",
    items: ["C", "C++", "Java", "Swift", "Objective-C", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    category: "Frameworks & Libraries",
    items: ["React.js", "Next.js", "Node.js", "Express.js", "Tailwind CSS", "EJS", "Bootstrap", "Shadcn UI", "Unity"],
  },
  {
    category: "Tools & Infrastructure",
    items: ["AWS", "Azure", "Firebase", "Redis", "PostgreSQL", "MongoDB", "Git", "GitHub", "Vercel", "Bash", "Xcode", "VS Code"],
  },
];

const Chip = ({ name, index }) => {
  const ref = useRef(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 16, scale: 0.97 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.55, delay: index * 0.03, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 93%" },
      }
    );
  }, [index]);
  return <div ref={ref} className="skill-chip" style={{ opacity: 0 }}>{name}</div>;
};

export default function Skills() {
  const titleRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: titleRef.current, start: "top 82%" } }
    );
  }, []);

  const marqueeItems = Array(8).fill([
    "Full Stack", "iOS", "Backend", "Cloud", "Systems", "Open Source", "Architecture", "UI Craft",
  ]).flat();

  return (
    <section id="skills" style={{ position: "relative", borderTop: "1px solid var(--border)" }}>
      {/* Marquee strip */}
      <div style={{ overflow: "hidden", borderBottom: "1px solid var(--border)", padding: "0.85rem 0", background: "var(--bg-2)" }}>
        <div style={{ display: "flex", gap: "2.5rem", width: "max-content", animation: "marqueeScroll 35s linear infinite" }}>
          {marqueeItems.map((item, i) => (
            <span key={i} style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontWeight: 300,
              fontSize: "1.05rem",
              letterSpacing: "0.08em",
              color: "var(--cream-dim)",
              whiteSpace: "nowrap",
              display: "flex", alignItems: "center", gap: "1.5rem",
            }}>
              {item}
              <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
            </span>
          ))}
        </div>
      </div>

      <div style={{ padding: "8rem 3rem" }}>
        {/* Header */}
        <div style={{ marginBottom: "5rem" }}>
          <div className="section-label">Arsenal</div>
          <div ref={titleRef} style={{ opacity: 0 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(3rem, 9vw, 9rem)", lineHeight: 0.88, color: "var(--cream)", letterSpacing: "-0.01em" }}>
              The tools
            </h2>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(3rem, 9vw, 9rem)", lineHeight: 0.88, WebkitTextStroke: "1px rgba(240,235,224,0.2)", color: "transparent", letterSpacing: "-0.01em" }}>
              I wield.
            </h2>
          </div>
        </div>

        {/* Skill groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          {skillGroups.map((group, gi) => (
            <div key={group.category} style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "2rem",
              alignItems: "start",
              borderTop: "1px solid var(--border)",
              paddingTop: "2.5rem",
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--cream-dim)" }}>
                  {String(gi + 1).padStart(2, "0")}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300, fontSize: "1.1rem", color: "var(--cream)", marginTop: "0.3rem" }}>
                  {group.category}
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                {group.items.map((item, i) => (
                  <Chip key={item} name={item} index={gi * 12 + i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quote */}
        <blockquote style={{
          marginTop: "6rem", paddingTop: "3rem",
          borderTop: "1px solid var(--border)",
          fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 300,
          fontSize: "clamp(1.1rem, 2.2vw, 1.6rem)", color: "var(--cream-dim)",
          maxWidth: "580px", lineHeight: 1.65,
        }}>
          "A craftsman is defined not by their tools, but by their mastery of them."
        </blockquote>
      </div>
    </section>
  );
}
