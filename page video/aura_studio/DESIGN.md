# Portfolio Design System: High-End Creative Editorial

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Nocturnal Gallery."** 

Unlike generic portfolio templates that rely on stark white backgrounds and rigid grids, this system treats the digital canvas as a premium physical space—a dimly lit, high-end gallery where the work is illuminated by soft, ambient glows. It moves away from the "webby" feel by utilizing intentional asymmetry, overlapping layers, and extreme typographic contrast. The goal is to convey authority and creative depth through a sophisticated interplay of deep purples, blues, and glassmorphism.

## 2. Colors: The Deep Spectrum
The palette is built on a foundation of deep, ink-like tones to provide a sense of luxury and focus.

### Core Palette
- **Background (`#060e20`)**: The "dark room" foundation. A very deep midnight blue that feels more expensive than pure black.
- **Primary (`#a3a6ff`)**: A luminous periwinkle used for key brand moments and active states.
- **Secondary (`#c180ff`)**: A royal violet for highlighting creative flair.
- **Tertiary (`#699cff`)**: A bright azure for interactive call-outs.
- **Surface Container Highest (`#192540`)**: Used for the most prominent card elements.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections. Layout boundaries must be achieved through background color shifts. For example, a section using `surface_container_low` should transition directly into a `background` section. The change in tonal value provides a sophisticated "seam" rather than a harsh line.

### Surface Hierarchy & Nesting
Treat the UI as stacked sheets of fine glass.
- Use `surface_container_lowest` (`#000000`) for the deep base.
- Use `surface_container` (`#0f1930`) for primary content blocks.
- Use `surface_container_highest` (`#192540`) for nested elements (like chips inside a card) to create a "pop" of depth.

### The "Glass & Gradient" Rule
To escape the flat-UI aesthetic, use `surface_bright` with a backdrop-blur of `20px` to create glass effects. Main CTAs should not be flat; use a linear gradient from `primary` to `primary_container` at a 45-degree angle to give the element "soul" and a tactile, glowing quality.

## 3. Typography: Editorial Authority
The typography system uses a pairing of **Manrope** for high-impact display and **Inter** for precision and readability.

- **Display-LG (Manrope, 3.5rem)**: Reserved for hero headers. Use generous letter-spacing (-0.02em) to feel cinematic.
- **Headline-MD (Manrope, 1.75rem)**: Used for section headings. Combine with `primary` color for emphasis on key words.
- **Title-LG (Inter, 1.375rem)**: Used for project titles. It provides a clean, technical counterpoint to the display headers.
- **Body-MD (Inter, 0.875rem)**: The workhorse. Use `on_surface_variant` (`#a3aac4`) to reduce eye strain and create a hierarchy between headers and content.

## 4. Elevation & Depth
In this design system, depth is a function of light and translucency, not shadow alone.

- **The Layering Principle:** Place a project card using `surface_container_highest` over a section of `surface_container`. The slight shift in blue-purple saturation creates a soft, natural lift.
- **Ambient Shadows:** For "floating" elements (like a navigation bar or modal), use a shadow with a blur of `40px`, an offset of `y: 10`, and an opacity of `8%`. The shadow color must be a dark indigo—never a neutral grey.
- **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` token at `15%` opacity. This creates a "glint" on the edge of the glass rather than a structural cage.
- **Glassmorphism:** Apply to navigation headers and project tags. Use `surface` at 60% opacity with a heavy blur. This allows background imagery to bleed through, making the UI feel integrated into the portfolio's content.

## 5. Components

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `full` roundedness, and a subtle outer glow using the primary color at 20% opacity.
- **Secondary:** Transparent background with a `Ghost Border` (`outline_variant` @ 20%). On hover, the background fills to `surface_bright`.

### Cards & Projects
**No divider lines allowed.** Separate content within cards using vertical whitespace (e.g., `1.5rem` between title and description).
- **Project Cards:** Use `xl` (1.5rem) corner radius. Use a subtle `primary_dim` gradient overlay on the bottom 30% of project images to ensure text legibility.

### Chips & Tags
- **Selection Chips:** Use `secondary_container` with `on_secondary_container` text. These should feel like small jewels on the dark background.
- **Filter Chips:** Use `surface_container_highest` with `full` roundedness.

### Inputs & Fields
- **Text Fields:** Use `surface_container_low` with a 2px bottom-only border in `outline_variant`. On focus, the bottom border animates to the `primary` color with a soft glow.

## 6. Do's and Don'ts

### Do:
- **Do** use negative space aggressively. Let the work breathe.
- **Do** overlap elements. Place a project tag (`chip`) so it partially overlaps the project image and the card background to create a 3D effect.
- **Do** use "Off-White" (`on_surface`) for text. Pure white (`#FFFFFF`) is too harsh against the deep navy background.

### Don't:
- **Don't** use 1px solid borders to separate the "Header" from the "Hero." Use a backdrop-blur instead.
- **Don't** use standard "Drop Shadows." They look muddy on dark themes. Use tonal layering.
- **Don't** cram content. If a section feels crowded, increase the vertical padding by 20%.
- **Don't** use high-contrast grey for body text. It breaks the "Nocturnal Gallery" immersion. Stick to the `on_surface_variant` palette.