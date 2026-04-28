import React, { useState, useEffect } from 'react'
import { useFetcher } from 'react-router'

const SEND_TO = 'info@losvaldiviaslandscaping.com'
const SEND_FROM = 'notifications@villawebsolutions.com'

const PROJECT_TYPES = [
  'New Landscape Installation',
  'Hardscaping (patios, walkways, retaining walls)',
  'Irrigation/Drainage Solutions',
  'Outdoor Living Area (kitchen, fire pit, pergola, etc.)',
  'Yard Cleanup or Maintenance',
  'Fence or Deck Construction'
]

const PROJECT_GOALS = [
  'Curb appeal',
  'Functionality (usable outdoor space)',
  'Low maintenance',
  'Modern/high-end design',
  'Budget-friendly solution',
  'Increase property value',
  'Privacy or noise reduction'
]

const FEATURES = [
  'Patio or deck',
  'Outdoor lighting',
  'Sod or artificial turf',
  'Garden beds or planting',
  'Water feature',
  'Fire pit or fireplace',
  'Outdoor kitchen/grill',
  'Retaining walls',
  'Walkways or stepping stones',
  'Fence or screening'
]

const TIMELINES = [
  { label: 'As soon as possible', value: 'As soon as possible' },
  { label: 'Within the next 1–2 months', value: '1-2 months' },
  { label: '3–6 months', value: '3-6 months' },
  { label: 'Flexible', value: 'Flexible' }
]

const BUDGETS = [
  'Under $5,000',
  '$5,000 – $10,000',
  '$10,000 – $25,000',
  '$25,000 – $50,000',
  '$50,000+',
  'Not sure — would like guidance'
]

const EMPTY = {
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
}

const PHONE_RE = /^\(\d{3}\)\s\d{3}-\d{4}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function formatPhone (raw) {
  const d = raw.replace(/\D/g, '').slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
)

export default function LosValdiviasIntakeForm () {
  const fetcher = useFetcher()
  const [data, setData] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const loading = fetcher.state !== 'idle'
  const status = fetcher.data?.ok === true ? 'success' : fetcher.data?.ok === false ? 'failure' : 'idle'

  useEffect(() => {
    if (fetcher.data?.ok === true) setData(EMPTY)
  }, [fetcher.data])

  const set = (field, value) => {
    setData(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: false }))
  }

  const toggleCheck = (field, value) => {
    setData(prev => {
      const arr = prev[field]
      return { ...prev, [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] }
    })
  }

  const validate = () => {
    const e = {}
    if (!data.fullName.trim()) e.fullName = true
    if (!PHONE_RE.test(data.phone)) e.phone = true
    if (!EMAIL_RE.test(data.email)) e.email = true
    if (!data.projectAddress.trim()) e.projectAddress = true
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return

    const lines = [
      '--- CLIENT PROJECT INTAKE FORM ---',
      '',
      '=== CONTACT INFORMATION ===',
      `Full Name: ${data.fullName}`,
      `Phone: ${data.phone}`,
      `Email: ${data.email}`,
      `Project Address: ${data.projectAddress}`,
      '',
      '=== TYPE OF PROJECT ===',
      data.projectTypes.length ? data.projectTypes.join(', ') : 'None selected',
      ...(data.projectTypesOther ? [`Other: ${data.projectTypesOther}`] : []),
      '',
      '=== PROJECT GOALS ===',
      data.projectGoals.length ? data.projectGoals.join(', ') : 'None selected',
      ...(data.projectGoalsOther ? [`Other: ${data.projectGoalsOther}`] : []),
      '',
      '=== MUST-HAVE FEATURES ===',
      data.features.length ? data.features.join(', ') : 'None selected',
      ...(data.featuresOther ? [`Other: ${data.featuresOther}`] : []),
      '',
      '=== TIMELINE ===',
      `Timeline: ${data.timeline || 'Not specified'}`,
      ...(data.timelineDate ? [`Specific date/event: ${data.timelineDate}`] : []),
      '',
      '=== BUDGET RANGE ===',
      `Budget: ${data.budget || 'Not specified'}`,
      '',
      '=== ADDITIONAL COMMENTS ===',
      data.comments || 'No additional comments'
    ]

    fetcher.submit(
      JSON.stringify({
        to: SEND_TO,
        from: SEND_FROM,
        replyTo: data.email,
        subject: `Los Valdivias Landscape: Project Intake Form from ${data.fullName}`,
        text: lines.join('\n')
      }),
      { method: 'POST', action: '/send-email', encType: 'application/json' }
    )

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'form_submission', {
        form_type: 'lvl_intake_form',
        project_types: data.projectTypes.join(', '),
        budget: data.budget
      })
    }
  }

  return (
    <div className="intake-form">
      <h1 className="intake-form__title">Landscaping Project Intake Form</h1>
      <p className="intake-form__subtitle">
        Tell us about your project! This helps us understand your vision and provide the best recommendations.
      </p>

      {/* 1. Contact Information */}
      <section className="intake-form__section">
        <h2 className="intake-form__section-title">1. Contact Information</h2>
        <div className="intake-form__grid">
          <div className="intake-form__field">
            <label className="intake-form__label" htmlFor="if-fullName">Full Name *</label>
            <input
              id="if-fullName"
              className={`intake-form__input${errors.fullName ? ' intake-form__input--error' : ''}`}
              type="text"
              value={data.fullName}
              onChange={e => set('fullName', e.target.value)}
            />
            {errors.fullName && <span className="intake-form__error-msg">Full name is required.</span>}
          </div>

          <div className="intake-form__field">
            <label className="intake-form__label" htmlFor="if-phone">Phone Number *</label>
            <input
              id="if-phone"
              className={`intake-form__input${errors.phone ? ' intake-form__input--error' : ''}`}
              type="tel"
              placeholder="(555) 000-0000"
              value={data.phone}
              onChange={e => set('phone', formatPhone(e.target.value))}
            />
            {errors.phone && <span className="intake-form__error-msg">A valid phone number is required.</span>}
          </div>

          <div className="intake-form__field">
            <label className="intake-form__label" htmlFor="if-email">Email Address *</label>
            <input
              id="if-email"
              className={`intake-form__input${errors.email ? ' intake-form__input--error' : ''}`}
              type="email"
              value={data.email}
              onChange={e => set('email', e.target.value)}
            />
            {errors.email && <span className="intake-form__error-msg">A valid email is required.</span>}
          </div>

          <div className="intake-form__field">
            <label className="intake-form__label" htmlFor="if-address">Project Address *</label>
            <input
              id="if-address"
              className={`intake-form__input${errors.projectAddress ? ' intake-form__input--error' : ''}`}
              type="text"
              value={data.projectAddress}
              onChange={e => set('projectAddress', e.target.value)}
            />
            {errors.projectAddress && <span className="intake-form__error-msg">Project address is required.</span>}
          </div>
        </div>
      </section>

      {/* 2. Type of Project */}
      <section className="intake-form__section">
        <h2 className="intake-form__section-title">2. Type of Project</h2>
        <p className="intake-form__section-hint">Check all that apply.</p>
        <div className="intake-form__check-group">
          {PROJECT_TYPES.map(opt => (
            <label key={opt} className="intake-form__check-item">
              <input
                type="checkbox"
                checked={data.projectTypes.includes(opt)}
                onChange={() => toggleCheck('projectTypes', opt)}
              />
              {opt}
            </label>
          ))}
        </div>
        <div className="intake-form__other-input">
          <input
            className="intake-form__input"
            type="text"
            placeholder="Other (please specify)"
            value={data.projectTypesOther}
            onChange={e => set('projectTypesOther', e.target.value)}
          />
        </div>
      </section>

      {/* 3. Project Goals */}
      <section className="intake-form__section">
        <h2 className="intake-form__section-title">3. Project Goals</h2>
        <p className="intake-form__section-hint">Choose up to 3 that best describe your priorities.</p>
        <div className="intake-form__check-group">
          {PROJECT_GOALS.map(opt => {
            const disabled = data.projectGoals.length >= 3 && !data.projectGoals.includes(opt)
            return (
              <label key={opt} className={`intake-form__check-item${disabled ? ' intake-form__check-item--disabled' : ''}`}>
                <input
                  type="checkbox"
                  checked={data.projectGoals.includes(opt)}
                  disabled={disabled}
                  onChange={() => toggleCheck('projectGoals', opt)}
                />
                {opt}
              </label>
            )
          })}
        </div>
        <div className="intake-form__other-input">
          <input
            className="intake-form__input"
            type="text"
            placeholder="Other (please specify)"
            value={data.projectGoalsOther}
            onChange={e => set('projectGoalsOther', e.target.value)}
          />
        </div>
      </section>

      {/* 4. Must-Have Features */}
      <section className="intake-form__section">
        <h2 className="intake-form__section-title">4. Must-Have Features</h2>
        <p className="intake-form__section-hint">Check any that apply.</p>
        <div className="intake-form__check-group">
          {FEATURES.map(opt => (
            <label key={opt} className="intake-form__check-item">
              <input
                type="checkbox"
                checked={data.features.includes(opt)}
                onChange={() => toggleCheck('features', opt)}
              />
              {opt}
            </label>
          ))}
        </div>
        <div className="intake-form__other-input">
          <input
            className="intake-form__input"
            type="text"
            placeholder="Other (please specify)"
            value={data.featuresOther}
            onChange={e => set('featuresOther', e.target.value)}
          />
        </div>
      </section>

      {/* 5. Timeline */}
      <section className="intake-form__section">
        <h2 className="intake-form__section-title">5. Desired Timeline</h2>
        <p className="intake-form__section-hint">When are you hoping to start?</p>
        <div className="intake-form__radio-group">
          {TIMELINES.map(opt => (
            <label key={opt.value} className="intake-form__radio-item">
              <input
                type="radio"
                name="timeline"
                value={opt.value}
                checked={data.timeline === opt.value}
                onChange={() => set('timeline', opt.value)}
              />
              {opt.label}
            </label>
          ))}
        </div>
        <div className="intake-form__other-input">
          <input
            className="intake-form__input"
            type="text"
            placeholder="Specific date or event (optional) — e.g. 'Before the holidays'"
            value={data.timelineDate}
            onChange={e => set('timelineDate', e.target.value)}
          />
        </div>
      </section>

      {/* 6. Budget */}
      <section className="intake-form__section">
        <h2 className="intake-form__section-title">6. Budget Range</h2>
        <p className="intake-form__section-hint">This helps us recommend the right materials, scale, and design.</p>
        <div className="intake-form__radio-group">
          {BUDGETS.map(opt => (
            <label key={opt} className="intake-form__radio-item">
              <input
                type="radio"
                name="budget"
                value={opt}
                checked={data.budget === opt}
                onChange={() => set('budget', opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </section>

      {/* 7. Comments */}
      <section className="intake-form__section">
        <h2 className="intake-form__section-title">7. Additional Comments or Vision</h2>
        <p className="intake-form__section-hint">Optional — describe anything else you&apos;d like us to know.</p>
        <textarea
          className="intake-form__textarea"
          rows={6}
          placeholder="Ideas, inspiration, challenges, or dream features..."
          value={data.comments}
          onChange={e => set('comments', e.target.value)}
        />
      </section>

      {/* Submit */}
      <div className="intake-form__submit">
        <button className="intake-form__btn" type="button" onClick={handleSubmit} disabled={loading}>
          <span>{loading ? 'Sending…' : 'Submit Project Inquiry'}</span>
          <SendIcon />
        </button>
      </div>

      <div className="intake-form__status">
        {status === 'success' && (
          <p className="intake-form__success">
            ✓ Thank you for submitting your inquiry! We&apos;ll review your information and get back to you soon.
          </p>
        )}
        {status === 'failure' && (
          <p className="intake-form__failure">
            ✗ Could not send your inquiry at this time. Please try again later or contact us directly.
          </p>
        )}
      </div>
    </div>
  )
}
