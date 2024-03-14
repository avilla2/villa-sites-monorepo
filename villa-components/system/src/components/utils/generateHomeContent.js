import React from 'react'
import renderComponent from './renderPageComponent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import calculatePadding from './calculatePadding'

const classes = {
  root: {
    width: '100%'
  },
  title: (theme) => ({
    margin: 'auto 2%',
    fontSize: '2.3rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem'
    }
  })
}

const fullHeightComponents = ['ComponentHomePageComponentsIntro', 'ComponentHomePageComponentsMedia']

export default function GenerateHomePageContent ({ content, lastComponent }) {
  const padding = calculatePadding(lastComponent, fullHeightComponents, content.__typename)
  return (
        <Box
            sx={classes.root}
            style={{
              color: content?.Style?.TextColor ? content.Style.TextColor : null,
              backgroundColor: content?.Style?.BackgroundColor ? content.Style.BackgroundColor : null,
              padding
            }}
        >
            {
                !fullHeightComponents.includes(content.__typename) &&
                <Typography sx={classes.title} variant="h2"> {content?.Title}</Typography>
            }
            {renderComponent(content)}
        </Box>
  )
}
