const mongoose = require('mongoose')

const verificationTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('VerificationToken', verificationTokenSchema)
