const router = require('express').Router()
const {
  createApplication,
  removeApplication,
  getAppliedCompaniesUser
} = require('../controllers/application')
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated')

router.post('/apply', ensureAuthenticated, createApplication)
router.post('/deleteApplication', ensureAuthenticated, removeApplication)
router.get(
  '/getAppliedCompaniesUser',
  ensureAuthenticated,
  getAppliedCompaniesUser
)

module.exports = router
