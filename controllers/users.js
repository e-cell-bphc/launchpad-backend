var _ = require('lodash')

const { noUser } = require('../errors/auth')
var User = require('../models/User')

async function getProfile(req, res) {
  const userID = req.params.id

  const result = await User.findOne({ _id: userID }).lean()

  if (result) {
    res.json({
      status: 'ok',
      data: result
    })
  }

  res.status(401).json(noUser)
}

async function getProfileWithAdminOrEditorScope(req, res) {
  const userID = req.params.id

  const result = await User.findOne(
    { _id: userID },
    'name email datetime college phoneNumber accessScopes'
  ).lean()

  if (!result) {
    res.json({
      status: 'ok',
      data: result
    })
  }

  res.status(401).json(noUser)
}

// exports.profile = function (req, res) {
//   User.findById(req.user)
//     .select('email first last')
//     .exec(function (err, doc) {
//       if (err || doc === null) {
//         res.status(404).json({ error: 'PersonNotFound' })
//       } else {
//         res.json(doc)
//       }
//     })
// }

async function updateProfile(req, res) {
  const { name, email, phoneNumber, college, yos, resumeURL } = req.body

  var obj = { name, phoneNumber, college, yos, resumeURL }
  obj = _.pickBy(obj, _.identity)

  const result = await User.updateOne({ email }, { $set: obj })

  if (!result) {
    return res.status(400).json({
      status: 'failed',
      desc: 'Update failed'
    })
  }

  return res.json({
    status: 'ok',
    desc: 'Update complete'
  })
}

module.exports = {
  getProfile,
  getProfileWithAdminOrEditorScope,
  updateProfile
}
