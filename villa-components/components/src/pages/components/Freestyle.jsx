import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import CustomTypography from '../../shared/Typography'

const classes = {
  root: {
    margin: 'auto 5vw'
  }
}

/**
 * Rich Text/Freestyle component - Renders rich text content
 * @param {Object} props - Freestyle props
 * @param {RichTextComponent} props.content - Freestyle content object
 * @returns {JSX.Element} The Freestyle component
 */
export default function Freestyle ({ content }) {
  return (
    <div style={classes.root}>
      <CustomTypography component="div">
        {content.RichText && <BlocksRenderer content={content.RichText} />}
      </CustomTypography>
    </div>
  )
}
