const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: [2, 'Name must be at least 2 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    number: {
        type: Number,
        required: [true, 'Phone number is required'],
        min: [1000000000, 'Invalid phone number'],
        max: [9999999999, 'Invalid phone number']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters']
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, { 
    timestamps: true,
    toJSON: { 
        transform: function(doc, ret) {
            delete ret.password;
            delete ret.tokens;
            return ret;
        }
    }
});

// Index for faster email queries
userSchema.index({ email: 1 });

// Pre-save middleware for password hashing
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(12);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Method to verify password
userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.generateAuthToken = async function() {
    try {
        const token = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        throw new Error('Error generating auth token');
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;