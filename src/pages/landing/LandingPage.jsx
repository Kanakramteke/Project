import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Icon({ children, src }){
  if (src) {
    return <img src={src} alt="logo" className="w-10 h-10 rounded-lg object-cover shadow-md" />
  }
  return (
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-bold shadow-md text-base">{children}</div>
  )
}

function NavIcon({ children, label }){
  return (
    <button title={label} aria-label={label} className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-lg">
      {children}
    </button>
  )
}

const quickLink = (label, icon) => (
  <button className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 hover:shadow md:text-sm">
    <span className="text-lg">{icon}</span>
    <span className="font-semibold text-slate-700">{label}</span>
  </button>
)

const Card = ({ title, color, children, ctaLabel }) => (
  <div className="rounded-2xl bg-white shadow-md ring-1 ring-slate-200 p-5 flex flex-col">
    <div className="flex items-center justify-between mb-3">
      <h3 className="font-bold text-slate-900">{title}</h3>
      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
    </div>
    <div className="text-slate-600 flex-1">{children}</div>
    {ctaLabel && (
      <div className="mt-4">
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-white shadow" style={{ backgroundColor: color }}>
          {ctaLabel}
        </button>
      </div>
    )}
  </div>
)

export default function LandingPage({ userName }){
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen">
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <Icon src="/logo.png">CC</Icon>
            <span className="font-extrabold text-xl text-slate-900">CampusConnect</span>
          </div>
          <div className="flex-1">
            <div className="relative">
              <input className="w-full md:w-2/3 lg:w-1/2 rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Search communities, events, or students…" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <NavIcon label="Home">🏠</NavIcon>
            <NavIcon label="Messages">💬</NavIcon>
            <NavIcon label="Communities">👥</NavIcon>
            <NavIcon label="Calendar">📅</NavIcon>
            <NavIcon label="Notifications">🔔</NavIcon>
            <div className="relative">
              <button onClick={()=>setMenuOpen(v=>!v)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200">
                <span className="w-8 h-8 rounded-full bg-slate-300 grid place-items-center">{userName?.[0] || 'U'}</span>
                <span className="font-semibold text-slate-700">{userName}</span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:8}} className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow ring-1 ring-slate-200 p-2">
                    <a className="block px-3 py-2 rounded-lg hover:bg-slate-50">My Profile</a>
                    <a className="block px-3 py-2 rounded-lg hover:bg-slate-50">Settings</a>
                    <a className="block px-3 py-2 rounded-lg hover:bg-slate-50">Logout</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-8">
        <div className="rounded-2xl bg-white shadow ring-1 ring-slate-200 p-6 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 text-white font-bold grid place-items-center text-2xl">{userName?.[0] || 'U'}</div>
          <div className="flex-1">
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Welcome back, {userName}!</h1>
            <p className="text-slate-600">Your campus world at a glance.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {quickLink('Edit Profile','✏️')}
              {quickLink('Your Activity','📈')}
              {quickLink('Your Communities','🎓')}
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card title="Join Communities" color="#4CAF50" ctaLabel="Join Now">
            <ul className="list-disc pl-4 space-y-1">
              <li>AI Innovators Club</li>
              <li>Hackathon Network</li>
              <li>Art Society</li>
            </ul>
          </Card>
          <Card title="Campus Calendar" color="#2196F3" ctaLabel="View Full Calendar">
            <ul className="space-y-1">
              <li>Fri 5: Robotics Meetup</li>
              <li>Sat 6: Design Workshop</li>
              <li>Tue 9: Alumni Talk</li>
            </ul>
          </Card>
          <Card title="Discover Students" color="#7C3AED" ctaLabel="Connect">
            <ul className="space-y-1">
              <li>Priya • AI/ML</li>
              <li>Rahul • Design</li>
              <li>Aisha • Web Dev</li>
            </ul>
          </Card>
          <Card title="Opportunities" color="#FF9800" ctaLabel="Explore">
            <ul className="space-y-1">
              <li>Internship: Campus Ambassador</li>
              <li>Grant: Student Innovation Fund</li>
              <li>Competition: Hack the Future</li>
            </ul>
          </Card>
        </div>
        {/* Side Panel */}
        <aside className="space-y-6">
          <div className="rounded-2xl bg-white shadow ring-1 ring-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-2">Trending discussions 💬</h3>
            <ul className="space-y-1 text-slate-600">
              <li>Best laptops for CS students?</li>
              <li>How to crack GSoC?</li>
              <li>Share your portfolio!</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white shadow ring-1 ring-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-2">Top mentors 🌟</h3>
            <ul className="space-y-1 text-slate-600">
              <li>Dr. Mehta — AI</li>
              <li>Ms. Kapoor — UX</li>
              <li>Mr. Iyer — Web</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-white shadow ring-1 ring-slate-200 p-5">
            <h3 className="font-bold text-slate-900 mb-2">Quick tips 💡</h3>
            <p className="text-slate-600">Join 2-3 clubs that match your goals. Show up, connect, and share!</p>
          </div>
        </aside>
      </section>
    </div>
  )
}
