const { noUser } = require('../errors/auth')
var User = require('../models/User')

async function getProfile(req, res) {
  const userID = req.params.id

  const result = await User.findOne
    .findOne({ _id: userID }, 'name email college')
    .lean()

  if (!result) {
    res.json({
      status: 'ok',
      data: result
    })
  }

  res.status(401).json(noUser)
}

async function getProfileWithAdminOrEditorScope(req, res) {
  const userID = req.params.id

  const result = await User.findOne
    .findOne(
      { _id: userID },
      'name email datetime college phoneNumber accessScopes'
    )
    .lean()

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

module.exports = {
  getProfile,
  getProfileWithAdminOrEditorScope
}
