import React from 'react'
import ReactMarkdown from 'react-markdown'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AnimationProvider from '../lib/AnimationProvider'

const classes = {
  root: (theme) => ({
    margin: `${theme.spacing(2)} 10%`
  }),
  image: {
    width: '95%',
    marginTop: '7%'
  },
  caption: {
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '28px'
  }
}

/**
 * PictureGrid component - Renders a grid of pictures with captions and optional animation
 * @param {Object} props - PictureGrid props
 * @param {GridComponent} props.content - Picture grid content object
 * @returns {JSX.Element} The PictureGrid component
 */
export default function PictureGrid ({ content }) {
  return (
    <Box sx={classes.root}>
      <Grid
        container
        direction="row"
        sx={{ justifyContent: 'space-around', alignItems: 'flex-start' }}
        spacing={3}
      >
        {content?.Entry?.map((entry, index) => {
          return (
            <Grid
              key={index}
              size={{
                xs: 12,
                sm: 6,
                md: 4
              }}>
              <AnimationProvider animation={content?.Style?.Animation} timeout={1000 + (index * 300)} partialVisibility>
                  <div>
                      {entry?.Picture &&
                          <img
                              style={classes.image}
                              src={entry.Picture.url}
                              alt={entry.Picture.alternativeText}
                          />
                      }
                      <Box sx={classes.caption}>
                          <Typography component="div">
                              <ReactMarkdown>{entry.Caption}</ReactMarkdown>
                          </Typography>
                      </Box>
                  </div>
              </AnimationProvider>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}
