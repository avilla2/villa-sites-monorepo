# Component Usage Guide

This guide shows how to use all available components in both homepages and content pages.

## Important: Component Interchangeability

**All components can be used on any page type!** Don't let the naming convention fool you:
- Components prefixed with `component-home-page-components.*` can be used on content pages
- Components prefixed with `component-content-page-components.*` can be used on homepages

## Recommended Components

**For best results, prioritize these components when building pages:**

### Primary Components (Use These First)
- **intro** - Hero sections with images, text, and CTAs
- **cta** - Call-to-action sections with media and buttons
- **rich-text** - Formatted text content with styling
- **image** - Single images with captions
- **video** - Video embeds with controls
- **gallery** - Image galleries and grids
- **card-group** - Card-based layouts for services/features
- **form** - Contact and inquiry forms
- **slideshow** - Image/video carousels

These components provide the most flexibility and are tested for optimal performance across all page types.

## Quick Start

### 1. Discover Available Components

Use the MCP tool to list all components:

```javascript
{
  "name": "list_component_types",
  "arguments": {
    "category": "all"  // or: "layout", "content", "interactive", "organizational"
  }
}
```

### 2. Get Component Examples

Get a complete example with all fields:

```javascript
{
  "name": "get_component_example",
  "arguments": {
    "componentType": "component-home-page-components.intro"
  }
}
```

## Component Categories

### Layout & Hero Components

Perfect for creating impactful page headers and call-to-action sections.

**Intro** - Hero section with media, text, and optional forms
```json
{
  "__component": "component-home-page-components.intro",
  "IntroText": "Welcome to our website",
  "TextPosition": "center",
  "Buttons": [{"Text": "Get Started", "Link": "/contact"}],
  "Style": {"BackgroundColor": "#f8f9fa", "paddingTop": 60}
}
```

**CTA** - Call-to-action with rich content
```json
{
  "__component": "component-home-page-components.cta",
  "Title": "Ready to Begin?",
  "justify": "center",
  "buttons": [{"Text": "Sign Up", "Link": "/signup"}]
}
```

**Slideshow** - Image or video carousel
```json
{
  "__component": "component-home-page-components.slideshow",
  "Title": "Our Gallery",
  "uuid": "unique-slideshow-id"
}
```

### Content Components

For text, images, and media content.

**Paragraph** - Simple text with title
```json
{
  "__component": "component-content-page-components.paragraph",
  "Title": "Our Story",
  "Body": "We've been serving customers since...",
  "Style": {"textAlign": "left", "paddingTop": 30}
}
```

**Rich Text** - Advanced formatted content
```json
{
  "__component": "component-home-page-components.rich-text",
  "Title": "About Us",
  "RichText": {},
  "Style": {"BackgroundColor": "#ffffff"}
}
```

**Image** - Single image with styling
```json
{
  "__component": "component-content-page-components.image",
  "width": 800,
  "caption": "Our team at work",
  "imageStyle": "cover"
}
```

**Video** - Embedded video player
```json
{
  "__component": "component-content-page-components.video",
  "autoplay": false,
  "controls": true,
  "loop": false
}
```

**Gallery** - Multi-image grid
```json
{
  "__component": "component-home-page-components.gallery",
  "Title": "Photo Gallery"
}
```

**Media** - Generic media component
```json
{
  "__component": "component-home-page-components.media",
  "Title": "Featured Media"
}
```

### Interactive Components

For user engagement and data collection.

**Form** - Custom contact/inquiry forms
```json
{
  "__component": "component-content-page-components.form",
  "Title": "Contact Us",
  "sendTo": "contact@example.com",
  "formFields": [
    {"name": "email", "label": "Email", "type": "email", "validation": "required|email"}
  ]
}
```

**Buttons** - Action button groups
```json
{
  "__component": "component-content-page-components.buttons",
  "ButtonStyle": "contained",
  "ButtonArrangement": "center",
  "Entry": [
    {"Text": "Learn More", "Link": "/about", "ButtonColor": "#007bff"}
  ]
}
```

**Instant Quote** - Quote calculator
```json
{
  "__component": "component-content-page-components.instant-quote",
  "Title": "Get a Quote",
  "Entry": [
    {"JobType": "Basic Service", "PricePer": 50, "PriceMinimum": 100}
  ]
}
```

### Organizational Components

For structured content layouts.

**Card Group** - Multi-card layouts
```json
{
  "__component": "component-content-page-components.card-group",
  "Title": "Our Services",
  "Cards": [
    {
      "Title": "Service 1",
      "Text": "Description...",
      "ButtonText": "Learn More",
      "Link": "/service-1"
    }
  ]
}
```

**Grid** - Image grid with captions
```json
{
  "__component": "component-content-page-components.grid",
  "Title": "Portfolio",
  "Entry": [
    {"Caption": "Project 1", "Picture": null},
    {"Caption": "Project 2", "Picture": null}
  ]
}
```

**List** - Bulleted/numbered lists
```json
{
  "__component": "component-content-page-components.list",
  "Title": "Features",
  "Items": [
    {"Text": "Fast delivery"},
    {"Text": "Quality guaranteed"}
  ]
}
```

**FAQ** - Question and answer accordion
```json
{
  "__component": "component-content-page-components.faq",
  "Title": "Common Questions",
  "Entry": [
    {"Title": "How do I order?", "Body": "Simply click the order button..."}
  ]
}
```

## Common Styling Options

Most components accept a `Style` object with these properties:

```json
{
  "Style": {
    "BackgroundColor": "#f8f9fa",
    "TextColor": "#333333",
    "textAlign": "left",
    "paddingTop": 40,
    "paddingBottom": 40,
    "size": 12,
    "Animation": "fade-in"
  }
}
```

## Example: Mixed Component Page

Here's a content page using components from both categories:

```json
[
  {
    "__component": "component-home-page-components.intro",
    "IntroText": "Services Page Hero",
    "TextPosition": "center"
  },
  {
    "__component": "component-content-page-components.paragraph",
    "Title": "What We Do",
    "Body": "We provide excellent services..."
  },
  {
    "__component": "component-content-page-components.card-group",
    "Title": "Our Services",
    "Cards": [...]
  },
  {
    "__component": "component-content-page-components.faq",
    "Title": "Questions?",
    "Entry": [...]
  },
  {
    "__component": "component-home-page-components.cta",
    "Title": "Get Started",
    "buttons": [{"Text": "Contact Us", "Link": "/contact"}]
  }
]
```

## Best Practices

1. **Use Intro or CTA for page headers**: They provide the most flexibility for hero sections
2. **Mix component types**: Combine homepage and content page components for best results
3. **Consistent styling**: Use similar padding and colors across components
4. **Logical flow**: Order components from general (intro) to specific (details) to action (CTA/buttons)
5. **Test responsiveness**: Consider mobile vs desktop layout needs
6. **Use list_component_types**: Always check available components before building pages
7. **Get examples first**: Use get_component_example to see all available fields
8. **Card text colors**: Always set `TextColor` on individual cards within card-groups, not just at the card-group level. Cards often have contrasting backgrounds (e.g., white cards on black page background) requiring different text colors than the section title
9. **Button group backgrounds**: When a button group follows a paragraph or rich-text component, set the button group's `Style.BackgroundColor` to match the previous component for visual continuity
10. **Button group padding**: ALWAYS add `paddingBottom: 32` to button group Style objects for proper spacing. The default padding is insufficient
11. **Text alignment**: Use `textAlign: "left"` in Style objects for readable, professional layouts. Only use `center` alignment for galleries or specific design needs
12. **PRESERVE ALL CONTENT**: When updating pages, ALWAYS include all original fields (images, MobileFile, File, etc.). Never accidentally remove existing content - reference the original data and maintain all fields
13. **Markdown line breaks**: Use actual newline characters in markdown fields, NOT escaped `\n` strings. In JSON, this means using actual line breaks within the string value, not the literal characters "\" and "n"

## Component Selection Guide

| Need | Recommended Component |
|------|----------------------|
| Page hero/banner | Intro, Slideshow |
| Text content | Paragraph, RichText |
| Call to action | CTA, Buttons |
| Images | Image, Gallery, Grid |
| Videos | Video, Media |
| User input | Form, InstantQuote |
| Product/service showcase | CardGroup |
| Features list | List |
| Help content | FAQ |

## Field Name Corrections

When using components, be aware of these field name requirements:

### Component Type Naming Convention

When creating components via the API, **do NOT include the "component-" prefix** in the `__component` field:

❌ **INCORRECT:**
```json
{
  "__component": "component-home-page-components.intro"
}
{
  "__component": "component-navbar-components.text-link"
}
{
  "__component": "component-footer-components.image"
}
```

✅ **CORRECT:**
```json
{
  "__component": "home-page-components.intro"
}
{
  "__component": "navbar-components.text-link"
}
{
  "__component": "footer-components.image"
}
```

**Note:** The sample JSON files may show `__typename` fields with "Component" prefix (e.g., `ComponentHomePageComponentsIntro`), but when creating content via the API, use the shorter format without "component-".

### TextPosition Enum Values

The `TextPosition` field (used in Intro and other components) requires **spaces**, not underscores:

❌ **INCORRECT:**
```json
"TextPosition": "Bottom_Left"
"TextPosition": "Bottom_Right"
```

✅ **CORRECT:**
```json
"TextPosition": "Bottom Left"
"TextPosition": "Bottom Right"
"TextPosition": "Centered"
```

### Navbar Style Enum Values

The `Style` field in navbars requires **capitalized** enum values:

❌ **INCORRECT:**
```json
{
  "__component": "navbar-components.navbar",
  "Style": "spaced"
}
```

✅ **CORRECT:**
```json
{
  "__component": "navbar-components.navbar",
  "Style": "Spaced"
}
```

### Navbar Appearance Enum Values

The `Appearance` field in navbars requires **spaces**, not underscores:

❌ **INCORRECT:**
```json
{
  "__component": "navbar-components.navbar",
  "Appearance": "fade_in"
}
```

✅ **CORRECT:**
```json
{
  "__component": "navbar-components.navbar",
  "Appearance": "fade in"
}
```

Allowed values: `"solid"`, `"fade in"`, or empty string `""`

### Form Field Types

The `type` field in form components only accepts **"any"** or **"phone"** values:

❌ **INCORRECT:**
```json
{
  "__component": "component-content-page-components.form",
  "formFields": [
    {"name": "email", "label": "Email", "type": "email"},
    {"name": "message", "label": "Message", "type": "textarea"},
    {"name": "name", "label": "Name", "type": "text"}
  ]
}
```

✅ **CORRECT:**
```json
{
  "__component": "component-content-page-components.form",
  "formFields": [
    {"name": "email", "label": "Email", "type": "any", "validation": "required|email"},
    {"name": "message", "label": "Message", "type": "any"},
    {"name": "phone", "label": "Phone", "type": "phone", "validation": "required"}
  ]
}
```

**Note:** Use `type: "any"` for text, email, and textarea fields. Validation is handled through the `validation` property.

### Intro Component Fields

The Intro component does **not** have a `Subtext` field. Include all text in `IntroText`:

❌ **INCORRECT:**
```json
{
  "__component": "component-home-page-components.intro",
  "IntroText": "Main heading",
  "Subtext": "Secondary text"
}
```

✅ **CORRECT:**
```json
{
  "__component": "home-page-components.intro",
  "IntroText": "Main heading. Secondary text can be included in the same field."
}
```

### Buttons Component Fields

The Buttons component does NOT have a `GroupButtonStyle` field. Valid fields are:
- `ButtonStyle` - Style of the buttons (e.g., "contained", "outlined")
- `ButtonArrangement` - Layout arrangement
- `Entry` - Array of button objects

**ButtonArrangement** only accepts these specific values:

❌ **INCORRECT:**
```json
{
  "__component": "content-page-components.buttons",
  "GroupButtonStyle": "primary",
  "ButtonArrangement": "center"
}
```

✅ **CORRECT:**
```json
{
  "__component": "content-page-components.buttons",
  "ButtonStyle": "contained",
  "ButtonArrangement": "together",
  "Entry": [{"Text": "Click Me", "Link": "/page"}]
}
```

Allowed values for `ButtonArrangement`: `"together"`, `"space between"`, `"spaced evenly"`

### Card Group CardStyle Enum Values

The `CardStyle` field in card-group components only accepts **"standard"** or **"overlay"** values:

❌ **INCORRECT:**
```json
{
  "__component": "content-page-components.card-group",
  "Title": "Our Services",
  "Cards": [
    {
      "Title": "Service 1",
      "CardStyle": "outlined"
    }
  ]
}
```

✅ **CORRECT:**
```json
{
  "__component": "content-page-components.card-group",
  "Title": "Our Services",
  "Cards": [
    {
      "Title": "Service 1",
      "CardStyle": "standard"
    }
  ]
}
```

Allowed values: `"standard"`, `"overlay"`

### Card Group Text Colors

**IMPORTANT:** Individual cards within a card-group need their own `TextColor` set because cards typically have contrasting backgrounds from the page.

❌ **INCORRECT (only setting TextColor at card-group level):**
```json
{
  "__component": "content-page-components.card-group",
  "Title": "Our Services",
  "Cards": [
    {
      "Title": "Service 1",
      "Text": "Description of service",
      "CardStyle": "standard"
    }
  ],
  "Style": {
    "BackgroundColor": "#000000",
    "TextColor": "#ffffff"
  }
}
```

✅ **CORRECT (setting TextColor on each card):**
```json
{
  "__component": "content-page-components.card-group",
  "Title": "Our Services",
  "Cards": [
    {
      "Title": "Service 1",
      "Text": "Description of service",
      "CardStyle": "standard",
      "TextColor": "#000000"
    }
  ],
  "Style": {
    "BackgroundColor": "#000000",
    "TextColor": "#ffffff"
  }
}
```

**Why:** Card-group `Style.TextColor` applies to the section title, but cards often have white/light backgrounds while the page has dark backgrounds. Set each card's `TextColor` to ensure text is readable on the card's background (typically `"#000000"` for white cards).

### CTA Component Alignment

The CTA component uses **two separate properties** to control alignment:

- **`justify`** - Controls **vertical alignment** of text/buttons relative to the image (accepts: `"start"`, `"center"`, `"space-between"`)
  - `"start"` - Aligns content to the top of the image
  - `"center"` - Centers content vertically with the image
  - `"space-between"` - Spreads text and button evenly across the vertical space
  
- **`Style.textAlign`** - Controls **horizontal alignment** of text and buttons (accepts: `"left"`, `"center"`, `"right"`)

❌ **INCORRECT (using "left" for justify):**
```json
{
  "__component": "home-page-components.cta",
  "Title": "Transform Your Property",
  "justify": "left"
}
```

✅ **CORRECT (left-aligned text, top-aligned with image):**
```json
{
  "__component": "home-page-components.cta",
  "Title": "Transform Your Property",
  "justify": "start",
  "media": { "id": 123 },
  "Style": {
    "textAlign": "left"
  }
}
```

✅ **CORRECT (centered text, vertically centered with image):**
```json
{
  "__component": "home-page-components.cta",
  "Title": "Transform Your Property",
  "justify": "center",
  "media": { "id": 123 },
  "Style": {
    "textAlign": "center"
  }
}
```

**Important:** 
- Use `justify` to control vertical positioning relative to the image
- Use `Style.textAlign` to control horizontal text/button alignment
- The `justify` field only accepts `"start"`, `"center"`, or `"space-between"` (NOT `"left"` or `"right"`)

### Invalid Relations Error

If you receive an "Invalid relations" error when creating pages with image/file references, ensure that:

1. **Image URLs are valid** - The URLs must point to actual uploaded files in Strapi
2. **Use placeholder-free structure** - When creating initial content without uploaded images, omit the File/asset fields entirely rather than using placeholder URLs
3. **Upload images first** - Upload all images to Strapi before referencing them in components

❌ **INCORRECT (will cause Invalid relations error):**
```json
{
  "__component": "home-page-components.intro",
  "File": [{"url": "/uploads/placeholder_image.jpg"}]
}
```

✅ **CORRECT (create without images first):**
```json
{
  "__component": "home-page-components.intro",
  "IntroText": "Welcome",
  "TextPosition": "Centered"
}
```

Then update later with actual uploaded image URLs.

## Important: Connecting Pages to Websites

**After creating a content page, you MUST connect it to a website for it to appear on the site.**

Creating a page only stores it in Strapi. To make it accessible on the website, use:

```javascript
{
  "name": "connect_content_pages",
  "arguments": {
    "websiteId": "your-website-document-id",
    "contentPageIds": ["your-page-document-id"]
  }
}
```

This is a required step after every `create_content_page` call.

## Working with Images and Media

### Finding Existing Media

To reference images in components, you need the media file's ID. Use these tools to find existing media:

**Search by URL:**
```javascript
{
  "name": "search_media_by_url",
  "arguments": {
    "url": "https://static.villawebsolutions.com/uploads/turf_1_2025_8a22d3c470.JPG"
  }
}
```

**Search by filename:**
```javascript
{
  "name": "list_media",
  "arguments": {
    "nameFilter": "turf_1_2025"
  }
}
```

**Filter by type:**
```javascript
{
  "name": "list_media",
  "arguments": {
    "mimeFilter": "image/jpeg",
    "extFilter": ".jpg"
  }
}
```

### Using Media in Components

Once you have the media file information, reference it by its **numeric `id`** (not `documentId`):

```json
{
  "__component": "content-page-components.image",
  "asset": {
    "id": 905
  }
}
```

**Note:** You only need to provide the `id` field when creating/updating components. Strapi will populate all other media fields (url, formats, etc.) automatically.

## Troubleshooting

**Q: Can I use Intro on a content page?**  
A: Yes! All components work on all pages.

**Q: How do I know what fields are required?**  
A: Use `get_component_example` to see the structure with all fields.

**Q: What if a component doesn't render?**  
A: Check that the `__component` field exactly matches the component type string, and verify all required media/file references exist in Strapi.

**Q: Can I nest components?**  
A: Some components like CardGroup contain nested objects (Cards), but components themselves cannot contain other components. Use the Content array to order multiple components.

**Q: I'm getting enum validation errors**  
A: Check the Field Name Corrections section above. Some enum values require specific formatting (e.g., spaces instead of underscores).

**Q: I created a page but it doesn't show up on the website**  
A: Did you connect it to the website? Use `connect_content_pages` after creating any new content page.
