# Strapi MCP Server

A Model Context Protocol (MCP) server that enables AI agents to manage Strapi websites via REST API. This server provides comprehensive tools for creating and updating websites, site settings, homepages, content pages, headers, footers, and various content components.

## Key Feature: Universal Component Support 🎨

**All content components can be used on both homepages AND content pages!** You're not restricted to using specific components on specific page types. Mix and match any components (Intro, CTA, Paragraph, Forms, Cards, etc.) on any page to create exactly the layout you need.

## Features

- **Website Management**: Create, read, update, and delete websites
- **Content Pages**: Manage content pages with dynamic component zones
- **Navigation**: Create and update navigation bars with various item types
- **Footers**: Manage footer content and links
- **Homepages**: Create homepages with rich content components
- **Site Settings**: Configure site-wide settings including color palettes and breakpoints
- **Component Discovery**: Tools to list and get examples of all available components
- **Universal Components**: Use any component type on any page (homepages or content pages)
- **Content Components**: Support for all Strapi content components including:
  - Intro sections with images and forms
  - CTA (Call-to-Action) components
  - Galleries and Slideshows
  - Rich text and media components
  - Forms with custom fields
  - Card groups, buttons, and more

## Installation

```bash
cd /Users/alexvilla/Projects/villa-sites-monorepo/villa-components/strapi-mcp
npm install
```

## Configuration

Create a `.env` file in the project root:

```env
STRAPI_GRAPHQL_ENDPOINT=http://localhost:1337/graphql
STRAPI_API_TOKEN=your_api_token_here
```

**Note:** Despite the variable name being `STRAPI_GRAPHQL_ENDPOINT`, the server now uses the REST API exclusively. The endpoint is automatically converted from `/graphql` to `/api`.

For production, use:
```env
STRAPI_GRAPHQL_ENDPOINT=https://api.villawebsolutions.com/graphql
STRAPI_API_TOKEN=your_production_api_token
```

## Usage

### Running the Server

```bash
npm start
```

Or in development mode with auto-reload:
```bash
npm run dev
```

### Using with Claude Desktop

Add this to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "strapi": {
      "command": "node",
      "args": ["/Users/alexvilla/Projects/villa-sites-monorepo/villa-components/strapi-mcp/src/index.js"],
      "env": {
        "STRAPI_GRAPHQL_ENDPOINT": "http://localhost:1337/graphql",
        "STRAPI_API_TOKEN": "your_api_token_here"
      }
    }
  }
}
```

## Available Tools

### Component Discovery Tools

- `list_component_types`: List all available content components with descriptions and categories
- `get_component_example`: Get a complete JSON example of any component with all available fields

### Website Tools

- `list_websites`: List all websites with optional name filtering
- `get_website`: Get detailed information about a specific website
- `create_website`: Create a new website
- `update_website`: Update website properties and link components
- `delete_website`: Delete a website
- `connect_content_pages`: Connect content pages to a website (adds without removing existing)
- `disconnect_content_pages`: Disconnect content pages from a website (removes relation only)
- `set_content_pages`: Set content pages for a website (replaces all existing relations)

### Content Page Tools

- `list_content_pages`: List content pages with optional filtering
- `get_content_page`: Get detailed page information with all components
- `create_content_page`: Create a new content page
- `update_content_page`: Update page content and properties
- `delete_content_page`: Delete a content page

### Navigation Tools

- `create_navbar`: Create a navigation bar with items and mobile config
- `update_navbar`: Update navigation bar configuration

### Footer Tools

- `create_footer`: Create a footer with content and links
- `update_footer`: Update footer configuration

### Homepage Tools

- `create_homepage`: Create a homepage with content components
- `update_homepage`: Update homepage content

### Site Settings Tools

- `create_site_settings`: Create site settings with color palette
- `update_site_settings`: Update site configuration

## Content Components

**Important**: All content components can be used interchangeably in both homepages and content pages! You're not limited to using "homepage components" only on homepages or "content page components" only on content pages. Mix and match as needed.

Use the `list_component_types` tool to see all available components, and `get_component_example` to get JSON examples with all fields.

### Layout & Hero Components
- **Intro** (`component-home-page-components.intro`): Hero sections with images, text, buttons, and optional forms
- **CTA** (`component-home-page-components.cta`): Call-to-action components with media, rich text, and buttons
- **Slideshow** (`component-home-page-components.slideshow`): Image/video slideshows for mobile and desktop

### Content Components
- **RichText** (`component-home-page-components.rich-text`): Rich text content with styling
- **Media** (`component-home-page-components.media`): Single media assets (images/videos)
- **Gallery** (`component-home-page-components.gallery`): Image galleries
- **Paragraph** (`component-content-page-components.paragraph`): Text content with titles and styling
- **Image** (`component-content-page-components.image`): Images with captions and styling options
- **Video** (`component-content-page-components.video`): Video embeds with controls

### Interactive Components
- **Form** (`component-content-page-components.form`): Custom forms with various field types
- **Buttons** (`component-content-page-components.buttons`): Button groups with styling
- **InstantQuote** (`component-content-page-components.instant-quote`): Quote calculation forms

### Organizational Components
- **CardGroup** (`component-content-page-components.card-group`): Card-based content layouts
- **Grid** (`component-content-page-components.grid`): Grid-based image layouts
- **List** (`component-content-page-components.list`): Bulleted or numbered lists with icons
- **FAQ** (`component-content-page-components.faq`): Frequently asked questions

### Navigation Components
- **TextLink**: Simple text links
- **NavButton**: Styled navigation buttons
- **NavMenu**: Dropdown menus with menu items
- **ImageLink**: Logo/image-based links

### Footer Components
- **Text**: Text content
- **Image**: Footer images/logos
- **Icons**: Social media and other icons with links

## Example Usage

### Creating a Complete Website

```javascript
// 1. Create site settings
{
  "name": "create_site_settings",
  "arguments": {
    "name": "My Site Settings",
    "siteTitle": "My Awesome Website",
    "desktopBreakpoint": "lg",
    "enableLocalization": false,
    "palette": "{\"primary\":\"#007bff\",\"secondary\":\"#6c757d\",\"info\":\"#17a2b8\",\"success\":\"#28a745\",\"warning\":\"#ffc107\"}"
  }
}

// 2. Create navbar
{
  "name": "create_navbar",
  "arguments": {
    "name": "Main Navigation",
    "style": "default",
    "appearance": "light",
    "fontColor": "#333333"
  }
}

// 3. Create footer
{
  "name": "create_footer",
  "arguments": {
    "name": "Main Footer",
    "fontColor": "#ffffff",
    "links": "[{\"text\":\"Privacy Policy\",\"link\":\"/privacy\"},{\"text\":\"Terms of Service\",\"link\":\"/terms\"}]"
  }
}

// 4. Create homepage
{
  "name": "create_homepage",
  "arguments": {
    "pageName": "Home",
    "title": "Welcome to My Website"
  }
}

// 5. Create website and link components
{
  "name": "create_website",
  "arguments": {
    "name": "My Website"
  }
}

// 6. Update website to link all components
{
  "name": "update_website",
  "arguments": {
    "documentId": "website_doc_id",
    "navbarId": "navbar_doc_id",
    "footerId": "footer_doc_id",
    "homepageId": "homepage_doc_id",
    "siteSettingsId": "settings_doc_id"
  }
}

// 7. Create content pages
{
  "name": "create_content_page",
  "arguments": {
    "name": "About Page",
    "link": "/about",
    "title": "About Us"
  }
}

// 8. Connect content pages to website
{
  "name": "connect_content_pages",
  "arguments": {
    "websiteId": "website_doc_id",
    "contentPageIds": ["about_page_id", "services_page_id", "contact_page_id"]
  }
}
```

### Managing Content Page Relations

The server provides three methods for managing content page relations to websites:

**connect_content_pages**: Adds pages to a website without removing existing ones
```javascript
{
  "name": "connect_content_pages",
  "arguments": {
    "websiteId": "website_doc_id",
    "contentPageIds": ["new_page_1", "new_page_2"]
  }
}
```

**disconnect_content_pages**: Removes the relation without deleting the pages
```javascript
{
  "name": "disconnect_content_pages",
  "arguments": {
    "websiteId": "website_doc_id",
    "contentPageIds": ["page_to_remove"]
  }
}
```

**set_content_pages**: Replaces all existing content page relations
```javascript
{
  "name": "set_content_pages",
  "arguments": {
    "websiteId": "website_doc_id",
    "contentPageIds": ["page_1", "page_2", "page_3"]
  }
}
```

### Creating a Content Page with Components

```javascript
// First, discover available components
{
  "name": "list_component_types",
  "arguments": {}
}

// Get an example of a specific component
{
  "name": "get_component_example",
  "arguments": {
    "componentType": "component-content-page-components.paragraph"
  }
}

// Create a content page with mixed components
// Note: Using both "homepage" and "content page" components on a single page!
{
  "name": "create_content_page",
  "arguments": {
    "name": "About Us",
    "link": "/about",
    "title": "About Our Company",
    "content": "[{\"__component\":\"component-home-page-components.intro\",\"IntroText\":\"Welcome to our story\",\"TextPosition\":\"center\",\"Style\":{\"BackgroundColor\":\"#f8f9fa\",\"paddingTop\":60,\"paddingBottom\":60}},{\"__component\":\"component-content-page-components.paragraph\",\"Title\":\"Our History\",\"Body\":\"Founded in 2010, we've been serving our community...\",\"Style\":{\"BackgroundColor\":\"#ffffff\",\"textAlign\":\"left\",\"paddingTop\":40,\"paddingBottom\":40}},{\"__component\":\"component-content-page-components.card-group\",\"Title\":\"Our Team\",\"Cards\":[{\"Title\":\"John Doe\",\"Text\":\"CEO & Founder\",\"CardStyle\":\"outlined\"}],\"Style\":{\"paddingTop\":40,\"paddingBottom\":40}},{\"__component\":\"component-home-page-components.cta\",\"Title\":\"Ready to Work Together?\",\"buttons\":[{\"Text\":\"Contact Us\",\"Link\":\"/contact\",\"ButtonColor\":\"#007bff\"}],\"Style\":{\"BackgroundColor\":\"#e9ecef\",\"paddingTop\":50,\"paddingBottom\":50}}]"
  }
}
```

### Creating a Homepage with Mixed Components

```javascript
// Create a homepage using both homepage AND content page components
{
  "name": "create_homepage",
  "arguments": {
    "pageName": "Home",
    "title": "Welcome to Our Website",
    "content": "[{\"__component\":\"component-home-page-components.slideshow\",\"Title\":\"Hero Slideshow\",\"uuid\":\"hero-slides\",\"Style\":{\"paddingTop\":0,\"paddingBottom\":0}},{\"__component\":\"component-content-page-components.paragraph\",\"Title\":\"About Our Services\",\"Body\":\"We provide exceptional services to our clients...\",\"Style\":{\"BackgroundColor\":\"#ffffff\",\"paddingTop\":40,\"paddingBottom\":40}},{\"__component\":\"component-content-page-components.card-group\",\"Title\":\"What We Offer\",\"fullWidth\":false,\"Cards\":[{\"Title\":\"Service 1\",\"ButtonText\":\"Learn More\",\"Link\":\"/services/1\"}],\"Style\":{\"paddingTop\":40,\"paddingBottom\":40}},{\"__component\":\"component-content-page-components.faq\",\"Title\":\"Common Questions\",\"Entry\":[{\"Title\":\"How do I get started?\",\"Body\":\"Simply contact us via our form...\"}],\"Style\":{\"BackgroundColor\":\"#f8f9fa\",\"paddingTop\":40,\"paddingBottom\":40}},{\"__component\":\"component-home-page-components.cta\",\"Title\":\"Get Started Today\",\"buttons\":[{\"Text\":\"Sign Up\",\"Link\":\"/signup\",\"ButtonColor\":\"#28a745\"}]}]"
  }
}
```

## GraphQL Schema

The server uses the Strapi GraphQL API with the following main types:

- `Website`: Main website entity with relations to navbar, footer, homepage, and settings
- `ContentPage`: Individual pages with dynamic content components
- `WebsiteNavbar`: Navigation configuration
- `WebsiteFooter`: Footer configuration
- `WebsiteHomepage`: Homepage with content components
- `WebsiteSetting`: Site-wide settings and color palette

## Development

The server is built using:
- **@modelcontextprotocol/sdk**: MCP server implementation
- **graphql-request**: GraphQL client for Strapi API
- **dotenv**: Environment variable management

## Troubleshooting

### Connection Issues

If you encounter connection issues:
1. Verify Strapi is running and accessible
2. Check the GraphQL endpoint URL in `.env`
3. Verify the API token has proper permissions

### Authentication Errors

Ensure your Strapi API token has the following permissions:
- Read/Write access to Website, ContentPage, WebsiteNavbar, WebsiteFooter, WebsiteHomepage, WebsiteSetting
- Access to upload files if using media components

### JSON Parsing Errors

When passing content components, ensure JSON strings are properly formatted and escaped. Use online JSON validators to verify syntax.

## Additional Documentation

- **[Component Usage Guide](./COMPONENT_GUIDE.md)**: Comprehensive guide with examples for all component types, styling options, and best practices
- Use `list_component_types` and `get_component_example` tools for interactive component discovery

## License

MIT

## Support

For issues and questions, please contact Villa Web Solutions.
