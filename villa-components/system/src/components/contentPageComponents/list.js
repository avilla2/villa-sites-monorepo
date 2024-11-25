import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'

const classes = {
  root: (theme) => ({
    margin: `${theme.spacing(1)} 5%`
  }),
  paragraph: {
    '& p': {
      marginTop: 0
    }
  }
}

export default function Template ({ content }) {
  return (
    <Box sx={classes.root}>
      <Grid
        container
        direction='row'
        justifyContent={content.Style.textAlign === 'left' ? 'flex-start' : 'center'}
        alignItems="center"
        rowSpacing={3}
        columnSpacing={16}
        py={3}
      >
        { content?.Caption &&
          <Grid 
            md={6} 
            sm={12} 
            xs={12} 
            item 
            alignSelf="flex-start"
            sx={classes.paragraph}
          >
              <BlocksRenderer content={content?.Caption} />
          </Grid>
        }
        <Grid 
          md={content?.Caption ? 6 : 12}
          sm={12} xs={12}
          item
          style={{textAlign: 'left', maxWidth: '80vw' }}
        >
          {content?.Items.map((item, index) => (
            <Grid 
              container
              direction="row" 
              alignItems="flex-start"
              justifyContent="flex-start"
              wrap='nowrap'
              key={index}
              rowSpacing={6}
              columnSpacing={2}
            >
              <Grid item>
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL}${content?.Icon?.data.attributes.url}`}
                  alt={content?.Icon?.data.attributes.alternativeText}
                  style={{ width: 40 }}
                />
              </Grid>
              <Grid item alignSelf="center">
                <Typography variant='h6'>{item.Text}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
