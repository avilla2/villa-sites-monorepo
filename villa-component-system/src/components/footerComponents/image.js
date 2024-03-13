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

export default function Template ({ content }) {
  return (
        <Box sx={classes.root}>
            <img style={classes.image} src={`${process.env.REACT_APP_BACKEND_URL}${content.Image.data.attributes.url}`} alt={content.Image.data.attributes.name} />
        </Box>
  )
}
