# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for Tab Holidays, a destination management company (DMC) specializing in travel services primarily in Thailand and Singapore. The website is built with vanilla HTML, CSS, and JavaScript using Bootstrap 5 for responsive design.

## Architecture

### Technology Stack
- **Frontend**: Pure HTML5, CSS3, and JavaScript (ES6+)
- **Framework**: Bootstrap 5.3.0 for responsive design and components
- **Fonts**: Poppins from Google Fonts
- **Icons**: Bootstrap Icons 1.11.3
- **Form Handling**: Web3Forms API for contact form submissions
- **Deployment**: Static hosting (GitHub Pages compatible via CNAME file)

### File Structure
- `index.html` - Main landing page with all sections (single-page application)
- `style.css` - Custom styles with CSS variables and responsive design
- `main.js` - All JavaScript functionality including animations, carousels, and form handling
- `Images/` - All website assets including logos, destinations, and client photos
- `privacy-policy.html` & `terms-of-service.html` - Legal pages
- `codebase.md` - Existing documentation file (may contain outdated info)

### Key Features
1. **Responsive Design**: Mobile-first approach with Bootstrap grid system
2. **Interactive Carousels**: Two main carousels for testimonials and client gallery
3. **Smooth Scrolling Navigation**: Single-page app with anchor navigation
4. **Contact Form**: Integrated with Web3Forms API (access key: 8786e7e6-958b-438c-9577-1261605ab270)
5. **Animation System**: Intersection Observer-based scroll animations
6. **Testimonial Management**: Auto-height equalization for testimonial cards

## Development Workflow

### No Build Process
This is a static website with no build tools, package managers, or compilation steps. Changes are made directly to source files.

### Local Development
- Open `index.html` in a web browser or use a local HTTP server
- For live reloading during development: `python -m http.server 8000` or similar
- Test form submissions in a live environment (Web3Forms requires HTTPS in production)

### Code Conventions

#### CSS
- Uses CSS custom properties (CSS variables) defined in `:root` for consistent theming
- BEM-like naming for custom classes
- Bootstrap utility classes for spacing and layout
- Mobile-first responsive design approach

#### JavaScript
- ES6+ features are used throughout
- Modular code organization with clear section comments
- Event delegation and proper cleanup for performance
- Intersection Observer API for scroll-based animations
- Debounced scroll handlers for performance

#### HTML
- Semantic HTML5 structure
- Proper accessibility attributes (ARIA labels, alt text)
- Bootstrap component markup patterns
- Web3Forms integration for contact form

## Important Implementation Details

### Testimonial Carousel System
The testimonials section uses a complex height equalization system (`equalizeTestimonialHeights()` function in main.js:123) that ensures all visible testimonial cards have consistent heights across different viewport sizes. This system:
- Runs on page load, carousel slides, and window resize
- Uses multiple timeouts to handle font loading and layout shifts
- Is critical for maintaining visual consistency

### Form Handling
Contact form submissions use Web3Forms API with the following configuration:
- Access key is embedded in the form (line 674 in index.html)
- Includes honeypot spam protection
- Client-side validation with visual feedback
- Success/error states with automatic reset

### Animation Performance
- Uses `IntersectionObserver` for scroll-triggered animations instead of scroll event handlers
- Debounced resize handlers to prevent performance issues
- CSS transforms preferred over changing layout properties

## Deployment

### GitHub Pages
- Repository is configured for GitHub Pages deployment
- `CNAME` file contains domain configuration for tabholidays.com
- Push to `main` branch triggers automatic deployment

### Domain Configuration
- Custom domain: tabholidays.com
- SSL/HTTPS enabled (required for Web3Forms)

## Content Management

### Images
- All images stored in `Images/` directory
- Client photos follow naming pattern: `client1.jpg` through `client12.jpg`
- Destination images use descriptive names (e.g., `Bangkok.jpg`, `phuket.jpg`)
- Logo files: `Tab_new_logo.png`

### Testimonials
Testimonials are hardcoded in HTML and include real customer reviews. Each testimonial includes:
- 5-star rating display
- Customer quote
- Customer name and travel type
- Bootstrap carousel structure for navigation

### Services & Destinations
Content is maintained directly in HTML with structured sections for:
- 6 main services (Excursions, Hotel Reservations, etc.)
- 6 key destinations (Bangkok, Pattaya, Phuket, Krabi, Koh Samui, Singapore)

## Key Considerations for Future Development

1. **No Package Dependencies**: This project intentionally avoids npm/yarn and build tools
2. **SEO Optimization**: All meta tags, structured data, and semantic HTML should be maintained
3. **Performance**: Images should be optimized for web, lazy loading is implemented for client gallery
4. **Cross-browser Compatibility**: Code supports modern browsers (ES6+), no IE support needed
5. **Mobile Experience**: Touch/swipe gestures implemented for carousels, responsive design is critical

## Common Tasks

### Adding New Testimonials
1. Add new carousel item to the testimonials section in index.html
2. Follow existing HTML structure with rating, quote, and author info
3. Test height equalization system after adding content

### Adding New Destinations
1. Add new destination card to the destinations section
2. Upload destination image to `Images/` directory
3. Follow existing overlay structure for consistency

### Updating Contact Information
- Phone numbers: Lines 720-721 in index.html
- Email: Line 727 in index.html  
- Address: Lines 734-735 in index.html

### Form Configuration Changes
If changing form handling service, update the Web3Forms access key and action URL in the contact form (index.html:672-674).