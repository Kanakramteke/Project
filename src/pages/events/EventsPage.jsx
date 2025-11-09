import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CreateModal from '../create/CreateModal'
import axios from 'axios'

function Icon({ children, src }){
  if (src) {
    return <img src={src} alt="logo" className="w-20 h-20 rounded-lg object-cover shadow-md" />; // Increased size to 20x20
  }
  return (
    <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center text-white font-bold shadow-md text-base">{children}</div>
  );
}

const technicalEvents = [
  {
    id: 1,
    name: "Tech Hackathon 2025",
    headline: "24 Hours of Innovation & Code",
    date: "Nov 15, 2025",
    venue: "Auditorium Hall A",
    college: "VNIT Nagpur",
    image: "/tech hackathon.jpg",
    description: "Join us for an exciting 24-hour coding challenge where innovation meets technology.",
    fullDescription: "Get ready for the most exciting 24-hour coding marathon of the year! Tech Hackathon 2025 brings together brilliant minds from across Nagpur to solve real-world problems using cutting-edge technology. Compete for amazing prizes, network with industry experts, and showcase your coding skills. Whether you're into AI, Web Development, or Mobile Apps, there's a track for everyone.",
    organizer: "Dr. Rajesh Kumar",
    contact: "+91 98765 43210",
    email: "rajesh.kumar@vnit.ac.in",
    prizePool: "₹1,00,000",
    participationType: "Team",
    maxTeamMembers: 4,
    registrationFee: "₹499"
  },
  {
    id: 2,
    name: "AI & ML Workshop",
    headline: "Master the Future of Technology",
    date: "Nov 20, 2025",
    venue: "Computer Lab 301",
    college: "YCCE Nagpur",
    image: "/aiml.jpg",
    description: "Learn the fundamentals of Artificial Intelligence and Machine Learning from industry experts.",
    fullDescription: "Dive deep into the world of Artificial Intelligence and Machine Learning in this comprehensive hands-on workshop. Learn about neural networks, deep learning, and practical applications of AI. This workshop includes live coding sessions, real-world case studies, and interactive Q&A with industry professionals. Perfect for students looking to build a career in AI/ML.",
    organizer: "Prof. Sneha Sharma",
    contact: "+91 98234 56789",
    email: "sneha.sharma@ycce.edu",
    prizePool: "Certificates & Goodies",
    participationType: "Individual",
    maxTeamMembers: 1,
    registrationFee: "₹299"
  },
  {
    id: 3,
    name: "Web Development Bootcamp",
    date: "Nov 25, 2025",
    venue: "Tech Center",
    college: "PCE Nagpur",
    image: "/web.webp",
    description: "Master modern web technologies with React, Node.js, and cloud deployment.",
    fullDescription: "Transform your web development skills in this intensive 3-day bootcamp. Learn the latest technologies including React, Node.js, Express, MongoDB, and cloud deployment with AWS. Build real-world projects, understand best practices, and get career guidance from experienced developers. By the end of this bootcamp, you'll have a portfolio-ready project and in-demand skills.",
    organizer: "Mr. Amit Deshmukh",
    contact: "+91 97654 32109",
    email: "amit.deshmukh@pce.ac.in",
    prizePool: "Best Project: ₹25,000",
    participationType: "Individual",
    maxTeamMembers: 1,
    registrationFee: "₹399"
  },
  {
    id: 4,
    name: "Business Case Competition",
    date: "Dec 1, 2025",
    venue: "Main Campus",
    college: "RCOEM Nagpur",
    image: "/business.jpg",
    description: "Solve real-world business challenges and compete for prizes worth ₹50,000.",
    fullDescription: "Put your business acumen to the test! Analyze real-world business scenarios, develop strategic solutions, and present your case to a panel of industry experts and successful entrepreneurs. This competition covers areas like marketing strategy, financial analysis, operations management, and innovative business models. Teams will compete through multiple rounds including case analysis, presentation, and Q&A sessions. Winners receive cash prizes, mentorship opportunities, and potential internship offers from leading companies.",
    organizer: "Dr. Priya Joshi",
    contact: "+91 99887 66554",
    email: "priya.joshi@rcoem.ac.in",
    prizePool: "₹50,000",
    participationType: "Team",
    maxTeamMembers: 3,
    registrationFee: "₹599"
  },
  {
    id: 5,
    name: "Robotics Competition",
    date: "Dec 5, 2025",
    venue: "Engineering Block",
    college: "GH Raisoni Nagpur",
    image: "/rorbotics.jpeg",
    description: "Build and compete with autonomous robots in challenging obstacle courses.",
    fullDescription: "Bring your robotics dreams to life! Design, build, and program autonomous robots to navigate complex obstacle courses. This competition tests your mechanical design, programming skills, and problem-solving abilities. Categories include line following, maze solving, and custom challenges. Great opportunity to learn hardware-software integration and work with sensors and actuators.",
    organizer: "Prof. Vikram Patil",
    contact: "+91 98123 45678",
    email: "vikram.patil@ghrce.edu",
    prizePool: "₹75,000",
    participationType: "Team",
    maxTeamMembers: 5,
    registrationFee: "₹699"
  },
  {
    id: 6,
    name: "Cybersecurity Seminar",
    date: "Dec 10, 2025",
    venue: "Conference Room",
    college: "KDKCE Nagpur",
    image: "/cyber.jpg",
    description: "Explore ethical hacking, network security, and latest cybersecurity trends.",
    fullDescription: "In today's digital age, cybersecurity is more important than ever. Learn about ethical hacking, penetration testing, network security, and how to protect systems from cyber threats. This seminar features demonstrations of common vulnerabilities, hands-on exercises in a safe lab environment, and insights from cybersecurity professionals. Understand career paths in cybersecurity and certifications worth pursuing.",
    organizer: "Mr. Sanjay Mehta",
    contact: "+91 96543 21087",
    email: "sanjay.mehta@kdkce.edu",
    prizePool: "Participation Certificates",
    participationType: "Individual",
    maxTeamMembers: 1,
    registrationFee: "₹199"
  },
]

const culturalEvents = [
  {
    id: 7,
    name: "Cultural Fest 2025",
    headline: "Celebrate Diversity, Unity, and Creativity",
    date: "Nov 18, 2025",
    venue: "Open Air Theatre",
    college: "VNIT Nagpur",
    image: "/cultural fest.jpeg",
    description: "A vibrant celebration of music, dance, drama, and art from diverse cultures.",
    fullDescription: "Experience the biggest cultural extravaganza of the year! Cultural Fest 2025 showcases the rich diversity of Indian and international cultures through performances, exhibitions, and interactive sessions. Enjoy live music concerts, traditional and contemporary dance performances, theater productions, fashion shows, and art exhibitions. Food stalls from different regions will tantalize your taste buds. Don't miss this celebration of creativity and culture!",
    organizer: "Ms. Kavita Rao",
    contact: "+91 98765 12345",
    email: "kavita.rao@vnit.ac.in",
    prizePool: "₹1,50,000",
    participationType: "Team",
    maxTeamMembers: 10,
    registrationFee: "₹799"
  },
  {
    id: 8,
    name: "Music Night",
    headline: "An Evening Under the Stars",
    date: "Nov 22, 2025",
    venue: "Central Lawn",
    college: "LAD College Nagpur",
    image: "/music.jpeg",
    description: "An enchanting evening featuring live bands, solo performances, and musical collaborations.",
    fullDescription: "Get ready for an unforgettable musical journey under the stars! Music Night features performances by talented student bands, solo artists, and special guest musicians. From classical Indian music to rock, jazz, and fusion - experience a diverse range of musical genres. Open mic sessions give aspiring musicians a chance to shine. Food trucks and comfortable seating make this the perfect evening event.",
    organizer: "Mrs. Anjali Verma",
    contact: "+91 97654 32100",
    email: "anjali.verma@ladcollege.edu",
    prizePool: "₹30,000",
    participationType: "Individual/Team",
    maxTeamMembers: 6,
    registrationFee: "₹249"
  },
  // ... add more cultural events as in original
]

export default function EventsPage({ userName, onNavigate, onCommunityCreated }) {
  const [activeTab, setActiveTab] = useState('technical')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [showPayment, setShowPayment] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    collegeName: '',
    teamMembers: [],
    paymentMode: 'UPI'
  })
  const [paymentDetails, setPaymentDetails] = useState({
    upiId: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    accountNumber: '',
    ifscCode: ''
  })

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const handleCloseDetails = () => {
    setSelectedEvent(null)
  }

  const handleRegister = () => {
    setShowPayment(true)
  }

  const handleFormChange = (e) => {
    const { name, value } = e.target
    if (name === 'teamMembers') {
      setFormData({ ...formData, [name]: value.split(',').map(m => m.trim()) })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handlePaymentDetailsChange = (e) => {
    const { name, value } = e.target
    setPaymentDetails({ ...paymentDetails, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const registrationData = {
      name: formData.name,
      email: formData.email,
      contact: formData.contact,
      collegeName: formData.collegeName,
      teamMembers: formData.teamMembers,
      paymentMode: formData.paymentMode
    }

    try {
      const response = await axios.post('http://localhost:5000/api/registrations/register', registrationData)
      if (response.data.success) {
        setShowSuccess(true)
        setShowPayment(false)
        // Reset form
        setFormData({
          name: '',
          email: '',
          contact: '',
          collegeName: '',
          teamMembers: [],
          paymentMode: 'UPI'
        })
        setPaymentDetails({
          upiId: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          accountNumber: '',
          ifscCode: ''
        })
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    setSelectedEvent(null)
  }

  const handleEventCreated = (newEvent) => {
    // Handle new event creation if needed
    console.log('New event created:', newEvent)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Icon src="/images/logo.png">CC</Icon>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Events</h1>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('landing')}
              className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Back to Landing
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-shadow"
            >
              Create
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('technical')}
            className={`px-6 py-3 font-semibold ${
              activeTab === 'technical'
                ? 'border-b-2 border-cyan-500 text-cyan-500'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Technical Events
          </button>
          <button
            onClick={() => setActiveTab('cultural')}
            className={`px-6 py-3 font-semibold ${
              activeTab === 'cultural'
                ? 'border-b-2 border-purple-500 text-purple-500'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Cultural Events
          </button>
        </div>

        {/* Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {(activeTab === 'technical' ? technicalEvents : culturalEvents).map(event => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => handleEventClick(event)}
            >
              <img 
                src={event.image} 
                alt={event.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{event.name}</h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">{event.description}</p>
                <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                  <span>{event.date}</span>
                  <span>{event.college}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseDetails}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              <div className="relative">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.name}
                  className="w-full h-64 object-cover rounded-t-2xl"
                />
                <button 
                  onClick={handleCloseDetails}
                  className="absolute top-4 right-4 bg-white/80 dark:bg-slate-800/80 rounded-full p-2 shadow-md"
                >
                  ✕
                </button>
              </div>
              <div className="p-8">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{selectedEvent.name}</h2>
                <p className="text-xl text-slate-600 dark:text-slate-300 mb-6">{selectedEvent.headline}</p>
                
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Date</p>
                    <p className="font-semibold">{selectedEvent.date}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Venue</p>
                    <p className="font-semibold">{selectedEvent.venue}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Organizer</p>
                    <p className="font-semibold">{selectedEvent.organizer}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Contact</p>
                    <p className="font-semibold">{selectedEvent.contact}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
                    <p className="font-semibold">{selectedEvent.email}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Prize Pool</p>
                    <p className="font-semibold">{selectedEvent.prizePool}</p>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 mb-8">{selectedEvent.fullDescription}</p>

                <button 
                  onClick={handleRegister}
                  className="w-full px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all"
                >
                  Register Now - {selectedEvent.registrationFee}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPayment(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-slate-800 rounded-2xl max-w-lg w-full p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Event Registration</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Fields */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Contact Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleFormChange}
                    required
                    pattern="[0-9]{10}"
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Enter 10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    College Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                    placeholder="Enter your college name"
                  />
                </div>
                {selectedEvent.participationType === 'Team' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                      Team Members <span className="text-red-500">*</span>
                      <span className="text-xs text-slate-500 ml-2">(Comma separated, max {selectedEvent.maxTeamMembers - 1} members)</span>
                    </label>
                    <input
                      type="text"
                      name="teamMembers"
                      value={formData.teamMembers.join(', ')}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="Member1, Member2, Member3"
                    />
                  </div>
                )}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Payment Mode <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="paymentMode"
                    value={formData.paymentMode}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors bg-white"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Net Banking">Net Banking</option>
                  </select>
                </div>

                {/* UPI Payment */}
                {formData.paymentMode === 'UPI' && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      UPI ID <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="upiId"
                      value={paymentDetails.upiId}
                      onChange={handlePaymentDetailsChange}
                      required
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                      placeholder="yourupi@bank"
                    />
                  </div>
                )}

                {/* Card Payment */}
                {(formData.paymentMode === 'Credit Card' || formData.paymentMode === 'Debit Card') && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={paymentDetails.cardNumber}
                        onChange={handlePaymentDetailsChange}
                        required
                        maxLength="16"
                        pattern="[0-9]{16}"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={paymentDetails.expiryDate}
                          onChange={handlePaymentDetailsChange}
                          required
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          name="cvv"
                          value={paymentDetails.cvv}
                          onChange={handlePaymentDetailsChange}
                          required
                          maxLength="3"
                          pattern="[0-9]{3}"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking Payment */}
                {formData.paymentMode === 'Net Banking' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Select Your Bank <span className="text-red-500">*</span>
                      </label>
                      <select
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors bg-white"
                      >
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                        <option value="bob">Bank of Baroda</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Account Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={paymentDetails.accountNumber}
                        onChange={handlePaymentDetailsChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="Enter account number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        IFSC Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={paymentDetails.ifscCode}
                        onChange={handlePaymentDetailsChange}
                        required
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                        placeholder="Enter IFSC code"
                      />
                    </div>
                  </div>
                )}

                {/* Amount */}
                <div className="bg-gradient-to-r from-cyan-50 to-purple-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-slate-600 mb-1">Registration Fee</p>
                  <p className="text-3xl font-bold text-slate-800">{selectedEvent.registrationFee}</p>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all"
                  >
                    Pay Now
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowPayment(false)}
                    className="px-8 py-4 rounded-xl font-bold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={handleSuccessClose}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full flex items-center justify-center"
              >
                <span className="text-5xl">✓</span>
              </motion.div>
              
              <h2 className="text-3xl font-bold text-slate-800 mb-3">Registered Successfully!</h2>
              <p className="text-slate-600 mb-6">
                Your registration for <span className="font-semibold">{selectedEvent?.name}</span> has been confirmed.
              </p>
              
              <div className="bg-slate-50 rounded-xl p-4 mb-6 text-left">
                <p className="text-sm text-slate-600 mb-2">
                  <span className="font-semibold">Registration ID:</span> REG{Date.now().toString().slice(-8)}
                </p>
                <p className="text-sm text-slate-600">
                  A confirmation email has been sent to <span className="font-semibold">{formData.email}</span>
                </p>
              </div>

              <button
                onClick={handleSuccessClose}
                className="w-full px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Modal */}
      <CreateModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onEventCreated={handleEventCreated}
        onCommunityCreated={onCommunityCreated}
      />
    </div>
  )
}