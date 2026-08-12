# Juan Oclock Portfolio Landing Page — Design Specification

## Purpose

Create a polished, modern, and minimal single-page portfolio for Juan Oclock, a web developer who also builds iOS applications. The page should establish a distinctive personal brand, show representative work, briefly explain Juan's practice, and make starting a conversation effortless.

## Creative Direction

Use the supplied Framer portfolio reference as inspiration without reproducing it literally. The selected “Ember Studio” direction carries over its strongest visual ideas:

- near-black and deep charcoal surfaces;
- a vivid orange-to-red atmospheric glow in the hero;
- oversized off-white editorial typography;
- restrained rounded geometry and generous spacing;
- high-contrast monochrome imagery;
- orange used sparingly for labels, links, and calls to action.

The result should feel like an experienced product-minded developer rather than a generic development agency. Details inspired by interfaces and mobile devices can support that positioning, but the layout should remain calm and uncluttered.

## Page Structure

### Header

A compact header presents the “Juan Oclock” wordmark, anchor links to About, Work, and Contact, and a prominent “Get in touch” action. The header remains readable against the hero and adapts to a simple compact layout on narrow screens.

### Hero

The first viewport contains the main positioning line, “I build for the web & the pocket.” Supporting copy explains that Juan creates fast, expressive websites and thoughtful iOS products. A primary contact action opens an email to `hi@juan-oclock.com`, while a secondary action scrolls to selected work.

The visual focal point is an original, generated editorial portrait of a developer in profile, lit with deep shadows and warm red-orange light. The restrained composition feels native to the brand rather than like generic stock photography.

### Expertise Strip

A slim transition panel lists four capabilities: Web Development, iOS Apps, Product UI, and Prototyping. It reinforces breadth without becoming a separate services section.

### About

A concise section introduces Juan as a developer who cares equally about engineering quality and the feel of the finished product. The copy emphasizes usable, fast, and considered digital experiences rather than an exhaustive biography.

### Portfolio

Three substantial project cards show the range of the practice. Each card includes a project name, platform label, short outcome-focused description, and generated placeholder image. The initial content uses these realistic fictional projects so the page feels complete while remaining easy to replace:

1. **Drift — iOS:** a quiet focus companion designed to make daily sessions feel effortless;
2. **Northstar — Web:** a fast financial workspace that turns dense account activity into clear decisions;
3. **Relay — Web + iOS:** a cross-platform collaboration tool that keeps project handoffs moving.

Cards use monochrome or muted imagery, generous rounded corners, and restrained hover or focus movement. They must remain fully understandable without hover.

### Contact and Footer

The closing section uses a large invitation—“Have something worth building?”—with a direct email button for `hi@juan-oclock.com`. The footer repeats the wordmark, current year, and simple availability language. No social profiles are invented.

## Interaction and Motion

- Navigation uses smooth in-page scrolling and visible focus states.
- Buttons receive subtle position, fill, or arrow feedback on hover and keyboard focus.
- Sections and project imagery enter with short, understated reveal motion.
- Motion respects the visitor's reduced-motion preference.
- No carousels, scroll hijacking, or decorative interaction that delays access to content.

## Responsive Behavior

The desktop layout uses an editorial split hero and multi-column work grid. Tablet layouts reduce the split and maintain large type without overflow. Mobile layouts become a clean single column, keep key actions above the fold, and preserve comfortable touch targets and spacing.

## Architecture and Data Flow

The site is one lightweight responsive route composed of semantic sections. Content is local and static; no database, authentication, external data, analytics, or form service is required. Navigation targets section IDs, portfolio content is defined in a small local data structure, and email actions use a `mailto:` link to `hi@juan-oclock.com`.

Because there is no remote data or form submission, application-level error states are unnecessary. Images include useful alternative text and layouts avoid depending on images to communicate essential project information.

## Accessibility and Quality

- Use semantic landmarks and a logical heading hierarchy.
- Maintain accessible foreground/background contrast.
- Provide visible keyboard focus and generous pointer targets.
- Include meaningful image alternative text.
- Respect reduced-motion settings.
- Verify layout at phone, tablet, and desktop sizes.
- Complete a production build and resolve compilation failures before delivery.

## Metadata and Sharing

The page title and description identify Juan Oclock as a web and iOS developer. A bespoke social preview image should reuse the finished site’s ember palette, typography treatment, and central positioning line so shared links feel consistent with the page.

## Out of Scope

- Content management system or project editor
- Contact form backend
- Blog or case-study detail routes
- Authentication, analytics, or persistent storage
- Invented testimonials, client logos, or social accounts

## Success Criteria

The finished page immediately communicates Juan's dual web/iOS focus, visually echoes the supplied reference without copying it, feels complete with placeholder portfolio content and imagery, works comfortably across screen sizes and input methods, and routes all contact actions to `hi@juan-oclock.com`.
