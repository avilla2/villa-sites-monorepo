import React from 'react'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Carousel } from 'react-responsive-carousel';


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

export default function Slideshow ({ content }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  const Slide = ({slide}) => (
    <div>
        <img
            src={`${process.env.REACT_APP_BACKEND_URL}${slide.attributes.url}`} 
            alt={slide.attributes.alternativeText} 
        />
        {slide.attributes?.caption &&
        <div className="legend" style={classes.legendContainer}>
            <h6
                style={{
                    fontFamily: theme.typography.fontFamily, 
                    backgroundColor: theme.palette.primary.main, 
                    ...classes.legend
                }} 
            >
                {slide.attributes.caption}
            </h6>
        </div>
            
        }
    </div>
  )


  return (
    <Box>
        <Box>
            <Carousel  infiniteLoop showStatus={false}>
                {isDesktop ? 
                    content.slidesDesktop.data.map((slide, index) => (
                        <Slide slide={slide} key={index} />
                    ))
                :
                    content.slidesMobile.data.map((slide, index) => (
                        <Slide slide={slide} key={index} />
                    ))
                }
            </Carousel>
        </Box>
    </Box>
  )
}