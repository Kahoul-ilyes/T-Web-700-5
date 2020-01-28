let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

const mongoose = require('mongoose')
// connect to Mongo daemon
mongoose
    .connect(
        'mongodb://mongo:27017/express-mongo',
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

let indexRouter = require('./routes/index')
let authRouter = require('./routes/auth/auth')
let usersRouter = require('./routes/users/users')
let cryptosRouter = require('./routes/cryptos/cryptos')
let coinsRouter = require('./routes/cryptos/coins')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'doc')))

app.use('/', indexRouter)
app.use('/api/v0/auth', authRouter)
app.use('/api/v0/users', usersRouter)
app.use('/api/v0/cryptos', cryptosRouter)
app.use('/api/v0/coins', coinsRouter)

module.exports = app
