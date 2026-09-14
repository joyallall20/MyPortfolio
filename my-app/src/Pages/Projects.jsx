import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { Github, ExternalLink, Play, ArrowUpRight } from "lucide-react";

const customFontStyle = {
  fontFamily: "Poppins, sans-serif",
  fontWeight: 800,
};

const monoStyle = {
  fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
};

/*
|--------------------------------------------------------------------------
| PROJECT DATA
|--------------------------------------------------------------------------
| To change a project:
|
| 1. Change the live URL in `demo`
| 2. Change GitHub URL in `github`
| 3. Paste a normal YouTube URL in `youtube`
|
| Example:
| youtube: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
|
| You do NOT need to convert it to /embed/.
|--------------------------------------------------------------------------
*/

const PROJECTS = [
  {
    id: "novalearny",
    name: "NovaLearny",
    shortName: "NovaLearny",
    tagline: "Full-Stack Education Platform",
    status: "Live",

    description:
      "A full-stack EdTech platform connecting teachers and students through classrooms, assignments, quizzes, assessments, and a creator marketplace. The platform uses separate teacher and student roles with dedicated workflows and dashboards.",

    highlights: [
      "Role-based teacher and student dashboards with distinct navigation systems",
      "Assessment engine with timed final exams, quiz attempts, auto-grading, and per-question time tracking",
      "Teacher analytics dashboard with pass/fail filtering and daily usage quotas",
      "Creator marketplace with PayPal checkout for one-off purchases and memberships",
      "Immutable workflow versioning where published workflows are snapshotted and edits create new drafts",
      "Firebase authentication migration across frontend and backend",
    ],

    tech: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "Firebase",
      "Redis",
      "BullMQ",
      "PayPal API",
      "Tailwind CSS",
    ],

    // Replace this later with your final GitHub repository.
    github: null,

    // Live website
    demo: "https://novalearny.com",

    // Replace this later with your final YouTube video.
    // You can paste a normal YouTube watch URL here.
    youtube: "https://www.youtube.com/watch?v=xdB21TCnb_Y&t=7s",
  },

  {
    id: "skindecode",
    name: "SkinDecode",
    shortName: "SkinDecode",
    tagline: "AI-Powered Skincare Intelligence Platform",
    status: "Live",

    description:
      "An AI-powered skincare platform designed to help users understand skincare products, ingredients, routines, and product intelligence through a modern full-stack experience.",

    highlights: [
      "AI-powered skincare product intelligence and recommendations",
      "Product and ingredient analysis designed around real-world skincare decisions",
      "Personalized skincare profile and user-focused workflows",
      "Full-stack architecture connecting the React frontend with backend services",
      "Product discovery experience with structured skincare data",
      "Modern responsive interface built for desktop and mobile users",
    ],

    tech: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "MongoDB",
      "AI / RAG",
      "Tailwind CSS",
      "Framer Motion",
    ],

    // Add GitHub repository when available.
    github: null,

    // Live website
    demo: "https://skindecode.vercel.app/",

    // Add your SkinDecode YouTube video later.
    youtube: "https://youtu.be/S10SUJfcVb0",
  },

  {
    id: "ride-to-ladakh",
    name: "RIDE to Ladakh",
    shortName: "RIDE to Ladakh",
    tagline: "Ride & Travel Platform",
    status: "In progress",

    description:
      "A full-stack travel and motorcycle-riding platform focused on creating an immersive experience for riders planning and exploring journeys to Ladakh.",

    highlights: [
      "Immersive travel-focused landing experience",
      "Responsive interface designed around large visual content",
      "Structured sections for routes, experiences, and travel information",
      "Modern animated interactions and responsive navigation",
      "Built with a focus on performance and mobile usability",
      "Project is currently under active development",
    ],

    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "JavaScript",
    ],

    // Add GitHub repository later.
    github: null,

    // No live demo yet.
    demo: null,

    // Add YouTube explanation video later.
    youtube: "",
  },
];

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;

  try {
    const parsedUrl = new URL(url);

    // Standard YouTube URL:
    // https://www.youtube.com/watch?v=VIDEO_ID
    if (parsedUrl.hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }

      // Already an embed URL
      if (parsedUrl.pathname.startsWith("/embed/")) {
        return url;
      }
    }

    // Short URL:
    // https://youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }
  } catch {
    return null;
  }

  return null;
};

/*
|--------------------------------------------------------------------------
| Status Indicator
|--------------------------------------------------------------------------
*/

const StatusDot = ({ label }) => {
  const isLive = label.toLowerCase() === "live";

  return (
    <span className="inline-flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping ${
            isLive ? "bg-emerald-300" : "bg-orange-300"
          }`}
        />

        <span
          className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
            isLive ? "bg-emerald-300" : "bg-orange-300"
          }`}
        />
      </span>

      <span
        style={monoStyle}
        className="text-xs text-amber-50/70 uppercase tracking-wide"
      >
        {label}
      </span>
    </span>
  );
};

/*
|--------------------------------------------------------------------------
| YouTube Preview
|--------------------------------------------------------------------------
*/

const YouTubePreview = ({ url, projectName }) => {
  const embedUrl = getYouTubeEmbedUrl(url);

  /*
   * If there is no video yet, keep a polished placeholder.
   * Later just add the YouTube URL to the project's `youtube` field.
   */
  if (!embedUrl) {
    return (
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-amber-50/10 bg-amber-50/[0.03]">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="h-16 w-16 rounded-full border border-orange-300/30 bg-orange-300/10 flex items-center justify-center mb-5">
            <Play
              size={25}
              strokeWidth={1.7}
              className="text-orange-300 ml-0.5"
            />
          </div>

          <p
            style={monoStyle}
            className="text-xs uppercase tracking-[0.2em] text-orange-300/70 mb-3"
          >
            Project walkthrough
          </p>

          <p className="text-amber-50/50 text-sm max-w-xs leading-relaxed">
            YouTube demo coming soon for {projectName}.
          </p>
        </div>

        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.08),transparent_55%)]" />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-amber-50/10 bg-black shadow-2xl">
      <iframe
        src={embedUrl}
        title={`${projectName} project walkthrough`}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Project Tabs
|--------------------------------------------------------------------------
*/

const ProjectTabs = ({ projects, activeId, onChange }) => {
  return (
    <div className="w-full overflow-x-auto pb-2 scrollbar-none">
      <div
        className="flex min-w-max gap-2 p-1.5 rounded-2xl border border-amber-50/10 bg-amber-50/[0.03]"
        role="tablist"
        aria-label="Projects"
      >
        {projects.map((project) => {
          const active = project.id === activeId;

          return (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(project.id)}
              className={`relative rounded-xl px-5 sm:px-7 py-3 text-sm sm:text-base font-semibold transition-all duration-300 whitespace-nowrap ${
                active
                  ? "text-black"
                  : "text-amber-50/60 hover:text-amber-50"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="activeProjectTab"
                  className="absolute inset-0 rounded-xl bg-orange-300"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <span className="relative z-10">{project.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Project Details
|--------------------------------------------------------------------------
*/

const ProjectDetails = ({ project }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
        <div>
          <p
            style={monoStyle}
            className="text-orange-300/70 text-xs uppercase tracking-[0.18em] mb-2"
          >
            Featured Project
          </p>

          <h3
            style={customFontStyle}
            className="text-3xl sm:text-4xl lg:text-5xl text-amber-50 leading-tight"
          >
            {project.name}
          </h3>

          <p className="text-orange-300 text-sm sm:text-base mt-2">
            {project.tagline}
          </p>
        </div>

        <StatusDot label={project.status} />
      </div>

      <p className="text-amber-50/75 text-sm sm:text-base lg:text-lg leading-relaxed">
        {project.description}
      </p>

      <div className="mt-7">
        <p
          style={monoStyle}
          className="text-xs uppercase tracking-[0.18em] text-amber-50/40 mb-4"
        >
          What I built
        </p>

        <ul className="space-y-3">
          {project.highlights.map((highlight) => (
            <li
              key={highlight}
              className="flex items-start gap-3 text-amber-50/65 text-sm leading-relaxed"
            >
              <span className="text-orange-300 text-lg leading-5 mt-[-1px]">
                ›
              </span>

              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7">
        <p
          style={monoStyle}
          className="text-xs uppercase tracking-[0.18em] text-amber-50/40 mb-3"
        >
          Technology
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((technology) => (
            <span
              key={technology}
              style={monoStyle}
              className="text-[11px] sm:text-xs text-amber-50/75 bg-black/50 border border-amber-50/10 rounded-lg px-2.5 py-1.5"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>

      {(project.github || project.demo) && (
        <div className="flex flex-wrap gap-3 mt-8 pt-6 border-t border-amber-50/10">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 text-amber-50 border border-amber-50/20 rounded-full px-5 py-2.5 text-sm hover:border-amber-50/50 hover:bg-amber-50/5 transition-all duration-300"
            >
              <Github size={17} />
              GitHub
              <ArrowUpRight size={14} />
            </a>
          )}

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-orange-300 text-black rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-orange-200 hover:-translate-y-0.5 transition-all duration-300"
            >
              <ExternalLink size={17} />
              Live Demo
              <ArrowUpRight size={14} />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

/*
|--------------------------------------------------------------------------
| Main Projects Section
|--------------------------------------------------------------------------
*/

const Projects = () => {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(PROJECTS[0].id);

  const { scrollYProgress } = useScroll();

  const headingScale = useTransform(
    scrollYProgress,
    [0, 0.3],
    [1, prefersReducedMotion ? 1 : 0.94]
  );

  const activeProject =
    PROJECTS.find((project) => project.id === activeId) || PROJECTS[0];

  return (
    <section
      id="projects"
      className="bg-black w-full overflow-hidden rounded-b-2xl relative pt-28 sm:pt-32 pb-24"
    >
      {/* Subtle background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-orange-300/[0.035] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 xl:px-16 relative z-10">
        {/* Heading */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 20 }}
          whileInView={
            prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-10 sm:mb-12"
        >
          <motion.h2
            style={{
              scale: headingScale,
              ...customFontStyle,
            }}
            className="text-white text-5xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tight"
          >
            Projects
          </motion.h2>

          <p
            style={monoStyle}
            className="mt-5 text-amber-50/40 text-xs sm:text-sm max-w-xl leading-relaxed"
          >
            Selected work, systems I've built, and products currently in
            development.
          </p>
        </motion.div>

        {/* Project selector */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 15 }}
          whileInView={
            prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 sm:mb-10"
        >
          <ProjectTabs
            projects={PROJECTS}
            activeId={activeId}
            onChange={setActiveId}
          />
        </motion.div>

        {/* Project content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProject.id}
            initial={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: 15 }
            }
            animate={{ opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? undefined
                : { opacity: 0, y: -10 }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="border border-amber-50/10 bg-amber-50/[0.025] rounded-3xl p-5 sm:p-7 lg:p-9 xl:p-10"
          >
            <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-10 xl:gap-14 items-start">
              {/* LEFT — Project information */}
              <div className="min-w-0">
                <ProjectDetails project={activeProject} />
              </div>

              {/* RIGHT — YouTube */}
              <div className="lg:sticky lg:top-24">
                <div className="mb-3 flex items-center justify-between gap-4">
                  <p
                    style={monoStyle}
                    className="text-xs uppercase tracking-[0.18em] text-amber-50/40"
                  >
                    Product walkthrough
                  </p>

                  {activeProject.youtube && (
                    <span
                      style={monoStyle}
                      className="hidden sm:inline-flex items-center gap-2 text-[10px] uppercase tracking-wider text-orange-300/60"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-orange-300" />
                      Watch demo
                    </span>
                  )}
                </div>

                <YouTubePreview
                  url={activeProject.youtube}
                  projectName={activeProject.name}
                />

                {/* Video caption */}
                <div className="mt-4 flex items-start gap-3">
                  <div className="mt-1 h-7 w-7 shrink-0 rounded-lg bg-orange-300/10 border border-orange-300/10 flex items-center justify-center">
                    <Play
                      size={13}
                      className="text-orange-300 ml-0.5"
                    />
                  </div>

                  <p className="text-amber-50/40 text-xs sm:text-sm leading-relaxed">
                    A walkthrough of the product flow, architecture, and key
                    features.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* More projects */}
        <motion.div
          initial={prefersReducedMotion ? undefined : { opacity: 0 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 border border-dashed border-amber-50/10 rounded-3xl px-6 py-7 flex items-center justify-center"
        >
          <p
            style={monoStyle}
            className="text-amber-50/30 text-xs sm:text-sm text-center"
          >
            more projects are on the way
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;

