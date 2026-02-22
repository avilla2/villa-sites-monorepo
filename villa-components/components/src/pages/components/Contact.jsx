import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { IMaskMixin } from 'react-imask'
import AnimationProvider from '../lib/AnimationProvider'

const classes = {
  root: {
    margin: '40px 5% 40px 5%'
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

const MaskedTextField = IMaskMixin(
  ({ inputRef, ...otherProps }) => (
    <TextField
    inputRef={inputRef}
    {...otherProps}
    />
  )
)

/**
 * FormField component - Renders a single form field with optional masking for phone numbers
 * @param {Object} params FormField params
 * @param {string} params.value - The value of the form field
 * @param {boolean} params.error - Whether the form field has an error
 * @param {function} params.handleFormChange - Function to handle changes to the form field
 * @param {string} params.id - The ID of the form field
 * @param {string} params.label - The label of the form field
 * @param {boolean} params.fullWidth - Whether the form field should be full width
 * @param {string} params.type - The type of the form field (e.g., 'phone')
 * @returns {JSX.Element} The FormField component
 */
const FormField = ({ value, error, handleFormChange, id, label, fullWidth, type }) => {
  return (
    <Grid
      size={{
        md: fullWidth ? 12 : 6,
        xs: 12
      }}>
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

/**
 * Contact component - Renders a contact form with validation and email sending functionality
 * @param {Object} props - Contact props
 * @param {FormComponent} props.content - Contact content object
 * @param {string} props.siteName - The name of the site, used in the email subject line
 * @returns {JSX.Element} The Contact component
 */
export default function Contact ({ content, siteName }) {
  const defaultDataFields = content.formFields.reduce((allFields, newField) => ({ ...allFields, [newField.name]: '' }), {})
  const defaultErrorFields = content.formFields.reduce((allFields, newField) => ({ ...allFields, [newField.name]: false }), {})
  const defaultValidationFields = content.formFields.reduce((allFields, newField) => ({ ...allFields, [newField.name]: newField.validation ? new RegExp(newField.validation) : /./ }), {})

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
      const subjectLineData = content.formFields.map((f) => f.includeInSubjectLine ? data[f.name] : null).join(' ')
      const emailBody = content.formFields.map((f) => `${f.label}: ${data[f.name]}`)
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
              columns={12}
              spacing={2}
          >
            {content.formFields.map((field, index) => {
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
              <Grid size={12}>
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
              <Grid sx={classes.submit} size={12}>
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
