
const { getMaxListeners } = require('../models/Company')
const Company = require('../models/Company')

async function getCompany(req, res) {

  const result = await Company.find().lean()
  return res.json(result)
}


async function addCompany(req, res) {

  const company = await Company.create({
    name:req.body.name,
    websiteLink:req.body.websiteLink,
    roles:req.body.roles,
    logoURL:req.body.logoURL,
    companyDesc:req.body.companyDesc
  })

  return res.json(company)
  
}


module.exports = {
  getCompany,
  addCompany
}
