const mongoose = require('mongoose')

const routeSchema = new mongoose.Schema({
  route: {
    type: String,
    required: true,
    unique: true
  },
  access: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model('Route', routeSchema)
