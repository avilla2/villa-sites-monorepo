import React, { useEffect, useState } from 'react'
import { CircleHelp, Mail, MessageCircle, Phone, X } from 'lucide-react'
import Page from '../pages/Page'

const ICONS = {
  chat: MessageCircle,
  chatbubble: MessageCircle,
  chatbubbleoutline: MessageCircle,
  message: MessageCircle,
  messageoutline: MessageCircle,
  help: CircleHelp,
  helpoutline: CircleHelp,
  contact: CircleHelp,
  contactsupport: CircleHelp,
  email: Mail,
  mail: Mail,
  mailoutline: Mail,
  phone: Phone,
  phoneintalk: Phone
}

function ModalIcon({ name }) {
  const normalizedName = String(name || '')
    .replace(/[\s_-]/g, '')
    .toLowerCase()
  const Icon = ICONS[normalizedName] || MessageCircle
  return <Icon aria-hidden="true" size={28} strokeWidth={1.8} />
}

export default function WebsiteModal({ modal, websiteId, siteName }) {
  const [modalPhase, setModalPhase] = useState('closed')
  const [showMessage, setShowMessage] = useState(false)
  const isOpen = modalPhase !== 'closed'

  useEffect(() => {
    if (!modal?.Content?.length) return

    const storageKey = `solar:modal-message-seen:${websiteId || siteName || 'website'}`
    try {
      if (window.localStorage.getItem(storageKey) === 'true') return
      window.localStorage.setItem(storageKey, 'true')
      setShowMessage(true)
    } catch {
      // Keep the first-visit message available when browser storage is disabled.
      setShowMessage(true)
    }
  }, [modal, siteName, websiteId])

  useEffect(() => {
    if (!isOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setModalPhase('closing')
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  if (!modal?.Content?.length) return null

  const openModal = () => {
    setShowMessage(false)
    setModalPhase('opening')
  }

  const handleModalAnimationEnd = (event) => {
    if (event.target !== event.currentTarget) return

    if (modalPhase === 'opening') setModalPhase('open')
    if (modalPhase === 'closing') setModalPhase('closed')
  }

  return (
    <React.Fragment>
      {modalPhase === 'closed' && (
        <div className="website-modal-launcher">
          {showMessage && modal.metaDescription && (
            <div className="website-modal-launcher__message" role="status">
              <span>{modal.metaDescription}</span>
              <button
                className="website-modal-launcher__dismiss"
                type="button"
                aria-label="Dismiss message"
                onClick={() => setShowMessage(false)}
              >
                <X aria-hidden="true" size={18} strokeWidth={2} />
              </button>
            </div>
          )}
          <button
            className="website-modal-launcher__button"
            type="button"
            aria-label="Open message"
            aria-haspopup="dialog"
            onClick={openModal}
          >
            <ModalIcon name={modal.Link} />
          </button>
        </div>
      )}

      {isOpen && (
        <div
          className={`website-modal website-modal--${modalPhase}`}
          role="dialog"
          aria-modal="true"
          aria-label="Website message"
          onAnimationEnd={handleModalAnimationEnd}
        >
          <header className="website-modal__header">
            <span className="website-modal__sr-only">Website message</span>
            <button
              className="website-modal__close"
              type="button"
              aria-label="Close message"
              onClick={() => setModalPhase('closing')}
            >
              <X aria-hidden="true" size={24} strokeWidth={2} />
            </button>
          </header>
          <div className="website-modal__content">
            <Page
              content={modal.Content}
              pageName="Website message"
              path="/modal"
              siteName={siteName}
              trackPageView={false}
            />
          </div>
        </div>
      )}
    </React.Fragment>
  )
}
