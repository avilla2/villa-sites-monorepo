---
to: websites/<%= name %>/src/loading.js
---
import React from 'react'
import logo from './images/VWS_logo.png'

export default function Loading () {
  return (
        <div id="loading">
            <div id="loadingframe">
                <img src={logo} width={200} alt="logo" id="logo" />
            </div>
        </div>
  )
}
