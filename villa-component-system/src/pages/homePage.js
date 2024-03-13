import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import GenerateHomeContent from '../components/utils/generateHomeContent'

const classes = {
  root: {
    width: '100%',
    flexGrow: 1
  }
}

export default function ContentPage ({ setPage, setNavIndex, path, content, pageName }) {
  useEffect(() => {
    setPage(pageName)
    setNavIndex(path)
  })
  return (
        <Box sx={classes.root}>
            {content.map((item, index) => {
              return (
                <GenerateHomeContent
                    key={index}
                    content={item}
                    lastComponent={index === content.length - 1}
                />
              )
            })}
        </Box>
  )
}
