import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const classes = {
  root: {
    width: '100%',
    fontSize: '1.5rem'
  }
}

export default function NoContentPage () {
  return (
        <Box sx={classes.root}>
            <Typography component="h1" mt={5} gutterBottom>Sorry for the inconvenience</Typography>
            <Typography component="h2" gutterBottom>Website is down for maintenence...</Typography>
        </Box>
  )
}
