import React from 'react'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import useMediaQuery from '@mui/material/useMediaQuery'
import AnimationProvider from '../utils/animationProvider'
import { useTheme } from '@mui/material/styles'
import Button from '../pageFeatures/button'

const classes = {
  root: {
    margin: 'auto 5% 1% 5%'
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}
export default function Buttons ({ content }) {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const getButtonSpacing = () => {
    switch (content.ButtonArrangement) {
      case 'spaced_evenly':
        return { justifyContent: 'space-evenly' }
      default:
        return { justifyContent: 'center', gap: theme.spacing(2) }
    }
  }

  const ButtonGroupRoot = ({ children }) => {
    const mobileXS = useMediaQuery('(min-width:500px)')
    if (content.ButtonArrangement === 'together' || content.ButtonArrangement === null) {
      return <ButtonGroup orientation={mobileXS ? 'horizontal' : 'vertical'}>{children}</ButtonGroup>
    } else {
      return <Box sx={classes.buttonGroup} style={getButtonSpacing()}>{children}</Box>
    }
  }
  return (
    <AnimationProvider animation={content?.Style?.Animation} direction="down">
        <Box sx={classes.root}>
            <ButtonGroupRoot>
            {content.Entry.map((entry, index) => (
                <Button
                    key={index}
                    buttonStyle={content?.GroupButtonStyle}
                    mobile={mobile}
                    link={entry.Link}
                    color={entry.ButtonColor}
                >
                  {entry.Text}
                </Button>
            ))}
            </ButtonGroupRoot>
        </Box>
    </AnimationProvider>
  )
}
