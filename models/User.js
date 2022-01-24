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
    required: true,
    default: ['client']
  }
})

module.exports = mongoose.model('User', userSchema)
