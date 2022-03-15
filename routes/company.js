const {
  getCompanies,
  addCompany,
  getCompany
} = require('../controllers/company')
const router = require('express').Router()

const BASE = '/api/company'

router.get('/getCompanies', getCompanies)
router.post('/addCompany', addCompany)
router.get('/getCompany/:companyID', getCompany)

module.exports = router
