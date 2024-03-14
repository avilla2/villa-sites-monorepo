import React from 'react'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

// COMPONENT NOT USED
const classes = {
  root: {
    margin: '0 5% 0 5%',
    padding: '0 8px'
  },
  card: (theme) => ({
    margin: '10px auto',
    backgroundColor: theme.palette.common.white,
    padding: '2%',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      minHeight: '380px'
    },
    [theme.breakpoints.between('md', 'md')]: {
      minHeight: '450px'
    },
    [theme.breakpoints.up('lg')]: {
      minHeight: '520px'
    }
  }),
  core: {
    width: '100%'
  },
  header: {
    color: 'black',
    fontFamily: 'Inter, sans-serif'
  },
  desc: {
    fontFamily: 'Inter, sans-serif',
    color: 'black',
    lineHeight: 2,
    marginBottom: '40px'
  },
  btnColor: (theme) => ({
    position: 'absolute',
    bottom: '10px',
    color: theme.palette.warning.main,
    borderColor: theme.palette.warning.main
  })
}

const isExternal = (text) => {
  if (text.charAt(0) === '/') {
    return false
  } else {
    return true
  }
}

function CustomCard (props) {
  return (
        <Card elevation={6} sx={classes.card}>
        <CardContent>
            <Typography className={classes.header} variant="h4" component="h2" align="left" gutterBottom>
                {props.title}
            </Typography>
            <Typography className={classes.desc} variant="body1" align="left" component="div">
                {props.children}
            </Typography>
        </CardContent>
        <CardActions>
            {isExternal(props.href)
              ? <Button href={props.href} sx={classes.btnColor} variant="outlined" size="large">{props.button}</Button>
              : <Button component={Link} to={props.href} sx={classes.btnColor} variant="outlined" size="large">{props.button}</Button>
            }
        </CardActions>
    </Card>
  )
}

export default function Template ({ content }) {
  return (
        <div className={classes.root}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="flex-start"
                spacing={4}
            >
                {content.Cards.map((entry, index) => {
                  return (
                        <Grid key={index} item md={entry.Width} lg={4} className={classes.core}>
                            <CustomCard href={entry.Link} button={entry.LinkText} title={entry.Title}>
                                <ReactMarkdown>{entry.Text}</ReactMarkdown>
                            </CustomCard>
                        </Grid>
                  )
                })}
            </Grid>
        </div>
  )
}
