const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  preReq: {
    type: String,
    required: true
  },
  roles: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Job', jobSchema)
