import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import { BlocksRenderer } from '@strapi/blocks-react-renderer'
import TaskAltIcon from '@mui/icons-material/TaskAlt'

const classes = {
  root: (theme) => ({
    margin: `${theme.spacing(1)} 5vw`
  }),
  paragraph: {
    '& p': {
      marginTop: 0
    }
  }
}

/**
 * List component - Renders a list of items with optional caption
 * @param {Object} props - List props
 * @param {ListComponent} props.content - List content object
 * @returns {JSX.Element} The List component
 */
export default function List ({ content }) {
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
            alignSelf="flex-start"
            sx={classes.paragraph}
            size={{
              md: 6,
              sm: 12,
              xs: 12
            }}>
              <BlocksRenderer content={content?.Caption} />
          </Grid>
        }
        <Grid
          style={{ textAlign: 'left', maxWidth: '80vw' }}
          size={{
            md: content?.Caption ? 6 : 12,
            sm: 12,
            xs: 12
          }}>
          {content?.Items.map((item, index) => (
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              wrap='nowrap'
              key={index}
              rowSpacing={6}
              columnSpacing={2}
            >
              <Grid>
                {content?.Icon

                  ? <img
                  src={content?.Icon?.url}
                  alt={content?.Icon?.alternativeText}
                  style={{ width: 40 }}
                />
                  : <TaskAltIcon fontSize="small" color="primary" />
                }
              </Grid>
              <Grid alignSelf="center">
                <Typography variant='h6'>{item.Text}</Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}
