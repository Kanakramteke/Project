import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

export default function CreateModal({ isOpen, onClose, onEventCreated, onCommunityCreated }) {
  const [step, setStep] = useState('select') // select, create-event, create-community, create-post, etc.
  const [eventType, setEventType] = useState('') // technical or cultural
  const [formData, setFormData] = useState({
    // Event Details
    eventTitle: '',
    eventHeadline: '', // Short catchy tagline for the card
    briefDescription: '', // What is event all about - shown on card
    eventDescription: '', // Full detailed description - shown in modal
    eventImage: null,
    eventImagePreview: '',
    category: 'technical', // technical or cultural
    
    // Timing & Location
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    eventMode: 'Offline', // Offline or Online
    venue: '',
    
    // Organizers & Contact
    organizedBy: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    
    // Registration Info
    registrationRequired: true,
    registrationDeadline: '',
    registrationLink: '',
    maxParticipants: '',
    registrationFee: '',
    
    // Extra Options
    tags: '',
    eligibility: 'Open for all',
    prizePool: '',
    participationType: 'Individual', // Individual or Team
    maxTeamMembers: '1'
    ,
    // Community specific fields
    communityName: '',
    communityHeadline: '',
    communityBrief: '',
    communityDescription: '',
    communityImage: null,
    communityImagePreview: '',
    joinType: 'Open', // Open or Approval
    membersLimit: '',
    communityTags: '',
    communityWebsite: ''
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Convert to base64 for persistent storage
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          eventImage: file,
          eventImagePreview: reader.result // base64 data URL
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleCommunityImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          communityImage: file,
          communityImagePreview: reader.result
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSelectOption = (option) => {
    setStep(option)
  }

  const handleEventTypeSelect = (type) => {
    setEventType(type)
    setFormData(prev => ({ ...prev, category: type }))
    setStep('create-event')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const payload = {
      type: formData.category === 'technical' ? 'Technical' : 'Cultural',
      title: formData.eventTitle,
      headline: formData.eventHeadline,
      about: formData.briefDescription,
      description: formData.eventDescription,
      poster: formData.eventImagePreview || '/events.jpg', // Send base64 or default
      startDate: new Date(formData.startDate).toISOString(),
      startTime: formData.startTime,
      endDate: new Date(formData.endDate).toISOString(),
      endTime: formData.endTime,
      mode: formData.eventMode,
      venue: formData.venue,
      organizedBy: formData.organizedBy,
      contactPerson: {
        name: formData.contactPerson,
        email: formData.contactEmail,
        number: formData.contactPhone
      },
      socialLink: formData.website,
      registrationDeadline: new Date(formData.registrationDeadline).toISOString(),
      registrationFee: parseFloat(formData.registrationFee) || 0,
      maxParticipants: parseInt(formData.maxParticipants) || 0,
      participantType: formData.participationType,
      prizePool: formData.prizePool || 'N/A',
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      eligibility: formData.eligibility
    }

    try {
      const res = await axios.post('http://localhost:5000/api/events', payload)
      if (res.data.success) {
        if (onEventCreated) {
          onEventCreated(res.data.event)
        }
        handleClose()
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Event creation failed')
    }
  }

  const handleCommunitySubmit = (e) => {
    e.preventDefault()

    const newCommunity = {
      id: Date.now(),
      name: formData.communityName || formData.organizedBy || 'Community',
      headline: formData.communityHeadline,
      description: formData.communityBrief,
      fullDescription: formData.communityDescription,
      image: formData.communityImagePreview || formData.eventImagePreview || '/communities.jpg',
      joinType: formData.joinType,
      membersLimit: formData.membersLimit,
      tags: formData.communityTags || formData.tags,
      website: formData.communityWebsite || formData.website,
      organizer: formData.contactPerson || formData.organizedBy,
      contact: formData.contactPhone,
      email: formData.contactEmail,
      isUserCreated: true
    }

    if (onCommunityCreated) {
      onCommunityCreated(newCommunity)
    }

    handleClose()
  }

  const handleClose = () => {
    // Reset form
    setFormData({
      eventTitle: '',
      eventHeadline: '',
      briefDescription: '',
      eventDescription: '',
      eventImage: null,
      eventImagePreview: '',
      category: 'technical',
      startDate: '',
      startTime: '',
      endDate: '',
      endTime: '',
      eventMode: 'Offline',
      venue: '',
      organizedBy: '',
      contactPerson: '',
      contactEmail: '',
      contactPhone: '',
      website: '',
      registrationRequired: true,
      registrationDeadline: '',
      registrationLink: '',
      maxParticipants: '',
      registrationFee: '',
      tags: '',
      eligibility: 'Open for all',
      prizePool: '',
      participationType: 'Individual',
      maxTeamMembers: '1',
      communityName: '',
      communityHeadline: '',
      communityBrief: '',
      communityDescription: '',
      communityImage: null,
      communityImagePreview: '',
      joinType: 'Open',
      membersLimit: '',
      communityTags: '',
      communityWebsite: ''
    })
    setStep('select')
    setEventType('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={e => e.stopPropagation()}
          className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          <div className="p-8">
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 bg-slate-100 dark:bg-slate-700 rounded-full p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              ✕
            </button>

            {step === 'select' && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Create Something New</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button 
                    onClick={() => handleSelectOption('create-event')}
                    className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/50 dark:to-cyan-800/50 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <div className="text-4xl mb-4">🎉</div>
                    <h3 className="text-xl font-bold mb-2">Create Event</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Organize technical or cultural events</p>
                  </button>
                  <button 
                    onClick={() => handleSelectOption('create-community')}
                    className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <div className="text-4xl mb-4">👥</div>
                    <h3 className="text-xl font-bold mb-2">Create Community</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Build groups around shared interests</p>
                  </button>
                  <button 
                    onClick={() => handleSelectOption('create-post')}
                    className="p-6 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/50 dark:to-pink-800/50 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <div className="text-4xl mb-4">✍️</div>
                    <h3 className="text-xl font-bold mb-2">Create Post</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-300">Share ideas and discussions</p>
                  </button>
                </div>
              </div>
            )}

            {step === 'create-event' && !eventType && (
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Select Event Type</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button 
                    onClick={() => handleEventTypeSelect('technical')}
                    className="p-8 bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-900/50 dark:to-cyan-800/50 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <div className="text-5xl mb-4">🤖</div>
                    <h3 className="text-2xl font-bold mb-2">Technical Event</h3>
                    <p className="text-slate-600 dark:text-slate-300">Hackathons, Workshops, Competitions</p>
                  </button>
                  <button 
                    onClick={() => handleEventTypeSelect('cultural')}
                    className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/50 dark:to-purple-800/50 rounded-xl hover:shadow-lg transition-shadow"
                  >
                    <div className="text-5xl mb-4">🎭</div>
                    <h3 className="text-2xl font-bold mb-2">Cultural Event</h3>
                    <p className="text-slate-600 dark:text-slate-300">Fests, Performances, Exhibitions</p>
                  </button>
                </div>
                <button 
                  onClick={() => setStep('select')}
                  className="mt-8 text-slate-600 dark:text-slate-300 hover:underline"
                >
                  Back to options
                </button>
              </div>
            )}

            {step === 'create-event' && eventType && (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">🎯 Basic Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Event Title <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="eventTitle" 
                        value={formData.eventTitle} 
                        onChange={handleInputChange} 
                        required 
                        maxLength={100}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" 
                        placeholder="e.g., Tech Innovation Hackathon 2025" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Event Headline <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        name="eventHeadline" 
                        value={formData.eventHeadline} 
                        onChange={handleInputChange} 
                        required 
                        maxLength={80}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" 
                        placeholder="Short catchy tagline for the event card" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Brief Description <span className="text-red-500">*</span></label>
                      <textarea 
                        name="briefDescription" 
                        value={formData.briefDescription} 
                        onChange={handleInputChange} 
                        required 
                        rows={3}
                        maxLength={200}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" 
                        placeholder="What is this event about? (Shown on event card)" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Description <span className="text-red-500">*</span></label>
                      <textarea 
                        name="eventDescription" 
                        value={formData.eventDescription} 
                        onChange={handleInputChange} 
                        required 
                        rows={6}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" 
                        placeholder="Detailed description shown in event details" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Event Poster <span className="text-red-500">*</span></label>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        required 
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" 
                      />
                      {formData.eventImagePreview && (
                        <img src={formData.eventImagePreview} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-xl" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">📅 Date, Time & Location</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date <span className="text-red-500">*</span></label>
                        <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Start Time <span className="text-red-500">*</span></label>
                        <input type="time" name="startTime" value={formData.startTime} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">End Date <span className="text-red-500">*</span></label>
                        <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">End Time <span className="text-red-500">*</span></label>
                        <input type="time" name="endTime" value={formData.endTime} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Event Mode <span className="text-red-500">*</span></label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-xl hover:border-cyan-300 cursor-pointer">
                          <input type="radio" name="eventMode" value="Offline" checked={formData.eventMode === 'Offline'} onChange={handleInputChange} className="w-4 h-4 text-cyan-500" />
                          <span>Offline</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-xl hover:border-cyan-300 cursor-pointer">
                          <input type="radio" name="eventMode" value="Online" checked={formData.eventMode === 'Online'} onChange={handleInputChange} className="w-4 h-4 text-cyan-500" />
                          <span>Online</span>
                        </label>
                      </div>
                    </div>

                    {formData.eventMode === 'Offline' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Venue <span className="text-red-500">*</span></label>
                        <input type="text" name="venue" value={formData.venue} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="e.g., Auditorium Hall" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">👥 Organizers & Contact</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Organized By <span className="text-red-500">*</span></label>
                      <input type="text" name="organizedBy" value={formData.organizedBy} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="e.g., VNIT Nagpur" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Person <span className="text-red-500">*</span></label>
                      <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="e.g., Dr. Rajesh Kumar" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Email <span className="text-red-500">*</span></label>
                      <input type="email" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="contact@email.com" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Phone <span className="text-red-500">*</span></label>
                      <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="+91 9876543210" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Website / Social Link</label>
                      <input type="url" name="website" value={formData.website} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="https://event-website.com" />
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">📝 Registration Details</h3>
                  <div className="space-y-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" name="registrationRequired" checked={formData.registrationRequired} onChange={handleInputChange} className="w-4 h-4 text-cyan-500" />
                      <span className="text-sm font-semibold text-slate-700">Registration Required</span>
                    </label>

                    {formData.registrationRequired && (
                      <>
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Registration Deadline <span className="text-red-500">*</span></label>
                          <input type="date" name="registrationDeadline" value={formData.registrationDeadline} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Max Participants <span className="text-red-500">*</span></label>
                          <input type="number" name="maxParticipants" value={formData.maxParticipants} onChange={handleInputChange} required min="1" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="e.g., 200" />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">Registration Fee</label>
                          <input type="number" name="registrationFee" value={formData.registrationFee} onChange={handleInputChange} min="0" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="e.g., 500 (Leave 0 for free)" />
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">🎁 Extra Options</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tags</label>
                      <input type="text" name="tags" value={formData.tags} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="e.g., hackathon, ai, workshop (comma separated)" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Eligibility</label>
                      <select name="eligibility" value={formData.eligibility} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors bg-white">
                        <option value="Open for all">Open for all</option>
                        <option value="Students only">Students only</option>
                        <option value="Professionals only">Professionals only</option>
                        <option value="Specific criteria">Specific criteria</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Prize Pool</label>
                      <input type="text" name="prizePool" value={formData.prizePool} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="e.g., ₹1,00,000" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Participation Type</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-xl hover:border-cyan-300 cursor-pointer">
                          <input type="radio" name="participationType" value="Individual" checked={formData.participationType === 'Individual'} onChange={handleInputChange} className="w-4 h-4 text-cyan-500" />
                          <span>Individual</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-xl hover:border-cyan-300 cursor-pointer">
                          <input type="radio" name="participationType" value="Team" checked={formData.participationType === 'Team'} onChange={handleInputChange} className="w-4 h-4 text-cyan-500" />
                          <span>Team</span>
                        </label>
                      </div>
                    </div>

                    {formData.participationType === 'Team' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Max Team Members</label>
                        <input type="number" name="maxTeamMembers" value={formData.maxTeamMembers} onChange={handleInputChange} min="2" className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors" placeholder="e.g., 5" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 transition-all">Create Event</button>
                  <button type="button" onClick={handleClose} className="px-8 py-4 rounded-xl font-bold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
                </div>
              </form>
            )}

            {step === 'create-community' && (
              <form onSubmit={handleCommunitySubmit} className="space-y-8">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">🎯 Community Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Community Name <span className="text-red-500">*</span></label>
                      <input type="text" name="communityName" value={formData.communityName} onChange={handleInputChange} required className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="e.g., AI Innovators Club" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Community Headline <span className="text-red-500">*</span></label>
                      <input type="text" name="communityHeadline" value={formData.communityHeadline} onChange={handleInputChange} required maxLength={80} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="Short catchy line for the community" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">What is this community about? <span className="text-red-500">*</span></label>
                      <textarea name="communityBrief" value={formData.communityBrief} onChange={handleInputChange} required rows={3} maxLength={200} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="Short overview shown on community card (2-3 lines)" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Description <span className="text-red-500">*</span></label>
                      <textarea name="communityDescription" value={formData.communityDescription} onChange={handleInputChange} required rows={5} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="Detailed description shown on community page" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Community Image</label>
                      <input type="file" accept="image/*" onChange={handleCommunityImageUpload} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" />
                      {formData.communityImagePreview && (
                        <img src={formData.communityImagePreview} alt="Preview" className="mt-3 w-full h-48 object-cover rounded-xl" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">🔗 Membership & Contact</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Join Type</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-xl hover:border-purple-300 cursor-pointer">
                          <input type="radio" name="joinType" value="Open" checked={formData.joinType === 'Open'} onChange={handleInputChange} className="w-4 h-4 text-purple-500" />
                          <span>Open to All</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 border-2 border-slate-200 rounded-xl hover:border-purple-300 cursor-pointer">
                          <input type="radio" name="joinType" value="Approval" checked={formData.joinType === 'Approval'} onChange={handleInputChange} className="w-4 h-4 text-purple-500" />
                          <span>Join by Approval</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Members Limit (optional)</label>
                      <input type="number" name="membersLimit" value={formData.membersLimit} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="e.g., 200" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Tags / Topics</label>
                      <input type="text" name="communityTags" value={formData.communityTags} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="e.g., robotics, ai, competitions" />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Website / Social Link (optional)</label>
                      <input type="url" name="communityWebsite" value={formData.communityWebsite} onChange={handleInputChange} className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors" placeholder="https://..." />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 px-8 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all">Create Community</button>
                  <button type="button" onClick={handleClose} className="px-8 py-4 rounded-xl font-bold border-2 border-slate-300 text-slate-700 hover:bg-slate-50 transition-colors">Cancel</button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}