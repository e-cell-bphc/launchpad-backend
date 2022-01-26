const User = require('../models/User')
const {
  tokenMissing,
  tokenInvalid,
  tokenExpired,
  noUser
} = require('../errors/auth')

const moment = require('moment')

// this middleware makes sure all requests are authenticated
export async function ensureAuthenticated(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send(tokenMissing)
  }
  var token = req.headers.authorization.split(' ')[1]

  var user = null
  try {
    user = jwt.decode(token, config.TOKEN_SECRET)
  } catch (err) {
    return res.status(401).send(tokenInvalid)
  }

  if (user.expiry <= moment().unix()) {
    return res.status(401).send(tokenExpired)
  }
  // check if the user exists
  try {
    const usr = await User.findOne({ _id: user._id }).lean()
    req.usr = usr
    next()
  } catch (error) {
    return res.json(noUser)
  }
  // User.findById(user._id, function (err, user) {
  //   if (!user) {
  //     return res.status(401).send({ error: "PersonNotFound" });
  //   } else {
  //     req.user = user.sub;
  //     next();
  //   }
  // });
}
