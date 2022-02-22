const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Order', orderSchema)
