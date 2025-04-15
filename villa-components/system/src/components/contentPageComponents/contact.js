import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import AnimationProvider from '../utils/animationProvider'
import { IMaskMixin } from 'react-imask'

const classes = {
  root: {
    margin: '40px 68px 40px 68px'
  },
  input: {
  },
  inputSmall: {
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

const siteName = localStorage.getItem('siteName')

const MaskedTextField = IMaskMixin(
  ({ inputRef, ...otherProps }) => (
    <TextField
    inputRef={inputRef}
    {...otherProps}
    />
  )
)

const FormField = ({ value, error, handleFormChange, id, label, fullWidth, type }) => {
  return (
    <Grid item md={fullWidth ? 12 : 6} xs={12}>
      {type === 'phone'
        ? <MaskedTextField
            value={value}
            error={error}
            helperText={error ? `${label} is Invalid` : ''}
            onAccept={value => { handleFormChange(value, id) }}
            sx={classes.inputSmall}
            id={id}
            name={id}
            label={label}
            fullWidth
            required
            mask="(#00) 000-0000"
            definitions={{
              '#': /[1-9]/
            }}
            overwrite
          />
        : <TextField
            value={value}
            error={error}
            helperText={error ? `${label} is Invalid` : ''}
            onChange={event => { handleFormChange(event.target.value, id) }}
            sx={classes.inputSmall}
            id={id}
            name={id}
            label={label}
            fullWidth
            required
          />
      }
    </Grid>
  )
}

export default function Contact ({ content }) {
  const defaultDataFields = content.fields.reduce((allFields, newField) => ({ ...allFields, [newField.name]: '' }), {})
  const defaultErrorFields = content.fields.reduce((allFields, newField) => ({ ...allFields, [newField.name]: false }), {})
  const defaultValidationFields = content.fields.reduce((allFields, newField) => ({ ...allFields, [newField.name]: newField.validation ? new RegExp(newField.validation) : /./ }), {})

  const [data, setData] = useState({
    ...defaultDataFields,
    body: ''
  })
  const [error, setError] = useState({
    ...defaultErrorFields,
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
      ...defaultDataFields,
      body: ''
    })
  }

  const sendEmail = async () => {
    Object.keys(defaultValidationFields).forEach((val) => {
      if (!data[val] || !defaultValidationFields[val].test(data[val])) handleErrorChange(val, true)
    })

    if (data.body.trim()) {
      setLoading(true)
      const subjectLineData = content.fields.map((f) => f.includeInSubjectLine ? data[f.name] : null).join(' ')
      const emailBody = content.fields.map((f) => `${f.label}: ${data[f.name]}`)
      emailBody.push(`Message: ${data.body}`)
      const emailFields = {
        to: content.sendTo,
        from: content.sendFrom,
        replyTo: data.email ? data.email : null,
        subject: `${siteName}: Contact Form from ${subjectLineData}`,
        text: emailBody.join('\n')
      }
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/email`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // eslint-disable-next-line quote-props
          'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
        },
        body: JSON.stringify(emailFields)
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
      handleErrorChange('body', true)
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
                  {content.fields.map((field, index) => {
                    return (
                      <FormField
                        key={index}
                        value={data[field.name]}
                        error={error[field.name]}
                        handleFormChange={handleFormChange}
                        id={field.name}
                        label={field.label}
                        fullWidth={field.fullWidth}
                        type={field.type}
                      />
                    )
                  })}
                    <Grid item xs={12}>
                      <AnimationProvider animation={content?.Style?.Animation} direction="up">
                        <TextField
                            value={data.body}
                            error={error.body}
                            helperText={error.body ? "This Can't be Empty" : ''}
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
