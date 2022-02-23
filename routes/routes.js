const { register } = require('../controllers/routes')
const {
  ensureAuthenticatedWithRoute
} = require('../middlewares/ensureAuthenticated')

const router = require('express').Router()

const BASE = '/api/routes'

router.post('/add', ensureAuthenticatedWithRoute(`${BASE}/add`), register)
module.exports = router
