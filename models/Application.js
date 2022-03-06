const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  applicantID: {
    type: String,
    required: true
  },
  companyID: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    required: true
  },
  footnotes: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Application', applicationSchema)
