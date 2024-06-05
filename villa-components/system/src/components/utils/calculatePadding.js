import { useTheme } from '@mui/material/styles'

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
