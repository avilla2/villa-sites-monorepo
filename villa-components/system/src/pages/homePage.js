import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid'
import GenerateHomeContent from '../components/utils/generateHomeContent'

const classes = {
  root: {
    width: '100%',
    flexGrow: 1
  }
}

/**
 * HomePage component - Renders the home page with dynamic content components
 * @param {Object} props - HomePage props
 * @param {function} props.setPage - Function to set the current page name
 * @param {function} props.setNavIndex - Function to set the current navigation index/path
 * @param {string} props.path - Path/URL of the page
 * @param {ContentComponent[]} props.content - Array of content items to render on the page
 * @param {string} props.pageName - Name of the page
 * @returns {JSX.Element} The HomePage component
 */
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
