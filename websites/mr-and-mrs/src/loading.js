import React from 'react'
import logo from './images/MrAndMrsLogo.png'

export default function Loading () {
  return (
        <div id="loading">
            <div id="loadingframefloat">
                <img src={logo} width={200} alt="logo" id="logo" />
            </div>
        </div>
  )
}
