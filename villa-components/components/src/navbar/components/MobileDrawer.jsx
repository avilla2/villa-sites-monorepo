import React, { useState } from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Collapse from '@mui/material/Collapse'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router'
import isExternal from '../../utils/isExternalLink'
import NavButtonIcon from './NavButtonIcon'
import NavButton from './NavButton'

/**
 * MobileDrawer component - Renders the side drawer menu for mobile navigation
 * @param {Object} props - MobileDrawer props
 * @param {NavbarItem[]} props.links - Array of navbar items to display
 * @param {string} props.drawerLink - Link for the drawer header
 * @param {string} props.drawerText - Text for the drawer header
 * @param {Function} props.toggleDrawer - Function to toggle drawer open/closed state
 * @param {string} props.fontColor - Font color for drawer content
 * @param {string} props.active - Currently active link ID for highlighting
 * @returns {JSX.Element} The MobileDrawer component
 */
export default function MobileDrawer ({ links, drawerLink, drawerText, toggleDrawer, fontColor, active }) {
  const navButtonList = []
  const [openButtons, setOpenButtons] = useState({})

  const handlePress = (buttonName) => {
    setOpenButtons({ ...openButtons, [buttonName]: !openButtons[buttonName] })
  }

  return (
    <Box
      sx={(theme) => ({
        width: 230,
        backgroundColor: theme.palette.primary.main,
        flexGrow: 1
      })}
      role="presentation"
    >
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          p: 0,
          justifyContent: 'space-between'
        }}
      >
        <Box>
          <ListItemButton
            component={Link}
            to={drawerLink}
            onClick={toggleDrawer(false)}
          >
            <ListItemText
              primaryTypographyProps={{ variant: 'h6' }}
              primary={drawerText}
              sx={fontColor && { color: fontColor }}
            />
          </ListItemButton>
          <Divider variant="middle" sx={fontColor && { backgroundColor: fontColor }} />
        </Box>
        <List sx={{ flex: 1 }}>
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
                  sx={{
                    ...(fontColor && { color: fontColor }),
                    ...(item.menuItem.some(subItem => subItem.link === active) && { color: 'secondary.main' })
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ variant: 'subtitle1' }}
                    sx={{
                      display: 'block',
                      fontSize: '16px',
                      lineHeight: '16px'
                    }}
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
                          sx={{
                            display: 'block',
                            fontSize: '16px',
                            lineHeight: '16px',
                            ...(active === subItem.link
                              ? { color: 'secondary.main' }
                              : fontColor && { color: fontColor }
                            )
                          }}
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
                    sx={{
                      display: 'block',
                      fontSize: '16px',
                      lineHeight: '16px',
                      ...(active === item.Link
                        ? { color: 'secondary.main' }
                        : fontColor && { color: fontColor }
                      )
                    }}
                    primary={item.Title}
                  />
              </ListItemButton>
            )
          }
          return undefined
        })}
        </List>
        <List
          sx={{
            mb: 4,
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 2,
            width: '100%'
          }}
          onClick={toggleDrawer(false)}
        >
          {navButtonList.map((item, index) => (
            item.__typename === 'ComponentNavbarComponentsImageLink'
              ? (
              <Box
                key={index}
                sx={{
                  mx: 2,
                  '& a': {
                    display: 'flex'
                  }
                }}
              >
                <NavButtonIcon
                  id={item.Link}
                  external={isExternal(item.Link)}
                  width={item.Width}
                  link={item.Link}
                  src={item.Image.url}
                  alt={item.Image.name}
                />
              </Box>
                )
              : (
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
