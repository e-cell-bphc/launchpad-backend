const { unexpectedError } = require('../errors/common')
const Route = require('../models/Route')

async function register(req, res) {
  console.log(req.body)
  const { route, access } = req.body

  try {
    const result = await Route.create({
      route,
      access
    })

    console.log(result)

    return res.status(200).json({
      status: 'ok',
      desc: 'Route created'
    })
  } catch (error) {
    console.log('yoo', error)
    if (error.code === 11000) {
      return res.status(400).json({ msg: 'route alrady exists' })
    }

    return res.status(500).json(unexpectedError)
  }
}

module.exports = {
  register
}
