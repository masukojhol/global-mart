# M&S-Inspired Design System — Master Prompt

## 🎯 Design Philosophy

> "Let the product be the hero. The brand stays invisible so the photography speaks."

M&S follows a **premium minimalist** approach where the brand framework is
monochrome and restrained, allowing rich product photography (food, fashion)
to provide all the color and emotion. Every design decision serves clarity,
trust, and British elegance.

---

## 🎨 Color System

### Primary Brand Colors

| Token               | Name         | Hex       | RGB             | Usage                                  |
|---------------------|-------------|-----------|-----------------|----------------------------------------|
| `--brand-primary`   | Black       | `#000000` | (0, 0, 0)       | Logo, primary headings, CTAs           |
| `--brand-white`     | White       | `#FFFFFF` | (255, 255, 255) | Primary background, cards              |
| `--brand-offwhite`  | Ivory       | `#F8F7F5` | (248, 247, 245) | Page background, subtle warmth         |

### Text Hierarchy

| Token               | Name         | Hex       | Usage                                  |
|---------------------|-------------|-----------|----------------------------------------|
| `--text-primary`    | Jet Black   | `#1A1A1A` | Headlines, product names               |
| `--text-body`       | Charcoal    | `#333333` | Body copy, descriptions                |
| `--text-secondary`  | Slate       | `#666666` | Subtext, meta info                     |
| `--text-muted`      | Pewter      | `#999999` | Captions, timestamps, helper text      |
| `--text-disabled`   | Silver      | `#BDBDBD` | Disabled states                        |

### Functional / UI Colors

| Token               | Name          | Hex       | Usage                                  |
|---------------------|--------------|-----------|----------------------------------------|
| `--ui-sale`         | M&S Red      | `#C8102E` | Sale badges, price reductions, offers  |
| `--ui-success`      | Forest       | `#2D7D3F` | In stock, success, fresh               |
| `--ui-info`         | Steel Blue   | `#2B6CB0` | Links, info badges                     |
| `--ui-warning`      | Amber        | `#D4920B` | Low stock, warnings                    |
| `--ui-error`        | Crimson      | `#D32F2F` | Errors, validation                     |

### Loyalty / Sparks Program

| Token               | Name          | Hex       | Usage                                  |
|---------------------|--------------|-----------|----------------------------------------|
| `--sparks-gold`     | Sparks Gold  | `#C8A951` | Loyalty badge, membership, rewards     |
| `--sparks-dark`     | Rich Gold    | `#A07C30` | Sparks hover/active states             |
| `--sparks-light`    | Champagne    | `#F5EDD6` | Sparks background tint                 |

### Surface / Background Colors

| Token               | Name          | Hex       | Usage                                  |
|---------------------|--------------|-----------|----------------------------------------|
| `--surface-white`   | Pure White   | `#FFFFFF` | Cards, modals, primary surfaces        |
| `--surface-cream`   | Warm Cream   | `#FAF9F7` | Page background                        |
| `--surface-light`   | Pale Grey    | `#F5F5F3` | Section backgrounds, alternating rows  |
| `--surface-subtle`  | Mist         | `#EDEDEB` | Hover states, input backgrounds        |

### Border / Divider Colors

| Token               | Name          | Hex       | Usage                                  |
|---------------------|--------------|-----------|----------------------------------------|
| `--border-light`    | Whisper      | `#E8E8E6` | Card borders, dividers                 |
| `--border-medium`   | Pebble       | `#D0D0CE` | Input borders, stronger dividers       |
| `--border-dark`     | Graphite     | `#A0A09E` | Active input borders                   |
| `--border-focus`    | Black        | `#000000` | Focus rings, selected states           |

---

## 🔤 Typography System

### Font Stack

M&S uses custom proprietary fonts (M&S London, M&S Leeds by Monotype).
For public/inspired projects, use these closest alternatives:

```css
/* Primary — Headlines & UI */
--font-primary: 'Gill Sans', 'Gill Sans MT', 'Raleway', 'Century Gothic', sans-serif;

/* Body — Long form text */
--font-body: 'Georgia', 'Palatino', 'Times New Roman', serif;
/* OR for modern feel: */
--font-body-alt: 'Libre Franklin', 'Source Sans Pro', sans-serif;

/* Accent — Luxury/Editorial */
--font-accent: 'Cormorant Garamond', 'Playfair Display', serif;

/* Mono — Prices, codes */
--font-mono: 'DM Mono', 'SF Mono', monospace;
```

### Google Fonts Alternatives (Free)

| M&S Feel        | Google Font             | Weight Range   | Best For            |
|-----------------|------------------------|----------------|---------------------|
| M&S London      | **Raleway**            | 300–800        | Headlines, nav, UI  |
| M&S London      | **Libre Franklin**     | 300–700        | Body text, UI       |
| Editorial/Luxury| **Cormorant Garamond** | 300–700        | Hero text, banners  |
| Editorial/Luxury| **Playfair Display**   | 400–900        | Feature headlines   |
| Classic British | **EB Garamond**        | 400–800        | Long-form body      |
| Modern Clean    | **DM Sans**            | 400–700        | UI elements         |

### Type Scale

| Level     | Size   | Weight | Line Height | Letter Spacing | Font              |
|-----------|--------|--------|-------------|----------------|-------------------|
| Hero      | 48–56px| 300    | 1.05        | -1.5px         | Cormorant/Playfair|
| H1        | 32–36px| 300    | 1.15        | -0.8px         | Raleway           |
| H2        | 24–28px| 400    | 1.2         | -0.5px         | Raleway           |
| H3        | 18–20px| 500    | 1.3         | -0.3px         | Raleway           |
| H4        | 16px   | 600    | 1.4         | 0              | Raleway           |
| Body      | 15px   | 400    | 1.65        | 0.1px          | Libre Franklin    |
| Body Sm   | 13px   | 400    | 1.55        | 0.15px         | Libre Franklin    |
| Caption   | 11px   | 500    | 1.4         | 0.3px          | Libre Franklin    |
| Overline  | 11px   | 700    | 1.2         | 1.5px          | Raleway UPPERCASE |
| Price     | 20–24px| 700    | 1.1         | -0.3px         | DM Mono/Raleway   |
| Sale Price| 20–24px| 700    | 1.1         | -0.3px         | DM Mono (red)     |

### Typography Rules

- Headlines use **light weight (300)** — NOT bold — for that elegant M&S feel
- Body text has generous line-height (1.6+) for readability
- UPPERCASE used sparingly: category labels, overlines, CTAs only
- Letter-spacing is tight on headlines (-0.5 to -1.5px), slightly open on body
- Serif fonts for editorial/hero moments, sans-serif for UI/navigation
- Price typography: clean, mono-spaced, no clutter

---

## 📐 Spacing & Layout

### Spacing Scale

| Token     | Value  | Usage                           |
|-----------|--------|---------------------------------|
| `--sp-xs` | 4px    | Inline padding, icon gaps       |
| `--sp-sm` | 8px    | Tight grouping                  |
| `--sp-md` | 16px   | Card padding, input padding     |
| `--sp-lg` | 24px   | Section gaps, card margins      |
| `--sp-xl` | 40px   | Section padding                 |
| `--sp-2xl`| 64px   | Hero padding, major sections    |
| `--sp-3xl`| 96px   | Page-level vertical rhythm      |

### Layout Principles

- **Max content width**: 1280px
- **Grid**: 12-column, 24px gutter
- **Product grid**: 4 columns (desktop), 2 columns (mobile)
- **Generous whitespace** — M&S never feels crowded
- **Card border-radius**: 0px–4px (sharp, clean, premium)
- **Image aspect ratios**: 3:4 (fashion), 1:1 (food), 16:9 (banners)

---

## 🧩 Component Styling

### Buttons

```
Primary Button:
  background: #000000
  color: #FFFFFF
  padding: 14px 32px
  border-radius: 0px (sharp/square)
  font: Raleway 600, 13px, uppercase
  letter-spacing: 1.5px
  hover: background #333333
  transition: 0.2s ease

Secondary Button:
  background: transparent
  color: #000000
  border: 1.5px solid #000000
  padding: 14px 32px
  border-radius: 0px
  hover: background #000000, color #FFFFFF

Text Link:
  color: #1A1A1A
  text-decoration: underline
  font-weight: 500
  hover: color #666666
```

### Cards (Product)

```
Product Card:
  background: #FFFFFF
  border: 1px solid #E8E8E6
  border-radius: 0px (OR 4px for softer feel)
  padding: 0
  shadow: none (clean, no drop shadow)
  hover: shadow 0 4px 20px rgba(0,0,0,0.06)
  transition: 0.3s ease

  Image area:
    aspect-ratio: 3:4
    object-fit: cover
    background: #F5F5F3

  Content area:
    padding: 16px

  Product name:
    font: Raleway 400, 14px
    color: #1A1A1A
    margin-bottom: 4px

  Price:
    font: Raleway 600, 16px
    color: #1A1A1A

  Sale price:
    font: Raleway 700, 16px
    color: #C8102E

  Original price (struck):
    font: Raleway 400, 13px
    color: #999999
    text-decoration: line-through
```

### Navigation

```
Header:
  background: #FFFFFF
  border-bottom: 1px solid #E8E8E6
  height: 64px
  position: sticky

Nav links:
  font: Raleway 500, 13px, uppercase
  letter-spacing: 1px
  color: #1A1A1A
  hover: color #666666
  padding: 22px 16px
  border-bottom: 2px solid transparent
  active: border-bottom 2px solid #000000
```

### Badges & Tags

```
Sale Badge:
  background: #C8102E
  color: #FFFFFF
  font: Raleway 700, 10px, uppercase
  letter-spacing: 0.8px
  padding: 4px 10px
  border-radius: 0px

New Badge:
  background: #000000
  color: #FFFFFF
  (same typography as sale)

Sparks Badge:
  background: #F5EDD6
  color: #A07C30
  border: 1px solid #C8A951

Free Delivery Badge:
  background: #EDF5EE
  color: #2D7D3F
```

---

## 📸 Photography Guidelines (AI Prompt Modifiers)

Since M&S lets photography carry all the visual richness,
here are prompt keywords to generate M&S-quality imagery:

### Food Photography Style

```
Lighting:    "soft natural window light", "diffused daylight", "warm golden hour"
Background:  "clean white surface", "light marble", "natural linen texture"
Styling:     "minimal elegant plating", "fresh herbs garnish", "organic arrangement"
Mood:        "warm inviting", "premium quality", "British sophistication"
Camera:      "shallow depth of field", "45-degree angle", "close-up detail"
Post:        "slightly warm tone", "gentle contrast", "soft shadows"
Avoid:       "harsh flash", "busy backgrounds", "oversaturated", "cheap plastic"
```

### Fashion Photography Style

```
Lighting:    "clean studio light", "soft directional", "bright and airy"
Background:  "pure white seamless", "light grey", "muted neutral tone"
Styling:     "relaxed confident pose", "effortless British style"
Mood:        "timeless elegant", "approachable premium", "understated luxury"
Camera:      "full body 3:4 crop", "natural proportions", "clean sharp focus"
Post:        "true-to-life color", "minimal retouching", "clean skin tones"
```

---

## 🔑 Design Do's and Don'ts

### ✅ DO

- Use generous whitespace — let the page breathe
- Let product photography provide color and emotion
- Keep headlines light-weight (300) for elegance
- Use sharp/square corners on buttons and badges (premium feel)
- Maintain strict black/white brand framework
- Use serif fonts for editorial/hero moments only
- Make CTAs clear with high-contrast black buttons
- Use subtle hover states (gentle shadow, color shift)
- Keep UI completely flat — no gradients on UI elements
- Trust the grid — consistent alignment throughout

### ❌ DON'T

- Use bright colored UI elements (no blue/green/orange buttons)
- Add gradients to backgrounds or cards
- Use rounded/pill buttons (too playful for M&S feel)
- Over-decorate with icons, emojis, or badges
- Use bold weight on headlines (light = luxury)
- Add drop shadows on cards in resting state
- Use more than 2 font families on a page
- Crowd the layout — if in doubt, add more whitespace
- Use saturated colors in the UI framework
- Make text smaller than 11px anywhere

---

## 💻 CSS Variables Template

```css
:root {
  /* Brand */
  --brand-primary: #000000;
  --brand-white: #FFFFFF;
  --brand-offwhite: #F8F7F5;

  /* Text */
  --text-primary: #1A1A1A;
  --text-body: #333333;
  --text-secondary: #666666;
  --text-muted: #999999;
  --text-disabled: #BDBDBD;

  /* Functional */
  --ui-sale: #C8102E;
  --ui-success: #2D7D3F;
  --ui-info: #2B6CB0;
  --ui-warning: #D4920B;
  --ui-error: #D32F2F;

  /* Sparks/Loyalty */
  --sparks-gold: #C8A951;
  --sparks-dark: #A07C30;
  --sparks-light: #F5EDD6;

  /* Surfaces */
  --surface-white: #FFFFFF;
  --surface-cream: #FAF9F7;
  --surface-light: #F5F5F3;
  --surface-subtle: #EDEDEB;

  /* Borders */
  --border-light: #E8E8E6;
  --border-medium: #D0D0CE;
  --border-dark: #A0A09E;
  --border-focus: #000000;

  /* Typography */
  --font-primary: 'Raleway', 'Gill Sans', 'Century Gothic', sans-serif;
  --font-body: 'Libre Franklin', 'Source Sans Pro', sans-serif;
  --font-accent: 'Cormorant Garamond', 'Playfair Display', serif;
  --font-mono: 'DM Mono', 'SF Mono', monospace;

  /* Spacing */
  --sp-xs: 4px;
  --sp-sm: 8px;
  --sp-md: 16px;
  --sp-lg: 24px;
  --sp-xl: 40px;
  --sp-2xl: 64px;
  --sp-3xl: 96px;

  /* Radius */
  --radius-none: 0px;
  --radius-sm: 2px;
  --radius-md: 4px;

  /* Shadows */
  --shadow-none: none;
  --shadow-hover: 0 4px 20px rgba(0, 0, 0, 0.06);
  --shadow-modal: 0 16px 48px rgba(0, 0, 0, 0.12);

  /* Transitions */
  --ease-default: 0.25s ease;
  --ease-slow: 0.4s ease;
}
```

---

## 📋 Quick Reference Summary

| Aspect          | M&S Approach                                    |
|-----------------|------------------------------------------------|
| **Brand Color** | Pure Black `#000000` only                      |
| **Palette**     | Monochrome + warm neutrals + red for sale      |
| **Headlines**   | Light-weight sans-serif (300)                  |
| **Body**        | Clean sans-serif, generous line-height         |
| **Editorial**   | Elegant serif (Cormorant/Playfair)             |
| **Buttons**     | Square/sharp, black fill, uppercase text       |
| **Cards**       | Flat, no shadow at rest, subtle shadow on hover|
| **Corners**     | Sharp (0px) or barely rounded (2–4px)          |
| **Photography** | Hero element — provides all color & emotion    |
| **Whitespace**  | Abundant — page breathes                       |
| **Feeling**     | Premium, trusted, British, timeless, warm      |

---

*This prompt can be used as a reference for AI design tools, front-end
development, or as a creative brief for building M&S-inspired e-commerce
experiences.*
