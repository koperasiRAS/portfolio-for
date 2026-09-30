---
name: ux-ui-design-standards
description: Comprehensive UI/UX design intelligence, design tokens, WCAG accessibility, and responsive layout guidelines.
---

# 🎨 UX/UI DESIGN INTELLIGENCE & DESIGN SYSTEM STANDARDS

> Sumber Inspirasi: `plugin87/ux-ui-agent-skills`

## 1. Design Token Architecture
Setiap desain antarmuka modern harus memiliki hirarki token yang konsisten:
- **Color Tokens**:
  - `Surface Base`: Background layer utama (`#070A0F`).
  - `Surface Elevated`: Kartu, modal, dan popover (`#0E131F`).
  - `Primary Brand Accent`: Aksen fokus interaktif (`#F59E0B`).
  - `Text Hierarchy`: Primary (`#F8FAFC`), Secondary (`#CBD5E1`), Muted (`#94A3B8`).
- **Typography Scales**:
  - Display (32px - 56px, bold, tight letter-spacing).
  - Heading (20px - 28px).
  - Body Text (14px - 16px, 1.6 line-height untuk kenyamanan membaca).
  - Monospace (Metadata, code, EXIF data).

## 2. Accessibility (WCAG 2.1 AA) Directives
- **Contrast Ratio**: Minimal $4.5:1$ untuk teks normal dan $3:1$ untuk teks besar.
- **Focus States**: Setiap elemen interaktif (`button`, `a`, `input`) wajib memiliki `focus-visible` outline yang jelas.
- **Touch Targets**: Ukuran area klik minimal $44 \times 44\text{px}$ pada perangkat mobile.
