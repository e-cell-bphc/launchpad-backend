const {
    getCompany,
    addCompany
  } = require('../controllers/company')
  const router = require('express').Router()
  
  const BASE = '/api/company'
  
  router.post('/getCompany', getCompany)
  router.post('/addCompany', addCompany)

  module.exports = router
  