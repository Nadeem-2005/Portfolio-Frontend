import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";

/*
  colSpan — default column span in the 3-col grid
  Gives the masonry its visual variety before any interaction.
*/
const PROJECTS = [
  {
    id: 1,
    title: "Portfolio Website",
    description:
      "A personal portfolio built with React, GSAP, and editorial design principles. Features scroll-driven animations, geometric overlays, and a cream explosion transition.",
    github: "https://github.com/mohammednadeem",
    tags: ["React", "GSAP", "Vite"],
    colSpan: 2,
  },
  {
    id: 2,
    title: "Project Two",
    description:
      "Placeholder project description. Replace with your actual project details.",
    github: "https://github.com/mohammednadeem",
    tags: ["Node.js", "Express"],
    colSpan: 1,
  },
  {
    id: 3,
    title: "Project Three",
    description:
      "Placeholder project description. Replace with your actual project details.",
    github: "https://github.com/mohammednadeem",
    tags: ["Python", "Flask"],
    colSpan: 1,
  },
  {
    id: 4,
    title: "Project Four",
    description:
      "Placeholder project description. A longer description to show how the card expands to accommodate more text content in the masonry layout.",
    github: "https://github.com/mohammednadeem",
    tags: ["Swift", "UIKit"],
    colSpan: 1,
  },
  {
    id: 5,
    title: "Project Five",
    description: "Placeholder project description.",
    github: "https://github.com/mohammednadeem",
    tags: ["Next.js", "Tailwind"],
    colSpan: 2,
  },
  {
    id: 6,
    title: "Project Six",
    description:
      "Placeholder project description. Replace with your actual project details and a brief summary of what the project does.",
    github: "https://github.com/mohammednadeem",
    tags: ["Java", "Spring Boot"],
    colSpan: 1,
  },
];

function GitHubIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 11L11 1M11 1H3M11 1v8" />
    </svg>
  );
}

const LAYOUT_TRANSITION = {
  layout: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
};

function ProjectCard({ project, isExpanded, onExpand, onCollapse }) {
  const baseSpan = project.colSpan || 1;
  /* on expand: grow by 1 column, capped at 3 (full row) */
  const span = isExpanded ? Math.min(baseSpan + 1, 3) : baseSpan;

  return (
    <motion.div
      layout
      transition={LAYOUT_TRANSITION}
      className={`masonry-card${isExpanded ? " masonry-card--expanded" : ""}`}
      style={{ gridColumn: `span ${span}` }}
      onMouseEnter={onExpand}
      onMouseLeave={onCollapse}
    >
      {/* Header: title + github link */}
      <motion.div layout="position" className="masonry-card__header">
        <h3 className="masonry-card__title">{project.title}</h3>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer noopener"
          className="masonry-card__github"
          aria-label={`${project.title} on GitHub`}
        >
          <GitHubIcon />
          <ArrowIcon />
        </a>
      </motion.div>

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <motion.div layout="position" className="masonry-card__tags">
          {project.tags.map((tag) => (
            <span key={tag} className="masonry-card__tag">
              {tag}
            </span>
          ))}
        </motion.div>
      )}

      {/* Description — revealed on expand */}
      <motion.div
        className="masonry-card__desc-wrap"
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="masonry-card__desc">{project.description}</p>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section id="projects" className="section section--cream">
      <span className="section-label">Projects</span>
      <h2>Things I've built.</h2>

      <LayoutGroup>
        <motion.div layout className="masonry-grid" transition={LAYOUT_TRANSITION}>
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={expandedId === project.id}
              onExpand={() => setExpandedId(project.id)}
              onCollapse={() => setExpandedId(null)}
            />
          ))}
        </motion.div>
      </LayoutGroup>
    </section>
  );
}
