import React from 'react'
import logo from './images/los_valdivias_logo_round_md.png'

export default function Loading () {
  return (
        <div id="loading">
            <div id="loadingframe">
                <img src={logo} width={200} alt="logo" id="logo" />
            </div>
        </div>
  )
}
