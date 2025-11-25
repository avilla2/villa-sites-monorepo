import { useTheme } from '@mui/material/styles'

/**
 * calculatePadding utility - Calculates padding for content components based on their type and position
 * @param {Boolean} lastComponent - Whether this is the last component on the page
 * @param {string[]} fullHeightComponents - List of component types that occupy full height
 * @param {string[]} halfHeightComponents - List of component types that occupy half height
 * @param {string} contentType - The __typename of the content component
 * @returns {string | null} The calculated padding string or null if no padding is needed
 */
const calculatePadding = (lastComponent, fullHeightComponents, halfHeightComponents, contentType) => {
  const theme = useTheme()
  let topSpacing = 0
  let bottomSpacing = 0
  if (!fullHeightComponents.includes(contentType)) {
    topSpacing = theme.spacing(4)
    bottomSpacing = theme.spacing(4)
  }
  if (halfHeightComponents.includes(contentType)) {
    topSpacing = theme.spacing(0)
  }
  if (lastComponent) {
    bottomSpacing = theme.spacing(5)
  }
  if (topSpacing === 0 && bottomSpacing === 0) {
    return null
  }
  return `${topSpacing} 0 ${bottomSpacing} 0`
}

export default calculatePadding
