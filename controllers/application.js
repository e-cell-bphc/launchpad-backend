const Application = require('../models/Application')
const Company = require('../models/Company')
const {
  applyFailed,
  invalidApplication,
  applicationLimitReached,
  noResume,
  alreadyApplied,
  paymentIncomplete
} = require('../errors/application')
const { APPLY_LIMIT } = require('../config')

async function createApplication(req, res) {
  const { applicantID, companyID, footnotes } = req.body

  // const object = {
  //   applicantID: applicantID,
  //   companyID: companyID,
  //   footnotes: footnotes,
  //   timestamp: Date.now()
  // }

  try {
    const usr = await Application.find({ applicantID })

    console.log(usr)
    console.log(usr.length)

    if (!req.usr.paymentComplete) {
      return res.status(401).json(paymentIncomplete)
    }

    if (usr.length >= APPLY_LIMIT) {
      return res.status(400).json(applicationLimitReached)
    }

    const prev = await Application.find({ applicantID, companyID })

    if (prev.length > 0) {
      return res.status(400).json(alreadyApplied)
    }

    const result = await Application.create({
      applicantID,
      companyID,
      footnotes,
      timestamp: Date.now()
    })

    console.log(result)

    return res.json({
      status: 'ok',
      desc: 'Applied Successfully',
      n: usr.length
    })

    // try {
    //   const updateApplicationCountResult = await User.updateOne(
    //     { _id: applicantID },
    //     { $set: { companiesApplied: companiesApplied++ } }
    //   )

    //   if (!updateApplicationCountResult) {
    //     return res.status(400).json(applyFailed)
    //   }

    //   return res.json({
    //     status: 'ok',
    //     desc: 'application successful'
    //   })
    // } catch (error) {
    //   return res.status(400).json(applyFailed)
    // }
  } catch (error) {
    console.log(error)
    return res.status(500).json(applyFailed)
  }
}

async function removeApplication(req, res) {
  const { applicationID, applicantID } = req.body

  try {
    const result = await Application.deleteOne({
      _id: applicationID,
      applicantID
    })

    if (!result) {
      return res.status(400).json(invalidApplication)
    } else {
      return res.json({
        status: 'ok',
        desc: 'application removed successfully'
      })
    }
  } catch (error) {
    return res.status(400).json(invalidApplication)
  }
}

async function getAppliedCompaniesUser(req, res) {
  console.log(req.usr)

  const appliedCompanies = []

  const comp = await Application.find({ applicantID: req.usr._id })

  comp.forEach(async (c) => {
    const cx = await Company.findOne({ _id: c.companyID }).lean()

    if (!cx) {
      return res.status(400).json({
        status: 'failed',
        desc: 'Data fetching failed'
      })
    }

    appliedCompanies.push(cx)

    // axios
    //   .get(
    //     `https://backend-api-2022.onrender.com/api/company/getCompany/${c.companyID}`
    //   )
    //   .then((data) => {
    //     appliedCompanies.push(data)
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //     return res.status(400).json({
    //       status: 'failed',
    //       desc: 'Data fetching failed'
    //     })
    //   })
  })

  if (!appliedCompanies) {
    return res.status(400).json({
      status: 'failed',
      desc: 'Failed to retrieve companies'
    })
  }

  return res.json({
    status: 'ok',
    data: appliedCompanies
  })
}

module.exports = {
  createApplication,
  removeApplication,
  getAppliedCompaniesUser
}
