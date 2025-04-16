import React from 'react'
import renderComponent from './renderPageComponent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid2'

import calculatePadding from './calculatePadding'

const classes = {
  root: {
    width: '100%'
  },
  title: (theme) => ({
    margin: 'auto 5%',
    fontSize: '2.3rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem'
    }
  })
}

const fullHeightComponents = ['ComponentHomePageComponentsIntro', 'ComponentContentPageComponentsImage', 'ComponentHomePageComponentsMedia']
const halfHeightComponents = ['ComponentContentPageComponentsButtons']

export default function GenerateHomePageContent ({ content, lastComponent }) {
  const padding = calculatePadding(lastComponent, fullHeightComponents, halfHeightComponents, content.__typename)
  const styles = content?.Style
  const textAlign = styles?.textAlign || 'center'
  return (
        <Grid
          size={{ xs: 12, lg: styles?.size ? styles.size : 12 }}
          sx={classes.root}
          style={{
            color: styles?.TextColor ? styles.TextColor : null,
            backgroundColor: styles?.BackgroundColor ? styles.BackgroundColor : null,
            padding,
            textAlign,
            ...(styles?.paddingTop && { paddingTop: styles.paddingTop }),
            ...(styles?.paddingBottom && { paddingBottom: styles.paddingBottom })

          }}
        >
            {
                !fullHeightComponents.includes(content.__typename) && content?.Title &&
                <Typography sx={classes.title} variant="h2"> {content.Title}</Typography>
            }
            {renderComponent(content)}
        </Grid>
  )
}
