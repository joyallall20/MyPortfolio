import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const TITLES = [
  "full-stack developer",
  "frontend developer",
  "web application developer",
  "product-focused developer",
];

const STACK = ["React", "Node.js", "Firebase", "REST APIs", "AI Integrations"];

const customFontStyle = { fontFamily: "Poppins, sans-serif", fontWeight: 700 };
const interStyle = { fontFamily: "inter-uniquifier, sans-serif" };
const monoStyle = { fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace" };

// Terminal-style typewriter: types a phrase, holds, deletes, moves to the next.
// Falls back to a static first phrase when the user prefers reduced motion.
const useTypewriter = (words, { typingMs = 55, deletingMs = 28, holdMs = 1600 } = {}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const current = words[wordIndex];

    if (!deleting && charCount === current.length) {
      const holdTimer = setTimeout(() => setDeleting(true), holdMs);
      return () => clearTimeout(holdTimer);
    }
    if (deleting && charCount === 0) {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % words.length);
      return;
    }

    const stepTimer = setTimeout(
      () => setCharCount((c) => c + (deleting ? -1 : 1)),
      deleting ? deletingMs : typingMs
    );
    return () => clearTimeout(stepTimer);
  }, [charCount, deleting, wordIndex, words, prefersReducedMotion, holdMs, typingMs, deletingMs]);

  if (prefersReducedMotion) return words[0];
  return words[wordIndex].slice(0, charCount);
};

// Cursor-tracking "magnetic" pull for the two primary CTAs — reserved for just
// these two buttons so the effect stays a deliberate signature, not a default.
const useMagnetic = (strength = 14) => {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 14, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 150, damping: 14, mass: 0.25 });

  const onMouseMove = (e) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(((e.clientX - rect.left - rect.width / 2) / rect.width) * strength);
    y.set(((e.clientY - rect.top - rect.height / 2) / rect.height) * strength);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x: springX, y: springY }, onMouseMove, onMouseLeave };
};

const MagneticButton = ({ onClick, children, variant }) => {
  const magnetic = useMagnetic(variant === "primary" ? 14 : 10);
  const base =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";
  const look =
    variant === "primary"
      ? "bg-black text-amber-50 hover:bg-black/85"
      : "border-2 border-black text-black hover:bg-black hover:text-amber-50";

  return (
    <motion.button
      ref={magnetic.ref}
      onClick={onClick}
      onMouseMove={magnetic.onMouseMove}
      onMouseLeave={magnetic.onMouseLeave}
      style={magnetic.style}
      className={`${base} ${look}`}
    >
      {children}
    </motion.button>
  );
};

const Main = () => {
  const [aboutMe, setAboutMe] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef(null);
  const typed = useTypewriter(TITLES);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const yName = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 60]);
  const scaleName = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.9]);
  const yTexture = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -30]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // One choreographed sequence for the whole hero — each child uses a
  // distinct technique (wipe, type, fade) rather than one repeated fade+slide.
  const sequence = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="bg-black w-full flex items-center justify-center overflow-x-hidden pt-16"
    >
      <div className="relative flex flex-col rounded-b-2xl min-h-[calc(100vh-4rem)] w-full bg-amber-50 shadow-2xl overflow-hidden px-6 sm:px-10 lg:px-20">
        {/* Faint depth texture, parallaxing slower than the content above it */}
        <motion.div
          aria-hidden="true"
          style={{ y: yTexture }}
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(0,0,0,0.9) 1px, transparent 1px)",
              backgroundSize: "26px 26px",
            }}
          />
        </motion.div>

        <motion.div
          variants={sequence}
          initial="hidden"
          animate="visible"
          className="relative flex-1 flex flex-col justify-center max-w-4xl mx-auto lg:mx-0 py-20"
        >
          <motion.p variants={fadeUp} style={interStyle} className="text-lg sm:text-xl text-gray-700 mb-3">
            Hello, I'm
          </motion.p>

          {/* Name reveals via a shutter wipe rather than a slide-fade */}
          <motion.div
            variants={{
              hidden: { clipPath: "inset(0 100% 0 0)" },
              visible: {
                clipPath: "inset(0 0% 0 0)",
                transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
              },
            }}
            style={{ y: yName, scale: scaleName }}
          >
            <h1
              style={customFontStyle}
              className="text-6xl sm:text-7xl lg:text-8xl font-bold text-black leading-[0.95] tracking-tight"
            >
              JOYAL LAL
            </h1>
          </motion.div>

          {/* Rotating role, rendered as a typed terminal line */}
          <motion.div variants={fadeUp} className="h-10 sm:h-12 mt-5 flex items-center">
            <span style={monoStyle} className="text-orange-500/70 text-xl sm:text-2xl mr-2">
              &gt;
            </span>
            <h2 style={monoStyle} className="text-xl sm:text-2xl font-medium text-black">
              {typed}
            </h2>
            <motion.span
              aria-hidden="true"
              animate={prefersReducedMotion ? {} : { opacity: [1, 1, 0, 0] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
              style={monoStyle}
              className="inline-block w-[9px] h-6 bg-black ml-1"
            />
          </motion.div>

          <motion.p variants={fadeUp} className="mt-6 text-lg sm:text-xl text-gray-800 max-w-xl">
            I build web applications that turn ideas into working products.
          </motion.p>

          <motion.div variants={fadeUp} style={monoStyle} className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600">
            {STACK.map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && <span className="text-black/20">/</span>}
                <span>{item}</span>
              </React.Fragment>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
            <MagneticButton variant="primary" onClick={() => scrollToSection("projects")}>
              View my work
              <ArrowDown size={18} />
            </MagneticButton>
            <MagneticButton variant="secondary" onClick={() => scrollToSection("contact")}>
              Let's work together
              <ArrowUpRight size={18} />
            </MagneticButton>
          </motion.div>

          {/* About Me reveal — hover on desktop, tap on mobile */}
          <motion.div variants={fadeUp} className="mt-10">
            <button
              onMouseEnter={() => setAboutMe(true)}
              onMouseLeave={() => setAboutMe(false)}
              onClick={() => setAboutMe((v) => !v)}
              style={interStyle}
              aria-expanded={aboutMe}
              className="text-lg underline decoration-orange-300 decoration-2 underline-offset-4 text-black/80 hover:text-black transition-colors"
            >
              About me {aboutMe ? "↑" : "↓"}
            </button>

            <AnimatePresence>
              {aboutMe && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 max-w-2xl text-black text-lg sm:text-xl font-medium leading-relaxed">
                    I'm a self-taught full-stack developer who builds real, working
                    products rather than tutorial projects. I like taking a vague idea
                    or a business problem and turning it into a functioning
                    application — figuring out the architecture, wiring up the
                    backend, and shipping a UI people can actually use. I'm still
                    early in my career, but I learn new tools quickly and enjoy
                    solving problems I haven't solved before.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Main;
