const router = require('express').Router()
const { register, login, verifyEmail } = require('../controllers/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/verifyEmail/:token', verifyEmail)

module.exports = router
