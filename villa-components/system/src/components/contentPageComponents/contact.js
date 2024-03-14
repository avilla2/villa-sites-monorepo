import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AnimationProvider from '../utils/animationProvider'

const classes = {
  root: {
    margin: '40px 5% 40px 5%'
  },
  input: {
    margin: '0px 5px 20px 5px'
  },
  inputSmall: {
    margin: '0px 5px 20px 5px'
  },
  error: (theme) => ({
    marginTop: 3,
    color: theme.palette.warning.main
  }),
  success: (theme) => ({
    marginTop: 3,
    color: theme.palette.success.main
  }),
  submit: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
}

export default function Contact ({ content }) {
  const [data, setData] = useState({
    first: '',
    last: '',
    email: '',
    body: ''
  })
  const [error, setError] = useState({
    first: false,
    last: false,
    email: false,
    body: false
  })
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleFormChange = (value, field) => {
    setData(state => ({ ...state, [field]: value }))
    handleErrorChange(field, false)
  }

  const handleErrorChange = (field, value) => {
    setError(state => ({ ...state, [field]: value }))
  }

  const clearForm = () => {
    setData({
      first: '',
      last: '',
      email: '',
      body: ''
    })
  }

  const sendEmail = async () => {
    const regex = /\w+@\w+\.[a-zA-Z]+/
    if (!data.first) {
      handleErrorChange('first', true)
    }
    if (!data.last) {
      handleErrorChange('last', true)
    }
    if (!data.body) {
      handleErrorChange('body', true)
    }

    if (regex.test(data.email)) {
      setLoading(true)
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/email`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // eslint-disable-next-line quote-props
          'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
        },
        body: JSON.stringify({
          to: content.sendTo,
          from: content.sendFrom,
          replyTo: data.email,
          subject: `New ${content.Title} inquiry from ${data.first} ${data.last}`,
          text: data.body
        })
      })
        .then(response => {
          if (response.status === 200) {
            setStatus('success')
            setLoading(false)
            clearForm()
          } else {
            setStatus('failure')
            setLoading(false)
          }
        })
        .catch(() => {
          setStatus('failure')
          setLoading(false)
        })
    } else {
      handleErrorChange('email', true)
    }
  }

  return (
        <Box sx={classes.root}>
            <form style={classes.root} noValidate autoComplete="off">
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    spacing={2}
                >
                    <Grid item md={6} xs={12}>
                        <TextField
                            value={data.first}
                            error={error.first}
                            helperText={error.first ? 'First Name is Invalid' : ''}
                            onChange={event => { handleFormChange(event.target.value, 'first') }}
                            sx={classes.inputSmall}
                            id="first-name"
                            label="First Name"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            value={data.last}
                            error={error.last}
                            helperText={error.last ? 'Last Name is Invalid' : ''}
                            onChange={event => { handleFormChange(event.target.value, 'last') }}
                            sx={classes.inputSmall}
                            id="last-name"
                            label="Last Name"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} >
                        <TextField
                            value={data.email}
                            error={error.email}
                            helperText={error.email ? 'Email is Invalid' : ''}
                            onChange={event => { handleFormChange(event.target.value, 'email') }}
                            sx={classes.input}
                            id="email"
                            label="Email"
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <AnimationProvider animation={content?.Style?.Animation} direction="up">
                            <TextField
                                value={data.body}
                                error={error.body}
                                helperText={error.email ? "This Can't be Empty" : ''}
                                onChange={event => { handleFormChange(event.target.value, 'body') }}
                                sx={classes.input}
                                id="body"
                                label={content.bodyTitle}
                                fullWidth
                                required
                                multiline
                                rows={8}
                            />
                        </AnimationProvider>
                    </Grid>
                    <Grid item xs={12} sx={classes.submit}>
                        <Button disabled={loading} endIcon={<SendIcon />} variant="outlined" color="primary" onClick={sendEmail}>Submit</Button>
                    </Grid>
                </Grid>
                {status === 'success'
                  ? <Typography component="h5" sx={classes.success}>Thank you for reaching out, we will get back to you soon.</Typography>
                  : status === 'failure'
                    ? <Typography component="h5" sx={classes.error}>Could not send the message at this time. Try again later</Typography>
                    : null
                }
            </form>
        </Box>
  )
}
