const router = require('express').Router()
const {
  getProfile,
  getProfileWithAdminOrEditorScope
} = require('../controllers/users')
const {
  ensureAuthenticated,
  ensureAuthenticatedWithAdminEditorScope
} = require('../middlewares/ensureAuthenticated')

router.get('/:id', ensureAuthenticated, getProfile)
router.get(
  '/admin/:id',
  ensureAuthenticatedWithAdminEditorScope,
  getProfileWithAdminOrEditorScope
)

module.exports = router
