import React from 'react'
import Box from '@mui/material/Box'

const classes = {
  root: {
    margin: '0px'
  },
  image: {
    width: 200
  }
}

/**
 * Image component - Renders a footer image
 * @param {Object} props - Image component props
 * @param {FooterImage} props.content - Footer image content object
 * @property {Image} props.content.Image - Image data with url and name
 * @property {string} props.content.Space - Space/width allocation
 * @returns {JSX.Element} The Image component
 */
export default function Template ({ content }) {
  return (
        <Box sx={classes.root}>
            <img style={classes.image} src={`${process.env.REACT_APP_BACKEND_URL}${content.Image.url}`} alt={content.Image.name} />
        </Box>
  )
}
