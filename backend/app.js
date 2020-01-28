let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')

const mongoose = require('mongoose')
// connect to Mongo daemon
mongoose
    .connect(
        'mongodb://mongo:27017/cryptocodex',
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

let indexRouter = require('./routes/index')
let authRouter = require('./routes/auth/auth')
let usersRouter = require('./routes/users/users')
let cryptosRouter = require('./routes/cryptos/cryptos', )
let coinsRouter = require('./routes/cryptos/coins')
let articlesRouter = require('./routes/articles/articles')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'doc')))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/', indexRouter)
app.use('/api/v0/auth', authRouter)
app.use('/api/v0/users', usersRouter)
app.use('/api/v0/cryptos', cryptosRouter)
app.use('/api/v0/coins', coinsRouter)
app.use('/api/v0/articles', articlesRouter)

module.exports = app
