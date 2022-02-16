const User = require('../models/User')
const {
  tokenMissing,
  tokenInvalid,
  tokenExpired,
  noUser,
  noAdminScope,
  insufficentAuthorisation
} = require('../errors/auth')
const { TOKEN_SECRET } = require('./../config')
const jwt = require('jsonwebtoken')

const moment = require('moment')
const Route = require('../models/Route')

function hasSubArray(master, sub) {
  return sub.every(
    (
      (i) => (v) =>
        (i = master.indexOf(v, i) + 1)
    )(0)
  )
}

function ensureAuthenticatedWithRoute(route) {
  return async function (req, res, next) {
    console.log('per', permission)
    if (!req.headers.authorization) {
      return res.status(401).send(tokenMissing)
    }
    var token = req.headers.authorization.split(' ')[1]
    console.log('token: ', token)
    console.log('secret', TOKEN_SECRET)

    var user = null

    // user = jwt.decode(token, TOKEN_SECRET)
    // console.log('user: ', user)
    try {
      user = jwt.decode(token, TOKEN_SECRET)
      console.log('user: ', user)
    } catch (err) {
      return res.status(401).send(err)
    }

    if (user.expiry <= moment().unix()) {
      return res.status(401).send(tokenExpired)
    }
    // check if the user exists
    try {
      const usr = await User.findOne({ _id: user._id }).lean()

      try {
        const scopes = await Route.findOne({ route }).lean()

        console.log(
          'check',
          // scopes.access.includes(permission) &&
          //   usr.accessScopes.includes(permission)
          hasSubArray(usr.accessScopes, scopes.access)
        )

        if (
          hasSubArray(usr.accessScopes, scopes.access)
          // scopes.access.includes(permission) &&
          // usr.accessScopes.includes(permission)
          // usr.accessScopes.includes('admin') ||
          // usr.accessScopes.includes('editor')
        ) {
          req.usr = usr
          next()
        } else {
          res.status(400).json(insufficentAuthorisation)
        }
      } catch (error) {
        res.status(400).json(insufficentAuthorisation)
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
  ensureAuthenticatedWithAdminEditorScope,
  ensureAuthenticatedWithRoute
}
