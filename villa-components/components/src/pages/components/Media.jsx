import React from 'react'
import Box from '@mui/material/Box'
import PDF from '../../shared/Pdf'
import useMediaQuery from '@mui/material/useMediaQuery'
import ReactMarkdown from 'react-markdown'
import ReactParallax from 'react-parallax'

const { Parallax } = ReactParallax

const classes = {
  caption: (theme) => ({
    fontFamily: theme.typography.fontFamily,
    marginLeft: '5%',
    marginRight: '5%',
    paddingTop: theme.spacing(3)
  })
}

/**
 * Video component - Renders a video element with given configurations
 * @param {Object} props - Video props
 * @param {VideoContent} props.configs - Video configuration object
 * @returns {JSX.Element} The Video component
 */
const Video = ({ configs }) => {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))
  return (
    <video
      style={{ width: mobile ? '100%' : `${configs.Width}%` }}
      loop={configs.Loop}
      autoPlay={configs.Autoplay}
      controls={configs.Controls}
      muted={configs.Autoplay || configs.Muted}
    >
      <source
        src={configs.File.url}
        type={configs.File.mime}
      />
    </video>
  )
}

/**
 * Image component - Renders an image with optional parallax effect
 * @param {Object} props - Image props
 * @param {ImageAssetContent} props.configs - Image configuration object
 * @returns {JSX.Element} The Image component
 */
const Image = ({ configs }) => {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))
  const height = configs.Height === 0 ? 'auto' : `${configs.Height}vh`
  if (configs.Style === 'Parallax') {
    return (
      <Parallax bgImage={configs.File.url} bgImageAlt={configs.alternativeText} strength={200}>
        <div style={{ height }}></div>
      </Parallax>
    )
  } else {
    return (
      <img
        src={configs.File.url}
        alt={configs.alternativeText}
        style={{ width: mobile ? '100%' : `${configs.Width}%`, height }}
      />
    )
  }
}

/**
 * renderComponent - Renders the appropriate media component based on its type
 * @param {PdfContent | VideoContent | ImageAssetContent} object - Media content object
 * @returns {JSX.Element} The rendered media component
 */
const renderComponent = (object) => {
  switch (object.__typename) {
    case 'ComponentAssetComponentsPdf':
      return <PDF src={object.File.url} />
    case 'ComponentAssetComponentsVideo':
      return <Video configs={object} />
    case 'ComponentAssetComponentsImage':
      return <Image configs={object} />
    default:
      return <h2>Error: Asset Not Found</h2>
  }
}

/**
 * Media component - Renders media content such as images, videos, or PDFs with optional caption and animation
 * Note: AnimationProvider component needs to be imported from the parent application
 * @param {Object} props - Media props
 * @param {MediaComponent} props.content - Media content object
 * @param {React.Component} props.AnimationProvider - AnimationProvider component from parent app
 * @returns {JSX.Element} The Media component
 */
export default function Media ({ content, AnimationProvider }) {
  return (
    <Box>
      {content.asset &&
        renderComponent(content.asset.Content[0])
      }
      {content.asset?.Caption && AnimationProvider && (
        <AnimationProvider animation={content?.Style?.Animation} direction="down">
          <Box sx={classes.caption}>
            <ReactMarkdown>{content.asset.Caption}</ReactMarkdown>
          </Box>
        </AnimationProvider>
      )}
      {content.asset?.Caption && !AnimationProvider && (
        <Box sx={classes.caption}>
          <ReactMarkdown>{content.asset.Caption}</ReactMarkdown>
        </Box>
      )}
    </Box>
  )
}
