import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PROJECTS = [
  {
    id: 1,
    title: "CliniCall",
    description:
      "A production-grade healthcare appointment platform for Vellore residents. Features a Redis-powered caching layer (cutting DB queries by 70–85%), BullMQ background job queues with exponential backoff for 95%+ reliable email delivery, Pusher real-time notifications with batching pipelines (cutting infra costs ~40%), distributed Redis rate limiting, and role-based auth via Auth.js.",
    github: "https://github.com/Nadeem-2005/CliniCall",
    live: "https://clini-call.vercel.app",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Redis", "BullMQ", "Pusher", "Auth.js", "Tailwind CSS"],
  },
  {
    id: 2,
    title: "ConnectPLUS",
    description:
      "A full-featured video conferencing platform built with Next.js and GetStream. Supports real-time meeting controls, screen sharing, emoji reactions, recording, personal rooms, scheduled meetings, and secure Clerk-based authentication. Includes E2E tests with Playwright.",
    github: "https://github.com/Nadeem-2005/ConnectPLUS",
    live: "https://connectplus-ebon.vercel.app",
    tags: ["Next.js", "TypeScript", "Clerk", "GetStream", "Shadcn", "Tailwind CSS", "Playwright"],
  },
  {
    id: 3,
    title: "Neural Acoustic Emotion Interpreter",
    description:
      "A deep learning speech emotion recognition system that classifies audio into eight emotions — angry, calm, disgust, fear, happy, neutral, sad, and surprise — using acoustic feature extraction and neural network models.",
    github: "https://github.com/Nadeem-2005/Neural-Acoustic-Emotion-Interpreter",
    tags: ["Python", "Jupyter Notebook", "Deep Learning", "Librosa", "scikit-learn"],
  },
  {
    id: 4,
    title: "DWT-SVD Image Watermarking",
    description:
      "Robust digital image watermarking in MATLAB using Discrete Wavelet Transform and Singular Value Decomposition. Supports embedding, extraction, and comprehensive attack resistance testing — validating watermark integrity across noise, compression, and geometric distortions.",
    github: "https://github.com/Nadeem-2005/Watermarking-based-on-DWT-SVD",
    tags: ["MATLAB", "DWT", "SVD", "Signal Processing"],
  },
  {
    id: 5,
    title: "Haar-Based Image Steganography",
    description:
      "MATLAB implementation of image steganography using the Haar wavelet transform. Hides secret messages in LL and HH frequency sub-bands of a cover image, with extraction logic and robustness testing against 10+ attack types including noise, compression, and geometric transformations.",
    github: "https://github.com/Nadeem-2005/Haar-based-image-steganography",
    tags: ["MATLAB", "Steganography", "Haar Wavelet", "Image Processing"],
  },
  {
    id: 6,
    title: "The Climate",
    description:
      "A native iOS weather app that delivers 92%+ accurate forecasts for any desired location. Built entirely in Swift with Xcode, featuring a clean, minimal UI, live API integration, and tested via Xcode's UI test suite.",
    github: "https://github.com/Nadeem-2005/The-Climate",
    tags: ["Swift", "iOS", "UIKit", "Xcode", "REST API"],
  },
];

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 10L10 2M10 2H4M10 2v6" />
    </svg>
  );
}

function ProjectRow({ project, index, isActive, onToggle }) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div className="proj-row" data-active={isActive || undefined}>
      {/* Clickable / hoverable header strip */}
      <button
        className="proj-row__trigger"
        onClick={() => onToggle(isActive ? null : project.id)}
        aria-expanded={isActive}
      >
        <span className="proj-row__num">{num}</span>
        <span className="proj-row__title">{project.title}</span>

        <span className="proj-row__links">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer noopener"
              className="proj-row__icon-link"
              aria-label="Live demo"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight />
            </a>
          )}
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer noopener"
            className="proj-row__icon-link"
            aria-label="GitHub"
            onClick={(e) => e.stopPropagation()}
          >
            <GitHubIcon />
          </a>
        </span>

        <span className="proj-row__toggle">{isActive ? "\u2212" : "+"}</span>
      </button>

      {/* Expanding panel */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            className="proj-row__panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="proj-row__inner">
              <p className="proj-row__desc">{project.description}</p>
              <div className="proj-row__tags">
                {project.tags.map((t) => (
                  <span key={t} className="proj-row__tag">{t}</span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  const [activeId, setActiveId] = useState(null);

  return (
    <section id="projects" className="section section--cream">
      <span className="section-label">Projects</span>
      <h2>Things I've built.</h2>

      <div className="proj-list">
        {PROJECTS.map((p, i) => (
          <ProjectRow
            key={p.id}
            project={p}
            index={i}
            isActive={activeId === p.id}
            onToggle={setActiveId}
          />
        ))}
      </div>
    </section>
  );
}
