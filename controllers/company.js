const Company = require('../models/Company')

async function getCompany(req, res) {
  try {
    console.log('Fetching all companies')
    const result = await Company.find().lean()
    return res.json(result)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'failed',
      desc: error
    })
  }
}

async function addCompany(req, res) {
  try {
    const company = await Company.create({
      name: req.body.name,
      websiteLink: req.body.websiteLink,
      roles: req.body.roles,
      logoURL: req.body.logoURL,
      companyDesc: req.body.companyDesc
    })
    return res.json(company)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'failed',
      desc: error
    })
  }
}

module.exports = {
  getCompany,
  addCompany
}
