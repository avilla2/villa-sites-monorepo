/* eslint-env jest */
import React from 'react'
import { render, screen, cleanup, act } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import SiteMapPage from './SiteMapPage'
import Navbar from '../navbar/Navbar'

jest.mock('react-router', () => ({
  Link: require('react').forwardRef(function Link({ to, children, ...props }, ref) {
    return (
      <a ref={ref} href={to} {...props}>
        {children}
      </a>
    )
  })
}))

const theme = createTheme({
  palette: { primary: { main: '#234c40' }, warning: { main: '#ff0000' } }
})
const renderPage = (children) => render(<ThemeProvider theme={theme}>{children}</ThemeProvider>)

afterEach(() => {
  cleanup()
  jest.restoreAllMocks()
})

test('uses a theme-colored navbar-height backdrop without a decorative banner', () => {
  const { container } = renderPage(
    <SiteMapPage
      setPage={jest.fn()}
      locale="en"
      contentPages={[{ Title: 'Services', Link: '/services' }]}
    />
  )
  const backdrop = container.querySelector('[aria-hidden="true"]')
  const style = getComputedStyle(backdrop)

  expect(style.backgroundColor).toBe('rgb(35, 76, 64)')
  expect(style.borderRadius).toBe('')
  const css = Array.from(document.styleSheets)
    .flatMap((sheet) => Array.from(sheet.cssRules).map((rule) => rule.cssText))
    .join('\n')
  expect(css).toContain('height: var(--villa-navbar-overlay-height, 128px)')
  expect(screen.getByRole('link', { name: 'Services' }).getAttribute('href')).toBe('/services')
})

test('tracks navbar size changes and removes extra contrast space on mobile', () => {
  let height = 128
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({ height }))
  const { unmount } = renderPage(
    <Navbar
      Items={[]}
      MobileConfig={{ MobileIcon: { url: '/logo.svg' }, IconLink: '/' }}
      minSize="md"
      navIndex="/"
    />
  )
  const value = () =>
    document.documentElement.style.getPropertyValue('--villa-navbar-overlay-height')

  expect(value()).toBe('128px')
  height = 256
  act(() => window.dispatchEvent(new Event('resize')))
  expect(value()).toBe('256px')
  height = 0
  act(() => window.dispatchEvent(new Event('resize')))
  expect(value()).toBe('0px')

  unmount()
  expect(value()).toBe('')
})
