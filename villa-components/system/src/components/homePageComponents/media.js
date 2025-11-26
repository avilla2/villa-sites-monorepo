import React from 'react'
import Box from '@mui/material/Box'
import PDF from '../pageFeatures/pdf'
import useMediaQuery from '@mui/material/useMediaQuery'
import ReactMarkdown from 'react-markdown'
import { Parallax } from 'react-parallax'
import AnimationProvider from '../utils/animationProvider'

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
                src={`${process.env.REACT_APP_BACKEND_URL}${configs.File.url}`}
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
      <Parallax bgImage={`${process.env.REACT_APP_BACKEND_URL}${configs.File.url}`} bgImageAlt={configs.alternativeText} strength={200}>
        <div style={{ height }}></div>
      </Parallax>
    )
  } else {
    return (
            <img
                src={`${process.env.REACT_APP_BACKEND_URL}${configs.File.url}`}
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
 * @param {Object} props - Media props
 * @param {MediaComponent} props.content - Media content object
 * @returns {JSX.Element} The Media component
 */
export default function Media ({ content }) {
  return (
        <Box>
            { content.asset.data &&
                renderComponent(content.asset.Content[0])
            }
            { content.asset?.Caption &&
              <AnimationProvider animation={content?.Style?.Animation} direction="down">
                <Box sx={classes.caption}>
                    <ReactMarkdown>{content.asset.Caption}</ReactMarkdown>
                </Box>
              </AnimationProvider>
            }
        </Box>
  )
}
