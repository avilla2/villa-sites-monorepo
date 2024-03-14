import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const classes = {
  root: {
    width: '100%',
    fontSize: '1.5rem'
  }
}

export default function ContentPage ({ setPage }) {
  useEffect(() => {
    setPage('Website is Unavailable')
  })
  return (
        <Box sx={classes.root}>
            <Typography component="h1" mt={5} gutterBottom>Sorry for the Inconvenient</Typography>
            <Typography component="h2" gutterBottom>Website is down for Maintenence...</Typography>
        </Box>
  )
}
