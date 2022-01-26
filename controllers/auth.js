const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const { TOKEN_SECRET } = require('../config')
const { unexpectedError } = require('../errors/common')
const { noUser, userCreationFailed } = require('../errors/auth')

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

    console.log(result)
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

module.exports = {
  register,
  login
}
