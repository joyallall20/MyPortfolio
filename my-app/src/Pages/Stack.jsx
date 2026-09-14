import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const customFontStyle = { fontFamily: "Poppins, sans-serif", fontWeight: 800 };
const monoStyle = {
  fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
};

/*
|--------------------------------------------------------------------------
| STACK DATA
|--------------------------------------------------------------------------
| Edit this array to add / remove technologies or categories later.
|--------------------------------------------------------------------------
*/

const STACK = [
  {
    number: "01",
    title: "Frontend",
    technologies: [
      "React",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "HTML",
      "CSS",
    ],
  },
  {
    number: "02",
    title: "Backend",
    technologies: [
      "Node.js",
      "Express",
      "REST APIs",
      "Authentication",
      "Webhooks",
      "Background Jobs",
    ],
  },
  {
    number: "03",
    title: "AI & Intelligent Systems",
    technologies: [
      "LLM APIs",
      "RAG",
      "Embeddings",
      "Vector Search",
      "AI Product Intelligence",
    ],
  },
  {
    number: "04",
    title: "Database & Data",
    technologies: ["MongoDB", "Mongoose", "Redis", "Data Modeling"],
  },
  {
    number: "05",
    title: "Deployment & Infrastructure",
    technologies: [
      "AWS",
      "Vercel",
      "Railway",
      "Cloudflare",
      "Firebase",
      "GitHub",
    ],
  },
  {
    number: "06",
    title: "Payments & Integrations",
    technologies: [
      "PayPal API",
      "Third-party APIs",
      "Webhooks",
      "OAuth / Authentication",
    ],
  },
];

/*
|--------------------------------------------------------------------------
| StaggeredWords
|--------------------------------------------------------------------------
| Small, self-contained word-stagger for the heading. Falls back to plain
| static text under reduced motion.
|--------------------------------------------------------------------------
*/

const StaggeredWords = ({ text, className = "", style = {}, baseDelay = 0 }) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");

  if (prefersReducedMotion) {
    return (
      <span className={className} style={style}>
        {text}
      </span>
    );
  }

  return (
    <span className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.1em] mr-[0.28em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: baseDelay + i * 0.05,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

/*
|--------------------------------------------------------------------------
| CategoryBlock
|--------------------------------------------------------------------------
| One category: a numbered/titled header, then its technologies as quiet
| pills. A single whileInView trigger orchestrates the header and pills
| via staggerChildren, so each category animates once, calmly, and pills
| settle in just after their heading rather than all at once.
|--------------------------------------------------------------------------
*/

const groupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};

const headerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const pillVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

const CategoryBlock = ({ category, index }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : "hidden"}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.2 }}
      variants={prefersReducedMotion ? undefined : groupVariants}
      transition={{ delay: index * 0.05 }}
    >
      <motion.div
        variants={prefersReducedMotion ? undefined : headerVariants}
        className="flex items-baseline gap-2.5 mb-4 pb-3 border-b border-black/10"
      >
        <span style={monoStyle} className="text-orange-500 text-sm shrink-0">
          {category.number}
        </span>
        <h3
          style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700 }}
          className="text-lg sm:text-xl text-black tracking-tight"
        >
          {category.title}
        </h3>
      </motion.div>

      <ul className="flex flex-wrap gap-2">
        {category.technologies.map((tech) => (
          <motion.li
            key={tech}
            variants={prefersReducedMotion ? undefined : pillVariants}
            className="list-none"
          >
            <span className="inline-flex items-center rounded-md border border-black/10 bg-black/[0.02] px-3 py-1.5 text-xs sm:text-sm text-black/75 transition-colors duration-200 hover:border-black/25 hover:bg-black/[0.04] hover:text-black/90">
              {tech}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

/*
|--------------------------------------------------------------------------
| Stack
|--------------------------------------------------------------------------
*/

const Stack = () => {
  const prefersReducedMotion = useReducedMotion();

  const gridCategories = STACK.slice(0, 4); // Frontend, Backend, AI, Database
  const fullWidthCategories = STACK.slice(4); // Deployment, Payments

  return (
    <section id="stack" className="bg-white w-full lg:min-h-screen">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-20 sm:py-24 lg:py-28">
        {/* Header */}
        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          style={monoStyle}
          className="text-sm text-black/40 mb-6"
        >
          <h2 className="text-orange-500">Stack</h2>
        </motion.p>

        <h2 className="text-[34px] sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight mb-5 lg:mb-6">
          <StaggeredWords
            text="THE TOOLS"
            style={customFontStyle}
            className="block text-black"
          />
          <StaggeredWords
            text="BEHIND THE WORK."
            baseDelay={0.15}
            style={customFontStyle}
            className="block text-black"
          />
        </h2>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base sm:text-lg text-black/55 max-w-2xl leading-relaxed mb-14 sm:mb-16 lg:mb-20"
        >
          I work across the full stack — from interfaces and APIs to
          databases, AI systems and deployment.
        </motion.p>

        {/* 2 x 2 grid: Frontend / Backend / AI / Database */}
        <div className="grid sm:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-10 lg:gap-y-12">
          {gridCategories.map((category, i) => (
            <CategoryBlock key={category.number} category={category} index={i} />
          ))}
        </div>

        {/* Full-width compact rows: Deployment / Payments */}
        <div className="grid gap-y-10 mt-12 lg:mt-14 pt-10 lg:pt-12 border-t border-black/10">
          {fullWidthCategories.map((category, i) => (
            <CategoryBlock
              key={category.number}
              category={category}
              index={gridCategories.length + i}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stack;