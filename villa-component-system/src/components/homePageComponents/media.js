import React from 'react'
import Box from '@mui/material/Box'
import PDF from '../utils/pdf'
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
                src={`${process.env.REACT_APP_BACKEND_URL}${configs.File.data.attributes.url}`}
                type={configs.File.data.attributes.mime}
            />
        </video>
  )
}

const Image = ({ configs }) => {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('md'))
  const height = configs.Height === 0 ? 'auto' : `${configs.Height}vh`
  if (configs.Style === 'Parallax') {
    return (
      <Parallax bgImage={`${process.env.REACT_APP_BACKEND_URL}${configs.File.data.attributes.url}`} bgImageAlt={configs.alternativeText} strength={200}>
        <div style={{ height }}></div>
      </Parallax>
    )
  } else {
    return (
            <img
                src={`${process.env.REACT_APP_BACKEND_URL}${configs.File.data.attributes.url}`}
                alt={configs.alternativeText}
                style={{ width: mobile ? '100%' : `${configs.Width}%`, height }}
            />
    )
  }
}

const renderComponent = (object) => {
  switch (object.__typename) {
    case 'ComponentAssetComponentsPdf':
      return <PDF src={object.File.data.attributes.url} />
    case 'ComponentAssetComponentsVideo':
      return <Video configs={object} />
    case 'ComponentAssetComponentsImage':
      return <Image configs={object} />
    default:
      return <h2>Error: Asset Not Found</h2>
  }
}

export default function Media ({ content }) {
  return (
        <Box>
            { content.asset.data &&
                renderComponent(content.asset.data.attributes.Content[0])
            }
            { content.asset?.data?.attributes?.Caption &&
              <AnimationProvider animation={content?.Style?.Animation} direction="down">
                <Box sx={classes.caption}>
                    <ReactMarkdown>{content.asset.data.attributes.Caption}</ReactMarkdown>
                </Box>
              </AnimationProvider>
            }
        </Box>
  )
}
