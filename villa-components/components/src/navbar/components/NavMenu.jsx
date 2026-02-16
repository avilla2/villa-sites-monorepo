import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import ButtonBase from '@mui/material/ButtonBase'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router'
import isExternal from '../../utils/isExternalLink'

/**
 * NavMenu component - Renders a dropdown navigation menu with submenu items
 * @param {Object} props - NavMenu props
 * @param {string} props.title - Menu display title
 * @param {NavMenuItem[]} props.menuItem - Array of menu items
 * @param {string} props.active - Currently active link ID for highlighting
 * @param {boolean} props.shadow - Whether to apply text shadow effect
 * @param {string} props.fontColor - Font color for menu items
 * @returns {JSX.Element} The NavMenu component
 */
export default function NavMenu ({ title, menuItem, active, shadow, fontColor }) {
  return (
    <Box
      sx={{
        position: 'relative',
        '&:hover .MuiPaper-root': {
          display: 'block'
        },
        '&:hover > .MuiButtonBase-root': {
          color: 'secondary.main'
        },
        ...(menuItem.some(item => item.link === active) && { color: 'secondary.main' })
      }}
    >
      <ButtonBase className="link">
        <Container
          className='link-container'
          sx={{
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Typography
            variant='subtitle1'
            sx={{
              display: 'block',
              fontSize: '16px',
              lineHeight: '16px',
              ...(shadow && { textShadow: '1px 1px 3px #2f2f2f' })
            }}
          >
            {title}
          </Typography>
          <ExpandMore />
        </Container>
      </ButtonBase>
      <Paper
        sx={(theme) => ({
          position: 'absolute',
          zIndex: 22,
          left: 20,
          top: 30,
          minWidth: 130,
          display: 'none',
          backgroundColor: theme.palette.primary.main
        })}
        elevation={5}
      >
        {menuItem.map((item, index) => (
          <MenuItem
            key={index}
            component={isExternal(item.link) ? 'a' : Link}
            href={item.link}
            to={item.link}
            sx={{
              '&:hover': {
                color: 'secondary.main'
              },
              ...(active === item.link && { color: 'secondary.main' }),
              ...(fontColor && { color: fontColor })
            }}
            dense
          >
            {item.icon &&
              <ListItemIcon>
                  <img
                    style={{ maxWidth: 20, maxHeight: 20 }}
                    src={item.icon.url}
                    alt={item.icon.name}
                  />
              </ListItemIcon>
            }
            <ListItemText
              inset={!item.icon}
              primaryTypographyProps={{
                variant: 'subtitle1',
                sx: { width: 'fit-content' }
              }}
              sx={{ pr: 4 }}
            >
              {item.text}
            </ListItemText>
          </MenuItem>
        ))}
      </Paper>
    </Box>
  )
}
