import React from 'react'
import Icons from './icons'
import Text from './text'
import Image from './image'
import Box from '@mui/material/Box'

const classes = {
  root: {
    width: '100%'
  }
}

/**
 * GenerateFooterContent component - Routes footer content to appropriate component based on type
 * @param {Object} props - GenerateFooterContent props
 * @param {FooterContent} props.content - Footer content item (FooterImage, FooterText, or FooterIcons)
 * @returns {JSX.Element} The appropriate footer component or error message
 */
export default function GenerateFooterContent (props) {
  const renderComponent = (object) => {
    switch (object.__typename) {
      case 'ComponentFooterComponentsImage':
        return <Image content={object} />
      case 'ComponentFooterComponentsText':
        return <Text content={object} />
      case 'ComponentFooterComponentsIcons':
        return <Icons content={object} />
      default:
        return <h2>Error: Footer Content Not Found</h2>
    }
  }

  return (
        <Box sx={classes.root}>
            {renderComponent(props.content)}
        </Box>
  )
}
