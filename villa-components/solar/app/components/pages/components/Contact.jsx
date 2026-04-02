import React, { useState, useEffect } from 'react'
import { useFetcher } from 'react-router'

const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

/**
 * @param {Object} props
 * @param {import('../../../../../components/src/types').FormComponent} props.content
 * @param {string} props.siteName
 */
export default function Contact ({ content, siteName }) {
  if (!content?.formFields?.length) return null

  const defaultData = Object.fromEntries(content.formFields.map(f => [f.name, '']))
  const defaultErrors = Object.fromEntries(content.formFields.map(f => [f.name, false]))

  const fetcher = useFetcher()
  const [data, setData] = useState(defaultData)
  const [errors, setErrors] = useState({ ...defaultErrors, body: false })
  const [body, setBody] = useState('')

  const loading = fetcher.state !== 'idle'
  const status = fetcher.data?.ok === true
    ? 'success'
    : fetcher.data?.ok === false
      ? 'failure'
      : 'idle'

  useEffect(() => {
    if (fetcher.data?.ok === true) clearForm()
  }, [fetcher.data])

  const handleChange = (name, value) => {
    setData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: false }))
  }

  const clearForm = () => {
    setData(defaultData)
    setBody('')
    setErrors({ ...defaultErrors, body: false })
  }

  const sendEmail = async () => {
    const newErrors = {}
    let hasError = false

    for (const field of content.formFields) {
      const valid = new RegExp(field.validation || '.').test(data[field.name] || '')
      newErrors[field.name] = !valid
      if (!valid) hasError = true
    }

    newErrors.body = !body.trim()
    if (!body.trim()) hasError = true

    if (hasError) { setErrors(newErrors); return }

    const subjectLine = content.formFields
      .filter(f => f.includeInSubjectLine && data[f.name])
      .map(f => data[f.name])
      .join(' ') || 'Unknown'

    const emailBody = [
      ...content.formFields.map(f => `${f.label}: ${data[f.name]}`),
      '',
      `${content.bodyTitle || 'Message'}:`,
      body
    ]

    fetcher.submit(
      JSON.stringify({
        to: content.sendTo,
        from: content.sendFrom,
        replyTo: data.email || null,
        subject: `${siteName}: Contact Form from ${subjectLine}`,
        text: emailBody.join('\n')
      }),
      { method: 'POST', action: '/send-email', encType: 'application/json' }
    )

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'form_submission', { form_type: 'contact_form' })
    }
  }

  return (
    <div className="contact">
      <form className="contact__form" noValidate>
        <div className="contact__fields">
          {content.formFields.map(field => (
            <div key={field.name} className={`contact__field${field.fullWidth ? ' contact__field--full' : ''}`}>
              <label className="contact__label" htmlFor={field.name}>{field.label}</label>
              <input
                id={field.name}
                name={field.name}
                type={field.type === 'phone' ? 'tel' : (field.type || 'text')}
                {...(field.type === 'phone' ? { pattern: '[0-9()\\-\\s]+', placeholder: '(555) 000-0000' } : {})}
                value={data[field.name]}
                onChange={e => handleChange(field.name, e.target.value)}
                className={`contact__input${errors[field.name] ? ' contact__input--error' : ''}`}
              />
              {errors[field.name] && (
                <span className="contact__error-msg">Please enter a valid {field.label.toLowerCase()}.</span>
              )}
            </div>
          ))}

          <div className="contact__field contact__field--full">
            <label className="contact__label" htmlFor="contact-body">
              {content.bodyTitle || 'Message'}
            </label>
            <textarea
              id="contact-body"
              name="body"
              rows={8}
              value={body}
              onChange={e => { setBody(e.target.value); if (errors.body) setErrors(prev => ({ ...prev, body: false })) }}
              className={`contact__textarea${errors.body ? ' contact__textarea--error' : ''}`}
            />
            {errors.body && <span className="contact__error-msg">This field is required.</span>}
          </div>
        </div>

        <div className="contact__submit">
          <button className="contact__btn" type="button" onClick={sendEmail} disabled={loading}>
            <span>{loading ? 'Sending…' : 'Submit'}</span>
            <SendIcon />
          </button>
        </div>

        <div className="contact__status">
          {status === 'success' && (
            <p className="contact__success">Thank you for reaching out, we will get back to you soon.</p>
          )}
          {status === 'failure' && (
            <p className="contact__failure">Could not send the message at this time. Please try again later.</p>
          )}
        </div>
      </form>
    </div>
  )
}
