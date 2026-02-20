import React from 'react'
import Box from '@mui/material/Box'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import useMediaQuery from '@mui/material/useMediaQuery'

/**
 * Gallery component - Renders a gallery of images with optional animation
 * @param {Object} props - Gallery props
 * @param {GalleryComponent} props.content - Gallery content object
 * @param {React.Component} props.AnimationProvider - AnimationProvider component from parent app
 * @returns {JSX.Element} The Gallery component
 */
export default function Gallery ({ content, AnimationProvider }) {
  const mobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const imageList = (
    <ImageList
      sx={(theme) => ({
        width: '100%',
        flexWrap: 'nowrap',
        maxHeight: {
          xs: 400,
          sm: 700,
          lg: 1000,
          xl: 1400
        }
      })}
      variant="masonry"
      cols={mobile ? 1 : 3}
      gap={8}
    >
      {content.Pictures.map((item, index) => (
        <ImageListItem key={index}>
          <img src={item.url} alt={item.alternativeText} />
        </ImageListItem>
      ))}
    </ImageList>
  )

  return (
    <Box sx={{ margin: '2% 3% 5% 3%' }}>
      {AnimationProvider
        ? (
          <AnimationProvider animation={content?.Style?.Animation} direction="up" partialVisibility>
            {imageList}
          </AnimationProvider>
          )
        : imageList
      }
    </Box>
  )
}
