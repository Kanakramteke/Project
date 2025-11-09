import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CreateModal from '../create/CreateModal'
import TeamsPage from '../teams/TeamsPage'
import ProfilePage from '../profile/ProfilePage';
import CalendarPage from '../calendar/CalendarPage';

export default function LandingPage({ onNavigate, onCommunityCreated }){
  const [menuOpen, setMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const [headerHeight, setHeaderHeight] = useState(64)

  useEffect(() => {
    function updateHeight() {
      if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showTeamsModal, setShowTeamsModal] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [userName, setUserName] = useState('');

  const quickNav = [
    { id: 'events', label: 'Events', onClick: () => onNavigate && onNavigate('events') },
    { id: 'communities', label: 'Communities', onClick: () => onNavigate && onNavigate('communities') },
    { id: 'discussions', label: 'Discussions', onClick: () => onNavigate && onNavigate('discussions') },
    { id: 'form-teams', label: 'Form Teams', onClick: () => setShowTeamsModal(true) },
   
  ]

  function Icon({ children, src }){
    if (src) {
      return <img src={src} alt="logo" className="w-20 h-20 rounded-lg object-cover shadow-md" /> // Increased size to 20x20
    }
    return (
      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-bold shadow-md text-base">{children}</div>
    )
  }
  const cards = [
    {
      key: 'events',
      title: 'Events',
      img: '/events.jpg',
      desc: 'Explore upcoming hackathons, mentorship drives, and innovation challenges. Your next big idea might begin at one of these events!',
      onClick: () => onNavigate && onNavigate('events'),
    },
    {
      key: 'communities',
      title: 'Communities',
      img: '/communities.jpg',
      desc: 'Communities bring together students who share the same passion — whether it’s art, nature, tech, studies, or sports. Join a group that inspires you, collaborate on ideas, and grow with people who dream the same way you do.',
      onClick: () => onNavigate && onNavigate('communities'),
    },
    {
      key: 'discussions',
      title: 'Discussions',
      img: '/discussion.webp',
      desc: 'Engage in meaningful conversations, share your thoughts, and learn from others in the community.',
      onClick: () => onNavigate && onNavigate('discussions'),
    },
    {
      key: 'form-teams',
      title: 'Form Teams',
      img: '/teams.jpg',
      desc: 'Build teams that think, create, and innovate together. From brainstorming concepts to completing projects — teamwork turns imagination into achievement.',
      onClick: () => setShowTeamsModal(true),
    },
  ]

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    if (lowerCaseQuery.includes('events')) {
      onNavigate && onNavigate('events');
    } else if (lowerCaseQuery.includes('communities')) {
      onNavigate && onNavigate('communities');
    } else if (lowerCaseQuery.includes('discussions')) {
      onNavigate && onNavigate('discussions');
    } else if (lowerCaseQuery.includes('teams')) {
      onNavigate && onNavigate('form-teams');
    } else {
      alert('No matching page found. Please search for Events, Communities, Discussions, or Teams.');
    }
  };

  function handleSaveDetails(name) {
    setUserName(name);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECE4D7' }}>
      <header ref={headerRef} className="sticky top-0 z-40" style={{ backgroundColor: '#EBE2DB' }}> {/* Header with minimal padding */}
        <div className="max-w-full px-6 py-1 md:py-2 flex items-center justify-between border-b-4 border-black backdrop-blur"> {/* Minimal padding to decrease space further */}
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate && onNavigate('landing')}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <Icon src="/images/logo.png" />
              <span className="font-extrabold text-3xl md:text-4xl text-slate-900">CampusConnect</span>
            </button>
          </div>

          {/* Right: Navigation Buttons, Quick Nav and Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-4">
              <div className="hidden lg:flex items-center gap-3">
                {quickNav.map((n) => (
                  <button
                    key={n.id}
                    onClick={n.onClick}
                    className={`px-5 py-2.5 rounded-lg font-bold text-base transition-colors ${n.id === 'events' ? 'bg-cyan-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                  >
                    {n.label}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors" title="Wishlist">
              <span className="text-2xl">❤️</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors" title="Notifications">
              <span className="text-2xl">🔔</span>
            </button>
            <div className="relative">
              <button onClick={()=>setMenuOpen(v=>!v)} className="w-14 h-14 rounded-full bg-slate-300 grid place-items-center hover:bg-slate-400 transition-colors">
                <span className="text-2xl font-bold text-slate-700">{userName?.[0] || 'U'}</span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} exit={{opacity:0, y:8}} className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow ring-1 ring-slate-200 p-2">
                    <a onClick={() => { setShowProfileModal(true); setMenuOpen(false); }} className="block px-3 py-2 rounded-lg hover:bg-slate-50">My Profile</a>
                    <a className="block px-3 py-2 rounded-lg hover:bg-slate-50">Logout</a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Removed the motivational text section */}

      {/* Adjusted the search bar to be perfectly centered on the page. */}
      <div className="flex flex-col justify-center items-center h-3/4"> {/* Adjusted layout for text and image */}
        <div className="flex justify-between items-center h-3/4 px-16 mt-10"> {/* Adjusted padding to move text further to the right */}
          <div className="text-left w-1/2 md:pl-[30%]"> {/* Increased padding-left to shift text */}
            <h2 className="text-6xl font-extrabold text-slate-800">Discover. Connect. Innovate.</h2> {/* Single line for the main text */}
            <p className="text-2xl font-bold text-slate-600">From idea to impact — together. Think. Build. Belong.</p> {/* Subtext remains the same */}
          </div>
          <div className="flex justify-end w-[70%]"> {/* Adjusted the width of the container */}
            <div className="w-[600px] h-[350px] bg-gray-200 rounded-2xl"> {/* Increased the size of the image */}
              <img src="/images/clg.jpg" alt="College" className="w-full h-full object-cover rounded-2xl" />
            </div>
          </div>
        </div>
        <div className="relative max-w-5xl w-full mx-auto mt-10 flex justify-center"> {/* Centered the search bar */}
          <input 
            type="text" 
            className="w-full rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 pl-16 pr-6 py-6 text-xl focus:outline-none focus:ring-2 focus:ring-primary" 
            placeholder="Search..." 
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e.target.value);
              }
            }}
          />
          <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl text-slate-400">🔍</span>
        </div>
      </div>

      <main className="max-w-full mx-auto px-6 py-10 md:pl-80">
        <div className="flex gap-4">
          {/* Left Sidebar - fixed to extreme left on md+ */}
          <aside
            className="hidden md:block fixed left-0 w-80"
            style={{ top: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)`, backgroundColor: '#F8F3EA' }}
          >
            <div className="shadow-lg p-4 h-full overflow-auto">
              <nav className="space-y-2">
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3"
                >
                  <span className="text-xl">➕</span>
                  <span>Create</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3">
                  <span className="text-xl">📊</span>
                  <span>Your Activity</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3">
                  <span className="text-xl">📅</span>
                  <span>Calendar</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3">
                  <span className="text-xl">🔍</span>
                  <span>Discover</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3">
                  <span className="text-xl">💾</span>
                  <span>Saved Items</span>
                </button>
                <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-100 font-semibold text-slate-700 transition-colors flex items-center gap-3">
                  <span className="text-xl">❓</span>
                  <span>Help/Support</span>
                </button>
              </nav>
            </div>
          </aside>

          {/* Main content area - push by sidebar on md+ */}
          <div className="flex-1">
            {/* Quick Navigation - visible only on mobile and tablet */}
            <div className="block md:hidden mb-4">
              {quickNav.map((n) => (
                <button
                  key={n.id}
                  onClick={n.onClick}
                  className={`w-full px-4 py-2 rounded-md text-base transition-colors font-medium ${n.id === 'events' ? 'bg-cyan-600 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-800'}`}
                >
                  {n.label}
                </button>
              ))}
            </div>

            {/* Cards Section - Discover and Join */}
            <section className="px-6 pb-16 mt-10"> {/* Kept margin-top same */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                  <div
                    key={card.key}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow cursor-pointer relative"
                    onClick={card.onClick}
                    style={{ height: '450px' }}
                  >
                    <img src={card.img} alt={card.title} className="w-full h-60 object-cover" />
                    <div className="p-6 flex flex-col justify-between h-full">
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{card.title}</h3>
            <p className="text-sm text-slate-600">{card.desc}</p>
          </div>
          <div className="mt-8"></div>
        </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Create Modal used by sidebar */}
      <CreateModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEventCreated={(ev) => {
          alert('Event published successfully!');
          setShowCreateModal(false);
        }}
        onCommunityCreated={(c) => {
          if (onCommunityCreated) onCommunityCreated(c);
          setShowCreateModal(false);
        }}
      />

      {/* Teams Modal */}
      <AnimatePresence>
        {showTeamsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4 py-8"
            onClick={() => setShowTeamsModal(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-4xl max-h-[85vh] rounded-2xl bg-white shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <TeamsPage />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowProfileModal(false);
            }}
          >
            <motion.div
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 20, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl max-h-[500px] rounded-xl bg-white dark:bg-slate-900 shadow-2xl ring-1 ring-slate-200 dark:ring-slate-700 p-6 overflow-auto"
            >
              <ProfilePage onNameChange={handleSaveDetails} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}