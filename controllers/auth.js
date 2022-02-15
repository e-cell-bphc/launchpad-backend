const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const User = require('../models/User')
const VerificationToken = require('../models/VerificationToken')
const { TOKEN_SECRET } = require('../config')
const { unexpectedError } = require('../errors/common')
const {
  noUser,
  userCreationFailed,
  emailVerificationTokenMissing,
  emailVerificationFailed,
  emailIncorrectToken
} = require('../errors/auth')

async function register(req, res) {
  console.log(req.body)
  const { name, email, password, college, phoneNumber, accessScopes } = req.body

  const modAccessScopes = accessScopes ? accessScopes : ['client']

  let hashedPassword = await bcrypt.hash(password, 10)

  try {
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      college,
      phoneNumber,
      accessScopes: modAccessScopes
    })

    const verificationTokenString = uuidv4()

    const tokenObject = await VerificationToken.create({
      token: verificationTokenString,
      email
    })

    console.log('User reg result: \n', result)
    console.log('User reg token: \n', tokenObject)

    const tokenExpiry = moment().add(60, 'day').unix()

    const token = jwt.sign(
      {
        _id: result._id,
        email: result.email,
        accessScopes: result.accessScopes,
        expiry: tokenExpiry
      },
      TOKEN_SECRET
    )

    return res.status(200).json({
      status: 'ok',
      desc: 'Account created',
      data: { _id: result._id, token }
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json(userCreationFailed)
  }
}

async function login(req, res) {
  console.log(req.body)
  const { email, password } = req.body

  const result = await User.findOne({ email }).lean()

  if (!result) {
    return res.status(400).json(noUser)
  }

  if (await bcrypt.compare(password, result.password)) {
    console.log(result)
    const tokenExpiry = moment().add(60, 'day').unix()
    console.log(tokenExpiry)

    const token = jwt.sign(
      {
        _id: result._id,
        email: result.email,
        accessScopes: result.accessScopes,
        expiry: tokenExpiry
      },
      TOKEN_SECRET
    )

    return res.status(200).json({
      status: 'ok',
      desc: 'Account created',
      data: { _id: result._id, token }
    })
  }

  res.status(400).json(unexpectedError)
}

async function verifyEmail(req, res) {
  let { token } = req.params

  if (!token) {
    return res.status(400).json(emailVerificationTokenMissing)
  }

  try {
    const result = await VerificationToken.findOne({ token }).lean()
    //console.log(result.email)

    if (!result) {
      return res.status(400).json(emailVerificationFailed)
    }

    if (token != result.token) {
      return res.status(400).json(emailIncorrectToken)
    }

    const usr = await User.findOneAndUpdate(
      { email: result.email },
      {
        emailVerified: true
      }
    ).lean()

    if (!usr) {
      return res.status(400).json(emailVerificationFailed)
    }

    return res.status(200).json({
      status: 'ok',
      desc: 'Email verified'
    })
  } catch (error) {
    return res.status(400).json(emailVerificationFailed)
  }
}

module.exports = {
  register,
  login,
  verifyEmail
}
