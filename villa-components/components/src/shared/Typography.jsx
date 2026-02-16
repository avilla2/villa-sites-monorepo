import React from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const StyledTypography = styled(Typography)(({ theme }) => ({
  '& h1': {
    fontFamily: theme.typography.h1.fontFamily
  },
  '& h2': {
    fontFamily: theme.typography.h2.fontFamily,
    fontWeight: 300
  }
})
)

/**
 * CustomTypography component - Renders typography with theme-aware font styling
 * @param {Object} props - CustomTypography props
 * @param {React.ReactNode} props.children - Content to be displayed
 * @returns {JSX.Element} The CustomTypography component
 */
export default function CustomTypography ({ children, ...props }) {
  return (
        <StyledTypography {...props}>
            {children}
        </StyledTypography>
  )
}
