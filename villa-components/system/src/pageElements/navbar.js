import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import ButtonBase from '@mui/material/ButtonBase'
import Button from '@mui/material/Button'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import useMediaQuery from '@mui/material/useMediaQuery'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { Link, useNavigate } from 'react-router-dom'
import isExternal from '../components/utils/isExternalLink'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const classes = {
  toolbarSpaced: {
    justifyContent: 'flex-start',
    padding: '0 2% 0 2%;',
    minHeight: 128,
    alignItems: 'center',
    '& a:first-of-type': {
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'flex-start'
    }
  },
  toolbarSpread: {
    justifyContent: 'center',
    margin: '0 2% 0 2%;',
    minHeight: 128,
    alignItems: 'center',
    '& a': {
      flexGrow: 1
    }
  },
  toolbarLeft: {
    justifyContent: 'flex-start',
    margin: '0 2% 0 2%;',
    minHeight: 128,
    alignItems: 'center'
  },
  title: {
    display: 'block',
    fontSize: '16px',
    lineHeight: '16px',
    transition: 'transform 0.4s ease'
  },
  hovered: (theme) => ({
    color: theme.palette.secondary.main
  }),
  mobileLogo: {
    width: '2.2rem'
  },
  mobileBack: {
    marginRight: '10px'
  },
  mobileTitle: {
    flexGrow: 1,
    textAlign: 'left'
  },
  navButton: (theme) => ({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3)
  }),
  mobileImageButton: (theme) => ({
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    '& a': {
      display: 'flex'
    }
  }),
  mobileNav: {
    justifyContent: 'space-between'
  },
  toolbar: {
    color: 'inherit'
  },
  mobileDrawer: (theme) => ({
    width: 230,
    backgroundColor: theme.palette.primary.main,
    flexGrow: 1
  }),
  mobileDrawerList: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingTop: 0,
    paddingBottom: 0,
    justifyContent: 'space-between'
  },
  mobileDrawerMiddle: {
    flex: 1
  },
  mobileDrawerBottom: (theme) => ({
    marginBottom: theme.spacing(4),
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    rowGap: theme.spacing(2),
    width: '100%'
  }),
  textColor: (color) => { if (color) return ({ color }) }
}

export default function Navbar ({
  page,
  navIndex,
  setSiteId,
  siteId,
  Items: content,
  MobileConfig: mobileData,
  Style: style,
  Appearance: appearance,
  FontColor: fontColor,
  minSize
}) {
  const hidden = useMediaQuery(theme => theme.breakpoints.up(minSize))
  const navigate = useNavigate()
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 65 })
  const [isOpen, setIsOpen] = useState(false)
  const [showBackButton, setShowBackButton] = useState(false)
  const [active, setActive] = useState(-1)

  React.useEffect(() => {
    if (navIndex) {
      setActive(navIndex)
    }
    if (navIndex === '/') {
      setShowBackButton(false)
    } else {
      setShowBackButton(true)
    }
  })

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setIsOpen(open)
  }

  const NavLink = ({ title, link, external, id }) => {
    return (
      <ButtonBase component={external ? 'a' : Link} onClick={() => setActive(id)} href={link} to={link} className="link" color="inherit">
        <Container className={`mask ${active === id ? 'active' : ''}`}>
          <Box className={`link-container ${active === id ? 'active' : ''}`}>
            <Typography variant='subtitle1' sx={classes.title} className={`link-title1 ${active === id ? 'active' : ''}`}>
              {title}
            </Typography>
            <Typography variant='subtitle1' sx={[classes.hovered, classes.title]} className={`link-title2 ${active === id ? 'active' : ''}`}>
              {title}
            </Typography>
          </Box>
        </Container>
      </ButtonBase>
    )
  }

  const NavButtonIcon = ({ link, external, src, alt, id, width }) => {
    return (
      <Button onClick={() => setActive(id)} component={external ? 'a' : Link} href={link} to={link} sx={classes.title}>
        <img width={width || 80} src={src} alt={alt} />
      </Button>
    )
  }

  const NavButton = ({ text, color, link, external, id }) => {
    return (
      <Button
        variant='contained'
        size='small'
        onClick={() => setActive(id)}
        component={external ? 'a' : Link}
        href={link}
        to={link}
        sx={[classes.navButton, color ? { backgroundColor: color } : {}, { borderRadius: 20 }]}
      >
        <Typography variant='subtitle1' sx={[fontColor ? { color: fontColor } : {}, { fontSize: 14 }]}>
          {text}
        </Typography>
      </Button>
    )
  }

  const MobileDrawer = ({ links, drawerLink, drawerText }) => {
    const navButtonList = []
    return (
      <Box
        sx={classes.mobileDrawer}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List style={classes.mobileDrawerList}>
          <Box>
            <ListItemButton onClick={() => setActive(-1)} component={Link} to={drawerLink}>
              <ListItemText primaryTypographyProps={{ variant: 'h6' }} primary={drawerText} sx={classes.textColor(fontColor)} />
            </ListItemButton>
            <Divider variant="middle" sx={fontColor ? { backgroundColor: fontColor } : null} />
          </Box>
          <List style={classes.mobileDrawerMiddle}>
          {links.map((item, index) => {
            if (item.__typename === 'ComponentNavbarComponentsNavButton') {
              navButtonList.push(item)
            } else if (item.__typename === 'ComponentNavbarComponentsImageLink' && item.showInMobile) { 
              navButtonList.push(item)
            } else if (item.__typename === 'ComponentNavbarComponentsTextLink') {
              return (
                <ListItemButton key={index} onClick={() => setActive(item.Link)} component={isExternal(item.Link) ? 'a' : Link} href={item.Link} to={item.Link}>
                    <ListItemText primaryTypographyProps={{ variant: 'subtitle1' }} sx={[classes.title, active === item.Link ? classes.hovered : classes.textColor(fontColor)]} primary={item.Title} />
                </ListItemButton>
              )
            } else {
              return null
            }
          })}
          </List>
          <List sx={classes.mobileDrawerBottom}>
            {navButtonList.map((item, index) => (
              item.__typename === 'ComponentNavbarComponentsImageLink' ? (
                <Box sx={classes.mobileImageButton}>
                  <NavButtonIcon 
                    id={item.Link}
                    external={isExternal(item.Link)}
                    width={item.Width} link={item.Link}
                    src={`${process.env.REACT_APP_BACKEND_URL}${item.Image.data.attributes.url}`}
                    alt={item.Image.data.attributes.name} 
                  />
                </Box>
              ) : (
                <NavButton
                  key={index}
                  id={item.Link}
                  external={isExternal(item.Link)}
                  link={item.Link}
                  color={item.Color}
                  text={item.Text}
                />
              )
            ))}
          </List>
        </List>
      </Box>
    )
  }

  const pickStyle = () => {
    switch (style) {
      case 'Spaced':
        return classes.toolbarSpaced
      case 'Left_Aligned':
        return classes.toolbarLeft
      default:
        return classes.toolbarSpread
    }
  }

  const NavComponentDesktop = ({ item }) => {
    switch (item.__typename) {
      case 'ComponentNavbarComponentsTextLink':
        return <NavLink id={item.Link} external={isExternal(item.Link)} title={item.Title} link={item.Link} />
      case 'ComponentNavbarComponentsImageLink':
        return <NavButtonIcon id={item.Link} external={isExternal(item.Link)} width={item.Width} link={item.Link} src={`${process.env.REACT_APP_BACKEND_URL}${item.Image.data.attributes.url}`} alt={item.Image.data.attributes.name} />
      case 'ComponentNavbarComponentsNavButton':
        return <NavButton id={item.Link} external={isExternal(item.Link)} link={item.Link} color={item.Color} text={item.Text} />
      default:
        return <></>
    }
  }

  return (
    <Box sx={ fontColor ? { color: fontColor } : null }>
      {/* Desktop Navbar */}
      {hidden
        ? (
          <>
            {style === 'Split' ? (
              <AppBar sx={classes.toolbar} position="fixed" elevation={!trigger ? 0 : 1} color={!trigger && appearance === 'fade_in' ? 'transparent' : 'primary'} >
                <Toolbar sx={{...classes.toolbarSpaced, backgroundColor: 'white' }}>
                  {content.map((item, index) => item.__typename !== 'ComponentNavbarComponentsTextLink' && <NavComponentDesktop item={item} key={index} />)}
                </Toolbar>
                <Toolbar sx={classes.toolbarSpread}>
                  {content.map((item, index) => item.__typename === 'ComponentNavbarComponentsTextLink' && <NavComponentDesktop item={item} key={index} />)}
                </Toolbar>
              </AppBar>
            ) : (
            <AppBar sx={classes.toolbar} position="fixed" elevation={!trigger ? 0 : 1} color={!trigger && appearance === 'fade_in' ? 'transparent' : 'primary' } >
              <Toolbar sx={pickStyle()}>
                {content.map((item, index) => <NavComponentDesktop item={item} key={index} />)}
              </Toolbar>
            </AppBar>
            )}
          </>
          )
        : <>
            {/* Mobile Navbar */}
            <AppBar position="fixed" sx={classes.toolbar}>
              <Toolbar sx={classes.mobileNav}>
                {showBackButton
                  ? <IconButton onClick={() => navigate(-1)} edge="start" style={classes.mobileBack}>
                      <ArrowBackIcon />
                    </IconButton>
                  : <IconButton onClick={() => setActive('')} component={Link} to={mobileData.IconLink} edge="start" style={classes.mobileBack}>
                      <img style={classes.mobileLogo} src={`${process.env.REACT_APP_BACKEND_URL}${mobileData.MobileIcon.data.attributes.url}`} alt="Logo"/>
                    </IconButton>
                }
                <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
                  <MobileDrawer links={content} drawerLink={mobileData.DrawerLink} drawerText={mobileData.DrawerText} />
                </Drawer>
                <Typography variant="h6" sx={classes.mobileTitle}>
                  {page}
                </Typography>
                <IconButton edge="end" onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
                  <MenuIcon style={ fontColor ? { color: fontColor } : null }/>
                </IconButton>
              </Toolbar>
            </AppBar>

            {/* Extra toolbar for spacing */}
            <Toolbar />
          </>
      }
    </Box>
  )
}
