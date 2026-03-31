import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

/**
 * Freestyle / Rich Text component — renders Strapi blocks content.
 *
 * @param {Object} props
 * @param {import('../../../../../components/src/types').RichTextComponent} props.content
 */
export default function Freestyle ({ content }) {
  if (!content?.RichText) return null

  return (
    <div className="freestyle">
      <div className="freestyle__body">
        <BlocksRenderer content={content.RichText} />
      </div>
    </div>
  )
}
