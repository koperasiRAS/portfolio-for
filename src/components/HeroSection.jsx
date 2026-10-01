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
import thumbWedding from "../assets/thumbnails/thumbnail_wedding.png";
import thumbVideo from "../assets/thumbnails/thumbnail-video.png";
import thumbDesign from "../assets/thumbnails/thumbnail-design.png";

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

// Floating work cards enter staggered.
const cardItem = {
  hidden: { opacity: 0, y: 40, rotate: 0 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    rotate: i === 0 ? -6 : i === 1 ? 4 : -3,
    transition: { duration: 0.9, ease: heroEase, delay: 0.55 + i * 0.12 },
  }),
};

// Idle float for the work cards (runs in parallel with the staggered reveal).
// The first keyframe of each property is the rest state; the `delay` on each
// keyframe is absolute from the start of the animation, so the reveal
// (0.55s + i*0.12) and the float (first keyframe at rest state) can run
// simultaneously without conflicting.
const CARD_ROT = [ -6, 4, -3 ];
const cardFloat = (i, depth) => ({
  opacity: [0, 0, 1, 1],
  y: [40, 0, -10 * depth, 0],
  rotate: [0, 0, CARD_ROT[i], CARD_ROT[i]],
  transition: {
    delay: 0.55 + i * 0.12,
    duration: [0.9, 0.9, 4 + depth, 4 + depth],
    repeat: [0, 0, Infinity, Infinity],
    ease: heroEase,
  },
});

const TitleWords = () => (
  <motion.div variants={wordContainer} initial="hidden" animate="show" className="stitch-hero-title-wrap">
    <motion.span variants={wordItem} className="stitch-hero-title-word">Frame</motion.span>
    <motion.span variants={wordItem} className="stitch-hero-title-word">of</motion.span>
    <motion.span variants={wordItem} className="stitch-hero-title-word stitch-hero-title-accent">
      Rangga
    </motion.span>
  </motion.div>
);

export default function HeroSection() {
  const sectionRef = useRef(null);

  // 3D tilt from mouse.
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 50, damping: 20, mass: 0.5 });
  const springY = useSpring(rotateY, { stiffness: 50, damping: 20, mass: 0.5 });

  // Glow follows mouse (spring for lag).
  const glowX = useSpring(useMotionValue(50), { stiffness: 120, damping: 18 });
  const glowY = useSpring(useMotionValue(50), { stiffness: 120, damping: 18 });
  const glowBg = useMotionTemplate`radial-gradient(600px circle at ${glowX}% ${glowY}%, rgba(36, 56, 240, 0.10), transparent 55%)`;

  // Scroll parallax.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "70%"]);
  const cardsScale = useTransform(scrollYProgress, [0, 0.4, 1], [1, 0.94, 0.82]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0.25]);

  function onHeroMouseMove(e) {
    const r = e.currentTarget.getBoundingClientRect();
    const cx = e.clientX - r.left;
    const cy = e.clientY - r.top;
    const nx = cx / r.width - 0.5;
    const ny = cy / r.height - 0.5;
    rotateY.set(nx * 10);
    rotateX.set(-ny * 10);
    glowX.set((cx / r.width) * 100);
    glowY.set((cy / r.height) * 100);
  }

  function onHeroMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
    glowX.set(50);
    glowY.set(50);
  }

  return (
    <motion.div
      ref={sectionRef}
      className="stitch-hero"
      id="hero"
      initial="hidden"
      animate="show"
      variants={container}
      onMouseMove={onHeroMouseMove}
      onMouseLeave={onHeroMouseLeave}
    >
      <motion.div
        className="stitch-hero-glow-r"
        style={{ background: glowBg }}
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

      {/* Cinematic parallax background */}
      <motion.div className="stitch-hero-bg" aria-hidden="true" style={{ y: bgY }}>
        <motion.img
          src={imgAsset1}
          alt=""
          className="stitch-hero-bg-img"
          loading="eager"
          fetchPriority="high"
          animate={kenBurns}
        />
        <div className="stitch-hero-bg-overlay" />
        <div className="stitch-hero-grain" />
      </motion.div>

      {/* 3D tilted floating work stack */}
      <motion.div
        className="stitch-hero-workstack"
        style={{ y: cardsY, scale: cardsScale, rotateX: springX, rotateY: springY }}
        aria-hidden="true"
      >
        <motion.div
          className="stitch-hero-workcard is-back"
          initial={cardItem.hidden}
          animate={cardFloat(0, 1.6)}
        >
          <img src={thumbDesign} alt="" loading="lazy" />
          <span className="stitch-hero-workcard-label">Brand Design</span>
        </motion.div>
        <motion.div
          className="stitch-hero-workcard is-mid"
          initial={cardItem.hidden}
          animate={cardFloat(1, 1.2)}
        >
          <img src={thumbVideo} alt="" loading="lazy" />
          <span className="stitch-hero-workcard-label">Videography</span>
        </motion.div>
        <motion.div
          className="stitch-hero-workcard is-front"
          initial={cardItem.hidden}
          animate={cardFloat(2, 0.8)}
        >
          <img src={thumbWedding} alt="" loading="lazy" />
          <span className="stitch-hero-workcard-label">Wedding</span>
        </motion.div>
      </motion.div>

      <motion.div className="stitch-hero-content-root" style={{ y: contentY, opacity: contentOpacity }}>
        <motion.span className="stitch-badge" variants={contentItem}>
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

          <motion.p className="stitch-hero-desc" variants={contentItem}>
            Crafting visual narratives through the lens of cinematic precision and
            editorial depth. Creative Direction for the digital age.
          </motion.p>
        </motion.div>

        {/* CTA cluster */}
        <motion.div className="stitch-hero-cta" variants={contentItem}>
          <a href="#contact" className="stitch-hero-cta-primary">
            Mulai Project
          </a>
          <a href="#categories" className="stitch-hero-cta-ghost">
            Lihat Karya
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
