import React from 'react'
import Button from '@mui/material/Button'
import isExternal from '../utils/isExternalLink'
import { useTheme } from '@mui/material/styles'
import { Link } from 'react-router-dom'

const getButtonColor = (color, style, def) => {
  const trueColor = color || def
  switch (style) {
    case 'contained':
      return { backgroundColor: trueColor, color: 'inherit' }
    case 'text':
      return { color: trueColor }
    default:
      return { borderColor: trueColor, color: 'inherit' }
  }
}

export default function CustomButton ({ buttonStyle, children, link, onClick, mobile, color, disabled, ...props }) {
  const theme = useTheme()

  if (onClick) {
    return (
        <Button
            variant={buttonStyle || 'outlined'}
            size={mobile ? 'regular' : 'large'}
            sx={getButtonColor(color, buttonStyle, theme.palette.primary.main)}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {children}
        </Button>
    )
  } else {
    return (
        <Button
            variant={buttonStyle || 'outlined'}
            size={mobile ? 'regular' : 'large'}
            component={isExternal(link) ? 'a' : Link}
            href={link}
            to={link}
            sx={getButtonColor(color, buttonStyle, theme.palette.primary.main)}
            disabled={disabled}
            {...props}
        >
            {children}
        </Button>
    )
  }
}
