import React from 'react'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import renderComponent from './renderPageComponent'
import calculatePadding from './calculatePadding'

const classes = {
  root: {
    width: '100%'
  },
  title: (theme) => ({
    letterSpacing: 1,
    margin: 'auto 68px',
    paddingTop: theme.spacing(2),
    fontSize: '1.6rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.2rem'
    }
  })
}

const fullHeightComponents = ['ComponentHomePageComponentsIntro', 'ComponentContentPageComponentsImage', 'ComponentHomePageComponentsMedia']
const halfHeightComponents = []

export default function GeneratePageContent ({ content, lastComponent }) {
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
                !fullHeightComponents.includes(content.__typename) && content?.Title
                  ? <Typography sx={classes.title} variant="h2"> {content?.Title}</Typography>
                  : <></>
            }
            {renderComponent(content)}
        </Grid>
  )
}
