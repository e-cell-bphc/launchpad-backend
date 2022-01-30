const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  roles: {
    type: Array
  }
})

module.exports = mongoose.model('Company', companySchema)
