const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false
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
  yos: {
    type: String,
    default: '',
    required: false
  },
  college: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
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
  },
  paymentComplete: {
    type: Boolean,
    required: false,
    default: false
  }
})

// access scopes are (in decreasing order of power):
// 1. admin
// 2. editor
// 3. corp
// 4. client

module.exports = mongoose.model('User', userSchema)
