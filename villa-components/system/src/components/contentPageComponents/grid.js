import React from 'react'
import ReactMarkdown from 'react-markdown'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AnimationProvider from '../utils/animationProvider'

const classes = {
  root: (theme) => ({
    margin: `${theme.spacing(2)} 10%`
  }),
  image: {
    width: '95%'
  },
  caption: {
    fontSize: '18px',
    fontWeight: '400',
    lineHeight: '28px'
  }
}

export default function PictureGrid ({ content }) {
  return (
        <Box sx={classes.root}>
            <Grid
              container
              direction="row"
              justifyContent="space-around"
              alignItems="flex-start"
              spacing={3}
            >
              {content.Entry.map((entry, index) => {
                return (
                  <Grid xs={12} sm={6} md={4} item key={index}>
                      <AnimationProvider animation={content?.Style?.Animation} timeout={1000 + (index * 300)} partialVisibility>
                          <div>
                              {entry?.Picture?.data &&
                                  <img
                                      style={classes.image}
                                      src={`${process.env.REACT_APP_BACKEND_URL}${entry.Picture.data?.attributes.url}`}
                                      alt={entry.Picture.id}
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
