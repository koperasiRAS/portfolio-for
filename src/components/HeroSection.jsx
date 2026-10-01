import React from "react";
import { motion } from "framer-motion";
import imgAsset1 from "../assets/design/social/carousels 1.png";

const heroEase = [0.16, 1, 0.3, 1];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const contentItem = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: heroEase },
  },
};

// Word-by-word reveal for the headline.
const wordContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.25 },
  },
};

const wordItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: heroEase },
  },
};

// Subtle Ken-Burns breathing on the background image.
const kenBurns = {
  scale: [1, 1.06, 1],
  transition: { duration: 18, ease: "easeInOut", repeat: Infinity },
};

const lineReveal = {
  hidden: { scaleX: 0, originX: 0 },
  show: {
    scaleX: 1,
    originX: 0,
    transition: { duration: 1.1, ease: heroEase, delay: 0.6 },
  },
};

const TitleWords = () => (
  <motion.div variants={wordContainer} initial="hidden" animate="show" className="stitch-hero-title-wrap">
    <motion.span className="stitch-hero-title-word">Frame</motion.span>
    <motion.span className="stitch-hero-title-word">of</motion.span>
    <motion.span className="stitch-hero-title-word stitch-hero-title-accent">
      Rangga
    </motion.span>
  </motion.div>
);

export default function HeroSection() {
  return (
    <motion.div
      className="stitch-hero"
      id="hero"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.div
        className="stitch-hero-glow-r"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: heroEase }}
      />
      <motion.div
        className="stitch-hero-glow-l"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, ease: heroEase, delay: 0.2 }}
      />

      {/* Cinematic background */}
      <div className="stitch-hero-bg" aria-hidden="true">
        <motion.img
          src={imgAsset1.src}
          alt=""
          className="stitch-hero-bg-img"
          loading="eager"
          fetchPriority="high"
          animate={kenBurns}
        />
        <div className="stitch-hero-bg-overlay" />
        <div className="stitch-hero-grain" />
      </div>

      <div className="stitch-hero-content-root">
        <motion.span
          className="stitch-badge"
          variants={contentItem}
        >
          Visual Storyteller
        </motion.span>

        <motion.div className="stitch-hero-content" variants={contentItem}>
          <h1 className="stitch-hero-title">
            <TitleWords />
          </h1>

          <motion.div
            className="stitch-hero-rule"
            variants={lineReveal}
            aria-hidden="true"
          />

          <motion.p
            className="stitch-hero-desc"
            variants={contentItem}
          >
            Crafting visual narratives through the lens of cinematic precision and
            editorial depth. Creative Direction for the digital age.
          </motion.p>
        </motion.div>

        {/* CTA cluster */}
        <motion.div
          className="stitch-hero-cta"
          variants={contentItem}
        >
          <a
            href="#contact"
            className="stitch-hero-cta-primary"
          >
            Mulai Project
          </a>
          <a href="#categories" className="stitch-hero-cta-ghost">
            Lihat Karya
          </a>
        </motion.div>
      </div>
    </motion.div>
  );
}
