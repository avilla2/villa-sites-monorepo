import React from 'react'
import IconButton from '@mui/material/IconButton'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import InstagramIcon from '@mui/icons-material/Instagram'
import FacebookIcon from '@mui/icons-material/Facebook'
import YouTubeIcon from '@mui/icons-material/YouTube'
import XIcon from '@mui/icons-material/X'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { TikTokIcon } from '../pageFeatures/extraIcons'
import isExternal from '../utils/isExternalLink'
import { Link } from 'react-router-dom'

const classes = {
  root: {
    margin: '0px'
  }
}

const generateIcon = (iconName) => {
  switch (iconName) {
    case 'Instagram':
      return <InstagramIcon fontSize='large' />
    case 'Facebook':
      return <FacebookIcon fontSize='large' />
    case 'Youtube':
      return <YouTubeIcon fontSize='large' />
    case 'X':
      return <XIcon fontSize='large' />
    case 'TikTok':
      return <TikTokIcon fontSize='large' />
    default:
      return <OpenInNewIcon fontSize='large' />
  }
}
export default function Icons ({ content }) {
  return (
        <Box sx={classes.root}>
            <Container>
                {content.Entry.map((item, key) => {
                  return (
                        <IconButton
                            key={key}
                            component={isExternal(item.Link) ? 'a' : Link}
                            href={item.Link}
                            sx={item.Color ? { color: item.Color } : null}
                        >
                            {generateIcon(item.Icon)}
                        </IconButton>
                  )
                })}
            </Container>
        </Box>
  )
}
