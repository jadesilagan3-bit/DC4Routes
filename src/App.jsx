import { useState } from 'react'
import { Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom'

function Navbar() {
  return (
    <header className="site-header">
      <Link className="brand" to="/">Mini<span>Site</span></Link>
      <nav aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </header>
  )
}

function Home() {
  return (
    <section className="hero">
      <p className="eyebrow">WELCOME TO MY MINI SITE</p>
      <h1>A small site.<br /><span>A fresh start.</span></h1>
      <p className="lead">Hello! Thanks for visiting. This simple React website lets you explore a few pages and send a message.</p>
      <div className="hero-actions">
        <Link className="button primary" to="/about">Learn about us <span aria-hidden="true">→</span></Link>
        <Link className="text-link" to="/contact">Send a message</Link>
      </div>
      <div className="feature-row">
        <div className="feature"><span className="feature-icon">01</span><div><strong>Simple pages</strong><p>Easy to explore</p></div></div>
        <div className="feature"><span className="feature-icon">02</span><div><strong>Working links</strong><p>Move without reloads</p></div></div>
        <div className="feature"><span className="feature-icon">03</span><div><strong>Contact form</strong><p>Share your message</p></div></div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="page-card">
      <p className="eyebrow">A LITTLE INTRODUCTION</p>
      <h1>About this site</h1>
      <p className="lead">My Mini Site is a small React project made for practicing pages, navigation, and forms.</p>
      <p>It uses React to build the page components and React Router to move between Home, About, Contact, and Thank You. The design is kept simple so the main focus is on how the app works.</p>
      <div className="note"><strong>What I’m practicing</strong><p>Components, routes, links, controlled inputs, form validation, and navigation after submitting a form.</p></div>
      <Link className="button primary" to="/contact">Get in touch <span aria-hidden="true">→</span></Link>
    </section>
  )
}

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email before submitting.')
      return
    }
    setError('')
    navigate('/thank-you', { state: { name: name.trim() } })
  }

  return (
    <section className="contact-layout">
      <div className="contact-copy">
        <p className="eyebrow">LET’S TALK</p>
        <h1>Send a<br /><span>message.</span></h1>
        <p className="lead">Have a question or just want to say hello? Fill out the form and send your message.</p>
        <div className="contact-tip"><span aria-hidden="true">✳</span><p><strong>Quick note</strong><br />Name and email are required. Your message can be short and simple.</p></div>
      </div>
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="form-heading"><h2>Contact form</h2><p>Fields marked * are required.</p></div>
        <label htmlFor="name">Your name <span>*</span></label>
        <input id="name" name="name" type="text" placeholder="e.g. Alex Santos" value={name} onChange={(e) => { setName(e.target.value); setError('') }} />
        <label htmlFor="email">Email address <span>*</span></label>
        <input id="email" name="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setError('') }} />
        <label htmlFor="message">Your message</label>
        <textarea id="message" name="message" rows="4" placeholder="Write a short message..." value={message} onChange={(e) => setMessage(e.target.value)} />
        {error && <p className="error" role="alert">{error}</p>}
        <button className="button primary submit-button" type="submit">Send message <span aria-hidden="true">→</span></button>
        <p className="form-footnote">Demo form · No message is sent to a server.</p>
      </form>
    </section>
  )
}

function ThankYou() {
  const navigate = useNavigate()
  return (
    <section className="success-card">
      <div className="success-icon" aria-hidden="true">✓</div>
      <p className="eyebrow">FORM SUBMITTED</p>
      <h1>Thank you!</h1>
      <p className="lead">Your form was submitted successfully. Thanks for taking the time to reach out.</p>
      <div className="success-actions">
        <Link className="button primary" to="/">Back to home <span aria-hidden="true">→</span></Link>
        <button className="button secondary" onClick={() => navigate('/contact')}>Send another message</button>
      </div>
    </section>
  )
}

function NotFound() {
  return <section className="page-card"><p className="eyebrow">404 · PAGE NOT FOUND</p><h1>That page doesn’t exist.</h1><Link className="button primary" to="/">Go home</Link></section>
}

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="site-footer"><span>© 2026 My Mini Site</span><span>Made with React + React Router</span></footer>
    </div>
  )
}