import React from 'react'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const classes = {
  root: {
    margin: 'auto 5%'
  }
}

export default function Freestyle ({ content }) {
  return (
        <div style={classes.root}>
            <BlocksRenderer content={content.RichText} />
        </div>
  )
}
