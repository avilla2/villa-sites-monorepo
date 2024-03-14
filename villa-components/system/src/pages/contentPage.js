import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import GeneratePageContent from '../components/utils/generatePageContent'

const titleHeight = '145px'
const classes = {
  root: {
    width: '100%',
    flexGrow: 2
  },
  base: (theme) => ({
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    height: titleHeight,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    position: 'fixed',
    zIndex: -2
  }),
  title: {
    color: 'white',
    fontSize: '1.5rem',
    marginBottom: '18px'
  },
  page: (theme, minSize) => ({
    [theme.breakpoints.up(minSize)]: {
      marginTop: titleHeight,
      backgroundColor: 'white',
      paddingTop: '0px'
    }
  })
}

export default function ContentPage ({ setPage, setNavIndex, name, content, path, minSize }) {
  const hidden = useMediaQuery(theme => theme.breakpoints.up(minSize))

  useEffect(() => {
    setPage(name)
    setNavIndex(path)
  })
  return (
        <Box sx={classes.root}>
            {hidden &&
                <Box sx={classes.base}>
                    <Typography variant="h2" sx={classes.title}>{name}</Typography>
                </Box>

            }
                <Box sx={(theme) => classes.page(theme, minSize)}>
                    {content.map((item, index) => {
                      return (
                        <GeneratePageContent
                          key={index}
                          content={item}
                          lastComponent={index === content.length - 1}
                        />
                      )
                    })}
                </Box>
        </Box>
  )
}
