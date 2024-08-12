const isExternal = (text) => {
  if (text && text.charAt(0) === '/') {
    return false
  }
  return true
}

export default isExternal
