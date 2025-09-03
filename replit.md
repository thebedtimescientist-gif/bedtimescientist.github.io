# Overview

The Bedtime Scientist is a static website for a science-themed bedtime podcast or story series. The site features a cosmic/night sky aesthetic with a dark gradient background and twinkling star animations to create a soothing, bedtime-appropriate atmosphere. The website includes pages for episodes, contact information, donations, and individual episode content, all designed to engage children and parents interested in science stories for bedtime.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The project uses a **static HTML approach** with individual HTML files for each page and section. This architecture was chosen for simplicity and ease of deployment without requiring a backend server or complex build process.

**Key architectural decisions:**
- **Static HTML pages**: Each page is a separate HTML file (index.html, episodes.html, contact.html, etc.) for direct navigation and SEO benefits
- **Shared styling approach**: Common CSS styles and animations are duplicated across files to maintain consistency while keeping each page self-contained
- **Component-based thinking**: Though not using a framework, the HTML structure follows modular patterns with reusable CSS classes

## Styling and Design System
The project implements a **utility-first CSS approach** using Tailwind CSS with custom animations and branding elements.

**Design decisions:**
- **Tailwind CSS**: Chosen for rapid development and consistent spacing/sizing without custom CSS overhead
- **Cosmic theme**: Dark gradient backgrounds with animated stars create a calming bedtime atmosphere
- **Typography hierarchy**: Uses Google Fonts (Inter, Playfair Display, Patrick Hand) for different content types and personality
- **Glass morphism effects**: Card components use backdrop blur and translucent backgrounds for modern aesthetics

## Animation and Interactivity
The site features **CSS-based animations** for enhanced user experience without JavaScript complexity.

**Animation strategy:**
- **Twinkling stars**: CSS keyframe animations create subtle background movement
- **Hover effects**: Glow and transition effects on interactive elements
- **Performance consideration**: Uses CSS transforms and opacity for smooth animations

## Content Structure
The project follows a **content-first architecture** with dedicated pages for different types of content.

**Content organization:**
- **Episode pages**: Individual HTML files for each podcast episode or story
- **Static navigation**: Simple anchor links between pages without dynamic routing
- **Scalable structure**: New episodes can be added as additional HTML files following the established pattern

# External Dependencies

## CDN Resources
- **Tailwind CSS**: Loaded via CDN for utility-first styling framework
- **Google Fonts**: Inter, Playfair Display, and Patrick Hand fonts for typography hierarchy
- **Lucide Icons**: Icon library for UI elements and decorative purposes

## Third-party Services
- **Font hosting**: Google Fonts CDN for web font delivery
- **Icon system**: Unpkg CDN for Lucide icon library

The project intentionally avoids complex external dependencies, focusing on CDN-delivered resources that don't require build processes or server-side integrations. This approach prioritizes simplicity and fast loading times suitable for a content-focused website.