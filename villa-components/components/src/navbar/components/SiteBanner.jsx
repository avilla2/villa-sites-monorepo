import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router'
import isExternal from '../../utils/isExternalLink'

/**
 * CountdownTimer component - Displays a countdown timer with flipping digits
 * @param {Object} props - CountdownTimer props
 * @param {string} props.countdownDate - Target date for countdown (ISO 8601 format)
 * @param {string} props.textColor - Color for the timer text
 * @returns {JSX.Element|null} The CountdownTimer component or null if date is invalid
 */
function CountdownTimer ({ countdownDate, textColor }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(countdownDate)
      const now = new Date()
      const difference = targetDate - now

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 }
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      return { days, hours, minutes, seconds, totalDays: days }
    }

    const updateTimer = () => {
      const time = calculateTimeLeft()
      setTimeLeft(time)
      setIsUrgent(time.totalDays < 3)
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)

    return () => clearInterval(interval)
  }, [countdownDate])

  if (!countdownDate) {
    return null
  }

  const digitStyle = {
    display: 'inline-block',
    minWidth: '2ch',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.1em',
    padding: '2px 4px',
    borderRadius: '4px',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    transition: 'all 0.6s ease-in-out',
    color: isUrgent ? '#ff0000' : textColor
  }

  const labelStyle = {
    fontSize: '0.75em',
    opacity: 0.9,
    marginLeft: '2px',
    color: isUrgent ? '#ff0000' : textColor
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        mx: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
        <span style={digitStyle} key={`days-${timeLeft.days}`}>{timeLeft.days}</span>
        <span style={labelStyle}>d</span>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
        <span style={digitStyle} key={`hours-${timeLeft.hours}`}>
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span style={labelStyle}>h</span>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
        <span style={digitStyle} key={`minutes-${timeLeft.minutes}`}>
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span style={labelStyle}>m</span>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
        <span style={digitStyle} key={`seconds-${timeLeft.seconds}`}>
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
        <span style={labelStyle}>s</span>
      </Box>
    </Box>
  )
}

/**
 * SiteBanner component - Displays a promotional banner at the top of the website
 * @param {Object} props - SiteBanner props
 * @param {SiteBanner} props.siteBanner - Site banner configuration object
 * @returns {JSX.Element|null} The SiteBanner component or null if no banner data
 */
export default function SiteBanner ({ siteBanner }) {
  const bannerRef = React.useRef(null)

  if (!siteBanner || !siteBanner.text) {
    return null
  }

  const {
    text,
    cta,
    timer,
    countdownDate,
    style = {}
  } = siteBanner

  const {
    TextColor = '#ffffff',
    BackgroundColor = '#000000',
    textAlign = 'center',
    paddingTop = '12px',
    paddingBottom = '12px'
  } = style

  return (
    <Box
      ref={bannerRef}
      sx={{
        width: '100%',
        backgroundColor: BackgroundColor,
        color: TextColor,
        pt: paddingTop,
        pb: paddingBottom,
        display: 'flex',
        alignItems: 'center',
        justifyContent: textAlign,
        flexWrap: 'wrap',
        gap: 2,
        px: 1
      }}
    >
      <Typography
        variant="body2"
        sx={{
          fontWeight: 500,
          textAlign
        }}
      >
        {text}
      </Typography>

      {cta && (
        <Typography
          component={isExternal(cta) ? 'a' : Link}
          href={cta}
          to={cta}
          variant="body2"
          sx={{
            fontWeight: 'bold',
            textDecoration: 'underline',
            color: TextColor,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.8
            }
          }}
        >
          Learn More →
        </Typography>
      )}

      {timer && countdownDate && (
        <CountdownTimer countdownDate={countdownDate} textColor={TextColor} />
      )}
    </Box>
  )
}
