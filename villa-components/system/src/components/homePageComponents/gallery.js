import React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import useMediaQuery from '@mui/material/useMediaQuery'
import AnimationProvider from '../utils/animationProvider'

const classes = {
  root: {
    margin: '2% 3% 5% 3%'
  },
  imageList: (theme) => ({
    width: '100%',
    flexWrap: 'nowrap',
    [theme.breakpoints.up('xl')]: {
      maxHeight: 1400
    },
    [theme.breakpoints.between('lg', 'lg')]: {
      maxHeight: 1000
    },
    [theme.breakpoints.between('sm', 'md')]: {
      maxHeight: 700
    },
    [theme.breakpoints.down('xs')]: {
      maxHeight: 400
    }
  })
}

export default function Gallery ({ content }) {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
  return (
    <Box sx={classes.root}>
      <AnimationProvider animation={content?.Style?.Animation} direction="up" partialVisibility>
        <ImageList sx={classes.imageList} variant="masonry" cols={mobile ? 1 : 3} gap={8}>
            {content.Pictures.data.map((item, index) => (
              <ImageListItem key={index}>
                  <img src={`${process.env.REACT_APP_BACKEND_URL}${item.attributes.url}`} alt={item.alternativeText} />
              </ImageListItem>
            ))}
        </ImageList>
      </AnimationProvider>
    </Box>
  )
}
