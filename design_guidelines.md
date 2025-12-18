# Design Guidelines - Site Web Professionnel Corporate

## Design Approach
**Reference-Based Strategy**: Inspired by corporate B2B leaders like Soletanche Bachy, combining professional authority with visual richness. Focus on showcasing expertise through project imagery, clear information hierarchy, and trust-building elements.

## Typography Hierarchy

**Font Stack**:
- Headings: Inter (bold, semi-bold weights)
- Body: Arial, Helvetica, sans-serif
- Maintain professional, highly legible presentation

**Type Scale**:
- Hero H1: text-7xl to text-8xl (exceptionally large, commanding presence)
- Section H2: text-5xl to text-6xl (clear section breaks)
- Card H3: text-2xl to text-3xl (featured content)
- Body: text-lg to text-xl (generous, accessible reading size)
- Small text: text-base (footer, metadata)

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24, 32 for consistent rhythm.

**Container Strategy**:
- Full-width sections with inner max-w-7xl containers
- Content sections: max-w-6xl
- Text-heavy content: max-w-4xl

**Grid Patterns**:
- News/Projects: 3-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- Features: 4-column grid for icons/stats
- Hero: Full-width with centered content overlay

## Core Components

### Navigation
- Top utility bar (language selector, social links) - py-2, text-sm
- Main navigation with mega-menu capability - sticky, backdrop-blur, py-4
- Logo left-aligned, menu items right-aligned with generous spacing (gap-8)

### Hero Section
**Large Hero Image/Video Embed**:
- Full viewport height (min-h-screen) with YouTube iframe integration
- Dark gradient overlay (from-black/60 to-transparent) for text readability
- Centered content: oversized H1 + subtitle + CTA button
- Buttons on images: backdrop-blur-sm bg-white/10 treatment

### Content Sections
**Environmental Commitments**:
- 2-column layout (image left, content right) with py-24 spacing
- Large image with subtle rounded corners (rounded-lg)
- Bulleted list with custom checkmark icons

**Solutions Carousel**:
- Swiper/carousel with navigation arrows
- Cards with image + title overlay
- Prev/next controls positioned absolutely

**News Grid**:
- Card-based layout with hover lift effect (hover:translate-y-[-4px])
- Image aspect ratio 16:9, title below
- "Voir plus" link at section end

**Recruitment Section**:
- Full-width image background with text overlay
- Split content or centered messaging
- Strong CTA button

### Footer
- Multi-column layout (4 columns on desktop)
- Social icons, sitemap links, contact info, certifications
- Copyright bar at bottom with py-6

## Component Library

**Buttons**:
- Primary: px-8 py-4, text-lg, rounded, font-semibold
- Secondary: outlined variant
- On-image buttons: backdrop-blur treatment

**Cards**:
- Elevated with subtle shadow (shadow-md)
- Rounded corners (rounded-lg)
- Padding: p-6
- Hover: shadow-lg transition

**Images**:
- Always use object-cover for consistent aspect ratios
- Lazy loading for performance

## Animations

**Scroll Animations** (Framer Motion):
- Fade-in on scroll for sections (opacity + translateY)
- Stagger children in grids (0.1s delay between items)
- Keep duration around 0.6-0.8s

**Micro-interactions**:
- Button hover: slight scale (scale-105)
- Card hover: lift + shadow increase
- Link underline animation

**Navigation**:
- Smooth scroll behavior
- Mega-menu fade-in (200ms)

## Images

**Hero Section**: Full-width background image or YouTube video embed showing construction/industrial project. Dark overlay ensures text legibility.

**Environmental Section**: Large landscape image (construction site with green elements, sustainable practices) positioned left of text.

**Solutions Carousel**: 4-6 project images showcasing different techniques (foundations, soil technology, infrastructure).

**News Cards**: Each article has featured image (project photos, team photos, equipment).

**Recruitment Section**: Inspiring workplace image (team on site, equipment, or aerial construction view) as background.

**Image Treatment**: All images should convey professionalism, scale, technical expertise. Use high-quality photography with proper aspect ratios (16:9 for landscapes, 4:3 for cards).

## Responsive Strategy

- Mobile-first breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hero H1: text-4xl → text-6xl → text-8xl
- Grids: 1 column → 2 columns → 3-4 columns
- Padding: py-12 → py-16 → py-24 for sections
- Navigation: hamburger menu below lg breakpoint

## Accessibility
- ARIA labels on all interactive elements
- Focus states: ring-2 ring-offset-2
- Alt text on all images
- Keyboard navigation support
- Color contrast AAA compliance