import React from 'react'
import Icons from '../footerComponents/icons'
import Text from '../footerComponents/text'
import Image from '../footerComponents/image'
import Box from '@mui/material/Box'

const classes = {
  root: {
    width: '100%'
  }
}

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
