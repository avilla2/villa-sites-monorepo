import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Carousel } from 'react-responsive-carousel'

const classes = {
  legendContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'unset'
  },
  legend: {
    padding: '12px 20px',
    borderRadius: 20,
    fontSize: '1.3em'
  }
}

/**
 * Slideshow component - Renders a slideshow with desktop and mobile slides
 * @param {Object} props - Slideshow props
 * @param {SlideshowComponent} props.content - Slideshow content object
 * @param {Boolean} props.fullscreen - Whether the slideshow is fullscreen
 * @returns {JSX.Element} The Slideshow component
 */
export default function Slideshow ({ content, fullscreen }) {
  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  /**
   * Slide component - Renders a single slide with image and optional caption
   * @param {Object} props - Slide props
   * @param {Slide} props.slide - Slide object
   * @returns {JSX.Element} The Slide component
   */
  const Slide = ({ slide }) => (
    <div>
      <img
        src={slide.url}
        alt={slide.alternativeText}
      />
      {slide?.caption &&
        <div className="legend" style={classes.legendContainer}>
          <h6
            style={{
              fontFamily: theme.typography.fontFamily,
              backgroundColor: theme.palette.primary.main,
              ...classes.legend
            }}
          >
            {slide.caption}
          </h6>
        </div>
      }
    </div>
  )

  return (
    <Box sx={{ margin: `auto ${isDesktop && !fullscreen ? '5vw' : 0}`, pt: content.Title ? 3 : 0 }}>
      <Carousel showThumbs={false} autoPlay infiniteLoop showStatus={false}>
        {isDesktop
          ? content.slidesDesktop.map((slide, index) => (
            <Slide slide={slide} key={index} />
          ))
          : content.slidesMobile.map((slide, index) => (
            <Slide slide={slide} key={index} />
          ))
        }
      </Carousel>
    </Box>
  )
}
