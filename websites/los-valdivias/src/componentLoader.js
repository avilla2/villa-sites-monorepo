import React from 'react'
import './componentLoader.css'
import logoImage from './images/los_valdivias_logo_round_md.webp'

/**
 * ComponentLoader - Renders a minimal landscaping-inspired fullscreen loading animation
 * Displayed while federated modules are loading
 * @returns {JSX.Element} The ComponentLoader component
 */
export default function ComponentLoader () {
  return (
    <div className="component-loader">
      <div className="loader-container">
        {/* Animated background */}
        <div className="loader-background"></div>

        {/* Minimal loading indicator */}
        <div className="loader-content">
          <img src={logoImage} alt="Loading..." className="loader-icon" />
          <div className="loader-bar">
            <div className="loader-bar-fill"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
