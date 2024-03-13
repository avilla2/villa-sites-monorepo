import React from 'react'
import VizSensor from 'react-visibility-sensor'
import Slide from '@mui/material/Slide'
import Fade from '@mui/material/Fade'

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

const AnimationProvider = ({ children, animation, timeout = 1500, direction = 'up', partialVisibility = false }) => {
  const [active, setActive] = React.useState(false)
  const ref = React.useRef('')
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
