import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import Typography from '../pageFeatures/typography'

const classes = {
  root: {
    margin: 'auto 5vw'
  }
}

export default function Freestyle ({ content }) {
  return (
        <div style={classes.root}>
          <Typography>
            {content.RichText && <BlocksRenderer content={content.RichText} />}
          </Typography>
        </div>
  )
}
