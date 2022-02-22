const {
  createOrderID,
  verifyPaymentWebhook,
  getPaymentStatus,
  saveOrder
} = require('../controllers/payments')
const router = require('express').Router()

const BASE = '/api/payments'

router.post('/createOrder', createOrderID)
router.post('/verifyPaymentWebhook', verifyPaymentWebhook)
router.post('/getPaymentStatus', getPaymentStatus)
router.post('/saveOrder', saveOrder)

module.exports = router
