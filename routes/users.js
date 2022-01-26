const router = require('express').Router()
const { getProfile, getProfileWithAdminScope } = require('../controllers/users')
const {
  ensureAuthenticated,
  ensureAuthenticatedAuthAdminScope
} = require('../middlewares/ensureAuthenticated')

router.get('/:id', ensureAuthenticated, getProfile)
router.get(
  '/admin/:id',
  ensureAuthenticatedAuthAdminScope,
  getProfileWithAdminScope
)

module.exports = router
