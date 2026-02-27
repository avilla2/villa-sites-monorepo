import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import TagManager from 'react-gtm-module'
import renderPageComponent from './lib/RenderPageComponent'
import calculatePadding from './utils/CalculatePadding'

const classes = {
  root: {
    width: '100%',
    flexGrow: 1
  },
  contentRoot: {
    width: '100%'
  },
  title: (theme) => ({
    margin: 'auto 5vw',
    fontSize: '2.3rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.5rem'
    }
  })
}

const fullHeightComponents = ['ComponentHomePageComponentsIntro', 'ComponentContentPageComponentsImage', 'ComponentHomePageComponentsMedia']
const halfHeightComponents = ['ComponentContentPageComponentsButtons']

/**
 * HomePage component - Renders the home page with dynamic content components
 * @param {Object} props - HomePage props
 * @param {function} props.setPage - Function to set the current page name
 * @param {function} props.setNavIndex - Function to set the current navigation index/path
 * @param {string} props.path - Path/URL of the page
 * @param {ContentComponent[]} props.content - Array of content items to render on the page
 * @param {string} props.pageName - Name of the page
 * @param {string} props.siteName - Name of the site, used for rendering components that require it
 * @returns {JSX.Element} The HomePage component
 */
export default function HomePage ({ setPage, setNavIndex, path, content, pageName, siteName }) {
  useEffect(() => {
    setPage(pageName)
    setNavIndex(path)
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        page: path,
        pageName
      }
    })
  }, [pageName, path])
  return (
        <Grid container sx={classes.root}>
            {content.map((component, index) => {
              const lastComponent = index === content.length - 1
              const padding = calculatePadding(lastComponent, fullHeightComponents, halfHeightComponents, component.__typename)
              const styles = component?.Style
              const textAlign = styles?.textAlign || 'center'
              return (
                <Grid
                    key={index}
                    size={{ xs: 12, lg: styles?.size ? styles.size : 12 }}
                    sx={classes.contentRoot}
                    style={{
                      color: styles?.TextColor ? styles.TextColor : null,
                      backgroundColor: styles?.BackgroundColor ? styles.BackgroundColor : null,
                      padding,
                      textAlign,
                      ...(styles && styles?.paddingTop !== null && { paddingTop: styles.paddingTop }),
                      ...(styles && styles?.paddingBottom !== null && { paddingBottom: styles.paddingBottom })
                    }}
                >
                    {
                        !fullHeightComponents.includes(component.__typename) && component?.Title &&
                        <Typography sx={classes.title} variant="h2"> {component.Title}</Typography>
                    }
                    {renderPageComponent(component, siteName)}
                </Grid>
              )
            })}
        </Grid>
  )
}
