const User = require('../models/User')
const {
  tokenMissing,
  tokenInvalid,
  tokenExpired,
  noUser,
  noAdminScope,
  notEnoughAuthorisation
} = require('../errors/auth')

const moment = require('moment')

// this middleware makes sure all requests are authenticated
// scopes is an array of the access scopes required to perform an action
// scopes can have multiple elements if multiple permissions have access to an action
async function ensureAuthenticated(scopes) {
  return (req, res, next) => {
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

      // sensitive, untested code follows
      // this is yet to be tested
      // would probably need to write JS tests to check this, can't check it manually for all cases

      var hasAccess = false // default value should be true for && and false for ||

      scopes.forEach((element) => {
        // gotta decide between && and ||
        // if we use && and pass permissions in increasing level of access it would (probably) work
        // needs a lot of work before using in prod
        // && also has a lot of issues
        // if scopes  = ['admin', 'editor', 'client'], and user has admin but not editor scope (which doesn't really make sense because admin > editor) but overall the auth would return false as: true (base) && true (admin) && false (editor) := false
        // if we use || and even if one of the access is enabled, the others won't be checked
        // would probably use && and an increasing list but let's see
        hasAccess = hasAccess || usr.accessScopes.includes(element)
      })

      if (hasAccess) {
        req.usr = usr
        next()
      } else {
        res.json(notEnoughAuthorisation)
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
