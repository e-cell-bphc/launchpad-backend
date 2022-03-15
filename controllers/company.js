const Company = require('../models/Company')

async function getCompanies(req, res) {
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

async function getCompany(req, res) {
  const { companyID } = req.params

  console.log(companyID)

  const details = await Company.findOne({ _id: companyID }).lean()

  if (!details) {
    return res
      .status(400)
      .json({ status: 'failed', desc: 'Could not find the specified company' })
  }

  return res.json({
    status: 'ok',
    data: details
  })
}

module.exports = {
  getCompanies,
  addCompany,
  getCompany
}
