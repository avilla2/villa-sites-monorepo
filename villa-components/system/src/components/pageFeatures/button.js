import React from 'react'
import Button from '@mui/material/Button'
import isExternal from '../utils/isExternalLink'
import { Link } from 'react-router-dom'
import { styled, useTheme, alpha } from '@mui/material/styles'

const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'borderColor'
})(({ borderColor }) => ({
  textTransform: 'none',
  '&:hover': {
    border: `1px solid ${alpha(borderColor, 0.2)}`,
    backgroundColor: alpha(borderColor, 0.05)
  }
})
)

const getButtonColor = (color, style, def) => {
  const trueColor = color || def
  switch (style) {
    case 'contained':
      return { backgroundColor: trueColor, color: 'inherit' }
    case 'text':
      return { color: trueColor }
    default:
      return { borderColor: trueColor, color: 'inherit', backgroundColor: alpha(trueColor, 0.35) }
  }
}

export default function CustomButton ({ buttonStyle, children, link, onClick, mobile, color, disabled, ...props }) {
  const theme = useTheme()

  if (onClick) {
    return (
        <StyledButton
            variant={buttonStyle || 'outlined'}
            size={mobile ? 'regular' : 'large'}
            sx={getButtonColor(color, buttonStyle, theme.palette.primary.main)}
            onClick={onClick}
            disabled={disabled}
            borderColor={color || theme.palette.secondary.main}
            {...props}
        >
            {children}
        </StyledButton>
    )
  } else {
    return (
        <StyledButton
            variant={buttonStyle || 'outlined'}
            size={mobile ? 'regular' : 'large'}
            component={isExternal(link) ? 'a' : Link}
            href={link}
            to={link}
            sx={getButtonColor(color, buttonStyle, theme.palette.primary.main)}
            borderColor={color || theme.palette.secondary.main}
            disabled={disabled}
            {...props}
        >
            {children}
        </StyledButton>
    )
  }
}
