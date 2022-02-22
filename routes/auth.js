const router = require('express').Router()
const {
  register,
  login,
  verifyEmail,
  authorize
} = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/verifyEmail/:token', verifyEmail)
router.post('/authorize', authorize)

module.exports = router
