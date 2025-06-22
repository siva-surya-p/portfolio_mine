import { useState } from 'react'
import { motion } from 'framer-motion'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' })

  const validate = () => {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required.'
    if (!form.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (!form.message.trim()) errs.message = 'Message is required.'
    return errs
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ success: false, message: '' })

    try {
      // Using Formspree form submission
      const response = await fetch(import.meta.env.VITE_FORMSUBMIT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus({ 
          success: true, 
          message: 'Thank you! Your message has been sent successfully.' 
        })
        setForm({ name: '', email: '', message: '' })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Failed to send message:', error)
      setSubmitStatus({ 
        success: false, 
        message: `Failed to send message. Please try again later or contact me directly at ${import.meta.env.VITE_CONTACT_EMAIL}` 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div className="page d-flex flex-column align-items-center justify-content-center"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="fw-bold mb-4">Contact Me</h2>
      {submitStatus.message && (
        <div className={`alert w-100 text-center ${submitStatus.success ? 'alert-success' : 'alert-danger'}`}>
          {submitStatus.message}
        </div>
      )}
      <form className="w-100" style={{ maxWidth: 500 }} onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className={`form-control${errors.name ? ' is-invalid' : ''}`} name="name" value={form.name} onChange={handleChange} />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className={`form-control${errors.email ? ' is-invalid' : ''}`} name="email" value={form.email} onChange={handleChange} />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea className={`form-control${errors.message ? ' is-invalid' : ''}`} name="message" rows="4" value={form.message} onChange={handleChange}></textarea>
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>
        <button 
          type="submit" 
          className="btn btn-primary w-100 fw-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Sending...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </motion.div>
  )
}

export default Contact 