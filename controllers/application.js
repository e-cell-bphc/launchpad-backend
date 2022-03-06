const Application = require('../models/Application')
const {
  applyFailed,
  invalidApplication,
  applicationLimitReached,
  noResume
} = require('../errors/application')
const { APPLY_LIMIT } = require('../config')

async function createApplication(req, res) {
  const { applicantID, companyID, footnotes } = req.body

  const object = {
    applicantID: applicantID,
    companyID: companyID,
    footnotes: footnotes,
    timestamp: Date.now()
  }

  try {
    const result = await Application.create(object)

    console.log(result)

    const usr = await Application.find({ applicantID }).lean()

    if (usr.length >= APPLY_LIMIT) {
      return res.status(400).json(applicationLimitReached)
    } else if (usr.resumeURL == '') {
      return res.status(400).json(noResume)
    }

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

module.exports = {
  createApplication,
  removeApplication
}
