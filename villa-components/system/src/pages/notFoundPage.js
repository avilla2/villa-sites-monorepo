import React, { useEffect } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'

const classes = {
  root: {
    width: '100%',
    fontSize: '1.5rem',
    height: '100%'
  },
  returnButton: (theme) => ({
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main,
    marginTop: 3,
    textTransform: 'none',
    marginBottom: '10vh'
  }),
  main: (theme) => ({
    backgroundColor: theme.palette.warning.main,
    width: '100%',
    height: '15vh',
    marginBottom: '10vh',
    borderRadius: '0 0 20px 20px'
  })
}

/**
 * NotFoundPage component - Renders a 404 Not Found page with a return home button
 * @param {Object} props - NotFoundPage props
 * @param {function} props.setPage - Function to set the current page name
 * @returns {JSX.Element} The NotFoundPage component
 */
export default function NotFoundPage ({ setPage }) {
  useEffect(() => {
    setPage('Not Found')
  })
  return (
        <Box sx={classes.root}>
            <Box sx={classes.main} />
            <Typography component="h1" gutterBottom>Looks Like your Lost...</Typography>
            <Typography component="h2" gutterBottom>This Page is Not Available</Typography>
            <Button variant="outlined" size="large" component={Link} to="/" sx={classes.returnButton}>
                Return Home
            </Button>
        </Box>
  )
}
