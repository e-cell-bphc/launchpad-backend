const express = require('express')
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const { MONGO_URI } = require('./config')

// import routes
const authRoutes = require('./routes/auth')

// route middlewares
app.use('/api/auth', authRoutes)

// connect to db
mongoose.connect(MONGO_URI, () => {
  console.log('connected to db')
  app.listen(3000, () => console.log('server is running...'))
})
