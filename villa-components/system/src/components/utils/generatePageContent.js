import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import renderComponent from './renderPageComponent'
import calculatePadding from './calculatePadding'

const classes = {
  root: {
    width: '100%'
  },
  title: (theme) => ({
    letterSpacing: 1,
    margin: 'auto 5%',
    paddingTop: theme.spacing(2),
    fontSize: '1.6rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.2rem'
    }
  })
}

const fullHeightComponents = ['ComponentHomePageComponentsIntro', 'ComponentContentPageComponentsImage']

export default function GeneratePageContent ({ content, lastComponent }) {
  const padding = calculatePadding(lastComponent, fullHeightComponents, content.__typename)
  const textAlign = content?.Style?.textAlign || 'center'
  return (
        <Box
            sx={classes.root}
            style={{
              color: content?.Style?.TextColor ? content.Style.TextColor : null,
              backgroundColor: content?.Style?.BackgroundColor ? content.Style.BackgroundColor : null,
              padding,
              textAlign
            }}
        >
            {
                !fullHeightComponents.includes(content.__typename) && content?.Title
                  ? <Typography sx={classes.title} variant="h2"> {content?.Title}</Typography>
                  : <></>
            }
            {renderComponent(content)}
        </Box>
  )
}
