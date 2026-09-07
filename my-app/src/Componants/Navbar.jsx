import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "Work", id: "projects" },
  { label: "Stack", id: "techstack" },
  { label: "Contact", id: "contact" },
];

const monoStyle = { fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace" };

const Navbar = () => {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to (a) shrink/shade the bar and (b) highlight
  // whichever section is currently in view.
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((n) => n.id);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }
      setActive(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-shadow duration-300 ${
        scrolled ? "bg-amber-50/90 backdrop-blur-md shadow-md" : "bg-amber-50"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-6 lg:px-10 max-w-7xl mx-auto">
        <button
          onClick={() => scrollToSection("home")}
          style={monoStyle}
          className="text-xl lg:text-2xl font-bold text-black hover:text-black/70 transition-colors"
        >
          joyal<span className="text-orange-400">.</span>dev
        </button>

        {/* Desktop nav — a single underline slides between items instead of
            each link carrying its own border/hover treatment. */}
        <div className="hidden md:flex gap-8">
          {NAV_ITEMS.map((nav) => (
            <button
              key={nav.id}
              onClick={() => scrollToSection(nav.id)}
              aria-current={active === nav.id ? "page" : undefined}
              className={`relative text-base py-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black rounded ${
                active === nav.id ? "text-black font-semibold" : "text-black/55 hover:text-black"
              }`}
            >
              {nav.label}
              {active === nav.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 -bottom-0.5 w-full h-[2px] bg-orange-400"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-black"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <X size={26} />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="block"
              >
                <Menu size={26} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-amber-50 border-t border-black/10"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {NAV_ITEMS.map((nav) => (
                <button
                  key={nav.id}
                  onClick={() => scrollToSection(nav.id)}
                  className={`text-left text-lg py-3 px-2 rounded transition-colors ${
                    active === nav.id ? "font-semibold text-black" : "text-black/70"
                  }`}
                >
                  {nav.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
