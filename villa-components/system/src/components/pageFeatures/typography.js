import React from 'react'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'

const StyledTypography = styled(Typography)(({ theme }) => ({
  '& h1': {
    fontFamily: theme.typography.h1.fontFamily
  },
  '& h2': {
    fontFamily: theme.typography.h2.fontFamily
  }
})
)

export default function CustomTypography ({ children, ...props }) {
  return (
        <StyledTypography {...props}>
            {children}
        </StyledTypography>
  )
}
