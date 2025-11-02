import React from 'react'
import logo from './images/logo_standard_white.png'

export default function Loading () {
  return (
        <div id="loading">
            <div id="loadingframefloat">
                <img src={logo} width={200} alt="logo" id="logo" style={{ overflow: 'hidden', borderRadius: 30 }} />
            </div>
        </div>
  )
}
