import React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import GenerateFooterContent from '../components/utils/generateFooterContent'

const classes = {
  root: {
    padding: '50px 20px',
    zIndex: 10
  }
}

export default function Footer ({ Content, FontColor: fontColor }) {
  return (
        <Box sx={classes.root} bgcolor="info.main" component="div" style={ fontColor ? { color: fontColor } : null }>
           <Grid
                container
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                spacing={2}
            >
                {Content.map((item, key) => {
                  return (
                    <Grid item key={key} md={item.Space}>
                        <GenerateFooterContent content={item} />
                    </Grid>
                  )
                })}
            </Grid>
        </Box>
  )
}
