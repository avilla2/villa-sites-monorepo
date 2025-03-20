import React from 'react'
import logo from './images/mendozas_towing_rounded.png'

export default function Loading () {
  return (
        <div id="loading">
            <div id="loadingframefloat">
                <img src={logo} width={200} alt="logo" id="logo" />
            </div>
        </div>
  )
}
