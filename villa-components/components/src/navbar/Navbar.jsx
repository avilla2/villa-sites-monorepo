import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import Drawer from '@mui/material/Drawer'
import { Link } from 'react-router'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NavComponentDesktop from './components/NavComponentDesktop'
import MobileDrawer from './components/MobileDrawer'
import SiteBanner from './components/SiteBanner'

/**
 * Navbar component - Main navigation bar component that renders responsive navbar for desktop and mobile
 * @param {Object} props - Navbar props
 * @param {string} props.page - Current page name/title
 * @param {string} props.navIndex - Currently active navigation index/link
 * @param {NavbarItem[]} props.Items - Array of navigation items
 * @param {MobileConfig} props.MobileConfig - Mobile-specific configuration
 * @param {SiteBanner} props.siteBanner - Optional site banner configuration
 * @param {string} props.Style - Navbar layout style (Spaced, Left_Aligned, Split, or default)
 * @param {string} props.Appearance - Navbar appearance style
 * @param {string} props.FontColor - Font color for the navbar
 * @param {number} props.minSize - Minimum width breakpoint for desktop layout
 * @param {string} props.mobileTitle - Title to display on mobile navbar
 * @param {Function} props.onBackClick - Callback function for back button click (required for SSR compatibility)
 * @returns {JSX.Element} The Navbar component with responsive desktop and mobile layouts
 */
export default function Navbar ({
  page,
  navIndex,
  Items: content,
  MobileConfig: mobileData,
  siteBanner,
  Style: style,
  Appearance: appearance,
  FontColor: fontColor,
  minSize,
  mobileTitle,
  onBackClick
}) {
  const [mounted, setMounted] = useState(false)
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 65 })
  const [active, setActive] = useState(navIndex)
  const [isOpen, setIsOpen] = useState(false)
  const showBackButton = navIndex !== '/'

  // Safety checks for required props
  if (!content || !mobileData) {
    return null
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (navIndex) {
      setActive(navIndex)
    }
  }, [navIndex])

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setIsOpen(open)
  }

  const getToolbarStyles = () => {
    const baseStyles = {
      minHeight: 128,
      alignItems: 'center'
    }

    switch (style) {
      case 'Spaced':
        return {
          ...baseStyles,
          justifyContent: 'flex-start',
          px: '2%',
          '& a:first-of-type': {
            flexGrow: 1,
            display: 'flex',
            justifyContent: 'flex-start'
          }
        }
      case 'Left_Aligned':
        return {
          ...baseStyles,
          justifyContent: 'flex-start',
          mx: '2%'
        }
      default:
        return {
          ...baseStyles,
          justifyContent: 'center',
          mx: '2%',
          '& a': {
            flexGrow: 1
          }
        }
    }
  }

  const isNavText = (itemType) => itemType === 'ComponentNavbarComponentsTextLink' || itemType === 'ComponentNavbarComponentsNavMenu'

  return (
    <Box sx={fontColor && { color: fontColor }}>
      {/* Desktop Navbar */}
      <Box sx={{ display: { xs: 'none', [minSize]: 'block' } }}>
        {style === 'Split'
          ? (
              <AppBar
                sx={{ color: 'inherit' }}
                position="fixed"
                elevation={!mounted ? 1 : (!trigger ? 0 : 1)}
                color={!mounted ? 'primary' : (!trigger && appearance === 'fade_in' ? 'transparent' : 'primary')}
              >
                {siteBanner && <SiteBanner siteBanner={siteBanner} />}
                <Toolbar
                  sx={{
                    justifyContent: 'flex-start',
                    px: '2%',
                    minHeight: 128,
                    alignItems: 'center',
                    backgroundColor: 'white',
                    '& a:first-of-type': {
                      flexGrow: 1,
                      display: 'flex',
                      justifyContent: 'flex-start'
                    }
                  }}
                >
                  {content.map((item, index) => {
                    if (!isNavText(item.__typename)) {
                      return (
                        <NavComponentDesktop
                          item={item}
                          key={index}
                          active={active}
                          fontColor={fontColor}
                        />
                      )
                    }
                    return <React.Fragment key={index}></React.Fragment>
                  })}
                </Toolbar>
                <Toolbar
                  sx={{
                    justifyContent: 'center',
                    mx: '2%',
                    minHeight: 128,
                    alignItems: 'center',
                    '& a': {
                      flexGrow: 1
                    }
                  }}
                >
                  {content.map((item, index) => {
                    if (isNavText(item.__typename)) {
                      return (
                        <NavComponentDesktop
                          item={item}
                          key={index}
                          active={active}
                          fontColor={fontColor}
                          shadow={appearance === 'fade_in'}
                        />
                      )
                    }
                    return <React.Fragment key={index}></React.Fragment>
                  })}
                </Toolbar>
              </AppBar>
            )
          : (
            <AppBar
              sx={{ color: 'inherit' }}
              position="fixed"
              elevation={!mounted ? 1 : (!trigger ? 0 : 1)}
              color={!mounted ? 'primary' : (!trigger && appearance === 'fade_in' ? 'transparent' : 'primary')}
            >
              {siteBanner && <SiteBanner siteBanner={siteBanner} />}
              <Toolbar sx={getToolbarStyles()}>
                {content.map((item, index) => (
                  <NavComponentDesktop
                    item={item}
                    key={index}
                    fontColor={fontColor}
                    active={active}
                    shadow={appearance === 'fade_in'}
                  />
                ))}
              </Toolbar>
            </AppBar>
            )}
      </Box>

      {/* Mobile Navbar */}
      <Box sx={{ display: { xs: 'block', [minSize]: 'none' } }}>
        <AppBar position="fixed" sx={{ color: 'inherit' }}>
              {siteBanner && <SiteBanner siteBanner={siteBanner} />}
              <Toolbar sx={{ justifyContent: 'space-between' }}>
                {showBackButton
                  ? <IconButton
                      onClick={onBackClick}
                      edge="start"
                      sx={{
                        mr: '10px',
                        ...(fontColor && { color: fontColor })
                      }}
                    >
                      <ArrowBackIcon />
                    </IconButton>
                  : <IconButton
                      component={Link}
                      to={mobileData.IconLink}
                      edge="start"
                      sx={{
                        mr: '10px',
                        ...(fontColor && { color: fontColor })
                      }}
                    >
                      <img
                        style={{ width: '2.2rem' }}
                        src={mobileData.MobileIcon.url}
                        alt="Logo"
                      />
                    </IconButton>
                }
                <Drawer
                  anchor="right"
                  open={isOpen}
                  onClose={toggleDrawer(false)}
                >
                  <MobileDrawer
                    links={content}
                    drawerLink={mobileData.DrawerLink}
                    drawerText={mobileData.DrawerText}
                    toggleDrawer={toggleDrawer}
                    fontColor={fontColor}
                    active={active}
                  />
                </Drawer>
                <Typography
                  variant="h6"
                  sx={{
                    flexGrow: 1,
                    textAlign: 'left'
                  }}
                >
                  {navIndex === '/' ? mobileTitle : page}
                </Typography>
                <IconButton
                  edge="end"
                  onClick={toggleDrawer(true)}
                  color="inherit"
                  aria-label="menu"
                >
                  <MenuIcon sx={fontColor && { color: fontColor }}/>
                </IconButton>
              </Toolbar>
            </AppBar>

        {/* Extra toolbar for spacing */}
        <Toolbar />
      </Box>
    </Box>
  )
}
