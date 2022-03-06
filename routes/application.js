const router = require('express').Router()
const {
  createApplication,
  removeApplication
} = require('../controllers/application')
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated')

router.post('/apply', ensureAuthenticated, createApplication)
router.post('/deleteApplication', ensureAuthenticated, removeApplication)

module.exports = router
