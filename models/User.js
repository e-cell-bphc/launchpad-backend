const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  emailVerified: {
    type: Boolean,
    required: false,
    default: false
  },
  password: {
    type: String,
    required: true
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  college: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  accessScopes: {
    type: Array,
    required: false,
    default: ['client']
  },
  resumeURL: {
    type: String,
    required: false,
    default: ''
  }
})

// access scopes are (in decreasing order of power):
// 1. admin
// 2. editor
// 3. corp
// 4. client

module.exports = mongoose.model('User', userSchema)
