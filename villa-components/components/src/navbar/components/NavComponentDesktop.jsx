import React from 'react'
import NavLink from './NavLink'
import NavButtonIcon from './NavButtonIcon'
import NavButton from './NavButton'
import NavMenu from './NavMenu'
import isExternal from '../../utils/isExternalLink'

/**
 * NavComponentDesktop component - Renders the appropriate navbar item component based on type
 * @param {Object} props - NavComponentDesktop props
 * @param {NavbarItem} props.item - The navbar item to render
 * @param {string} props.active - Currently active link ID for highlighting
 * @param {string} props.fontColor - Font color for the item
 * @param {boolean} props.shadow - Whether to apply text shadow effect
 * @returns {JSX.Element} The appropriate navbar component or empty fragment
 */
export default function NavComponentDesktop ({ item, active, fontColor, shadow }) {
  switch (item.__typename) {
    case 'ComponentNavbarComponentsTextLink':
      return <NavLink id={item.Link} title={item.Title} link={item.Link} active={active} shadow={shadow} />
    case 'ComponentNavbarComponentsImageLink':
      return <NavButtonIcon id={item.Link} external={isExternal(item.Link)} width={item.Width} link={item.Link} src={item.Image.url} alt={item.Image.name} />
    case 'ComponentNavbarComponentsNavButton':
      return <NavButton id={item.Link} link={item.Link} color={item.Color} text={item.Text} fontColor={fontColor} />
    case 'ComponentNavbarComponentsNavMenu':
      return <NavMenu id={item.title} title={item.title} active={active} menuItem={item.menuItem} shadow={shadow} fontColor={fontColor}/>
    default:
      return <></>
  }
}
