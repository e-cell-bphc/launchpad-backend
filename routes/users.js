const router = require('express').Router()
const {
  getProfile,
  getProfileWithAdminOrEditorScope
} = require('../controllers/users')
const {
  ensureAuthenticated,
  ensureAuthenticatedWithAdminEditorScope
} = require('../middlewares/ensureAuthenticated')

router.get('/:id', ensureAuthenticated(['client']), getProfile)
router.get(
  '/admin/:id',
  ensureAuthenticated(['admin', 'editor', 'client']),
  getProfileWithAdminOrEditorScope
)

module.exports = router
