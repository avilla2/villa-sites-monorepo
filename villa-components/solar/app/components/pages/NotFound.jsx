import React from 'react'
import { Link } from 'react-router'

export default function NotFound () {
  return (
    <div className="utility-page utility-page--full">
      <p className="utility-page__sub">This page is not available.</p>
      <Link to="/" className="utility-page__btn">Return Home</Link>
    </div>
  )
}
