import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '../shared/Typography'
import TagManager from 'react-gtm-module'
import renderPageComponent from './lib/RenderPageComponent'
import calculatePadding from './utils/CalculatePadding'

const classes = {
  root: {
    width: '100%',
    flexGrow: 2
  },
  titleContainer: (theme, minSize, showTitle) => ({
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    minHeight: '145px',
    display: showTitle ? 'flex' : 'none',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '125px',
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.down(minSize)]: {
      display: 'none'
    }
  }),
  title: (theme) => ({
    fontSize: '2rem',
    fontWeight: 600,
    letterSpacing: 1.5,
    [theme.breakpoints.down('lg')]: {
      fontSize: '1.6rem'
    }
  }),
  page: (theme, minSize, showTitle) => ({
    backgroundColor: 'white',
    paddingTop: '80px',
    [theme.breakpoints.up(minSize)]: {
      paddingTop: showTitle ? '0px' : '180px'
    }
  }),
  contentRoot: {
    width: '100%'
  },
  contentTitle: (theme) => ({
    letterSpacing: 1,
    margin: 'auto 5vw',
    paddingTop: theme.spacing(2),
    fontSize: '1.6rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.2rem'
    }
  })
}

const fullHeightComponents = ['ComponentHomePageComponentsIntro', 'ComponentContentPageComponentsImage', 'ComponentHomePageComponentsMedia']
const halfHeightComponents = []

/**
 * ContentPage component - Renders a content page with optional title and dynamic content
 * @param {Object} props - ContentPage props
 * @param {function} props.setPage - Function to set the current page name
 * @param {function} props.setNavIndex - Function to set the current navigation index/path
 * @param {string} props.name - Name of the page
 * @param {ContentComponent[]} props.content - Array of content items to render on the page
 * @param {string} props.path - Path/URL of the page
 * @param {string} props.minSize - Minimum screen size for responsive design
 * @param {boolean} props.showTitle - Whether to show the page title
 * @param {string} props.titleColor - Color of the page title text
 * @returns {JSX.Element} The ContentPage component
 */
export default function ContentPage ({
  setPage,
  setNavIndex,
  name,
  content,
  path,
  minSize,
  showTitle,
  titleColor,
  siteName
}) {
  useEffect(() => {
    setPage(name)
    setNavIndex(path)
    TagManager.dataLayer({
      dataLayer: {
        event: 'pageview',
        page: path,
        pageName: name
      }
    })
  })

  return (
        <Box sx={classes.root}>
            <Box sx={(theme) => classes.titleContainer(theme, minSize, showTitle)}>
                <Typography variant="h2" sx={(theme) => ({ ...classes.title(theme), color: titleColor })}>
                    {name}
                </Typography>
            </Box>
            <Grid container sx={(theme) => classes.page(theme, minSize, showTitle)}>
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
                                    !fullHeightComponents.includes(component.__typename) && component?.Title
                                      ? <Typography sx={classes.contentTitle} variant="h2"> {component?.Title}</Typography>
                                      : <></>
                                }
                                {renderPageComponent(component, siteName)}
                            </Grid>
                      )
                    })}
                </Grid>
        </Box>
  )
}
