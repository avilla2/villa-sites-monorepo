import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import SendIcon from '@mui/icons-material/Send'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControl from '@mui/material/FormControl'
import RadioGroup from '@mui/material/RadioGroup'
import Radio from '@mui/material/Radio'
import { IMaskMixin } from 'react-imask'

const classes = {
  root: {
    margin: '15px 5% 40px 5%'
  },
  banner: {
    height: '70px',
    background: 'linear-gradient(135deg, #8B7355 0%, #A0826D 25%, #7CB342 50%, #8B9D6F 75%, #6B8E23 100%)',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '5%',
    marginBottom: '40px'
  },
  bannerText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '24px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
  },
  section: {
    marginTop: 4,
    marginBottom: 2
  },
  sectionTitle: (theme) => ({
    marginBottom: 2,
    marginTop: 3,
    fontWeight: 400,
    borderBottom: `2px solid ${theme.palette.primary.main}`,
    paddingBottom: 1
  }),
  checkboxGroup: {
    marginTop: 1,
    marginBottom: 2
  },
  input: {},
  inputSmall: {},
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
    justifyContent: 'flex-end',
    marginTop: 3
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

/**
 * IntakeForm component - Renders a landscaping project intake form with multiple sections
 * Collects client contact info, project type, goals, features, timeline, budget, and comments
 * @param {Object} props - IntakeForm component props
 * @property {string} props.fromEmail - Email address configured as a verified sender
 * @property {string} props.toEmail - Business Owner's email address to send the intake form submissions to
 * @returns {JSX.Element} The IntakeForm component
 */
export default function IntakeForm ({ fromEmail, toEmail }) {
  React.useEffect(() => {
    document.title = 'Request A Landscaping Project | Los Valdivias Landscape Portland, OR'
  }, [])

  const [data, setData] = useState({
    // Contact Information
    fullName: '',
    phone: '',
    email: '',
    projectAddress: '',
    // Project Type (checkboxes)
    projectTypes: [],
    projectTypesOther: '',
    // Project Goals (checkboxes, up to 3)
    projectGoals: [],
    projectGoalsOther: '',
    // Must-Have Features (checkboxes)
    features: [],
    featuresOther: '',
    // Timeline (radio)
    timeline: '',
    timelineDate: '',
    // Budget (radio)
    budget: '',
    // Additional Comments
    comments: ''
  })

  const [error, setError] = useState({
    fullName: false,
    phone: false,
    email: false,
    projectAddress: false
  })

  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleTextChange = (value, field) => {
    setData(state => ({ ...state, [field]: value }))
    if (error[field]) {
      setError(state => ({ ...state, [field]: false }))
    }
  }

  const handleCheckboxChange = (value, field) => {
    setData(state => {
      const currentArray = state[field]
      if (currentArray.includes(value)) {
        return { ...state, [field]: currentArray.filter(item => item !== value) }
      } else {
        return { ...state, [field]: [...currentArray, value] }
      }
    })
  }

  const handleRadioChange = (value, field) => {
    setData(state => ({ ...state, [field]: value }))
  }

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phoneRegex = /^\(\d{3}\)\s\d{3}-\d{4}$/

    const newErrors = {
      fullName: !data.fullName.trim(),
      phone: !phoneRegex.test(data.phone),
      email: !emailRegex.test(data.email),
      projectAddress: !data.projectAddress.trim()
    }

    setError(newErrors)
    return !Object.values(newErrors).some(val => val === true)
  }

  const clearForm = () => {
    setData({
      fullName: '',
      phone: '',
      email: '',
      projectAddress: '',
      projectTypes: [],
      projectTypesOther: '',
      projectGoals: [],
      projectGoalsOther: '',
      features: [],
      featuresOther: '',
      timeline: '',
      timelineDate: '',
      budget: '',
      comments: ''
    })
  }

  const sendEmail = async () => {
    if (!validateForm()) {
      return
    }

    setLoading(true)

    const emailBody = [
      '--- CLIENT PROJECT INTAKE FORM ---',
      '',
      '=== CONTACT INFORMATION ===',
      `Full Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Project Address: ${data.projectAddress}`,
      '',
      '=== TYPE OF PROJECT ===',
      data.projectTypes.length > 0 ? data.projectTypes.join(', ') : 'No projects selected',
      ...(data.projectTypesOther ? [`Other Projects: ${data.projectTypesOther}`] : []),
      '',
      '=== PROJECT GOALS ===',
      data.projectGoals.length > 0 ? data.projectGoals.join(', ') : 'No goals selected',
      ...(data.projectGoalsOther ? [`Other Goals: ${data.projectGoalsOther}`] : []),
      '',
      '=== MUST-HAVE FEATURES ===',
      data.features.length > 0 ? data.features.join(', ') : 'No features selected',
      ...(data.featuresOther ? [`Other Features: ${data.featuresOther}`] : []),
      '',
      '=== TIMELINE ===',
      `Timeline: ${data.timeline}`,
      ...(data.timelineDate ? [`Specific Date/Event: ${data.timelineDate}`] : []),
      '',
      '=== BUDGET RANGE ===',
      `Budget: ${data.budget}`,
      '',
      '=== ADDITIONAL COMMENTS ===',
      data.comments || 'No additional comments'
    ]

    const emailFields = {
      to: toEmail,
      from: fromEmail,
      replyTo: data.email,
      subject: `${siteName}: Landscaping Project Intake Form from ${data.fullName}`,
      text: emailBody.join('\n')
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/email`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`
        },
        body: JSON.stringify(emailFields)
      })

      if (response.status === 200) {
        setStatus('success')
        clearForm()
      } else {
        setStatus('failure')
      }
    } catch (error) {
      console.error('Error sending intake form:', error)
      setStatus('failure')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box sx={classes.banner}>
        <Typography sx={classes.bannerText}>
          Request Your Free Landscaping Consultation
        </Typography>
      </Box>
      <Box sx={classes.root}>
        <Typography variant="h4" sx={{ marginBottom: 1, fontWeight: 'bold' }}>
          Landscaping Project Intake Form
        </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3, color: 'text.secondary' }}>
        Tell us about your landscaping project! This information helps us understand your vision and provide you with the best recommendations.
      </Typography>

      <form noValidate autoComplete="off">
        <Grid container spacing={2}>
          {/* CONTACT INFORMATION SECTION */}
          <Grid size={12}>
            <Typography variant="h6" sx={classes.sectionTitle}>
              1. Contact Information
            </Typography>
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <TextField
              value={data.fullName}
              error={error.fullName}
              helperText={error.fullName ? 'Full Name is required' : ''}
              onChange={event => handleTextChange(event.target.value, 'fullName')}
              id="fullName"
              label="Full Name"
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <MaskedTextField
              value={data.phone}
              error={error.phone}
              helperText={error.phone ? 'Phone number is invalid' : ''}
              onAccept={value => handleTextChange(value, 'phone')}
              id="phone"
              label="Phone Number"
              fullWidth
              required
              mask="(#00) 000-0000"
              definitions={{
                '#': /[1-9]/
              }}
              overwrite
            />
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <TextField
              value={data.email}
              error={error.email}
              helperText={error.email ? 'Email is invalid' : ''}
              onChange={event => handleTextChange(event.target.value, 'email')}
              id="email"
              label="Email Address"
              fullWidth
              required
            />
          </Grid>

          <Grid size={{ md: 6, xs: 12 }}>
            <TextField
              value={data.projectAddress}
              error={error.projectAddress}
              helperText={error.projectAddress ? 'Project Address is required' : ''}
              onChange={event => handleTextChange(event.target.value, 'projectAddress')}
              id="projectAddress"
              label="Project Address"
              fullWidth
              required
            />
          </Grid>

          {/* PROJECT TYPE SECTION */}
          <Grid size={12}>
            <Typography variant="h6" sx={classes.sectionTitle}>
              2. Type of Project
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, color: 'text.secondary' }}>
              Check all that apply
            </Typography>
          </Grid>

          <Grid size={12}>
            <FormGroup sx={classes.checkboxGroup}>
              {[
                { label: 'New Landscape Installation', value: 'New Landscape Installation' },
                { label: 'Hardscaping (patios, walkways, retaining walls)', value: 'Hardscaping' },
                { label: 'Irrigation/Drainage Solutions', value: 'Irrigation/Drainage Solutions' },
                { label: 'Outdoor Living Area (kitchen, fire pit, pergola, etc.)', value: 'Outdoor Living Area' },
                { label: 'Yard Cleanup or Maintenance', value: 'Yard Cleanup or Maintenance' },
                { label: 'Fence or Deck Construction', value: 'Fence or Deck Construction' }
              ].map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={data.projectTypes.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value, 'projectTypes')}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
            <TextField
              value={data.projectTypesOther}
              onChange={event => handleTextChange(event.target.value, 'projectTypesOther')}
              id="projectTypesOther"
              label="Other (please specify)"
              fullWidth
              size="small"
            />
          </Grid>

          {/* PROJECT GOALS SECTION */}
          <Grid size={12}>
            <Typography variant="h6" sx={classes.sectionTitle}>
              3. Project Goals
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, color: 'text.secondary' }}>
              Choose up to 3 that best describe your priorities
            </Typography>
          </Grid>

          <Grid size={12}>
            <FormGroup sx={classes.checkboxGroup}>
              {[
                { label: 'Curb appeal', value: 'Curb appeal' },
                { label: 'Functionality (usable outdoor space)', value: 'Functionality' },
                { label: 'Low maintenance', value: 'Low maintenance' },
                { label: 'Modern/high-end design', value: 'Modern/high-end design' },
                { label: 'Budget-friendly solution', value: 'Budget-friendly solution' },
                { label: 'Increase property value', value: 'Increase property value' },
                { label: 'Privacy or noise reduction', value: 'Privacy or noise reduction' }
              ].map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={data.projectGoals.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value, 'projectGoals')}
                      disabled={data.projectGoals.length >= 3 && !data.projectGoals.includes(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
            <TextField
              value={data.projectGoalsOther}
              onChange={event => handleTextChange(event.target.value, 'projectGoalsOther')}
              id="projectGoalsOther"
              label="Other (please specify)"
              fullWidth
              size="small"
            />
          </Grid>

          {/* MUST-HAVE FEATURES SECTION */}
          <Grid size={12}>
            <Typography variant="h6" sx={classes.sectionTitle}>
              4. Must-Have Features
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, color: 'text.secondary' }}>
              Check any that apply
            </Typography>
          </Grid>

          <Grid size={12}>
            <FormGroup sx={classes.checkboxGroup}>
              {[
                { label: 'Patio or deck', value: 'Patio or deck' },
                { label: 'Outdoor lighting', value: 'Outdoor lighting' },
                { label: 'Sod or artificial turf', value: 'Sod or artificial turf' },
                { label: 'Garden beds or planting', value: 'Garden beds or planting' },
                { label: 'Water feature', value: 'Water feature' },
                { label: 'Fire pit or fireplace', value: 'Fire pit or fireplace' },
                { label: 'Outdoor kitchen/grill', value: 'Outdoor kitchen/grill' },
                { label: 'Retaining walls', value: 'Retaining walls' },
                { label: 'Walkways or stepping stones', value: 'Walkways or stepping stones' },
                { label: 'Fence or screening', value: 'Fence or screening' }
              ].map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={data.features.includes(option.value)}
                      onChange={() => handleCheckboxChange(option.value, 'features')}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
            <TextField
              value={data.featuresOther}
              onChange={event => handleTextChange(event.target.value, 'featuresOther')}
              id="featuresOther"
              label="Other (please specify)"
              fullWidth
              size="small"
            />
          </Grid>

          {/* TIMELINE SECTION */}
          <Grid size={12}>
            <Typography variant="h6" sx={classes.sectionTitle}>
              5. Desired Timeline
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, color: 'text.secondary' }}>
              When are you hoping to start?
            </Typography>
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth>
              <RadioGroup
                value={data.timeline}
                onChange={event => handleRadioChange(event.target.value, 'timeline')}
              >
                {[
                  { label: 'As soon as possible', value: 'As soon as possible' },
                  { label: 'Within the next 1–2 months', value: '1-2 months' },
                  { label: '3–6 months', value: '3-6 months' },
                  { label: 'Flexible', value: 'Flexible' }
                ].map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            {data.timeline === 'Specific date/event' && (
              <TextField
                value={data.timelineDate}
                onChange={event => handleTextChange(event.target.value, 'timelineDate')}
                id="timelineDate"
                label="Specific date or event"
                fullWidth
                sx={{ marginTop: 2 }}
              />
            )}

            <TextField
              value={data.timelineDate}
              onChange={event => handleTextChange(event.target.value, 'timelineDate')}
              id="timelineDate"
              label="Specific date or event (optional)"
              fullWidth
              sx={{ marginTop: 2 }}
              placeholder="e.g., 'Summer 2024' or 'Before the holidays'"
            />
          </Grid>

          {/* BUDGET SECTION */}
          <Grid size={12}>
            <Typography variant="h6" sx={classes.sectionTitle}>
              6. Budget Range
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, color: 'text.secondary' }}>
              This helps us recommend the right materials, scale, and design for your project.
            </Typography>
          </Grid>

          <Grid size={12}>
            <FormControl fullWidth>
              <RadioGroup
                value={data.budget}
                onChange={event => handleRadioChange(event.target.value, 'budget')}
              >
                {[
                  { label: 'Under $5,000', value: 'Under $5,000' },
                  { label: '$5,000 – $10,000', value: '$5,000 - $10,000' },
                  { label: '$10,000 – $25,000', value: '$10,000 - $25,000' },
                  { label: '$25,000 – $50,000', value: '$25,000 - $50,000' },
                  { label: '$50,000+', value: '$50,000+' },
                  { label: 'Not sure — would like guidance', value: 'Not sure - would like guidance' }
                ].map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* ADDITIONAL COMMENTS SECTION */}
          <Grid size={12}>
            <Typography variant="h6" sx={classes.sectionTitle}>
              7. Additional Comments or Vision
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 2, color: 'text.secondary' }}>
              Optional - Please describe anything else you&apos;d like us to know
            </Typography>
          </Grid>

          <Grid size={12}>
            <TextField
              value={data.comments}
              onChange={event => handleTextChange(event.target.value, 'comments')}
              id="comments"
              label="Ideas, inspiration, challenges, or dream features..."
              fullWidth
              multiline
              rows={6}
              placeholder="Tell us about your vision!"
            />
          </Grid>

          {/* SUBMIT BUTTON */}
          <Grid sx={classes.submit} size={12}>
            <Button
              disabled={loading}
              endIcon={<SendIcon />}
              variant="contained"
              color="primary"
              onClick={sendEmail}
              size="large"
            >
              {loading ? 'Sending...' : 'Submit Project Inquiry'}
            </Button>
          </Grid>
        </Grid>

        {/* STATUS MESSAGES */}
        {status === 'success' && (
          <Typography component="h5" sx={classes.success}>
            ✓ Thank you for submitting your project inquiry! We&apos;ll review your information and get back to you soon.
          </Typography>
        )}
        {status === 'failure' && (
          <Typography component="h5" sx={classes.error}>
            ✗ Could not send your inquiry at this time. Please try again later or contact us directly.
          </Typography>
        )}
      </form>
      </Box>
    </>
  )
}
