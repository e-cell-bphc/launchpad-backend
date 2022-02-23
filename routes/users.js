const router = require('express').Router()
const {
  getProfile,
  getProfileWithAdminOrEditorScope,
  updateProfile
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

router.post('/updateProfile', updateProfile)

module.exports = router
