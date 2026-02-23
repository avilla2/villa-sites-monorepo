import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import ReactMarkdown from 'react-markdown'
import Grid from '@mui/material/Grid'
import Slideshow from './Slideshow'
import CustomTypography from '../../shared/Typography'
import AnimationProvider from '../lib/AnimationProvider'

const styles = {
  base: {
    position: 'relative',
    overflow: 'hidden'
  },
  contentWrapper: (theme) => ({
    width: '100%',
    position: 'absolute',
    [theme.breakpoints.between('xs', 'md')]: {
      minHeight: '85vh'
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '100vh'
    }
  }),
  video: {
    width: '100%',
    verticalAlign: 'bottom',
    objectFit: 'cover',
    minHeight: 'inherit'
  },
  videoMobile: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
    verticalAlign: 'bottom',
    minHeight: 'inherit'
  },
  imageMobile: {
    width: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    verticalAlign: 'bottom',
    minHeight: 'inherit'
  },
  overlayWrapper: (theme) => ({
    position: 'relative',
    bottom: 0,
    padding: 2,
    width: '100%',
    height: '100%',
    [theme.breakpoints.between('xs', 'md')]: {
      minHeight: '80vh'
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 2,
      minHeight: '100vh'
    }
  }),
  overlay: (theme) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '3%',
    boxSizing: 'border-box',
    fontFamily: theme.typography.fontFamily,
    color: 'inherit',
    textShadow: '3px 3px 20px #2f2f2f',
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.5rem'
    },
    [theme.breakpoints.between('md', 'lg')]: {
      fontSize: '1.125rem'
    },
    [theme.breakpoints.between('sm', 'md')]: {
      fontSize: '.85rem',
      minHeight: '10vh',
      marginBottom: 3
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '.75rem',
      minHeight: '10vh',
      marginBottom: 3
    }
  }),
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },
  bottomLeft: {
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    textAlign: 'left'
  },
  bottomRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'right'
  }
}

const getMime = (mime) => {
  return mime.split('/')[0]
}

/**
 * GenerateMedia component - Renders media content (image, video, or slideshow) based on provided files
 * @param {Object} props - GenerateMedia props
 * @param {FileData[]} props.files - Media files object
 * @param {boolean} props.mobile - Whether to render for mobile
 * @returns {JSX.Element}
 */
const GenerateMedia = ({ mobile, files }) => {
  const data = files
  if (data.length <= 1) {
    const attributes = data[0]
    const mime = getMime(attributes.mime)
    if (mime === 'video') {
      return (
        <video
          style={mobile ? styles.videoMobile : styles.video}
          loop
          autoPlay
          muted
          playsInline
        >
          <source
            src={attributes.url}
            type={attributes.mime}
            alt={attributes.alternativeText}
          />
        </video>
      )
    } else if (mime === 'image') {
      return (
        <img
          style={mobile ? styles.imageMobile : styles.video}
          src={attributes.url}
          alt={attributes.alternativeText}
        />
      )
    }
  } else if (data.length > 1) {
    return (
      <Slideshow content={mobile ? { slidesMobile: files } : { slidesDesktop: files }} fullscreen />
    )
  } else {
    return <></>
  }
}

const getIntroStyle = (style) => {
  switch (style) {
    case 'Centered':
      return styles.centered
    case 'Bottom_Right':
      return styles.bottomRight
    default:
      return styles.bottomLeft
  }
}

/**
 * Intro component - Renders an intro section with media, text overlay, buttons, and optional contact form
 * Note: Buttons and Contact components need to be imported from the parent application
 * @param {Object} props - Intro props
 * @param {IntroComponent} props.content - Intro content object
 * @param {React.Component} props.Buttons - Buttons component from parent app
 * @param {React.Component} props.Contact - Contact component from parent app
 * @param {string} props.siteName - The name of the site, used for rendering components that require it (e.g., Contact form email subject line)
 * @returns {JSX.Element} The Intro component
 */
export default function Intro ({ content, Buttons, Contact, siteName }) {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  const textContent = (
    <>
      <ReactMarkdown>
        {content.IntroText}
      </ReactMarkdown>
      {content?.Buttons && Buttons && (
        <Buttons content={{ ButtonArrangement: 'center', GroupButtonStyle: 'outlined', Entry: content.Buttons }}/>
      )}
    </>
  )

  return (
    <Box sx={styles.base}>
      <Box sx={styles.contentWrapper}>
        {mobile && content?.MobileFile?.length
          ? <GenerateMedia files={content.MobileFile} mobile={true}/>
          : <GenerateMedia files={content.File} mobile={mobile}/>
        }
      </Box>
      <CustomTypography component="div">
        <Grid
          container
          justifyContent='space-evenly'
          sx={styles.overlayWrapper}
        >
          <Grid
            sx={{ width: '100%' }}
            size={{
              xs: 12,
              md: content?.FormData && content?.FormFields ? 8 : 12
            }}
          >
            <Box sx={[styles.overlay, getIntroStyle(content.TextPosition)]}>
              <AnimationProvider animation={content?.Style?.Animation}>
                {textContent}
              </AnimationProvider>
            </Box>
          </Grid>
          {content?.FormData && content?.FormFields && Contact && (
            <Grid
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              size={{
                xs: 12,
                md: 4
              }}
            >
              <Box sx={{ backgroundColor: 'white', margin: 'auto 16px', borderRadius: 3, maxWidth: 400 }}>
                <Contact
                  content={{
                    formFields: content.FormFields,
                    sendTo: content.FormData.SendTo,
                    sendFrom: content.FormData.SendFrom,
                    bodyTitle: content.FormData.BodyTitle
                  }}
                  siteName={siteName}
                />
              </Box>
            </Grid>
          )}
        </Grid>
      </CustomTypography>
    </Box>
  )
}
