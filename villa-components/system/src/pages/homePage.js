import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid2'
import GenerateHomeContent from '../components/utils/generateHomeContent'

const classes = {
  root: {
    width: '100%',
    flexGrow: 1
  }
}

export default function HomePage ({ setPage, setNavIndex, path, content, pageName }) {
  useEffect(() => {
    setPage(pageName)
    setNavIndex(path)
  })
  return (
        <Grid container sx={classes.root}>
            {content.map((item, index) => {
              return (
                <GenerateHomeContent
                    key={index}
                    content={item}
                    lastComponent={index === content.length - 1}
                />
              )
            })}
        </Grid>
  )
}
