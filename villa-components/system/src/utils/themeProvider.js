import React from 'react'
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material'

const createThemeConfigs = (palette, fonts) => {
  const colors = ['primary', 'secondary', 'info', 'success', 'warning']
  const filteredColors = colors.filter(val => palette[val] != null)
  const formatedPalette = Object.fromEntries(filteredColors.map(val => [val, { main: palette[val] }]))

  return createTheme({
    palette: formatedPalette,
    typography: {
      fontFamily: [
        ...fonts.toReversed(),
        '"sans-serif"',
        '"Segoe UI"',
        'Roboto',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      body1: {
        fontWeight: 400
      },
      h2: {
        fontFamily: [
          ...fonts,
          '"sans-serif"',
          '"Segoe UI"',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(',')
      },
      h6: {
        fontFamily: [
          ...fonts,
          '"sans-serif"',
          '"Segoe UI"',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(',')
      },
      subtitle1: {
        fontFamily: [
          ...fonts,
          '"sans-serif"',
          '"Segoe UI"',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(',')
      },
      button: {
        fontFamily: [
          ...fonts,
          '"sans-serif"',
          '"Segoe UI"',
          'Roboto',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ].join(',')
      }
    }
  })
}

export default function ThemeProvider ({ palette, fonts, children }) {
  return (
    <MuiThemeProvider theme={createThemeConfigs(palette, fonts)}>
        {children}
    </MuiThemeProvider>
  )
}
