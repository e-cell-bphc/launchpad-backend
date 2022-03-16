const mongoose = require('mongoose')

const couponPayments = new mongoose.Schema({
  applicantID: {
    type: String,
    required: true
  },
  couponCode: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('CouponPayments', couponPayments)
