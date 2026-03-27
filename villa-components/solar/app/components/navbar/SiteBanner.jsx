import React, { useState, useEffect } from 'react'
import { Link } from 'react-router'
import isExternal from '../../lib/isExternalLink'

// ─── Countdown Timer ─────────────────────────────────────────────────────────
function CountdownTimer ({ countdownDate, textColor }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    const calc = () => {
      const diff = new Date(countdownDate) - new Date()
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, totalDays: 0 }
      return {
        days: Math.floor(diff / 864e5),
        hours: Math.floor((diff / 36e5) % 24),
        minutes: Math.floor((diff / 6e4) % 60),
        seconds: Math.floor((diff / 1e3) % 60),
        totalDays: Math.floor(diff / 864e5)
      }
    }
    const tick = () => {
      const t = calc()
      setTimeLeft(t)
      setIsUrgent(t.totalDays < 3)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [countdownDate])

  if (!countdownDate) return null

  const urgentColor = '#ff0000'
  const color = isUrgent ? urgentColor : (textColor || 'inherit')

  const Digit = ({ value, label }) => (
    <span className="site-banner__timer-unit" style={{ color }}>
      <span className="site-banner__timer-digit">{value}</span>
      <span className="site-banner__timer-label">{label}</span>
    </span>
  )

  return (
    <span className="site-banner__timer">
      <Digit value={timeLeft.days} label="d" />
      <Digit value={String(timeLeft.hours).padStart(2, '0')} label="h" />
      <Digit value={String(timeLeft.minutes).padStart(2, '0')} label="m" />
      <Digit value={String(timeLeft.seconds).padStart(2, '0')} label="s" />
    </span>
  )
}

// ─── SiteBanner ──────────────────────────────────────────────────────────────
/**
 * @param {{ siteBanner: import('../../../../villa-components/components/src/types').SiteBanner }} props
 */
export default function SiteBanner ({ siteBanner }) {
  if (!siteBanner?.text) return null

  const { text, cta, timer, countdownDate, style = {} } = siteBanner
  const {
    TextColor = '#ffffff',
    BackgroundColor = '#000000',
    textAlign = 'center',
    paddingTop = '12px',
    paddingBottom = '12px'
  } = style

  return (
    <div
      className="site-banner"
      style={{
        backgroundColor: BackgroundColor,
        color: TextColor,
        paddingTop,
        paddingBottom,
        justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start'
      }}
    >
      <span className="site-banner__text">{text}</span>

      {cta && (
        isExternal(cta)
          ? <a href={cta} className="site-banner__cta" style={{ color: TextColor }} target="_blank" rel="noopener noreferrer">Learn More →</a>
          : <Link to={cta} className="site-banner__cta" style={{ color: TextColor }}>Learn More</Link>
      )}

      {timer && countdownDate && (
        <CountdownTimer countdownDate={countdownDate} textColor={TextColor} />
      )}
    </div>
  )
}
