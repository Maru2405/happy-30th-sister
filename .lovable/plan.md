# Shrutika's 30th Birthday — One-Page Celebration Site

## Goal
Build a warm, festive, mobile-responsive one-page website celebrating Shrutika's 30th birthday from her younger sibling's point of view. The design should feel personal and polished, not like a generic template, with a bold "30" hero, a heartfelt letter, a photo gallery, and wishes for her 30th year.

## Design direction
- **Palette:** Deep jewel tones + confetti accents: deep plum (`#2E1A47`), coral (`#FF6B6B`), teal (`#4ECDC4`), golden yellow (`#FFE66D`), with a soft cream background for readability.
- **Tone:** A mix of elegant and heartfelt with playful, celebratory moments.
- **Typography:** A refined serif or display font for headings and a clean sans-serif for body copy, loaded via Google Fonts `<link>` in the root route.
- **Motion:** Subtle confetti burst on load/hero, gentle fade/slide-in reveals for sections, and a hover lift on gallery cards.

## Sections to build
1. **Hero**
   - Large bold "30" as the visual centerpiece.
   - Headline: "Happy 30th Birthday, Shrutika" (name easy to swap).
   - Short subline from the younger sibling.
   - Confetti animation on load.
2. **Heartfelt Letter**
   - Block of copy written from the youngest sibling's perspective.
   - Placeholder lines for real memories, guidance, protection, and admiration.
   - Styled as a warm, readable letter block.
3. **Photo Gallery**
   - 4 image placeholders in a responsive grid.
   - Each placeholder clearly labeled so the user can drop in real photos later.
   - Subtle hover/focus states.
4. **Wishes for Her 30th Year**
   - Short bulleted or card list of editable wishes.
   - Easy to personalize.
5. **Footer / Closing**
   - A warm sign-off (e.g., "With love, your youngest sibling").

## Personalization strategy
- Keep all names, memories, and wishes as clearly labeled constants/strings at the top of the page component so the user can edit them in one place.
- Use placeholder alt text and comments indicating where real photos should replace generated/placeholder images.

## Technical approach
- Replace `src/routes/index.tsx` with the full one-page layout.
- Add custom color tokens to `src/styles.css` using `oklch` equivalents of the chosen palette.
- Load chosen fonts in `src/routes/__root.tsx` via `<link>`.
- Implement confetti with a lightweight canvas or CSS animation; avoid heavy libraries if possible.
- Ensure responsive stacking on mobile and comfortable reading widths on desktop.
- Update the route `head()` with a unique title, description, and Open Graph metadata for the page.

## Deliverable
A single, self-contained landing page at `/` that the user can immediately preview, personalize, and share.