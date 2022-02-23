const Razorpay = require('razorpay')
const crypto = require('crypto')
const User = require('../models/User')
const Order = require('../models/Order')
const { default: axios } = require('axios')
const { BASE_URL } = require('../config')

var instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
})

async function getPaymentStatus(req, res) {
  console.log('getpay called')
  const result = User.findOne({ email: req.body.email }).lean()

  if (result.paymentComplete) {
    return res.json({
      paid: true
    })
  }

  return res.json({
    paid: false
  })
}

async function saveOrder(req, res) {
  const { user_id, email, order_id } = req.body

  const result = Order.create({
    user_id,
    email,
    order_id
  })
  if (!result) {
    return res.status(400).json({
      status: 'failed',
      desc: 'order creation failed'
    })
  }

  return res.json({
    status: 'ok',
    desc: 'saved order'
  })
}

async function createOrderID(req, res) {
  const { email, _id } = req.body

  var options = {
    amount: 50000, // amount in the smallest currency unit
    currency: 'INR',
    receipt: 'order_rcptid_11'
  }

  axios
    .post(`${BASE_URL}/api/payments/getPaymentStatus`, {
      email
    })
    .then((response) => {
      console.log('response,', response.data)
      if (!response.data.paid) {
        instance.orders.create(options, function (err, order) {
          console.log('rr', order)

          try {
            axios
              .post(`${BASE_URL}/api/payments/saveOrder`, {
                user_id: _id,
                email,
                order_id: order.id
              })
              .then((response) => {
                console.log('response::save', response.data)
              })
              .catch((err) => {
                console.log('err::save', err)
              })

            return res.send(order)
          } catch (error) {
            console.log('eerr:save', error)
            return res.json({
              status: 'failed',
              desc: 'something blew up',
              error
            })
          }
        })
      } else {
        res.json({
          status: 'paid',
          desc: 'payment already complete'
        })
      }
    })
}

async function verifyPaymentWebhook(req, res) {
  const SECRET =
    '28GJ?Uzup3QDW*b#_W4T&vpmu=jD%k5wm3hLryz+-XwKH!G!gZn322^@@BRxjnzx'

  console.log(req.body)

  const usr = await Order.findOne({
    order_id: req.body.payload.payment.entity.order_id
  })
  try {
    const result = await User.updateOne(
      { email: usr.email },
      {
        $set: {
          paymentComplete: true
        }
      }
    )

    if (!result) {
      return res.json({
        status: 'failed',
        desc: `payment verification for ${usr.email} failed`
      })
    }

    return res.json({
      status: 'ok',
      desc: 'payment complete'
    })
  } catch (error) {
    return res.json({
      status: 'failed',
      desc: `payment verification for ${usr.email} failed`
    })
  }

  // const shasum = crypto.createHmac('sha256', SECRET)
  // shasum.update(JSON.stringify(req.body))
  // const digest = shasum.digest('hex')

  // console.log(digest, req.headers['x-razorpay-signature'])

  // if (digest === req.headers['x-razorpay-signature']) {

  // }

  res.json({
    status: 'failed',
    desc: 'tampered request'
  })
}

module.exports = {
  createOrderID,
  verifyPaymentWebhook,
  getPaymentStatus,
  saveOrder
}
