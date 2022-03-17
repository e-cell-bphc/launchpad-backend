const router = require('express').Router()
const multer = require('multer')

const {
  getProfile,
  getProfileWithAdminOrEditorScope,
  updateProfile,
  uploadResume
} = require('../controllers/users')

const {
  ensureAuthenticated,
  ensureAuthenticatedWithAdminEditorScope
} = require('../middlewares/ensureAuthenticated')

// Initiating a memory storage engine to store files as Buffer objects
const uploader = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // limiting files size to 5 MB
  }
})

router.get('/:id', ensureAuthenticated, getProfile)
router.get(
  '/admin/:id',
  ensureAuthenticatedWithAdminEditorScope,
  getProfileWithAdminOrEditorScope
)

router.post('/updateProfile', updateProfile)

router.post('/uploadResume', ensureAuthenticated, uploader.any(), uploadResume)

module.exports = router
