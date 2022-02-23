const mongoose = require('mongoose')

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  websiteLink: {
    type: String,
    required: true,
    unique: true
  },
  roles: {
    type: Array,
    required: true
  },
  logoURL: {
    type: String,
    required: true
  },
  companyDesc:{
    type:String,
    required:true
  }
})

module.exports = mongoose.model('Company', companySchema)
