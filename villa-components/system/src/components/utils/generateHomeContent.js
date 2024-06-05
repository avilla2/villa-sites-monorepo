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
                !fullHeightComponents.includes(content.__typename) &&
                <Typography sx={classes.title} variant="h2"> {content?.Title}</Typography>
            }
            {renderComponent(content)}
        </Box>
  )
}
