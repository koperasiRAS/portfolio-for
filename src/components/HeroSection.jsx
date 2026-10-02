import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
} from "framer-motion";

const coverHero = "/foto/fotografi/fotografi mobil.jpg";

const heroEase = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: heroEase },
  },
};

const TitleLines = () => (
  <motion.div className="hero-title-stack" variants={container} initial="hidden" animate="show">
    <motion.span variants={item} className="hero-title-line hero-title-line-1">FRAME</motion.span>
    <motion.span variants={item} className="hero-title-line hero-title-line-2">OF</motion.span>
    <div className="hero-title-line-row">
      <motion.span variants={item} className="hero-title-line hero-title-line-3">RANGGA.</motion.span>
      <motion.span variants={item} className="hero-loc-badge">IDN // 06.2° S</motion.span>
    </div>
  </motion.div>
);

export default function HeroSection() {
  const sectionRef = useRef(null);

  // Mouse glow
  const glowX = useSpring(useMotionValue(50), { stiffness: 120, damping: 18 });
  const glowY = useSpring(useMotionValue(50), { stiffness: 120, damping: 18 });
  const glowBg = useMotionTemplate`radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(37, 99, 235, 0.10), transparent 55%)`;

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.4, 1], [1, 1, 0]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  function onHeroMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    glowX.set((cx / r.width) * 100);
    glowY.set((cy / r.height) * 100);
  }

  function onHeroMouseLeave() {
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      ref={sectionRef}
      className="hero-wrap"
      id="hero"
      onMouseMove={onHeroMouseMove}
      onMouseLeave={onHeroMouseLeave}
    >
      {/* Background image — full bleed cinematic */}
      <motion.img
        className="hero-bg"
        src={coverHero}
        alt="Cinematic hero background"
        loading="eager"
        fetchPriority="high"
        style={{ scale: bgScale }}
        aria-hidden="true"
      />
      <div className="hero-bg-gradient-v" aria-hidden="true" />
      <div className="hero-bg-gradient-h" aria-hidden="true" />

      {/* Mouse glow overlay */}
      <motion.div
        className="hero-glow"
        style={{ background: glowBg }}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: heroEase }}
      />

      {/* Main content */}
      <motion.div
        className="hero-inner"
        style={{ y: contentY, opacity: contentOpacity }}
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* Top identity line */}
        <motion.div className="hero-top-line" variants={item}>
          <span className="hero-practice-badge">
            <span className="hero-practice-dot" aria-hidden="true" />
            A creative visual practice based in Indonesia
          </span>
          <span className="hero-archival">ARCHIVAL FOLIO 2020 — 2026</span>
        </motion.div>

        {/* Center — monumental title + description */}
        <div className="hero-center-block">
          <h1 className="hero-title">
            <TitleLines />
          </h1>

          <motion.p className="hero-desc" variants={item}>
            Photography, film direction, visual identity &amp; digital experiences crafted with editorial quietude and technical discipline.
          </motion.p>
        </div>

        {/* Bottom CTA row */}
        <motion.div className="hero-bottom-row" variants={item}>
          <div className="hero-cta-row">
            <a href="#categories" className="hero-btn-glass">
              <span>Explore Work</span>
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </a>
            <a href="#about" className="hero-btn-outline">
              Monograph
            </a>
          </div>
          <a href="#about" className="hero-scroll-hint" aria-label="Scroll to explore">
            <span className="hero-scroll-label">SCROLL</span>
            <i className="fas fa-chevron-down" aria-hidden="true" />
          </a>
        </motion.div>
      </motion.div>

      {/* Dot nav — right side */}
      <div className="hero-dot-nav" aria-label="Section navigation">
        <a href="#hero" className="hero-dot active" aria-label="Home" />
        <a href="#projects" className="hero-dot" aria-label="Projects" />
        <a href="#about" className="hero-dot" aria-label="About" />
        <a href="#contact" className="hero-dot" aria-label="Contact" />
      </div>
    </motion.div>
  );
}
