/**
 * @typedef {Object} Palette
 * @property {string} primary - Primary color for the theme
 * @property {string} success - Success color for the theme
 * @property {string} secondary - Secondary color for the theme
 * @property {string} warning - Warning color for the theme
 * @property {string} info - Info color for the theme
 */

/**
 * @typedef {Object} SiteSettings
 * @property {number} DesktopBreakpoint - The breakpoint width for desktop layout
 * @property {boolean} EnableLocalization - Whether multi-language support is enabled
 * @property {string} SiteTitle - The main title of the website
 * @property {Palette} Palette - Color palette configuration
 */

/**
 * @typedef {Object} FileData
 * @property {string} mime - MIME type of the file
 * @property {string} url - URL to the file
 * @property {number} width - Width of the file (for images/videos)
 * @property {string} alternativeText - Alternative text for accessibility
 */

/**
 * @typedef {Object} ComponentStyle
 * @property {string} BackgroundColor - Background color value
 * @property {string} Animation - Animation effect name
 * @property {string} TextColor - Text color value
 * @property {string} textAlign - Text alignment (left, center, right, justify)
 * @property {string} size - Size specification
 * @property {string} paddingTop - Top padding value
 * @property {string} paddingBottom - Bottom padding value
 */

/**
 * @typedef {Object} Button
 * @property {string} Text - Button display text
 * @property {string} Link - Button target link
 * @property {string} ButtonColor - Button color value
 */

/**
 * @typedef {Object} FormField
 * @property {string} name - Field name/identifier
 * @property {string} validation - Validation rule (e.g., required, email)
 * @property {string} label - Display label for the field
 * @property {string} type - Input type (text, email, number, etc.)
 * @property {boolean} includeInSubjectLine - Whether to include in email subject
 * @property {boolean} fullWidth - Whether field spans full width
 */

/**
 * @typedef {Object} FormData
 * @property {string} SendTo - Email address to send form submissions to
 * @property {string} SendFrom - Email address to send from
 * @property {string} BodyTitle - Title for the email body
 */

/**
 * @typedef {Object} IntroComponent
 * @property {string} __typename - Always 'ComponentHomePageComponentsIntro'
 * @property {ComponentStyle} Style - Component styling
 * @property {FileData} File - Main file/image
 * @property {string} IntroText - Introductory text content
 * @property {string} TextPosition - Position of text (left, right, center, etc.)
 * @property {FileData} MobileFile - Mobile-specific image/file
 * @property {Button[]} Buttons - Array of buttons
 * @property {FormData} FormData - Form configuration
 * @property {FormField[]} FormFields - Form field definitions
 */

/**
 * @typedef {Object} Image
 * @property {string} url - Image URL
 * @property {number} width - Image width
 * @property {string} alternativeText - Alternative text for accessibility
 */

/**
 * @typedef {Object} GalleryComponent
 * @property {string} __typename - Always 'ComponentHomePageComponentsGallery'
 * @property {string} Title - Gallery title
 * @property {ComponentStyle} Style - Component styling
 * @property {Image[]} Pictures - Array of images in gallery
 */

/**
 * @typedef {Object} PdfContent
 * @property {string} __typename - Always 'ComponentAssetComponentsPdf'
 * @property {Object} File - PDF file information
 * @property {string} File.url - URL to the PDF
 * @property {number} File.width - Document width
 */

/**
 * @typedef {Object} VideoContent
 * @property {string} __typename - Always 'ComponentAssetComponentsVideo'
 * @property {boolean} Autoplay - Whether video auto-plays
 * @property {boolean} Loop - Whether video loops
 * @property {boolean} Muted - Whether video is muted
 * @property {number} Width - Video width
 * @property {boolean} Controls - Whether controls are shown
 * @property {Object} File - Video file information
 * @property {string} File.url - URL to the video
 * @property {number} File.width - Video width
 */

/**
 * @typedef {Object} ImageAssetContent
 * @property {string} __typename - Always 'ComponentAssetComponentsImage'
 * @property {string} Style - Image style
 * @property {number} Width - Image width
 * @property {number} Height - Image height
 * @property {Object} File - Image file information
 * @property {string} File.url - URL to the image
 * @property {number} File.width - Image width
 * @property {string} File.alternativeText - Alternative text
 */

/**
 * @typedef {Object} Asset
 * @property {string} Name - Asset name
 * @property {string} Caption - Asset caption/description
 * @property {(PdfContent|VideoContent|ImageAssetContent)} Content - Asset content (union type)
 */

/**
 * @typedef {Object} MediaComponent
 * @property {string} __typename - Always 'ComponentHomePageComponentsMedia'
 * @property {string} Title - Media component title
 * @property {ComponentStyle} Style - Component styling
 * @property {Asset} asset - Media asset
 */

/**
 * @typedef {Object} ParagraphComponent
 * @property {string} __typename - Always 'ComponentContentPageComponentsParagraph'
 * @property {string} Title - Paragraph title
 * @property {ComponentStyle} Style - Component styling
 * @property {string} Body - Paragraph content
 */

/**
 * @typedef {Object} FaqEntry
 * @property {string} Title - Question title
 * @property {string} Body - Answer body
 */

/**
 * @typedef {Object} FaqComponent
 * @property {string} __typename - Always 'ComponentContentPageComponentsFaq'
 * @property {string} Title - FAQ section title
 * @property {ComponentStyle} Style - Component styling
 * @property {FaqEntry[]} Entry - Array of FAQ entries
 */

/**
 * @typedef {Object} FormComponent
 * @property {string} __typename - Always 'ComponentContentPageComponentsForm'
 * @property {string} Title - Form title
 * @property {ComponentStyle} Style - Component styling
 * @property {string} bodyTitle - Title for form body
 * @property {string} sendTo - Email to send form to
 * @property {FormField[]} formFields - Form field definitions
 */

/**
 * @typedef {Object} GridEntry
 * @property {Object} Picture - Grid item picture
 * @property {string} Picture.url - Picture URL
 * @property {string} Caption - Picture caption
 */

/**
 * @typedef {Object} GridComponent
 * @property {string} __typename - Always 'ComponentContentPageComponentsGrid'
 * @property {string} Title - Grid title
 * @property {ComponentStyle} Style - Component styling
 * @property {GridEntry[]} Entry - Array of grid entries
 */

/**
 * @typedef {Object} ButtonEntry
 * @property {string} Link - Button target link
 * @property {string} Text - Button text
 * @property {string} ButtonColor - Button color
 */

/**
 * @typedef {Object} ButtonsComponent
 * @property {string} __typename - Always 'ComponentContentPageComponentsButtons'
 * @property {ComponentStyle} Style - Component styling
 * @property {ButtonEntry[]} Entry - Array of buttons
 * @property {string} GroupButtonStyle - Style for button group
 * @property {string} ButtonArrangement - How buttons are arranged
 */

/**
 * @typedef {Object} QuoteEntry
 * @property {string} PricePer - Price per unit
 * @property {string} JobType - Type of job
 * @property {string} PriceMinimum - Minimum price
 */

/**
 * @typedef {Object} InstantQuoteComponent
 * @property {string} __typename - Always 'ComponentContentPageComponentsInstantQuote'
 * @property {string} Title - Quote component title
 * @property {string} SendTo - Email to send quote requests to
 * @property {string} SendFrom - Email to send from
 * @property {string} FormButtonStyle - Style for form button
 * @property {string} ButtonColor - Button color
 * @property {string} ButtonText - Button display text
 * @property {ComponentStyle} Style - Component styling
 * @property {QuoteEntry[]} Entry - Array of quote entries
 */

/**
 * @typedef {Object} VideoComponent
 * @property {string} __typename - Always 'ComponentContentPageComponentsVideo'
 * @property {string} caption - Video caption
 * @property {boolean} autoplay - Whether video auto-plays
 * @property {boolean} loop - Whether video loops
 * @property {boolean} muted - Whether video is muted
 * @property {number} width - Video width
 * @property {boolean} controls - Whether controls are shown
 * @property {ComponentStyle} Style - Component styling
 * @property {Object} asset - Video asset
 * @property {string} asset.url - Video URL
 * @property {number} asset.width - Video width
 * @property {string} asset.alternativeText - Alternative text
 */

/**
 * @typedef {Object} ImageComponent
 * @property {string} __typename - Always 'ComponentContentPageComponentsImage'
 * @property {string} caption - Image caption
 * @property {string} imageStyle - Image style
 * @property {number} width - Image width
 * @property {number} height - Image height
 * @property {string} captionLocation - Caption position
 * @property {ComponentStyle} Style - Component styling
 * @property {Object} asset - Image asset
 * @property {string} asset.url - Image URL
 * @property {number} asset.width - Image width
 * @property {string} asset.alternativeText - Alternative text
 */

/**
 * @typedef {Object} Card
 * @property {Object} Image - Card image
 * @property {string} Image.url - Image URL
 * @property {number} Image.width - Image width
 * @property {string} Image.alternativeText - Alternative text
 * @property {string} Title - Card title
 * @property {string} Text - Card body text
 * @property {string} ButtonText - Button display text
 * @property {string} ButtonColor - Button color
 * @property {string} CardColor - Card background color
 * @property {string} CardStyle - Card style class
 * @property {string} Link - Card link target
 */

/**
 * @typedef {Object} CardGroupComponent
 * @property {string} __typename - Always 'ComponentContentPageComponentsCardGroup'
 * @property {string} Title - Card group title
 * @property {boolean} fullWidth - Whether to span full width
 * @property {Card[]} Cards - Array of cards
 * @property {ComponentStyle} Style - Component styling
 */

/**
 * @typedef {Object} ListItem
 * @property {string} Text - Item text
 */

/**
 * @typedef {Object} ListComponent
 * @property {string} __typename - Always 'ComponentContentPageComponentsList'
 * @property {string} Title - List title
 * @property {Object} Icon - List icon
 * @property {string} Icon.url - Icon URL
 * @property {number} Icon.width - Icon width
 * @property {string} Icon.alternativeText - Alternative text
 * @property {string} Caption - List caption
 * @property {ListItem[]} Items - Array of list items
 * @property {ComponentStyle} Style - Component styling
 */

/**
 * @typedef {Object} Slide
 * @property {string} url - Slide image URL
 * @property {string} alternativeText - Alternative text
 * @property {number} width - Slide width
 * @property {string} caption - Slide caption
 */

/**
 * @typedef {Object} SlideshowComponent
 * @property {string} __typename - Always 'ComponentHomePageComponentsSlideshow'
 * @property {string} Title - Slideshow title
 * @property {Slide[]} slidesDesktop - Array of desktop slides
 * @property {Slide[]} slidesMobile - Array of mobile slides
 * @property {ComponentStyle} Style - Component styling
 */

/**
 * @typedef {Object} RichTextComponent
 * @property {string} __typename - Always 'ComponentHomePageComponentsRichText'
 * @property {string} Title - RichText title
 * @property {ComponentStyle} Style - Component styling
 * @property {string} RichText - Rich text HTML content
 */

/**
 * @typedef {(IntroComponent|GalleryComponent|MediaComponent|ParagraphComponent|FaqComponent|FormComponent|GridComponent|ButtonsComponent|InstantQuoteComponent|VideoComponent|ImageComponent|CardGroupComponent|ListComponent|SlideshowComponent|RichTextComponent)} ContentComponent
 * @description Union type representing all possible content components
 */

/**
 * @typedef {Object} NavbarTextLink
 * @property {string} __typename - Always 'ComponentNavbarComponentsTextLink'
 * @property {string} Title - Link title
 * @property {string} Link - Link target
 */

/**
 * @typedef {Object} NavbarButton
 * @property {string} __typename - Always 'ComponentNavbarComponentsNavButton'
 * @property {string} Text - Button text
 * @property {string} Link - Button link
 * @property {string} Color - Button color
 */

/**
 * @typedef {Object} NavbarImageLink
 * @property {string} __typename - Always 'ComponentNavbarComponentsImageLink'
 * @property {Image} Image - Link image
 * @property {string} Link - Link target
 * @property {number} Width - Image width
 * @property {boolean} showInMobile - Whether to show on mobile
 */

/**
 * @typedef {Object} NavMenuItem
 * @property {string} text - Menu item text
 * @property {string} link - Menu item link
 * @property {Image} icon - Menu item icon
 */

/**
 * @typedef {Object} NavbarMenu
 * @property {string} __typename - Always 'ComponentNavbarComponentsNavMenu'
 * @property {string} title - Menu title
 * @property {NavMenuItem[]} menuItem - Array of menu items
 */

/**
 * @typedef {(NavbarTextLink|NavbarButton|NavbarImageLink|NavbarMenu)} NavbarItem
 * @description Union type representing all possible navbar items
 */

/**
 * @typedef {Object} MobileConfig
 * @property {Image} MobileIcon - Mobile menu icon
 * @property {string} DrawerText - Drawer label text
 * @property {string} DrawerLink - Drawer link target
 * @property {string} IconLink - Icon link target
 */

/**
 * @typedef {Object} Navbar
 * @property {string} Style - Navbar style class
 * @property {string} FontColor - Font color value
 * @property {string} Appearance - Navbar appearance style
 * @property {NavbarItem[]} Items - Array of navbar items
 * @property {MobileConfig} MobileConfig - Mobile-specific configuration
 */

/**
 * @typedef {Object} FooterLink
 * @property {string} text - Link text
 * @property {string} link - Link target
 */

/**
 * @typedef {Object} FooterImage
 * @property {string} __typename - Always 'ComponentFooterComponentsImage'
 * @property {Image} Image - Footer image
 * @property {string} Space - Spacing value
 */

/**
 * @typedef {Object} FooterText
 * @property {string} __typename - Always 'ComponentFooterComponentsText'
 * @property {string} Text - Text content
 * @property {string} Space - Spacing value
 */

/**
 * @typedef {Object} FooterIconEntry
 * @property {string} Icon - Icon identifier
 * @property {string} Link - Icon link target
 * @property {string} Color - Icon color
 */

/**
 * @typedef {Object} FooterIcons
 * @property {string} __typename - Always 'ComponentFooterComponentsIcons'
 * @property {FooterIconEntry[]} Entry - Array of icon entries
 * @property {string} Space - Spacing value
 */

/**
 * @typedef {(FooterImage|FooterText|FooterIcons)} FooterContent
 * @description Union type representing all possible footer content
 */

/**
 * @typedef {Object} Footer
 * @property {string} FontColor - Font color value
 * @property {FooterLink[]} links - Array of footer links
 * @property {FooterContent[]} Content - Array of footer content items
 */

/**
 * @typedef {Object} Page
 * @property {string} Name - Internal page name
 * @property {string} Title - Page display title
 * @property {string} Link - Page URL link
 * @property {ContentComponent[]} Content - Array of page content components
 */

/**
 * @typedef {Object} Homepage
 * @property {string} PageName - Homepage identifier
 * @property {string} Title - Homepage title
 * @property {ContentComponent[]} Content - Array of content components
 */

/**
 * @typedef {Object} Localization
 * @property {string} locale - Language locale code (e.g., 'en', 'es', 'fr')
 */

/**
 * @typedef {Object} Website
 * @property {string} name - Website name
 * @property {string} locale - Current active locale
 * @property {Localization[]} localizations - Available language localizations
 * @property {Navbar} navbar - Navigation bar configuration
 * @property {Footer} footer - Footer configuration
 * @property {SiteSettings} site_settings - Site-wide settings
 * @property {Homepage} homepage - Homepage configuration
 * @property {Page[]} content_pages - Array of content pages
 */

/**
 * @typedef {Object} AppQueryData
 * @property {Website} website - Website document data
 */

/**
 * @typedef {Object} Locales
 * @property {string} code - locale code
 * @property {string} name - locale name
 */

/**
 * @typedef {Object} LocalesQueryData
 * @property {Locales[]} i18NLocales - Array of locale objects
 */
