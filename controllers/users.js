var User = require('../models/User')

exports.profile = function (req, res) {
  User.findById(req.user)
    .select('email first last')
    .exec(function (err, doc) {
      if (err || doc === null) {
        res.status(404).json({ error: 'PersonNotFound' })
      } else {
        res.json(doc)
      }
    })
}
