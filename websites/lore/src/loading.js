import React from 'react'
import logo from './images/peinados_lore_logo.png'

export default function Loading () {
  return (
        <div id="loading">
            <div id="animate-flicker">
                <img src={logo} width={200} alt="logo" id="logo" />
            </div>
        </div>
  )
}
