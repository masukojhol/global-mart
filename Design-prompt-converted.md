# GoFresh × GlobalMart — Master Design System Prompt

**Purpose:** Drop this entire prompt into any AI conversation to generate pixel-consistent grocery e-commerce UI — web, mobile, or component-level. Every color, radius, shadow, and font weight is locked so outputs never drift.

---

## 0 · DESIGN PHILOSOPHY

Photography carries ALL visual richness. The UI framework is a clean, warm, nature-toned canvas so food imagery pops as the hero. Every surface is light, every interaction feels fresh and effortless. Think: premium farmer's market meets modern app — not luxury fashion, not discount warehouse.

### Core Tenets:
- Fresh over formal — warmth beats austerity
- Photography-first — UI recedes, product images lead
- Subtle depth — light shadows and borders, never flat or heavy
- Friendly confidence — medium-weight type, not whisper-light or bold-aggressive
- Green = trust, freshness, organic quality

---

## 1 · COLOR TOKENS

### 1.1 Primary Palette

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `--color-primary` | `#2D6A4F` | 45, 106, 79 | Brand anchor. Buttons, links, active states, nav highlights |
| `--color-primary-light` | `#40916C` | 64, 145, 108 | Hover states, secondary badges, progress bars |
| `--color-primary-dark` | `#1B4332` | 27, 67, 50 | Hero headlines, footer background, high-emphasis text |

### 1.2 Accent & Signal Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-accent` | `#FF6B35` | Primary CTA ("Buy Now"), cart badge count, attention magnets |
| `--color-accent-light` | `#FF8C5A` | Accent hover state only |
| `--color-sale` | `#E63946` | Sale badges, discount percentages, flash-sale timers, strikethrough prices |
| `--color-star` | `#F59E0B` | Star ratings ONLY — never for badges, buttons, or text |
| `--color-loyalty` | `#D4A847` | Loyalty/membership tier badge, rewards points display |

### 1.3 Neutrals & Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-bg` | `#FFFFFF` | Main canvas, modals, dropdowns |
| `--color-bg-soft` | `#F5F7F4` | Card fills, section backgrounds, input fields at rest, category chip bg |
| `--color-bg-card` | `#FFFFFF` | Product cards, cart summary, overlay panels |
| `--color-text` | `#1A1A2E` | Headlines, product names, prices, primary body text |
| `--color-text-secondary` | `#6B7280` | Descriptions, weights, meta info, inactive nav items |
| `--color-text-muted` | `#9CA3AF` | Placeholders, timestamps, helper text, disabled labels |
| `--color-border` | `#E8ECE6` | Card borders, dividers, input borders at rest, table rules |
| `--color-border-focus` | `#2D6A4F` | Input focus rings, active card outlines (= primary) |

### 1.4 Color Rules

- **NO other colors.** Every pixel must trace back to the tokens above.
- Gradients are allowed ONLY on promo banners: `linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)`.
- Text on `--color-primary` or `--color-primary-dark` background is always `#FFFFFF`.
- Text on `--color-accent` background is always `#FFFFFF`.
- Never use `--color-sale` for non-discount UI. It is reserved for price urgency.
- `--color-star` (`#F59E0B`) is exclusively for star rating fills. No other use.
- Background overlays on hero images: `rgba(27, 67, 50, 0.55)` (primary-dark at 55%).

---

## 2 · TYPOGRAPHY

### 2.1 Font Stack

| Role | Family | Fallbacks | Weight(s) | Usage |
|------|--------|-----------|-----------|-------|
| Heading | `Inter` | 'SF Pro Display', system-ui, -apple-system, sans-serif | 600, 700 | All headings H1–H6, product names, nav items, section titles |
| Body | `Inter` | 'SF Pro Text', system-ui, -apple-system, sans-serif | 400, 500 | Descriptions, paragraphs, labels, form inputs, badge text |
| Mono | `JetBrains Mono` | 'SF Mono', 'Fira Code', monospace | 500, 600 | Prices, countdown timers, promo codes, cart totals, order numbers |

### 2.2 Type Scale

| Element | Size | Weight | Line-Height | Letter-Spacing | Color Token |
|---------|------|--------|-------------|----------------|-------------|
| Hero Display | 32px | 700 | 1.15 | -0.01em | `--color-primary-dark` |
| Page Title (H1) | 24px | 700 | 1.25 | -0.005em | `--color-text` |
| Section Heading (H2) | 20px | 600 | 1.3 | 0 | `--color-text` |
| Card Title | 14px | 600 | 1.3 | 0 | `--color-text` |
| Body | 14px | 400 | 1.5 | 0 | `--color-text` |
| Body Small | 13px | 400 | 1.5 | 0 | `--color-text-secondary` |
| Caption / Meta | 12px | 400 | 1.4 | 0 | `--color-text-secondary` |
| Micro Label | 11px | 500–600 | 1.2 | 0.02em | varies |
| Badge Text | 11px | 600 | 1.2 | 0.02em | `#FFFFFF` on colored bg |
| Price (large) | 16–20px | 700 | 1 | 0 | `--color-text` (mono) |
| Price (strikethrough) | 12–14px | 400 | 1 | 0 | `--color-text-muted` + line-through (mono) |
| Section Label / Overline | 13px | 600 | 1.2 | 0.08em | `--color-text-secondary` + uppercase |

### 2.3 Typography Rules

- **Sentence-case everywhere** — navigation, buttons, headings, labels. UPPERCASE is reserved ONLY for overline section labels (e.g., "WEEKEND SPECIAL") and badge text.
- No italic anywhere in UI chrome. Italic is allowed only inside user-generated content or editorial body copy.
- Price display always uses `JetBrains Mono` — never Inter.
- Maximum line length for body text: 65 characters.
- Heading font weight is 600 minimum — never use 300 or 400 for headings.

---

## 3 · SPACING & LAYOUT

### 3.1 Spacing Scale (4px base)

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | 4px | Inline icon gaps, tight pairs |
| `--space-2` | 8px | Badge internal padding, chip gaps, tight stacks |
| `--space-3` | 12px | Card internal padding (compact), button vertical padding |
| `--space-4` | 16px | Card padding standard, section gaps, grid gutters |
| `--space-5` | 20px | Major section padding, nav horizontal padding |
| `--space-6` | 24px | Banner padding, hero section internal |
| `--space-8` | 32px | Page-level section separation |
| `--space-10` | 40px | Hero vertical padding |
| `--space-12` | 48px | Major section breaks, footer top padding |

### 3.2 Grid

- Product grid: CSS Grid, `repeat(auto-fill, minmax(165px, 1fr))`, gap `16px`.
- Mobile: 2-column grid minimum. Never 1-column for product cards.
- Max content width: `1200px` centered. Padding: `20px` on mobile, `28px` on tablet+.
- Category chip row: horizontal scroll with `16px` gap, `20px` side padding.

---

## 4 · BORDER RADIUS

| Token | Value | Usage |
|-------|-------|-------|
| `--radius` | 4px | **DEFAULT for everything:** buttons, cards, inputs, badges, images, modals, dropdowns, banners, timer blocks |
| `--radius-pill` | 20px | Category filter chips, tags, toggle pills ONLY |
| `--radius-circle` | 50% | Avatar circles, cart count badge, notification dots |

### Radius Rules

- **4px is the universal default.** When in doubt, use 4px.
- Never use 0px (too sharp), 8px, 12px, or 16px. Only 4px, 20px, or 50%.
- Product images inside cards inherit the card's 4px (clip with `overflow: hidden`).
- Full-bleed hero images have NO radius (they touch viewport edges).

---

## 5 · SHADOWS & ELEVATION

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)` | Cards at rest (optional — can also use border-only), dropdowns |
| `--shadow-md` | `0 4px 12px rgba(45,106,79,0.12)` | Card hover state, floating action buttons, popovers |
| `--shadow-lg` | `0 8px 24px rgba(45,106,79,0.15)` | Modals, full-screen overlays, sticky cart bar |
| `--shadow-none` | `none` | Flat buttons, inline elements, nav bar |

### Shadow Rules

- Cards default to `border: 1px solid --color-border` with NO resting shadow OR `--shadow-sm`. Choose one per project and stay consistent.
- On hover, cards transition to `--shadow-md` over `200ms ease`.
- Shadows use the green-tinted RGBA (`rgba(45,106,79,...)`) — NOT pure black. This keeps shadows warm.
- Nav bars and sticky headers use `--shadow-sm` when scrolled, `--shadow-none` at top.

---

## 6 · COMPONENT SPECIFICATIONS

### 6.1 Buttons

| Variant | Background | Text Color | Border | Radius | Padding | Font |
|---------|------------|------------|--------|--------|---------|------|
| Primary | `--color-primary` | `#FFFFFF` | none | 4px | `10px 24px` | Inter 600, 14px |
| CTA / Accent | `--color-accent` | `#FFFFFF` | none | 4px | `10px 24px` | Inter 600, 14px |
| Outline | transparent | `--color-primary` | `1.5px solid --color-primary` | 4px | `10px 24px` | Inter 600, 14px |
| Sale / Urgency | `--color-sale` | `#FFFFFF` | none | 4px | `10px 24px` | Inter 600, 14px |
| Ghost / Tertiary | `--color-bg-soft` | `--color-text-secondary` | `1px solid --color-border` | 4px | `8px 16px` | Inter 500, 13px |
| Icon (add to cart) | `--color-primary` | `#FFFFFF` | none | 4px | — | 18px `+` centered |
| Disabled | `#E5E7EB` | `#9CA3AF` | none | 4px | same as variant | Inter 500 |

**Button Rules:**
- Hover: darken background 8% OR shift to `-light` variant. Transition `150ms ease`.
- Active/pressed: darken 12%.
- Min touch target: `44px` height on mobile.
- Full-width buttons in modals and cart drawers: `width: 100%`, `padding: 14px`.
- Button text is always sentence-case. Never UPPERCASE on buttons.

### 6.2 Product Card

```
┌─────────────────────────┐  border: 1px solid #E8ECE6
│ [Badge]        ┌──────┐ │  border-radius: 4px
│                │ IMG  │ │  image area: bg #F5F7F4, height 130–160px
│                └──────┘ │
│ 200g each               │  caption: 12px, #9CA3AF
│ Organic Avocado         │  title: 14px/600, #1A1A2E
│                         │
│ $3.49  $4.99   [+ btn]  │  price: mono 16px/700, old: mono 12px + line-through
└─────────────────────────┘
```

- Card width: `165–180px` in grid, fluid.
- Image area background: `--color-bg-soft` (acts as placeholder tone).
- Badge: positioned `top: 8px; left: 8px`, colored per type (Organic=primary, Sale=sale, New=accent, Bestseller=loyalty).
- Quantity stepper replaces `+` button after first tap: `[−] 1 [+]` inline, bordered in `--color-primary`.
- Hover: transition to `--shadow-md` over `200ms`.

### 6.3 Category Chips

- Container: `56×56px` square, `border-radius: 4px`.
- Default: `bg: --color-bg-soft`, `border: 1px solid --color-border`.
- Active: `bg: --color-primary`, no border, icon inverts/stays emoji.
- Label below: `11px`, weight 500 (default) / 600 (active), `--color-text-secondary` / `--color-primary`.
- Horizontal scroll row, `gap: 16px`, scroll-padding: `20px`.

### 6.4 Search Bar

- Height: `44px`.
- Background: `--color-bg-soft`.
- Border: `1px solid --color-border`. On focus: `1px solid --color-primary` + `box-shadow: 0 0 0 3px rgba(45,106,79,0.1)`.
- Border-radius: `4px`.
- Icon: 18px search icon, `--color-text-muted`.
- Placeholder: Inter 400, 14px, `--color-text-muted`.

### 6.5 Star Ratings

- Star size: `14px` (compact), `18px` (detail page).
- Filled color: `--color-star` (`#F59E0B`) — ONLY color for filled stars.
- Empty color: `--color-border` (`#E8ECE6`).
- Numeric rating: Inter 600, 13px, `--color-text`, right of stars.
- Review count: Inter 400, 12px, `--color-text-muted`, in parentheses.
- **Never use black stars, green stars, or any other color.**

### 6.6 Countdown Timer

- Container: `bg: --color-bg-soft`, `border: 1px solid --color-border`, `border-radius: 4px`, `padding: 12px 20px`.
- Label "Ends in": 12px, 600 weight, `--color-sale`, `uppercase`, `letter-spacing: 0.04em`.
- Time blocks: `bg: #FFFFFF`, `border: 1px solid --color-border`, `border-radius: 4px`, `padding: 4px 8px`.
- Digits: `JetBrains Mono`, 20px, 600 weight, `--color-text`.
- Colon separators: 18px, 600 weight, `--color-text-muted`.
- **Timer is warm and informational — never aggressive red backgrounds or pulsing animations.**

### 6.7 Promo Banner

- Border-radius: `4px`.
- Background: `linear-gradient(135deg, #2D6A4F 0%, #40916C 100%)`.
- Overline: 11px, 600 weight, uppercase, `letter-spacing: 0.08em`, `opacity: 0.8`.
- Headline: 22px, 700 weight, `#FFFFFF`.
- Subtext: 14px, 400 weight, `opacity: 0.85`.
- CTA button: `bg: #FFFFFF`, `color: --color-primary`, 13px/600, `border-radius: 4px`.
- Optional decorative emoji at `right: -20px, top: -10px`, `font-size: 80px`, `opacity: 0.15`.

### 6.8 Navigation

**Top Nav (Desktop):**
- Background: `#FFFFFF`, `border-bottom: 1px solid --color-border`.
- Logo: 28px green square (4px radius) + brand name Inter 700, 16px.
- Nav items: Inter 400, 13px, `--color-text-secondary`. Active: Inter 600, `--color-primary`.
- Sentence-case. No uppercase. No letter-spacing.
- Cart icon with count badge: `--color-accent` circle, 10px white text.

**Bottom Tab Bar (Mobile):**
- Background: `#FFFFFF`, `border-top: 1px solid --color-border`.
- 5 tabs max: emoji icon 20px + label 10px below.
- Active: label weight 600, `--color-primary`. Inactive: weight 400, `--color-text-muted`.
- Safe area padding: `env(safe-area-inset-bottom)`.

### 6.9 Cart Summary

- Border: `1px solid --color-border`, `border-radius: 4px`.
- Item rows: `padding: 8px 0`, `border-bottom: 1px solid --color-border`.
- Item name: Inter 400, 13px, `--color-text`.
- Item price: `JetBrains Mono` 600, 13px.
- Total row: Inter 700, 15px. Total price: `JetBrains Mono` 700, `--color-primary`.
- Checkout button: full-width primary, `padding: 12px`, `margin-top: 12px`.

### 6.10 Badges & Tags

| Type | Background | Text | Radius |
|------|------------|------|--------|
| Organic | `--color-primary` | `#FFFFFF` | 4px |
| Sale / Discount | `--color-sale` | `#FFFFFF` | 4px |
| New | `--color-accent` | `#FFFFFF` | 4px |
| Bestseller | `--color-loyalty` | `#FFFFFF` | 4px |
| Info (Free Delivery) | `--color-bg-soft` | `--color-primary` | 4px |

- Padding: `4px 10px`. Font: Inter 600, 11px, `letter-spacing: 0.02em`.
- Positioned absolutely on card: `top: 8px; left: 8px`.

---

## 7 · MOTION & TRANSITIONS

| Property | Duration | Easing | Usage |
|----------|----------|--------|-------|
| Hover (color, shadow, bg) | `150ms` | `ease` | Buttons, links, nav items |
| Card hover shadow | `200ms` | `ease` | Product cards, promo cards |
| Focus ring appear | `150ms` | `ease-out` | Inputs, selects |
| Modal enter | `250ms` | `ease-out` | Scale from 0.95 + fade |
| Modal exit | `200ms` | `ease-in` | Scale to 0.95 + fade |
| Drawer slide | `300ms` | `cubic-bezier(0.32, 0.72, 0, 1)` | Cart drawer, filter panel |
| Skeleton shimmer | `1.5s` | `linear infinite` | Loading placeholders |

### Motion Rules

- No pulsing, bouncing, or attention-grabbing animations on timers or sale badges. Urgency is conveyed through color and copy, not motion.
- Micro-interactions only: hover lifts, focus rings, quantity stepper transitions.
- Page transitions: simple crossfade, 200ms. No sliding pages.
- Skeleton loading: shimmer gradient `#F5F7F4` → `#EAEDE8` → `#F5F7F4`.

---

## 8 · ICONOGRAPHY

- Style: 2px stroke, rounded caps and joins.
- Size: 18px (inline), 20px (nav/tab bar), 24px (standalone actions).
- Color: `--color-text-muted` default, `--color-primary` when active.
- Source: Lucide icons preferred. Phosphor or Heroicons as alternates.
- Category icons use native emoji (🍎🥦🧀🍞🥩🧃) inside chip containers. No custom category icon illustrations.

---

## 9 · IMAGE TREATMENT

- Product images: white or `--color-bg-soft` background, centered, with breathing room (80% of container).
- Aspect ratio: 1:1 for grid cards, 16:9 for promo banners, 4:3 for category hero.
- Border-radius on images: inherits parent card radius (4px) via `overflow: hidden`.
- Placeholder state: `--color-bg-soft` solid fill + centered product emoji at 40px.
- Hero/banner images: full-bleed, optional overlay `rgba(27, 67, 50, 0.55)`.

---

## 10 · RESPONSIVE BREAKPOINTS

| Token | Width | Behavior |
|-------|-------|----------|
| `--bp-mobile` | < 640px | 2-col product grid, bottom tab bar, stacked layout |
| `--bp-tablet` | 640–1024px | 3-col grid, side filter panel option, top nav |
| `--bp-desktop` | > 1024px | 4–5 col grid, persistent sidebar cart, full top nav |

---

## 11 · DARK MODE (Optional Extension)

If implementing dark mode, remap these tokens:

| Light Token | Dark Value |
|-------------|------------|
| `--color-bg` | `#0F1A14` |
| `--color-bg-soft` | `#1A2E23` |
| `--color-bg-card` | `#162A1F` |
| `--color-text` | `#F0F4F1` |
| `--color-text-secondary` | `#9CA89F` |
| `--color-text-muted` | `#6B7A6F` |
| `--color-border` | `#2A3D31` |
| `--color-primary` | `#52B788` (lightened for contrast) |

All other accent/signal colors remain unchanged.

---

## 12 · DO / DON'T CHECKLIST

### ✅ DO

- Use 4px radius on every rectangular element
- Use JetBrains Mono for all price and number displays
- Use Inter 600–700 for headings, 400–500 for body
- Use gold `#F59E0B` for star ratings exclusively
- Use sentence-case for all UI text
- Let photography be the richest visual element
- Use green-tinted shadows `rgba(45,106,79,...)`
- Keep promo banners on the green gradient

### ❌ DON'T

- Use 0px, 8px, 12px, or 16px border radius (only 4px, 20px pill, or 50% circle)
- Use black, blue, purple, or any off-palette colors
- Use Raleway, Cormorant Garamond, Libre Franklin, or DM Mono
- Use UPPERCASE on buttons or navigation (only on overline labels)
- Use weight 300 (light) for any heading
- Use pure black `rgba(0,0,0,...)` in shadows
- Use aggressive red backgrounds or pulsing animations on timers
- Use black stars for ratings
- Place more than one badge per product card

---

**Version 2.0** — GoFresh × GlobalMart. Updated from M&S monochrome to fresh grocery aesthetic per Dribbble reference.
