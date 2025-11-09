import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CreateModal from '../create/CreateModal';

function Icon({ children, src }) {
  if (src) {
    return <img src={src} alt="logo" className="w-20 h-20 rounded-lg object-cover shadow-md" />; // Increased size to 20x20
  }
  return (
    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-bold shadow-md text-base">{children}</div>
  );
}

const defaultCommunities = [
  {
    id: 'c1',
    name: 'AI Innovators Club',
    headline: 'Exploring AI ideas & projects',
    description: 'Hands-on AI projects, reading groups, and hack nights.',
    fullDescription: 'AI Innovators Club brings students together to learn machine learning, run study groups, host workshops, and build projects. We welcome beginners and experienced members alike. Monthly meetups include talks, hands-on labs, and mentorship sessions.',
    members: 230,
  tags: ['AI', 'ML', 'Research'],
  // uploaded by user: innovators.jpeg
  image: '/images/ai club.webp',
    organizer: 'Prof. Sneha Sharma',
    contact: '+91 98234 56789',
    email: 'ai@college.edu',
    joinType: 'Open'
  },
  {
    id: 'c2',
    name: 'Robotics Club',
    headline: 'Robots, hardware & competitions',
    description: 'Build robots for competitions and learning hardware-software integration.',
    fullDescription: 'Robotics Club focuses on building autonomous robots, participating in national competitions, and learning embedded systems. Workshops cover sensors, microcontrollers, and control algorithms.',
    members: 180,
  tags: ['Robotics', 'Hardware', 'Competitions'],
  // uploaded by user: robotics club.jpeg
  image: '/images/robo.webp',
    organizer: 'Prof. Vikram Patil',
    contact: '+91 98123 45678',
    email: 'robotics@college.edu',
    joinType: 'Approval'
  },
  {
    id: 'c3',
    name: 'Design & UX Studio',
    headline: 'Design thinking and prototyping',
    description: 'Workshops on UI/UX, prototyping, and portfolio building.',
    fullDescription: 'Design & UX Studio runs practical workshops on user research, wireframing, and prototyping. Collaborate with product teams and get portfolio feedback.',
    members: 95,
  tags: ['Design', 'UX', 'Product'],
  // uploaded by user: studio.jpg
  image: '/images/studio.jpg',
    organizer: 'Ms. Kavita Rao',
    contact: '+91 98765 12345',
    email: 'design@college.edu',
    joinType: 'Open'
  },
  {
    id: 'c4',
    name: 'Entrepreneurs Network',
    headline: 'Startup ideas & mentorship',
    description: 'Pitch nights, mentorship, and startup collaboration.',
    fullDescription: 'Entrepreneurs Network connects student founders, mentors, and investors through pitch nights, incubation support, and workshops on business modeling and fundraising.',
    members: 310,
  tags: ['Startup', 'Business', 'Mentorship'],
  // uploaded by user: entrepreneur.png
  image: '/entrepreneur.png',
    organizer: 'Dr. Priya Joshi',
    contact: '+91 99887 66554',
    email: 'startup@college.edu',
    joinType: 'Approval'
  },
  {
    id: 'c5',
    name: 'Literary & Arts Circle',
    headline: 'Poetry, theater and creative arts',
    description: 'Events, open mics, and exhibitions for creative students.',
    fullDescription: 'Literary & Arts Circle organizes poetry slams, theatre productions, and art exhibitions. We welcome artists from all disciplines to collaborate and showcase work.',
    members: 140,
  tags: ['Arts', 'Theatre', 'Poetry'],
  // uploaded by user: literary and art.jpeg
  image: '/images/art.jpg',
    organizer: 'Ms. Meera Deshpande',
    contact: '+91 98123 98765',
    email: 'arts@college.edu',
    joinType: 'Open'
  },
  {
    id: 'c6',
    name: 'Environment Action Group',
    headline: 'Sustainability and green projects',
    description: 'Tree drives, awareness campaigns, and sustainability projects.',
    fullDescription: 'Environment Action Group focuses on sustainable campus initiatives, tree plantation drives, and environmental research projects. Join to make a tangible impact.',
    members: 75,
  tags: ['Environment', 'Sustainability'],
  // uploaded by user: environement.jpeg
  image: '/images/eclub.webp',
    organizer: 'Mr. Rohan Kulkarni',
    contact: '+91 97654 23456',
    email: 'env@college.edu',
    joinType: 'Open'
  }
]

export default function CommunitiesPage({ userName, onNavigate, createdCommunities = [] }) {
  const [selectedCommunity, setSelectedCommunity] = useState(null)
  const [joined, setJoined] = useState({}) // track joined community ids
  const [requestSent, setRequestSent] = useState({})
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const all = [...createdCommunities, ...defaultCommunities]

  const filteredCommunities = all
    .filter((community) =>
      community.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aMatch = a.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      const bMatch = b.name.toLowerCase().startsWith(searchQuery.toLowerCase());
      return bMatch - aMatch;
    });

  const handleJoin = (community) => {
    if (community.joinType === 'Approval') {
      // simulate request sent
      setRequestSent(prev => ({ ...prev, [community.id]: true }))
      // show modal message
      alert('Your request has been sent. You’ll be notified once approved.')
    } else {
      setJoined(prev => ({ ...prev, [community.id]: true }))
      alert('You have joined the community.')
    }
  }

  const quickNav = [
    { id: 'events', label: 'Events', onClick: () => onNavigate && onNavigate('events') },
    { id: 'communities', label: 'Communities', onClick: () => onNavigate && onNavigate('communities') },
    { id: 'discussions', label: 'Discussions', onClick: () => onNavigate && onNavigate('discussions') },
    { id: 'teams', label: 'Form Teams', onClick: () => onNavigate && onNavigate('teams') },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#ECE4D7' }}>
      {/* Top Navigation */}
      <nav className="sticky top-0 z-40" style={{ backgroundColor: '#EBE2DB' }}>
        <div className="max-w-full px-6 py-2 md:py-3 flex items-center justify-between border-b-4 border-black backdrop-blur">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onNavigate && onNavigate('landing')}
              className="mr-2 p-0.5 rounded-lg hover:bg-slate-100 transition-colors"
              title="Back to Home"
            >
              <span className="text-2xl">←</span>
            </button>
            <button 
              onClick={() => onNavigate && onNavigate('landing')}
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <Icon src="/images/logo.png" />
              <span className="font-extrabold text-2xl md:text-3xl text-slate-900">CampusConnect</span>
            </button>
          </div>

          {/* Right: Navigation Buttons, Create Button, and Profile */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3">
              {quickNav.map((n) => (
                <button
                  key={n.id}
                  onClick={n.onClick}
                  className={`px-5 py-2.5 rounded-lg font-bold text-base transition-colors ${n.id === 'communities' ? 'bg-cyan-500 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}`}
                >
                  {n.label}
                </button>
              ))}
            </div>
            <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors" title="Wishlist">
              <span className="text-2xl">❤️</span>
            </button>
            <button className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors" title="Notifications">
              <span className="text-2xl">🔔</span>
            </button>
            <div className="relative">
              <button onClick={() => setMenuOpen((v) => !v)} className="w-14 h-14 rounded-full bg-slate-300 grid place-items-center hover:bg-slate-400 transition-colors">
                <span className="text-2xl font-bold text-slate-700">{userName?.[0] || 'U'}</span>
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow ring-1 ring-slate-200 p-2">
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

      {/* Main Content with Sidebar */}
      <div className="flex gap-6">
        {/* Left Sidebar Panel - Full Length */}
        <aside className="w-80 flex-shrink-0" style={{ backgroundColor: '#F8F3EA' }}>
          <div className="shadow-lg p-4 min-h-screen">
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

        {/* Right Content Area */}
        <div className="flex-1">
          <section className="px-6 pt-8 pb-4">
            <div className="max-w-5xl mx-auto">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">Communities</h1>
              <p className="text-lg text-slate-600">Explore and join communities that match your interests</p>
            </div>
          </section>

          {/* Search Bar Section */}
          <section className="px-6 py-4">
            <div className="relative max-w-5xl mx-auto">
              <input 
                type="text" 
                className="w-full rounded-3xl bg-white shadow-xl ring-1 ring-slate-200 pl-16 pr-6 py-6 text-xl focus:outline-none focus:ring-2 focus:ring-primary" 
                placeholder="Search communities..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl text-slate-400">🔍</span>
            </div>
          </section>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.length > 0 ? (
              filteredCommunities.slice(0, 6).map((c) => (
                <motion.div key={c.id} whileHover={{ scale: 1.02 }} className="bg-white rounded-xl shadow p-4 cursor-pointer" onClick={() => setSelectedCommunity(c)}>
                  <div className="h-64 w-full overflow-hidden rounded-md mb-3 bg-slate-100">
                    <img 
                      src={c.image} 
                      alt={c.name} 
                      className="w-full h-64 object-cover" 
                      style={{ filter: 'none', transform: 'none' }} 
                    />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{c.name}</h3>
                  <p className="text-sm text-slate-600 truncate mt-1">{c.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-slate-600 text-sm">
                    <span>👥 {c.members}</span>
                    <div className="flex gap-2 flex-wrap">
                      {c.tags.slice(0,3).map(t => (
                        <span key={t} className="text-xs bg-slate-100 px-2 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <button onClick={(e)=>{e.stopPropagation(); setSelectedCommunity(c)}} className="px-4 py-2 rounded-xl bg-cyan-500 text-white font-semibold">View Details</button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-slate-600 text-lg font-semibold">No such community found</div>
            )}
          </div>
        </div>
      </div>

      {/* Create Modal */}
      <CreateModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />

      <AnimatePresence>
        {selectedCommunity && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setSelectedCommunity(null)}>
            <motion.div initial={{ y: 20, scale: 0.98 }} animate={{ y:0, scale:1 }} exit={{ y:20, scale:0.98 }} className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e)=>e.stopPropagation()}>
              <div className="relative h-48">
                <img src={selectedCommunity.image} alt={selectedCommunity.name} className="w-full h-full object-cover rounded-t-2xl" />
                <div className="absolute left-6 bottom-4 bg-white/80 px-4 py-2 rounded-xl">
                  <h2 className="font-bold text-lg">{selectedCommunity.name}</h2>
                  {selectedCommunity.headline && <p className="text-sm text-slate-700">{selectedCommunity.headline}</p>}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-base font-semibold text-slate-800 mb-2">About</h3>
                <p className="text-slate-600 mb-4 leading-relaxed">{selectedCommunity.fullDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-500 uppercase">Organizer</p>
                    <p className="font-semibold text-slate-800">{selectedCommunity.organizer}</p>
                    <p className="text-sm text-slate-600">{selectedCommunity.contact}</p>
                    <p className="text-sm text-slate-600 break-all">{selectedCommunity.email}</p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4">
                    <p className="text-xs text-slate-500 uppercase">Members</p>
                    <p className="font-semibold text-slate-800">{selectedCommunity.members} members</p>
                    <p className="text-xs text-slate-500 mt-2">Tags</p>
                    <div className="flex gap-2 flex-wrap mt-2">{selectedCommunity.tags.map(t => <span key={t} className="text-xs bg-slate-100 px-2 py-1 rounded-full">{t}</span>)}</div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Rules & Guidelines</h4>
                  <ul className="list-disc list-inside text-slate-600">
                    <li>Be respectful and constructive.</li>
                    <li>Share relevant content and help others learn.</li>
                    <li>No spam or self-promotion without permission.</li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => handleJoin(selectedCommunity)} className="flex-1 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500">Join Community</button>
                  <button onClick={()=>alert('Following updates — you\'ll receive notifications.')} className="px-5 py-3 rounded-lg font-bold text-slate-700 bg-slate-100">Follow Updates</button>
                  <button onClick={()=>{ setRequestSent(prev=>({ ...prev, [selectedCommunity.id]: true })); alert('Your request has been sent. You’ll be notified once approved.') }} className="px-5 py-3 rounded-lg font-bold text-slate-700 bg-slate-100">Request to Join</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
