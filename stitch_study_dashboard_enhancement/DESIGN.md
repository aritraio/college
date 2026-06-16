---
name: Monochromatic Scholarly
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#4c4546'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#7e7576'
  outline-variant: '#cfc4c5'
  surface-tint: '#5e5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1b1b1b'
  on-primary-container: '#848484'
  inverse-primary: '#c6c6c6'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e4e2e2'
  on-secondary-container: '#646464'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2e2e2'
  primary-fixed-dim: '#c6c6c6'
  on-primary-fixed: '#1b1b1b'
  on-primary-fixed-variant: '#474747'
  secondary-fixed: '#e4e2e2'
  secondary-fixed-dim: '#c8c6c6'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e3e2e2'
  tertiary-fixed-dim: '#c7c6c6'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#464747'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  headline-xl:
    fontFamily: Source Serif 4
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1120px
  gutter: 24px
---

## Brand & Style
The design system focuses on extreme legibility and intellectual rigor through a strictly monochromatic lens. By removing all hue-based distractions, the interface adopts a "paper-first" philosophy that mirrors high-end academic journals and archival records.

The style is **Minimalist-Modern**, leaning into the authority of high-contrast typography and generous whitespace. It evokes an emotional response of clarity, focus, and unbiased truth. This design system is tailored for research environments, legal documentation, and deep-reading platforms where the content must remain the sole focus.

## Colors
This is a purely achromatic palette. There are no blues, greens, or accent hues.

- **Primary:** True Black (#000000). Used for primary headings, call-to-action buttons, and critical iconography.
- **Secondary:** Deep Charcoal (#525252). Used for body text and secondary information to reduce eye strain.
- **Tertiary:** Medium Gray (#A3A3A3). Used for disabled states, borders, and decorative dividers.
- **Neutral/Background:** Pure White (#FFFFFF) for the primary canvas, with Soft Smoke (#F5F5F5) for containment and grouping.

Contrast ratios must adhere to AAA standards for all text-on-background pairings to ensure the "academic clarity" promise is met.

## Typography
The typography strategy pairings a sophisticated serif for authority with a highly legible sans-serif for utility.

- **Headlines:** Use **Source Serif 4**. It provides the "editorial" feel necessary for academic contexts. Large headlines should use tighter tracking to maintain a compact, authoritative look.
- **Body:** Use **Inter**. Chosen for its exceptional readability in dense blocks of text.
- **Data/Labels:** Use **JetBrains Mono**. The monospaced nature helps differentiate metadata, citations, and technical labels from the narrative content.

Hierarchy is established strictly through scale and weight rather than color.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to mimic the constraints of a physical printed page, centering the content for maximum focus.

- **Desktop:** 12-column grid within a 1120px container.
- **Tablet:** 8-column fluid grid with 32px side margins.
- **Mobile:** 4-column fluid grid with 16px side margins.

The spacing rhythm is built on an 8px base unit. Vertical rhythm is critical; use `lg` (48px) spacing between major sections and `md` (24px) between related content blocks to maintain a clean, organized "breathable" interface.

## Elevation & Depth
In the absence of color, depth is conveyed through **Tonal Layers** and **Low-Contrast Outlines**.

- **Level 0 (Base):** White (#FFFFFF).
- **Level 1 (Cards/Containers):** Smoke (#F5F5F5) background or a 1px solid border (#E5E5E5).
- **Interactive States:** Hovering over an element should not trigger a shadow; instead, use a subtle tonal shift (e.g., from White to Smoke) or a weight increase in the border.

Avoid drop shadows entirely to maintain the flat, print-like aesthetic. Use 1px or 2px dividers (#D4D4D4) to separate distinct sections of information.

## Shapes
The design system utilizes **Sharp (0)** corners for all UI elements. This reinforces the "architectural" and "institutional" feel of the system. 

Buttons, input fields, and cards should all feature 90-degree angles. This geometric rigidity distinguishes the product from softer, consumer-grade applications and aligns it with professional academic standards.

## Components
- **Buttons:** Primary buttons are solid Black (#000000) with White text. Secondary buttons are White with a 2px Black border. No rounded corners.
- **Input Fields:** 1px solid Gray (#A3A3A3) border. On focus, the border thickens to 2px Black. Labels use the monospaced font.
- **Chips/Tags:** Light Gray (#F5F5F5) background with Black text, no border. Used for categories or keywords.
- **Lists:** Separated by thin 1px hairline dividers (#E5E5E5). Use the monospaced font for list numbers or bullet indicators.
- **Cards:** No shadow. Use a 1px border (#D4D4D4) or a subtle gray background fill to define the container.
- **Data Tables:** Strict horizontal lines only. The header row should be solid Black with White text to anchor the data.