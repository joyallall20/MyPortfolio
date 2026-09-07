import React from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const customFontStyle = { fontFamily: "Poppins, sans-serif", fontWeight: 800 };
const monoStyle = { fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace" };

// TODO(Joyal): fill in real links once you have them. Leaving these null
// means the buttons below simply won't render — nothing fake is shown.
const NOVALEARNY = {
  name: "NovaLearny",
  tagline: "Full-Stack Education Platform",
  status: "In progress",
  description:
    "A full-stack EdTech platform connecting teachers and students through classrooms, assignments, quizzes, and a creator marketplace — built with separate teacher and student roles and workflows for each.",
  highlights: [
    "Role-based teacher and student dashboards with distinct navigation systems",
    "Assessment engine: timed final exams, quiz attempts, auto-grading, and per-question time tracking",
    "Teacher analytics dashboard with pass/fail filtering and daily usage quotas",
    "Creator marketplace with PayPal checkout for one-off purchases and memberships",
    "Immutable workflow versioning — publishing a workflow snapshots it, edits fork a new draft",
    "Migrating authentication from Clerk to Firebase across frontend and backend",
  ],
  tech: ["React", "Vite", "Node.js", "Express", "MongoDB", "Firebase", "Redis / BullMQ", "PayPal API", "Tailwind CSS"],
  github: null,
  demo: null,
};

const StatusDot = ({ label }) => (
  <span className="inline-flex items-center gap-2">
    <span className="relative flex h-2.5 w-2.5">
      <span className="absolute inline-flex h-full w-full rounded-full bg-orange-300 opacity-60 animate-ping" />
      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-orange-300" />
    </span>
    <span style={monoStyle} className="text-xs text-amber-50/70">
      {label}
    </span>
  </span>
);

const ProjectCard = ({ project }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { clipPath: "inset(0 0 100% 0)" }}
      whileInView={prefersReducedMotion ? undefined : { clipPath: "inset(0 0 0% 0)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className="bg-amber-50/5 border border-amber-50/10 rounded-3xl p-8 sm:p-10"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <h3 className="text-2xl sm:text-3xl font-bold text-amber-50">{project.name}</h3>
          <p className="text-orange-300 text-sm sm:text-base mt-1">{project.tagline}</p>
        </div>
        <StatusDot label={project.status} />
      </div>

      <p className="text-amber-50/80 text-base sm:text-lg leading-relaxed max-w-3xl">
        {project.description}
      </p>

      <ul className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="text-amber-50/70 text-sm leading-relaxed flex gap-2">
            <span className="text-orange-300 mt-1">›</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-2 mt-8">
        {project.tech.map((t) => (
          <span
            key={t}
            style={monoStyle}
            className="text-xs text-amber-50/80 bg-black/40 border border-amber-50/10 rounded-md px-2.5 py-1"
          >
            {t}
          </span>
        ))}
      </div>

      {(project.github || project.demo) && (
        <div className="flex gap-4 mt-8">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-amber-50 border-2 border-amber-50/30 rounded-full px-5 py-2 hover:border-amber-50 transition-colors"
            >
              <Github size={18} /> Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-orange-300 text-black rounded-full px-5 py-2 hover:bg-orange-200 transition-colors font-semibold"
            >
              <ExternalLink size={18} /> Live demo
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
};

// A quiet placeholder for future work, so the section reads as "more is
// coming" rather than trailing off after a single card.
const MoreProjectsCard = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, amount: 0.4 }}
    transition={{ duration: 0.6 }}
    className="mt-6 border border-dashed border-amber-50/15 rounded-3xl p-8 sm:p-10 flex items-center justify-center"
  >
    <p style={monoStyle} className="text-amber-50/40 text-sm">
      more projects are on the way
    </p>
  </motion.div>
);

const Projects = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const headingScale = useTransform(scrollYProgress, [0, 0.3], [1, prefersReducedMotion ? 1 : 0.94]);

  return (
    <section id="projects" className="bg-black w-full overflow-x-hidden rounded-b-2xl relative pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-20">
        <motion.h2
          style={{ scale: headingScale, ...customFontStyle }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-5xl sm:text-7xl lg:text-8xl mb-16"
        >
          Projects
        </motion.h2>

        <ProjectCard project={NOVALEARNY} />
        <MoreProjectsCard />
      </div>
    </section>
  );
};

export default Projects;
