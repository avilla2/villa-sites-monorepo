#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import {
  CallToolRequestSchema,
  ListToolsRequestSchema
} from '@modelcontextprotocol/sdk/types.js'
import dotenv from 'dotenv'
import { StrapiRESTClient } from './rest-client.js'

// Load environment variables
dotenv.config()

const STRAPI_GRAPHQL_ENDPOINT = process.env.STRAPI_GRAPHQL_ENDPOINT || 'http://localhost:1337/graphql'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || ''

// Initialize REST client
const strapiClient = new StrapiRESTClient(STRAPI_GRAPHQL_ENDPOINT, STRAPI_API_TOKEN)

// Component type reference
const COMPONENT_TYPES = {
  // Layout & Hero Components (usable on both homepages and content pages)
  'component-home-page-components.intro': 'Hero section with image/video, text, buttons, and optional form fields',
  'component-home-page-components.cta': 'Call-to-action with media, rich text content, and buttons',
  'component-home-page-components.slideshow': 'Image/video slideshow with separate mobile and desktop slides',

  // Content Components (usable on both homepages and content pages)
  'component-home-page-components.rich-text': 'Rich text editor content with styling options',
  'component-home-page-components.media': 'Single media asset (image or video)',
  'component-home-page-components.gallery': 'Image gallery grid',
  'component-content-page-components.paragraph': 'Text paragraph with title and styling',
  'component-content-page-components.image': 'Single image with caption and styling options',
  'component-content-page-components.video': 'Video player with controls (autoplay, loop, muted)',

  // Interactive Components (usable on both homepages and content pages)
  'component-content-page-components.form': 'Custom form with configurable fields and email settings',
  'component-content-page-components.buttons': 'Group of styled buttons with links',
  'component-content-page-components.instant-quote': 'Quote calculator form with job types and pricing',

  // Organizational Components (usable on both homepages and content pages)
  'component-content-page-components.card-group': 'Grid of cards with images, text, and optional buttons',
  'component-content-page-components.grid': 'Image grid with captions',
  'component-content-page-components.list': 'Bulleted or numbered list with optional icons',
  'component-content-page-components.faq': 'Accordion-style FAQ with questions and answers'
}

// Tool definitions
const TOOLS = [
  // Component reference tool
  {
    name: 'list_component_types',
    description: 'List all available content component types that can be used in homepages and content pages. Components can be used interchangeably between homepages and content pages.',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          description: 'Filter by component category: layout, content, interactive, or organizational',
          enum: ['layout', 'content', 'interactive', 'organizational', 'all']
        }
      }
    }
  },
  {
    name: 'get_component_example',
    description: 'Get a JSON example of a specific component type with all available fields and typical values.',
    inputSchema: {
      type: 'object',
      properties: {
        componentType: {
          type: 'string',
          description: 'The component type (e.g., "component-home-page-components.intro")'
        }
      },
      required: ['componentType']
    }
  },
  // Website tools
  {
    name: 'list_websites',
    description: 'List all websites in Strapi. Optionally filter by name or other criteria.',
    inputSchema: {
      type: 'object',
      properties: {
        nameFilter: {
          type: 'string',
          description: 'Filter websites by name (partial match)'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return',
          default: 25
        }
      }
    }
  },
  {
    name: 'get_website',
    description: 'Get detailed information about a specific website including navbar, footer, homepage, site settings, and content pages.',
    inputSchema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          description: 'The document ID of the website'
        }
      },
      required: ['documentId']
    }
  },
  {
    name: 'create_website',
    description: 'Create a new website in Strapi with the specified name.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the website'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'update_website',
    description: 'Update an existing website. Can update name and link to navbar, footer, homepage, or site_settings.',
    inputSchema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          description: 'The document ID of the website to update'
        },
        name: {
          type: 'string',
          description: 'New name for the website'
        },
        navbarId: {
          type: 'string',
          description: 'Document ID of the navbar to link'
        },
        footerId: {
          type: 'string',
          description: 'Document ID of the footer to link'
        },
        homepageId: {
          type: 'string',
          description: 'Document ID of the homepage to link'
        },
        siteSettingsId: {
          type: 'string',
          description: 'Document ID of the site settings to link'
        }
      },
      required: ['documentId']
    }
  },
  {
    name: 'delete_website',
    description: 'Delete a website from Strapi.',
    inputSchema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          description: 'The document ID of the website to delete'
        }
      },
      required: ['documentId']
    }
  },
  {
    name: 'connect_content_pages',
    description: 'Connect content pages to a website. This adds pages to the website without removing existing ones.',
    inputSchema: {
      type: 'object',
      properties: {
        websiteId: {
          type: 'string',
          description: 'The document ID of the website'
        },
        contentPageIds: {
          type: 'array',
          description: 'Array of content page document IDs to connect to the website',
          items: {
            type: 'string'
          }
        }
      },
      required: ['websiteId', 'contentPageIds']
    }
  },
  {
    name: 'disconnect_content_pages',
    description: 'Disconnect content pages from a website. This removes the relation but does not delete the pages.',
    inputSchema: {
      type: 'object',
      properties: {
        websiteId: {
          type: 'string',
          description: 'The document ID of the website'
        },
        contentPageIds: {
          type: 'array',
          description: 'Array of content page document IDs to disconnect from the website',
          items: {
            type: 'string'
          }
        }
      },
      required: ['websiteId', 'contentPageIds']
    }
  },
  {
    name: 'set_content_pages',
    description: 'Set content pages for a website. This replaces all existing content page relations with the new ones.',
    inputSchema: {
      type: 'object',
      properties: {
        websiteId: {
          type: 'string',
          description: 'The document ID of the website'
        },
        contentPageIds: {
          type: 'array',
          description: 'Array of content page document IDs to set as the website\'s content pages',
          items: {
            type: 'string'
          }
        }
      },
      required: ['websiteId', 'contentPageIds']
    }
  },

  // Content Page tools
  {
    name: 'list_content_pages',
    description: 'List all content pages. Optionally filter by website.',
    inputSchema: {
      type: 'object',
      properties: {
        websiteId: {
          type: 'string',
          description: 'Filter pages by website document ID'
        },
        nameFilter: {
          type: 'string',
          description: 'Filter pages by name (partial match)'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of results to return',
          default: 25
        }
      }
    }
  },
  {
    name: 'get_content_page',
    description: 'Get detailed information about a specific content page including all content components.',
    inputSchema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          description: 'The document ID of the content page'
        }
      },
      required: ['documentId']
    }
  },
  {
    name: 'create_content_page',
    description: 'Create a new content page with name, link, title, and optional content components. Content pages can use any component type from homepages or content pages.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The internal name of the page'
        },
        link: {
          type: 'string',
          description: 'The URL path for the page (e.g., "/about")'
        },
        title: {
          type: 'string',
          description: 'The page title'
        },
        content: {
          type: 'string',
          description: 'JSON string array of content components. Use list_component_types to see available components. Components can include intro, cta, slideshow, rich-text, media, gallery, paragraph, image, video, form, buttons, card-group, grid, list, faq, instant-quote.'
        }
      },
      required: ['name', 'link']
    }
  },
  {
    name: 'update_content_page',
    description: 'Update an existing content page. Can update name, link, title, and content components. All component types are available.',
    inputSchema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          description: 'The document ID of the content page to update'
        },
        name: {
          type: 'string',
          description: 'New name for the page'
        },
        link: {
          type: 'string',
          description: 'New URL path for the page'
        },
        title: {
          type: 'string',
          description: 'New page title'
        },
        content: {
          type: 'string',
          description: 'JSON string array of content components to replace existing content. Use list_component_types and get_component_example for help.'
        }
      },
      required: ['documentId']
    }
  },
  {
    name: 'delete_content_page',
    description: 'Delete a content page from Strapi.',
    inputSchema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          description: 'The document ID of the content page to delete'
        }
      },
      required: ['documentId']
    }
  },

  // Navbar tools
  {
    name: 'create_navbar',
    description: 'Create a new navbar with configuration for style, appearance, items, and mobile config.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the navbar'
        },
        style: {
          type: 'string',
          description: 'Navbar style (e.g., "default", "minimal")'
        },
        appearance: {
          type: 'string',
          description: 'Navbar appearance (e.g., "light", "dark")'
        },
        fontColor: {
          type: 'string',
          description: 'Font color for navbar text'
        },
        items: {
          type: 'string',
          description: 'JSON string of navbar items (dynamic zone with TextLink, NavButton, NavMenu, ImageLink)'
        },
        mobileConfig: {
          type: 'string',
          description: 'JSON string of mobile configuration'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'update_navbar',
    description: 'Update an existing navbar configuration.',
    inputSchema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          description: 'The document ID of the navbar to update'
        },
        name: {
          type: 'string',
          description: 'New name for the navbar'
        },
        style: {
          type: 'string',
          description: 'New navbar style'
        },
        appearance: {
          type: 'string',
          description: 'New navbar appearance'
        },
        fontColor: {
          type: 'string',
          description: 'New font color'
        },
        items: {
          type: 'string',
          description: 'JSON string of navbar items to replace existing items'
        },
        mobileConfig: {
          type: 'string',
          description: 'JSON string of mobile configuration'
        }
      },
      required: ['documentId']
    }
  },

  // Footer tools
  {
    name: 'create_footer',
    description: 'Create a new footer with content components and links.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the footer'
        },
        fontColor: {
          type: 'string',
          description: 'Font color for footer text'
        },
        content: {
          type: 'string',
          description: 'JSON string of footer content (dynamic zone with Text, Image, Icons)'
        },
        links: {
          type: 'string',
          description: 'JSON string of footer links (array of {text, link})'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'update_footer',
    description: 'Update an existing footer configuration.',
    inputSchema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          description: 'The document ID of the footer to update'
        },
        name: {
          type: 'string',
          description: 'New name for the footer'
        },
        fontColor: {
          type: 'string',
          description: 'New font color'
        },
        content: {
          type: 'string',
          description: 'JSON string of footer content'
        },
        links: {
          type: 'string',
          description: 'JSON string of footer links'
        }
      },
      required: ['documentId']
    }
  },

  // Homepage tools
  {
    name: 'create_homepage',
    description: 'Create a new homepage with page name, title, and content components. Homepages can use any component type from homepages or content pages.',
    inputSchema: {
      type: 'object',
      properties: {
        pageName: {
          type: 'string',
          description: 'The internal page name'
        },
        title: {
          type: 'string',
          description: 'The homepage title'
        },
        content: {
          type: 'string',
          description: 'JSON string array of content components. Use list_component_types to see all available components. Can include intro, cta, slideshow, gallery, rich-text, media, paragraph, image, video, form, buttons, card-group, grid, list, faq, instant-quote.'
        }
      },
      required: ['pageName', 'title']
    }
  },
  {
    name: 'update_homepage',
    description: 'Update an existing homepage configuration. All component types from both homepages and content pages are available.',
    inputSchema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          description: 'The document ID of the homepage to update'
        },
        pageName: {
          type: 'string',
          description: 'New page name'
        },
        title: {
          type: 'string',
          description: 'New title'
        },
        content: {
          type: 'string',
          description: 'JSON string array of content components. Use list_component_types and get_component_example for reference.'
        }
      },
      required: ['documentId']
    }
  },

  // Site Settings tools
  {
    name: 'create_site_settings',
    description: 'Create site settings with color palette, desktop breakpoint, and localization settings.',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the site settings'
        },
        siteTitle: {
          type: 'string',
          description: 'The site title'
        },
        desktopBreakpoint: {
          type: 'string',
          description: 'Desktop breakpoint (e.g., "lg", "md", "xl")'
        },
        enableLocalization: {
          type: 'boolean',
          description: 'Enable localization for the site'
        },
        palette: {
          type: 'string',
          description: 'JSON string of color palette {primary, secondary, info, success, warning}'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'update_site_settings',
    description: 'Update existing site settings.',
    inputSchema: {
      type: 'object',
      properties: {
        documentId: {
          type: 'string',
          description: 'The document ID of the site settings to update'
        },
        name: {
          type: 'string',
          description: 'New name'
        },
        siteTitle: {
          type: 'string',
          description: 'New site title'
        },
        desktopBreakpoint: {
          type: 'string',
          description: 'New desktop breakpoint'
        },
        enableLocalization: {
          type: 'boolean',
          description: 'Enable/disable localization'
        },
        palette: {
          type: 'string',
          description: 'JSON string of color palette'
        }
      },
      required: ['documentId']
    }
  }
]

// Component examples with all fields
const COMPONENT_EXAMPLES = {
  'component-home-page-components.intro': {
    __component: 'component-home-page-components.intro',
    IntroText: 'Welcome to our website',
    TextPosition: 'left', // or 'right', 'center'
    Buttons: [
      { Text: 'Get Started', Link: '/contact', ButtonColor: '#007bff' }
    ],
    FormFields: [
      { name: 'email', label: 'Email', type: 'email', validation: 'required' }
    ],
    FormData: {
      SendFrom: 'noreply@example.com',
      SendTo: 'contact@example.com',
      BodyTitle: 'New Contact Form Submission'
    },
    Style: {
      BackgroundColor: '#f8f9fa',
      TextColor: '#333333',
      paddingTop: 40,
      paddingBottom: 40
    }
  },
  'component-home-page-components.cta': {
    __component: 'component-home-page-components.cta',
    Title: 'Call to Action Title',
    content: { /* Rich text JSON */ },
    justify: 'center', // 'left', 'right', 'center'
    variant: 'default', // 'default', 'outlined', 'contained'
    reversed: false,
    buttons: [
      { Text: 'Learn More', Link: '/about', ButtonColor: '#28a745' }
    ],
    Style: {
      BackgroundColor: '#ffffff',
      paddingTop: 30,
      paddingBottom: 30
    }
  },
  'component-home-page-components.slideshow': {
    __component: 'component-home-page-components.slideshow',
    Title: 'Our Gallery',
    uuid: 'unique-id-here',
    Style: {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  'component-home-page-components.gallery': {
    __component: 'component-home-page-components.gallery',
    Title: 'Photo Gallery',
    Style: {
      BackgroundColor: '#f5f5f5',
      paddingTop: 30,
      paddingBottom: 30
    }
  },
  'component-home-page-components.rich-text': {
    __component: 'component-home-page-components.rich-text',
    Title: 'About Us',
    RichText: { /* Rich text JSON structure */ },
    Style: {
      BackgroundColor: '#ffffff',
      TextColor: '#333333',
      textAlign: 'left',
      paddingTop: 20,
      paddingBottom: 20
    }
  },
  'component-home-page-components.media': {
    __component: 'component-home-page-components.media',
    Title: 'Featured Media',
    Style: {
      paddingTop: 20,
      paddingBottom: 20
    }
  },
  'component-content-page-components.paragraph': {
    __component: 'component-content-page-components.paragraph',
    Title: 'Section Title',
    Body: 'Paragraph content goes here...',
    Style: {
      BackgroundColor: '#ffffff',
      TextColor: '#333333',
      textAlign: 'left',
      paddingTop: 20,
      paddingBottom: 20
    }
  },
  'component-content-page-components.image': {
    __component: 'component-content-page-components.image',
    width: 800,
    height: 600,
    imageStyle: 'cover', // 'cover', 'contain', 'fill'
    caption: 'Image caption',
    captionLocation: 'bottom', // 'top', 'bottom', 'overlay'
    Style: {
      paddingTop: 15,
      paddingBottom: 15
    }
  },
  'component-content-page-components.video': {
    __component: 'component-content-page-components.video',
    width: 800,
    caption: 'Video description',
    autoplay: false,
    loop: false,
    muted: false,
    controls: true,
    Style: {
      paddingTop: 20,
      paddingBottom: 20
    }
  },
  'component-content-page-components.form': {
    __component: 'component-content-page-components.form',
    Title: 'Contact Us',
    bodyTitle: 'New Form Submission',
    sendTo: 'contact@example.com',
    sendFrom: 'noreply@example.com',
    formFields: [
      { name: 'name', label: 'Name', type: 'text', validation: 'required', fullWidth: true },
      { name: 'email', label: 'Email', type: 'email', validation: 'required|email', fullWidth: true },
      { name: 'message', label: 'Message', type: 'textarea', validation: 'required', fullWidth: true }
    ],
    Style: {
      BackgroundColor: '#f8f9fa',
      paddingTop: 30,
      paddingBottom: 30
    }
  },
  'component-content-page-components.buttons': {
    __component: 'component-content-page-components.buttons',
    ButtonStyle: 'contained', // 'contained', 'outlined', 'text'
    ButtonArrangement: 'center', // 'left', 'center', 'right', 'space-between'
    Entry: [
      { Text: 'Primary Action', Link: '/action', ButtonColor: '#007bff' },
      { Text: 'Secondary Action', Link: '/other', ButtonColor: '#6c757d' }
    ],
    Style: {
      paddingTop: 20,
      paddingBottom: 20
    }
  },
  'component-content-page-components.card-group': {
    __component: 'component-content-page-components.card-group',
    Title: 'Our Services',
    fullWidth: false,
    Cards: [
      {
        Title: 'Service 1',
        Text: { /* Rich text JSON */ },
        CardStyle: 'outlined', // 'outlined', 'elevation'
        ButtonText: 'Learn More',
        ButtonColor: '#007bff',
        CardColor: '#ffffff',
        TextColor: '#333333',
        Link: '/service-1'
      }
    ],
    Style: {
      BackgroundColor: '#f5f5f5',
      paddingTop: 40,
      paddingBottom: 40
    }
  },
  'component-content-page-components.grid': {
    __component: 'component-content-page-components.grid',
    Title: 'Image Grid',
    Entry: [
      { Caption: 'Image 1 caption' },
      { Caption: 'Image 2 caption' }
    ],
    Style: {
      paddingTop: 30,
      paddingBottom: 30
    }
  },
  'component-content-page-components.list': {
    __component: 'component-content-page-components.list',
    Title: 'Features',
    Caption: { /* Rich text JSON for intro text */ },
    Items: [
      { Text: 'First item' },
      { Text: 'Second item' },
      { Text: 'Third item' }
    ],
    Style: {
      BackgroundColor: '#ffffff',
      paddingTop: 25,
      paddingBottom: 25
    }
  },
  'component-content-page-components.faq': {
    __component: 'component-content-page-components.faq',
    Title: 'Frequently Asked Questions',
    Entry: [
      { Title: 'Question 1?', Body: 'Answer to question 1...' },
      { Title: 'Question 2?', Body: 'Answer to question 2...' }
    ],
    Style: {
      BackgroundColor: '#f8f9fa',
      paddingTop: 30,
      paddingBottom: 30
    }
  },
  'component-content-page-components.instant-quote': {
    __component: 'component-content-page-components.instant-quote',
    Title: 'Get a Quote',
    ButtonStyle: 'contained',
    ButtonColor: '#28a745',
    ButtonText: 'Calculate Quote',
    SendTo: 'quotes@example.com',
    SendFrom: 'noreply@example.com',
    Entry: [
      { JobType: 'Basic Service', PricePer: 50, PriceMinimum: 100 },
      { JobType: 'Premium Service', PricePer: 75, PriceMinimum: 150 }
    ],
    Style: {
      BackgroundColor: '#ffffff',
      paddingTop: 35,
      paddingBottom: 35
    }
  }
}

// Tool handlers
const toolHandlers = {
  // Component documentation handlers
  async list_component_types (args) {
    const category = args.category || 'all'
    let components = { ...COMPONENT_TYPES }

    if (category !== 'all') {
      const filtered = {}
      const categoryMap = {
        layout: ['intro', 'cta', 'slideshow'],
        content: ['rich-text', 'media', 'gallery', 'paragraph', 'image', 'video'],
        interactive: ['form', 'buttons', 'instant-quote'],
        organizational: ['card-group', 'grid', 'list', 'faq']
      }

      Object.keys(components).forEach(key => {
        const componentName = key.split('.')[1]
        if (categoryMap[category]?.some(c => componentName.includes(c))) {
          filtered[key] = components[key]
        }
      })
      components = filtered
    }

    const formatted = Object.entries(components).map(([type, desc]) => ({
      componentType: type,
      description: desc
    }))

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          note: 'All components can be used in both homepages and content pages',
          components: formatted
        }, null, 2)
      }]
    }
  },

  async get_component_example (args) {
    const example = COMPONENT_EXAMPLES[args.componentType]

    if (!example) {
      return {
        content: [{
          type: 'text',
          text: `Component type "${args.componentType}" not found. Use list_component_types to see available components.`
        }],
        isError: true
      }
    }

    return {
      content: [{
        type: 'text',
        text: JSON.stringify({
          componentType: args.componentType,
          description: COMPONENT_TYPES[args.componentType],
          example,
          usage: 'Include this object in the Content array when creating or updating pages'
        }, null, 2)
      }]
    }
  },

  // Website handlers
  async list_websites (args) {
    const filters = {}
    if (args.nameFilter) {
      filters.name = args.nameFilter
    }

    const result = await strapiClient.listWebsites(filters, {
      limit: args.limit || 25
    })

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result.data, null, 2)
      }]
    }
  },

  async get_website (args) {
    const result = await strapiClient.getWebsite(args.documentId)

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result.data, null, 2)
      }]
    }
  },

  async create_website (args) {
    const data = { name: args.name }
    const result = await strapiClient.createWebsite(data)

    return {
      content: [{
        type: 'text',
        text: `Website created successfully with ID: ${result.data.documentId}`
      }]
    }
  },

  async update_website (args) {
    const data = {}
    if (args.name) data.name = args.name
    if (args.navbarId) data.navbar = args.navbarId
    if (args.footerId) data.footer = args.footerId
    if (args.homepageId) data.homepage = args.homepageId
    if (args.siteSettingsId) data.site_settings = args.siteSettingsId

    const result = await strapiClient.updateWebsite(args.documentId, data)

    return {
      content: [{
        type: 'text',
        text: `Website updated successfully: ${result.data.name}`
      }]
    }
  },

  async delete_website (args) {
    await strapiClient.deleteWebsite(args.documentId)

    return {
      content: [{
        type: 'text',
        text: 'Website deleted successfully'
      }]
    }
  },

  async connect_content_pages (args) {
    await strapiClient.connectContentPages(args.websiteId, args.contentPageIds)

    return {
      content: [{
        type: 'text',
        text: `Successfully connected ${args.contentPageIds.length} content page(s) to website`
      }]
    }
  },

  async disconnect_content_pages (args) {
    await strapiClient.disconnectContentPages(args.websiteId, args.contentPageIds)

    return {
      content: [{
        type: 'text',
        text: `Successfully disconnected ${args.contentPageIds.length} content page(s) from website`
      }]
    }
  },

  async set_content_pages (args) {
    await strapiClient.setContentPages(args.websiteId, args.contentPageIds)

    return {
      content: [{
        type: 'text',
        text: `Successfully set ${args.contentPageIds.length} content page(s) for website`
      }]
    }
  },

  // Content Page handlers
  async list_content_pages (args) {
    const filters = {}
    if (args.websiteId) {
      filters.website = { documentId: { eq: args.websiteId } }
    }
    if (args.nameFilter) {
      filters.Name = args.nameFilter
    }

    const result = await strapiClient.listContentPages(filters, {
      limit: args.limit || 25
    })

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result.data, null, 2)
      }]
    }
  },

  async get_content_page (args) {
    const result = await strapiClient.getContentPage(args.documentId)

    return {
      content: [{
        type: 'text',
        text: JSON.stringify(result.data, null, 2)
      }]
    }
  },

  async create_content_page (args) {
    const data = {
      Name: args.name,
      Link: args.link
    }
    if (args.title) data.Title = args.title
    if (args.content) {
      data.Content = JSON.parse(args.content)
    }

    const result = await strapiClient.createContentPage(data)

    return {
      content: [{
        type: 'text',
        text: `Content page created successfully with ID: ${result.data.documentId}`
      }]
    }
  },

  async update_content_page (args) {
    const data = {}
    if (args.name) data.Name = args.name
    if (args.link) data.Link = args.link
    if (args.title) data.Title = args.title
    if (args.content) {
      data.Content = JSON.parse(args.content)
    }

    const result = await strapiClient.updateContentPage(args.documentId, data)

    return {
      content: [{
        type: 'text',
        text: `Content page updated successfully: ${result.data.Name}`
      }]
    }
  },

  async delete_content_page (args) {
    await strapiClient.deleteContentPage(args.documentId)

    return {
      content: [{
        type: 'text',
        text: 'Content page deleted successfully'
      }]
    }
  },

  // Navbar handlers
  async create_navbar (args) {
    const data = { Name: args.name }
    if (args.style) data.Style = args.style
    if (args.appearance) data.Appearance = args.appearance
    if (args.fontColor) data.FontColor = args.fontColor
    if (args.items) data.Items = JSON.parse(args.items)
    if (args.mobileConfig) data.MobileConfig = JSON.parse(args.mobileConfig)

    const result = await strapiClient.createNavbar(data)

    return {
      content: [{
        type: 'text',
        text: `Navbar created successfully with ID: ${result.data.documentId}`
      }]
    }
  },

  async update_navbar (args) {
    const data = {}
    if (args.name) data.Name = args.name
    if (args.style) data.Style = args.style
    if (args.appearance) data.Appearance = args.appearance
    if (args.fontColor) data.FontColor = args.fontColor
    if (args.items) data.Items = JSON.parse(args.items)
    if (args.mobileConfig) data.MobileConfig = JSON.parse(args.mobileConfig)

    const result = await strapiClient.updateNavbar(args.documentId, data)

    return {
      content: [{
        type: 'text',
        text: `Navbar updated successfully: ${result.data.Name}`
      }]
    }
  },

  // Footer handlers
  async create_footer (args) {
    const data = { Name: args.name }
    if (args.fontColor) data.FontColor = args.fontColor
    if (args.content) data.Content = JSON.parse(args.content)
    if (args.links) data.links = JSON.parse(args.links)

    const result = await strapiClient.createFooter(data)

    return {
      content: [{
        type: 'text',
        text: `Footer created successfully with ID: ${result.data.documentId}`
      }]
    }
  },

  async update_footer (args) {
    const data = {}
    if (args.name) data.Name = args.name
    if (args.fontColor) data.FontColor = args.fontColor
    if (args.content) data.Content = JSON.parse(args.content)
    if (args.links) data.links = JSON.parse(args.links)

    const result = await strapiClient.updateFooter(args.documentId, data)

    return {
      content: [{
        type: 'text',
        text: `Footer updated successfully: ${result.data.Name}`
      }]
    }
  },

  // Homepage handlers
  async create_homepage (args) {
    const data = {
      PageName: args.pageName,
      Title: args.title
    }
    if (args.content) data.Content = JSON.parse(args.content)

    const result = await strapiClient.createHomepage(data)

    return {
      content: [{
        type: 'text',
        text: `Homepage created successfully with ID: ${result.data.documentId}`
      }]
    }
  },

  async update_homepage (args) {
    const data = {}
    if (args.pageName) data.PageName = args.pageName
    if (args.title) data.Title = args.title
    if (args.content) data.Content = JSON.parse(args.content)

    const result = await strapiClient.updateHomepage(args.documentId, data)

    return {
      content: [{
        type: 'text',
        text: `Homepage updated successfully: ${result.data.PageName}`
      }]
    }
  },

  // Site Settings handlers
  async create_site_settings (args) {
    const data = { Name: args.name }
    if (args.siteTitle) data.SiteTitle = args.siteTitle
    if (args.desktopBreakpoint) data.DesktopBreakpoint = args.desktopBreakpoint
    if (args.enableLocalization !== undefined) data.EnableLocalization = args.enableLocalization
    if (args.palette) data.Palette = JSON.parse(args.palette)

    const result = await strapiClient.createSiteSettings(data)

    return {
      content: [{
        type: 'text',
        text: `Site settings created successfully with ID: ${result.data.documentId}`
      }]
    }
  },

  async update_site_settings (args) {
    const data = {}
    if (args.name) data.Name = args.name
    if (args.siteTitle) data.SiteTitle = args.siteTitle
    if (args.desktopBreakpoint) data.DesktopBreakpoint = args.desktopBreakpoint
    if (args.enableLocalization !== undefined) data.EnableLocalization = args.enableLocalization
    if (args.palette) data.Palette = JSON.parse(args.palette)

    const result = await strapiClient.updateSiteSettings(args.documentId, data)

    return {
      content: [{
        type: 'text',
        text: `Site settings updated successfully: ${result.data.Name}`
      }]
    }
  }
}

// Create MCP server
const server = new Server(
  {
    name: 'strapi-mcp-server',
    version: '1.0.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
)

// Handle list_tools request
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: TOOLS
  }
})

// Handle call_tool request
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    const handler = toolHandlers[name]
    if (!handler) {
      throw new Error(`Unknown tool: ${name}`)
    }

    return await handler(args || {})
  } catch (error) {
    return {
      content: [{
        type: 'text',
        text: `Error: ${error.message}`
      }],
      isError: true
    }
  }
})

// Start the server
async function main () {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Strapi MCP Server running on stdio')
}

main().catch((error) => {
  console.error('Fatal error:', error)
  process.exit(1)
})
