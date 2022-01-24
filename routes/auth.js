const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

router.post('/register', async (req, res) => {
  console.log(req.body)
  const { name, email, password, college, phoneNumber } = req.body

  let hashedPassword = await bcrypt.hash(password, 10)

  try {
    const result = await User.create({
      name,
      email,
      password: hashedPassword,
      college,
      phoneNumber
    })

    console.log(result)
    return res
      .status(200)
      .json({
        status: 'ok',
        desc: 'Account created',
        data: { _id: result._id }
      })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ status: 'failed', desc: 'something went wrong' })
  }
})
module.exports = router
