import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import "./Experience.css";

/* ── Placeholder experience data ── */
const EXPERIENCES = [
  {
    id: 1,
    role: "Backend Engineering Intern",
    company: "Jar",
    dateRange: "Jan 2026 - Present",
    description:
      "Joined Jar's backend team in Bangalore to contribute to large-scale distributed systems and cutting-edge backend infrastructure powering one of India's fastest-growing fintech platforms.",
    tags: ["Node.js", "Java", "Kafka", "Redis", "Cloud Technologies", "SQL"],
  },
  {
    id: 2,
    role: "Software Development Engineer",
    company: "Verizon",
    dateRange: "2026 — Upcoming",
    description:
      "Incoming SDE role contributing to enterprise-grade telecom software systems, building full-stack applications and working on large-scale distributed infrastructure at Verizon India.",
    tags: ["Java", "React", "Node.js", "TypeScript", "Cloud Technologies", "SQL"],
  },
  {
    id: 3,
    role: "Software Developer Intern",
    company: "Adappt Mobile Cloud Applications",
    dateRange: "May 2025 — Jun 2025",
    description:
      "Contributed to enterprise-level healthcare management systems at Adappt's Pondicherry office. Implemented Redis caching and background job processing pipelines, delivering measurable performance improvements in production.",
    tags: ["Redis", "Node.js", "React", "PostgreSQL", "TypeScript", "Real-time"],
  },
  {
    id: 4,
    role: "Full Stack & iOS Developer",
    company: "Freelance / Personal Projects",
    dateRange: "2023 — Present",
    description:
      "Always trying to learn and build cool stuff! Developed several full-stack web applications and native iOS apps, honing skills across the stack and exploring new technologies in the process.",
    tags: ["Next.js", "Swift", "Redis", "BullMQ", "Prisma", "Pusher", "Tailwind CSS"],
  },

];

/* ── Sun geometry ── */
const CX = 500;
const CY = 600;
const R = 90;
const LARGE_LEN = 420;
const SMALL_LEN = 260;
const LARGE_BASE = 36;
const SMALL_BASE = 20;
const LARGE_ANGLES = [-90, -45, 0, 45];
const SMALL_ANGLES = [-67.5, -22.5, 22.5, 67.5];
const AUTOPLAY_MS = 6000;

function spikePoints(angleDeg, baseW, len) {
  const a = (angleDeg - 90) * (Math.PI / 180);
  const perp = a + Math.PI / 2;
  const half = baseW / 2;
  const tipX = CX + Math.cos(a) * (R + len);
  const tipY = CY + Math.sin(a) * (R + len);
  const b1x = CX + Math.cos(a) * R + Math.cos(perp) * half;
  const b1y = CY + Math.sin(a) * R + Math.sin(perp) * half;
  const b2x = CX + Math.cos(a) * R - Math.cos(perp) * half;
  const b2y = CY + Math.sin(a) * R - Math.sin(perp) * half;
  return `${b1x},${b1y} ${tipX},${tipY} ${b2x},${b2y}`;
}

export default function Experience() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const sunGroupRef = useRef(null);
  const isFirstRender = useRef(true);

  /* ── Rotate sun ── */
  useEffect(() => {
    if (!sunGroupRef.current) return;
    const target = -LARGE_ANGLES[activeIndex];

    if (isFirstRender.current) {
      gsap.set(sunGroupRef.current, {
        rotation: target,
        svgOrigin: `${CX} ${CY}`,
      });
      isFirstRender.current = false;
    } else {
      gsap.to(sunGroupRef.current, {
        rotation: target,
        duration: 1.2,
        ease: "expo.inOut",
        svgOrigin: `${CX} ${CY}`,
      });
    }
  }, [activeIndex]);

  /* ── Auto-advance ── */
  useEffect(() => {
    if (isHovered) return;
    const id = setTimeout(() => {
      setActiveIndex((p) => (p + 1) % EXPERIENCES.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [isHovered, activeIndex]);

  const goNext = () =>
    setActiveIndex((p) => (p + 1) % EXPERIENCES.length);
  const goPrev = () =>
    setActiveIndex((p) => (p - 1 + EXPERIENCES.length) % EXPERIENCES.length);

  const exp = EXPERIENCES[activeIndex];

  return (
    <section
      id="experience"
      className="section section--cream section--experience"
    >
      <span className="section-label">Experience</span>
      <h2>Where I've been.</h2>

      <div
        className="exp-sun-viewport"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* ── Card ── */}
        <div className="exp-sun-card-anchor">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="exp-sun-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="exp-sun-card__date">{exp.dateRange}</span>
              <h3 className="exp-sun-card__role">{exp.role}</h3>
              <span className="exp-sun-card__company">{exp.company}</span>
              <p className="exp-sun-card__desc">{exp.description}</p>
              <div className="exp-sun-card__tags">
                {exp.tags.map((t) => (
                  <span key={t} className="exp-sun-card__tag">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Connector line ── */}
        <div className="exp-sun-connector" />

        {/* ── Sun SVG ── */}
        <svg
          className="exp-sun-svg"
          viewBox="0 0 1000 600"
          aria-hidden="true"
        >
          <g ref={sunGroupRef}>
            {/* Semicircle base */}
            <circle cx={CX} cy={CY} r={R} className="exp-sun-base" />

            {/* Decorative thin rays */}
            {[...LARGE_ANGLES, ...SMALL_ANGLES].map((angle) => {
              const a = (angle - 90) * (Math.PI / 180);
              const isLarge = LARGE_ANGLES.includes(angle);
              const len = isLarge ? LARGE_LEN : SMALL_LEN;
              return (
                <line
                  key={`ray-${angle}`}
                  x1={CX + Math.cos(a) * (R - 5)}
                  y1={CY + Math.sin(a) * (R - 5)}
                  x2={CX + Math.cos(a) * (R + len + 15)}
                  y2={CY + Math.sin(a) * (R + len + 15)}
                  className="exp-sun-ray"
                />
              );
            })}

            {/* Large spikes */}
            {LARGE_ANGLES.map((angle, i) => (
              <polygon
                key={`lg-${angle}`}
                points={spikePoints(angle, LARGE_BASE, LARGE_LEN)}
                className={`exp-sun-spike exp-sun-spike--large${i === activeIndex ? " exp-sun-spike--active" : ""
                  }`}
              />
            ))}

            {/* Small spikes */}
            {SMALL_ANGLES.map((angle) => (
              <polygon
                key={`sm-${angle}`}
                points={spikePoints(angle, SMALL_BASE, SMALL_LEN)}
                className="exp-sun-spike exp-sun-spike--small"
              />
            ))}
          </g>
        </svg>

        {/* ── Navigation arrows ── */}
        <button
          className="exp-sun-nav exp-sun-nav--prev"
          onClick={goPrev}
          aria-label="Previous experience"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          className="exp-sun-nav exp-sun-nav--next"
          onClick={goNext}
          aria-label="Next experience"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* ── Progress dots ── */}
        <div className="exp-sun-dots">
          {EXPERIENCES.map((_, i) => (
            <button
              key={i}
              className={`exp-sun-dot${i === activeIndex ? " exp-sun-dot--active" : ""
                }`}
              onClick={() => setActiveIndex(i)}
              aria-label={`Experience ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
