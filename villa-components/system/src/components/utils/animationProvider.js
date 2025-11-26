import React from 'react'
import VizSensor from 'react-visibility-sensor'
import Slide from '@mui/material/Slide'
import Fade from '@mui/material/Fade'
import Box from '@mui/material/Box'

/**
 * Animation Wrapper component - Chooses the appropriate animation wrapper based on type
 * @param {Object} props - Wrapper props
 * @param {React.ReactNode} props.children - Child components to be animated
 * @param {boolean} props.active - Whether the animation is active
 * @param {string} props.animation - Type of animation ('Fade', 'Slide', or 'None')
 * @param {Object} props.containerRef - Reference to the container element for slide animation
 * @param {number} props.timeout - Duration of the animation in milliseconds
 * @param {string} props.direction - Direction for slide animation ('up', 'down', 'left', 'right')
 * @returns {JSX.Element} The appropriate animation wrapper component
 */
const Wrapper = ({ children, active, animation, containerRef, timeout, direction }) => {
  switch (animation) {
    case 'Fade':
      return <Fade timeout={timeout} in={active}>{children}</Fade>
    case 'Slide':
      return <Slide direction={direction} timeout={timeout} in={active} container={containerRef.current}>{children}</Slide>
    default:
      return <>{children}</>
  }
}

/**
 * AnimationProvider component - Wraps children with animation based on visibility
 * @param {Object} props - AnimationProvider props
 * @param {React.ReactNode} props.children - Child components to be animated
 * @param {string} props.animation - Type of animation ('Fade', 'Slide', or 'None')
 * @param {number} [props.timeout=1500] - Duration of the animation in milliseconds
 * @param {string} [props.direction='up'] - Direction for slide animation ('up', 'down', 'left', 'right')
 * @param {boolean} [props.partialVisibility=false] - Whether to trigger animation on at least partial visibility
 * @returns {JSX.Element} The AnimationProvider component
 */
const AnimationProvider = ({ children, animation, timeout = 1500, direction = 'up', partialVisibility = false }) => {
  const [active, setActive] = React.useState(false)
  const ref = React.useRef('')

  if (!animation || animation === 'None') {
    return <Box>{children}</Box>
  }

  return (
    <div ref={ref}>
      <VizSensor
          partialVisibility={partialVisibility}
          onChange={(isVisible) => {
            if (isVisible && !active) {
              setActive(isVisible)
            }
          }}
      >
        <Wrapper active={active} animation={animation} containerRef={ref} timeout={timeout} direction={direction}>
          {children}
        </Wrapper>
      </VizSensor>
    </div>
  )
}

export default AnimationProvider
