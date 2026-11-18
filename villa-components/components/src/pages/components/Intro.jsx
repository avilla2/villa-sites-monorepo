import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import ReactMarkdown from 'react-markdown'
import Typography from '@mui/material/Typography'
import Slideshow from './Slideshow'
import CustomTypography from '../../shared/Typography'
import AnimationProvider from '../lib/AnimationProvider'
import CustomButton from '../../shared/Button'
import Contact from './Contact'

const styles = {
  base: {
    position: 'relative',
    overflow: 'hidden',
    '--intro-min-height': '100vh',
    '--intro-mobile-min-height': '85vh',
    '@supports (min-height: 100svh)': {
      '--intro-min-height': '100svh',
      '--intro-mobile-min-height': '85svh'
    }
  },
  withForm: (theme) => ({
    [theme.breakpoints.down('md')]: {
      paddingBottom: 8
    }
  }),
  contentWrapper: {
    width: '100%',
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
    // Keep every carousel layer as tall as the hero, including portrait media.
    '& > div, & .carousel-root, & .carousel, & .slider-wrapper, & .slider, & .slide, & .slide > div':
      {
        height: '100%'
      },
    '& .slide img': {
      height: '100%',
      objectFit: 'cover'
    }
  },
  formMedia: (theme) => ({
    [theme.breakpoints.down('md')]: {
      bottom: 'auto',
      aspectRatio: '9 / 16'
    }
  }),
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  },
  overlayWrapper: (theme) => ({
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    padding: '5%',
    width: '100%',
    minHeight: 'var(--intro-mobile-min-height)',
    [theme.breakpoints.up('md')]: {
      padding: '3%',
      minHeight: 'var(--intro-min-height)'
    }
  }),
  formOverlay: (theme) => ({
    [theme.breakpoints.down('md')]: {
      minHeight: '55vh',
      justifyContent: 'flex-start',
      paddingTop: 9
    },
    [theme.breakpoints.up('md')]: {
      alignItems: 'stretch'
    }
  }),
  inner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'inherit',
    width: '100%'
  },
  formInner: (theme) => ({
    gap: 8,
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 6
    }
  }),
  overlay: {
    width: '100%',
    maxWidth: 820,
    minWidth: 0,
    flex: '1 1 auto',
    color: 'inherit',
    textShadow: '3px 3px 20px #2f2f2f',
    fontSize: 'clamp(0.85rem, 2.5vw, 1.5rem)',
    '& h1, & h2, & h3, & h4, & h5, & h6': {
      lineHeight: 1.2,
      margin: '0 0 0.4em',
      color: 'inherit'
    },
    '& h1': {
      fontSize: { xs: '1.5em', md: '2.2em' }
    },
    '& h2': {
      fontSize: { xs: '1.2em', md: '1.6em' }
    },
    '& p': {
      margin: '0 0 0.9em',
      lineHeight: 1.6
    }
  },
  formText: (theme) => ({
    [theme.breakpoints.down('md')]: {
      paddingBlock: 5
    }
  }),
  buttons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1.5,
    marginTop: 3,
    justifyContent: 'inherit'
  },
  formCard: {
    width: '100%',
    maxWidth: { xs: 'none', md: 420, xl: 520 },
    minWidth: 0,
    flex: '0 0 auto',
    boxSizing: 'border-box',
    backgroundColor: '#ffffff',
    color: '#1a1a1a',
    borderRadius: 2,
    padding: { xs: 3, sm: 3.5 },
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.25)',
    textShadow: 'none',
    textAlign: 'left'
  },
  formTitle: {
    fontSize: '1.35rem',
    fontWeight: 700,
    lineHeight: 1.2,
    marginBottom: 1
  },
  formDescription: {
    fontSize: '0.9rem',
    lineHeight: 1.5,
    color: '#555555',
    marginBottom: 2.5
  },
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
  return mime?.split('/')[0]
}

/**
 * GenerateMedia component - Renders media content (image, video, or slideshow) based on provided files
 * @param {Object} props - GenerateMedia props
 * @param {FileData[]} props.files - Media files object
 * @returns {JSX.Element}
 */
const GenerateMedia = ({ files = [] }) => {
  const data = files || []
  if (!data.length) return null

  if (data.length === 1) {
    const attributes = data[0]
    const mime = getMime(attributes.mime)
    if (mime === 'video') {
      return (
        <video key={attributes.url} style={styles.media} loop autoPlay muted playsInline>
          <source src={attributes.url} type={attributes.mime} />
        </video>
      )
    } else if (mime === 'image') {
      return (
        <img style={styles.media} src={attributes.url} alt={attributes.alternativeText || ''} />
      )
    }
  } else if (data.length > 1) {
    return <Slideshow content={{ slidesMobile: files, slidesDesktop: files }} fullscreen />
  }
  return null
}

const getIntroStyle = (style) => {
  switch (style) {
    case 'Centered':
      return styles.centered
    case 'Bottom_Right':
    case 'Bottom Right':
      return styles.bottomRight
    default:
      return styles.bottomLeft
  }
}

/**
 * Intro component - Renders an intro section with media, text overlay, buttons, and optional contact form
 * @param {Object} props - Intro props
 * @param {IntroComponent} props.content - Intro content object
 * @param {string} props.siteName - The name of the site, used for rendering components that require it (e.g., Contact form email subject line)
 * @returns {JSX.Element} The Intro component
 */
export default function Intro({ content, siteName }) {
  const mobile = useMediaQuery((theme) => theme.breakpoints.down('md'))
  const hasForm = Boolean(content?.FormData && content?.FormFields?.length)
  const position = getIntroStyle(content.TextPosition)

  return (
    <Box
      component="section"
      sx={[
        styles.base,
        hasForm && styles.withForm,
        { color: content?.Style?.TextColor || 'inherit' }
      ]}
    >
      <Box
        sx={[
          styles.contentWrapper,
          hasForm && styles.formMedia,
          { backgroundColor: content?.Style?.BackgroundColor || '#1a1a1a' }
        ]}
      >
        <GenerateMedia
          files={mobile && content?.MobileFile?.length ? content.MobileFile : content.File}
        />
      </Box>
      <Box sx={[styles.overlayWrapper, position, hasForm && styles.formOverlay]}>
        <Box sx={[styles.inner, hasForm && styles.formInner]}>
          <CustomTypography component="div" sx={styles.overlay}>
            <AnimationProvider animation={content?.Style?.Animation}>
              <Box sx={hasForm ? styles.formText : undefined}>
                <ReactMarkdown>{content.IntroText}</ReactMarkdown>
                {content?.Buttons?.length > 0 && (
                  <Box sx={{ ...styles.buttons, justifyContent: position.alignItems }}>
                    {content.Buttons.map((button, index) => (
                      <CustomButton
                        key={index}
                        buttonStyle="outlined"
                        link={button.Link}
                        color={button.ButtonColor}
                      >
                        {button.Text}
                      </CustomButton>
                    ))}
                  </Box>
                )}
              </Box>
            </AnimationProvider>
          </CustomTypography>
          {hasForm && (
            <Box sx={styles.formCard}>
              {content.FormData.FormTitle && (
                <Typography component="h3" sx={styles.formTitle}>
                  {content.FormData.FormTitle}
                </Typography>
              )}
              {content.FormData.FormDescription && (
                <Typography component="p" sx={styles.formDescription}>
                  {content.FormData.FormDescription}
                </Typography>
              )}
              <Contact
                embedded
                content={{
                  formFields: content.FormFields,
                  sendTo: content.FormData.SendTo,
                  sendFrom: content.FormData.SendFrom,
                  bodyTitle: content.FormData.BodyTitle
                }}
                siteName={siteName}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}
