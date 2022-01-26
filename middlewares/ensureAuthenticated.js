const User = require('../models/User')
const {
  tokenMissing,
  tokenInvalid,
  tokenExpired,
  noUser,
  noAdminScope
} = require('../errors/auth')

const moment = require('moment')

// this middleware makes sure all requests are authenticated
async function ensureAuthenticated(req, res, next) {
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

// this middleware makes sure all requests are authenticated and have the admin scope
async function ensureAuthenticatedWithAdminEditorScope(req, res, next) {
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

    if (
      usr.accessScopes.includes('admin') ||
      usr.accessScopes.includes('editor')
    ) {
      req.usr = usr
      next()
    } else {
      res.json(noAdminScope)
    }
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

module.exports = {
  ensureAuthenticated,
  ensureAuthenticatedWithAdminEditorScope
}
