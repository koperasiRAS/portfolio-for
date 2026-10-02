import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useMotionTemplate,
} from "framer-motion";

import imgAsset1 from "../assets/design/social/carousels 1.png";
import thumbDesign from "../assets/thumbnails/thumbnail-design.png";
import thumbVideo from "../assets/thumbnails/thumbnail-video.png";
import thumbWedding from "../assets/thumbnails/thumbnail_wedding.png";
import thumbWeb from "../assets/thumbnails/web1.png";
import thumbWedding2 from "../assets/thumbnails/thumbnail_wedding.png";
import thumbEvent from "../assets/thumbnails/event-seminar.png";

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

const gridStagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.5 },
  },
};

const gridItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: heroEase },
  },
};

const kenBurns = {
  scale: [1, 1.04, 1],
  transition: { duration: 16, ease: "easeInOut", repeat: Infinity },
};

const TitleWords = () => (
  <motion.div className="hero-title-wrap" variants={container} initial="hidden" animate="show">
    <motion.span variants={item} className="hero-title-word">Frame</motion.span>
    <motion.span variants={item} className="hero-title-word hero-title-accent">of Rangga</motion.span>
  </motion.div>
);

export default function HeroSection() {
  const sectionRef = useRef(null);

  // 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 50, damping: 20, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 50, damping: 20, mass: 0.5 });

  // Glow follows mouse
  const glowX = useSpring(useMotionValue(50), { stiffness: 120, damping: 18 });
  const glowY = useSpring(useMotionValue(50), { stiffness: 120, damping: 18 });
  const glowBg = useMotionTemplate`radial-gradient(700px circle at ${glowX}% ${glowY}%, rgba(36, 56, 240, 0.08), transparent 55%)`;

  // Scroll parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.2]);
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

  function onHeroMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    const nx = cx / r.width - 0.5;
    const ny = cy / r.height - 0.5;
    rotateY.set(nx * 8);
    rotateX.set(-ny * 8);
    glowX.set((cx / r.width) * 100);
    glowY.set((cy / r.height) * 100);
  }

  function onHeroMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  const gridWorks = [
    { src: thumbDesign, alt: "Design work" },
    { src: thumbVideo, alt: "Video work" },
    { src: thumbWedding, alt: "Wedding photography" },
    { src: thumbWeb, alt: "Web project" },
    { src: thumbEvent, alt: "Event seminar" },
    { src: thumbWedding2, alt: "Wedding photo" },
  ];

  return (
    <motion.div
      ref={sectionRef}
      className="hero-wrap"
      id="hero"
      onMouseMove={onHeroMouseMove}
      onMouseLeave={onHeroMouseLeave}
    >
      {/* Mouse glow */}
      <motion.div
        className="hero-glow"
        style={{ background: glowBg }}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: heroEase }}
      />

      {/* Main container */}
      <motion.div
        className="hero-inner"
        style={{ y: contentY, opacity: contentOpacity }}
        initial="hidden"
        animate="show"
        variants={container}
      >
        {/* ===== TEXT ROW (top) ===== */}
        <motion.div className="hero-text-row" variants={container}>
          {/* Left: title + subtitle */}
          <div className="hero-text-left">
            <motion.span className="hero-eyebrow" variants={item}>
              <i className="fas fa-user" aria-hidden="true" />
              Frame Of Rangga
            </motion.span>

            <h1 className="hero-title">
              <TitleWords />
            </h1>

            <motion.div className="hero-rule" variants={item} aria-hidden="true" />

            <motion.p className="hero-desc" variants={item}>
              A creative studio crafting visual stories through photography,
              videography, brand design, and web experiences.
            </motion.p>

            <motion.div className="hero-cta-row" variants={item}>
              <a href="#contact" className="hero-btn-primary">
                <span>Explore</span>
                <i className="fas fa-arrow-right" aria-hidden="true" />
              </a>
              <a href="#projects" className="hero-btn-pill">
                Open Studio
              </a>
            </motion.div>
          </div>

          {/* Right: main photo montage */}
          <motion.div
            className="hero-media"
            style={{ rotateX: springX, rotateY: springY }}
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, ease: heroEase, delay: 0.3 }}
          >
            <div className="hero-media-frame">
              <motion.img
                src={imgAsset1}
                alt="Frame of Rangga creative work"
                className="hero-media-img"
                loading="eager"
                fetchPriority="high"
                animate={kenBurns}
              />
              <div className="hero-media-overlay" />
              <div className="hero-media-grain" />
            </div>
          </motion.div>
        </motion.div>

        {/* ===== WORK GRID ROW (bottom) ===== */}
        <motion.div
          className="hero-grid-row"
          variants={gridStagger}
          initial="hidden"
          animate="show"
          style={{ y: gridY }}
        >
          {gridWorks.map((w, i) => (
            <motion.a
              key={i}
              href="#projects"
              className="hero-grid-card"
              variants={gridItem}
              initial="hidden"
              animate="show"
            >
              <img src={w.src} alt={w.alt} loading="lazy" />
              <span className="hero-grid-label">{w.alt}</span>
            </motion.a>
          ))}
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
