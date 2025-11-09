import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import EventsPage from './pages/events/EventsPage'
import CommunitiesPage from './pages/communities/CommunitiesPage'
import LandingPage from './pages/landing/LandingPage'
import DiscussionsPage from './pages/discussions/DiscussionsPage'

function LoginModal({ open, onClose, onSuccess }){
  if (!open) return null

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
        onClick={(e)=>{ if (e.target === e.currentTarget) onClose && onClose(); }}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          key="panel"
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg md:max-w-xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 p-8"
        >
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Login to CampusConnect</h2>
            <button
              onClick={onClose}
              aria-label="Close login"
              className="ml-4 p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ✕
            </button>
          </div>

          <form className="mt-6 space-y-5" onSubmit={(e)=>{e.preventDefault(); onSuccess && onSuccess(); onClose && onClose();}}>
            <div>
              <label htmlFor="email" className="block text-base md:text-lg font-medium text-slate-700 dark:text-slate-300">Email</label>
              <input
                id="email"
                type="email"
                required
                autoFocus
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-3.5 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="you@college.edu"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-base md:text-lg font-medium text-slate-700 dark:text-slate-300">Password</label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-3.5 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
              <div className="mt-2 flex justify-end">
                <a href="#forgot" className="text-sm text-primary hover:underline">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl shadow-md">Login</button>

            <div className="relative text-center">
              <span className="px-3 text-xs text-slate-400 bg-white dark:bg-slate-900 relative z-10">or continue with</span>
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-slate-200 dark:bg-slate-700" />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button type="button" className="inline-flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.9 0 7.4 1.4 10.1 3.7l7.5-7.5C36.9 1.9 30.9 0 24 0 14.6 0 6.4 5.4 2.5 13.2l8.9 6.9C13.4 14.1 18.2 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.6c0-1.5-.1-2.6-.4-3.7H24v8.1h12.9c-.3 2-1.7 5-4.9 7.1l7.6 5.9c4.5-4.1 7-10.1 7-17.4z"/>
                  <path fill="#FBBC05" d="M11.4 27.1c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-8.9-6.9C.9 13 0 18.3 0 22.3s.9 9.3 2.5 11.7l8.9-6.9z"/>
                  <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-7.6-5.9c-2.1 1.4-4.9 2.4-8.4 2.4-6.5 0-12.1-4.4-14.1-10.5l-8.9 6.9C6.4 42.6 14.6 48 24 48z"/>
                </svg>
                <span className="text-base font-semibold">Continue with Google</span>
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#1877F2" d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v7.03C18.34 21.19 22 17.05 22 12.06z"/>
                </svg>
                <span className="text-base font-semibold">Continue with Facebook</span>
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M16.365 1.43c-1.34.091-2.915.933-3.86 2.03-.843.968-1.63 2.451-1.343 3.87 1.474.046 2.987-.84 3.855-1.95.82-1.05 1.51-2.54 1.348-3.95zm4.615 17.01c-.084-.05-3.05-1.74-3.09-4.64-.03-2.91 2.38-4.25 2.48-4.31-1.36-1.98-3.48-2.26-4.22-2.29-1.79-.18-3.49 1.03-4.4 1.03-.91 0-2.32-1-3.82-.98-1.97.03-3.78 1.14-4.8 2.9-2.05 3.5-.52 8.64 1.46 11.47.97 1.38 2.12 2.93 3.64 2.88 1.47-.06 2.02-.93 3.79-.93 1.77 0 2.26.93 3.82.9 1.58-.03 2.58-1.4 3.55-2.79 1.1-1.6 1.55-3.17 1.57-3.24-.03-.01-.03-.01-.01-.01z"/>
                </svg>
                <span className="text-base font-semibold">Continue with Apple</span>
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function SignUpModal({ open, onClose, onSuccess }){
  if (!open) return null

  const [contactError, setContactError] = React.useState('')
  const [passwordError, setPasswordError] = React.useState('')
  const [confirmPasswordError, setConfirmPasswordError] = React.useState('')

  const validateContact = (value) => {
    if (!/^[0-9]{10}$/.test(value)) {
      setContactError('Enter valid 10 digit number')
      return false
    }
    setContactError('')
    return true
  }

  const validatePassword = (value) => {
    const hasUpper = /[A-Z]/.test(value)
    const hasLower = /[a-z]/.test(value)
    const hasDigit = /[0-9]/.test(value)
    const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)
    const isLongEnough = value.length >= 10

    if (!isLongEnough || !hasUpper || !hasLower || !hasDigit || !hasSymbol) {
      setPasswordError('Enter strong password (10+ chars, uppercase, lowercase, digit, symbol)')
      return false
    }
    setPasswordError('')
    return true
  }

  const validateConfirmPassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match')
      return false
    }
    setConfirmPasswordError('')
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const contact = formData.get('contact')
    const password = formData.get('password')
    const confirmPassword = formData.get('confirmPassword')
    const username = formData.get('username')

    const isContactValid = validateContact(contact)
    const isPasswordValid = validatePassword(password)
    const isConfirmValid = validateConfirmPassword(password, confirmPassword)

    if (isContactValid && isPasswordValid && isConfirmValid) {
      onSuccess && onSuccess({ name: username })
      onClose && onClose()
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
        onClick={(e)=>{ if (e.target === e.currentTarget) onClose && onClose(); }}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          key="panel"
          initial={{ y: 40, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 20, opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg md:max-w-xl rounded-2xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 p-8 max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-start justify-between">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Create Your Account</h2>
            <button
              onClick={onClose}
              aria-label="Close sign up"
              className="ml-4 p-2 rounded-md text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              ✕
            </button>
          </div>

          <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-base md:text-lg font-medium text-slate-700 dark:text-slate-300">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                autoFocus
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-3.5 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="block text-base md:text-lg font-medium text-slate-700 dark:text-slate-300">Email ID</label>
              <input
                id="signup-email"
                type="email"
                required
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-3.5 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="name@college.edu"
              />
            </div>
            <div>
              <label htmlFor="contact" className="block text-base md:text-lg font-medium text-slate-700 dark:text-slate-300">Contact No</label>
              <div className="mt-1 flex gap-2">
                <div className="flex items-center px-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 text-lg font-medium">
                  +91
                </div>
                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  maxLength="10"
                  className="flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-3.5 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter 10 digit number"
                  onBlur={(e) => validateContact(e.target.value)}
                />
              </div>
              {contactError && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{contactError}</p>}
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Enter 10 digit mobile number</p>
            </div>
            <div>
              <label htmlFor="create-password" className="block text-base md:text-lg font-medium text-slate-700 dark:text-slate-300">Create a Strong Password</label>
              <input
                id="create-password"
                name="password"
                type="password"
                required
                minLength="10"
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-3.5 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••••"
                onBlur={(e) => validatePassword(e.target.value)}
              />
              {passwordError && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{passwordError}</p>}
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-base md:text-lg font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                minLength="10"
                className="mt-1 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-4 py-3.5 text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••••"
                onBlur={(e) => {
                  const password = document.getElementById('create-password').value
                  validateConfirmPassword(password, e.target.value)
                }}
              />
              {confirmPasswordError && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{confirmPasswordError}</p>}
            </div>

            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-xl shadow-md">Create Account</button>

            <div className="relative text-center">
              <span className="px-3 text-xs text-slate-400 bg-white dark:bg-slate-900 relative z-10">or sign up with</span>
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-slate-200 dark:bg-slate-700" />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button type="button" className="inline-flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                <svg width="24" height="24" viewBox="0 0 48 48" aria-hidden="true">
                  <path fill="#EA4335" d="M24 9.5c3.9 0 7.4 1.4 10.1 3.7l7.5-7.5C36.9 1.9 30.9 0 24 0 14.6 0 6.4 5.4 2.5 13.2l8.9 6.9C13.4 14.1 18.2 9.5 24 9.5z"/>
                  <path fill="#4285F4" d="M46.5 24.6c0-1.5-.1-2.6-.4-3.7H24v8.1h12.9c-.3 2-1.7 5-4.9 7.1l7.6 5.9c4.5-4.1 7-10.1 7-17.4z"/>
                  <path fill="#FBBC05" d="M11.4 27.1c-.5-1.5-.8-3.1-.8-4.8s.3-3.3.8-4.8l-8.9-6.9C.9 13 0 18.3 0 22.3s.9 9.3 2.5 11.7l8.9-6.9z"/>
                  <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-7.6-5.9c-2.1 1.4-4.9 2.4-8.4 2.4-6.5 0-12.1-4.4-14.1-10.5l-8.9 6.9C6.4 42.6 14.6 48 24 48z"/>
                </svg>
                <span className="text-base font-semibold">Sign up with Google</span>
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="#1877F2" d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.9h2.54V9.41c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.9h-2.34v7.03C18.34 21.19 22 17.05 22 12.06z"/>
                </svg>
                <span className="text-base font-semibold">Sign up with Facebook</span>
              </button>
              <button type="button" className="inline-flex items-center justify-center gap-3 w-full px-5 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700">
                <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d="M16.365 1.43c-1.34.091-2.915.933-3.86 2.03-.843.968-1.63 2.451-1.343 3.87 1.474.046 2.987-.84 3.855-1.95.82-1.05 1.51-2.54 1.348-3.95zm4.615 17.01c-.084-.05-3.05-1.74-3.09-4.64-.03-2.91 2.38-4.25 2.48-4.31-1.36-1.98-3.48-2.26-4.22-2.29-1.79-.18-3.49 1.03-4.4 1.03-.91 0-2.32-1-3.82-.98-1.97.03-3.78 1.14-4.8 2.9-2.05 3.5-.52 8.64 1.46 11.47.97 1.38 2.12 2.93 3.64 2.88 1.47-.06 2.02-.93 3.79-.93 1.77 0 2.26.93 3.82.9 1.58-.03 2.58-1.4 3.55-2.79 1.1-1.6 1.55-3.17 1.57-3.24-.03-.01-.03-.01-.01-.01z"/>
                </svg>
                <span className="text-base font-semibold">Sign up with Apple</span>
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

function Icon({ children, src }){
  // If a logo image is provided at /logo.png (or another path passed via src),
  // show it; otherwise fall back to the stylized initials placeholder.
  if (src) {
    return (
      <img src={src} alt="logo" className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover shadow-md" />
    )
  }

  return (
    <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-md text-lg md:text-xl">{children}</div>
  )
}

function Header({ theme, toggleTheme, onLoginClick }){
  return (
    <header className="bg-slate-50/90 dark:bg-slate-900/90 backdrop-blur-sm sticky top-0 z-30 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-1.5 md:py-2 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {/* Logo area: drop /logo.png into the public folder to replace the placeholder */}
          <Icon src="/images/logo.png">CC</Icon>

          <div>
            <div className="font-black text-2xl md:text-4xl text-slate-900 dark:text-white">CampusConnect</div>
          </div>
        </div>
        
        <button onClick={onLoginClick} className="inline-flex items-center gap-2 bg-black hover:bg-primary/90 text-white font-bold text-sm md:text-base px-4 md:px-5 py-1.5 md:py-2 rounded-lg shadow-lg hover:shadow-xl transition-all">
          Login
        </button>
      </div>
    </header>
  )
}

function Hero({ onSignUpClick }){
  return (
    <section className="relative bg-gradient-to-b from-slate-100 to-slate-50/50 dark:from-slate-900 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y:0, opacity:1 }} 
            transition={{ duration: 0.6 }} 
            className="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900 dark:text-white mb-4"
          >
            CampusConnect
          </motion.h1>
          <motion.div 
            initial={{ y: 10, opacity: 0 }} 
            animate={{ y:0, opacity:1 }} 
            transition={{ duration: 0.8 }} 
            className="space-y-2"
          >
            <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              The Smart Hub
            </p>
            <p className="text-xl md:text-2xl font-semibold text-slate-700 dark:text-slate-200">
              for Students to Network, Discover, and Grow.
            </p>
          </motion.div>
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay: 0.9 }} className="mt-8 flex gap-4">
            <motion.button 
              whileTap={{ scale: 0.95 }} 
              onClick={onSignUpClick} 
              className="inline-flex items-center gap-2 bg-black text-white font-bold text-md md:text-lg px-4 md:px-6 py-2.5 md:py-3 rounded-lg shadow-lg transition-all"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>

        <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale:1, opacity:1 }} transition={{ duration: 0.6 }} className="flex-1">
          <div className="w-full bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-slate-400">Students Space</div>
              </div>
            </div>

            <div className="mt-6 bg-[#F4DBCC] border-2 border-black rounded-xl p-8 backdrop-blur-sm">
              <div className="text-slate-900 dark:text-white font-bold text-2xl md:text-3xl mb-6">Step inside a space built just for students.</div>
              <div className="mt-2 text-slate-800 dark:text-slate-100 text-lg md:text-xl leading-relaxed">
                Explore college fests happening around Nagpur, share ideas that inspire, and be part of communities that match your vibe.
              </div>
              <div className="mt-6 text-slate-800 dark:text-slate-100 text-lg font-semibold">
                Your journey of collaboration begins here ✨
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Features(){
  const items = [
    {title: 'Personalized Space', body: 'Keep track of your past events, joined clubs, and saved discussions — all in one place designed just for you.'},
    {title: 'Join Communities', body: 'Connect with students from across Nagpur, share ideas, and grow together through topic-based groups and forums.'},
    {title: 'Campus Calendar', body: 'Stay organized with a clear view of upcoming fests, workshops, and deadlines — never miss an event again.'},
  ];

  return (
    <section id="learn" className="max-w-6xl mx-auto px-6 py-16">
      <motion.h2 
        initial={{ y: 20, opacity: 0 }} 
        whileInView={{ y: 0, opacity: 1 }} 
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }} 
        className="text-2xl font-bold text-slate-900 dark:text-white"
      >
        What you'll find here
      </motion.h2>
      <motion.p 
        initial={{ y: 10, opacity: 0 }} 
        whileInView={{ y: 0, opacity: 1 }} 
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }} 
        className="mt-2 text-slate-600 dark:text-slate-300"
      >
        The features that make your campus experience smarter and more connected.
      </motion.p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <motion.div 
            key={it.title} 
            initial={{ y: 30, opacity: 0 }} 
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ 
              y: -5,
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
            className="group p-6 bg-slate-50 dark:bg-slate-800 rounded-xl shadow-md ring-1 ring-slate-200 dark:ring-slate-700 transition-shadow duration-300 hover:shadow-xl"
          >
            <div className="text-lg font-bold text-slate-900 dark:text-white transition-colors duration-300 group-hover:text-primary">{it.title}</div>
            {(it.title === 'Personalized Space' || it.title === 'Join Communities' || it.title === 'Campus Calendar') && (
              <img 
                src={
                  it.title === 'Personalized Space' ? '/img1.avif' 
                  : it.title === 'Join Communities' ? '/img2.avif'
                  : '/img3.jpg'
                } 
                alt={`${it.title} Feature`} 
                className="w-full h-40 object-cover rounded-lg my-4 transition-transform duration-300 group-hover:scale-[1.02]"
              />
            )}
            <div className="mt-2 text-slate-600 dark:text-slate-300">{it.body}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function Contact(){
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-12">
      <motion.div 
        initial={{ y: 30, opacity: 0 }} 
        whileInView={{ y: 0, opacity: 1 }} 
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6 }} 
        className="bg-black p-8 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Get in touch</h3>
        <ul className="flex items-center gap-4">
          <li>
            <img src="/images/instagram.jpg" alt="Instagram" className="w-10 h-10" />
          </li>
          <li>
            <img src="/images/linkedin.png" alt="LinkedIn" className="w-10 h-10" />
          </li>
          <li>
            <img src="/images/X.avif" alt="X" className="w-10 h-10" />
          </li>
        </ul>
      </motion.div>
    </section>
  )
}

export default function App(){
  const [theme, setTheme] = useState(() => localStorage.getItem('site-theme') || 'light')
  const [loginOpen, setLoginOpen] = useState(false)
  const [signUpOpen, setSignUpOpen] = useState(false)
  const [isAuthed, setIsAuthed] = useState(false)
  const [userName, setUserName] = useState('Kanak')
  const [currentPage, setCurrentPage] = useState('events')
  const [createdCommunities, setCreatedCommunities] = useState([])

  const handleCommunityCreatedApp = (newCommunity) => {
    setCreatedCommunities(prev => [newCommunity, ...prev])
    // navigate to communities view so user sees it
    setCurrentPage('communities')
    // optional notification
    // alert('Community created — it appears in Explore Communities')
  }

  useEffect(() => {
    const root = document.documentElement
    if(theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('site-theme', theme)
  }, [theme])

  function toggleTheme(){
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const handleLoginSuccess = (email) => {
    if (email && typeof email === 'string') {
      const base = email.split('@')[0] || 'User'
      const pretty = base.charAt(0).toUpperCase() + base.slice(1)
      setUserName(pretty)
    }
    setIsAuthed(true)
  }

  const handleSignUpSuccess = ({ name }) => {
    if (name) setUserName(name)
    setIsAuthed(true)
    // show the landing page after successful sign up
    setCurrentPage('landing')
  }

  return (
    <div className="min-h-screen bg-[#E6C8B9]">
      {isAuthed ? (
        <>
          {currentPage === 'landing' && <LandingPage userName={userName} onNavigate={setCurrentPage} onCommunityCreated={handleCommunityCreatedApp} />}
          {currentPage === 'events' && <EventsPage userName={userName} onNavigate={setCurrentPage} onCommunityCreated={handleCommunityCreatedApp} />}
          {currentPage === 'communities' && <CommunitiesPage onNavigate={setCurrentPage} createdCommunities={createdCommunities} />}
          {currentPage === 'discussions' && <DiscussionsPage isOpen={true} onClose={() => setCurrentPage('landing')} />}
        </>
      ) : (
        <>
          <Header theme={theme} toggleTheme={toggleTheme} onLoginClick={() => setLoginOpen(true)} />
          <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} onSuccess={() => handleLoginSuccess(document.getElementById('email')?.value)} />
          <SignUpModal open={signUpOpen} onClose={() => setSignUpOpen(false)} onSuccess={handleSignUpSuccess} />
          <main>
            <Hero onSignUpClick={() => setSignUpOpen(true)} />
            <Features />
            <Contact />
          </main>
          <footer className="border-t border-slate-200 dark:border-slate-700 mt-12">
            <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-slate-600 dark:text-slate-400">© {new Date().getFullYear()} CampusConnect — Built with care.</div>
          </footer>
        </>
      )}
    </div>
  )
}

// LandingPage moved to ./pages/landing/LandingPage
