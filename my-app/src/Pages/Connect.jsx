import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Send, Check, MapPin, Mail, Phone, Github, Linkedin, Instagram } from "lucide-react";
import emailjs from "@emailjs/browser";

// NOTE(Joyal): move these to environment variables (e.g. VITE_EMAILJS_SERVICE_ID)
// instead of hardcoding them in source. EmailJS public keys are meant to be
// client-visible, but env vars keep them out of git history and make it easy
// to swap between dev/prod.
const EMAILJS_SERVICE_ID = import.meta.env?.VITE_EMAILJS_SERVICE_ID || "service_89ixnbd";
const EMAILJS_TEMPLATE_ID = import.meta.env?.VITE_EMAILJS_TEMPLATE_ID || "template_qmte25q";
const EMAILJS_PUBLIC_KEY = import.meta.env?.VITE_EMAILJS_PUBLIC_KEY || "A5G8Kh8t1jlkkx-Gy";

const CONTACT_EMAIL = "joyallall20@gmail.com";
const CONTACT_PHONE = "+91 959904130";

// TODO(Joyal): replace with your real LinkedIn link.
const SOCIAL_LINKS = {
  github: "https://github.com/joyallall20",
  linkedin: "https://linkedin.com/in/your-username",
  instagram: "https://instagram.com/joyallall",
};

const customFontStyle = { fontFamily: "Poppins, sans-serif", fontWeight: 800 };
const monoStyle = { fontFamily: "'JetBrains Mono', 'Fira Code', ui-monospace, monospace" };

// A minimal field: label on top, single bottom rule, an accent underline
// that draws in on focus instead of a boxed ring. Shakes on its own submit
// attempt if validation fails, rather than fading in like everything else.
const Field = ({
  id,
  label,
  type = "text",
  optional = false,
  registration,
  error,
  submitCount,
  as = "input",
  rows,
}) => {
  const [focused, setFocused] = useState(false);
  const Tag = as;
  const controls = useAnimation();

  // Replay the shake on each failed submit attempt without remounting the
  // field — remounting would wipe out whatever the user had already typed.
  useEffect(() => {
    if (submitCount > 0 && error) {
      controls.start({ x: [0, -8, 8, -5, 5, 0], transition: { duration: 0.4 } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitCount]);

  return (
    <motion.div animate={controls}>
      <label htmlFor={id} className="block text-sm font-medium text-black/70 mb-1.5">
        {label} {optional && <span className="text-black/35">(optional)</span>}
      </label>
      <div className="relative">
        <Tag
          id={id}
          type={as === "input" ? type : undefined}
          rows={rows}
          {...registration}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            registration.onBlur(e);
            setFocused(false);
          }}
          className={`w-full bg-transparent border-0 border-b-2 ${
            error ? "border-red-400" : "border-black/15"
          } py-2.5 text-black placeholder:text-black/30 focus:outline-none transition-colors resize-none`}
          placeholder={
            id === "user_name"
              ? "Your name"
              : id === "user_email"
              ? "you@example.com"
              : id === "phone_number"
              ? "10-digit number"
              : "Tell me about your project..."
          }
        />
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
          className="absolute left-0 bottom-0 h-[2px] w-full bg-orange-400 origin-left"
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            role="alert"
            className="text-red-500 text-sm mt-1.5 overflow-hidden"
          >
            {error.message}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Connect = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount },
  } = useForm();
  const [sent, setSent] = useState(false);

  const onSubmit = async (data) => {
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: data.user_name,
          to_name: "Joyal Lall",
          from_email: data.user_email,
          phone_number: data.phone_number || "Not provided",
          to_email: CONTACT_EMAIL,
          message: data.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      reset();
      setTimeout(() => setSent(false), 3000);
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="bg-black py-24 px-6 sm:px-10 lg:px-20">
      <Toaster position="bottom-right" toastOptions={{ duration: 4000 }} />

      <div className="max-w-6xl mx-auto">
        <p style={monoStyle} className="text-amber-50/40 text-sm mb-3">
          <h2 className="text-orange-500">Contect</h2>
        </p>
        <h2
          style={customFontStyle}
          className="text-4xl sm:text-6xl font-bold text-amber-50 mb-3"
        >
          Have a project in mind?
        </h2>
        <p className="text-2xl sm:text-3xl text-orange-300 mb-14" style={customFontStyle}>
          Let's build it.
        </p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — contact info */}
          <div className="bg-amber-50/5 border border-amber-50/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <MapPin className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <p className="text-amber-50/90">Delhi, India</p>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-amber-50/90 hover:text-amber-50 underline decoration-orange-300/50 underline-offset-4"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="w-5 h-5 text-orange-300 flex-shrink-0" />
                <a
                  href={`tel:${CONTACT_PHONE.replace(/\s+/g, "")}`}
                  className="text-amber-50/90 hover:text-amber-50 underline decoration-orange-300/50 underline-offset-4"
                >
                  {CONTACT_PHONE}
                </a>
              </div>
            </div>

            <div className="flex gap-4 mt-10">
              <motion.a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                whileHover={{ y: -3, rotate: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-amber-50/20 text-amber-50 hover:bg-amber-50 hover:text-black transition-colors"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={{ y: -3, rotate: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-amber-50/20 text-amber-50 hover:bg-amber-50 hover:text-black transition-colors"
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ y: -3, rotate: 6 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-amber-50/20 text-amber-50 hover:bg-amber-50 hover:text-black transition-colors"
              >
                <Linkedin size={20} />
              </motion.a>
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-amber-50 rounded-3xl p-8 sm:p-10 flex flex-col gap-6"
            noValidate
          >
            <Field
              id="user_name"
              label="Name"
              registration={register("user_name", {
                required: "Name is required",
                minLength: { value: 2, message: "Name must be at least 2 characters" },
              })}
              error={errors.user_name}
              submitCount={submitCount}
            />

            <Field
              id="user_email"
              label="Email"
              type="email"
              registration={register("user_email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address",
                },
              })}
              error={errors.user_email}
              submitCount={submitCount}
            />

            <Field
              id="phone_number"
              label="Phone number"
              type="tel"
              optional
              registration={register("phone_number", {
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter a valid 10-digit phone number",
                },
              })}
              error={errors.phone_number}
              submitCount={submitCount}
            />

            <Field
              id="message"
              label="Message"
              as="textarea"
              rows={4}
              registration={register("message", {
                required: "Message cannot be empty",
                minLength: { value: 10, message: "Message must be at least 10 characters long" },
              })}
              error={errors.message}
              submitCount={submitCount}
            />

            <motion.button
              type="submit"
              disabled={isSubmitting || sent}
              layout
              className={`mt-2 w-full flex items-center justify-center gap-2 font-semibold py-3 px-6 rounded-full transition-colors duration-300 ${
                sent
                  ? "bg-green-700 text-amber-50"
                  : isSubmitting
                  ? "bg-black/40 text-amber-50 cursor-not-allowed"
                  : "bg-black text-amber-50 hover:bg-black/85"
              }`}
            >
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.span
                    key="sent"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" />
                    <span>Message sent</span>
                  </motion.span>
                ) : isSubmitting ? (
                  <motion.span
                    key="sending"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>Sending...</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Send message</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Connect;