# Strapi Component Development Guide for GitHub Copilot

This workspace uses Strapi CMS with a custom component system for building websites. When working with Strapi components, follow these guidelines:

## Component System Overview

All components can be used interchangeably on both homepages and content pages. Don't be misled by the naming:
- `home-page-components.*` can be used on content pages
- `content-page-components.*` can be used on homepages

## Recommended Components Priority

When building pages, prioritize these components first:

**Primary Components:**
- `intro` - Hero sections with images, text, and CTAs
- `cta` - Call-to-action sections with media and buttons
- `rich-text` - Formatted text content
- `image` - Single images with captions
- `video` - Video embeds
- `gallery` - Image galleries
- `card-group` - Card-based layouts for services/features
- `form` - Contact and inquiry forms
- `slideshow` - Image/video carousels

## Critical Field Name Rules

### Component Type Naming
**DO NOT include the "component-" prefix** in API calls:

```javascript
// ❌ WRONG
"__component": "component-home-page-components.intro"

// ✅ CORRECT
"__component": "home-page-components.intro"
```

### Intro Component
- Use `File` and `MobileFile` arrays for images/videos, not `asset`
- No `Subtext` field - include all text in `IntroText`
- **NEVER set `paddingTop` or `paddingBottom`** - Intro is designed for full-height hero sections

```javascript
// ❌ WRONG
{
  "__component": "home-page-components.intro",
  "IntroText": "Welcome",
  "asset": {"id": 896},
  "Subtext": "Secondary text",
  "Style": {"paddingTop": 60, "paddingBottom": 60}
}

// ✅ CORRECT
{
  "__component": "home-page-components.intro",
  "IntroText": "Welcome. Secondary text included here.",
  "File": [{"id": 896}],
  "MobileFile": [{"id": 896}],
  "Style": {"BackgroundColor": "#f8f9fa", "textAlign": "center"}
}
```

### CTA Component
- Use `content` field for rich text (not `Markdown`)
- Use `justify` for vertical alignment: `"start"`, `"center"`, `"space-between"` (NOT `"left"` or `"right"`)
- Use `Style.textAlign` for horizontal alignment: `"left"`, `"center"`, `"right"`

```javascript
// ❌ WRONG
{
  "__component": "home-page-components.cta",
  "Markdown": "Contact us today",
  "justify": "left"
}

// ✅ CORRECT
{
  "__component": "home-page-components.cta",
  "content": {},
  "justify": "start",
  "Style": {"textAlign": "left"},
  "buttons": [{"Text": "Get Started", "Link": "/contact"}]
}
```

### Gallery Component
Use `Pictures` field (not `File`):

```javascript
// ❌ WRONG
{
  "__component": "home-page-components.gallery",
  "File": [{"id": 896}, {"id": 900}]
}

// ✅ CORRECT
{
  "__component": "home-page-components.gallery",
  "Pictures": [{"id": 896}, {"id": 900}, {"id": 898}]
}
```

### Card Group Component
- **ALWAYS set `TextColor` on individual cards** (not just at card-group level)
- Use `Image` field for card images (numeric ID, not `File`)
- Use blocks array format for `Text` field (not plain strings)

```javascript
// ❌ WRONG
{
  "__component": "content-page-components.card-group",
  "Cards": [
    {
      "Title": "Service 1",
      "Text": "Plain string text",
      "File": [{"id": 990}]
    }
  ]
}

// ✅ CORRECT
{
  "__component": "content-page-components.card-group",
  "Cards": [
    {
      "Title": "Service 1",
      "Text": [
        {
          "type": "paragraph",
          "children": [{"type": "text", "text": "Description of service"}]
        }
      ],
      "CardStyle": "standard",
      "TextColor": "#000000",
      "Image": 990
    }
  ],
  "Style": {"BackgroundColor": "#000000", "TextColor": "#ffffff"}
}
```

### Buttons Component
- No `GroupButtonStyle` field - use `ButtonStyle`
- `ButtonArrangement` only accepts: `"together"`, `"space between"`, `"spaced evenly"`
- **ALWAYS add `paddingBottom: 32`** to button group Style

```javascript
// ❌ WRONG
{
  "__component": "content-page-components.buttons",
  "GroupButtonStyle": "primary",
  "ButtonArrangement": "center"
}

// ✅ CORRECT
{
  "__component": "content-page-components.buttons",
  "ButtonStyle": "contained",
  "ButtonArrangement": "together",
  "Entry": [{"Text": "Click Me", "Link": "/page"}],
  "Style": {"paddingBottom": 32}
}
```

### Form Component
- Only use `type: "any"` or `type: "phone"` (NOT `"email"`, `"text"`, `"textarea"`)
- Use `validation` property for email validation

```javascript
// ❌ WRONG
{
  "formFields": [
    {"name": "email", "type": "email"},
    {"name": "message", "type": "textarea"}
  ]
}

// ✅ CORRECT
{
  "formFields": [
    {"name": "email", "type": "any", "validation": "required|email"},
    {"name": "message", "type": "any"},
    {"name": "phone", "type": "phone", "validation": "required"}
  ]
}
```

### Footer Component
- `Space` must be a number between 1-12
- **All Space values must add up to exactly 12**

```javascript
// ❌ WRONG
{
  "content": [
    {"__component": "footer-components.text", "Space": "medium"}
  ]
}

// ✅ CORRECT (adds up to 12)
{
  "content": [
    {"__component": "footer-components.text", "Space": 4},
    {"__component": "footer-components.text", "Space": 5},
    {"__component": "footer-components.icons", "Space": 3}
  ]
}
```

## Enum Values

### TextPosition (use spaces, not underscores)
- ✅ `"Bottom Left"`, `"Bottom Right"`, `"Centered"`
- ❌ `"Bottom_Left"`, `"Bottom_Right"`

### Navbar Style (capitalized)
- ✅ `"Spaced"`, `"Compact"`
- ❌ `"spaced"`, `"compact"`

### Navbar Appearance (use spaces)
- ✅ `"solid"`, `"fade in"`, `""`
- ❌ `"fade_in"`

### Card Style
- ✅ `"standard"`, `"overlay"`
- ❌ `"outlined"`, `"contained"`

## Best Practices

1. **Text Alignment**: Use `textAlign: "left"` in Style objects for readability. Only use `"center"` for galleries or specific design needs.

2. **Button Background Matching**: When a button group follows a paragraph/rich-text component, set the button group's `Style.BackgroundColor` to match the previous component.

3. **Content Page Naming**: Always prefix content page names with company/website name for easier searching:
   - ✅ `"MMT Construction - Services"`
   - ❌ `"Services"`

4. **Meta Descriptions**: Include SEO-optimized meta descriptions (150-160 characters) on content pages.

5. **Connect Pages to Website**: After creating a content page, ALWAYS connect it to the website using `connect_content_pages` tool.

6. **Preserve All Content**: When updating pages, ALWAYS include all original fields (images, MobileFile, File, etc.). Never accidentally remove existing content.

7. **Markdown Line Breaks**: Use actual newline characters in markdown fields, NOT escaped `\n` strings.

## Component Categories

### Layout & Hero
- `intro` - Hero section with media, text, optional forms
- `cta` - Call-to-action with rich content
- `slideshow` - Image/video carousel

### Content
- `paragraph` - Simple text with title
- `rich-text` - Advanced formatted content
- `image` - Single image with styling
- `video` - Embedded video player
- `gallery` - Multi-image grid
- `media` - Generic media component

### Interactive
- `form` - Custom contact/inquiry forms
- `buttons` - Action button groups
- ⚠️ `instant-quote` - **DEPRECATED - DO NOT USE**

### Organizational
- `card-group` - Multi-card layouts
- `grid` - Image grid with captions
- `list` - Bulleted/numbered lists
- `faq` - Question and answer accordion

## Common Style Properties

```javascript
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

## Working with Media

To reference images in components:

1. Search for media by URL: `search_media_by_url`
2. Search by filename: `list_media` with `nameFilter`
3. Reference by numeric `id` (not `documentId`)

```javascript
{
  "__component": "content-page-components.image",
  "asset": {"id": 905}  // Use numeric id only
}
```

## MCP Tools Available

- `list_component_types` - List all available components
- `get_component_example` - Get complete example with all fields
- `create_content_page` - Create new content page
- `update_content_page` - Update existing page
- `connect_content_pages` - Link pages to website
- `list_media` - Search media library
- `search_media_by_url` - Find media by URL

## Typical Page Structure

```javascript
[
  {
    "__component": "home-page-components.intro",
    "IntroText": "Page Hero",
    "TextPosition": "Centered",
    "File": [{"id": 123}],
    "MobileFile": [{"id": 123}]
  },
  {
    "__component": "content-page-components.paragraph",
    "Title": "Section Title",
    "Body": "Content...",
    "Style": {"textAlign": "left", "paddingTop": 40}
  },
  {
    "__component": "content-page-components.card-group",
    "Title": "Services",
    "Cards": [...],
    "Style": {"BackgroundColor": "#000", "TextColor": "#fff"}
  },
  {
    "__component": "content-page-components.buttons",
    "ButtonStyle": "contained",
    "ButtonArrangement": "together",
    "Entry": [{"Text": "Contact Us", "Link": "/contact"}],
    "Style": {"paddingBottom": 32}
  },
  {
    "__component": "home-page-components.cta",
    "Title": "Get Started Today",
    "justify": "center",
    "Style": {"textAlign": "center"},
    "buttons": [...]
  }
]
```

When generating Strapi component code, always follow these rules to avoid validation errors and ensure components render correctly.
