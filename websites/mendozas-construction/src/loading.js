import React from 'react'
import logo from './images/mendozas_logo_rounded.png'

export default function Loading () {
  return (
        <div id="loading">
            <div id="loadingframe">
                <img src={logo} width={200} alt="logo" id="logo" />
            </div>
        </div>
  )
}
