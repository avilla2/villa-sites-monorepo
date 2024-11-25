import React, { useState, useEffect } from 'react'
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
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import List from '@mui/material/List'
import Drawer from '@mui/material/Drawer'
import ListItemButton from '@mui/material/ListItemButton'
import Divider from '@mui/material/Divider'
import { Link, useNavigate } from 'react-router-dom'
import isExternal from '../components/utils/isExternalLink'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

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
  },
  shadow: {
    textShadow: '1px 1px 3px #2f2f2f'
  },
  activeLink: {
    color: 'secondary.main'
  },
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
  textColor: (color) => ({ ...(color && { color }) }),
  hoverMenu: {
    position: 'absolute',
    zIndex: 22,
    left: -5,
    top: 30,
    minWidth: 130,
    display: 'none',
  },
  navMenuContainer: {
    position: 'relative',
    "&:hover .MuiPaper-root": {
      display: 'block',
    },
    "&:hover > .MuiButtonBase-root": {
      color: 'secondary.main'
    }
  },
  subMenuLink: {
    "&:hover": {
      color: 'secondary.main',
    },
  },
  menuButton: {
    display: 'flex',
    alignItems: 'center'
  }
}

const NavLink = ({ title, link, id, active, shadow, ...props }) => {
  return (
    <ButtonBase 
      className="link"
      color="inherit" 
      {...( link && { 
        href: link,
        to: link,
        component: isExternal(link) ? 'a' : Link
      })}
      {...props}
    >
      <Container className={`mask ${active === id ? 'active' : ''}`}>
        <Box className={`link-container link-transition ${active === id ? 'active' : ''}`}>
          <Typography variant='subtitle1' sx={[classes.title, shadow && classes.shadow]} className={`link-title1 link-transition ${active === id ? 'active' : ''}`}>
            {title}
          </Typography>
          <Typography
            variant='subtitle1' 
            sx={[classes.activeLink, classes.title, shadow && classes.shadow]} 
            className={`link-title2 ${active === id ? 'active' : ''}`}
          >
            {title}
          </Typography>
        </Box>
      </Container>
    </ButtonBase>
  )
}

const NavButtonIcon = ({ link, external, src, alt, width }) => {
  return (
    <Button component={external ? 'a' : Link} href={link} to={link} sx={classes.title}>
      <img width={width || 80} src={src} alt={alt} />
    </Button>
  )
}

const NavButton = ({ text, color, link, fontColor }) => {
  return (
    <Button
      variant='contained'
      size='small'
      component={isExternal(link) ? 'a' : Link}
      href={link}
      to={link}
      sx={[classes.navButton, color && { backgroundColor: color }, { borderRadius: 20 }]}
    >
      <Typography variant='subtitle1' sx={[classes.textColor(fontColor), { fontSize: 14 }]}>
        {text}
      </Typography>
    </Button>
  )
}

const NavMenu = ({ title, menuItem, active, shadow }) => {
  return (
    <Box sx={[classes.navMenuContainer, menuItem.some(item => item.link === active) && classes.activeLink]}>
      <ButtonBase 
        className="link"
      >
        <Container 
          className='link-container'
          style={classes.menuButton}
        >
          <Typography 
            variant='subtitle1'
            sx={[classes.title, shadow && classes.shadow]} 
          >
            {title}
          </Typography>
          <ExpandMore />
        </Container>
      </ButtonBase>
      <Paper
        sx={classes.hoverMenu}
      >
        {menuItem.map((item, index) => (
          <MenuItem 
            key={index}
            component={isExternal(item.link) ? 'a' : Link}
            href={item.link}
            to={item.link}
            sx={[classes.subMenuLink, active === item.link && classes.activeLink]}
            dense
          >
            {item.icon.data && 
              <ListItemIcon>
                  <img 
                    style={{maxWidth: 20, maxHeight: 20}} 
                    src={`${process.env.REACT_APP_BACKEND_URL}${item.icon.data.attributes.url}`} 
                    alt={item.icon.data.attributes.name}
                  />
              </ListItemIcon>
            }
            <ListItemText 
              inset={!item.icon.data}
              primaryTypographyProps={{
                variant: 'subtitle1',
                sx: {width: 'fit-content'},
              }}
              sx={{paddingRight: 4}}
            >
              {item.text}
            </ListItemText>
          </MenuItem>
        ))}
      </Paper>
    </Box>
  )
}

const MobileDrawer = ({ links, drawerLink, drawerText, toggleDrawer, fontColor, active }) => {
  const navButtonList = []
  const [openButtons, setOpenButtons] = useState({});

  const handlePress = (buttonName) => {
    setOpenButtons({ ...openButtons, [buttonName]: !openButtons[buttonName] });
  };

  return (
    <Box
      sx={classes.mobileDrawer}
      role="presentation"
    >
      <List style={classes.mobileDrawerList}>
        <Box>
          <ListItemButton 
            component={Link} 
            to={drawerLink}
            onClick={toggleDrawer(false)}
          >
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
          } else if (item.__typename === 'ComponentNavbarComponentsNavMenu') {
            return (
              <Box key={index}>
                <ListItemButton 
                  onClick={() => handlePress(item.title)} 
                  sx={[classes.textColor(fontColor), item.menuItem.some(subItem => subItem.link === active) && classes.activeLink]}
                >
                  <ListItemText
                    primaryTypographyProps={{ variant: 'subtitle1' }} 
                    sx={[classes.title]} 
                    primary={item.title} 
                  />
                  {openButtons[item.title] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={openButtons[item.title]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.menuItem.map((subItem, subIndex) => (
                      <ListItemButton 
                        key={subIndex} 
                        sx={{ pl: 4 }}
                        component={isExternal(subItem.link) ? 'a' : Link} 
                        href={subItem.link}
                        to={subItem.link}
                        onClick={toggleDrawer(false)}
                      >
                        <ListItemText                     
                          primaryTypographyProps={{ variant: 'subtitle1' }} 
                          sx={[classes.title, active === subItem.link ? classes.activeLink : classes.textColor(fontColor)]} 
                          primary={subItem.text}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </Box>
            )
          } else if (item.__typename === 'ComponentNavbarComponentsTextLink') {
            return (
              <ListItemButton 
                key={index} 
                component={isExternal(item.Link) ? 'a' : Link} 
                href={item.Link} 
                to={item.Link}
                onClick={toggleDrawer(false)}
              >
                  <ListItemText 
                    primaryTypographyProps={{ variant: 'subtitle1' }} 
                    sx={[classes.title, active === item.Link ? classes.activeLink : classes.textColor(fontColor)]} 
                    primary={item.Title} />
              </ListItemButton>
            )
          } else {
            return null
          }
        })}
        </List>
        <List 
          sx={classes.mobileDrawerBottom}
          onClick={toggleDrawer(false)}
        >
          {navButtonList.map((item, index) => (
            item.__typename === 'ComponentNavbarComponentsImageLink' ? (
              <Box
                key={index}
                sx={classes.mobileImageButton}
              >
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
                fontColor={fontColor}
              />
            )
          ))}
        </List>
      </List>
    </Box>
  )
}

const NavComponentDesktop = ({ item, active, fontColor, shadow }) => {
  switch (item.__typename) {
    case 'ComponentNavbarComponentsTextLink':
      return <NavLink id={item.Link} title={item.Title} link={item.Link} active={active} shadow={shadow} />
    case 'ComponentNavbarComponentsImageLink':
      return <NavButtonIcon id={item.Link} external={isExternal(item.Link)} width={item.Width} link={item.Link} src={`${process.env.REACT_APP_BACKEND_URL}${item.Image.data.attributes.url}`} alt={item.Image.data.attributes.name} />
    case 'ComponentNavbarComponentsNavButton':
      return <NavButton id={item.Link} link={item.Link} color={item.Color} text={item.Text} fontColor={fontColor} />
    case 'ComponentNavbarComponentsNavMenu':
      return <NavMenu id={item.title} title={item.title} active={active} menuItem={item.menuItem} shadow={shadow}/>
    default:
      return <></>
  }
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
  const [showBackButton, setShowBackButton] = useState(false)
  const [active, setActive] = useState(undefined)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
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
  
  const isNavText = (itemType) => itemType === 'ComponentNavbarComponentsTextLink' || itemType === 'ComponentNavbarComponentsNavMenu'

  return (
    <Box sx={classes.textColor(fontColor)}>
      {/* Desktop Navbar */}
      {hidden
        ? (
          <>
            {style === 'Split' ? (
              <AppBar 
                sx={classes.toolbar} 
                position="fixed" 
                elevation={!trigger ? 0 : 1} 
                color={!trigger && appearance === 'fade_in' ? 'transparent' : 'primary'} 
              >
                <Toolbar sx={{...classes.toolbarSpaced, backgroundColor: 'white' }}>
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
                  })}
                </Toolbar>
                <Toolbar sx={classes.toolbarSpread}>
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
                  })}
                </Toolbar>
              </AppBar>
            ) : (
            <AppBar 
              sx={classes.toolbar} 
              position="fixed" 
              elevation={!trigger ? 0 : 1} 
              color={!trigger && appearance === 'fade_in' ? 'transparent' : 'primary' } 
            >
              <Toolbar sx={pickStyle()}>
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
          </>
          )
        : <>
            {/* Mobile Navbar */}
            <AppBar position="fixed" sx={classes.toolbar}>
              <Toolbar sx={classes.mobileNav}>
                {showBackButton
                  ? <IconButton onClick={() => navigate(-1)} edge="start" sx={[classes.mobileBack, classes.textColor(fontColor)]}>
                      <ArrowBackIcon />
                    </IconButton>
                  : <IconButton
                      component={Link} 
                      to={mobileData.IconLink} 
                      edge="start" 
                      sx={[classes.mobileBack, fontColor && {color: fontColor} ]}
                    >
                      <img 
                        style={classes.mobileLogo} 
                        src={`${process.env.REACT_APP_BACKEND_URL}${mobileData.MobileIcon.data.attributes.url}`} 
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
                <Typography variant="h6" sx={classes.mobileTitle}>
                  {page}
                </Typography>
                <IconButton 
                  edge="end" 
                  onClick={toggleDrawer(true)} 
                  color="inherit" 
                  aria-label="menu"
                >
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
