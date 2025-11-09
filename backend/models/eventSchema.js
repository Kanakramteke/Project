const mongoose = require('mongoose');

// Define the schema for events
const eventSchema = new mongoose.Schema({
    type: { 
        type: String, 
        enum: ['Technical', 'Cultural'], 
        required: true 
    },
    title: { 
        type: String, 
        required: true, 
        maxlength: 100 // Limit title length to 100 characters
    },
    headline: { 
        type: String, 
        maxlength: 80, 
        required: true 
    },
    about: { 
        type: String, 
        maxlength: 200, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    poster: { 
        type: String, 
        required: true // URL or file path for the poster
    },
    startDate: { 
        type: Date, 
        required: true 
    },
    startTime: { 
        type: String, 
        required: true 
    },
    endDate: { 
        type: Date, 
        required: true 
    },
    endTime: { 
        type: String, 
        required: true 
    },
    mode: { 
        type: String, 
        enum: ['Online', 'Offline'], 
        required: true 
    },
    venue: { 
        type: String, 
        required: function () { return this.mode === 'Offline'; } // Required only for offline events
    },
    organizedBy: { 
        type: String, 
        required: true 
    },
    contactPerson: {
        name: { 
            type: String, 
            required: true 
        },
        email: { 
            type: String, 
            required: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); // Basic email validation
                },
                message: props => `${props.value} is not a valid email address!`
            }
        },
        number: { 
            type: String, 
            required: true,
            validate: {
                validator: function (v) {
                    return /^\d{10}$/.test(v); // Validate 10-digit phone numbers
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        }
    },
    socialLink: { 
        type: String 
    },
    registrationDeadline: { 
        type: Date, 
        required: true 
    },
    registrationFee: { 
        type: Number, 
        default: 0 
    },
    maxParticipants: { 
        type: Number, 
        required: true 
    },
    participantType: { 
        type: String, 
        enum: ['Individual', 'Team'], 
        required: true 
    },
    prizePool: { 
        type: String, 
        default: 'N/A' // Default value if not provided
    },
    tags: { 
        type: [String], 
        default: [] // Default to an empty array
    },
    eligibility: { 
        type: String 
    }
}, { timestamps: true });

// Export the Event model
module.exports = mongoose.model('Event', eventSchema);