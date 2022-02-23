const express = require('express')
const mongoose = require('mongoose')
var cors = require('cors')

const app = express()
app.use(cors())

app.use(express.json())

const { MONGO_URI, LISTEN_PORT } = require('./config')

// import routes
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const routesRoutes = require('./routes/routes')
const paymentsRouter = require('./routes/payments')
const companyRouter=require('./routes/company')

// route middlewares
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/routes', routesRoutes)
app.use('/api/payments', paymentsRouter)
app.use('/api/company', companyRouter)

// connect to db
mongoose.connect(MONGO_URI, () => {
  console.log('connected to db')
  app.listen(LISTEN_PORT, () =>
    console.log(`server is running on port ${LISTEN_PORT}`)
  )
})
