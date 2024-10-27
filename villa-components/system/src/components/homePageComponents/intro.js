import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import ReactMarkdown from 'react-markdown'
import AnimationProvider from '../utils/animationProvider'
import ButtonGroup from '../contentPageComponents/buttonGroup'
import Contact from '../contentPageComponents/contact'
import Grid from '@mui/material/Grid'

const styles = {
  base: {
    position: 'relative',
    overflow: 'hidden'
  },
  contentWrapper: (theme) => ({
    width: '100%',
    position: 'absolute',
    [theme.breakpoints.between('xs', 'md')]: {
      minHeight: '90vh',
    },
    [theme.breakpoints.up('md')]: {
      minHeight: '90vh',
    },
  }),
  video: {
    width: '100%',
    verticalAlign: 'bottom',
    minHeight: 'inherit',
  },
  videoMobile: {
    width: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
    verticalAlign: 'bottom',
    minHeight: 'inherit',
  },
  imageMobile: {
    width: '100%',
    maxWidth: '100%',
    objectFit: 'cover',
    verticalAlign: 'bottom',
    minHeight: 'inherit',
  },
  overlayWrapper: (theme) => ({
    position: 'relative',
    bottom: 0,
    padding: 2,
    width: '100%',
    height: '100%',
    [theme.breakpoints.between('xs', 'md')]: {
      minHeight: '80vh',
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: 12,
      minHeight: '90vh',
    },
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
      marginBottom: 3,
    },
    [theme.breakpoints.between('xs', 'sm')]: {
      fontSize: '.75rem',
      minHeight: '10vh',
      marginBottom: 3,
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

const GenerateMedia = ({ mobile, data }) => {
  if (data.length <= 1) {
    const attributes = data[0].attributes
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
            src={`${process.env.REACT_APP_BACKEND_URL}${attributes.url}`}
            type={attributes.mime}
            alt={attributes.alternativeText}
          />
        </video>
      )
    } else if (mime === 'image') {
      return (
        <img
          style={mobile ? styles.imageMobile : styles.video}
          src={`${process.env.REACT_APP_BACKEND_URL}${attributes.url}`}
          alt={attributes.alternativeText}
        />
      )
    }
  } else if (data.length > 1) {
    return (
      // TODO Implement Carousel
      <></>
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

export default function Intro ({ content }) {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))

  return (
    <Box sx={styles.base}>
      <Box sx={styles.contentWrapper}>
        {mobile && content?.MobileFile?.data?.length
          ? <GenerateMedia data={content.MobileFile.data} mobile={true}/>
          : <GenerateMedia data={content.File.data} mobile={mobile}/>
        }
      </Box>
      <Grid 
      container
      justifyContent='space-evenly'
      sx={styles.overlayWrapper}>
        <Grid item xs={12} md={content?.FormData && content?.FormFields ? 8 : 12}>
          <Box sx={[styles.overlay, getIntroStyle(content.TextPosition)]}>
            <AnimationProvider animation={content?.Style?.Animation}>
              <ReactMarkdown>{content.IntroText}</ReactMarkdown>
              {content?.Buttons && <ButtonGroup content={{ ButtonArrangement: 'center', GroupButtonStyle: 'outlined', Entry: content.Buttons }}/>}
            </AnimationProvider>
          </Box>
        </Grid>
        {content?.FormData && content?.FormFields &&
          <Grid 
            xs={12}
            md={4}
            item 
            sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          >
            <Box sx={{backgroundColor: 'white', margin: 'auto 16px', borderRadius: 3, maxWidth: 400}}>
            <Contact 
              content={{
                fields: content.FormFields,
                sendTo: content.FormData.SendTo,
                sendFrom: content.FormData.SendFrom,
                bodyTitle: content.FormData.BodyTitle
              }}
            />
            </Box>
          </Grid>
        }
      </Grid>
    </Box>
  )
}
