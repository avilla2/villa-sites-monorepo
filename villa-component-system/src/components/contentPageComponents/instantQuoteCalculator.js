import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '../pageFeatures/button'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'
import Slide from '@mui/material/Slide'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { styled, alpha } from '@mui/material/styles'

const CSSTextField = styled(TextField, {
  shouldForwardProp: (prop) => prop !== 'borderColor'
})(({ borderColor }) => ({
  '& label': {
    color: borderColor
  },
  '& label.Mui-focused': {
    color: alpha(borderColor, 0.75)
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor
    },
    '&:hover fieldset': {
      borderColor: alpha(borderColor, 0.25)
    },
    '&.Mui-focused fieldset': {
      borderColor: alpha(borderColor, 0.75)
    }
  }
}))

const classes = {
  root: {
    margin: 'auto',
    color: 'inherit',
    maxWidth: 750
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    height: 250
  },
  buttonGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '16px 24px'
  },
  inputSmall: {
    margin: 'auto',
    width: '80%',
    padding: '16px 12px',
    borderRadius: 6
  },
  estimate: {
    margin: '0 auto',
    padding: '12px 24px',
    borderRadius: 6
  }
}

export default function InstantQuoteCalculator ({ content }) {
  const [componentPhase, setComponentPhase] = useState(0)
  const [pricePer, setPricePer] = useState(0)
  const [jobType, setJobType] = useState('')
  const [sizeEntry, setSizeEntry] = useState(0)
  const [estimate, setEstimate] = useState(0)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    first: '',
    last: '',
    email: ''
  })
  const [error, setError] = useState({
    first: false,
    last: false,
    email: false,
    failure: false
  })

  const handlePhase1Change = (amount, type) => {
    setPricePer(amount)
    setJobType(type)
    setComponentPhase(2)
  }

  const calculateEstimate = () => {
    const priceEstimate = pricePer * sizeEntry < 200 ? 200 : pricePer * sizeEntry
    const priceEstimateFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
      priceEstimate
    )
    setEstimate(priceEstimateFormatted)
    Intl.NumberFormat()
    setComponentPhase(3)
  }

  const handleFormChange = (value, field) => {
    setData(state => ({ ...state, [field]: value }))
    handleErrorChange(field, false)
  }

  const handleErrorChange = (field, value) => {
    setError(state => ({ ...state, [field]: value }))
  }

  const sendEmail = async () => {
    const regex = /\w+@\w+\.[a-zA-Z]+/
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    if (!data.first) {
      handleErrorChange('first', true)
    }
    if (!data.last) {
      handleErrorChange('last', true)
    }

    if (regex.test(data.email) || phoneRegex.test(data.email)) {
      setLoading(true)
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/email`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          // eslint-disable-next-line quote-props
          'Authorization': `Bearer ${process.env.REACT_APP_API_TOKEN}`
        },
        body: JSON.stringify({
          to: content.SendTo,
          from: content.SendFrom,
          replyTo: regex.test(data.email) ? data.email : null,
          subject: `New Instant Quote Request from ${data.first} ${data.last}`,
          text: `${data.first} ${data.last} recieved an instant quote of ${estimate} for a ${sizeEntry} sqft ${jobType} job. Contact info for the customer: ${data.email}`
        })
      })
        .then(response => {
          if (response.status === 200) {
            setLoading(false)
            setComponentPhase(5)
          } else {
            handleErrorChange('failure', true)
            setLoading(false)
          }
        })
        .catch(() => {
          handleErrorChange('failure', true)
          setLoading(false)
        })
    } else {
      handleErrorChange('email', true)
    }
  }
  return (
    <Box mx={2.5}>
      <Card sx={classes.root} raised={true} elevation={4}>
          {componentPhase === 0 &&
            <Box>
              <CardHeader
                style={content?.ButtonColor ? { backgroundColor: content.ButtonColor } : null}
                title="Request Your Instant Quote">
              </CardHeader>
              <CardContent style={classes.cardContent}>
                <Box>
                  <Button
                    style={{ height: 75, width: 150 }}
                    buttonStyle={content?.FormButtonStyle}
                    color={content?.ButtonColor}
                    onClick={() => setComponentPhase(1)}
                  >
                    {content?.ButtonText}
                  </Button>
                </Box>
              </CardContent>
            </Box>
          }
        <Slide direction="left" in={componentPhase === 1} mountOnEnter unmountOnExit exit={false}>
          <Box>
            <CardHeader
              style={content?.ButtonColor ? { backgroundColor: content.ButtonColor } : null}
              title="What service are you wanting?">
            </CardHeader>
            <CardContent style={classes.cardContent}>
              <Box style={classes.buttonGroup}>
                {content.Entry.map((entry, index) => (
                    <Button
                        key={index}
                        buttonStyle={content?.FormButtonStyle}
                        color={content?.ButtonColor}
                        onClick={() => handlePhase1Change(entry.PricePer, entry.JobType)}
                    >
                      {entry.JobType}
                    </Button>
                ))}
              </Box>
            </CardContent>
          </Box>
        </Slide>
        <Slide direction="left" in={componentPhase === 2} mountOnEnter unmountOnExit exit={false}>
          <Box>
            <CardHeader
                style={content?.ButtonColor ? { backgroundColor: content.ButtonColor } : null}
                title={jobType === 'Gutters' ? 'What is the total length of your gutters?' : `What is the square footage of your ${jobType}?`}
            />
            <CardContent style={classes.cardContent}>
              <Box style={content?.ButtonColor ? { backgroundColor: content.ButtonColor, ...classes.inputSmall } : classes.inputSmall}>
                <CSSTextField
                  borderColor={content?.Style?.TextColor ? content.Style.TextColor : '#ffffff'}
                  inputProps={{ sx: content?.Style?.TextColor ? { color: content?.Style?.TextColor } : null }}
                  value={sizeEntry}
                  onChange={event => event.target.value >= 0 ? setSizeEntry(event.target.value) : {}}
                  id="size-input"
                  label={ jobType === 'Gutters' ? 'Feet' : 'Square Feet'}
                  required
                  color='primary'
                  type="number"
                  fullWidth
                  min={0}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                      >
                        <Typography
                          style={content?.Style?.TextColor ? { color: content?.Style?.TextColor } : null}
                        >
                          { jobType === 'Gutters' ? 'ft' : 'sqft'}
                        </Typography>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle calculate"
                          onClick={calculateEstimate}
                          edge="end"
                          style={content?.Style?.TextColor ? { color: content?.Style?.TextColor } : null}
                        >
                          <ArrowCircleRightIcon />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Box>
            </CardContent>
          </Box>
        </Slide>
        <Slide direction="left" in={componentPhase === 3} mountOnEnter unmountOnExit exit={false}>
            <Box>
              <CardHeader
                  style={content?.ButtonColor ? { backgroundColor: content.ButtonColor } : null}
                  title="Your Instant Quote"
              />
              <CardContent style={classes.cardContent}>
                <Box style={content?.ButtonColor ? { backgroundColor: content.ButtonColor, ...classes.estimate } : classes.estimate}>
                  <Typography fontSize={44}><b>{estimate}</b></Typography>
                </Box>
                <Box style={classes.buttonGroup} mt={6}>
                  <Button
                    buttonStyle={content?.FormButtonStyle}
                    color={content?.ButtonColor}
                    onClick={() => setComponentPhase(1)}
                    endIcon={<RestartAltIcon style={content?.Style?.TextColor ? { color: content?.Style?.TextColor } : null} />}
                  >
                    Restart
                  </Button>
                  <Button
                    buttonStyle={content?.FormButtonStyle}
                    color={content?.ButtonColor}
                    onClick={() => setComponentPhase(4)}
                  >
                    Schedule a Job
                  </Button>
                </Box>
              </CardContent>
            </Box>
          </Slide>
          <Slide direction="left" in={componentPhase === 4} mountOnEnter unmountOnExit exit={false}>
            <Box>
              <CardHeader
                style={content?.ButtonColor ? { backgroundColor: content.ButtonColor } : null}
                title="Request an Appointment"
              />
              <CardContent style={{ ...classes.cardContent, height: 450 }}>
                <form noValidate autoComplete="off">
                  <Box style={classes.buttonGroup}>
                      <Box
                        style={content?.ButtonColor
                          ? { backgroundColor: content.ButtonColor, ...classes.inputSmall }
                          : { ...classes.inputSmall }}
                      >
                        <CSSTextField
                            borderColor={content?.Style?.TextColor ? content.Style.TextColor : '#ffffff'}
                            inputProps={{ sx: content?.Style?.TextColor ? { color: content?.Style?.TextColor } : null }}
                            value={data.first}
                            error={error.first}
                            helperText={error.first ? 'First Name is Invalid' : ''}
                            onChange={event => { handleFormChange(event.target.value, 'first') }}
                            color='primary'
                            id="first-name"
                            label="First Name"
                            fullWidth
                            required
                        />
                      </Box>
                      <Box style={content?.ButtonColor ? { backgroundColor: content.ButtonColor, ...classes.inputSmall } : classes.inputSmall}>
                        <CSSTextField
                          borderColor={content?.Style?.TextColor ? content.Style.TextColor : '#ffffff'}
                          inputProps={{ sx: content?.Style?.TextColor ? { color: content?.Style?.TextColor } : null }}
                          value={data.last}
                          error={error.last}
                          helperText={error.last ? 'Last Name is Invalid' : ''}
                          onChange={event => { handleFormChange(event.target.value, 'last') }}
                          id="last-name"
                          label="Last Name"
                          fullWidth
                          required
                        />
                      </Box>
                      <Box style={content?.ButtonColor ? { backgroundColor: content.ButtonColor, ...classes.inputSmall } : classes.inputSmall}>
                        <CSSTextField
                          borderColor={content?.Style?.TextColor ? content.Style.TextColor : '#ffffff'}
                          inputProps={{ sx: content?.Style?.TextColor ? { color: content?.Style?.TextColor } : null }}
                          value={data.email}
                          error={error.email}
                          helperText={error.email ? 'Email/Phone Number is Invalid' : ''}
                          onChange={event => { handleFormChange(event.target.value, 'email') }}
                          id="email"
                          label="Email or Phone Number"
                          fullWidth
                          required
                        />
                      </Box>
                    </Box>
                    <Box mt={3}>
                      <Button
                        disabled={loading}
                        buttonStyle={content?.FormButtonStyle}
                        color={content?.ButtonColor}
                        onClick={sendEmail}
                      >
                        Submit
                      </Button>
                    </Box>
                </form>
              </CardContent>
            </Box>
          </Slide>
          <Slide direction="left" in={componentPhase === 5} mountOnEnter unmountOnExit exit={false}>
            <Box>
            <CardHeader
                style={content?.ButtonColor ? { backgroundColor: content.ButtonColor } : null}
                title="Thank You for Choosing Us"
              />
              <CardContent style={classes.cardContent}>
                <Box style={content?.ButtonColor ? { backgroundColor: content.ButtonColor, ...classes.estimate } : classes.estimate}>
                    <Typography fontSize={24}>We will be reaching out to you shortly</Typography>
                </Box>
              </CardContent>
            </Box>
        </Slide>
      </Card>
    </Box>
  )
}
