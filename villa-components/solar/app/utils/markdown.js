import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'

/**
 * Parse markdown to sanitized HTML
 */
export async function parseMarkdown (markdown) {
  if (!markdown) return ''

  const result = await unified()
    .use(remarkParse) // Parse markdown
    .use(remarkRehype) // Convert to HTML AST
    .use(rehypeSanitize) // Sanitize HTML (XSS protection)
    .use(rehypeStringify) // Convert to HTML string
    .process(markdown)

  return String(result)
}

/**
 * Process content array and parse markdown in intro/paragraph/grid components
 */
export async function parseMarkdownInContent (content) {
  if (!Array.isArray(content)) return content

  return Promise.all(
    content.map(async (block) => {
      // Handle intro components
      if (
        block.__typename === 'ComponentHomePageComponentsIntro' ||
        block.__typename === 'ComponentContentPageComponentsIntro'
      ) {
        return {
          ...block,
          IntroText: block.IntroText ? await parseMarkdown(block.IntroText) : block.IntroText
        }
      }

      // Handle paragraph components
      if (
        block.__typename === 'ComponentHomePageComponentsParagraph' ||
        block.__typename === 'ComponentContentPageComponentsParagraph'
      ) {
        return {
          ...block,
          Body: block.Body ? await parseMarkdown(block.Body) : block.Body
        }
      }

      // Handle grid components with captions
      if (
        block.__typename === 'ComponentHomePageComponentsGrid' ||
        block.__typename === 'ComponentContentPageComponentsGrid'
      ) {
        const updatedEntries = await Promise.all(
          (block.Entry || []).map(async (entry) => ({
            ...entry,
            Caption: entry.Caption ? await parseMarkdown(entry.Caption) : entry.Caption
          }))
        )
        return {
          ...block,
          Entry: updatedEntries
        }
      }

      // Handle image components with caption
      if (
        block.__typename === 'ComponentHomePageComponentsImage' ||
        block.__typename === 'ComponentContentPageComponentsImage'
      ) {
        return {
          ...block,
          caption: block.caption ? await parseMarkdown(block.caption) : block.caption
        }
      }

      return block
    })
  )
}

/**
 * Process footer content and parse markdown in text components
 */
export async function parseMarkdownInFooter (footerContent) {
  if (!Array.isArray(footerContent)) return footerContent

  return Promise.all(
    footerContent.map(async (block) => {
      if (block.__typename === 'ComponentFooterText') {
        return {
          ...block,
          Text: block.Text ? await parseMarkdown(block.Text) : block.Text
        }
      }
      return block
    })
  )
}
