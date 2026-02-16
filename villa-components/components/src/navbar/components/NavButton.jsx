import React from 'react'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router'
import isExternal from '../../utils/isExternalLink'

/**
 * NavButton component - Renders a styled action button in the navbar
 * @param {Object} props - NavButton props
 * @param {string} props.text - Button display text
 * @param {string} props.color - Button background color
 * @param {string} props.link - Target URL for the button
 * @param {string} props.fontColor - Text color for the button
 * @returns {JSX.Element} The NavButton component
 */
export default function NavButton ({ text, color, link, fontColor }) {
  return (
    <Button
      variant='contained'
      size='small'
      component={isExternal(link) ? 'a' : Link}
      href={link}
      to={link}
      sx={{
        mx: 2,
        px: 3,
        borderRadius: 20,
        ...(color && { backgroundColor: color })
      }}
    >
      <Typography
        variant='subtitle1'
        sx={{
          fontSize: 14,
          ...(fontColor && { color: fontColor })
        }}
      >
        {text}
      </Typography>
    </Button>
  )
}
