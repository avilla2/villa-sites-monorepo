import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid2'
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
    fontSize: '1.5rem',
    marginBottom: '18px'
  },
  page: (theme, minSize, showTitle) => ({
    [theme.breakpoints.up(minSize)]: {
      marginTop: showTitle ? titleHeight : 'unset',
      backgroundColor: 'white',
      paddingTop: '0px'
    }
  })
}

export default function ContentPage ({ setPage, setNavIndex, name, content, path, minSize, showTitle, titleColor }) {
  const hidden = useMediaQuery(theme => theme.breakpoints.up(minSize))

  useEffect(() => {
    setPage(name)
    setNavIndex(path)
  })
  return (
        <Box sx={classes.root}>
            {hidden && showTitle &&
                <Box sx={classes.base}>
                    <Typography variant="h2" sx={{ ...classes.title, color: titleColor }}>{name}</Typography>
                </Box>

            }
                <Grid container sx={(theme) => classes.page(theme, minSize, showTitle)}>
                    {content.map((item, index) => {
                      return (
                        <GeneratePageContent
                          key={index}
                          content={item}
                          lastComponent={index === content.length - 1}
                        />
                      )
                    })}
                </Grid>
        </Box>
  )
}
