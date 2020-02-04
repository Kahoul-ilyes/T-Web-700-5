const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")
const helmet = require('helmet')

const mongoose = require('mongoose')
// connect to Mongo daemon
mongoose
    .connect(
        'mongodb://mongo:27017/express-mongo',
        {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users/users')
let cryptosRouter = require('./routes/cryptos/cryptos', )
let coinsRouter = require('./routes/cryptos/coins')
let articlesRouter = require('./routes/articles/articles')
let rssRouter = require('./routes/rss/rss')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'doc')))

app.use(helmet())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Methods")
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH, OPTIONS, PUT")
  next()
})

// Set up Auth0 configuration
const authConfig = {
  domain: "dev-m6frxp9u.eu.auth0.com",
  audience: "https://dev-m6frxp9u.eu.auth0.com/api/v2/"
};

// Define middleware that validates incoming bearer tokens
// using JWKS from dev-m6frxp9u.eu.auth0.com
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),

  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithm: ["RS256"]
});

// middleware for checking jwt
// app.use(checkJwt)


app.use('/', indexRouter)
app.use('/api/v0/users', usersRouter)
app.use('/api/v0/cryptos', cryptosRouter)
app.use('/api/v0/coins', coinsRouter)
app.use('/api/v0/articles', articlesRouter)
app.use('/api/v0/rss', rssRouter)

module.exports = app
