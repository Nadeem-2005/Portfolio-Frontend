import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import githubService from "../services/githubService";
import { featuredRepositories, githubUsername, maxRepositories, repositoryConfig } from "../config/featuredRepositories";

gsap.registerPlugin(ScrollTrigger);

// Warm accent pool — rotates through cards
const accents = ["var(--gold)", "var(--sage)", "var(--terra)", "var(--sky)", "var(--gold)", "var(--sage)"];

function ProjectCard({ title, description, techStack, githubUrl, liveUrl, index }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: "power3.out",
        delay: index * 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 90%" },
      }
    );
  }, [index]);

  const accent = accents[index % accents.length];

  return (
    <div
      ref={ref}
      className="proj-card"
      style={{ opacity: 0 }}
      onMouseEnter={e => e.currentTarget.style.borderColor = "var(--gold-dim)"}
      onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
    >
      {/* Abstract tinted background */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(ellipse at 30% 30%, ${accent}12 0%, transparent 60%)`,
        transition: "opacity 0.5s ease",
      }} />

      {/* Card number */}
      <div style={{
        position: "absolute", top: "1.75rem", right: "2rem",
        fontFamily: "var(--font-mono)", fontSize: "0.6rem",
        letterSpacing: "0.2em", color: "var(--cream-dim)",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Accent line at top */}
      <div style={{ position: "absolute", top: 0, left: "2rem", right: "2rem", height: "1px", background: `linear-gradient(to right, ${accent}60, transparent)` }} />

      {/* Card content */}
      <div className="proj-card-inner">
        <h3 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 300,
          fontStyle: "italic",
          fontSize: "clamp(1.6rem, 2.8vw, 2.4rem)",
          lineHeight: 0.95,
          color: "var(--cream)",
          marginBottom: "0.6rem",
          letterSpacing: "-0.01em",
        }}>
          {title}
        </h3>
        <p style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "0.8rem",
          color: "var(--cream-dim)",
          lineHeight: 1.65,
          marginBottom: "1rem",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {description}
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
          {(techStack || []).slice(0, 4).map(t => (
            <span key={t} style={{
              fontFamily: "var(--font-mono)", fontSize: "0.58rem",
              letterSpacing: "0.1em", padding: "0.2rem 0.55rem",
              border: `1px solid ${accent}40`, color: accent,
              borderRadius: "2px",
            }}>
              {t}
            </span>
          ))}
        </div>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          {githubUrl && (
            <a href={githubUrl} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: "var(--cream-dim)", textDecoration: "none",
              borderBottom: "1px solid rgba(240,235,224,0.25)", paddingBottom: "2px",
              transition: "color 0.3s ease, border-color 0.3s ease",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--cream)"; e.currentTarget.style.borderColor = "var(--cream)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--cream-dim)"; e.currentTarget.style.borderColor = "rgba(240,235,224,0.25)"; }}
            >
              View Source →
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: "var(--font-mono)", fontSize: "0.62rem",
              letterSpacing: "0.18em", textTransform: "uppercase",
              color: accent, textDecoration: "none",
              borderBottom: `1px solid ${accent}50`, paddingBottom: "2px",
            }}>
              Live →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef   = useRef(null);
  const trackRef   = useRef(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);

  const username = import.meta.env.VITE_GITHUB_USERNAME || githubUsername;

  useEffect(() => {
    const load = async () => {
      try {
        const repos = await githubService.fetchFeaturedRepositories(username, featuredRepositories.slice(0, maxRepositories), repositoryConfig.fallbackToRecent);
        setProjects(repos);
      } catch {
        try {
          const fallback = await githubService.fetchRepositories(username, maxRepositories);
          setProjects(fallback || []);
        } catch {
          setProjects([]);
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [username]);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: titleRef.current, start: "top 82%" } }
    );
  }, []);

  // Horizontal scroll pin
  useEffect(() => {
    if (loading || !trackRef.current || projects.length === 0) return;
    const track = trackRef.current;
    const section = sectionRef.current;
    const totalScroll = track.scrollWidth - section.offsetWidth + 96; // 96 = 3rem*2 padding

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: () => `+=${totalScroll + 300}`,
      scrub: 1.3,
      pin: true,
      anticipatePin: 1,
      onUpdate: self => gsap.set(track, { x: -self.progress * totalScroll }),
    });

    return () => trigger.kill();
  }, [loading, projects]);

  return (
    <section ref={sectionRef} id="projects" style={{ position: "relative", borderTop: "1px solid var(--border)", overflow: "hidden" }}>
      <div style={{ padding: "8rem 3rem 4rem" }}>
        <div className="section-label">Built things</div>
        <div ref={titleRef} style={{ opacity: 0, marginBottom: "4rem" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontSize: "clamp(3rem, 9vw, 9rem)", lineHeight: 0.88, color: "var(--cream)", letterSpacing: "-0.01em" }}>
            Selected
          </h2>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 300, fontStyle: "italic", fontSize: "clamp(3rem, 9vw, 9rem)", lineHeight: 0.88, WebkitTextStroke: "1px rgba(240,235,224,0.2)", color: "transparent", letterSpacing: "-0.01em" }}>
            projects.
          </h2>
        </div>
      </div>

      {/* Horizontal card track */}
      <div style={{ padding: "0 3rem 6rem", overflow: "visible" }}>
        {loading ? (
          <div style={{ display: "flex", gap: "1.25rem" }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ minWidth: "480px", height: "340px", background: "var(--bg-2)", border: "1px solid var(--border)", borderRadius: "4px" }} />
            ))}
          </div>
        ) : (
          <div ref={trackRef} style={{ display: "flex", gap: "1.25rem", width: "max-content", willChange: "transform" }}>
            {projects.map((p, i) => (
              <ProjectCard key={p.id || i} title={p.title} description={p.description} techStack={p.techStack} githubUrl={p.githubUrl} liveUrl={p.liveUrl} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
