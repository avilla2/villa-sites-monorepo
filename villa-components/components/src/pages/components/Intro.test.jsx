/* eslint-env jest */
import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Intro from './Intro'
import Contact from './Contact'
import Slideshow from './Slideshow'

jest.mock('react-markdown', () => function Markdown ({ children }) { return <p>{children}</p> })
jest.mock('./Slideshow', () => jest.fn(() => <div data-testid="slideshow" />))
jest.mock('../../shared/Button', () => function Button ({ children, link }) { return <a href={link}>{children}</a> })

const theme = createTheme()
const desktopFile = { url: '/desktop.jpg', mime: 'image/jpeg', alternativeText: 'Desktop hero' }
const mobileFile = { url: '/mobile.jpg', mime: 'image/jpeg', alternativeText: 'Mobile hero' }
const formData = {
  FormTitle: 'Start your next project',
  FormDescription: 'Tell us about your plans for a free estimate.',
  SendTo: 'team@example.com',
  SendFrom: 'website@example.com',
  BodyTitle: 'Project details'
}
const formFields = [
  { name: 'name', label: 'Name', type: 'any', fullWidth: false },
  { name: 'email', label: 'Email', type: 'any', fullWidth: false }
]
const content = {
  IntroText: 'Built around your vision',
  File: [desktopFile],
  MobileFile: [mobileFile],
  TextPosition: 'Centered',
  FormData: formData,
  FormFields: formFields
}

const renderIntro = (overrides = {}) => render(
  <ThemeProvider theme={theme}>
    <Intro content={{ ...content, ...overrides }} siteName="Example Builders" />
  </ThemeProvider>
)

beforeEach(() => {
  jest.clearAllMocks()
  window.matchMedia = jest.fn().mockImplementation(() => ({
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn()
  }))
})

afterEach(cleanup)

test('renders the GraphQL form title and description above the embedded form', () => {
  renderIntro()

  expect(screen.getByRole('heading', { name: formData.FormTitle }).tagName).toBe('H3')
  expect(screen.getByText(formData.FormDescription)).toBeTruthy()
  expect(screen.getByLabelText(/Project details/).rows).toBe(4)
  expect(screen.getByLabelText(/Name/)).toBeTruthy()
})

test('keeps forms without optional title and description working', () => {
  renderIntro({ FormData: { ...formData, FormTitle: null, FormDescription: null } })

  expect(screen.queryByRole('heading')).toBeNull()
  expect(screen.getByRole('button', { name: /Submit/ })).toBeTruthy()
})

test('does not render a form card when form fields are empty', () => {
  renderIntro({ FormFields: [] })

  expect(screen.queryByRole('heading', { name: formData.FormTitle })).toBeNull()
  expect(screen.queryByRole('button', { name: /Submit/ })).toBeNull()
  expect(screen.getByText(content.IntroText)).toBeTruthy()
})

test('supports an intro without background media', () => {
  renderIntro({ File: null, MobileFile: [] })

  expect(screen.queryByRole('img')).toBeNull()
  expect(screen.getByText(content.IntroText)).toBeTruthy()
})

test('selects mobile media and falls back to desktop media when absent', () => {
  window.matchMedia.mockImplementation(() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }))
  const { unmount } = renderIntro()
  expect(screen.getByRole('img').getAttribute('src')).toBe(mobileFile.url)

  unmount()
  renderIntro({ MobileFile: [] })
  expect(screen.getByRole('img').getAttribute('src')).toBe(desktopFile.url)
})

test('provides both responsive slide arrays to the slideshow', () => {
  const slides = [desktopFile, { ...desktopFile, url: '/second.jpg' }]
  renderIntro({ File: slides })

  expect(Slideshow.mock.calls[0][0].content).toEqual({ slidesDesktop: slides, slidesMobile: slides })
})

test('preserves CTA links and video backgrounds', () => {
  const { container } = renderIntro({
    File: [{ url: '/hero.mp4', mime: 'video/mp4' }],
    Buttons: [{ Text: 'Our work', Link: '/projects' }]
  })

  expect(screen.getByRole('link', { name: 'Our work' }).getAttribute('href')).toBe('/projects')
  expect(container.querySelector('video').hasAttribute('playsinline')).toBe(true)
  expect(container.querySelector('source').getAttribute('src')).toBe('/hero.mp4')
})

test('preserves standalone Contact form spacing and message size', () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Contact content={{ formFields, bodyTitle: 'Message' }} />
    </ThemeProvider>
  )

  expect(screen.getByLabelText(/Message/).rows).toBe(8)
  expect(container.querySelector('form').style.margin).toBe('40px 5% 40px 5%')
})