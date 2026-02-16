import React from 'react'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import useMediaQuery from '@mui/material/useMediaQuery'
import AnimationProvider from '../utils/animationProvider'
import { useTheme } from '@mui/material/styles'
import { CustomButton as Button } from '@villa-components/components'

const classes = {
  root: {
    margin: 'auto 5vw'
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap'
  }
}

/**
 * Buttons component - Renders a group of buttons with optional arrangement and animation
 * @param {Object} props - Buttons props
 * @param {ButtonsComponent} props.content - Button group content object
 * @returns {JSX.Element} The Buttons component
 */
export default function Buttons ({ content }) {
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))

  const getButtonSpacing = (textAlignment) => {
    switch (content.ButtonArrangement) {
      case 'spaced_evenly':
        return { justifyContent: 'space-evenly' }
      default:
        return { justifyContent: textAlignment ?? 'center', gap: theme.spacing(2) }
    }
  }

  const ButtonGroupRoot = ({ children }) => {
    const mobileXS = useMediaQuery('(min-width:500px)')
    if (content.ButtonArrangement === 'together' || content.ButtonArrangement === null) {
      return <ButtonGroup orientation={mobileXS ? 'horizontal' : 'vertical'}>{children}</ButtonGroup>
    } else {
      return <Box sx={classes.buttonGroup} style={getButtonSpacing(content?.Style?.textAlign)}>{children}</Box>
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
