---
name: anti-slop-ui-ux
description: Enforces high-tier, bespoke modern web & application UI/UX design, eliminating generic AI templates and slop aesthetics.
---

# Anti-Slop UI/UX & Design Engineering Skill

Activate this skill whenever designing or coding user interfaces, web applications, landing pages, dashboards, or mobile layouts.

## Aesthetics & Anti-Slop Rules

### 1. Reject Generic AI Tropes
- ❌ **NEVER DO**:
  - Cliché generic purple-to-blue gradient backgrounds everywhere.
  - Raw unstyled Tailwind default colors (`bg-blue-500`, `text-red-500`).
  - Empty gray wireframe boxes with placeholders.
  - Standard boring Bootstrap/Material card layouts without depth or texture.
- ✅ **DO**:
  - Curated, bespoke color systems (e.g. sleek deep charcoal dark modes `#0B0F17`, subtle slate `#1E293B`, vibrant tailored accents).
  - High-end typography (Inter, Outfit, Plus Jakarta Sans, Syne, Cabinet Grotesk).
  - Layered glassmorphism with subtle borders (`rgba(255,255,255,0.08)`), glow effects, and depth shadows.
  - Fluid micro-interactions: Smooth hover states, transition curves (`cubic-bezier(0.16, 1, 0.3, 1)`), active spring physics.

### 2. Design Tokens Checklist
Every frontend component must utilize a structured token hierarchy:
1. `Surface / Background`: Base layer, Card surface, Floating modal surface.
2. `Border & Separation`: Subtle hair-line borders, contrast dividers.
3. `Typography Hierarchy`: Display Hero $\to$ H1 $\to$ H2 $\to$ Body $\to$ Caption / Monospace Meta.
4. `Interactive States`: Default $\to$ Hover $\to$ Focus-Visible $\to$ Active $\to$ Disabled.
