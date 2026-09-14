import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const customFontStyle = { fontFamily: "Poppins, sans-serif", fontWeight: 800 };
const monoStyle = {
  fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace",
};

/*
|--------------------------------------------------------------------------
| SERVICE DATA
|--------------------------------------------------------------------------
| Edit this array to change what shows up in the section. `example` is
| optional — only add it when you want a "See it in ___" link pointing at
| one of your live projects.
|--------------------------------------------------------------------------
*/

const SERVICES = [
  {
    number: "01",
    title: "Full-Stack Development",
    description:
      "Complete web applications from frontend to backend, with APIs, databases, authentication and production-ready architecture.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
  },
  {
    number: "02",
    title: "AI-Powered Applications",
    description:
      "AI-powered products that use LLMs, RAG, intelligent search and structured data to solve real product problems.",
    technologies: ["LLMs", "RAG", "Embeddings", "Vector Search", "AI APIs"],
    example: { label: "SkinDecode", targetId: "projects" },
  },
  {
    number: "03",
    title: "SaaS & Platform Development",
    description:
      "Role-based platforms with dashboards, workflows, subscriptions, payments, analytics and scalable backend systems.",
    technologies: [
      "Authentication",
      "Payments",
      "Redis",
      "Background Jobs",
      "APIs",
    ],
    example: { label: "NovaLearny", targetId: "projects" },
  },
  {
    number: "04",
    title: "E-Commerce Development",
    description:
      "Modern commerce experiences with product catalogs, carts, checkout, orders, payments and administration.",
    technologies: ["React", "APIs", "MongoDB", "Payments", "Admin Systems"],
  },
];

/*
|--------------------------------------------------------------------------
| StaggeredText
|--------------------------------------------------------------------------
| Splits a line into words and reveals them with a short stagger the first
| time the line enters the viewport. Falls back to plain static text when
| the user prefers reduced motion.
|--------------------------------------------------------------------------
*/

const StaggeredText = ({
  text,
  as = "span",
  className = "",
  style = {},
  staggerDelay = 0.06,
  baseDelay = 0,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const words = text.split(" ");
  const MotionTag = motion[as] || motion.span;

  if (prefersReducedMotion) {
    const StaticTag = as;
    return (
      <StaticTag className={className} style={style}>
        {text}
      </StaticTag>
    );
  }

  return (
    <MotionTag className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.1em] mr-[0.28em] align-bottom"
        >
          <motion.span
            className="inline-block"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: baseDelay + i * staggerDelay,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
};

/*
|--------------------------------------------------------------------------
| ServiceRow
|--------------------------------------------------------------------------
| One editorial row per service. Color values are motion values (or static
| fallbacks) handed down from the parent so every row stays in sync with
| the section-wide black -> white scroll transition.
|--------------------------------------------------------------------------
*/

const ServiceRow = ({
  service,
  index,
  isLast,
  titleColor,
  descColor,
  accentColor,
  techColor,
  borderColor,
}) => {
  const prefersReducedMotion = useReducedMotion();

  const goToExample = () => {
    document
      .getElementById(service.example.targetId)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <motion.div
      initial={prefersReducedMotion ? undefined : { opacity: 0, y: 28 }}
      whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.65, ease: "easeOut", delay: index * 0.05 }}
      style={{
        borderBottomWidth: isLast ? 0 : 1,
        borderBottomStyle: "solid",
        borderBottomColor: isLast ? "transparent" : borderColor,
      }}
      className="group relative py-9 sm:py-11 lg:py-14"
    >
      <div className="lg:grid lg:grid-cols-[64px_1fr_56px] lg:items-start lg:gap-x-8 xl:gap-x-12">
        {/* Number — desktop column */}
        <motion.span
          style={{ ...monoStyle, color: accentColor }}
          className="hidden lg:block text-lg pt-1"
        >
          {service.number}
        </motion.span>

        {/* Content */}
        <div className="min-w-0">
          <motion.span
            style={{ ...monoStyle, color: accentColor }}
            className="lg:hidden block text-base mb-4"
          >
            {service.number}
          </motion.span>

          <motion.h3
            style={{ ...customFontStyle, color: titleColor }}
            className="text-[28px] sm:text-4xl lg:text-5xl leading-[1.05] tracking-tight mb-4 lg:mb-5 transition-transform duration-300 will-change-transform group-hover:translate-x-1.5"
          >
            {service.title}
          </motion.h3>

          <motion.p
            style={{ color: descColor }}
            className="text-base sm:text-lg leading-relaxed max-w-xl mb-5 lg:mb-6 transition-opacity duration-300"
          >
            {service.description}
          </motion.p>

          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
            {service.technologies.map((tech, i) => (
              <React.Fragment key={tech}>
                {i > 0 && (
                  <motion.span
                    style={{ color: borderColor }}
                    aria-hidden="true"
                    className="text-xs sm:text-sm"
                  >
                    ·
                  </motion.span>
                )}
                <motion.span
                  style={{ ...monoStyle, color: techColor }}
                  className="text-xs sm:text-sm"
                >
                  {tech}
                </motion.span>
              </React.Fragment>
            ))}
          </div>

          {service.example && (
            <button
              type="button"
              onClick={goToExample}
              style={{ ...monoStyle, color: accentColor }}
              className="mt-5 inline-flex items-center gap-1.5 text-xs sm:text-sm underline decoration-current/40 underline-offset-4 hover:decoration-current transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
            >
              See it in {service.example.label}
              <ArrowUpRight size={13} />
            </button>
          )}
        </div>

        {/* Arrow — desktop column */}
        <motion.div
          style={{ color: accentColor }}
          className="hidden lg:flex justify-end pt-2 transition-transform duration-300 will-change-transform group-hover:-translate-y-1 group-hover:translate-x-1"
        >
          <ArrowUpRight size={26} strokeWidth={1.6} />
        </motion.div>
      </div>

      {/* Arrow — mobile, sits after the content, before the row's border */}
      <motion.div
        style={{ color: accentColor }}
        className="lg:hidden mt-6 flex justify-end"
      >
        <ArrowUpRight size={20} strokeWidth={1.6} />
      </motion.div>
    </motion.div>
  );
};

/*
|--------------------------------------------------------------------------
| Services
|--------------------------------------------------------------------------
*/

const Services = () => {
  const prefersReducedMotion = useReducedMotion();
  const servicesRef = useRef(null);
  const headingRef = useRef(null);

  // Tied to the heading itself, not the section. The window between these
  // two trigger points is where the flip happens: "start 0.65" fires while
  // the heading is still low in the viewport (section still reads black),
  // "start 0.35" fires once the heading has reached the upper-middle of the
  // screen (by which point it should read fully white). That's ~30% of the
  // viewport height of scroll distance — roughly 150-300px on typical
  // viewport heights — so the flip is quick, then clamps and holds white
  // for the rest of the section (the rows below never re-enter this range).
  const { scrollYProgress: headingProgress } = useScroll({
    target: headingRef,
    offset: ["start 0.65", "start 0.35"],
  });

  const bgColor = useTransform(headingProgress, [0, 1], ["#000000", "#ffffff"]);
  const headingColor = useTransform(
    headingProgress,
    [0, 1],
    ["#fffbeb", "#0a0a0a"]
  );
  const descColor = useTransform(
    headingProgress,
    [0, 1],
    ["rgba(255,251,235,0.55)", "rgba(20,20,20,0.6)"]
  );
  const techColor = useTransform(
    headingProgress,
    [0, 1],
    ["rgba(255,251,235,0.7)", "rgba(20,20,20,0.7)"]
  );
  const borderColor = useTransform(
    headingProgress,
    [0, 1],
    ["rgba(255,251,235,0.12)", "rgba(20,20,20,0.14)"]
  );
  const eyebrowColor = useTransform(
    headingProgress,
    [0, 1],
    ["rgba(255,251,235,0.4)", "rgba(20,20,20,0.42)"]
  );
  const accentColor = useTransform(
    headingProgress,
    [0, 1],
    ["#fdba74", "#ea580c"]
  );

  // Reduced-motion fallback: skip the scroll-linked interpolation entirely
  // and render the section in its initial, static black / white / orange
  // state so nothing shifts color as the user scrolls.
  const bg = prefersReducedMotion ? "#0b0b0b" : bgColor;
  const heading = prefersReducedMotion ? "#fffbeb" : headingColor;
  const desc = prefersReducedMotion ? "rgba(255,251,235,0.6)" : descColor;
  const tech = prefersReducedMotion ? "rgba(255,251,235,0.7)" : techColor;
  const border = prefersReducedMotion ? "rgba(255,251,235,0.12)" : borderColor;
  const eyebrow = prefersReducedMotion ? "rgba(255,251,235,0.4)" : eyebrowColor;
  const accent = prefersReducedMotion ? "#fdba74" : accentColor;

  return (
    <section
      id="services"
      ref={servicesRef}
      className="relative w-full overflow-hidden min-h-screen"
    >
      {/* Dedicated, scroll-driven background layer */}
      <motion.div
        aria-hidden="true"
        style={{ background: bg }}
        className="absolute inset-0"
      />

      <div className="relative z-10 max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-20 sm:py-28 lg:py-32">
        {/* Header */}
        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 10 }}
          whileInView={
            prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
          style={{ ...monoStyle, color: eyebrow }}
          className="text-sm mb-6"
        >
          <h2 className="text-orange-500">Services</h2>
        </motion.p>

        <h2
          ref={headingRef}
          className="text-[34px] sm:text-5xl lg:text-6xl xl:text-[68px] leading-[1.05] tracking-tight"
        >
          <StaggeredText
            as="span"
            text="I BUILD"
            style={{ ...customFontStyle, color: heading }}
            className="block"
          />
          <StaggeredText
            as="span"
            text="DIGITAL PRODUCTS."
            baseDelay={0.18}
            style={{ ...customFontStyle, color: heading }}
            className="block mb-8 lg:mb-10"
          />
        </h2>

        <motion.p
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
          whileInView={
            prefersReducedMotion ? undefined : { opacity: 1, y: 0 }
          }
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ color: desc }}
          className="text-base sm:text-lg leading-relaxed max-w-xl mb-16 sm:mb-20 lg:mb-24"
        >
          From idea to production — I build the frontend, backend, AI systems
          and infrastructure that turn ideas into working products.
        </motion.p>

        {/* Service rows */}
        <div>
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.number}
              service={service}
              index={i}
              isLast={i === SERVICES.length - 1}
              titleColor={heading}
              descColor={desc}
              accentColor={accent}
              techColor={tech}
              borderColor={border}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;